"use client";

import Link from "next/link";
import { Check, Clock, ArrowRight } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const completed = [
  "Student Portal",
  "Lecturer Portal",
  "Institution Dashboard",
  "QR Attendance",
  "OTP Authentication",
  "Attendance Analytics",
];

const comingSoon = [
  "AI Assistant",
  "Facial Recognition",
  "Smart Timetable",
  "Mobile App",
  "Parent Notifications",
  "Offline Attendance",
  "Predictive Analytics",
];

export function RoadmapSection() {
  return (
    <AnimatedSection id="roadmap" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Product Roadmap
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Building the future of attendance management, one milestone at a time.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
                  <Check className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Completed</h3>
                  <p className="text-sm text-muted-foreground">
                    Features live and in production
                  </p>
                </div>
              </div>
              <div className="relative space-y-4 pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-success/30" />
                {completed.map((item) => (
                  <div key={item} className="relative flex items-center gap-4">
                    <div className="absolute -left-5 flex h-4 w-4 items-center justify-center rounded-full bg-success ring-4 ring-background">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="flex-1 rounded-xl border border-success/20 bg-success/5 px-4 py-3">
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    On our development horizon
                  </p>
                </div>
              </div>
              <div className="relative space-y-4 pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-primary/20" />
                {comingSoon.map((item) => (
                  <div key={item} className="relative flex items-center gap-4">
                    <div className="absolute -left-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background ring-4 ring-background" />
                    <div className="flex flex-1 items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                      <span className="text-sm font-medium">{item}</span>
                      <Badge variant="comingSoon" className="text-[10px]">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/roadmap">
              View Full Roadmap & Vote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
