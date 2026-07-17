import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasDatabaseUrl } from "@/lib/db-env";
import {
  FALLBACK_PLATFORM_STATS,
  type PlatformStats,
} from "@/lib/platform-stats";

export async function GET() {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json(FALLBACK_PLATFORM_STATS);
    }

    const rows = await prisma.roadmapStat.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    const stats: PlatformStats = {
      institutions: map.institutions ?? FALLBACK_PLATFORM_STATS.institutions,
      students: map.students ?? FALLBACK_PLATFORM_STATS.students,
      lecturers: map.lecturers ?? FALLBACK_PLATFORM_STATS.lecturers,
      sessions: map.sessions ?? FALLBACK_PLATFORM_STATS.sessions,
      records: map.records ?? FALLBACK_PLATFORM_STATS.records,
      verifications:
        map.verifications ?? FALLBACK_PLATFORM_STATS.verifications,
      uptime: map.uptime ? map.uptime / 10 : FALLBACK_PLATFORM_STATS.uptime,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(FALLBACK_PLATFORM_STATS);
  }
}
