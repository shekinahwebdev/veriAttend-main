import { prisma } from "@/lib/prisma";
import { hasDatabaseUrl } from "@/lib/db-env";
import type { FeatureItem, RoadmapStats } from "./types";
import { FALLBACK_FEATURES, FALLBACK_STATS } from "./fallback-data";

function mapFeature(
  feature: {
    id: string;
    title: string;
    description: string;
    status: FeatureItem["status"];
    category: FeatureItem["category"];
    priority: FeatureItem["priority"];
    beneficiary: FeatureItem["beneficiary"];
    estimatedRelease: string | null;
    phase: string | null;
    estimatedDays: number | null;
    assignedDev: string | null;
    version: string | null;
    createdAt: Date;
    _count: { votes: number; comments: number };
  },
  hasVoted = false
): FeatureItem {
  return {
    id: feature.id,
    title: feature.title,
    description: feature.description,
    status: feature.status,
    category: feature.category,
    priority: feature.priority,
    beneficiary: feature.beneficiary,
    estimatedRelease: feature.estimatedRelease,
    phase: feature.phase,
    estimatedDays: feature.estimatedDays,
    assignedDev: feature.assignedDev,
    version: feature.version,
    voteCount: feature._count.votes,
    commentCount: feature._count.comments,
    hasVoted,
    createdAt: feature.createdAt.toISOString(),
  };
}

export async function getFeatures(voterId?: string): Promise<FeatureItem[]> {
  if (!hasDatabaseUrl()) return FALLBACK_FEATURES;

  try {
    const features = await prisma.feature.findMany({
      where: { published: true },
      include: {
        _count: { select: { votes: true, comments: true } },
      },
      orderBy: [{ sortOrder: "asc" }],
    });

    if (features.length === 0) return [];

    let votedIds = new Set<string>();
    if (voterId) {
      const votes = await prisma.featureVote.findMany({
        where: { voterId, featureId: { in: features.map((f) => f.id) } },
        select: { featureId: true },
      });
      votedIds = new Set(votes.map((v) => v.featureId));
    }

    return features
      .map((f) => mapFeature(f, votedIds.has(f.id)))
      .sort((a, b) => b.voteCount - a.voteCount);
  } catch (error) {
    console.error("Failed to load features from database:", error);
    return [];
  }
}

export async function getRoadmapStats(): Promise<RoadmapStats> {
  if (!hasDatabaseUrl()) return FALLBACK_STATS;

  try {

    const [
      completed,
      planned,
      inProgress,
      testing,
      suggestions,
      totalVotes,
      statRows,
    ] = await Promise.all([
      prisma.feature.count({ where: { status: "COMPLETED", published: true } }),
      prisma.feature.count({ where: { status: "PLANNED", published: true } }),
      prisma.feature.count({ where: { status: "IN_PROGRESS", published: true } }),
      prisma.feature.count({ where: { status: "TESTING", published: true } }),
      prisma.featureRequest.count({ where: { status: "PENDING" } }),
      prisma.featureVote.count(),
      prisma.roadmapStat.findMany(),
    ]);

    const statMap = Object.fromEntries(statRows.map((s) => [s.key, s.value]));

    return {
      featuresCompleted: completed,
      featuresPlanned: planned,
      featuresInProgress: inProgress + testing,
      communitySuggestions: suggestions,
      totalVotes,
      institutionsUsing: statMap.institutions ?? FALLBACK_STATS.institutionsUsing,
      studentsManaged: statMap.students ?? FALLBACK_STATS.studentsManaged,
      attendanceRecords: statMap.records ?? FALLBACK_STATS.attendanceRecords,
    };
  } catch (error) {
    console.error("Failed to load roadmap stats from database:", error);
    return FALLBACK_STATS;
  }
}

export async function toggleVote(
  featureId: string,
  voterId: string
): Promise<{ voteCount: number; hasVoted: boolean }> {
  const existing = await prisma.featureVote.findUnique({
    where: { featureId_voterId: { featureId, voterId } },
  });

  if (existing) {
    await prisma.featureVote.delete({ where: { id: existing.id } });
  } else {
    await prisma.featureVote.create({ data: { featureId, voterId } });
  }

  const voteCount = await prisma.featureVote.count({ where: { featureId } });
  return { voteCount, hasVoted: !existing };
}

export async function getFeatureComments(featureId: string, voterId?: string) {
  const comments = await prisma.featureComment.findMany({
    where: { featureId, parentId: null },
    include: {
      replies: { orderBy: { createdAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  let likedCommentIds = new Set<string>();
  if (voterId) {
    const likes = await prisma.featureCommentLike.findMany({
      where: {
        voterId,
        commentId: {
          in: comments.flatMap((c) => [c.id, ...c.replies.map((r) => r.id)]),
        },
      },
      select: { commentId: true },
    });
    likedCommentIds = new Set(likes.map((l) => l.commentId));
  }

  return comments.map((c) => ({
    id: c.id,
    featureId: c.featureId,
    parentId: c.parentId,
    authorName: c.authorName,
    content: c.content,
    likes: c.likes,
    hasLiked: likedCommentIds.has(c.id),
    createdAt: c.createdAt.toISOString(),
    replies: c.replies.map((r) => ({
      id: r.id,
      featureId: r.featureId,
      parentId: r.parentId,
      authorName: r.authorName,
      content: r.content,
      likes: r.likes,
      hasLiked: likedCommentIds.has(r.id),
      createdAt: r.createdAt.toISOString(),
    })),
  }));
}
