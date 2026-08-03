import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

/** @deprecated use getPrisma() — kept for existing imports */
export const prisma = getPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

async function resetClient() {
  try {
    await globalForPrisma.prisma?.$disconnect();
  } catch {
    /* ignore */
  }
  globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}

/** Recover from Supabase closing idle pool connections. */
export async function ensureDb() {
  const client = getPrisma();
  try {
    await client.$queryRaw`SELECT 1`;
    return client;
  } catch {
    const fresh = await resetClient();
    await fresh.$queryRaw`SELECT 1`;
    return fresh;
  }
}

/** Run a DB query with one automatic reconnect retry. */
export async function withDb<T>(fn: (client: PrismaClient) => Promise<T>): Promise<T> {
  try {
    return await fn(getPrisma());
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const retryable =
      message.includes("ConnectionReset") ||
      message.includes("connection pool") ||
      message.includes("Can't reach database") ||
      message.includes("Closed") ||
      message.includes("ECONNRESET");

    if (!retryable) throw err;

    const fresh = await resetClient();
    return fn(fresh);
  }
}

export function validateDatabaseUrl() {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    console.warn("DATABASE_URL is not set.");
    return;
  }
  if (url.includes("pooler.supabase.com:5432")) {
    console.warn(
      "[DB] DATABASE_URL uses Supabase pooler port 5432 (session mode). " +
        "Prisma works best with port 6543 (transaction mode). " +
        "Update .env to: ...pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=20&connect_timeout=30"
    );
  }
}

export default prisma;
