"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RoadmapStatsCards } from "@/components/roadmap/stats-cards";
import { KanbanBoard } from "@/components/roadmap/kanban-board";
import { FeatureCard } from "@/components/roadmap/feature-card";
import { ReleaseTimeline } from "@/components/roadmap/release-timeline";
import { SuggestFeatureDialog } from "@/components/roadmap/suggest-feature-dialog";
import { FeatureDetailDialog } from "@/components/roadmap/feature-detail-dialog";
import type {
  FeatureItem,
  FeatureStatus,
  RoadmapStats,
} from "@/lib/roadmap/types";
import {
  BENEFICIARY_LABELS,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/lib/roadmap/types";

type VoteUpdate = Pick<FeatureItem, "voteCount" | "hasVoted">;

export function RoadmapPage({
  initialFeatures,
  initialStats,
}: {
  initialFeatures: FeatureItem[];
  initialStats: RoadmapStats;
}) {
  const [filteredFeatures, setFilteredFeatures] = useState<FeatureItem[] | null>(
    null
  );
  const [stats, setStats] = useState<RoadmapStats>(initialStats);
  const [voteUpdates, setVoteUpdates] = useState<Record<string, VoteUpdate>>({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [beneficiaryFilter, setBeneficiaryFilter] = useState<string>("all");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const hasFilters =
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    priorityFilter !== "all" ||
    beneficiaryFilter !== "all" ||
    Boolean(search);

  useEffect(() => {
    if (!hasFilters) return;

    let cancelled = false;
    (async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (categoryFilter !== "all") params.set("category", categoryFilter);
      if (priorityFilter !== "all") params.set("priority", priorityFilter);
      if (beneficiaryFilter !== "all") params.set("beneficiary", beneficiaryFilter);

      const res = await fetch(`/api/features?${params.toString()}`);
      const data = await res.json();
      if (!cancelled) {
        setFilteredFeatures(data.features);
        setStats(data.stats);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    hasFilters,
    search,
    statusFilter,
    categoryFilter,
    priorityFilter,
    beneficiaryFilter,
  ]);

  const displayFeatures = useMemo(() => {
    const base =
      hasFilters && filteredFeatures ? filteredFeatures : initialFeatures;
    return base.map((f) => (voteUpdates[f.id] ? { ...f, ...voteUpdates[f.id] } : f));
  }, [hasFilters, filteredFeatures, initialFeatures, voteUpdates]);

  const displayStats = hasFilters ? stats : initialStats;

  const handleVote = async (featureId: string) => {
    const current = displayFeatures.find((f) => f.id === featureId);
    if (!current) return;

    const optimistic: VoteUpdate = {
      hasVoted: !current.hasVoted,
      voteCount: current.hasVoted ? current.voteCount - 1 : current.voteCount + 1,
    };
    setVoteUpdates((prev) => ({ ...prev, [featureId]: optimistic }));

    try {
      const res = await fetch(`/api/features/${featureId}/vote`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Vote failed");
      const data = await res.json();
      setVoteUpdates((prev) => ({
        ...prev,
        [featureId]: { voteCount: data.voteCount, hasVoted: data.hasVoted },
      }));
      setSelectedFeature((prev) =>
        prev?.id === featureId
          ? { ...prev, voteCount: data.voteCount, hasVoted: data.hasVoted }
          : prev
      );
    } catch {
      setVoteUpdates((prev) => {
        const next = { ...prev };
        delete next[featureId];
        return next;
      });
      toast.error("Unable to register vote. Please try again.");
    }
  };

  const columns = useMemo(() => {
    const statuses: FeatureStatus[] = [
      "PLANNED",
      "IN_PROGRESS",
      "TESTING",
      "COMPLETED",
    ];
    return statuses.map((status) => ({
      status,
      features: displayFeatures.filter((f) => f.status === status),
    }));
  }, [displayFeatures]);

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Public Roadmap
          </span>
          <h1 className="text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
            Feature Requests & Roadmap
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            See what we&apos;re building, vote on features you want most, and
            suggest new ideas for VeriAttend.
          </p>
          <Button
            size="lg"
            className="mt-8"
            onClick={() => setSuggestOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Suggest a Feature
          </Button>
        </motion.div>

        {loading ? (
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <RoadmapStatsCards stats={displayStats} />
        )}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={beneficiaryFilter} onValueChange={setBeneficiaryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {Object.entries(BENEFICIARY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : displayFeatures.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-lg font-medium">No features found</p>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters or suggest a new feature.
            </p>
          </div>
        ) : hasFilters ? (
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onVote={handleVote}
                onSelect={setSelectedFeature}
              />
            ))}
          </div>
        ) : (
          <KanbanBoard
            columns={columns}
            onVote={handleVote}
            onSelect={setSelectedFeature}
          />
        )}

        <ReleaseTimeline />
      </div>

      <SuggestFeatureDialog
        open={suggestOpen}
        onOpenChange={setSuggestOpen}
        onSuccess={() => toast.success("Feature suggestion submitted!")}
      />

      <FeatureDetailDialog
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onVote={handleVote}
      />
    </div>
  );
}
