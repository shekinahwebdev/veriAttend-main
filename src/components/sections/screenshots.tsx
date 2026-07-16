"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Presentation,
  Building,
  Globe,
  QrCode,
  BarChart3,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const screenshots = [
  {
    icon: GraduationCap,
    title: "Student Dashboard",
    description: "Track attendance, view timetables, and manage reports.",
    gradient: "from-blue-500/20 to-blue-600/5",
    accent: "text-blue-500",
    stats: ["87% Attendance", "12 Courses", "3 Reports"],
  },
  {
    icon: Presentation,
    title: "Lecturer Dashboard",
    description: "Manage sessions, view analytics, and approve reports.",
    gradient: "from-indigo-500/20 to-indigo-600/5",
    accent: "text-indigo-500",
    stats: ["5 Active Sessions", "248 Students", "94% Avg Rate"],
  },
  {
    icon: Building,
    title: "Admin Dashboard",
    description: "Oversee institution-wide attendance and user management.",
    gradient: "from-violet-500/20 to-violet-600/5",
    accent: "text-violet-500",
    stats: ["3,420 Students", "86 Lecturers", "42 Courses"],
  },
  {
    icon: Globe,
    title: "Super Admin Dashboard",
    description: "Platform-wide analytics, institutions, and system health.",
    gradient: "from-primary/20 to-primary/5",
    accent: "text-primary",
    stats: ["12 Institutions", "99.9% Uptime", "48K Records"],
  },
  {
    icon: QrCode,
    title: "Attendance Session",
    description: "Live QR-based attendance verification in action.",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-500",
    stats: ["Session Active", "156 Verified", "2 min left"],
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Deep insights into attendance trends and patterns.",
    gradient: "from-amber-500/20 to-amber-600/5",
    accent: "text-amber-500",
    stats: ["Weekly +4.2%", "Risk: 23", "Trending Up"],
  },
];

function MockupContent({ stats }: { stats: string[] }) {
  return (
    <div className="space-y-3 p-4">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat}
            className="rounded-lg bg-background/80 px-2 py-2 text-center text-[10px] font-medium backdrop-blur-sm"
          >
            {stat}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[85, 70, 90, 60].map((w, i) => (
          <div key={i} className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary/60"
              initial={{ width: 0 }}
              whileInView={{ width: `${w}%` }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreenshotsSection() {
  return (
    <AnimatedSection className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Platform Showcase
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Polished interfaces designed for every role in your institution.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} p-6 pb-0`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                      <item.icon className={`h-5 w-5 ${item.accent}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-t-xl border border-b-0 border-border/50 bg-background/60 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 border-b border-border/50 px-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-red-400/70" />
                      <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                      <div className="h-2 w-2 rounded-full bg-green-400/70" />
                    </div>
                    <MockupContent stats={item.stats} />
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
