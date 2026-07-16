"use client";

import { useState } from "react";
import { Send, Mail, Building2, User } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatedSection id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready to transform attendance at your institution? Request a demo or
            contact our team.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <FadeIn delay={0.1} className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                      <Send className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold">Message Sent!</h3>
                    <p className="mt-2 text-muted-foreground">
                      Thank you for your interest. We&apos;ll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="David Osei"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="institution" className="text-sm font-medium">
                          Institution
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="institution"
                            placeholder="University Name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@university.edu"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your institution and attendance needs..."
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button type="submit" className="flex-1">
                        <Send className="h-4 w-4" />
                        Request Demo
                      </Button>
                      <Button type="submit" variant="outline" className="flex-1">
                        Contact Sales
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-6">
                <h3 className="text-lg font-semibold">Why VeriAttend?</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>✓ Eliminate attendance fraud</li>
                  <li>✓ Real-time analytics & insights</li>
                  <li>✓ Multi-role portal ecosystem</li>
                  <li>✓ Easy CSV/Excel import</li>
                  <li>✓ Secure & scalable infrastructure</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold">Direct Contact</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prefer email? Reach us directly at{" "}
                  <a
                    href="mailto:patriciashilohkanneh12@gmail.com"
                    className="font-medium text-primary hover:underline"
                  >
                    patriciashilohkanneh12@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedSection>
  );
}
