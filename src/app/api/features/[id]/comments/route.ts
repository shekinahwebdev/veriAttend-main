import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getFeatureComments } from "@/lib/roadmap/service";
import { getVoterId } from "@/lib/roadmap/voter";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const voterId = await getVoterId();

  try {
    const comments = await getFeatureComments(id, voterId || undefined);
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

const commentSchema = z.object({
  authorName: z.string().min(1).max(80),
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const data = commentSchema.parse(body);

    const feature = await prisma.feature.findUnique({ where: { id } });
    if (!feature) {
      return NextResponse.json({ error: "Feature not found" }, { status: 404 });
    }

    const comment = await prisma.featureComment.create({
      data: {
        featureId: id,
        authorName: data.authorName,
        content: data.content,
        parentId: data.parentId || null,
      },
    });

    return NextResponse.json(
      {
        id: comment.id,
        authorName: comment.authorName,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unable to post comment" },
      { status: 500 }
    );
  }
}
