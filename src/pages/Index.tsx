import { lazy, Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";
import PainPointsSection from "@/components/landing/PainPointsSection";
import StickyHeader from "@/components/landing/StickyHeader";
import FloatingCTA from "@/components/landing/FloatingCTA";

// Lazy load non-critical sections
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const StepsSection = lazy(() => import("@/components/landing/StepsSection"));
const WhoIsItForSection = lazy(() => import("@/components/landing/WhoIsItForSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const AuthoritySection = lazy(() => import("@/components/landing/AuthoritySection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const FooterSection = lazy(() => import("@/components/landing/FooterSection"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header Fixo */}
      <StickyHeader />

      {/* CTA Flutuante Mobile */}
      <FloatingCTA />
      
      {/* BLOCO 1 - Hero - Critical, loaded immediately */}
      <HeroSection />

      {/* Dor / Ruminação - Critical, loaded immediately */}
      <PainPointsSection />

      {/* Lazy load remaining sections */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        {/* Identificação */}
        <WhoIsItForSection />

        {/* Autoridade breve */}
        <AuthoritySection />

        {/* Solução simples (passo a passo) */}
        <StepsSection />

        {/* Prova social */}
        <TestimonialsSection />

        {/* Oferta / CTA principal */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* Rodapé */}
        <FooterSection />
      </Suspense>
    </main>
  );
};

export default Index;
