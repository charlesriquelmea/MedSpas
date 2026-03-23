"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  MessageSquare, Phone, Calendar, CheckCircle2,
  DollarSign, Bot, Zap, ArrowRight, Star,
  Inbox, Kanban, Activity, Bell, Search,
  MoreHorizontal, Send, Paperclip, Smile,
  Instagram, Facebook, Globe, Mic, CreditCard,
  Database, GitMerge, Hash,
} from "lucide-react"

// ─── EASING + MOTION VARIANTS ────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Stage = "nuevo" | "calificado" | "agendado" | "depositado"

interface Lead {
  id: string
  name: string
  treatment: string
  value: number
  source: string
  phone: string
  time: string
  stage: Stage
  avatar: string
  urgent: boolean
  deposit: boolean
  tags: string[]
  appointment?: string
  depositAmount?: number
}

interface Thread {
  id: number
  name: string
  preview: string
  time: string
  unread: boolean
  source: string
  status: string
  stage: Stage
  avatar: string
}

interface Message {
  role: "user" | "ai" | "system"
  text: string
  time: string
  channel?: string
  latency?: string
  hasPayment?: boolean
}

interface ActivityEvent {
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  color: string
  time: string
  event: string
  detail: string
  type: string
}

// ─── AVATAR COLORS ─────────────────────────────────────────────────────────
const AVATAR_COLORS: Record<string, string> = {
  MG: "from-[#00D2AA]/40 to-[#065F46]/60",
  JR: "from-[#8B5CF6]/40 to-[#4C1D95]/60",
  CT: "from-[#F59E0B]/40 to-[#92400E]/60",
  SM: "from-[#EF4444]/40 to-[#7F1D1D]/60",
  AV: "from-[#3B82F6]/40 to-[#1E3A8A]/60",
  LH: "from-[#EC4899]/40 to-[#831843]/60",
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INITIAL_PIPELINE_LEADS: Lead[] = [
  {
    id: "L001", name: "María González", treatment: "Relleno labial", value: 450,
    source: "Instagram", phone: "+1 (201) 555-0142", time: "hace 4 min",
    stage: "nuevo", avatar: "MG", urgent: false, deposit: false,
    tags: ["Spanglish", "Primera vez"],
  },
  {
    id: "L002", name: "Jennifer Reyes", treatment: "Botox frente", value: 680,
    source: "Facebook", phone: "+1 (973) 555-0198", time: "hace 12 min",
    stage: "calificado", avatar: "JR", urgent: false, deposit: false,
    tags: ["Inglés", "Recurrente"],
  },
  {
    id: "L003", name: "Camila Torres", treatment: "HydraFacial", value: 320,
    source: "WhatsApp", phone: "+1 (732) 555-0167", time: "hace 28 min",
    stage: "agendado", avatar: "CT", urgent: true, deposit: true,
    tags: ["Español", "Sábado 11AM"],
    appointment: "Sáb 24 Feb · 11:00 AM",
  },
  {
    id: "L004", name: "Sofia Martínez", treatment: "Láser CO2", value: 1200,
    source: "Website", phone: "+1 (551) 555-0134", time: "hace 1h",
    stage: "depositado", avatar: "SM", urgent: false, deposit: true,
    tags: ["Español", "Alto valor"],
    appointment: "Vie 23 Feb · 3:00 PM",
    depositAmount: 75,
  },
  {
    id: "L005", name: "Andres Vega", treatment: "Kybella", value: 890,
    source: "Instagram", phone: "+1 (201) 555-0189", time: "hace 2h",
    stage: "calificado", avatar: "AV", urgent: false, deposit: false,
    tags: ["Inglés", "Dudas precio"],
  },
  {
    id: "L006", name: "Lucia Herrera", treatment: "PRP Capilar", value: 750,
    source: "Facebook", phone: "+1 (973) 555-0112", time: "hace 3h",
    stage: "agendado", avatar: "LH", urgent: false, deposit: true,
    tags: ["Español", "Dom 10AM"],
    appointment: "Dom 25 Feb · 10:00 AM",
  },
]

const STAGES: { id: Stage; label: string; color: string; dot: string }[] = [
  { id: "nuevo", label: "Nuevo Lead", color: "#4B5563", dot: "#6B7280" },
  { id: "calificado", label: "Calificado", color: "#F59E0B", dot: "#F59E0B" },
  { id: "agendado", label: "Agendado", color: "#00D2AA", dot: "#00D2AA" },
  { id: "depositado", label: "Depósito ✓", color: "#8B5CF6", dot: "#8B5CF6" },
]

const TABS = [
  { id: "pipeline", label: "Pipeline", icon: Kanban },
  { id: "inbox", label: "Bandeja de IA", icon: Inbox },
  { id: "activity", label: "Actividad", icon: Activity },
]

const THREADS: Thread[] = [
  { id: 0, name: "María González", preview: "¿Precio de relleno de labios?", time: "4m", unread: true, source: "instagram", status: "activa", stage: "nuevo", avatar: "MG" },
  { id: 1, name: "Jennifer Reyes", preview: "Tengo rosácea ¿es seguro el botox?", time: "12m", unread: true, source: "facebook", status: "calificada", stage: "calificado", avatar: "JR" },
  { id: 2, name: "Camila Torres", preview: "Sí, mándame el link de pago 🙌", time: "28m", unread: false, source: "whatsapp", status: "agendada", stage: "agendado", avatar: "CT" },
  { id: 3, name: "Sofia Martínez", preview: "✓ Depósito confirmado · $75", time: "1h", unread: false, source: "whatsapp", status: "depositada", stage: "depositado", avatar: "SM" },
  { id: 4, name: "Andres Vega", preview: "¿El precio incluye retoque?", time: "2h", unread: false, source: "instagram", status: "en seguimiento", stage: "calificado", avatar: "AV" },
]

const CONVERSATION_0: Message[] = [
  { role: "user", text: "Precio de relleno de labios? 💉", time: "11:47 PM", channel: "Instagram DM" },
  { role: "ai", text: "¡Hola María! 😊 El relleno de ácido hialurónico está en $450. ¿Tienes alguna condición de piel que deba conocer antes de tu cita?", time: "11:47 PM", latency: "4.2 seg" },
  { role: "user", text: "Tengo rosácea, ¿es seguro?", time: "11:49 PM" },
  { role: "ai", text: "¡Sí! El relleno de HA es seguro para rosácea según nuestro protocolo Allergan ✓. De hecho es uno de los tratamientos más suaves. ¿Te gustaría ver disponibilidad para esta semana?", time: "11:49 PM", latency: "3.8 seg" },
  { role: "user", text: "Sí, ¿tienen el sábado?", time: "11:51 PM" },
  { role: "ai", text: "¡Perfecto! Tengo disponibilidad el sábado 24 de febrero a las 11:00 AM y 2:00 PM. ¿Cuál prefieres? Necesito un depósito de $75 para asegurar tu lugar 🔒", time: "11:51 PM", latency: "5.1 seg" },
  { role: "user", text: "Las 11 AM 🙌", time: "11:52 PM" },
  { role: "ai", text: "¡Excelente! Aquí tu link de pago seguro 👇", time: "11:52 PM", latency: "2.9 seg", hasPayment: true },
  { role: "system", text: "✓ Pago confirmado · $75 · Stripe Health · 11:54 PM", time: "11:54 PM" },
  { role: "ai", text: "¡Listo María! Tu cita está confirmada para el sábado 24 a las 11 AM 🎉 Te enviamos un recordatorio 24h antes. ¡Nos vemos!", time: "11:54 PM", latency: "3.2 seg" },
]

const CONVERSATIONS: Record<number, Message[]> = {
  0: CONVERSATION_0,
  1: [
    { role: "user", text: "Tengo rosácea ¿es seguro el botox?", time: "11:31 AM" },
    { role: "ai", text: "¡Hola Jennifer! El botox es seguro para rosácea. Nuestro protocolo contempla una dosis reducida en zonas sensibles. ¿Te gustaría agendar una consulta?", time: "11:31 AM", latency: "3.5 seg" },
    { role: "user", text: "¿Cuánto cuesta?", time: "11:33 AM" },
    { role: "ai", text: "El tratamiento de botox para frente está en $680. Incluye retoque a las 2 semanas sin costo adicional 💉", time: "11:33 AM", latency: "4.1 seg" },
  ],
  2: [
    { role: "user", text: "Sí, mándame el link de pago 🙌", time: "10:58 AM" },
    { role: "ai", text: "¡Perfecto Camila! Aquí tu link de pago seguro 👇", time: "10:58 AM", latency: "2.7 seg", hasPayment: true },
    { role: "system", text: "✓ Pago confirmado · $75 · Stripe Health · 11:01 AM", time: "11:01 AM" },
    { role: "ai", text: "¡Listo! Cita confirmada para el Sábado 24 a las 11 AM 🎉", time: "11:01 AM", latency: "3.0 seg" },
  ],
  3: [
    { role: "system", text: "✓ Depósito confirmado · $75 · Stripe Health", time: "10:15 AM" },
    { role: "ai", text: "¡Hola Sofia! Tu depósito de $75 fue confirmado ✓. Tienes cita el Viernes 23 a las 3:00 PM para Láser CO2. ¡Te esperamos!", time: "10:15 AM", latency: "2.8 seg" },
    { role: "user", text: "¡Gracias! ¿Debo prepararme de alguna forma?", time: "10:18 AM" },
    { role: "ai", text: "Sí, te recomendamos evitar el sol 48h antes y no usar retinol la semana previa. Recibirás un recordatorio el día anterior 💌", time: "10:18 AM", latency: "4.3 seg" },
  ],
  4: [
    { role: "user", text: "¿El precio incluye retoque?", time: "9:45 AM" },
    { role: "ai", text: "¡Hola Andres! El precio de Kybella ($890) incluye la sesión completa. Para retoques, ofrecemos un 30% de descuento en revisiones dentro de los 3 meses.", time: "9:45 AM", latency: "3.9 seg" },
    { role: "user", text: "¿Cuántas sesiones necesito?", time: "9:47 AM" },
    { role: "ai", text: "Generalmente se necesitan 2–4 sesiones dependiendo del área. Podemos hacer una evaluación gratuita para darte un plan exacto. ¿Cuándo tienes disponibilidad?", time: "9:48 AM", latency: "4.7 seg" },
  ],
}

const ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: 1, icon: Bot, color: "#00D2AA", time: "hace 4 min", event: "Nuevo lead capturado", detail: "María González via Instagram DM · Botox frente", type: "lead" },
  { id: 2, icon: MessageSquare, color: "#00D2AA", time: "hace 4 min", event: "Conversación iniciada", detail: "Respuesta en 4.2 seg · Idioma detectado: Español", type: "ai" },
  { id: 3, icon: Database, color: "#8B5CF6", time: "hace 3 min", event: "RAG consultado", detail: "Protocolo Allergan verificado · Rosácea: compatible", type: "rag" },
  { id: 4, icon: Calendar, color: "#00D2AA", time: "hace 3 min", event: "Disponibilidad consultada", detail: "API Boulevard · TTL 30s · 3 slots disponibles", type: "calendar" },
  { id: 5, icon: CreditCard, color: "#8B5CF6", time: "hace 2 min", event: "Link de pago generado", detail: "Stripe Health · $75 depósito · Sáb 24 Feb 11AM", type: "payment" },
  { id: 6, icon: CheckCircle2, color: "#00D2AA", time: "hace 1 min", event: "Pago confirmado via webhook", detail: "María González · $75 · Stripe ✓ · Cita bloqueada", type: "success" },
  { id: 7, icon: GitMerge, color: "#00D2AA", time: "hace 1 min", event: "CRM sincronizado", detail: "GoHighLevel v2 · Contacto creado · Tag: Ad_NJ_Botox", type: "crm" },
  { id: 8, icon: Bell, color: "#F59E0B", time: "hace 58s", event: "Recordatorio programado", detail: "SMS + WhatsApp · 24h antes de la cita · Auto", type: "reminder" },
  { id: 9, icon: Phone, color: "#EF4444", time: "hace 30 min", event: "Intento de cancelación detectado", detail: "Camila Torres · SMS: 'no podré ir'", type: "alert" },
  { id: 10, icon: Mic, color: "#F59E0B", time: "hace 28 min", event: "Voice AI activado", detail: "Llamada saliente · Retención de depósito · Reprogramada", type: "voice" },
  { id: 11, icon: CheckCircle2, color: "#00D2AA", time: "hace 27 min", event: "No-show prevenido", detail: "Camila Torres reprogramada · Dom 25 Feb 10AM", type: "success" },
  { id: 12, icon: DollarSign, color: "#00D2AA", time: "hace 2h", event: "Revenue generado", detail: "Sofia Martínez · Láser CO2 $1,200 · Atribuido: Meta Ads", type: "revenue" },
]

