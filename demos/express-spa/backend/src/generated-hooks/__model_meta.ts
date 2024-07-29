/* eslint-disable */
const metadata = {
    models: {
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, username: {
                    name: "username",
                    type: "String",
                }, posts: {
                    name: "posts",
                    type: "Post",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'author',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, username: {
                    name: "username",
                    fields: ["username"]
                },
            }
            ,
        }
        ,
        post: {
            name: 'Post', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, title: {
                    name: "title",
                    type: "String",
                }, content: {
                    name: "content",
                    type: "String",
                }, published: {
                    name: "published",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": false }] }],
                }, author: {
                    name: "author",
                    type: "User",
                    isDataModel: true,
                    backLink: 'posts',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "authorId" },
                }, authorId: {
                    name: "authorId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'author',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
    }
    ,
    authModel: 'User'
};
export default metadata;
