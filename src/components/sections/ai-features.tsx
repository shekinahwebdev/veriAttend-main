"use client";

import {
  Bot,
  TrendingUp,
  AlertTriangle,
  Search,
  Lightbulb,
  Target,
  BarChart,
  MessageSquare,
} from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Academic Assistant",
    description: "Intelligent support for students and lecturers on attendance matters.",
  },
  {
    icon: TrendingUp,
    title: "Attendance Prediction",
    description: "Forecast attendance trends based on historical patterns.",
  },
  {
    icon: AlertTriangle,
    title: "Attendance Risk Alerts",
    description: "Proactive notifications when students fall below thresholds.",
  },
  {
    icon: Search,
    title: "Natural Language Dashboard Search",
    description: "Query your data using plain English commands.",
  },
  {
    icon: Lightbulb,
    title: "AI Insights",
    description: "Automated analysis of attendance patterns and anomalies.",
  },
  {
    icon: Target,
    title: "Smart Attendance Recommendations",
    description: "Personalized suggestions to improve attendance rates.",
  },
  {
    icon: BarChart,
    title: "Student Performance Correlation",
    description: "Connect attendance data with academic performance trends.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot",
    description: "24/7 conversational support for platform users.",
  },
];

export function AIFeaturesSection() {
  return (
    <AnimatedSection id="solutions" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Badge variant="comingSoon" className="mb-4">
            Coming Soon
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            AI-Powered Intelligence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The future of attendance management — powered by artificial intelligence.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aiFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="comingSoon" className="mb-3 text-[10px]">
                    Coming Soon
                  </Badge>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
