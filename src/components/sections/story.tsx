"use client";

import Link from "next/link";
import {
  GraduationCap,
  Lightbulb,
  Quote,
  Shield,
  Sparkles,
  Sprout,
  Target,
  Globe,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SOCIAL_LINKS } from "@/lib/social-links";

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Continuously improving through modern technology.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Protecting academic records with secure and reliable systems.",
  },
  {
    icon: Lightbulb,
    title: "Simplicity",
    description: "Making attendance effortless for every user.",
  },
  {
    icon: Sprout,
    title: "Growth",
    description: "Building a platform that evolves with educational needs.",
  },
];

const timelineSteps = [
  { year: "Observation", label: "Manual attendance in the classroom" },
  { year: "Question", label: "What if attendance could be smarter?" },
  { year: "Foundation", label: "VeriAttend platform begins" },
  { year: "Vision", label: "Scalable tool for institutions" },
];

const socialLinks = [
  { icon: GitHubIcon, label: "GitHub", href: SOCIAL_LINKS.github },
  { icon: LinkedInIcon, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: Globe, label: "Portfolio", href: SOCIAL_LINKS.portfolio },
];

export function StorySection() {
  return (
    <AnimatedSection id="story" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/20" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            The Story Behind VeriAttend
          </span>
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
            Why VeriAttend Exists
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            From classroom observation to a platform built for real educational
            challenges.
          </p>
        </FadeIn>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — illustration & timeline */}
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-md">
                <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-8 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/15">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-lg font-semibold">Education meets technology</p>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
                    Built from firsthand experience in Ghanaian higher education
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-0">
                {timelineSteps.map((step, i) => (
                  <div key={step.year} className="relative flex gap-4 pb-8 last:pb-0">
                    {i < timelineSteps.length - 1 && (
                      <div className="absolute left-[11px] top-6 h-full w-px bg-primary/20" />
                    )}
                    <div className="relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full border-2 border-primary bg-background" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        {step.year}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — story content */}
          <FadeIn delay={0.2}>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                My name is{" "}
                <span className="font-semibold text-foreground">Patricia Shiloh Kanneh</span>
                , and I am a Computer Science student at{" "}
                <span className="font-medium text-foreground">
                  Ghana Communication Technology University (GCTU)
                </span>
                .
              </p>
              <p>
                During my time as a student, I observed that attendance management
                in many educational environments often depends on manual processes.
                While these methods may work, they can become time-consuming,
                difficult to manage at scale, and challenging to analyze over time.
              </p>
              <p>
                Those observations inspired me to ask a simple question:
              </p>

              <blockquote className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-foreground italic">
                {"\u201CWhat if attendance could be managed more intelligently, securely, and efficiently using modern technology?\u201D"}
              </blockquote>

              <p>
                That question became the foundation for VeriAttend.
              </p>
              <p>
                Rather than creating another attendance application, I wanted to
                build a complete platform that supports students, lecturers,
                administrators, and institutions through automation, analytics, and
                a better user experience.
              </p>
              <p>
                VeriAttend combines modern web technologies with thoughtful system
                design to simplify attendance management while providing real-time
                insights that help institutions make better decisions.
              </p>
              <p>
                This project also represents my passion for software engineering,
                user-centered design, and building technology that solves practical
                problems.
              </p>
              <p>
                Although VeriAttend began as an academic project, my vision is to
                continue improving it into a scalable platform that educational
                institutions can confidently adopt.
              </p>
            </div>

            {/* Highlight quote */}
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
              <Quote className="absolute -right-2 -top-2 h-16 w-16 text-primary/10" />
              <p className="relative text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                {"\u201CThe best software doesn't just automate existing processes\u2014it improves the way people work.\u201D"}
              </p>
            </div>

            {/* Developer card */}
            <Card className="mt-8 overflow-hidden border-border bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                    SK
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold">Patricia Shiloh Kanneh</h3>
                      <p className="text-sm text-primary">
                        Computer Science Student & Software Developer
                      </p>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          Institution:
                        </span>{" "}
                        Ghana Communication Technology University (GCTU)
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Passion:
                        </span>{" "}
                        Building software that solves real-world educational
                        challenges.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {socialLinks.map((link) => (
                        <Button key={link.label} variant="outline" size="sm" asChild>
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Vision & Mission */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To empower educational institutions with reliable, intelligent, and
                modern attendance management tools that improve accountability,
                reduce administrative workload, and create better learning
                experiences.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="h-full rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To build technology that makes attendance simple, transparent,
                secure, and data-driven while continuously evolving based on
                feedback from students, lecturers, and institutions.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Core Values */}
        <FadeIn className="mt-16 text-center">
          <h3 className="text-2xl font-bold sm:text-3xl">Core Values</h3>
        </FadeIn>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">{value.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Closing */}
        <FadeIn delay={0.2} className="mt-16">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-8 text-center lg:p-12">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
              VeriAttend is more than an attendance system. It represents my
              commitment to solving practical challenges through software
              engineering and creating technology that has a meaningful impact in
              education.
            </p>
          </div>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
