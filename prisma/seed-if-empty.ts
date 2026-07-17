import { PrismaClient } from "@prisma/client";
import { resolveDatabaseEnv } from "../src/lib/db-env";
import { ensureRoadmapSeeded } from "../src/lib/roadmap/seed-if-empty";

resolveDatabaseEnv();

const prisma = new PrismaClient();

async function main() {
  await ensureRoadmapSeeded();
  const count = await prisma.feature.count();
  console.log(`Roadmap ready with ${count} feature(s).`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
