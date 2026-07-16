import { PrismaClient } from "@prisma/client";
import { FALLBACK_FEATURES, FALLBACK_STATS } from "../src/lib/roadmap/fallback-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.featureVote.deleteMany();
  await prisma.featureCommentLike.deleteMany();
  await prisma.featureComment.deleteMany();
  await prisma.featureSubscriber.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.featureRequest.deleteMany();
  await prisma.roadmapStat.deleteMany();

  for (const [index, feature] of FALLBACK_FEATURES.entries()) {
    await prisma.feature.create({
      data: {
        title: feature.title,
        description: feature.description,
        status: feature.status,
        category: feature.category,
        priority: feature.priority,
        beneficiary: feature.beneficiary,
        estimatedRelease: feature.estimatedRelease,
        phase: feature.phase,
        estimatedDays: feature.estimatedDays,
        assignedDev: feature.assignedDev,
        version: feature.version,
        sortOrder: index,
        published: true,
      },
    });
  }

  const stats = [
    { key: "institutions", value: FALLBACK_STATS.institutionsUsing, label: "Institutions" },
    { key: "students", value: FALLBACK_STATS.studentsManaged, label: "Students" },
    { key: "lecturers", value: 86, label: "Lecturers" },
    { key: "sessions", value: 1240, label: "Sessions" },
    { key: "records", value: FALLBACK_STATS.attendanceRecords, label: "Records" },
    { key: "verifications", value: 38500, label: "Verifications" },
    { key: "uptime", value: 999, label: "Uptime" },
  ];

  for (const stat of stats) {
    await prisma.roadmapStat.create({ data: stat });
  }

  await prisma.featureRequest.createMany({
    data: [
      {
        title: "Biometric Fingerprint Login",
        description: "Use fingerprint for quick attendance verification on supported devices.",
        category: "ATTENDANCE",
        beneficiary: "STUDENT",
        priority: "MEDIUM",
        submitterName: "Demo User",
        status: "PENDING",
      },
      {
        title: "Slack Integration",
        description: "Send attendance alerts to Slack channels for admin teams.",
        category: "INTEGRATIONS",
        beneficiary: "ADMIN",
        priority: "LOW",
        submitterName: "Demo Admin",
        status: "PENDING",
      },
    ],
  });

  console.log("Roadmap seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
