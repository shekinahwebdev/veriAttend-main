"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Settings,
  UserPlus,
  Play,
  UserCheck,
  Bell,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const steps = [
  {
    icon: Building2,
    title: "Institution joins VeriAttend",
    description: "Your university registers and gets onboarded to the platform.",
  },
  {
    icon: Settings,
    title: "Admin sets up the academic structure",
    description: "Configure faculties, departments, courses, and groups.",
  },
  {
    icon: UserPlus,
    title: "Students and lecturers are onboarded",
    description: "Import users via CSV or add them manually to the system.",
  },
  {
    icon: Play,
    title: "Lecturer starts attendance session",
    description: "The lecturer initiates an attendance session for their class.",
  },
  {
    icon: UserCheck,
    title: "Class Representative activates attendance",
    description: "The class rep enables the attendance window for students.",
  },
  {
    icon: Bell,
    title: "Students receive notification",
    description: "All enrolled students are notified to verify their attendance.",
  },
  {
    icon: ShieldCheck,
    title: "Students verify attendance",
    description: "Students confirm presence through secure verification.",
  },
  {
    icon: BarChart3,
    title: "Analytics update instantly",
    description: "Real-time dashboards reflect the latest attendance data.",
  },
];

export function HowItWorksSection() {
  return (
    <AnimatedSection className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How VeriAttend Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A seamless workflow from setup to verified attendance — visualized
            exactly as it operates today.
          </p>
        </FadeIn>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div
                  className={`relative flex flex-col items-center gap-6 lg:flex-row ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="lg:w-5/12">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          Step {i + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="relative z-10 hidden lg:flex lg:w-2/12 lg:justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary shadow-lg shadow-primary/20">
                      {i + 1}
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-5/12" />

                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-2 lg:hidden">
                      <div className="h-8 w-px bg-primary/30" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
