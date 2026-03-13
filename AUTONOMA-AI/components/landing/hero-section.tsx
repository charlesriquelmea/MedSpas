"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { AnimatedGradientText } from "./animated-gradient-text"
import { WorkflowVisualization } from "./workflow-visualization"
// 1. IMPORTAMOS EL HOOK DE IDIOMA Y EL CONTENIDO
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

interface HeroSectionProps {
  onOpenForm?: () => void;
}

export function HeroSection({ onOpenForm }: HeroSectionProps) {
  // 2. OBTENEMOS EL IDIOMA ACTUAL
  const { language } = useLanguage()
  // 3. SELECCIONAMOS LOS TEXTOS DEL HERO SEGÚN EL IDIOMA
  const t = landingContent[language].hero

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 dot-grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs uppercase tracking-widest text-cyan-400 font-semibold"
            >
              {t.eyebrow}
            </motion.p>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance"
            >
              <AnimatedGradientText>{t.h1}</AnimatedGradientText>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3,
              }}
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t.subhead}
            </motion.p>

            {/* Bullets (Mapeamos desde el array de textos) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.4,
              }}
              className="flex flex-wrap gap-4"
            >
              {t.bullets.map((metric: string, idx: number) => (
                <div
                  key={idx}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {metric}
                </div>
              ))}
            </motion.div>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5,
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={onOpenForm}
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:scale-105 transition-transform group text-base px-8 animate-glow-pulse"
              >
                {t.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-base px-8 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                {t.ctaSecondary}
              </Button>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground"
            >
              {t.trustBadge}
            </motion.p>
          </motion.div>

          {/* Right Column - Animated Workflow Visualization */}
          <WorkflowVisualization />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}