import express, { Request, Response } from 'express';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import { enhance } from '@zenstackhq/runtime';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

export const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

export const prisma = new PrismaClient();

function getUserFromRequest(req: Request) {
    return req.headers['x-user-username'] as string;
}

export async function getPrisma(req: Request) {
    const username = getUserFromRequest(req);

    const user =
        username &&
        (await prisma.user.upsert({
            where: { username },
            update: {},
            create: { username },
        }));

    const context = user ? { ...user } : undefined;
    return enhance(prisma, { user: context });
}

app.use(
    '/model',
    ZenStackMiddleware({
        getPrisma: getPrisma,
        // zodSchemas: true,
    })
);

app.get('/', async (req: Request, res: Response) => {
    return res.json({ message: 'Backend up' });
});
