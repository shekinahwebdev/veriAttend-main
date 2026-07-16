"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Code2,
  FlaskConical,
  Rocket,
  Search,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";

const phases = [
  {
    icon: Search,
    title: "Research",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    items: [
      "Studied attendance challenges in universities.",
      "Identified proxy attendance, manual registers, missing records and poor reporting.",
    ],
  },
  {
    icon: ClipboardList,
    title: "Planning",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    items: [
      "Designed the system architecture.",
      "Planned role-based dashboards.",
      "Planned secure attendance verification.",
    ],
  },
  {
    icon: Code2,
    title: "Development",
    color: "text-primary",
    bg: "bg-primary/10",
    items: [
      "Built authentication.",
      "Built onboarding.",
      "Built attendance workflows.",
      "Built analytics dashboards.",
      "Built QR attendance.",
      "Built role management.",
    ],
  },
  {
    icon: FlaskConical,
    title: "Testing",
    color: "text-warning",
    bg: "bg-warning/10",
    items: [
      "Testing with students.",
      "Testing with lecturers.",
      "Improving performance.",
      "Fixing usability issues.",
    ],
  },
  {
    icon: Rocket,
    title: "Today",
    color: "text-success",
    bg: "bg-success/10",
    items: [
      "VeriAttend is actively being improved.",
      "New features are added regularly.",
    ],
  },
];

export function DevelopmentJourneySection() {
  return (
    <AnimatedSection id="journey" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            Development Journey
          </span>
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
            From Idea to Platform
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            The story of building VeriAttend — one milestone at a time.
          </p>
        </FadeIn>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="space-y-10">
            {phases.map((phase, i) => (
              <FadeIn key={phase.title} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col gap-6 md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />

                  <div className="absolute left-6 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/20 md:left-1/2 md:flex">
                    <phase.icon className={`h-5 w-5 ${phase.color}`} />
                  </div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-16 md:pl-0`}
                  >
                    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-primary/5">
                      <div className="mb-4 flex items-center gap-3 md:hidden">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${phase.bg}`}
                        >
                          <phase.icon className={`h-5 w-5 ${phase.color}`} />
                        </div>
                        <h3 className="text-xl font-semibold">{phase.title}</h3>
                      </div>
                      <h3 className="mb-4 hidden text-xl font-semibold md:block">
                        {phase.title}
                      </h3>
                      <ul className="space-y-2">
                        {phase.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <p className="text-2xl font-semibold sm:text-3xl">
            We&apos;re only getting started.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/roadmap">
              Follow the Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
