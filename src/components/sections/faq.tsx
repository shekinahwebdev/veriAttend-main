"use client";

import { AnimatedSection, FadeIn } from "@/components/shared/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does attendance verification work?",
    answer:
      "When a lecturer starts an attendance session, the class representative activates it. Students receive a notification and verify their presence through secure OTP or QR-based verification. Each verification is timestamped and linked to the student's account, preventing proxy attendance.",
  },
  {
    question: "Can multiple institutions use VeriAttend?",
    answer:
      "Yes. VeriAttend is built as a multi-tenant platform. Each institution gets its own isolated environment with separate students, lecturers, courses, and analytics. Super admins can manage all institutions from a centralized dashboard.",
  },
  {
    question: "Is student data secure?",
    answer:
      "Absolutely. VeriAttend uses industry-standard encryption, role-based access control, and secure authentication via Auth.js. Student data is stored in PostgreSQL with strict access policies, and all actions are logged in audit trails.",
  },
  {
    question: "Does VeriAttend work on mobile devices?",
    answer:
      "Yes. VeriAttend is fully responsive and works seamlessly on smartphones, tablets, and desktops. A dedicated mobile app is also on our roadmap for an even better mobile experience.",
  },
  {
    question: "Can existing student data be imported?",
    answer:
      "Yes. Institution admins can bulk import students and lecturers via Excel or CSV files. The import wizard validates data and provides feedback on any errors before finalizing the import.",
  },
  {
    question: "Can timetables be uploaded?",
    answer:
      "Yes. Admins can upload and manage timetables for courses, groups, and lecturers. Timetables are visible to both students and lecturers within their respective portals.",
  },
  {
    question: "How is attendance fraud prevented?",
    answer:
      "VeriAttend prevents fraud through multi-layer verification: OTP authentication, QR code sessions with time limits, class representative activation, and real-time notifications. Each verification is tied to a unique student identity, making proxy attendance virtually impossible.",
  },
];

export function FAQSection() {
  return (
    <AnimatedSection id="faq" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about VeriAttend.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
