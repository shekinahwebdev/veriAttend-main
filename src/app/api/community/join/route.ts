import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { hasDatabaseUrl } from "@/lib/db-env";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const joinSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(200),
  role: z.enum([
    "DEVELOPER",
    "DESIGNER",
    "STUDENT",
    "LECTURER",
    "TESTER",
    "OTHER",
  ]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json(
      { error: "Community signups are temporarily unavailable." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const data = joinSchema.parse(body);
    const email = data.email.trim().toLowerCase();

    const member = await prisma.communityMember.create({
      data: {
        fullName: data.fullName.trim(),
        email,
        role: data.role,
        githubUrl: data.githubUrl || null,
        linkedInUrl: data.linkedInUrl || null,
        message: data.message?.trim() || null,
      },
    });

    return NextResponse.json({ id: member.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "This email is already registered with the community." },
        { status: 409 }
      );
    }

    console.error("Community signup failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again." },
      { status: 500 }
    );
  }
}
