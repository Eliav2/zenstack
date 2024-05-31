import { PrismaClient, Prisma } from '@prisma/client';
import * as R from 'ramda';

export const prisma = new PrismaClient();

interface MyPrismaClient extends PrismaClient {
    // You can add additional properties or methods here if needed
}

type myPrisma = PrismaClient;

type s = myPrisma['product'];
