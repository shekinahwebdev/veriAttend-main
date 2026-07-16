import type { Metadata } from "next";
import { RoadmapPage } from "@/components/roadmap/roadmap-page";
import { getFeatures, getRoadmapStats } from "@/lib/roadmap/service";
import { getVoterId } from "@/lib/roadmap/voter";

export const metadata: Metadata = {
  title: "Roadmap — VeriAttend",
  description:
    "Explore the VeriAttend public roadmap. Vote on features, suggest ideas, and track development progress.",
};

export default async function Roadmap() {
  const voterId = await getVoterId();
  const [features, stats] = await Promise.all([
    getFeatures(voterId || undefined),
    getRoadmapStats(),
  ]);

  return <RoadmapPage initialFeatures={features} initialStats={stats} />;
}
