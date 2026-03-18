"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ArchitectureSection } from "@/components/landing/architecture-section"
import { TechnicalFlowSection } from "@/components/landing/technical-flow-section"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { SocialProofSection } from "@/components/landing/social-proof-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { PricingSection } from "@/components/landing/pricing-section"
import { OpenAITechnology } from "@/components/landing/openai-technology"
import { VanguardTechnology } from "@/components/landing/vanguard-technology"
import { MonthlyRetainer } from "@/components/landing/monthly-retainer"
import { OnboardingForm } from "@/components/form/onboarding-form"
import { TrustSection } from "@/components/landing/trust-section"
import { FaqSection } from "@/components/landing/faq-section"
import { ProvenResultsSection } from '@/components/landing/provenResultsSection';
import { DashboardPreviewSection } from '@/components/DashboardPreviewSection';
import { ValueStackSection } from "@/components/landing/value-stack-section";
import { CRMSection } from "@/components/landing/crm-section";
import { AgentTiersSection } from "@/components/landing/agent-tiers-section";
import { SchedulerSection } from "@/components/landing/scheduler-section";
import { InboxSection } from "@/components/landing/inbox-section";
import { OpenClawSection } from "@/components/sections/OpenClawSection"

// ✅ IMPORTANTE: Esta función tiene 'export default', que es lo que Next.js necesita
export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const openForm = () => setIsFormOpen(true)

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* Botón del Hero */}
        <HeroSection onOpenForm={openForm} />

        <ArchitectureSection />
        <OpenAITechnology />
        <TechnicalFlowSection />
        <VanguardTechnology />
        <ComparisonSection />
        <ProvenResultsSection onOpenForm={openForm} />
        {/* <DashboardPreviewSection /> */}
        
        {/* New B2B Spanish Sections */}
        <CRMSection />
        {/* <AgentTiersSection /> */}
        {/* <SchedulerSection /> */}
        <InboxSection />
        
        {/* <WhatYouGetSection /> */}
        {/* <SocialProofSection /> */}
        
        {/* Value Stack Section - Premium Conversion Focus */}
        <ValueStackSection onOpenForm={openForm} />
        {/* <OpenClawSection/> */}
        
        {/* Botón de Precios */}
        <PricingSection onOpenForm={openForm} />

        <AgentTiersSection />

        <TrustSection />
        
        {/* Botón de Retainer */}
        <MonthlyRetainer onOpenForm={openForm} />

        {/* ✅ Botón del CTA Final (Conectado) */}
        <CTASection onOpenForm={openForm} />
        
        <FaqSection />
      </main>

      <Footer />

      {/* Formulario Flotante */}
      <OnboardingForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  )
}
