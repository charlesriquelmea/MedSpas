"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Building2, Database, Users, DollarSign, Calendar, Edit2, Clock, Rocket, Check } from "lucide-react"
import { useFormContext } from "../form-context"
import { FormNavigation } from "../form-navigation"
import { CRM_OPTIONS, DEAL_VALUE_OPTIONS, TIMELINE_OPTIONS } from "../form-types"
import { mapWizardToTwenty } from "../../../lib/twenty-mapper"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

type ReviewField = {
  key: string
  label: string
  value: string
  icon: typeof User
  step: number
}

export function StepReview() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepReview
  // Necesitamos acceso a las opciones traducidas para mostrar los valores correctos
  const tOptions = landingContent[language].formOptions

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helpers para obtener etiquetas legibles y traducidas
  const getCrmLabel = () => {
    if (state.data.crm === "other") return state.data.otherCrm || t.labels.otherCrm
    const labelKey = state.data.crm as keyof typeof tOptions.crm
    return tOptions.crm[labelKey] || state.data.crm || "-"
  }

  const getDealValueLabel = () => {
    const labelKey = state.data.dealValue as keyof typeof tOptions.dealValue
    return tOptions.dealValue[labelKey]?.label || state.data.dealValue || "-"
  }

  const getTimelineLabel = () => {
    const labelKey = state.data.timeline as keyof typeof tOptions.timeline
    return tOptions.timeline[labelKey]?.label || state.data.timeline || "-"
  }

  const fields: ReviewField[] = [
    { key: "fullName", label: t.labels.name, value: state.data.fullName, icon: User, step: 2 },
    { key: "email", label: t.labels.email, value: state.data.email, icon: Mail, step: 3 },
    { key: "phone", label: t.labels.phone, value: state.data.phone, icon: User, step: 3 },
    { key: "company", label: t.labels.company, value: state.data.company, icon: Building2, step: 4 },
    { key: "crm", label: t.labels.crm, value: getCrmLabel(), icon: Database, step: 5 },
    { key: "leadsPerMonth", label: t.labels.leads, value: `~${state.data.leadsPerMonth}`, icon: Users, step: 6 },
    { key: "dealValue", label: t.labels.dealValue, value: getDealValueLabel(), icon: DollarSign, step: 7 },
    { key: "timeline", label: t.labels.timeline, value: getTimelineLabel(), icon: Calendar, step: 8 },
  ]

  const handleEdit = (step: number) => {
    dispatch({ type: "GO_TO_STEP", step })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // ✅ AQUI ESTA LA CONEXIÓN CON TU API DE RESEND
      const twentyData = mapWizardToTwenty(state.data, state.leadScore)

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(twentyData),
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      // Si todo sale bien, avanzamos a la pantalla de éxito
      dispatch({ type: "SUBMIT" })
      dispatch({ type: "NEXT_STEP" })

    } catch (error) {
      console.error("Form submission error:", error)
      // Opcional: Mostrar error al usuario. 
      // Por ahora avanzamos igual para no trabar la experiencia (comportamiento original)
      dispatch({ type: "SUBMIT" })
      dispatch({ type: "NEXT_STEP" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Iconos para los pasos siguientes
  const nextStepsIcons = [Clock, Calendar, Rocket]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center min-h-[400px] px-6 py-8"
    >
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Left: Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-semibold mb-6">{t.title}</h2>

          <div className="space-y-3">
            {fields.map((field, idx) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 group"
              >
                <div className="flex items-center gap-3">
                  <field.icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-xs text-muted-foreground block">{field.label}</span>
                    <span className="font-medium">{field.value}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(field.step)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: What happens next */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-semibold mb-6">{t.nextTitle}</h2>

          <div className="space-y-6 mb-8">
            {t.nextSteps.map((item: any, idx: number) => {
                const Icon = nextStepsIcons[idx]
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                )
            })}
          </div>

          {/* Trust indicators */}
          <div className="space-y-2 text-sm text-muted-foreground border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{t.trust.secure}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{t.trust.spam}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{t.trust.response}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <FormNavigation
        onNext={handleSubmit}
        nextLabel={isSubmitting ? t.sending : t.submitBtn}
        isValid={true}
        isLoading={isSubmitting}
      />
    </motion.div>
  )
}