"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import {
  Zap,
  CalendarDays,
  Mail,
  RefreshCcw,
  Clock,
  MessageCircle,
} from "lucide-react"

export function SchedulerSection() {
  const steps = [
    {
      icon: Zap,
      name: "Detección de intención",
      description: "El agente reconoce la señal de compra y propone agendar en el momento preciso.",
    },
    {
      icon: CalendarDays,
      name: "Horarios en tiempo real",
      description: "Muestra disponibilidad directamente dentro del chat, sin redirigir al usuario.",
    },
    {
      icon: Mail,
      name: "Confirmación inmediata",
      description: "Prospecto y vendedor reciben la confirmación por email al instante.",
    },
    {
      icon: RefreshCcw,
      name: "Sincronización automática",
      description: "La cita aparece en Google Calendar o Calendly sin ningún paso manual.",
    },
    {
      icon: Clock,
      name: "Recordatorios inteligentes",
      description: "El agente envía avisos previos a la cita para reducir ausencias.",
    },
    {
      icon: MessageCircle,
      name: "Follow-up de no-show",
      description: "Si el prospecto no asiste, el agente retoma la conversación de forma autónoma.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="py-24 px-6 relative">
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Agendamiento automático"
            title="Tu agenda llena. Sin tocar el teléfono."
            subtitle="El agente detecta el momento exacto para proponer una cita y la cierra sin ayuda."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-16 items-start">
          {/* Left Column - Steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={stepVariants}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h4 className="font-semibold text-white text-sm mb-1">{step.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Column - Animated Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full min-h-96 flex items-center justify-center"
          >
            <svg
              className="w-full h-full max-w-xs"
              viewBox="0 0 120 500"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connecting Line */}
              <motion.line
                x1="60"
                y1="30"
                x2="60"
                y2="470"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="440"
                initial={{ strokeDashoffset: 440 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
                  <stop offset="50%" stopColor="rgba(34, 211, 238, 0.6)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
                </linearGradient>
              </defs>

              {/* Nodes */}
              {steps.map((step, i) => {
                const Icon = step.icon
                const yPos = 30 + i * 73.3
                return (
                  <g key={i}>
                    <motion.circle
                      cx="60"
                      cy={yPos}
                      r="16"
                      fill="rgba(34, 211, 238, 0.1)"
                      stroke="rgba(34, 211, 238, 0.3)"
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    />
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    >
                      <foreignObject x={60 - 8} y={yPos - 8} width="16" height="16">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </foreignObject>
                    </motion.g>
                  </g>
                )
              })}
            </svg>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
