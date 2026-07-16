"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Calendar,
  FileSpreadsheet,
  GraduationCap,
  LineChart,
  Bell,
  FileText,
  Smartphone,
  Link2,
  Brain,
  Building2,
  ScanFace,
  Clock,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

type StatusBadge = "Planning" | "In Progress" | "Testing" | "Completed";

interface RoadmapItem {
  icon: LucideIcon;
  title: string;
  description: string;
  status: StatusBadge;
  progress: number;
}

const categories: {
  title: string;
  subtitle: string;
  items: RoadmapItem[];
}[] = [
  {
    title: "Currently Building",
    subtitle: "Active development right now",
    items: [
      {
        icon: Bot,
        title: "AI Assistant",
        description: "Intelligent support for attendance queries and academic insights.",
        status: "In Progress",
        progress: 65,
      },
      {
        icon: Calendar,
        title: "Smart Timetable",
        description: "Automated timetable management for courses and lecturers.",
        status: "In Progress",
        progress: 55,
      },
      {
        icon: FileSpreadsheet,
        title: "CSV Student Import",
        description: "Bulk import students and lecturers with validation.",
        status: "In Progress",
        progress: 70,
      },
      {
        icon: Clock,
        title: "Lecturer Schedule Management",
        description: "Manage and view lecturer schedules across departments.",
        status: "In Progress",
        progress: 45,
      },
    ],
  },
  {
    title: "Coming Soon",
    subtitle: "Next on the horizon",
    items: [
      {
        icon: LineChart,
        title: "Attendance Predictions",
        description: "Forecast attendance trends using historical data.",
        status: "Planning",
        progress: 25,
      },
      {
        icon: Bell,
        title: "Parent Notifications",
        description: "Alert parents about student attendance patterns.",
        status: "Planning",
        progress: 20,
      },
      {
        icon: FileText,
        title: "Smart Attendance Reports",
        description: "Automated, intelligent attendance reporting.",
        status: "Planning",
        progress: 30,
      },
      {
        icon: Smartphone,
        title: "Mobile Application",
        description: "Native mobile experience for all user roles.",
        status: "Planning",
        progress: 15,
      },
      {
        icon: Link2,
        title: "LMS Integration",
        description: "Connect with learning management systems.",
        status: "Planning",
        progress: 10,
      },
    ],
  },
  {
    title: "Future Vision",
    subtitle: "Long-term innovation",
    items: [
      {
        icon: Brain,
        title: "AI Attendance Insights",
        description: "Deep AI analysis of attendance patterns and risks.",
        status: "Planning",
        progress: 5,
      },
      {
        icon: GraduationCap,
        title: "Smart Campus Analytics",
        description: "Campus-wide analytics beyond attendance.",
        status: "Planning",
        progress: 5,
      },
      {
        icon: Building2,
        title: "Cross-Institution Dashboard",
        description: "Multi-institution analytics for platform admins.",
        status: "Planning",
        progress: 8,
      },
      {
        icon: ScanFace,
        title: "Facial Recognition Attendance",
        description: "Research-phase biometric verification.",
        status: "Planning",
        progress: 3,
      },
    ],
  },
];

const statusVariant: Record<
  StatusBadge,
  "default" | "comingSoon" | "success" | "warning" | "outline"
> = {
  Planning: "outline",
  "In Progress": "comingSoon",
  Testing: "warning",
  Completed: "success",
};

function RoadmapCard({ item }: { item: RoadmapItem }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
          <item.icon className="h-5 w-5 text-primary" />
        </div>
        <Badge variant={statusVariant[item.status]} className="text-[10px]">
          {item.status}
        </Badge>
      </div>
      <h4 className="font-semibold">{item.title}</h4>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
          <span>Progress</span>
          <span>{item.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: `${item.progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function WhatsNextSection() {
  return (
    <AnimatedSection id="whats-next" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
            What&apos;s Next
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Upcoming features and the vision ahead for VeriAttend.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-16">
          {categories.map((category, ci) => (
            <FadeIn key={category.title} delay={ci * 0.1}>
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.subtitle}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.items.map((item) => (
                    <RoadmapCard key={item.title} item={item} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
