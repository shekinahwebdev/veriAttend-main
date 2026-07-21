import { HeroSection } from "@/components/sections/hero";
import { TrustedBySection } from "@/components/sections/trusted-by";
import { LiveStatisticsSection } from "@/components/sections/live-statistics";
import { ProblemSection } from "@/components/sections/problem";
import { StorySection } from "@/components/sections/story";
import { FeaturesSection } from "@/components/sections/features";
import { AIFeaturesSection } from "@/components/sections/ai-features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { ScreenshotsSection } from "@/components/sections/screenshots";
import { DevelopmentJourneySection } from "@/components/sections/development-journey";
import { WhatsNextSection } from "@/components/sections/whats-next";
import { ChangelogSection } from "@/components/sections/changelog";
import { CommunityFeedbackSection } from "@/components/sections/community-feedback";
import { JoinCommunitySection } from "@/components/sections/join-community";
import { BehindVeriAttendSection } from "@/components/sections/behind-veriattend";
import { TechStackSection } from "@/components/sections/tech-stack";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <LiveStatisticsSection />
      <ProblemSection />
      <StorySection />
      <FeaturesSection />
      <AIFeaturesSection />
      <HowItWorksSection />
      <ScreenshotsSection />
      <DevelopmentJourneySection />
      <WhatsNextSection />
      <ChangelogSection />
      <CommunityFeedbackSection />
      <JoinCommunitySection />
      {/* <BehindVeriAttendSection /> */}
      <TechStackSection />
      {/*  <TestimonialsSection /> */}
      <FAQSection />
      <ContactSection />
    </>
  );
}
