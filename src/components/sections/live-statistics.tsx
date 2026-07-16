"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Building2,
  CheckCircle2,
  GraduationCap,
  Presentation,
  QrCode,
  Users,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { CountUp } from "@/components/shared/count-up";
import {
  FALLBACK_PLATFORM_STATS,
  type PlatformStats,
} from "@/lib/platform-stats";
import type { LucideIcon } from "lucide-react";

const statConfig: {
  key: keyof PlatformStats;
  label: string;
  icon: LucideIcon;
  suffix?: string;
  decimals?: number;
}[] = [
  { key: "institutions", label: "Institutions Onboarded", icon: Building2 },
  { key: "students", label: "Students Registered", icon: GraduationCap },
  { key: "lecturers", label: "Lecturers Registered", icon: Presentation },
  { key: "sessions", label: "Attendance Sessions", icon: QrCode },
  { key: "records", label: "Records Processed", icon: Users },
  { key: "verifications", label: "Verification Requests", icon: CheckCircle2 },
  {
    key: "uptime",
    label: "Platform Uptime",
    icon: Activity,
    suffix: "%",
    decimals: 1,
  },
];

export function LiveStatisticsSection() {
  const [stats, setStats] = useState<PlatformStats>(FALLBACK_PLATFORM_STATS);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(FALLBACK_PLATFORM_STATS));
  }, []);

  return (
    <AnimatedSection className="border-y border-border bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Live Platform Statistics</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Real-time metrics from the VeriAttend platform
          </p>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {statConfig.map((stat, i) => (
            <FadeIn key={stat.key} delay={i * 0.05}>
              <div className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center backdrop-blur-md transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold tabular-nums">
                  <CountUp
                    value={stats[stat.key]}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-snug">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
