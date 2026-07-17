import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ADMIN_KEY = process.env.ROADMAP_ADMIN_KEY;

const updateSchema = z.object({
  status: z
    .enum(["PLANNED", "IN_PROGRESS", "TESTING", "COMPLETED"])
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  assignedDev: z.string().optional(),
  published: z.boolean().optional(),
  estimatedRelease: z.string().optional(),
});

function authorize(request: Request) {
  const key = request.headers.get("x-admin-key");
  return ADMIN_KEY && key === ADMIN_KEY;
}

export async function PATCH(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing feature id" }, { status: 400 });
    }

    const body = await request.json();
    const data = updateSchema.parse(body);

    const feature = await prisma.feature.update({
      where: { id },
      data,
    });

    return NextResponse.json({ feature });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await prisma.featureRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ requests });
}
