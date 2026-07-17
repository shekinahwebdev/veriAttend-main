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

  if (process.env.DATABASE_URL) {
    process.env.DATABASE_URL = normalizePooledUrl(process.env.DATABASE_URL);
  }
  if (process.env.DIRECT_URL) {
    process.env.DIRECT_URL = normalizeDirectUrl(process.env.DIRECT_URL);
  }
}

export function hasDatabaseUrl() {
  resolveDatabaseEnv();
  return Boolean(process.env.DATABASE_URL);
}

/** Prisma queries are most reliable over Neon's direct connection on serverless. */
export function getPrismaDatabaseUrl() {
  resolveDatabaseEnv();
  const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
  return url;
}

/** Prisma + Neon pooler requires pgbouncer mode; channel_binding breaks some runtimes. */
function normalizePooledUrl(url: string) {
  let normalized = stripChannelBinding(url);

  if (normalized.includes("-pooler") && !normalized.includes("pgbouncer=true")) {
    normalized += normalized.includes("?") ? "&" : "?";
    normalized += "pgbouncer=true";
  }

  return normalized;
}

function normalizeDirectUrl(url: string) {
  let normalized = stripChannelBinding(url);

  if (!normalized.includes("connection_limit=")) {
    normalized += normalized.includes("?") ? "&" : "?";
    normalized += "connection_limit=1";
  }

  return normalized;
}

function stripChannelBinding(url: string) {
  return url
    .replace(/([?&])channel_binding=require&/g, "$1")
    .replace(/[?&]channel_binding=require/g, "")
    .replace(/\?$/, "");
}
