"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function StepName() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepName

  const [value, setValue] = useState(state.data.fullName)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validate = (v: string) => {
    if (!v.trim()) {
      setError(t.errorEmpty)
      return false
    }
    if (v.trim().length < 2) {
      setError(t.errorShort)
      return false
    }
    setError("")
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setValue(v)
    if (error) validate(v)
  }

  const handleNext = () => {
    if (validate(value)) {
      dispatch({ type: "SET_FIELD", field: "fullName", value: value.trim() })
      dispatch({ type: "NEXT_STEP" })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-6"
    >
      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-semibold mb-8 text-center"
      >
        {t.title}
      </motion.h2>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-lg"
      >
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={t.placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={50}
            className={`pl-12 py-6 text-lg bg-white/5 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 ${
              error ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
        </div>

        {/* Helper text or error */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-3 text-sm ${error ? "text-red-400" : "text-muted-foreground"}`}
        >
          {error || t.helper}
        </motion.p>
      </motion.div>

      <FormNavigation onNext={handleNext} isValid={value.trim().length >= 2} />
    </motion.div>
  )
}