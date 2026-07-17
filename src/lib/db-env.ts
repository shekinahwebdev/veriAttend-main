/** Map Vercel/Neon integration env names to Prisma's expected vars. */
export function resolveDatabaseEnv() {
  if (!process.env.DATABASE_URL && process.env.POSTGRES_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL;
  }
  if (!process.env.DIRECT_URL && process.env.POSTGRES_URL_NON_POOLING) {
    process.env.DIRECT_URL = process.env.POSTGRES_URL_NON_POOLING;
  }
  if (!process.env.DIRECT_URL && process.env.DATABASE_URL) {
    process.env.DIRECT_URL = process.env.DATABASE_URL;
  }
}

export function hasDatabaseUrl() {
  resolveDatabaseEnv();
  return Boolean(process.env.DATABASE_URL);
}
