"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, MessageSquare, Zap, CheckCircle2, ArrowRight, Calendar, User, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const CHAT_STEPS = [
  {
    id: 1,
    type: "bot",
    message: "Hey! I'm Mane's AI assistant. Are you thinking about your first tattoo or adding to your collection?",
    delay: 0,
  },
  {
    id: 2,
    type: "user",
    message: "First tattoo. I want a portrait of my dog.",
    delay: 1800,
  },
  {
    id: 3,
    type: "bot",
    message: "Love that! Portrait realism is Victor's specialty. What size are you thinking — and do you have a photo of your dog?",
    delay: 3200,
  },
  {
    id: 4,
    type: "user",
    message: "Maybe forearm size. Yes I have photos.",
    delay: 5000,
  },
  {
    id: 5,
    type: "bot",
    message: "Perfect. Forearm portraits typically run $400–$650 depending on detail. Victor has availability next week. Want me to book a free 30-min consultation?",
    delay: 6800,
  },
  {
    id: 6,
    type: "user",
    message: "Yes, Thursday works!",
    delay: 8400,
  },
  {
    id: 7,
    type: "bot",
    message: "Done! ✓ Consultation booked for Thursday. You'll receive a confirmation + design brief to fill out. Victor will review your photo before the session.",
    delay: 9800,
    isBooking: true,
  },
]

const CRM_STATES = [
  {
    triggerAtStep: 1,
    stage: "New Lead",
    stageColor: "#3B82F6",
    score: 0,
    scoreLabel: "Qualifying...",
    scoreColor: "#A1A1AA",
    status: "Chatting",
    statusColor: "#F59E0B",
    actions: [] as string[],
  },
  {
    triggerAtStep: 2,
    stage: "New Lead",
    stageColor: "#3B82F6",
    score: 42,
    scoreLabel: "Building...",
    scoreColor: "#F59E0B",
    status: "Engaged",
    statusColor: "#3B82F6",
    actions: ["Service: Portrait Realism"],
  },
  {
    triggerAtStep: 4,
    stage: "Interested",
    stageColor: "#F59E0B",
    score: 71,
    scoreLabel: "High intent",
    scoreColor: "#F59E0B",
    status: "Qualified",
    statusColor: "#00D084",
    actions: ["Service: Portrait Realism", "Size: Forearm", "Has reference photo ✓"],
  },
  {
    triggerAtStep: 6,
    stage: "Booking",
    stageColor: "#8B5CF6",
    score: 94,
    scoreLabel: "Hot lead",
    scoreColor: "#00D084",
    status: "Booking",
    statusColor: "#8B5CF6",
    actions: ["Service: Portrait Realism", "Size: Forearm", "Has reference photo ✓", "Budget: $400–$650 ✓"],
  },
  {
    triggerAtStep: 7,
    stage: "Won ✓",
    stageColor: "#00D084",
    score: 98,
    scoreLabel: "Converted",
    scoreColor: "#00D084",
    status: "Booked",
    statusColor: "#00D084",
    actions: ["Service: Portrait Realism", "Size: Forearm", "Has reference photo ✓", "Budget: $400–$650 ✓", "Thursday consultation booked"],
  },
]