const FLOW_NODES = [
  { icon: Instagram, label: "Instagram Ad" },
  { icon: Bot, label: "AI Responde" },
  { icon: CheckCircle2, label: "Lead Calificado" },
  { icon: Calendar, label: "Cita + Depósito" },
  { icon: GitMerge, label: "CRM Sync ✓" },
]

// ─── HELPER: SOURCE ICON ──────────────────────────────────────────────────────
function SourceIcon({ source }: { source: string }) {
  if (source === "Instagram" || source === "instagram") return <Instagram size={10} className="text-[#4B5563]" />
  if (source === "Facebook" || source === "facebook") return <Facebook size={10} className="text-[#4B5563]" />
  if (source === "WhatsApp" || source === "whatsapp") return <Hash size={10} className="text-[#4B5563]" />
  return <Globe size={10} className="text-[#4B5563]" />
}

function SourceBadgeIcon({ source }: { source: string }) {
  if (source === "instagram") return <Instagram size={8} className="text-pink-400" />
  if (source === "facebook") return <Facebook size={8} className="text-blue-400" />
  return <Hash size={8} className="text-green-400" />
}

function stageBadgeColor(stage: Stage) {
  switch (stage) {
    case "nuevo": return "bg-[#4B5563]/20 text-[#9CA3AF]"
    case "calificado": return "bg-[#F59E0B]/10 text-[#F59E0B]"
    case "agendado": return "bg-[#00D2AA]/10 text-[#00D2AA]"
    case "depositado": return "bg-[#8B5CF6]/10 text-[#8B5CF6]"
  }
}

