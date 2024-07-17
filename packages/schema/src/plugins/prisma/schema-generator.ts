import {
    AbstractDeclaration,
    AttributeArg,
    BooleanLiteral,
    ConfigArrayExpr,
    ConfigExpr,
    ConfigInvocationArg,
    DataModel,
    DataModelAttribute,
    DataModelField,
    DataModelFieldAttribute,
    DataModelFieldType,
    DataSource,
    Enum,
    EnumField,
    Expression,
    GeneratorDecl,
    InvocationExpr,
    isArrayExpr,
    isDataModel,
    isDataSource,
    isInvocationExpr,
    isLiteralExpr,
    isNullExpr,
    isReferenceExpr,
    isStringLiteral,
    LiteralExpr,
    Model,
    NumberLiteral,
    ReferenceExpr,
    StringLiteral,
} from '@zenstackhq/language/ast';
import { getPrismaVersion } from '@zenstackhq/sdk/prisma';
import { match, P } from 'ts-pattern';
import { getIdFields } from '../../utils/ast-utils';

import { DELEGATE_AUX_RELATION_PREFIX, PRISMA_MINIMUM_VERSION } from '@zenstackhq/runtime';
import {
    getAttribute,
    getAttributeArg,
    getAttributeArgLiteral,
    getInheritedFromDelegate,
    getLiteral,
    getRelationKeyPairs,
    isDelegateModel,
    isIdField,
    PluginError,
    PluginOptions,
    resolved,
    ZModelCodeGenerator,
} from '@zenstackhq/sdk';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { lowerCaseFirst } from 'lower-case-first';
import path from 'path';
import semver from 'semver';
import { name } from '.';
import { getStringLiteral } from '../../language-server/validator/utils';
import { execPackage } from '../../utils/exec-utils';
import { isDefaultWithAuth } from '../enhancer/enhancer-utils';
import {
    AttributeArgValue,
    ModelField,
    ModelFieldType,
    AttributeArg as PrismaAttributeArg,
    AttributeArgValue as PrismaAttributeArgValue,
    ContainerDeclaration as PrismaContainerDeclaration,
    Model as PrismaDataModel,
    Enum as PrismaEnum,
    FieldAttribute as PrismaFieldAttribute,
    FieldReference as PrismaFieldReference,
    FieldReferenceArg as PrismaFieldReferenceArg,
    FunctionCall as PrismaFunctionCall,
    FunctionCallArg as PrismaFunctionCallArg,
    PrismaModel,
    ContainerAttribute as PrismaModelAttribute,
    PassThroughAttribute as PrismaPassThroughAttribute,
    SimpleField,
} from './prisma-builder';

const MODEL_PASSTHROUGH_ATTR = '@@prisma.passthrough';
const FIELD_PASSTHROUGH_ATTR = '@prisma.passthrough';
const PROVIDERS_SUPPORTING_NAMED_CONSTRAINTS = ['postgresql', 'mysql', 'cockroachdb'];

// Some database providers like postgres and mysql have default limit to the length of identifiers
// Here we use a conservative value that should work for most cases, and truncate names if needed
const IDENTIFIER_NAME_MAX_LENGTH = 50 - DELEGATE_AUX_RELATION_PREFIX.length;

/**
 * Generates Prisma schema file
 */
export class PrismaSchemaGenerator {
    private zModelGenerator: ZModelCodeGenerator = new ZModelCodeGenerator();

    private readonly PRELUDE = `//////////////////////////////////////////////////////////////////////////////////////////////
// DO NOT MODIFY THIS FILE                                                                  //
// This file is automatically generated by ZenStack CLI and should not be manually updated. //
//////////////////////////////////////////////////////////////////////////////////////////////

`;

    private mode: 'logical' | 'physical' = 'physical';

    // a mapping from shortened names to their original full names
    private shortNameMap = new Map<string, string[]>();

    constructor(private readonly zmodel: Model) {}

