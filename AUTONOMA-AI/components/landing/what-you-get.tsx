"use client"
import { Monitor, Bot, Workflow, Users } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { GlassCard } from "./glass-card"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

// Configuración visual (Iconos y Gradientes) que no cambia con el idioma
const productVisuals = [
  {
    icon: Monitor,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Bot,
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: Workflow,
    gradient: "from-orange-500 to-red-400",
  },
  {
    icon: Users,
    gradient: "from-emerald-500 to-teal-400",
  },
]

export function WhatYouGetSection() {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].whatYouGet

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.products.map((product: any, index: number) => {
            const visual = productVisuals[index] // Asignamos icono/color por índice
            return (
              <GlassCard key={index} className="p-6 relative group overflow-hidden">
                <div
                  className={`absolute top-0 right-0 p-3 bg-gradient-to-br ${visual.gradient} opacity-10 rounded-bl-2xl`}
                />

                <div className="mb-6 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${visual.gradient} flex items-center justify-center mb-4`}
                  >
                    <visual.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 h-20">{product.description}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.marketValueLabel}</span>
                    <span className="font-mono font-bold text-lg">{product.value}</span>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </GlassCard>
            )
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-muted-foreground">{t.totalLabel}</span>
            <span className="text-2xl font-bold line-through text-muted-foreground">{t.totalValue}</span>
            <span className="text-2xl font-bold text-400 text-[#FF5F1F]">{t.totalYear}</span>
          </div>
        </div>
      </div>
    </section>
  )
}