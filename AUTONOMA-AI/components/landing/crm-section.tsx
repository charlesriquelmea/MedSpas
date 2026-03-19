"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./section-heading"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  UserCheck,
  Bell,
  FileDown,
  Users,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
} from "lucide-react"
import { useLanguage } from "../language-provider"
import { landingContent } from "@/data/landing-content"

export function CRMSection() {
  const { language } = useLanguage()
    const crmSection = landingContent[language].crmSection
    const features = crmSection.features
/*   const features = [
    {
      icon: LayoutDashboard,
      label: "Pipeline Visual",
      description: "Mueve leads entre etapas con drag & drop. Sin hojas de cálculo, sin caos.",
    },
    {
      icon: MessageSquare,
      label: "Historial Completo",
      description: "Cada mensaje que tu agente tuvo con cada prospecto, en orden cronológico.",
    },
    {
      icon: BarChart3,
      label: "Métricas en Tiempo Real",
      description: "Leads capturados, conversiones activas y velocidad de cierre en un solo vistazo.",
    },
    {
      icon: UserCheck,
      label: "Score de Leads",
      description: "Cada contacto llega calificado con empresa, cargo y nivel de prioridad.",
    },
    {
      icon: Bell,
      label: "Alertas de Leads Calificados",
      description: "Recibe un email en el momento en que entra un prospecto listo para cerrar.",
    },
    {
      icon: FileDown,
      label: "Reportes Exportables",
      description: "Descarga el rendimiento mensual completo en un clic. Sin depender de nadie.",
    },
    {
      icon: Users,
      label: "Roles por Usuario",
      description: "Admin, vendedor, viewer. Cada quien accede solo a lo que le corresponde.",
    },
    {
      icon: ShieldCheck,
      label: "Instancias Aisladas",
      description: "Los datos de cada cliente viven separados. Seguridad total por arquitectura.",
    },
    {
      icon: CalendarCheck,
      label: "Agenda Sincronizada",
      description: "Las citas agendadas por el agente aparecen en tu calendario de inmediato.",
    },
  ] */

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.07,
        ease: [0.16, 1, 0.3, 1],
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
            eyebrow={crmSection.eyebrow}
            title={crmSection.title}
            subtitle={crmSection.subtitle}
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-300 group"
          >
            {crmSection.demo}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* 3x3 Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.15)]"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{feature.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