    async generate(options: PluginOptions) {
        if (!options.output) {
            throw new PluginError(name, 'Output file is not specified');
        }

        const outFile = options.output as string;
        const warnings: string[] = [];
        if (options.mode) {
            this.mode = options.mode as 'logical' | 'physical';
        }

        const prismaVersion = getPrismaVersion();
        if (prismaVersion && semver.lt(prismaVersion, PRISMA_MINIMUM_VERSION)) {
            warnings.push(
                `ZenStack requires Prisma version "${PRISMA_MINIMUM_VERSION}" or higher. Detected version is "${prismaVersion}".`
            );
        }

        const prisma = new PrismaModel();

        for (const decl of this.zmodel.declarations) {
            switch (decl.$type) {
                case DataSource:
                    this.generateDataSource(prisma, decl as DataSource);
                    break;

                case Enum:
                    this.generateEnum(prisma, decl as Enum);
                    break;

                case DataModel:
                    this.generateModel(prisma, decl as DataModel);
                    break;

                case GeneratorDecl:
                    this.generateGenerator(prisma, decl as GeneratorDecl, options);
                    break;
            }
        }

        if (!fs.existsSync(path.dirname(outFile))) {
            fs.mkdirSync(path.dirname(outFile), { recursive: true });
        }
        await writeFile(outFile, this.PRELUDE + prisma.toString());

        if (options.format !== false) {
            try {
                // run 'prisma format'
                await execPackage(`prisma format --schema ${outFile}`, { stdio: 'ignore' });
            } catch {
                warnings.push(`Failed to format Prisma schema file`);
            }
        }

        return warnings;
    }

    private generateDataSource(prisma: PrismaModel, dataSource: DataSource) {
        const fields: SimpleField[] = dataSource.fields.map((f) => ({
            name: f.name,
            text: this.configExprToText(f.value),
        }));
        prisma.addDataSource(dataSource.name, fields);
    }

    private configExprToText(expr: ConfigExpr) {
        if (isLiteralExpr(expr)) {
            return this.literalToText(expr);
        } else if (isInvocationExpr(expr)) {
            const fc = this.makeFunctionCall(expr);
            return fc.toString();
        } else {
            return this.configArrayToText(expr);
        }
    }

    private configArrayToText(expr: ConfigArrayExpr) {
        return (
            '[' +
            expr.items
                .map((item) => {
                    if (isLiteralExpr(item)) {
                        return this.literalToText(item);
                    } else {
                        return (
                            item.name +
                            (item.args.length > 0
                                ? '(' + item.args.map((arg) => this.configInvocationArgToText(arg)).join(', ') + ')'
                                : '')
                        );
                    }
                })
                .join(', ') +
            ']'
        );
    }

    private configInvocationArgToText(arg: ConfigInvocationArg) {
        return `${arg.name}: ${this.literalToText(arg.value)}`;
    }

    private literalToText(expr: LiteralExpr) {
        return JSON.stringify(expr.value);
    }

    private exprToText(expr: Expression) {
        return new ZModelCodeGenerator({ quote: 'double' }).generate(expr);
    }

    private generateGenerator(prisma: PrismaModel, decl: GeneratorDecl, options: PluginOptions) {
        const generator = prisma.addGenerator(
            decl.name,
            decl.fields.map((f) => ({ name: f.name, text: this.configExprToText(f.value) }))
        );

        // deal with configuring PrismaClient preview features
        const provider = generator.fields.find((f) => f.name === 'provider');
        if (provider?.text === JSON.stringify('prisma-client-js')) {
            const prismaVersion = getPrismaVersion();
            if (prismaVersion) {
                const previewFeatures = JSON.parse(
                    generator.fields.find((f) => f.name === 'previewFeatures')?.text ?? '[]'
                );

                if (!Array.isArray(previewFeatures)) {
                    throw new PluginError(name, 'option "previewFeatures" must be an array');
                }

                if (previewFeatures.length > 0) {
                    const curr = generator.fields.find((f) => f.name === 'previewFeatures');
                    if (!curr) {
                        generator.fields.push({ name: 'previewFeatures', text: JSON.stringify(previewFeatures) });
                    } else {
                        curr.text = JSON.stringify(previewFeatures);
                    }
                }
            }

            if (typeof options.overrideClientGenerationPath === 'string') {
                const output = generator.fields.find((f) => f.name === 'output');
                if (output) {
                    output.text = JSON.stringify(options.overrideClientGenerationPath);
                } else {
                    generator.fields.push({
                        name: 'output',
                        text: JSON.stringify(options.overrideClientGenerationPath),
                    });
                }
            }
        }
    }

