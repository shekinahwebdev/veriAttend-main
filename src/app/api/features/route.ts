import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createVoterId,
  getVoterId,
  VOTER_COOKIE_OPTIONS,
} from "@/lib/roadmap/voter";
import { getFeatures, getRoadmapStats } from "@/lib/roadmap/service";
import type { FeatureStatus, FeatureCategory, FeaturePriority, BeneficiaryType } from "@/lib/roadmap/types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as FeatureStatus | null;
  const category = searchParams.get("category") as FeatureCategory | null;
  const priority = searchParams.get("priority") as FeaturePriority | null;
  const beneficiary = searchParams.get("beneficiary") as BeneficiaryType | null;
  const search = searchParams.get("search")?.toLowerCase();

  let voterId = await getVoterId();
  const cookieStore = await cookies();

  if (!voterId) {
    voterId = createVoterId();
    cookieStore.set(VOTER_COOKIE_OPTIONS.name, voterId, VOTER_COOKIE_OPTIONS);
  }

  const [features, stats] = await Promise.all([
    getFeatures(voterId),
    getRoadmapStats(),
  ]);

  let filtered = features;

  if (status) filtered = filtered.filter((f) => f.status === status);
  if (category) filtered = filtered.filter((f) => f.category === category);
  if (priority) filtered = filtered.filter((f) => f.priority === priority);
  if (beneficiary) filtered = filtered.filter((f) => f.beneficiary === beneficiary);
  if (search) {
    filtered = filtered.filter(
      (f) =>
        f.title.toLowerCase().includes(search) ||
        f.description.toLowerCase().includes(search)
    );
  }

  filtered.sort((a, b) => b.voteCount - a.voteCount);

  return NextResponse.json({ features: filtered, stats });
}
