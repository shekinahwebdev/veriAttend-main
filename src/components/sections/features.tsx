"use client";

import {
  GraduationCap,
  Presentation,
  Building,
  Globe,
  Check,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    id: "student",
    icon: GraduationCap,
    title: "Student Portal",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    items: [
      "View attendance",
      "Receive notifications",
      "Track attendance percentage",
      "View timetable",
      "Submit missed class reports",
      "Receive AI assistance",
    ],
  },
  {
    id: "lecturer",
    icon: Presentation,
    title: "Lecturer Portal",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    items: [
      "Manage attendance sessions",
      "View timetable",
      "Track student participation",
      "Approve attendance reports",
      "Generate attendance analytics",
    ],
  },
  {
    id: "admin",
    icon: Building,
    title: "Institution Admin",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    items: [
      "Manage students",
      "Manage lecturers",
      "Manage academic groups",
      "Manage courses",
      "Upload timetables",
      "Import students via Excel/CSV",
      "Generate reports",
      "Monitor attendance",
    ],
  },
  {
    id: "super",
    icon: Globe,
    title: "Super Admin",
    color: "text-primary",
    bg: "bg-primary/10",
    items: [
      "Manage institutions",
      "Platform analytics",
      "System settings",
      "Global reports",
      "Subscription management",
      "Audit logs",
      "Platform health monitoring",
    ],
  },
];

export function FeaturesSection() {
  return (
    <AnimatedSection id="features" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything Your Institution Needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built portals for every role in the academic ecosystem.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {features.map((feature, i) => (
            <FadeIn key={feature.id} delay={i * 0.1}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg}`}
                    >
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
