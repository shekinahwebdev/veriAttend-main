"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowBigUp,
  ArrowRight,
  Bug,
  Lightbulb,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { FeatureItem } from "@/lib/roadmap/types";
import { CATEGORY_LABELS } from "@/lib/roadmap/types";

type Filter = "popular" | "newest" | "released";

const filterLabels: Record<Filter, string> = {
  popular: "Most Popular",
  newest: "Newest",
  released: "Released",
};

const statusMap: Record<string, string> = {
  PLANNED: "Planned",
  IN_PROGRESS: "Building",
  TESTING: "Building",
  COMPLETED: "Released",
};

export function CommunityFeedbackSection() {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("popular");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/features")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setFeatures(data.features ?? []);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleVote = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/features/${id}/vote`, { method: "POST" });
      if (!res.ok) return;
      const data = await res.json();
      setFeatures((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, voteCount: data.voteCount, hasVoted: data.hasVoted }
            : f
        )
      );
    } catch {
      /* ignore */
    }
  }, []);

  const filtered = useMemo(() => {
    let list = [...features];
    if (filter === "popular") {
      list.sort((a, b) => b.voteCount - a.voteCount);
    } else if (filter === "newest") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      list = list.filter((f) => f.status === "COMPLETED");
    }
    return list.slice(0, 6);
  }, [features, filter]);

  return (
    <AnimatedSection id="community" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
            Community Feedback
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Submit ideas, vote on features, and help shape VeriAttend&apos;s
            future.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 flex flex-wrap justify-center gap-2">
          {(Object.keys(filterLabels) as Filter[]).map((key) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(key)}
            >
              {key === "popular" && <TrendingUp className="h-4 w-4" />}
              {key === "newest" && <Sparkles className="h-4 w-4" />}
              {key === "released" && <Lightbulb className="h-4 w-4" />}
              {filterLabels[key]}
            </Button>
          ))}
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))
            : filtered.map((feature, i) => (
                <FadeIn key={feature.id} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h4 className="font-semibold leading-snug">
                        {feature.title}
                      </h4>
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        {statusMap[feature.status] ?? feature.status}
                      </Badge>
                    </div>
                    <p className="mb-4 flex-1 line-clamp-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <Badge variant="outline" className="text-[10px]">
                        {CATEGORY_LABELS[feature.category]}
                      </Badge>
                      <Button
                        size="sm"
                        variant={feature.hasVoted ? "default" : "outline"}
                        className="h-8 gap-1 text-xs"
                        onClick={() => handleVote(feature.id)}
                      >
                        <ArrowBigUp className="h-3.5 w-3.5" />
                        {feature.voteCount}
                      </Button>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
        </div>

        <FadeIn delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/roadmap">
              <Plus className="h-4 w-4" />
              Submit an Idea
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/roadmap">
              <Bug className="h-4 w-4" />
              Report a Bug
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
