"use client"

import { motion } from "framer-motion"
import { useFormContext } from "./form-context"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function StepIndicator() {
  const { state, totalSteps } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].form

  const progress = ((state.step - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full px-6 py-4">
      {/* Progress bar */}
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Step text */}
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {t.step} <span className="text-cyan-400 font-medium">{state.step}</span> {t.of} {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">{Math.round(progress)}% {t.complete}</span>
      </div>
    </div>
  )
}