    private generateModel(prisma: PrismaModel, decl: DataModel) {
        const model = decl.isView ? prisma.addView(decl.name) : prisma.addModel(decl.name);
        for (const field of decl.fields) {
            if (field.$inheritedFrom) {
                const inheritedFromDelegate = getInheritedFromDelegate(field);
                if (
                    // fields inherited from delegate are excluded from physical schema
                    !inheritedFromDelegate ||
                    // logical schema keeps all inherited fields
                    this.mode === 'logical' ||
                    // id fields are always kept
                    isIdField(field)
                ) {
                    this.generateModelField(model, field);
                }
            } else {
                this.generateModelField(model, field);
            }
        }

        for (const attr of decl.attributes.filter((attr) => this.isPrismaAttribute(attr))) {
            this.generateContainerAttribute(model, attr);
        }

        decl.attributes
            .filter((attr) => attr.decl.ref && !this.isPrismaAttribute(attr))
            .forEach((attr) => model.addComment('/// ' + this.zModelGenerator.generate(attr)));

        // user defined comments pass-through
        decl.comments.forEach((c) => model.addComment(c));

        // generate relation fields on base models linking to concrete models
        this.generateDelegateRelationForBase(model, decl);

        // generate reverse relation fields on concrete models
        this.generateDelegateRelationForConcrete(model, decl);

        // expand relations on other models that reference delegated models to concrete models
        this.expandPolymorphicRelations(model, decl);

        // name relations inherited from delegate base models for disambiguation
        this.nameRelationsInheritedFromDelegate(model, decl);
    }

    private generateDelegateRelationForBase(model: PrismaDataModel, decl: DataModel) {
        if (this.mode !== 'physical') {
            return;
        }

        if (!isDelegateModel(decl)) {
            return;
        }

        // collect concrete models inheriting this model
        const concreteModels = decl.$container.declarations.filter(
            (d) => isDataModel(d) && d !== decl && d.superTypes.some((base) => base.ref === decl)
        );

        // generate an optional relation field in delegate base model to each concrete model
        concreteModels.forEach((concrete) => {
            const auxName = `${DELEGATE_AUX_RELATION_PREFIX}_${this.truncate(lowerCaseFirst(concrete.name))}`;
            model.addField(auxName, new ModelFieldType(concrete.name, false, true));
        });
    }

    private generateDelegateRelationForConcrete(model: PrismaDataModel, concreteDecl: DataModel) {
        if (this.mode !== 'physical') {
            return;
        }

        // generate a relation field for each delegated base model

        const baseModels = concreteDecl.superTypes
            .map((t) => t.ref)
            .filter((t): t is DataModel => !!t)
            .filter((t) => isDelegateModel(t));

        baseModels.forEach((base) => {
            const idFields = getIdFields(base);

            // add relation fields
            const relationField = `${DELEGATE_AUX_RELATION_PREFIX}_${this.truncate(lowerCaseFirst(base.name))}`;
            model.addField(relationField, base.name, [
                new PrismaFieldAttribute('@relation', [
                    new PrismaAttributeArg(
                        'fields',
                        new AttributeArgValue(
                            'Array',
                            idFields.map(
                                (idField) =>
                                    new AttributeArgValue('FieldReference', new PrismaFieldReference(idField.name))
                            )
                        )
                    ),
                    new PrismaAttributeArg(
                        'references',
                        new AttributeArgValue(
                            'Array',
                            idFields.map(
                                (idField) =>
                                    new AttributeArgValue('FieldReference', new PrismaFieldReference(idField.name))
                            )
                        )
                    ),
                    new PrismaAttributeArg(
                        'onDelete',
                        new AttributeArgValue('FieldReference', new PrismaFieldReference('Cascade'))
                    ),
                    new PrismaAttributeArg(
                        'onUpdate',
                        new AttributeArgValue('FieldReference', new PrismaFieldReference('Cascade'))
                    ),
                ]),
            ]);
        });
    }

