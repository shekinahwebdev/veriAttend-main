"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/social-links";

export function BehindVeriAttendSection() {
  return (
    <AnimatedSection id="about" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
            Behind VeriAttend
          </h2>
        </FadeIn>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-1">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-[22px] bg-card/80 backdrop-blur-sm">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full bg-primary/10 text-5xl font-bold text-primary">
                    SK
                  </div>
                  <p className="mt-4 text-sm font-medium">Shekinah Kanneh</p>
                  <p className="text-xs text-muted-foreground">
                    Developer & Founder
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                VeriAttend began with a simple observation: attendance management
                in many institutions is still manual, time-consuming, and
                vulnerable to proxy attendance. After seeing these challenges
                firsthand, I decided to build a modern platform that makes
                attendance secure, automated, and data-driven.
              </p>
              <p>
                This project combines software engineering, user-centered design,
                and artificial intelligence to help institutions manage attendance
                more efficiently.
              </p>
              <p>
                VeriAttend is continuously evolving through testing, feedback,
                and new ideas.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="outline" asChild>
                  <Link
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    View GitHub
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    Connect on LinkedIn
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="#contact">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  );
}
