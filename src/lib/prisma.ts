import { getPrismaDatabaseUrl, resolveDatabaseEnv } from "@/lib/db-env";
import { PrismaClient } from "@prisma/client";

resolveDatabaseEnv();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    datasources: {
      db: { url: getPrismaDatabaseUrl() },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;

  // Recreate stale clients after schema changes during local development.
  if (!cached || !("communityMember" in cached)) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma as PrismaClient;
}

export const prisma = getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
