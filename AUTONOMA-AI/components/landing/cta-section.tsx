"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

interface CTASectionProps {
  onOpenForm?: () => void;
}

export function CTASection({ onOpenForm }: CTASectionProps) {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].cta

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-blue-900/20 via-blue-900/10 to-transparent">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            {t.subtitle}
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:scale-105 transition-transform group text-lg px-12 py-6 h-auto animate-glow-pulse"
              onClick={onOpenForm}
            >
              {t.button}
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Secondary text */}
          <p className="text-sm text-muted-foreground mt-6">
            {t.secondaryText}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {t.features.map((feature: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}