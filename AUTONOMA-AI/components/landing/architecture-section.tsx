"use client"

import { MessageSquare, Brain, LayoutDashboard, Code2 } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { GlassmorphicCard } from "./glassmorphic-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function ArchitectureSection() {
  const { language } = useLanguage()
  const t = landingContent[language].architecture

  return (
    <section id="architecture" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Architecture Grid - 2x2 layout */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">

          {/* Card 0: High-Performance Sites */}
          <GlassmorphicCard
            icon={Code2}
            iconColor="cyan"
            title={t.cards[0].title}
            description={t.cards[0].desc}
            badge="Enterprise Ready"
            features={t.cards[0].features}
            delay={0}
          />

          {/* Card 1: Sales Concierge */}
          <GlassmorphicCard
            icon={MessageSquare}
            iconColor="blue"
            title={t.cards[1].title}
            description={t.cards[1].desc}
            badge="Bilingual Agent"
            features={t.cards[1].features}
            delay={0.1}
          />

          {/* Card 2: Knowledge Base */}
          <GlassmorphicCard
            icon={Brain}
            iconColor="purple"
            title={t.cards[2].title}
            description={t.cards[2].desc}
            badge="Custom Trained"
            features={t.cards[2].features}
            delay={0.2}
          />

          {/* Card 3: CRM · Sign-up CRM · Sales Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <LayoutDashboard className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              {/* Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-400 font-medium mb-4">
                {t.crmCard.badge}
              </div>
              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3 text-white">{t.crmCard.title}</h3>
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.crmCard.description}
              </p>
              {/* Features */}
              <ul className="space-y-2 mt-4 mb-6">
                {t.crmCard.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    <span><strong className="text-white">{item.bold}:</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
              {/* Conditional CTA button — allowsExternalCRM = false by default */}
              <Button variant="outline" size="sm" className="border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] text-xs">
                {t.crmCard.button}
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
