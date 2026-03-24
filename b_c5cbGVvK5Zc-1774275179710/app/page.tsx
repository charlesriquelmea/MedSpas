"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion"
import {
  Zap, MessageSquare, Database, CreditCard, GitMerge,
  PhoneCall, ShieldCheck, Lock, FileText, BarChart2,
  Star, ArrowRight, Check, ChevronDown, Menu, X,
  Mic, Bot, ExternalLink, Phone,
  CheckCircle2
} from "lucide-react"
import CRMDemoSection from "@/components/CRMDemoSection"
import { landingContent, type Language } from "@/data/landing-content"
import HipaaSection from "@/components/HipaaSection"

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const fadeUpStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

const slideRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

// ─── ICON MAP for how.steps ──────────────────────────────────────────────────
const HOW_ICONS = [Zap, MessageSquare, Database, CreditCard, GitMerge, PhoneCall]

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (isInView) motionValue.set(target)
  }, [isInView, motionValue, target])

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix
    })
  }, [spring, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Page() {
  // Language
  const [lang, setLang] = useState<Language>("es")
  const t = landingContent[lang]

  // Navbar
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  // Form data for the modal
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
  })

  // Typewriter
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState("")

  // FAQ
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // TOTAL_STEPS: step 0 = welcome, steps 1–4 = form fields, step 5 = success
  const TOTAL_STEPS = 6

  const isLastStep = step === TOTAL_STEPS - 1
  const isWelcome = step === 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const PHRASES = t.hero.phrases

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, 65)
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      }, 35)
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % PHRASES.length)
      }, 400)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex, PHRASES])

  // Reset typewriter when language changes
  useEffect(() => {
    setDisplayText("")
    setCharIndex(0)
    setIsDeleting(false)
    setPhraseIndex(0)
  }, [lang])

  // Modal navigation
  const goNext = useCallback(() => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }, [TOTAL_STEPS])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalOpen) return
      if (e.key === "Escape") setModalOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [modalOpen])

  // ─── RENDER MODAL STEP ────────────────────────────────────────────────────
  const renderModalStep = (s: number) => {
    // step 0: Welcome screen
    if (s === 0) {
      return (
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00D2AA]/15 border border-[#00D2AA]/30 flex items-center justify-center mx-auto">
            <Zap size={28} className="text-[#00D2AA]" />
          </div>
          <p className="font-serif italic text-2xl text-[#EFF6FF] leading-snug">
            {t.modal?.welcome?.title ?? "¡Hablemos de tu negocio!"}
          </p>
          <p className="text-sm text-[#94A3B8] mt-1">
            {t.modal?.welcome?.sub ?? "Solo 4 preguntas rápidas para empezar."}
          </p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,210,170,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={goNext}
            className="mt-4 w-full bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-xl py-3.5 cursor-pointer"
          >
            {t.modal?.welcome?.cta ?? "Comenzar →"}
          </motion.button>
        </div>
      )
    }

    // step 5: Success screen
    if (s === TOTAL_STEPS - 1) {
      return (
        <div className="flex flex-col items-center text-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#00D2AA]/15 border border-[#00D2AA]/30 flex items-center justify-center mx-auto">
              <Check size={32} className="text-[#00D2AA]" />
            </div>
          </motion.div>
          <p className="font-serif italic text-2xl text-[#EFF6FF] mt-6">
            {t.modal?.success?.title ?? "¡Listo! Nos ponemos en contacto pronto."}
          </p>
          <p className="text-sm text-[#94A3B8] mt-2">
            {t.modal?.success?.sub ?? "Revisaremos tu información y te contactaremos en menos de 24 h."}
          </p>
          <div className="w-full bg-white/2 border border-white/5 rounded-xl p-4 mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-left">
            {formData.name && <><span className="text-[#4B5563]">Nombre</span>   <span className="text-[#EFF6FF] truncate">{formData.name}</span></>}
            {formData.business && <><span className="text-[#4B5563]">Empresa</span>  <span className="text-[#EFF6FF] truncate">{formData.business}</span></>}
            {formData.phone && <><span className="text-[#4B5563]">Teléfono</span> <span className="text-[#EFF6FF] truncate">{formData.phone}</span></>}
            {formData.email && <><span className="text-[#4B5563]">Email</span>    <span className="text-[#EFF6FF] truncate">{formData.email}</span></>}
          </div>
          <button
            onClick={() => { setModalOpen(false); setStep(0) }}
            className="w-full mt-4 border border-white/10 text-[#94A3B8] hover:text-[#EFF6FF] rounded-xl py-3 text-sm transition-colors cursor-pointer"
          >
            {t.modal?.success?.close ?? "Cerrar"}
          </button>
        </div>
      )
    }

    // steps 1–4: form fields
    // Each field has a floating-label style consistent with the dark theme
    const fieldStep = s - 1 // 0-indexed: 0=name, 1=business, 2=phone, 3=email

    /*     const labels = ["Nombre", "Empresa", "Teléfono", "Email"]
        const types  = ["text",   "text",    "tel",      "email"]
        const keys   = ["name",   "business","phone",    "email"] as const
        const hints  = [
          "¿Cómo te llamas?",
          "¿Cuál es el nombre de tu negocio?",
          "¿Cuál es tu número de teléfono?",
          "¿Cuál es tu correo electrónico?",
        ] */
    const fieldKeys = ["name", "business", "phone", "email"] as const
    const key = fieldKeys[fieldStep]
    const field = t.modal.fields[key]

    return (
      <div>
        <p className="text-[#4B5563] text-xs font-mono uppercase tracking-widest mb-1">
          {`0${s} →`}
        </p>
        <p className="font-medium text-lg text-[#EFF6FF] mb-6">{field.hint}</p>
        <div className="relative">
          <input
            key={key}
            type={field.type}
            placeholder={field.label}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            onKeyDown={(e) => { if (e.key === "Enter") goNext() }}
            autoFocus
            className="w-full bg-transparent border-b border-white/10 py-3 text-[#EFF6FF] text-base focus:outline-none focus:border-[#00D2AA]/50 transition-colors placeholder:text-[#4B5563]"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-sans  { font-family: 'DM Sans', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-[#06080B] text-[#EFF6FF] font-sans overflow-x-hidden">

        {/* ── MODAL ── */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-200 bg-[#06080B]/95 backdrop-blur-md flex items-center justify-center sm:p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
            >
              <motion.div
                key="modal-card"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative w-full max-w-lg bg-[#0C1018] sm:border sm:border-white/8 sm:rounded-2xl overflow-hidden h-full sm:h-auto"
              >
                {/* Top bar */}
                <div className="px-6 pt-6 flex items-center gap-3">
                  <span className="text-xs text-[#4B5563] font-mono shrink-0">
                    {`0${step + 1} / 0${TOTAL_STEPS}`}
                  </span>
                  <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#00D2AA] rounded-full"
                      animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="shrink-0 cursor-pointer"
                  >
                    <X size={18} className="text-[#4B5563] hover:text-[#EFF6FF] transition-colors" />
                  </button>
                </div>

                {/* Step content */}
                <div className="min-h-85 px-8 py-8 flex flex-col justify-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
                        center: { opacity: 1, x: 0 },
                        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {renderModalStep(step)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom bar — hidden on welcome and success */}
                {!isLastStep && !isWelcome && (
                  <div className="px-8 pb-8 flex justify-between items-center">
                    <div>
                      {step > 1 && (
                        <button
                          onClick={goPrev}
                          className="text-sm text-[#4B5563] hover:text-[#EFF6FF] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronDown className="rotate-90" size={14} />
                          {t.modal?.back ?? "Volver"}
                        </button>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={async () => {
                        if (step === TOTAL_STEPS - 2) {
                          // Last form step → send email then go to success
                          try {
                            console.log("FormData a enviar:", formData)
                            const res = await fetch("/api/send-email", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(formData),
                            })
                            const data = await res.json()
                            if (data.success) {
                              goNext()
                            } else {
                              console.error("Error enviando email:", data.error)
                              goNext() // still advance to success UI
                            }
                          } catch (err) {
                            console.error("Error general:", err)
                            goNext()
                          }
                        } else {
                          goNext()
                        }
                      }}
                      className="bg-[#00D2AA] text-[#06080B] font-semibold text-sm rounded-lg px-5 py-2.5 cursor-pointer flex items-center gap-2"
                    >
                      {step === TOTAL_STEPS - 2
                        ? (t.modal?.submit ?? "Enviar")
                        : (t.modal?.next ?? "Siguiente")}
                      <ArrowRight size={14} />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 transition-all duration-300 ${scrolled ? "bg-[#06080B]/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
            }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="10" cy="13" r="8" fill="#00D2AA" fillOpacity="0.9" />
              <circle cx="17" cy="13" r="8" fill="#00D2AA" fillOpacity="0.4" />
            </svg>
            <span className="font-semibold text-sm text-[#EFF6FF]">AI Receptionist for Med Spas</span>
          </div>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-7">
            {t.nav.links.map((link, i) => {
              const ids = ["product", "how-it-works", "pricing", "hipaa"]
              return (
                <a
                  key={link}
                  href={`#${ids[i]}`}
                  className="text-sm text-[#94A3B8] hover:text-[#EFF6FF] transition-colors cursor-pointer"
                >
                  {link}
                </a>
              )
            })}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center bg-[#0C1018] border border-white/8 rounded-lg p-0.5 gap-0.5">
              {(["es", "en"] as const).map((l) => (
                <motion.button
                  key={l}
                  onClick={() => setLang(l)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${lang === l ? "text-[#06080B]" : "text-[#4B5563] hover:text-[#94A3B8]"
                    }`}
                >
                  {lang === l && (
                    <motion.span
                      layoutId="lang-pill-desktop"
                      className="absolute inset-0 bg-[#00D2AA] rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="bg-[#00D2AA] text-[#06080B] font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer"
            >
              {t.nav.cta}
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center bg-[#0C1018] border border-white/8 rounded-lg p-0.5 gap-0.5">
              {(["es", "en"] as const).map((l) => (
                <motion.button
                  key={l}
                  onClick={() => setLang(l)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${lang === l ? "text-[#06080B]" : "text-[#4B5563]"
                    }`}
                >
                  {lang === l && (
                    <motion.span
                      layoutId="lang-pill-mobile"
                      className="absolute inset-0 bg-[#00D2AA] rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="cursor-pointer">
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute top-full left-0 right-0 bg-[#0C1018] border-b border-white/5 px-6 py-6 flex flex-col gap-4"
              >
                {t.nav.links.map((link) => (
                  <span key={link} className="text-sm text-[#94A3B8] hover:text-[#EFF6FF] transition-colors cursor-pointer py-1">
                    {link}
                  </span>
                ))}
                <button className="w-full border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#EFF6FF] cursor-pointer text-left">
                  {t.nav.demo}
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setModalOpen(true); setMobileOpen(false) }}
                  className="w-full bg-[#00D2AA] text-[#06080B] font-semibold rounded-lg px-4 py-2.5 text-sm cursor-pointer"
                >
                  {t.nav.cta}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-225 h-140 bg-[#00D2AA]/8 blur-[120px] rounded-full left-1/2 -translate-x-1/2 top-[-15%]" />
            <div className="absolute w-120 h-120 bg-[#7C3AED]/6 blur-[100px] rounded-full right-[-8%] top-[25%]" />
            <div
              className="absolute inset-0 opacity-[0.028]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
              }}
            />
          </div>

          {/* Badge */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
            <div className="rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/22 px-4 py-1.5 flex items-center gap-2 w-fit mx-auto mb-10">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-[#00D2AA] inline-block"
              />
              <span className="text-xs text-[#00D2AA] font-medium tracking-wide">{t.hero.badge}</span>
              <ArrowRight size={12} className="text-[#00D2AA]" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUpStagger} initial="hidden" animate="show" className="w-full">
            <motion.p variants={fadeUp} className="font-serif italic text-[clamp(34px,5.5vw,70px)] leading-[1.05] tracking-[-0.02em] text-[#EFF6FF]">
              {t.hero.line1}
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif italic text-[clamp(34px,5.5vw,70px)] leading-[1.05] tracking-[-0.02em] text-[#EFF6FF]">
              {t.hero.line2}
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif italic text-[clamp(34px,5.5vw,70px)] leading-[1.05] tracking-[-0.02em] flex items-baseline gap-3 justify-center flex-wrap">
              <span className="text-[#00D2AA] min-w-[4ch]">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "steps(1)" }}
                className="inline-block w-0.75 h-[0.8em] bg-[#00D2AA] rounded-sm align-middle ml-1"
              />
            </motion.p>
          </motion.div>

          {/* SVG underline */}
          <motion.svg viewBox="0 0 400 8" className="w-full max-w-95 mx-auto mt-1" preserveAspectRatio="none">
            <motion.path
              d="M 0 4 Q 200 8 400 4"
              stroke="#00D2AA" strokeWidth="2.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
            />
          </motion.svg>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="text-[clamp(15px,1.8vw,18px)] text-[#94A3B8] max-w-150 mx-auto leading-[1.75] text-center mt-8"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA cluster */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.6 }}
            className="flex gap-3 justify-center mt-10 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,210,170,0.25)" }}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              onClick={() => setModalOpen(true)}
              className="bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-lg px-7 py-3.5 cursor-pointer"
            >
              {t.hero.primaryCta}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="border border-white/10 hover:bg-white/5 text-[#EFF6FF] font-medium text-base rounded-lg px-7 py-3.5 cursor-pointer transition-colors"
            >
              {t.hero.secondaryCta}
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUpStagger}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.75 }}
            className="flex gap-6 flex-wrap justify-center mt-8"
          >
            {[
              { icon: <ShieldCheck size={14} className="text-[#00D2AA]" />, text: t.hero.badges[0] },
              { icon: <Lock size={14} />, text: t.hero.badges[1] },
              { icon: <FileText size={14} />, text: t.hero.badges[2] },
              { icon: <Zap size={14} className="text-[#00D2AA]" />, text: t.hero.badges[3] },
            ].map((b) => (
              <motion.div key={b.text} variants={fadeUp} className="flex items-center gap-2 text-xs text-[#4B5563]">
                {b.icon}
                {b.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Conversation card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.9 }}
            className="max-w-140 w-full mx-auto mt-16"
          >
            <div className="bg-[#0C1018] border border-white/8 rounded-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="bg-[#131B24] border-b border-white/5 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D2AA]/70" />
                </div>
                <span className="flex-1 text-center text-xs text-[#4B5563]">{t.hero.chatHeader}</span>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-[#00D2AA] inline-block"
                  />
                  <span className="text-xs text-[#00D2AA]">{t.hero.online}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4">
                {t.hero.msgs.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.5, duration: 0.4 }}
                  >
                    {msg.side === "user" ? (
                      <div className="ml-auto max-w-[75%] bg-white/8 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-[#EFF6FF]">
                        {msg.text}
                        {"time" in msg && <p className="text-[10px] text-[#4B5563] text-right mt-1">{msg.time}</p>}
                      </div>
                    ) : (
                      <div className="flex gap-2 max-w-[82%]">
                        <div className="w-7 h-7 rounded-full bg-[#00D2AA]/15 flex items-center justify-center shrink-0">
                          <Bot size={14} className="text-[#00D2AA]" />
                        </div>
                        <div className="bg-[#00D2AA]/10 border border-[#00D2AA]/15 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#EFF6FF]">
                          {msg.text}
                          {"payment" in msg && msg.payment && (
                            <div className="bg-[#06080B] border border-white/10 rounded-lg px-3 py-2 text-xs flex items-center gap-2 mt-2 w-fit">
                              <CreditCard size={12} className="text-[#00D2AA]" />
                              <span>{t.hero.paymentLabel}</span>
                              <ExternalLink size={10} className="text-[#4B5563]" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Status */}
              <p className="text-[10px] text-[#00D2AA]/60 text-center pb-4">{t.hero.statusBar}</p>
            </div>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-[#0C1018] border-y border-white/5 py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              /* className="grid grid-cols-2 lg:grid-cols-4 gap-6" */ //for 4 cards (stats in langind content)
              className="grid grid-col-2 lg:grid-cols-3 gap-6"
            >
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-[#0C1018] border border-white/5 rounded-xl p-8 text-center"
                >
                  <div className="font-serif italic text-5xl text-[#00D2AA]">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="text-sm text-[#94A3B8] mt-2">{stat.label}</p>
                  <p className="text-xs text-[#4B5563] mt-1">{stat.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="product" className="py-24 px-6 bg-[#0C1018]/40">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
              <h2 className="font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.03em] text-[#EFF6FF]">{t.how.title}</h2>
              <p className="text-[#94A3B8] mt-3">{t.how.sub}</p>
            </motion.div>

            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {t.how.steps.map((step, i) => {
                const Icon = HOW_ICONS[i]
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-6 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full border border-[#00D2AA]/30 text-[#00D2AA] text-sm font-semibold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <span className="bg-[#00D2AA]/10 text-[#00D2AA] text-xs px-2 py-0.5 rounded-full font-medium">{step.time}</span>
                    </div>
                    <div className="mb-3">
                      <Icon size={20} className="text-[#00D2AA] mb-2" />
                      <h3 className="font-semibold text-[#EFF6FF] text-base">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-[1.65] mb-4">{step.desc}</p>
                    <span className="bg-white/3 border border-white/8 text-[#4B5563] text-[11px] px-2 py-0.5 rounded-md font-mono">{step.tech}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── CRM DEMO SECTION ── */}
        <section id="how-it-works">
          <CRMDemoSection lang={lang} />
        </section>

        {/* ── BENTO GRID ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
              <h2 className="font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.03em] text-[#EFF6FF]">{t.bento.title}</h2>
              <p className="text-[#94A3B8] mt-3">{t.bento.sub}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Card A */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:col-span-7 bg-linear-to-br from-[#0C1018] to-[#0D1520] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <div className="flex gap-2 mb-6">
                  {[Mic, MessageSquare, Phone].map((Icon, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/20 flex items-center justify-center ${i > 0 ? "-ml-3" : ""}`}>
                      <Icon size={16} className="text-[#00D2AA]" />
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-[#EFF6FF] mb-2">{t.bento.cardA.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-[1.65] mb-5">{t.bento.cardA.body}</p>
                <div className="flex flex-wrap gap-2">
                  {t.bento.cardA.badges.map((b) => (
                    <span key={b} className="rounded-full bg-[#00D2AA]/10 text-[#00D2AA] text-xs px-3 py-1">{b}</span>
                  ))}
                </div>
              </motion.div>

              {/* Card B */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:col-span-5 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <Database size={24} className="text-[#00D2AA] mb-4" />
                <h3 className="text-lg font-semibold text-[#EFF6FF] mb-2">{t.bento.cardB.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-[1.65]">{t.bento.cardB.body}</p>
              </motion.div>

              {/* Card C */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:col-span-5 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <GitMerge size={24} className="text-[#00D2AA] mb-4" />
                <h3 className="text-lg font-semibold text-[#EFF6FF] mb-2">{t.bento.cardC.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-[1.65]">{t.bento.cardC.body}</p>
              </motion.div>

              {/* Bonus card */}
              {[{ ...t.bento.bonus1, icon: Star }].map((bonus, i) => {
                const Icon = bonus.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="lg:col-span-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 rounded-xl p-6 transition-colors"
                  >
                    <span className="bg-[#F59E0B]/15 text-[#F59E0B] text-xs px-2 py-0.5 rounded-full font-medium">{bonus.badge}</span>
                    <Icon size={20} className="text-[#F59E0B] mt-4 mb-2" />
                    <h3 className="font-semibold text-[#EFF6FF] mb-1">{bonus.title}</h3>
                    <p className="text-xs text-[#F59E0B] font-medium mb-2">{bonus.value}</p>
                    <p className="text-sm text-[#94A3B8]">{bonus.desc}</p>
                  </motion.div>
                )
              })}

              {/* Setup */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-6 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/20 flex items-center justify-center">
                    <Zap size={14} className="text-[#00D2AA]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#00D2AA] font-medium">{t.bento.setupTitle}</span>
                </div>
                <ul className="space-y-2.5">
                  {t.bento.setupItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ArrowRight size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
                    </li>
                  ))}
                  {t.bento.resumenSetUp && (
                    <li className="flex flex-col gap-2 bg-[#0C1018] border border-white/10 rounded-lg p-4">
                      <span className="text-sm font-semibold text-[#00D2AA]">{t.bento.resumenSetUp.title}</span>
                      <div className="flex flex-col gap-1 mt-2">
                        {t.bento.resumenSetUp.items.map((line, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-[#94A3B8] leading-relaxed">
                            <ArrowRight size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                            <span>{line.replace(/^-/, "").trim()}</span>
                          </div>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </motion.div>

              {/* Includes */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-6 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/20 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-[#00D2AA]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#00D2AA] font-medium">{t.bento.includesTitle}</span>
                </div>
                <ul className="space-y-2.5">
                  {t.bento.includesItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
                    </li>
                  ))}
                  {t.bento.resumenPlan && (
                    <li className="flex flex-col gap-2 bg-[#0C1018] border border-white/10 rounded-lg p-4">
                      <span className="text-sm font-semibold text-[#00D2AA]">{t.bento.resumenPlan.title}</span>
                      <div className="flex flex-col gap-1 mt-2">
                        {t.bento.resumenPlan.items.map((line, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-[#94A3B8] leading-relaxed">
                            <ArrowRight size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                            <span>{line.replace(/^-/, "").trim()}</span>
                          </div>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 px-6 bg-[#0C1018]/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Left: anchor costs */}
              <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
                <h2 className="font-bold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] text-[#EFF6FF] mb-8">{t.pricing.leftTitle}</h2>
                <div className="space-y-4">
                  {t.pricing.costs.map((c, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <X size={16} className="text-[#EF4444]/60 shrink-0" />
                        <span className="text-sm text-[#94A3B8] line-through decoration-[#EF4444]/50">{c.label}</span>
                      </div>
                      <span className="text-sm text-[#EF4444]/60 line-through font-medium">{c.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-[#94A3B8] font-medium">{t.pricing.totalLabel}</span>
                    <span className="text-base text-[#EF4444] font-semibold">{t.pricing.totalValue}</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: offer card */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
                <div className="relative bg-[#0C1018] border border-white/8 rounded-2xl p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2AA]/6 blur-[80px] rounded-full pointer-events-none" />

                  <span className="bg-[#00D2AA]/10 text-[#00D2AA] rounded-full px-3 py-1 text-xs uppercase tracking-widest">{t.pricing.badge}</span>

                  <div className="mt-6 flex flex-col mb-2">
                    <span>{t.pricing.limit}</span>
                    <span className="text-[#4B5563] text-sm">{t.pricing.setupLabel}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif italic text-6xl text-[#EFF6FF]">{t.pricing.setupPrice}</span>
                      <span className="text-[#4B5563] text-sm">{t.pricing.setupSub}</span>
                    </div>
                  </div>

                  <div className="relative h-px bg-white/5 my-6" />

                  <div className="mb-6">
                    <span className="text-[#4B5563] text-sm">{t.pricing.opLabel}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif italic text-5xl text-[#00D2AA]">{t.pricing.opPrice}</span>
                      <span className="text-[#4B5563] text-sm">{t.pricing.opSub}</span>
                    </div>
                  </div>

                  <div className="relative h-px bg-white/5 my-6">
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-[#4B5563] bg-[#0C1018] px-3">{t.pricing.divider}</span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[#4B5563] text-sm">{t.pricing.retainerLabel}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif italic text-5xl text-[#EFF6FF]">{t.pricing.retainerPrice}</span>
                      <span className="text-[#4B5563] text-sm">{t.pricing.retainerSub}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-6">
                    {t.pricing.checklist.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#94A3B8]">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Scarcity */}
                  <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl p-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#F59E0B] text-sm font-medium">{t.pricing.scarcityTitle}</span>
                      <span className="text-[#4B5563] text-xs">{t.pricing.scarcityTaken}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "20%" }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-full bg-[#F59E0B] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="bg-white/2 border border-white/5 rounded-xl p-4 mt-4 flex gap-3">
                    <ShieldCheck size={20} className="text-[#00D2AA] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#94A3B8]">{t.pricing.guarantee}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(0,210,170,0.28)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-xl py-4 cursor-pointer mt-6"
                  >
                    {t.pricing.cta}
                  </motion.button>
                  <p className="text-center text-xs text-[#4B5563] mt-2">{t.pricing.ctaSub}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VOICE ADD-ON ── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
              className="relative bg-linear-to-br from-[#0D1520] to-[#0C1018] border border-[#6366F1]/25 rounded-2xl p-8 md:p-12 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-80 h-80 bg-[#6366F1]/6 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-[#6366F1]/15 text-[#818CF8] text-xs px-3 py-1 rounded-full uppercase tracking-widest font-medium">
                    {t.voiceAddon.eyebrow}
                  </span>
                  <span className="text-xs text-[#4B5563]">{t.voiceAddon.separatePrice}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center shrink-0">
                        <Mic size={18} className="text-[#818CF8]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#EFF6FF] tracking-tight">{t.voiceAddon.title}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{t.voiceAddon.subtitle}</p>
                    <ul className="space-y-3">
                      {t.voiceAddon.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#818CF8] shrink-0 mt-0.5" />
                          <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/3 border border-white/6 rounded-xl p-5">
                        <span className="text-xs text-[#4B5563] uppercase tracking-widest block mb-2">{t.voiceAddon.setupLabel}</span>
                        <span className="text-2xl font-bold text-[#EFF6FF]">{t.voiceAddon.setupPrice}</span>
                        <span className="text-xs text-[#4B5563] block mt-1">{t.voiceAddon.setupSub}</span>
                      </div>
                      <div className="bg-white/3 border border-white/6 rounded-xl p-5">
                        <span className="text-xs text-[#4B5563] uppercase tracking-widest block mb-2">{t.voiceAddon.retainerLabel}</span>
                        <span className="text-2xl font-bold text-[#818CF8]">{t.voiceAddon.retainerPrice}</span>
                        <span className="text-xs text-[#4B5563] block mt-1">{t.voiceAddon.retainerSub}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(99,102,241,0.25)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setModalOpen(true)}
                      className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white font-semibold text-sm rounded-xl py-3.5 cursor-pointer transition-colors"
                    >
                      {t.voiceAddon.cta}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-12">
              <h2 className="font-bold text-[clamp(26px,3.5vw,40px)] tracking-[-0.02em] text-[#EFF6FF]">{t.faq.title}</h2>
            </motion.div>
            <motion.div variants={fadeUpStagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              {t.faq.items.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border-b border-white/6">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
                  >
                    <span className="font-medium text-base text-[#EFF6FF] pr-4">{item.q}</span>
                    <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                      <ChevronDown size={18} className="text-[#4B5563]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-[#94A3B8] leading-[1.75]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative bg-[#0C1018] border-t border-white/5 py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-150 h-100 bg-[#00D2AA]/7 blur-[140px] rounded-full opacity-[0.07]" />
          </div>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <motion.div variants={fadeUpStagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#00D2AA]">
                {t.finalCta.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif italic text-[clamp(28px,4vw,44px)] text-[#EFF6FF] leading-[1.1] mt-4">
                {t.finalCta.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#94A3B8] mt-4">
                {t.finalCta.sub}
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-4 justify-center mt-8 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,210,170,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setModalOpen(true)}
                  className="bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-lg px-7 py-3.5 cursor-pointer"
                >
                  {t.finalCta.primary}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="border border-white/10 hover:bg-white/5 text-[#EFF6FF] font-medium text-base rounded-lg px-7 py-3.5 cursor-pointer transition-colors"
                >
                  {t.finalCta.ghost}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <HipaaSection  lang={lang}/>

        {/* ── FOOTER ── */}
        <footer className="bg-[#06080B] border-t border-white/5 pt-16 pb-10 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                    <circle cx="10" cy="13" r="8" fill="#00D2AA" fillOpacity="0.9" />
                    <circle cx="17" cy="13" r="8" fill="#00D2AA" fillOpacity="0.4" />
                  </svg>
                  <span className="font-semibold text-sm text-[#EFF6FF]">AI Receptionist for Med Spas</span>
                </div>
                <p className="text-sm text-[#4B5563] mt-3">{t.footer.tagline}</p>
                <div className="flex flex-col gap-2 mt-4">
                  {t.footer.compliance.map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-xs text-[#4B5563] border border-white/8 rounded-full px-3 py-1 w-fit">
                      <ShieldCheck size={11} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4">
              <span className="text-xs text-[#4B5563]">{t.footer.copy}</span>
              <span className="text-xs text-[#4B5563]">{t.footer.powered}</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
