"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFormContext } from "./form-context"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

type FormNavigationProps = {
  onNext?: () => void
  onBack?: () => void
  nextLabel?: string
  isValid?: boolean
  isLoading?: boolean
  showBack?: boolean
  showNext?: boolean
}

export function FormNavigation({
  onNext,
  onBack,
  nextLabel = "Continue",
  isValid = true,
  isLoading = false,
  showBack = true,
  showNext = true,
}: FormNavigationProps) {
  const { state, dispatch, canGoBack } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].form

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      dispatch({ type: "PREV_STEP" })
    }
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else {
      dispatch({ type: "NEXT_STEP" })
    }
  }

  // Lógica para traducir el botón "Continue" por defecto sin romper la prop
  const displayNextLabel = nextLabel === "Continue" ? t.continue : nextLabel

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-between mt-8 pt-6 border-t border-white/10"
    >
      {showBack && canGoBack && state.step > 1 ? (
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-muted-foreground hover:text-white"
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.back}
        </Button>
      ) : (
        <div />
      )}

      {showNext && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">{t.pressEnter}</span>
          <Button
            onClick={handleNext}
            disabled={!isValid || isLoading}
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.submitting}
              </>
            ) : (
              <>
                {displayNextLabel}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </motion.div>
  )
}