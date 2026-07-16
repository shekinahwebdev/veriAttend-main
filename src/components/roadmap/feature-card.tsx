"use client";

import { motion } from "framer-motion";
import {
  ArrowBigUp,
  Check,
  MessageSquare,
  Calendar,
  User,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeatureItem } from "@/lib/roadmap/types";
import {
  BENEFICIARY_LABELS,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/lib/roadmap/types";

const priorityVariant = {
  LOW: "outline",
  MEDIUM: "secondary",
  HIGH: "default",
  CRITICAL: "comingSoon",
} as const;

interface FeatureCardProps {
  feature: FeatureItem;
  onVote: (id: string) => void;
  onSelect: (feature: FeatureItem) => void;
}

export function FeatureCard({ feature, onVote, onSelect }: FeatureCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group cursor-pointer rounded-xl border border-border bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
      onClick={() => onSelect(feature)}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug">{feature.title}</h3>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          {STATUS_LABELS[feature.status]}
        </Badge>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Badge variant="outline" className="text-[10px]">
          {CATEGORY_LABELS[feature.category]}
        </Badge>
        <Badge variant={priorityVariant[feature.priority]} className="text-[10px]">
          {PRIORITY_LABELS[feature.priority]}
        </Badge>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {feature.commentCount}
          </span>
          {feature.estimatedRelease && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {feature.estimatedRelease}
            </span>
          )}
        </div>

        <Button
          size="sm"
          variant={feature.hasVoted ? "default" : "outline"}
          className={cn("h-8 gap-1 text-xs", feature.hasVoted && "bg-success hover:bg-success/90")}
          onClick={(e) => {
            e.stopPropagation();
            onVote(feature.id);
          }}
        >
          {feature.hasVoted ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Voted
            </>
          ) : (
            <>
              <ArrowBigUp className="h-3.5 w-3.5" />
              {feature.voteCount}
            </>
          )}
        </Button>
      </div>

      {(feature.phase || feature.assignedDev) && (
        <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-[10px] text-muted-foreground">
          {feature.phase && (
            <span className="flex items-center gap-1">
              <Code2 className="h-3 w-3" />
              {feature.phase}
            </span>
          )}
          {feature.assignedDev && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {feature.assignedDev}
            </span>
          )}
          {feature.estimatedDays && (
            <span>~{feature.estimatedDays}d dev</span>
          )}
        </div>
      )}

      <p className="mt-2 text-[10px] text-muted-foreground/70">
        Benefits: {BENEFICIARY_LABELS[feature.beneficiary]}
      </p>
    </motion.div>
  );
}
