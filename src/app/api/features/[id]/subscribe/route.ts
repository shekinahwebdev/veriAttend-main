import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    const feature = await prisma.feature.findUnique({ where: { id } });
    if (!feature) {
      return NextResponse.json({ error: "Feature not found" }, { status: 404 });
    }

    await prisma.featureSubscriber.upsert({
      where: { featureId_email: { featureId: id, email } },
      create: { featureId: id, email },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unable to subscribe" },
      { status: 500 }
    );
  }
}
