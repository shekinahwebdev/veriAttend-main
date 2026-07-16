import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createVoterId,
  getVoterId,
  VOTER_COOKIE_OPTIONS,
} from "@/lib/roadmap/voter";
import { toggleVote } from "@/lib/roadmap/service";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let voterId = await getVoterId();
  const cookieStore = await cookies();

  if (!voterId) {
    voterId = createVoterId();
    cookieStore.set(VOTER_COOKIE_OPTIONS.name, voterId, VOTER_COOKIE_OPTIONS);
  }

  try {
    const feature = await prisma.feature.findUnique({ where: { id } });
    if (!feature) {
      return NextResponse.json({ error: "Feature not found" }, { status: 404 });
    }

    const result = await toggleVote(id, voterId);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Unable to process vote" },
      { status: 500 }
    );
  }
}
