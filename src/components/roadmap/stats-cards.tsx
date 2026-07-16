import {
  CheckCircle2,
  Clock,
  Lightbulb,
  ThumbsUp,
  Building2,
  Users,
  Database,
  TrendingUp,
} from "lucide-react";
import type { RoadmapStats } from "@/lib/roadmap/types";

const statConfig = [
  { key: "featuresCompleted" as const, label: "Features Completed", icon: CheckCircle2 },
  { key: "featuresPlanned" as const, label: "Features Planned", icon: Clock },
  { key: "featuresInProgress" as const, label: "In Progress", icon: TrendingUp },
  { key: "communitySuggestions" as const, label: "Community Suggestions", icon: Lightbulb },
  { key: "totalVotes" as const, label: "Total Votes", icon: ThumbsUp },
  { key: "institutionsUsing" as const, label: "Institutions", icon: Building2 },
  { key: "studentsManaged" as const, label: "Students Managed", icon: Users },
  { key: "attendanceRecords" as const, label: "Attendance Records", icon: Database },
];

export function RoadmapStatsCards({ stats }: { stats: RoadmapStats }) {
  return (
    <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statConfig.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-shadow hover:shadow-lg"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold">
            {stats[key].toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
