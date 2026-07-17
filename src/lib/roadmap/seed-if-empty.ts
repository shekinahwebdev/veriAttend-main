import { prisma } from "@/lib/prisma";
import { FALLBACK_FEATURES, FALLBACK_STATS } from "./fallback-data";

/** Insert default roadmap features when the database is empty (non-destructive). */
export async function ensureRoadmapSeeded() {
  const featureCount = await prisma.feature.count();
  if (featureCount > 0) return;

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

  const statCount = await prisma.roadmapStat.count();
  if (statCount === 0) {
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
  }
}