    private expandPolymorphicRelations(model: PrismaDataModel, dataModel: DataModel) {
        if (this.mode !== 'logical') {
            return;
        }

        // the logical schema needs to expand relations to the delegate models to concrete ones

        // for the given model, find relation fields of delegate model type, find all concrete models
        // of the delegate model and generate an auxiliary opposite relation field to each of them
        dataModel.fields.forEach((field) => {
            // don't process fields inherited from a delegate model
            if (field.$inheritedFrom && isDelegateModel(field.$inheritedFrom)) {
                return;
            }

            const fieldType = field.type.reference?.ref;
            if (!isDataModel(fieldType)) {
                return;
            }

            // find concrete models that inherit from this field's model type
            const concreteModels = dataModel.$container.declarations.filter(
                (d) => isDataModel(d) && isDescendantOf(d, fieldType)
            );

            concreteModels.forEach((concrete) => {
                // aux relation name format: delegate_aux_[model]_[relationField]_[concrete]
                // e.g., delegate_aux_User_myAsset_Video
                const auxRelationName = `${dataModel.name}_${field.name}_${concrete.name}`;
                const auxRelationField = model.addField(
                    `${DELEGATE_AUX_RELATION_PREFIX}_${this.truncate(auxRelationName)}`,
                    new ModelFieldType(concrete.name, field.type.array, field.type.optional)
                );

                const relAttr = getAttribute(field, '@relation');
                if (relAttr) {
                    const fieldsArg = getAttributeArg(relAttr, 'fields');
                    const nameArg = getAttributeArg(relAttr, 'name') as LiteralExpr;
                    if (fieldsArg) {
                        // for reach foreign key field pointing to the delegate model, we need to create an aux foreign key
                        // to point to the concrete model
                        const relationFieldPairs = getRelationKeyPairs(field);
                        const addedFkFields: ModelField[] = [];
                        for (const { foreignKey } of relationFieldPairs) {
                            const addedFkField = this.replicateForeignKey(model, dataModel, concrete, foreignKey);
                            addedFkFields.push(addedFkField);
                        }

                        // the `@relation(..., fields: [...])` attribute argument
                        const fieldsArg = new AttributeArgValue(
                            'Array',
                            addedFkFields.map(
                                (addedFk) =>
                                    new AttributeArgValue('FieldReference', new PrismaFieldReference(addedFk.name))
                            )
                        );

                        // the `@relation(..., references: [...])` attribute argument
                        const referencesArg = new AttributeArgValue(
                            'Array',
                            relationFieldPairs.map(
                                ({ id }) => new AttributeArgValue('FieldReference', new PrismaFieldReference(id.name))
                            )
                        );

                        const addedRel = new PrismaFieldAttribute('@relation', [
                            // use field name as relation name for disambiguation
                            new PrismaAttributeArg(undefined, new AttributeArgValue('String', nameArg?.value || auxRelationField.name)),
                            new PrismaAttributeArg('fields', fieldsArg),
                            new PrismaAttributeArg('references', referencesArg),
                        ]);

                        if (this.supportNamedConstraints) {
                            addedRel.args.push(
                                // generate a `map` argument for foreign key constraint disambiguation
                                new PrismaAttributeArg(
                                    'map',
                                    new PrismaAttributeArgValue('String', `${auxRelationField.name}_fk`)
                                )
                            );
                        }

                        auxRelationField.attributes.push(addedRel);
                    } else {
                        auxRelationField.attributes.push(this.makeFieldAttribute(relAttr as DataModelFieldAttribute));
                    }
                } else {
                    auxRelationField.attributes.push(
                        new PrismaFieldAttribute('@relation', [
                            // use field name as relation name for disambiguation
                            new PrismaAttributeArg(undefined, new AttributeArgValue('String', auxRelationField.name)),
                        ])
                    );
                }
            });
        });
    }

