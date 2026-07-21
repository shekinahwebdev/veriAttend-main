"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  HeartHandshake,
  Lightbulb,
  Palette,
  FlaskConical,
  GraduationCap,
  Mail,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";

const contributionAreas = [
  { label: "Software Development", icon: Code2, color: "text-blue-500" },
  { label: "UI/UX Design", icon: Palette, color: "text-pink-500" },
  { label: "Beta Testing", icon: FlaskConical, color: "text-amber-500" },
  { label: "Product Ideas", icon: Lightbulb, color: "text-yellow-500" },
  {
    label: "Educational Research",
    icon: GraduationCap,
    color: "text-emerald-500",
  },
  { label: "Community Support", icon: Globe, color: "text-cyan-500" },
];

const roles = [
  { value: "DEVELOPER", label: "Developer" },
  { value: "DESIGNER", label: "Designer" },
  { value: "STUDENT", label: "Student" },
  { value: "LECTURER", label: "Lecturer" },
  { value: "TESTER", label: "Tester" },
  { value: "OTHER", label: "Other" },
];

const successMessage =
  "Thank you for your interest in VeriAttend! We're building this project step by step, and we'll reach out when there are opportunities to collaborate.";

export function JoinCommunitySection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("DEVELOPER");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          role,
          githubUrl: githubUrl || undefined,
          linkedInUrl: linkedInUrl || undefined,
          message: message || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to join the community");
      }

      setSubmitted(true);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to join the community",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedSection
      id="community-join"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Users className="h-4 w-4" />
            Join the VeriAttend Community
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Help Shape the Future of Attendance Management
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            VeriAttend is an open project driven by the goal of making
            attendance management smarter, more secure, and easier for
            educational institutions.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether you&apos;re a developer, designer, student, educator,
            tester, or simply someone with great ideas, we&apos;d love to hear
            from you. If you&apos;re interested in contributing, collaborating,
            testing new features, or following the project&apos;s progress,
            leave your details below and we&apos;ll reach out when opportunities
            become available.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contributionAreas.map((area, i) => (
              <motion.div
                key={area.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{area.label}</p>
                    <area.icon
                      className={`mt-1 h-4 w-4 ${area.color} opacity-70`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <FadeIn delay={0.15} className="lg:col-span-3">
            <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-xl backdrop-blur-md sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <HeartHandshake className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">
                    Welcome to the Mission
                  </h3>
                  <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                    {successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="community-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="community-name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="community-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="community-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="community-github">
                        GitHub Profile (optional)
                      </Label>
                      <div className="relative">
                        <GitHubIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="community-github"
                          type="url"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          placeholder="https://github.com/username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="community-linkedin">
                        LinkedIn (optional)
                      </Label>
                      <div className="relative">
                        <LinkedInIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="community-linkedin"
                          type="url"
                          value={linkedInUrl}
                          onChange={(e) => setLinkedInUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="community-message">
                      Why would you like to contribute? (optional)
                    </Label>
                    <Textarea
                      id="community-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what excites you about VeriAttend and how you'd like to help..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join the Community"}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 backdrop-blur-md">
                <h3 className="text-lg font-semibold">Not a job application</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  This is an open invitation to collaborate, learn, and grow
                  with a project that aims to improve education technology
                  across institutions.
                </p>
              </div>
              <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-md">
                <h3 className="text-lg font-semibold">Who can join?</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Students exploring real-world software projects</li>
                  <li>Developers passionate about ed-tech</li>
                  <li>Designers who care about usability</li>
                  <li>Educators with practical insights</li>
                  <li>Testers who love finding edge cases</li>
                  <li>Anyone with ideas worth sharing</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  );
}
