"use client";

import Image from "next/image";
import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";

const institutions = [
  {
    name: "GCTU",
    fullName: "Ghana Communication Technology University",
    logo: "/images/institutions/gctu.png",
  },
  {
    name: "UCC",
    fullName: "University of Cape Coast",
    logo: "/images/institutions/ucc.png",
  },
  {
    name: "UG",
    fullName: "University of Ghana",
    logo: "/images/institutions/ug.png",
  },
  {
    name: "UPSA",
    fullName: "University of Professional Studies, Accra",
    logo: "/images/institutions/upsa.png",
  },
  {
    name: "Ashesi",
    fullName: "Ashesi University",
    logo: "/images/institutions/ashesi.png",
  },
  {
    name: "ATU",
    fullName: "Accra Technical University",
    logo: "/images/institutions/atu.png",
  },
];

export function TrustedBySection() {
  return (
    <AnimatedSection className="border-y border-border bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Built for Ghana&apos;s leading institutions
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {institutions.map((institution, i) => (
            <FadeIn key={institution.name} delay={i * 0.05}>
              <div
                className="group flex flex-col items-center justify-center gap-3"
                title={institution.fullName}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                  <Image
                    src={institution.logo}
                    alt={`${institution.fullName} logo`}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {institution.name}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground/70">
          Designed to serve universities and higher education institutions across Ghana
        </p>
      </div>
    </AnimatedSection>
  );
}
