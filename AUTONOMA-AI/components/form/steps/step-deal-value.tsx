"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tag, DollarSign, TrendingUp, Sparkles, ArrowRight, Check } from "lucide-react"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
import { DEAL_VALUE_OPTIONS } from "../form-types"
import { Button } from "@/components/ui/button"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const iconMap = {
  tag: Tag,
  "dollar-sign": DollarSign,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
}

export function StepDealValue() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepDealValue
  // Accedemos a las opciones traducidas
  const tOptions = landingContent[language].formOptions.dealValue

  const [selected, setSelected] = useState(state.data.dealValue)
  const [showLowValueWarning, setShowLowValueWarning] = useState(false)

  const handleSelect = (id: string) => {
    setSelected(id)
    dispatch({ type: "SET_FIELD", field: "dealValue", value: id })

    if (id === "under-1k") {
      setShowLowValueWarning(true)
    } else {
      setShowLowValueWarning(false)
    }
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
        className="text-3xl md:text-4xl font-semibold mb-4 text-center"
      >
        {t.title}
      </motion.h2>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mb-8 text-center">
        {t.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-lg space-y-3"
      >
        {DEAL_VALUE_OPTIONS.map((option, idx) => {
          const Icon = iconMap[option.icon as keyof typeof iconMap]
          const isSelected = selected === option.id
          
          // Obtenemos los textos traducidos de la opción
          const tOption = tOptions[option.id as keyof typeof tOptions]
          const label = tOption?.label || option.label
          const fit = tOption?.fit || option.fit

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => handleSelect(option.id)}
              className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all ${
                isSelected ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-cyan-500/20" : "bg-white/10"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? "text-cyan-400" : "text-muted-foreground"}`} />
                </div>
                <div className="text-left">
                  <span className={`block font-medium ${isSelected ? "text-white" : "text-foreground"}`}>
                    {label}
                  </span>
                  <span className={`text-xs ${isSelected ? "text-cyan-400" : "text-muted-foreground"}`}>
                    {fit}
                  </span>
                </div>
              </div>
              {isSelected ? (
                <Check className="w-5 h-5 text-cyan-400" />
              ) : (
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              )}
            </motion.button>
          )
        })}

        {/* Low value warning */}
        {showLowValueWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mt-4"
          >
            <p className="text-sm text-yellow-400 mb-4">
              {t.warningText}
            </p>
            <div className="flex gap-3">
              <Button size="sm" onClick={handleNext} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                {t.warningBtnYes}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelected("")
                  setShowLowValueWarning(false)
                }}
                className="border-white/20 bg-transparent"
              >
                {t.warningBtnNo}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {!showLowValueWarning && <FormNavigation onNext={handleNext} isValid={!!selected} />}
    </motion.div>
  )
}