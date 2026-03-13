"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, FileText, Calendar, LinkIcon, Linkedin, Copy, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFormContext } from "../form-context"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

// Simple confetti effect
function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([])

  useEffect(() => {
    const colors = ["#3b82f6", "#06b6d4", "#14b8a6", "#8b5cf6", "#d946ef"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1 }}
          animate={{ y: "100vh", opacity: 0 }}
          transition={{ duration: 3, delay: p.delay, ease: "linear" }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function StepThankYou() {
  const { state, dispatch } = useFormContext()
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].onboarding.stepThankYou

  const [showConfetti, setShowConfetti] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const shareUrl = "https://autonoma.ai.protolylat.com/"
  const shareText =
    "I just discovered Autonoma.ai - AI-powered lead automation that books meetings on autopilot. Check it out!"

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=600")
  }

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=600")
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL")
    }
  }

  // Iconos para la lista de inbox
  const inboxIcons = [FileText, FileText, Calendar, LinkIcon]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[500px] px-6 text-center relative"
    >
      {showConfetti && <Confetti />}

      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-8"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        {t.title}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-muted-foreground mb-8"
      >
        {t.emailSentTo} <span className="text-cyan-400">{state.data.email}</span>
      </motion.p>

      {/* Next steps card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 mb-8"
      >
        <h3 className="font-semibold mb-4">{t.inboxTitle}</h3>
        <ul className="space-y-3 text-left">
          {t.inboxItems.map((item: string, idx: number) => {
            const Icon = inboxIcons[idx]
            return (
              <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{item}</span>
              </li>
            )
          })}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Button className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-black font-semibold">
          <Calendar className="w-4 h-4 mr-2" />
          {t.scheduleBtn}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <p className="text-sm text-muted-foreground mb-4">{t.shareTitle}</p>
        <div className="flex justify-center gap-3">
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 bg-transparent hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50 transition-colors"
            onClick={handleShareLinkedIn}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 bg-transparent hover:bg-white/10 hover:border-white/30 transition-colors"
            onClick={handleShareX}
          >
            <XIcon className="w-4 h-4 mr-2" />X
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 bg-transparent hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors"
            onClick={handleCopyUrl}
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 mr-2 text-green-400" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                {t.copyUrl}
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}