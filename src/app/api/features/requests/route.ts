import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const requestSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  category: z.enum([
    "AI",
    "MOBILE",
    "ATTENDANCE",
    "ANALYTICS",
    "INTEGRATIONS",
    "ADMIN",
    "NOTIFICATIONS",
    "OTHER",
  ]),
  beneficiary: z.enum([
    "STUDENT",
    "LECTURER",
    "ADMIN",
    "SUPER_ADMIN",
    "EVERYONE",
  ]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  submitterName: z.string().min(1).max(80).optional(),
  submitterEmail: z.string().email().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = requestSchema.parse(body);

    const featureRequest = await prisma.featureRequest.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        beneficiary: data.beneficiary,
        priority: data.priority,
        submitterName: data.submitterName || null,
        submitterEmail: data.submitterEmail || null,
      },
    });

    return NextResponse.json({ id: featureRequest.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unable to submit feature request" },
      { status: 500 }
    );
  }
}
