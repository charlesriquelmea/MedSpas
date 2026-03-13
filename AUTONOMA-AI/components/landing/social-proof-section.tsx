"use client"

import { motion } from "framer-motion"
import { Star, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

function NetflixLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 111 30" fill="currentColor">
      <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 0v21.875c2.75.156 5.469.344 8.156.625v4.687c-4.281-.375-8.531-.75-12.844-.844V0h4.688zM21.156 22.531c-1.437-4.5-2.875-9.032-4.312-13.5l-.062.062c.156 4.25.281 8.594.281 12.906-.594 0-1.187 0-1.75.031V0h5.687l4.282 13.25L29.625 0h5.656v24.437c-.187.188-.375.094-.656.094V10.406c-.094 4.407-.094 8.75-.281 13.126l-4.594-14.813c-1.469 4.657-2.969 9.282-4.438 13.812h-4.156z" />
    </svg>
  )
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor">
      <path d="M38.4 21.68V16c-2.66 0-4.69-.71-6-2.09a8.9 8.9 0 0 1-2.13-5.64v-.41l-5.37-.01v23.09c0 2.46-1.99 4.46-4.46 4.46-1.5 0-2.83-.75-3.63-1.89a4.46 4.46 0 0 1 3.64-7.02c.49 0 .97.08 1.41.23v-5.51a9.92 9.92 0 0 0-1.41-.1c-5.47 0-9.91 4.44-9.91 9.91 0 3.27 1.59 6.17 4.04 7.97a9.87 9.87 0 0 0 5.87 1.94c5.47 0 9.91-4.44 9.91-9.91V19.22a14.12 14.12 0 0 0 8.05 2.46z" />
    </svg>
  )
}

function NikeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 69 32" fill="currentColor">
      <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-.56 2.56.08 4.4.72 2 2.72 2 2.24 0 6.4-1.68L68.56 4z" />
    </svg>
  )
}

function TwitchLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 268" fill="currentColor">
      <path d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.93v-34.898H40.717V23.263zm64.008 116.405H128V69.844h-23.275v69.824zm63.997 0h23.27V69.844h-23.27v69.824z" />
    </svg>
  )
}

export function SocialProofSection() {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].socialProof

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-12 text-center"
        >
        <p className="text-sm text-muted-foreground mb-8">{t.eyebrow}</p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl italic font-medium mb-8 leading-relaxed text-pretty">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              "{t.quote}"
            </span>
          </blockquote>

          {/* Avatar and attribution */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">SC</span>
            </div>
            <div>
              <p className="font-semibold text-white">{t.author}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>

          {/* Client Outcomes */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <CalendarCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">{t.badges[0]}</span>
            </div>
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">{t.badges[1]}</span>
            </div>
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">{t.badges[2]}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}