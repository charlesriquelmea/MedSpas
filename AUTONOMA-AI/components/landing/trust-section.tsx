"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function TrustSection() {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].trust

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-12 text-center"
        >
          {/* Título dinámico */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.title}
          </h2>

          {/* Subtítulo dinámico */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.subtitle}
          </p>

          {/* Lista de items dinámica */}
          <div className="flex flex-wrap justify-center gap-4 border-t border-white/10 pt-8 mt-8">
            {t.items.map((item: string, idx: number) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span className="text-sm md:text-base text-gray-300">{item}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}