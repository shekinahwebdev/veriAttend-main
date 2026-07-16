import { FeatureCard } from "@/components/roadmap/feature-card";
import type { FeatureItem, FeatureStatus } from "@/lib/roadmap/types";
import { COLUMN_DESCRIPTIONS, STATUS_LABELS } from "@/lib/roadmap/types";

interface KanbanBoardProps {
  columns: { status: FeatureStatus; features: FeatureItem[] }[];
  singleColumn?: boolean;
  onVote: (id: string) => void;
  onSelect: (feature: FeatureItem) => void;
}

const columnColors: Record<FeatureStatus, string> = {
  PLANNED: "border-t-slate-400",
  IN_PROGRESS: "border-t-primary",
  TESTING: "border-t-warning",
  COMPLETED: "border-t-success",
};

export function KanbanBoard({
  columns,
  singleColumn,
  onVote,
  onSelect,
}: KanbanBoardProps) {
  return (
    <div
      className={
        singleColumn
          ? "grid gap-4"
          : "mb-16 grid gap-6 lg:grid-cols-4"
      }
    >
      {columns.map(({ status, features }) => (
        <div
          key={status}
          className={`rounded-2xl border border-border bg-muted/20 p-4 border-t-4 ${columnColors[status]}`}
        >
          <div className="mb-4">
            <h2 className="font-semibold">{STATUS_LABELS[status]}</h2>
            <p className="text-xs text-muted-foreground">
              {COLUMN_DESCRIPTIONS[status]}
            </p>
            <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
              {features.length}
            </span>
          </div>
          <div className="space-y-3">
            {features.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No features in this column
              </p>
            ) : (
              features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  onVote={onVote}
                  onSelect={onSelect}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