export function LiveDemoShowcase() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentCrmState, setCurrentCrmState] = useState(CRM_STATES[0])
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const startDemo = () => {
    setVisibleMessages([])
    setCurrentCrmState(CRM_STATES[0])
    setIsComplete(false)
    setIsRunning(true)
  }

  useEffect(() => {
    if (!isRunning) return

    const timeouts: NodeJS.Timeout[] = []

    CHAT_STEPS.forEach((step, index) => {
      if (step.type === "bot" && index > 0) {
        timeouts.push(setTimeout(() => setIsTyping(true), step.delay - 600))
      }

      timeouts.push(
        setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages((prev) => [...prev, step.id])

          const crmState = CRM_STATES.find((s) => s.triggerAtStep === step.id)
          if (crmState) setCurrentCrmState(crmState)

          if (index === CHAT_STEPS.length - 1) {
            setIsComplete(true)
            setIsRunning(false)
          }
        }, step.delay),
      )
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isRunning])

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      {/* Label superior */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
          <span className="text-xs font-medium text-[#00D084]">PRODUCTION — victormanetattoo.com</span>
        </div>
        <span className="text-xs text-[#A1A1AA]">Cliente real · Sistema activo · No es una demo fabricada</span>
      </div>

      {/* Contenedor principal 2 zonas */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 rounded-2xl border border-[#27272A] overflow-hidden bg-[#111113]">

        {/* ZONA IZQUIERDA: Browser mockup con iframe */}
        <div className="flex flex-col border-r border-[#27272A]">
          {/* Barra del browser */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1A1E] border-b border-[#27272A]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/70" />
              <div className="w-3 h-3 rounded-full bg-[#00D084]/70" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-[#0A0A0B] rounded-md px-3 py-1.5 border border-[#27272A]">
              <div className="w-3 h-3 text-[#00D084]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-xs text-[#A1A1AA] font-mono">victormanetattoo.protolylat.com</span>
              <div className="ml-auto flex items-center gap-1">
                <span className="text-xs text-[#00D084]">✓</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#00D084]/10 border border-[#00D084]/20">
              <Zap className="w-3 h-3 text-[#00D084]" />
              <span className="text-xs text-[#00D084] font-medium">Autonoma</span>
            </div>
          </div>

          {/* iframe del sitio real */}
          <div className="relative" style={{ height: "480px" }}>
            <iframe
              src="https://victormanetattoo.protolylat.com/"
              className="w-full h-full border-0"
              style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "118%", height: "118%" }}
              title="Victor Mane Tattoo Studio — powered by Autonoma AI"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111113] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ZONA DERECHA: CRM panel reactivo */}
        <div className="flex flex-col">
          {/* Header del panel */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1E] border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#00D084]" />
              <span className="text-sm font-medium text-[#FAFAFA]">CRM / Sales Pipeline</span>
            </div>
            <Badge className="bg-[#00D084]/10 text-[#00D084] border border-[#00D084]/20 text-xs">LIVE</Badge>
          </div>

          {/* Lead card */}
          <div className="p-4 border-b border-[#27272A]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center">
                <User className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#FAFAFA]">Nuevo visitante</p>
                <p className="text-xs text-[#A1A1AA]">victormanetattoo.com · Chat widget</p>
              </div>
            </div>

            {/* Stage + Score */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-[#0A0A0B] rounded-lg p-2.5 border border-[#27272A]">
                <p className="text-xs text-[#A1A1AA] mb-1">Etapa</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentCrmState.stage}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-sm font-semibold"
                    style={{ color: currentCrmState.stageColor }}
                  >
                    {currentCrmState.stage}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="bg-[#0A0A0B] rounded-lg p-2.5 border border-[#27272A]">
                <p className="text-xs text-[#A1A1AA] mb-1">Score AI</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCrmState.score}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-sm font-semibold" style={{ color: currentCrmState.scoreColor }}>
                      {currentCrmState.score > 0 ? currentCrmState.score : "—"}
                    </span>
                    <span className="text-xs" style={{ color: currentCrmState.scoreColor }}>
                      {currentCrmState.scoreLabel}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Score bar */}
            <div className="w-full bg-[#27272A] rounded-full h-1.5 mb-3 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: currentCrmState.scoreColor }}
                animate={{ width: `${currentCrmState.score}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            {/* Captured data tags */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-[#A1A1AA] font-medium">Datos capturados:</p>
              <AnimatePresence>
                {currentCrmState.actions.map((action, i) => (
                  <motion.div
                    key={action}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-xs text-[#FAFAFA]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#00D084] flex-shrink-0" />
                    {action}
                  </motion.div>
                ))}
              </AnimatePresence>
              {currentCrmState.actions.length === 0 && (
                <p className="text-xs text-[#A1A1AA] italic">Esperando respuestas...</p>
              )}
            </div>
          </div>

          {/* Chat preview */}
          <div className="flex-1 p-4 flex flex-col gap-2 overflow-hidden" style={{ maxHeight: "220px" }}>
            <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wide mb-1">Conversación</p>
            <div className="flex flex-col gap-2 overflow-y-auto">
              <AnimatePresence>
                {visibleMessages.slice(-4).map((id) => {
                  const step = CHAT_STEPS.find((s) => s.id === id)
                  if (!step) return null
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${step.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-xs leading-relaxed ${
                          step.type === "user"
                            ? "bg-[#27272A] text-[#FAFAFA]"
                            : (step as any).isBooking
                              ? "bg-[#00D084]/15 border border-[#00D084]/30 text-[#FAFAFA]"
                              : "bg-[#1A1A1E] border border-[#27272A] text-[#FAFAFA]"
                        }`}
                      >
                        {step.type === "bot" && (
                          <span className="text-[#00D084] font-medium mr-1 text-[10px]">AI</span>
                        )}
                        {step.message}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-[#1A1A1E] border border-[#27272A] rounded-lg px-3 py-2 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="p-4 border-t border-[#27272A]">
            {!isRunning && !isComplete && (
              <button
                onClick={startDemo}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00D084] hover:bg-[#00D084]/90 text-black font-medium text-sm transition-colors"
              >
                <Zap className="w-4 h-4" />
                Ver demo en tiempo real
              </button>
            )}
            {isRunning && (
              <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#111113] border border-[#27272A] text-[#A1A1AA] text-sm">
                <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                AI calificando lead...
              </div>
            )}
            {isComplete && (
              <div className="flex flex-col gap-2">
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00D084]/10 border border-[#00D084]/30 text-[#00D084] text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Lead convertido · Consulta agendada
                </div>
                <button
                  onClick={startDemo}
                  className="w-full text-xs text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors py-1"
                >
                  Ver de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { icon: Calendar, value: "< 10 min", label: "Setup del AI sobre tu sitio" },
          { icon: Star, value: "100%", label: "Trained on Victor's real services" },
          { icon: Zap, value: "24/7", label: "Calificando mientras duermes" },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-[#111113] border border-[#27272A]">
            <Icon className="w-4 h-4 text-[#00D084] flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#FAFAFA]">{value}</p>
              <p className="text-xs text-[#A1A1AA]">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
