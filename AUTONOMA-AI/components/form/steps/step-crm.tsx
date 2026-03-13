"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Cloud, Zap, Table, XCircle, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
import { CRM_OPTIONS } from "../form-types"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const iconMap: Record<string, typeof Database> = {
  database: Database,
  cloud: Cloud,
  zap: Zap,
  table: Table,
  "x-circle": XCircle,
}

export function StepCRM() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepCRM
  // Accedemos a las opciones traducidas del formulario global
  const tOptions = landingContent[language].formOptions.crm

  const [selected, setSelected] = useState(state.data.crm)
  const [otherCrm, setOtherCrm] = useState(state.data.otherCrm || "")

  const handleSelect = (id: string) => {
    setSelected(id)
    dispatch({ type: "SET_FIELD", field: "crm", value: id })
  }

  const handleNext = () => {
    if (selected === "other" && otherCrm.trim()) {
      dispatch({ type: "SET_FIELD", field: "otherCrm", value: otherCrm.trim() })
    }
    dispatch({ type: "NEXT_STEP" })
  }

  const isValid = selected && (selected !== "other" || otherCrm.trim().length > 0)

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
        className="w-full max-w-2xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CRM_OPTIONS.map((option, idx) => {
            const Icon = iconMap[option.icon]
            const isSelected = selected === option.id
            // Usamos la traducción si existe (para 'other' y 'none'), sino el original
            const label = tOptions[option.id as keyof typeof tOptions] || option.label

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => handleSelect(option.id)}
                className={`relative p-6 rounded-xl border transition-all ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-500/10 scale-[1.02]"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:scale-[1.02]"
                }`}
              >
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                )}
                <Icon className={`w-8 h-8 mb-3 mx-auto ${isSelected ? "text-cyan-400" : "text-muted-foreground"}`} />
                <span className={`block text-sm font-medium ${isSelected ? "text-white" : "text-foreground"}`}>
                  {label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Other CRM input */}
        {selected === "other" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6">
            <Input
              type="text"
              placeholder={t.placeholderOther}
              value={otherCrm}
              onChange={(e) => setOtherCrm(e.target.value)}
              className="py-4 text-lg bg-white/5 border-white/10 focus:border-cyan-500"
              autoFocus
            />
          </motion.div>
        )}

        {/* No CRM message */}
        {selected === "none" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-cyan-400"
          >
            {t.noCrmMessage}
          </motion.p>
        )}
      </motion.div>

      <FormNavigation onNext={handleNext} isValid={!!isValid} />
    </motion.div>
  )
}