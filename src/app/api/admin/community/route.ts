import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { authorizeAdmin } from "@/lib/admin-auth";
import { hasDatabaseUrl } from "@/lib/db-env";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ROLE_LABELS: Record<string, string> = {
  DEVELOPER: "Developer",
  DESIGNER: "Designer",
  STUDENT: "Student",
  LECTURER: "Lecturer",
  TESTER: "Tester",
  OTHER: "Other",
};

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  if (!authorizeAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const search = searchParams.get("search")?.trim();
  const format = searchParams.get("format");

  const where: Prisma.CommunityMemberWhereInput = {};

  if (role && role !== "all") {
    where.role = role as Prisma.EnumCommunityRoleFilter["equals"];
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const [members, total, recentCount] = await Promise.all([
      prisma.communityMember.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.communityMember.count(),
      prisma.communityMember.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    if (format === "csv") {
      const header =
        "Full Name,Email,Role,GitHub,LinkedIn,Message,Joined At";
      const rows = members.map((m) =>
        [
          escapeCsv(m.fullName),
          escapeCsv(m.email),
          escapeCsv(ROLE_LABELS[m.role] ?? m.role),
          escapeCsv(m.githubUrl ?? ""),
          escapeCsv(m.linkedInUrl ?? ""),
          escapeCsv(m.message ?? ""),
          escapeCsv(m.createdAt.toISOString()),
        ].join(",")
      );

      return new NextResponse([header, ...rows].join("\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="veriattend-community-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({
      members,
      stats: {
        total,
        recentSignups: recentCount,
      },
    });
  } catch (error) {
    console.error("Failed to load community members:", error);
    return NextResponse.json(
      { error: "Unable to load community members" },
      { status: 500 }
    );
  }
}
