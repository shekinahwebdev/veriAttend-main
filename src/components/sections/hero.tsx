"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  QrCode,
  Users,
  GraduationCap,
  LayoutDashboard,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientOrbs, ParticlesBackground } from "@/components/shared/particles";
import { TypewriterHeadline } from "@/components/sections/typewriter-headline";

function MiniChart() {
  const bars = [40, 65, 45, 80, 60, 90, 75];
  return (
    <div className="flex h-16 items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-t bg-primary/80"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        style={{ perspective: 1000 }}
      >
        <div className="overflow-hidden rounded-xl bg-background/95 shadow-inner">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <div className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <div className="mx-auto flex h-6 w-48 items-center justify-center rounded-md bg-muted/50 text-xs text-muted-foreground">
              app.veriattend.com
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-3 md:p-6">
            {/* Sidebar */}
            <div className="hidden space-y-2 md:block">
              {[
                { icon: LayoutDashboard, label: "Admin Dashboard", active: true },
                { icon: GraduationCap, label: "Student Portal" },
                { icon: Users, label: "Lecturer Portal" },
                { icon: QrCode, label: "QR Attendance" },
                { icon: BarChart3, label: "Analytics" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                    item.active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { label: "Today's Attendance", value: "94.2%", trend: "+2.1%" },
                  { label: "Active Sessions", value: "12", trend: "Live" },
                  { label: "Students Verified", value: "1,847", trend: "+156" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="rounded-xl border border-border bg-card p-3"
                  >
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[10px] text-success">{stat.trend}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium">Attendance Analytics</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <MiniChart />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">QR Session Active</span>
                  </div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                    <QrCode className="h-10 w-10 text-foreground/30" />
                  </div>
                </div>
                <div className="space-y-2 rounded-xl border border-border bg-card p-3">
                  <span className="text-xs font-medium">Recent Verifications</span>
                  {["CS301 - 98%", "MATH201 - 91%", "ENG105 - 87%"].map((c) => (
                    <div key={c} className="flex items-center gap-2 text-[10px]">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-1/4 hidden rounded-xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-md lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15">
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div>
            <p className="text-xs font-medium">Verified</p>
            <p className="text-[10px] text-muted-foreground">Attendance confirmed</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-4 top-1/3 hidden rounded-xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-md lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium">+12.4%</p>
            <p className="text-[10px] text-muted-foreground">This semester</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      <GradientOrbs />
      <ParticlesBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-8 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary sm:mb-10">
              AI-Powered Attendance Management
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TypewriterHeadline />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:mt-12 sm:text-xl"
          >
            VeriAttend is an intelligent attendance management platform that helps
            universities automate attendance, reduce fraud, improve accountability,
            and provide real-time academic insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild className="group">
              <Link href="#contact">
                Request Demo
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>

        <div className="mt-16 lg:mt-24">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
