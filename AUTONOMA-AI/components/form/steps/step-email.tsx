"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Mail, Check, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"]

export function StepEmail() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepEmail

  const [value, setValue] = useState(state.data.email)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [isValid, setIsValid] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validate = (v: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setWarning("")

    if (!v.trim()) {
      setError(t.errorEmpty)
      setIsValid(false)
      return false
    }
    if (!emailRegex.test(v)) {
      setError(t.errorInvalid)
      setIsValid(false)
      return false
    }

    // Check for generic emails
    const domain = v.split("@")[1]?.toLowerCase()
    if (genericDomains.includes(domain)) {
      setWarning(t.warningGeneric)
    }

    setError("")
    setIsValid(true)
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setValue(v)
    validate(v)
  }

  const handleNext = () => {
    if (validate(value)) {
      dispatch({ type: "SET_FIELD", field: "email", value: value.trim().toLowerCase() })
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
        className="w-full max-w-lg"
      >
        <div className="relative">
          <Mail
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isValid ? "text-green-400" : "text-muted-foreground"}`}
          />
          <Input
            ref={inputRef}
            type="email"
            placeholder="john@company.com"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`pl-12 pr-12 py-6 text-lg bg-white/5 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 ${
              error ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {isValid && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Check className="w-5 h-5 text-green-400" />
            </motion.div>
          )}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-3 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}

        {!error && warning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center gap-2 text-sm text-yellow-400"
          >
            <AlertTriangle className="w-4 h-4" />
            {warning}
          </motion.div>
        )}

        {!error && !warning && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-muted-foreground">
            {t.helper}
          </motion.p>
        )}
      </motion.div>

      <FormNavigation onNext={handleNext} isValid={isValid} />
    </motion.div>
  )
}