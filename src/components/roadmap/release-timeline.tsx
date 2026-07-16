"use client";

import { RELEASE_TIMELINE } from "@/lib/roadmap/types";
import { FadeIn } from "@/components/shared/animated-section";

export function ReleaseTimeline() {
  return (
    <section className="mt-20">
      <FadeIn className="mb-10 text-center">
        <h2 className="text-3xl font-bold">Release Timeline</h2>
        <p className="mt-2 text-muted-foreground">
          Track VeriAttend&apos;s evolution across major versions
        </p>
      </FadeIn>

      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-6 top-0 h-full w-px bg-border lg:left-1/2" />

        {RELEASE_TIMELINE.map((release, i) => (
          <FadeIn key={release.version} delay={i * 0.1}>
            <div
              className={`relative mb-10 flex items-start gap-6 lg:gap-0 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="hidden lg:block lg:w-1/2" />
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary shadow-lg lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                v{release.version}
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-card p-6 lg:w-5/12">
                <h3 className="text-lg font-semibold">{release.title}</h3>
                <ul className="mt-3 space-y-2">
                  {release.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
