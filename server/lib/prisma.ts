import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaConnected?: boolean;
};

function createClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** Ensure a live connection; recover after Supabase closes idle sockets. */
export async function ensureDb() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    globalForPrisma.prismaConnected = true;
  } catch {
    try {
      await prisma.$disconnect();
    } catch {
      /* ignore */
    }
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    globalForPrisma.prismaConnected = true;
  }
}

export default prisma;