    private replicateForeignKey(
        model: PrismaDataModel,
        dataModel: DataModel,
        concreteModel: AbstractDeclaration,
        origForeignKey: DataModelField
    ) {
        // aux fk name format: delegate_aux_[model]_[fkField]_[concrete]
        // e.g., delegate_aux_User_myAssetId_Video

        // generate a fk field based on the original fk field
        const addedFkField = this.generateModelField(model, origForeignKey);

        // fix its name
        const addedFkFieldName = `${dataModel.name}_${origForeignKey.name}_${concreteModel.name}`;
        addedFkField.name = `${DELEGATE_AUX_RELATION_PREFIX}_${this.truncate(addedFkFieldName)}`;

        // we also need to make sure `@unique` constraint's `map` parameter is fixed to avoid conflict
        const uniqueAttr = addedFkField.attributes.find(
            (attr) => (attr as PrismaFieldAttribute).name === '@unique'
        ) as PrismaFieldAttribute;
        if (uniqueAttr) {
            const mapArg = uniqueAttr.args.find((arg) => arg.name === 'map');
            const constraintName = `${addedFkField.name}_unique`;
            if (mapArg) {
                mapArg.value = new AttributeArgValue('String', constraintName);
            } else {
                uniqueAttr.args.push(new PrismaAttributeArg('map', new AttributeArgValue('String', constraintName)));
            }
        }

        // we also need to go through model-level `@@unique` and replicate those involving fk fields
        this.replicateForeignKeyModelLevelUnique(model, dataModel, origForeignKey, addedFkField);

        return addedFkField;
    }

    private replicateForeignKeyModelLevelUnique(
        model: PrismaDataModel,
        dataModel: DataModel,
        origForeignKey: DataModelField,
        addedFkField: ModelField
    ) {
        for (const uniqueAttr of dataModel.attributes.filter((attr) => attr.decl.ref?.name === '@@unique')) {
            const fields = getAttributeArg(uniqueAttr, 'fields');
            if (fields && isArrayExpr(fields)) {
                const found = fields.items.find(
                    (fieldRef) => isReferenceExpr(fieldRef) && fieldRef.target.ref === origForeignKey
                );
                if (found) {
                    // replicate the attribute and replace the field reference with the new FK field
                    const args: PrismaAttributeArgValue[] = [];
                    for (const arg of fields.items) {
                        if (isReferenceExpr(arg) && arg.target.ref === origForeignKey) {
                            // replace
                            args.push(
                                new PrismaAttributeArgValue(
                                    'FieldReference',
                                    new PrismaFieldReference(addedFkField.name)
                                )
                            );
                        } else {
                            // copy
                            args.push(
                                new PrismaAttributeArgValue(
                                    'FieldReference',
                                    new PrismaFieldReference((arg as ReferenceExpr).target.$refText)
                                )
                            );
                        }
                    }

                    model.addAttribute('@@unique', [
                        new PrismaAttributeArg(undefined, new PrismaAttributeArgValue('Array', args)),
                    ]);
                }
            }
        }
    }

    private truncate(name: string) {
        if (name.length <= IDENTIFIER_NAME_MAX_LENGTH) {
            return name;
        }

        const shortName = name.slice(0, IDENTIFIER_NAME_MAX_LENGTH);
        const entry = this.shortNameMap.get(shortName);
        if (!entry) {
            this.shortNameMap.set(shortName, [name]);
            return `${shortName}_0`;
        } else {
            const index = entry.findIndex((n) => n === name);
            if (index >= 0) {
                return `${shortName}_${index}`;
            } else {
                const newIndex = entry.length;
                entry.push(name);
                return `${shortName}_${newIndex}`;
            }
        }
    }

