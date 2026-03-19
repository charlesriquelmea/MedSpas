"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./section-heading"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "../language-provider"
import { landingContent } from "@/data/landing-content"

export function AgentTiersSection() {
  /*   const tiers = [
      {
        index: 1,
        name: "Asistente FAQ",
        tagline: "Captura leads 24/7 sin intervención humana",
        badge: "Ideal para landing pages",
        features: [
          "Responde preguntas frecuentes automáticamente",
          "Captura nombre, email y teléfono del prospecto",
          "1 canal activo: webchat",
          "Base de conocimiento de hasta 30 preguntas",
          "Notificación al equipo por cada lead nuevo",
        ],
        cta: "Empezar aquí",
        highlight: false,
      },
      {
        index: 2,
        name: "Agente de Ventas + CRM",
        tagline: "Califica, negocia y agenda sin un SDR",
        badge: "Para equipos de ventas activos",
        features: [
          "Calificación inteligente de leads por perfil",
          "Seguimiento por email completamente automatizado",
          "Agenda reuniones en tiempo real desde el chat",
          "CRM con pipeline activo incluido en el plan",
          "Base de conocimiento amplia y personalizable",
          "Adapta el tono y las respuestas según el prospecto",
        ],
        cta: "Ver demo",
        highlight: true,
      },
      {
        index: 3,
        name: "Ejecutivo IA Multi-canal",
        tagline: "Un agente que recuerda todo, sin importar el canal",
        badge: "Para negocios con alta demanda",
        features: [
          "WhatsApp + Webchat + Instagram + Discord simultáneos",
          "Contexto unificado entre todos los canales",
          "El lead puede cambiar de canal sin perder el hilo",
          "CRM multi-canal consolidado en una sola vista",
          "Reportes de rendimiento por canal",
        ],
        cta: "Cotizar",
        highlight: false,
      },
      {
        index: 4,
        name: "Enterprise Personalizado",
        tagline: "Integrado a tu operación desde el día uno",
        badge: "Para operaciones complejas",
        features: [
          "Integración con tu ERP o CRM existente",
          "Catálogos de 500+ productos con búsqueda inteligente",
          "Multi-idioma: español, inglés y portugués",
          "Flujos de conversación diseñados a medida",
          "Reportes y dashboards personalizados",
          "Soporte dedicado con acuerdo de nivel de servicio",
        ],
        cta: "Hablar con ventas",
        highlight: false,
      },
    ] */

  const { language } = useLanguage()
  const agentSection = landingContent[language].agentTiersSection
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            eyebrow={agentSection.eyebrow}
            title={agentSection.title}
            subtitle={agentSection.subtitle}
          />
        </motion.div>

        {/* 4-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {agentSection.tiers.map((tier) => (
            <motion.div
              key={tier.index}
              variants={cardVariants}
              className={`relative p-8 rounded-xl border transition-all duration-300 flex flex-col h-full ${tier.highlight
                  ? "border-2 border-cyan-400/60 bg-cyan-400/[0.03] ring-1 ring-cyan-400/20 shadow-[0_0_32px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
            >
              {/* Highlight Badge */}
              {tier.highlight && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <div className="px-3 py-1 bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider rounded-full">
                    {agentSection.popu}
                  </div>
                </motion.div>
              )}

              {/* Tier Index */}
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
                {agentSection.plan} {tier.index}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>

              {/* Tagline */}
              <p className="text-sm text-muted-foreground mb-4">{tier.tagline}</p>

              {/* Badge Pill */}
              <div className="inline-flex px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 w-fit">
                <span className="text-xs text-cyan-300 font-medium">{tier.badge}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full transition-all ${tier.highlight
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white"
                    : "border border-cyan-400/30 bg-transparent text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400/50"
                  }`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Border Glow Animation for Popular Card */}
        <style jsx>{`
          @keyframes border-pulse {
            0%,
            100% {
              box-shadow: 0 0 32px rgba(34, 211, 238, 0.2);
            }
            50% {
              box-shadow: 0 0 48px rgba(34, 211, 238, 0.4);
            }
          }
        `}</style>
      </div>
    </section>
  )
}
