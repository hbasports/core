import { PrismaClient, type Prisma } from "./generated/prisma/index.js";

const baseClient = new PrismaClient();

export const prisma: PrismaClient = baseClient;

export type { PrismaClient, Prisma };

export default prisma;
