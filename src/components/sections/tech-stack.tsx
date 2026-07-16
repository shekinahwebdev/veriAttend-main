"use client";

import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const techStack = [
  { name: "Next.js", description: "React framework for production", color: "bg-black text-white dark:bg-white dark:text-black" },
  { name: "React", description: "UI component library", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  { name: "TypeScript", description: "Type-safe JavaScript", color: "bg-blue-600/10 text-blue-600 dark:text-blue-400" },
  { name: "Prisma", description: "Next-gen ORM", color: "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400" },
  { name: "PostgreSQL", description: "Relational database", color: "bg-blue-700/10 text-blue-700 dark:text-blue-400" },
  { name: "Tailwind CSS", description: "Utility-first CSS", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
  { name: "Shadcn UI", description: "Beautiful components", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400" },
  { name: "Auth.js", description: "Authentication", color: "bg-purple-600/10 text-purple-600 dark:text-purple-400" },
  { name: "Resend", description: "Email delivery", color: "bg-gray-800/10 text-gray-800 dark:text-gray-300" },
  { name: "Vercel", description: "Deployment platform", color: "bg-black/10 text-foreground" },
  { name: "OpenAI", description: "AI capabilities", color: "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400" },
];

export function TechStackSection() {
  return (
    <AnimatedSection className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Technology Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with modern, battle-tested technologies for performance and reliability.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {techStack.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.04}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${tech.color}`}
                >
                  {tech.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{tech.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
