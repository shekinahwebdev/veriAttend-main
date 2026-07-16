"use client";

import Link from "next/link";
import { Globe, Mail, Code2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/social-links";

const socialLinks = [
  { icon: GitHubIcon, label: "GitHub", href: SOCIAL_LINKS.github },
  { icon: LinkedInIcon, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: Globe, label: "Portfolio", href: SOCIAL_LINKS.portfolio },
  { icon: Mail, label: "Email", href: SOCIAL_LINKS.email },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS",
  "Auth.js",
  "OpenAI",
];

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built with Passion
          </h2>
        </FadeIn>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-1">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-[22px] bg-muted/50">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-5xl font-bold text-primary">
                    SK
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Developer Photo Placeholder
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                VeriAttend was designed and developed by{" "}
                <span className="font-semibold text-foreground">Patricia Shiloh Kanneh</span>{" "}
                as a modern attendance management platform focused on solving
                attendance fraud, improving accountability, and simplifying
                attendance management for educational institutions.
              </p>

              <div className="flex flex-wrap gap-3">
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

              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  );
}
