"use client"

import { motion } from "framer-motion"
import { User, MessageSquare, Workflow, Database, Bell, ArrowRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const steps = [
  {
    number: "1",
    icon: User,
    title: "Capture",
    description: "The prospect initiates a chat from your web or landing page.",
    color: "blue",
  },
  {
    number: "2",
    icon: MessageSquare,
    title: "Qualify",
    description: "Autonoma asks 5–8 key questions (your checklist: budget, urgency, location, service type).",
    color: "cyan",
  },
  {
    number: "3",
    icon: Workflow,
    title: "Schedule",
    description: "If qualified, books on your calendar and sends confirmation.",
    color: "purple",
  },
  {
    number: "4",
    icon: Database,
    title: "Sync",
    description: "Creates/updates contact and deal in your CRM with structured data.",
    color: "green",
  },
  // {
  //   number: "5",
  //   icon: Bell,
  //   title: "Alert",
  //   description: "You get a message with: name, reason, score, calendar link, and CRM.",
  //   color: "orange",
  // },
]

const colorClasses = {
  blue: "from-blue-500 to-blue-600 text-blue-400 border-blue-500/50",
  cyan: "from-cyan-500 to-cyan-600 text-cyan-400 border-cyan-500/50",
  purple: "from-purple-500 to-purple-600 text-purple-400 border-purple-500/50",
  green: "from-green-500 to-green-600 text-green-400 border-green-500/50",
  orange: "from-orange-500 to-orange-600 text-orange-400 border-orange-500/50",
}

export function TechnicalFlowSection() {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].steps

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Título y Subtítulo dinámicos */}
        <SectionHeading
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Horizontal flow */}
        <div className="mt-16 relative">
          {/* Desktop: Horizontal layout */}
          <div className="hidden lg:flex items-start justify-between gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: idx * 0.1,
                  }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div
                    className={cn(
                      "relative backdrop-blur-xl bg-white/5 border-t-4 border-x border-b border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group",
                      colorClasses[step.color as keyof typeof colorClasses].split(" ")[2],
                    )}
                  >
                    {/* Number indicator */}
                    <div
                      className={cn(
                        "absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white text-sm shadow-lg",
                        colorClasses[step.color as keyof typeof colorClasses].split(" ").slice(0, 2).join(" "),
                      )}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 mt-2",
                        colorClasses[step.color as keyof typeof colorClasses].split(" ").slice(0, 2).join(" "),
                      )}
                    >
                      <step.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    {/* Title (Reemplazado por t.items[idx].title) */}
                    <h3 className="text-lg font-semibold mb-2 text-white">{t.items[idx].title}</h3>

                    {/* Description (Reemplazado por t.items[idx].desc) */}
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.items[idx].desc}</p>
                  </div>
                </motion.div>

                {/* Arrow connector (except for last item) */}
                {idx < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 left-[calc(20%*{idx}+10%)] w-[calc(20%-2rem)]"
                    style={{ left: `calc(${(idx + 1) * 20}% - 1rem)` }}
                  >
                    <ArrowRight className="w-8 h-8 text-cyan-500/50" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: Vertical layout */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: idx * 0.1,
                }}
                className="relative"
              >
                {/* Step Card */}
                <div
                  className={cn(
                    "relative backdrop-blur-xl bg-white/5 border-l-4 border-y border-r border-white/10 rounded-2xl p-6",
                    colorClasses[step.color as keyof typeof colorClasses].split(" ")[2],
                  )}
                >
                  {/* Number indicator */}
                  <div
                    className={cn(
                      "absolute -left-4 top-6 w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white text-sm shadow-lg",
                      colorClasses[step.color as keyof typeof colorClasses].split(" ").slice(0, 2).join(" "),
                    )}
                  >
                    {step.number}
                  </div>

                  <div className="pl-6">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                        colorClasses[step.color as keyof typeof colorClasses].split(" ").slice(0, 2).join(" "),
                      )}
                    >
                      <step.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    {/* Title (Reemplazado por t.items[idx].title) */}
                    <h3 className="text-lg font-semibold mb-2 text-white">{t.items[idx].title}</h3>

                    {/* Description (Reemplazado por t.items[idx].desc) */}
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.items[idx].desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}