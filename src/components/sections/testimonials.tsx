"use client";

import { Quote } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    quote:
      "VeriAttend has completely transformed how we track attendance. No more paper sheets or manual entry — everything is automated and verified.",
    name: "Dr. Sarah Mitchell",
    role: "Senior Lecturer",
    department: "Computer Science",
    type: "Lecturer",
  },
  {
    quote:
      "I can check my attendance percentage anytime and get notifications when sessions start. It's so much better than signing paper sheets.",
    name: "James Okonkwo",
    role: "Final Year Student",
    department: "Engineering",
    type: "Student",
  },
  {
    quote:
      "The admin dashboard gives us real-time visibility across all departments. Importing students via CSV saved us weeks of manual work.",
    name: "Prof. David Chen",
    role: "Dean of Administration",
    department: "Faculty of Science",
    type: "Administrator",
  },
  {
    quote:
      "Attendance fraud was a major issue at our institution. VeriAttend's verification system has virtually eliminated proxy attendance.",
    name: "Dr. Amara Diallo",
    role: "Head of Department",
    department: "Business Administration",
    type: "Lecturer",
  },
  {
    quote:
      "The analytics help me understand which students need support before it's too late. It's an invaluable tool for academic success.",
    name: "Michael Torres",
    role: "Academic Advisor",
    department: "Student Affairs",
    type: "Administrator",
  },
  {
    quote:
      "Submitting missed class reports and tracking my timetable in one place makes managing my academic life so much easier.",
    name: "Fatima Al-Rashid",
    role: "Second Year Student",
    department: "Medicine",
    type: "Student",
  },
];

export function TestimonialsSection() {
  return (
    <AnimatedSection className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4">
            Demo Content
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            What People Are Saying
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Placeholder testimonials from lecturers, students, and administrators.
            Real feedback will be collected as institutions adopt VeriAttend.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <p className="flex-1 text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.department}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-auto text-[10px]">
                    {t.type}
                  </Badge>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
