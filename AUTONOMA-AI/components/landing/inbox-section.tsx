"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import {
  Layers,
  Filter,
  UserPlus,
  ScrollText,
  Search,
  Download,
} from "lucide-react"

export function InboxSection() {
  const conversations = [
    {
      name: "Carlos Mendoza",
      channel: "WhatsApp",
      status: "Calificado",
      statusColor: "bg-green-500",
      message: "Sí, me interesa el plan Pro. ¿Cuándo podemos hablar?",
      time: "hace 2 min",
      avatar: "CM",
    },
    {
      name: "Ana Torres",
      channel: "Webchat",
      status: "En progreso",
      statusColor: "bg-yellow-500",
      message: "¿El agente funciona con mi tienda en línea?",
      time: "hace 15 min",
      avatar: "AT",
    },
    {
      name: "Roberto Silva",
      channel: "Instagram",
      status: "Nuevo",
      statusColor: "bg-blue-500",
      message: "Hola, vi su publicación y quería más info",
      time: "hace 1h",
      avatar: "RS",
    },
    {
      name: "Daniela Reyes",
      channel: "WhatsApp",
      status: "Seguimiento",
      statusColor: "bg-orange-500",
      message: "Perdona, se me pasó responder...",
      time: "hace 3h",
      avatar: "DR",
    },
    {
      name: "Miguel Vargas",
      channel: "Webchat",
      status: "Cerrado",
      statusColor: "bg-gray-500",
      message: "Perfecto, quedamos así entonces.",
      time: "ayer",
      avatar: "MV",
    },
  ]

  const features = [
    {
      icon: Layers,
      label: "Vista Unificada",
      description: "Todos los canales en una sola bandeja. Sin cambiar de app.",
    },
    {
      icon: Filter,
      label: "Filtros por Estado",
      description: "Nuevo, en progreso, calificado, cerrado. Enfócate donde importa.",
    },
    {
      icon: UserPlus,
      label: "Asignación de Leads",
      description: "Distribuye prospectos entre tu equipo en segundos desde la misma vista.",
    },
    {
      icon: ScrollText,
      label: "Historial Completo",
      description: "Cada mensaje, cada respuesta, en orden cronológico e inmutable.",
    },
    {
      icon: Search,
      label: "Búsqueda Potente",
      description: "Encuentra cualquier lead por nombre, empresa o texto de conversación.",
    },
    {
      icon: Download,
      label: "Exportación Directa",
      description: "Descarga conversaciones completas para auditoría o entrenamiento del agente.",
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

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
      },
    }),
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07,
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
            eyebrow="Bandeja de entrada inteligente"
            title="Todas las conversaciones. Un solo lugar."
            subtitle="Sin pestañas abiertas, sin leads perdidos en WhatsApp. Tu equipo enfocado en cerrar."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Mock Inbox UI */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-white/10 p-4 bg-white/[0.01]">
              <h3 className="font-semibold text-white text-sm">Bandeja de entrada</h3>
              <p className="text-xs text-muted-foreground mt-1">5 conversaciones activas</p>
            </div>

            {/* Conversations */}
            <div className="divide-y divide-white/5">
              {conversations.map((conv, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="p-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{conv.avatar}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{conv.name}</p>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {conv.channel}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
                          {conv.time}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-2 flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${conv.statusColor}`}
                        />
                        <span className="text-xs text-muted-foreground">{conv.status}</span>
                      </div>

                      {/* Message Preview */}
                      <p className="text-xs text-gray-400 truncate group-hover:text-gray-300">
                        {conv.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={featureVariants}
                  className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2">{feature.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