    private nameRelationsInheritedFromDelegate(model: PrismaDataModel, decl: DataModel) {
        if (this.mode !== 'logical') {
            return;
        }

        // the logical schema needs to name relations inherited from delegate base models for disambiguation

        decl.fields.forEach((f) => {
            if (!isDataModel(f.type.reference?.ref)) {
                // only process relation fields
                return;
            }

            if (!f.$inheritedFrom) {
                // only process inherited fields
                return;
            }

            // Walk up the inheritance chain to find a field with matching name
            // which is where this field is inherited from.
            //
            // Note that we can't walk all the way up to the $inheritedFrom model
            // because it may have been eliminated because of being abstract.

            const baseField = this.findUpMatchingFieldFromDelegate(decl, f);
            if (!baseField) {
                // only process fields inherited from delegate models
                return;
            }

            const prismaField = model.fields.find((field) => field.name === f.name);
            if (!prismaField) {
                return;
            }

            // find the opposite side of the relation
            const oppositeRelationField = this.getOppositeRelationField(f.type.reference.ref, baseField);
            if (!oppositeRelationField) {
                return;
            }

            const fieldType = f.type.reference.ref;

            // relation name format: delegate_aux_[relationType]_[oppositeRelationField]_[concrete]
            const relAttr = getAttribute(f, '@relation');
            const name = `${fieldType.name}_${oppositeRelationField.name}_${decl.name}`;
            const relName = `${DELEGATE_AUX_RELATION_PREFIX}_${this.truncate(name)}`;

            if (relAttr) {
                const nameArg = getAttributeArg(relAttr, 'name');
                if (!nameArg) {
                    const prismaRelAttr = prismaField.attributes.find(
                        (attr) => (attr as PrismaFieldAttribute).name === '@relation'
                    ) as PrismaFieldAttribute;
                    if (prismaRelAttr) {
                        prismaRelAttr.args.unshift(
                            new PrismaAttributeArg(undefined, new AttributeArgValue('String', relName))
                        );
                    }
                }
            } else {
                prismaField.attributes.push(
                    new PrismaFieldAttribute('@relation', [
                        new PrismaAttributeArg(undefined, new AttributeArgValue('String', relName)),
                    ])
                );
            }
        });
    }

    private findUpMatchingFieldFromDelegate(start: DataModel, target: DataModelField): DataModelField | undefined {
        for (const base of start.superTypes) {
            if (isDataModel(base.ref)) {
                if (isDelegateModel(base.ref)) {
                    const field = base.ref.fields.find((f) => f.name === target.name);
                    if (field) {
                        if (!field.$inheritedFrom || !isDelegateModel(field.$inheritedFrom)) {
                            // if this field is not inherited from an upper delegate, we're done
                            return field;
                        }
                    }
                }

                const upper = this.findUpMatchingFieldFromDelegate(base.ref, target);
                if (upper) {
                    return upper;
                }
            }
        }
        return undefined;
    }

    private getOppositeRelationField(oppositeModel: DataModel, relationField: DataModelField) {
        const relName = this.getRelationName(relationField);
        return oppositeModel.fields.find(
            (f) => f.type.reference?.ref === relationField.$container && this.getRelationName(f) === relName
        );
    }

    private getRelationName(field: DataModelField) {
        const relAttr = getAttribute(field, '@relation');
        if (!relAttr) {
            return undefined;
        }
        return getAttributeArgLiteral<string>(relAttr, 'name');
    }

    private get supportNamedConstraints() {
        const ds = this.zmodel.declarations.find(isDataSource);
        if (!ds) {
            return false;
        }

        const provider = ds.fields.find((f) => f.name === 'provider');
        if (!provider) {
            return false;
        }

        const value = getStringLiteral(provider.value);
        return value && PROVIDERS_SUPPORTING_NAMED_CONSTRAINTS.includes(value);
    }

