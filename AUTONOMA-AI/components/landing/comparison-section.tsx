"use client"

import { motion } from "framer-motion"
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function ComparisonSection() {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].comparison

  // 3. Cargamos las listas desde el diccionario
  const manualProcess = t.card1.items
  const autonomaProcess = t.card2.items

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={t.title} />

        <div className="grid lg:grid-cols-2 gap-8 mt-16 items-start">
          {/* Left Side - Current State */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative backdrop-blur-xl bg-gradient-to-br from-red-950/20 to-orange-950/20 border border-red-500/20 rounded-2xl p-8"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6">
              <XCircle className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-6 text-white">{t.card1.title}</h3>

            {/* List */}
            <ul className="space-y-4">
              {manualProcess.map((item: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Side - Deployed State */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="relative backdrop-blur-xl bg-gradient-to-br from-blue-950/20 to-cyan-950/20 border border-cyan-500/30 rounded-2xl p-8"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-6 text-white">{t.card2.title}</h3>

            {/* List */}
            <ul className="space-y-4">
              {autonomaProcess.map((item: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: idx * 0.1 + 0.2,
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Center Separator - Desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-4"
          >
            <ArrowRight className="w-10 h-10 text-cyan-400" strokeWidth={2.5} />
            <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full">
              <p className="text-xs font-bold text-white whitespace-nowrap">Set it & forget it</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}