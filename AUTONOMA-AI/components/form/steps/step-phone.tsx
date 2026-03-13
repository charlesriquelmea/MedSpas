"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Phone, Check } from "lucide-react" // Importamos el ícono Phone
import { Input } from "@/components/ui/input"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function StepPhone() {
  const { state, dispatch } = useFormContext()
  const { language } = useLanguage()
  
  // Usamos los textos nuevos que definimos en el Paso 1
  const t = landingContent[language].onboarding.stepPhone

  // Asumimos que en tu state ya tienes o tendrás un campo 'phone'
  const [value, setValue] = useState(state.data.phone || "") 
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validate = (v: string) => {
    // Regex simple para teléfonos internacionales (acepta +, espacios, guiones y números)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
    
    if (!v.trim()) {
      setError(t.errorEmpty)
      setIsValid(false)
      return false
    }
    
    // Validamos que tenga al menos 7 dígitos para considerarlo real
    const digitsOnly = v.replace(/\D/g, '')
    if (!phoneRegex.test(v) || digitsOnly.length < 7) {
      setError(t.errorInvalid)
      setIsValid(false)
      return false
    }

    setError("")
    setIsValid(true)
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    // Permitimos escribir solo caracteres válidos para teléfonos
    if (/^[+0-9\s-]*$/.test(v)) {
      setValue(v)
      validate(v)
    }
  }

  const handleNext = () => {
    if (validate(value)) {
      // Guardamos en el contexto como 'phone'
      dispatch({ type: "SET_FIELD", field: "phone", value: value.trim() })
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
          <Phone
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isValid ? "text-green-400" : "text-muted-foreground"}`}
          />
          <Input
            ref={inputRef}
            type="tel"
            placeholder={t.placeholder}
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

        {!error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-muted-foreground">
            {t.helper}
          </motion.p>
        )}
      </motion.div>

      <FormNavigation onNext={handleNext} isValid={isValid} />
    </motion.div>
  )
}