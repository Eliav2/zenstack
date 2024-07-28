import express, { Request, Response } from 'express';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import { enhance } from '@zenstackhq/runtime';
import { PrismaClient, Prisma } from '@prisma/client';

export const app = express();

export const prisma = new PrismaClient();

function getUserFromRequest(req: Request) {
    return req.headers['x-user-email'] as string;
}

export async function getPrisma(req: Request) {
    const email = getUserFromRequest(req);
    const user =
        email &&
        (await prisma.user.findUnique({
            where: { email },
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
