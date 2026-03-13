"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flame, Zap, Calendar, Search, Check } from "lucide-react"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
import { TIMELINE_OPTIONS } from "../form-types"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const iconMap = {
  asap: Flame,
  "2-4-weeks": Zap,
  "1-3-months": Calendar,
  researching: Search,
}

const badgeColors = {
  red: "bg-red-500/20 text-red-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  blue: "bg-blue-500/20 text-blue-400",
  gray: "bg-gray-500/20 text-gray-400",
}

export function StepTimeline() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepTimeline
  // Accedemos a las opciones traducidas
  const tOptions = landingContent[language].formOptions.timeline

  const [selected, setSelected] = useState(state.data.timeline)

  const handleSelect = (id: string) => {
    setSelected(id)
    dispatch({ type: "SET_FIELD", field: "timeline", value: id })
  }

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-semibold mb-8 text-center"
      >
        {t.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-2xl grid sm:grid-cols-2 gap-4"
      >
        {TIMELINE_OPTIONS.map((option, idx) => {
          const Icon = iconMap[option.id as keyof typeof iconMap]
          const isSelected = selected === option.id

          // Obtenemos los textos traducidos
          const tOption = tOptions[option.id as keyof typeof tOptions]
          const label = tOption?.label || option.label
          const badge = tOption?.badge || option.badge
          const description = tOption?.desc || option.description
          const cta = tOption?.cta || option.cta

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.08 }}
              onClick={() => handleSelect(option.id)}
              className={`relative p-6 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-cyan-500 bg-cyan-500/10 scale-[1.02]"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:scale-[1.01]"
              }`}
            >
              {/* Badge */}
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  badgeColors[option.badgeColor as keyof typeof badgeColors]
                }`}
              >
                {badge}
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 left-3">
                  <Check className="w-4 h-4 text-cyan-400" />
                </motion.div>
              )}

              <Icon className={`w-8 h-8 mb-3 ${isSelected ? "text-cyan-400" : "text-muted-foreground"}`} />
              <h3 className={`font-semibold mb-1 ${isSelected ? "text-white" : "text-foreground"}`}>{label}</h3>
              <p className="text-sm text-muted-foreground mb-3">{description}</p>
              <span className="text-xs text-cyan-400 font-medium">{cta}</span>
            </motion.button>
          )
        })}
      </motion.div>

      <FormNavigation onNext={handleNext} isValid={!!selected} />
    </motion.div>
  )
}