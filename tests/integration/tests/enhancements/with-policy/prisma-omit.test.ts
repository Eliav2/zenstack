import { loadSchema } from '@zenstackhq/testtools';

describe('prisma omit', () => {
    it('per query', async () => {
        const { prisma, enhance } = await loadSchema(
            `
            model User {
              id   String @id @default(cuid())
              name String
              profile Profile?
              age Int
              value Int @allow('read', age > 20)
              @@allow('all', age > 18)
            }
            
            model Profile {
              id   String @id @default(cuid())
              user User   @relation(fields: [userId], references: [id])
              userId String @unique
              level Int
              @@allow('all', level > 1)
            }
            `,
            { previewFeatures: ['omitApi'] }
        );

        await prisma.user.create({
            data: {
                name: 'John',
                age: 25,
                value: 10,
                profile: {
                    create: { level: 2 },
                },
            },
        });

        const db = enhance();
        let found = await db.user.findFirst({
            include: { profile: { omit: { level: true } } },
            omit: {
                age: true,
            },
        });
        expect(found.age).toBeUndefined();
        expect(found.value).toEqual(10);
        expect(found.profile.level).toBeUndefined();

        found = await db.user.findFirst({
            select: { value: true, profile: { omit: { level: true } } },
        });
        console.log(found);
        expect(found.age).toBeUndefined();
        expect(found.value).toEqual(10);
        expect(found.profile.level).toBeUndefined();
    });

    it('global', async () => {
        const { prisma, enhance } = await loadSchema(
            `
            model User {
              id   String @id @default(cuid())
              name String
              profile Profile?
              age Int
              value Int
              @@allow('all', true)
            }
            
            model Profile {
              id   String @id @default(cuid())
              user User   @relation(fields: [userId], references: [id])
              userId String @unique
              level Int
              @@allow('all', true)
            }
            `,
            {
                previewFeatures: ['omitApi'],
                prismaClientOptions: {
                    omit: {
                        user: { age: true, value: false },
                        profile: { level: true },
                    },
                },
            }
        );

        await prisma.user.create({
            data: {
                name: 'John',
                age: 25,
                value: 10,
                profile: {
                    create: { level: 2 },
                },
            },
        });

        const db = enhance();

        let found = await db.user.findFirst({
            include: { profile: true },
        });
        expect(found.age).toBeUndefined();
        expect(found.value).toEqual(10);
        expect(found.profile.level).toBeUndefined();

        found = await db.user.findFirst({
            omit: { age: false },
            include: { profile: true },
        });
        expect(found.age).toBe(25);

        found = await db.user.findFirst({
            select: { value: true, profile: true },
        });
        console.log(found);
        expect(found.age).toBeUndefined();
        expect(found.value).toEqual(10);
        expect(found.profile.level).toBeUndefined();
    });
});