// ─── PIPELINE VIEW ────────────────────────────────────────────────────────────
function PipelineView({
  leads,
  highlightedId,
  typingId,
}: {
  leads: Lead[]
  highlightedId: string | null
  typingId: string | null
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div>
      {/* Live activity indicator */}
      <div className="flex items-center gap-3 mb-4 text-xs text-[#4B5563]">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#00D2AA]"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>El agente AI está procesando 3 conversaciones activas · Último lead: hace 4 min</span>
        </div>
        <span className="ml-auto text-[#00D2AA] font-medium shrink-0">6 leads hoy · $4,290 en pipeline</span>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-4 gap-3 min-w-215">
          {STAGES.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage.id)
            return (
              <motion.div layout key={stage.id} className="bg-[#0C1018]/60 rounded-xl border border-white/5 p-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.dot }} />
                    <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">{stage.label}</span>
                  </div>
                  <span className="bg-white/5 text-[#4B5563] text-xs px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {stageLeads.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        isHighlighted={highlightedId === lead.id}
                        isTyping={typingId === lead.id}
                        isHovered={hoveredId === lead.id}
                        onHover={() => setHoveredId(lead.id)}
                        onLeave={() => setHoveredId(null)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LeadCard({
  lead,
  isHighlighted,
  isTyping,
  isHovered,
  onHover,
  onLeave,
}: {
  lead: Lead
  isHighlighted: boolean
  isTyping: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      layoutId={`card-${lead.id}`}
      layout
      whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
      transition={{ layout: { type: "spring", stiffness: 180, damping: 22 }, type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className={[
        "bg-[#0F1720] border rounded-xl p-4 cursor-pointer",
        isHighlighted
          ? "border-[#00D2AA]/50 shadow-[0_0_20px_rgba(0,210,170,0.15)]"
          : "border-white/8",
        lead.urgent ? "border-l-2 border-l-[#EF4444]" : "",
      ].join(" ")}
    >
      {/* Row 1: Avatar + Name + Source */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-full bg-linear-to-br ${AVATAR_COLORS[lead.avatar] ?? "from-[#00D2AA]/40 to-[#065F46]/60"} flex items-center justify-center text-xs font-semibold text-[#EFF6FF] shrink-0`}>
          {lead.avatar}
        </div>
        <span className="text-sm font-semibold text-[#EFF6FF] flex-1 truncate">{lead.name}</span>
        <SourceIcon source={lead.source} />
      </div>

      {/* Row 2: Treatment pill */}
      <div className="bg-white/4 border border-white/8 rounded-lg px-2 py-1 flex items-center gap-1 mb-2 w-fit">
        <Star size={10} className="text-[#94A3B8]" />
        <span className="text-xs text-[#94A3B8]">{lead.treatment}</span>
      </div>

      {/* Row 3: Value + Time */}
      <div className="flex items-center mb-2">
        <span className="text-sm font-semibold text-[#00D2AA]">${lead.value}</span>
        <span className="text-xs text-[#4B5563] ml-auto">{lead.time}</span>
      </div>

      {/* Row 4: Tags */}
      <div className="flex gap-1 flex-wrap mb-2">
        {lead.tags.map((tag) => (
          <span key={tag} className="bg-[#00D2AA]/8 text-[#00D2AA] text-[10px] px-2 py-0.5 rounded-full border border-[#00D2AA]/15">
            {tag}
          </span>
        ))}
      </div>

      {/* Row 5: Deposit badge */}
      {lead.deposit && lead.depositAmount && (
        <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-lg px-2 py-1 text-[10px] text-[#8B5CF6] flex items-center gap-1 mb-2">
          <CreditCard size={10} />
          <span>Depósito ${lead.depositAmount} · Stripe ✓</span>
        </div>
      )}

      {/* Row 6: Appointment */}
      {lead.appointment && (
        <div className="bg-[#00D2AA]/8 border border-[#00D2AA]/15 rounded-lg px-2 py-1 text-[10px] text-[#00D2AA] flex items-center gap-1 mb-2">
          <Calendar size={10} />
          <span>{lead.appointment}</span>
        </div>
      )}

      {/* Typing indicator */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="bg-[#00D2AA]/10 border-t border-[#00D2AA]/15 rounded-b-xl -mx-4 -mb-4 px-4 py-2 mt-3 flex items-center gap-1.5 text-[10px] text-[#00D2AA]"
          >
            <Bot size={10} />
            <span>Receptor AI procesando...</span>
            <div className="flex gap-0.5 ml-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#00D2AA]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI action badge on hover */}
      <AnimatePresence>
        {isHovered && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="bg-[#00D2AA]/10 border-t border-[#00D2AA]/15 rounded-b-xl -mx-4 -mb-4 px-4 py-2 mt-3 flex items-center gap-1.5 text-[10px] text-[#00D2AA]"
          >
            <Bot size={10} />
            <span>Gestionado por Receptor AI · Automático</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── INBOX VIEW ───────────────────────────────────────────────────────────────
function InboxView() {
  const [activeThread, setActiveThread] = useState(0)
  const [showPanel, setShowPanel] = useState(false)

  const messages = CONVERSATIONS[activeThread] ?? CONVERSATION_0

  return (
    <div className="flex h-125 rounded-xl overflow-hidden border border-white/5">
      {/* Left panel */}
      <div className={`w-72 shrink-0 border-r border-white/5 flex flex-col ${showPanel ? "hidden" : "flex"} md:flex`}>
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold text-[#EFF6FF]">Bandeja de IA</span>
          <span className="bg-[#00D2AA]/15 text-[#00D2AA] text-xs px-2 py-0.5 rounded-full">6 activas</span>
        </div>
        <div className="mx-3 my-2 shrink-0">
          <div className="bg-white/3 border border-white/8 rounded-lg px-3 py-2 flex items-center gap-2">
            <Search size={12} className="text-[#4B5563]" />
            <input
              readOnly
              placeholder="Buscar conversación..."
              className="bg-transparent text-xs text-[#EFF6FF] placeholder:text-[#4B5563] outline-none flex-1"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {THREADS.map((thread) => (
            <button
              key={thread.id}
              onClick={() => { setActiveThread(thread.id); setShowPanel(true) }}
              className={[
                "w-full px-3 py-3 cursor-pointer border-b border-white/3 relative text-left transition-colors",
                activeThread === thread.id
                  ? "bg-[#00D2AA]/6 border-l-2 border-l-[#00D2AA]"
                  : "hover:bg-white/3",
              ].join(" ")}
            >
              <div className="flex items-start gap-2">
                <div className="relative shrink-0">
                  <div className={`w-9 h-9 rounded-full bg-linear-to-br ${AVATAR_COLORS[thread.avatar] ?? "from-[#00D2AA]/40 to-[#065F46]/60"} flex items-center justify-center text-xs font-semibold text-[#EFF6FF]`}>
                    {thread.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0C1018] flex items-center justify-center">
                    <SourceBadgeIcon source={thread.source} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-[#EFF6FF] truncate">{thread.name}</span>
                    <span className="text-[10px] text-[#4B5563] shrink-0">{thread.time}</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">{thread.preview}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full mt-1 inline-block ${stageBadgeColor(thread.stage)}`}>
                    {thread.status}
                  </span>
                </div>
                {thread.unread && (
                  <div className="w-2 h-2 rounded-full bg-[#00D2AA] shrink-0 mt-1" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className={`flex-1 flex flex-col min-w-0 ${showPanel ? "flex" : "hidden"} md:flex`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-[#94A3B8] mr-1"
              onClick={() => setShowPanel(false)}
            >
              ←
            </button>
            <div className={`w-8 h-8 rounded-full bg-linear-to-br ${AVATAR_COLORS[THREADS[activeThread]?.avatar ?? "MG"] ?? "from-[#00D2AA]/40 to-[#065F46]/60"} flex items-center justify-center text-xs font-semibold text-[#EFF6FF]`}>
              {THREADS[activeThread]?.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#EFF6FF]">{THREADS[activeThread]?.name}</p>
              <p className={`text-[10px] px-1.5 py-0.5 rounded-full inline-block ${stageBadgeColor(THREADS[activeThread]?.stage ?? "nuevo")}`}>
                {THREADS[activeThread]?.status}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {[{ icon: Phone, label: "llamar" }, { icon: MoreHorizontal, label: "más" }].map(({ icon: Icon, label }) => (
              <button key={label} className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center hover:bg-white/5 transition-colors" aria-label={label}>
                <Icon size={14} className="text-[#94A3B8]" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeThread}
              className="flex flex-col gap-3"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {messages.map((msg, i) => {
                if (msg.role === "system") {
                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      custom={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="mx-auto"
                    >
                      <div className="bg-[#00D2AA]/6 border border-[#00D2AA]/15 rounded-full px-4 py-1.5 flex items-center gap-2 text-[10px] text-[#00D2AA]">
                        <CheckCircle2 size={10} />
                        {msg.text}
                      </div>
                    </motion.div>
                  )
                }
                if (msg.role === "user") {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="ml-auto max-w-[70%]"
                    >
                      <div className="bg-white/8 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-[#EFF6FF]">
                        {msg.text}
                      </div>
                      {msg.time && <p className="text-[10px] text-[#4B5563] text-right mt-1">{msg.time}</p>}
                    </motion.div>
                  )
                }
                // AI
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex gap-2.5 max-w-[82%]"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#00D2AA]/15 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={13} className="text-[#00D2AA]" />
                    </div>
                    <div>
                      <div className="bg-[#0F1720] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#EFF6FF]">
                        {msg.text}
                        {msg.hasPayment && (
                          <div className="bg-[#06080B] border border-white/10 rounded-xl p-3 mt-2 flex items-center gap-3 w-full max-w-60">
                            <div className="w-8 h-8 rounded-lg bg-[#00D2AA]/15 flex items-center justify-center shrink-0">
                              <CreditCard size={16} className="text-[#00D2AA]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[#EFF6FF]">Pagar depósito</p>
                              <p className="text-[10px] text-[#4B5563]">Stripe Health · $75</p>
                            </div>
                            <ArrowRight size={14} className="text-[#00D2AA]" />
                          </div>
                        )}
                      </div>
                      {msg.latency && (
                        <div className="flex items-center gap-1 text-[10px] text-[#4B5563] mt-1">
                          <Zap size={9} />
                          <span>Respondido en {msg.latency}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Reply bar */}
        <div className="border-t border-white/5 px-3 pb-3 pt-2 shrink-0">
          <div className="bg-[#0F1720] border border-white/8 rounded-xl flex items-center gap-3 px-4 py-3">
            <input
              readOnly
              placeholder="El agente AI responde automáticamente..."
              className="bg-transparent text-sm text-[#4B5563] flex-1 outline-none cursor-not-allowed"
            />
            <div className="flex items-center gap-2">
              <span className="bg-[#00D2AA]/8 border border-[#00D2AA]/15 text-[#00D2AA] text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                <Bot size={9} />
                Auto
              </span>
              <Paperclip size={15} className="text-[#4B5563]" />
              <Smile size={15} className="text-[#4B5563]" />
              <Send size={15} className="text-[#4B5563]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ACTIVITY VIEW ─────────────────────────────────────��──��───────────────────
function ActivityView() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-[#EFF6FF]">Feed de Actividad en Tiempo Real</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#00D2AA]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs text-[#00D2AA]">En vivo</span>
          </div>
          <span className="text-xs text-[#4B5563]">Hoy, 12 eventos</span>
        </div>
      </div>

      {/* Activity list */}
      <div className="space-y-1 max-h-105 overflow-y-auto pr-1">
        {ACTIVITY_EVENTS.map((event, i) => {
          const Icon = event.icon
          const isLast = i === ACTIVITY_EVENTS.length - 1
          const rowClass = event.type === "success"
            ? "border-l border-l-[#00D2AA]/30 bg-[#00D2AA]/3"
            : event.type === "alert"
            ? "border-l border-l-[#EF4444]/30 bg-[#EF4444]/3"
            : event.type === "revenue"
            ? "border-l border-l-[#F59E0B]/30 bg-[#F59E0B]/3"
            : ""

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.06, ease: EASE }}
              className={`flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/3 transition-colors group cursor-default ${rowClass}`}
            >
              {/* Icon + line */}
              <div className="flex flex-col items-center gap-0 shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center border"
                  style={{
                    backgroundColor: `${event.color}1F`,
                    borderColor: `${event.color}33`,
                  }}
                >
                  <Icon size={14} style={{ color: event.color }} />
                </div>
                {!isLast && <div className="w-px flex-1 bg-white/5 mt-1" style={{ height: "12px" }} />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[#EFF6FF] truncate">{event.event}</span>
                  <span className="text-xs text-[#4B5563] shrink-0">{event.time}</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{event.detail}</p>
              </div>

              <MoreHorizontal size={14} className="text-[#4B5563] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            </motion.div>
          )
        })}
      </div>

      {/* Summary bar */}
      <div className="border-t border-white/5 pt-4 mt-4 grid grid-cols-4 gap-4">
        {[
          { value: "12", label: "Acciones de IA hoy", color: "#00D2AA" },
          { value: "$4,290", label: "En pipeline activo", color: "#00D2AA" },
          { value: "1", label: "No-show prevenido", color: "#F59E0B" },
          { value: "0", label: "Leads sin responder", color: "#00D2AA" },
        ].map(({ value, label, color }) => (
          <div key={label} className="text-center">
            <p className="text-lg font-bold" style={{ color }}>{value}</p>
            <p className="text-[10px] text-[#4B5563] mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CRMDemoSection() {
  const [activeTab, setActiveTab] = useState("pipeline")
  const [leads, setLeads] = useState<Lead[]>(INITIAL_PIPELINE_LEADS)
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [typingId, setTypingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ title: string; sub: string } | null>(null)
  const [demoMode, setDemoMode] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" })

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  // Auto-demo on viewport entry
  useEffect(() => {
    if (!isInView || demoMode) return
    const t0 = setTimeout(() => {
      setDemoMode(true)
      setHighlightedId("L001")
    }, 800)

    const t1 = setTimeout(() => setTypingId("L001"), 1400)

    const t2 = setTimeout(() => {
      setTypingId(null)
      setLeads((prev) =>
        prev.map((l) => (l.id === "L001" ? { ...l, stage: "calificado" } : l))
      )
    }, 2400)

    const t3 = setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === "L001" ? { ...l, deposit: true, depositAmount: 75 } : l
        )
      )
    }, 3200)

    const t4 = setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === "L001" ? { ...l, stage: "agendado", appointment: "Sáb 24 Feb · 11:00 AM" } : l))
      )
    }, 4000)

    const t5 = setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === "L001"
            ? { ...l, stage: "depositado", tags: [...l.tags, "Confirmada"] }
            : l
        )
      )
    }, 4800)

    const t6 = setTimeout(() => {
      setHighlightedId(null)
      setToast({
        title: "✓ Nueva cita confirmada",
        sub: "María González · Sáb 24 Feb 11AM · $75 depósito cobrado",
      })
    }, 5600)

    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6)
    }
  }, [isInView, demoMode])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.12em] text-[#00D2AA] font-medium text-center"
      >
        The CRM that works on its own
      </motion.p>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif italic text-center mt-3 max-w-2xl mx-auto text-balance leading-[1.06] tracking-[-0.02em] text-[#EFF6FF]"
        style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
      >
        See exactly what the agent does
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-[#94A3B8] text-center mt-4 text-base max-w-xl mx-auto"
      >
        From the first DM to the collected deposit — everything visible, everything automatic, everything in your CRM.
      </motion.p>

      {/* Flow diagram */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <div className="flex items-center justify-center gap-0 overflow-x-auto pb-2">
          {FLOW_NODES.map((node, i) => {
            const Icon = node.icon
            return (
              <div key={i} className="flex items-center shrink-0">
                <div className="bg-[#0C1018] border border-white/8 rounded-xl px-4 py-3 text-center flex flex-col items-center gap-1 min-w-25">
                  <Icon size={12} className="text-[#00D2AA]" />
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wide whitespace-nowrap">{node.label}</span>
                </div>
                {i < FLOW_NODES.length - 1 && (
                  <div className="flex items-center px-1">
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                      <motion.path
                        d="M0 8 L26 8"
                        stroke="#00D2AA"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 + 0.4, ease: EASE }}
                      />
                      <motion.path
                        d="M22 4 L28 8 L22 12"
                        stroke="#00D2AA"
                        strokeWidth="1.5"
                        opacity="0.5"
                        fill="none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.15 + 0.9 }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-[10px] text-[#4B5563] text-center mt-3">
          Todo esto ocurre en menos de 10 minutos · Sin intervención humana
        </p>
      </motion.div>

      {/* Main CRM frame */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="bg-[#0C1018] border border-white/8 rounded-2xl overflow-hidden mt-8"
      >
        {/* Top bar */}
        <div className="bg-[#131B24] border-b border-white/5 px-4 py-3 flex items-center gap-4">
          {/* Window dots */}
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00D2AA]/60" />
          </div>

          {/* Tab switcher */}
          <div className="flex-1 flex justify-center">
            <div className="bg-[#0C1018] border border-white/5 rounded-xl p-1 flex gap-1">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg",
                      isActive ? "text-[#EFF6FF]" : "text-[#4B5563] hover:text-[#94A3B8]",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#131B24] border border-white/10 rounded-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon size={14} className="relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <span className="text-xs text-[#4B5563] font-mono shrink-0">receptor.ai CRM</span>
        </div>

        {/* Tab content */}
        <div className="min-h-130">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="p-4 lg:p-5"
            >
              {activeTab === "pipeline" && (
                <PipelineView
                  leads={leads}
                  highlightedId={highlightedId}
                  typingId={typingId}
                />
              )}
              {activeTab === "inbox" && <InboxView />}
              {activeTab === "activity" && <ActivityView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-6 right-6 z-300 bg-[#0C1018] border border-[#00D2AA]/25 rounded-xl px-5 py-4 max-w-[320px] shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00D2AA]/15 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-[#00D2AA]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#EFF6FF]">{toast.title}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">{toast.sub}</p>
              </div>
            </div>
            <motion.div
              className="h-0.5 bg-[#00D2AA] rounded-full mt-3"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3.5, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
