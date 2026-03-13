"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function StepLeads() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepLeads

  const [value, setValue] = useState(state.data.leadsPerMonth)
  const [painPoints, setPainPoints] = useState<string[]>(state.data.painPoints || [])

  // Función interna para obtener categoría traducida
  function getLeadCategory(val: number): string {
    if (val <= 50) return t.categories.starting
    if (val <= 200) return t.categories.growing
    if (val <= 500) return t.categories.highVolume
    return t.categories.enterprise
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number.parseInt(e.target.value, 10)
    setValue(v)
    dispatch({ type: "SET_FIELD", field: "leadsPerMonth", value: v })
  }

  const togglePainPoint = (pointId: string) => {
    // Nota: Guardamos el ID en el estado global, no el texto traducido, para consistencia
    const newPoints = painPoints.includes(pointId) ? painPoints.filter((p) => p !== pointId) : [...painPoints, pointId]
    setPainPoints(newPoints)
    dispatch({ type: "SET_FIELD", field: "painPoints", value: newPoints })
  }

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" })
  }

  // Mapeo de IDs de dolor a sus etiquetas traducidas
  const painPointsOptions = [
    { id: "slow_response", label: t.painPoints.slow },
    { id: "manual_entry", label: t.painPoints.manual },
  ]

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
        className="w-full max-w-lg space-y-8"
      >
        {/* Number display */}
        <div className="text-center">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
          >
            ~{value === 1000 ? "1000+" : value}
          </motion.span>
          <p className="text-lg text-muted-foreground mt-2">{t.leadsPerMonth}</p>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-blue-500
              [&::-webkit-slider-thumb]:to-cyan-500
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-cyan-500/50
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #06b6d4 ${(value / 1000) * 100}%, rgba(255,255,255,0.1) ${(value / 1000) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
        </div>

        {/* Category label */}
        <motion.p
          key={getLeadCategory(value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-cyan-400"
        >
          {getLeadCategory(value)}
        </motion.p>

        {/* Pain points */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          {painPointsOptions.map((point) => (
            <label
              key={point.id}
              className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                painPoints.includes(point.id)
                  ? "bg-cyan-500/10 border border-cyan-500/30"
                  : "bg-white/5 border border-white/10 hover:border-white/20"
              }`}
            >
              <input
                type="checkbox"
                checked={painPoints.includes(point.id)}
                onChange={() => togglePainPoint(point.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  painPoints.includes(point.id) ? "bg-cyan-500 border-cyan-500" : "border-white/30"
                }`}
              >
                {painPoints.includes(point.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{point.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      <FormNavigation onNext={handleNext} isValid={true} />
    </motion.div>
  )
}