    private isPrismaAttribute(attr: DataModelAttribute | DataModelFieldAttribute) {
        if (!attr.decl.ref) {
            return false;
        }
        const attrDecl = resolved(attr.decl);
        return (
            !!attrDecl.attributes.find((a) => a.decl.ref?.name === '@@@prisma') ||
            // the special pass-through attribute
            attrDecl.name === MODEL_PASSTHROUGH_ATTR ||
            attrDecl.name === FIELD_PASSTHROUGH_ATTR
        );
    }

    private getUnsupportedFieldType(fieldType: DataModelFieldType) {
        if (fieldType.unsupported) {
            const value = getStringLiteral(fieldType.unsupported.value);
            if (value) {
                return `Unsupported("${value}")`;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    private generateModelField(model: PrismaDataModel, field: DataModelField, addToFront = false) {
        const fieldType =
            field.type.type || field.type.reference?.ref?.name || this.getUnsupportedFieldType(field.type);
        if (!fieldType) {
            throw new PluginError(name, `Field type is not resolved: ${field.$container.name}.${field.name}`);
        }

        const type = new ModelFieldType(fieldType, field.type.array, field.type.optional);

        const attributes = field.attributes
            .filter((attr) => this.isPrismaAttribute(attr))
            // `@default` with `auth()` is handled outside Prisma
            .filter((attr) => !isDefaultWithAuth(attr))
            .filter(
                (attr) =>
                    // when building physical schema, exclude `@default` for id fields inherited from delegate base
                    !(
                        this.mode === 'physical' &&
                        isIdField(field) &&
                        this.isInheritedFromDelegate(field) &&
                        attr.decl.$refText === '@default'
                    )
            )
            .map((attr) => this.makeFieldAttribute(attr));

        const nonPrismaAttributes = field.attributes.filter((attr) => attr.decl.ref && !this.isPrismaAttribute(attr));

        const documentations = nonPrismaAttributes.map((attr) => '/// ' + this.zModelGenerator.generate(attr));

        const result = model.addField(field.name, type, attributes, documentations, addToFront);

        if (this.mode === 'logical') {
            if (field.attributes.some((attr) => isDefaultWithAuth(attr))) {
                // field has `@default` with `auth()`, turn it into a dummy default value, and the
                // real default value setting is handled outside Prisma
                this.setDummyDefault(result, field);
            }
        }

        // user defined comments pass-through
        field.comments.forEach((c) => result.addComment(c));
        return result;
    }

    private setDummyDefault(result: ModelField, field: DataModelField) {
        const dummyDefaultValue = match(field.type.type)
            .with('String', () => new AttributeArgValue('String', ''))
            .with(P.union('Int', 'BigInt', 'Float', 'Decimal'), () => new AttributeArgValue('Number', '0'))
            .with('Boolean', () => new AttributeArgValue('Boolean', 'false'))
            .with('DateTime', () => new AttributeArgValue('FunctionCall', new PrismaFunctionCall('now')))
            .with('Json', () => new AttributeArgValue('String', '{}'))
            .with('Bytes', () => new AttributeArgValue('String', ''))
            .otherwise(() => {
                throw new PluginError(name, `Unsupported field type with default value: ${field.type.type}`);
            });

        result.attributes.push(
            new PrismaFieldAttribute('@default', [new PrismaAttributeArg(undefined, dummyDefaultValue)])
        );
    }

    private isInheritedFromDelegate(field: DataModelField) {
        return field.$inheritedFrom && isDelegateModel(field.$inheritedFrom);
    }

    private makeFieldAttribute(attr: DataModelFieldAttribute) {
        const attrName = resolved(attr.decl).name;
        if (attrName === FIELD_PASSTHROUGH_ATTR) {
            const text = getLiteral<string>(attr.args[0].value);
            if (text) {
                return new PrismaPassThroughAttribute(text);
            } else {
                throw new PluginError(name, `Invalid arguments for ${FIELD_PASSTHROUGH_ATTR} attribute`);
            }
        } else {
            return new PrismaFieldAttribute(
                attrName,
                attr.args.map((arg) => this.makeAttributeArg(arg))
            );
        }
    }

    private makeAttributeArg(arg: AttributeArg): PrismaAttributeArg {
        return new PrismaAttributeArg(arg.name, this.makeAttributeArgValue(arg.value));
    }

    private makeAttributeArgValue(node: Expression): PrismaAttributeArgValue {
        if (isLiteralExpr(node)) {
            const argType = match(node.$type)
                .with(StringLiteral, () => 'String' as const)
                .with(NumberLiteral, () => 'Number' as const)
                .with(BooleanLiteral, () => 'Boolean' as const)
                .exhaustive();
            return new PrismaAttributeArgValue(argType, node.value);
        } else if (isArrayExpr(node)) {
            return new PrismaAttributeArgValue(
                'Array',
                new Array(...node.items.map((item) => this.makeAttributeArgValue(item)))
            );
        } else if (isReferenceExpr(node)) {
            return new PrismaAttributeArgValue(
                'FieldReference',
                new PrismaFieldReference(
                    resolved(node.target).name,
                    node.args.map((arg) => new PrismaFieldReferenceArg(arg.name, this.exprToText(arg.value)))
                )
            );
        } else if (isInvocationExpr(node)) {
            // invocation
            return new PrismaAttributeArgValue('FunctionCall', this.makeFunctionCall(node));
        } else {
            throw new PluginError(name, `Unsupported attribute argument expression type: ${node.$type}`);
        }
    }

    makeFunctionCall(node: InvocationExpr): PrismaFunctionCall {
        return new PrismaFunctionCall(
            resolved(node.function).name,
            node.args.map((arg) => {
                const val = match(arg.value)
                    .when(isStringLiteral, (v) => `"${v.value}"`)
                    .when(isLiteralExpr, (v) => v.value.toString())
                    .when(isNullExpr, () => 'null')
                    .otherwise(() => {
                        throw new PluginError(name, 'Function call argument must be literal or null');
                    });

                return new PrismaFunctionCallArg(val);
            })
        );
    }

    private generateContainerAttribute(container: PrismaContainerDeclaration, attr: DataModelAttribute) {
        const attrName = resolved(attr.decl).name;
        if (attrName === MODEL_PASSTHROUGH_ATTR) {
            const text = getLiteral<string>(attr.args[0].value);
            if (text) {
                container.attributes.push(new PrismaPassThroughAttribute(text));
            }
        } else {
            container.attributes.push(
                new PrismaModelAttribute(
                    attrName,
                    attr.args.map((arg) => this.makeAttributeArg(arg))
                )
            );
        }
    }

    private generateEnum(prisma: PrismaModel, decl: Enum) {
        const _enum = prisma.addEnum(decl.name);

        for (const field of decl.fields) {
            this.generateEnumField(_enum, field);
        }

        for (const attr of decl.attributes.filter((attr) => this.isPrismaAttribute(attr))) {
            this.generateContainerAttribute(_enum, attr);
        }

        decl.attributes
            .filter((attr) => attr.decl.ref && !this.isPrismaAttribute(attr))
            .forEach((attr) => _enum.addComment('/// ' + this.zModelGenerator.generate(attr)));

        // user defined comments pass-through
        decl.comments.forEach((c) => _enum.addComment(c));
    }

    private generateEnumField(_enum: PrismaEnum, field: EnumField) {
        const attributes = field.attributes
            .filter((attr) => this.isPrismaAttribute(attr))
            .map((attr) => this.makeFieldAttribute(attr));

        const nonPrismaAttributes = field.attributes.filter((attr) => attr.decl.ref && !this.isPrismaAttribute(attr));

        const documentations = nonPrismaAttributes.map((attr) => '/// ' + this.zModelGenerator.generate(attr));
        _enum.addField(field.name, attributes, documentations.concat(field.comments));
    }
}

function isDescendantOf(model: DataModel, superModel: DataModel): boolean {
    return model.superTypes.some((s) => s.ref === superModel || isDescendantOf(s.ref!, superModel));
}
