"use client";

import {
  FileX,
  UserX,
  Users,
  Database,
  BarChart2,
  History,
  Clock,
  Sparkles,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const problems = [
  {
    icon: FileX,
    title: "Manual attendance sheets",
    description: "Paper-based tracking is slow, error-prone, and easily manipulated.",
  },
  {
    icon: UserX,
    title: "Attendance fraud",
    description: "Students signing for absent peers undermines academic integrity.",
  },
  {
    icon: Users,
    title: "Proxy attendance",
    description: "Friends marking attendance for others creates false records.",
  },
  {
    icon: Database,
    title: "Lost attendance records",
    description: "Physical sheets get damaged, lost, or misplaced over time.",
  },
  {
    icon: BarChart2,
    title: "No real-time analytics",
    description: "Institutions lack instant visibility into attendance patterns.",
  },
  {
    icon: History,
    title: "No attendance history",
    description: "Retrieving historical data requires manual searching through files.",
  },
  {
    icon: Clock,
    title: "Time wasted in lectures",
    description: "Valuable teaching time lost to roll calls and manual verification.",
  },
];

export function ProblemSection() {
  return (
    <AnimatedSection className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Traditional Attendance Is{" "}
            <span className="text-danger">Broken</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Universities struggle with outdated systems that fail students,
            lecturers, and administrators alike.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {problems.map((problem, i) => (
            <FadeIn key={problem.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-danger/30 hover:shadow-lg hover:shadow-danger/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-danger/10 text-danger transition-colors group-hover:bg-danger/15">
                  <problem.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{problem.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center lg:p-12">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
            <p className="text-xl font-semibold sm:text-2xl">
              VeriAttend solves all these challenges through a modern digital
              attendance ecosystem.
            </p>
          </div>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
