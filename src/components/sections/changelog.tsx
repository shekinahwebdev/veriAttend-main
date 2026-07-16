"use client";

import { Check, Clock } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";

const releases = [
  {
    version: "v1.0",
    date: "January 2026",
    status: "released" as const,
    items: [
      "Authentication",
      "Student Dashboard",
      "Lecturer Dashboard",
      "Admin Dashboard",
    ],
  },
  {
    version: "v1.2",
    date: "March 2026",
    status: "released" as const,
    items: ["QR Attendance", "OTP Verification", "Analytics"],
  },
  {
    version: "v1.4",
    date: "July 2026",
    status: "released" as const,
    items: [
      "Marketing Website",
      "Public Roadmap",
      "Development Journey",
    ],
  },
  {
    version: "Coming",
    date: "Upcoming",
    status: "upcoming" as const,
    items: [
      "AI Assistant",
      "Timetable",
      "CSV Import",
      "Attendance Prediction",
    ],
  },
];

export function ChangelogSection() {
  return (
    <AnimatedSection id="changelog" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
            Latest Updates
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Track VeriAttend&apos;s evolution release by release.
          </p>
        </FadeIn>

        <div className="relative mt-16 space-y-8">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

          {releases.map((release, i) => (
            <FadeIn key={release.version} delay={i * 0.08}>
              <div className="relative flex gap-6">
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    release.status === "released"
                      ? "border-success bg-success/10"
                      : "border-primary bg-primary/10"
                  }`}
                >
                  {release.status === "released" ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Clock className="h-4 w-4 text-primary" />
                  )}
                </div>

                <div className="flex-1 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-md transition-shadow hover:shadow-lg">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge
                      variant={
                        release.status === "released" ? "success" : "comingSoon"
                      }
                    >
                      {release.version}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {release.date}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {release.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
