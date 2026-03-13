"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useFormContext, FormProvider } from "./form-context"
import { StepIndicator } from "./step-indicator"
import { StepWelcome } from "./steps/step-welcome"
import { StepName } from "./steps/step-name"
import { StepEmail } from "./steps/step-email"
import { StepCompany } from "./steps/step-company"
import { StepCRM } from "./steps/step-crm"
import { StepLeads } from "./steps/step-leads"
import { StepDealValue } from "./steps/step-deal-value"
import { StepTimeline } from "./steps/step-timeline"
import { StepReview } from "./steps/step-review"
import { StepThankYou } from "./steps/step-thank-you"
import { useEffect, useCallback } from "react"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"
import { StepPhone } from "./steps/step-phone"

const steps = [
  StepWelcome,
  StepName,
  StepEmail,
  StepPhone,
  StepCompany,
  StepCRM,
  StepLeads,
  StepDealValue,
  StepTimeline,
  StepReview,
  StepThankYou,
]

function FormContent({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
      if (e.key === "Backspace" && document.activeElement?.tagName !== "INPUT") {
        if (state.step > 1 && state.step < 11) {
          dispatch({ type: "PREV_STEP" })
        }
      }
    },
    [state.step, dispatch, onClose],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const CurrentStep = steps[state.step - 1]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label={t.closeAriaLabel}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Logo */}
      <div className="fixed top-6 left-6 z-10">
        <span className="font-mono text-lg font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
          Autonoma.ai
        </span>
      </div>

      {/* Progress indicator (hidden on welcome and thank you) */}
      {state.step > 1 && state.step < 11 && (
        <div className="fixed top-20 left-0 right-0 z-10">
          <div className="max-w-2xl mx-auto">
            <StepIndicator />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="min-h-screen flex items-center justify-center pt-32 pb-16">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CurrentStep />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export function OnboardingForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent body scroll when form is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <FormProvider>
          <FormContent onClose={onClose} />
        </FormProvider>
      )}
    </AnimatePresence>
  )
}