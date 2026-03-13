"use client"

import { motion } from "framer-motion"
import { Search, Zap, Globe, Layers, Code2, Palette, Check, Gauge, Smartphone } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const CompanyLogos = () => (
  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-90">
    {/* 1. Netflix */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
    >
      <svg
        viewBox="0 0 111 30"
        className="h-8 w-auto fill-[#E50914]"
        style={{ minWidth: "110px" }}
      >
        <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" />
      </svg>
    </motion.div>

    {/* 2. TikTok */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
    >
      <svg viewBox="0 0 48 48" className="h-8 w-auto fill-white scale-110">
        <path d="M38.4 21.68V16c-2.66 0-4.69-.71-6-2.09a8.9 8.9 0 01-2.13-5.64v-.41l-5.37-.13v23.87a5.54 5.54 0 01-5.85 5.85 5.54 5.54 0 01-5.85-5.85 5.54 5.54 0 015.85-5.85 6 6 0 011.83.29v-5.51a11.59 11.59 0 00-1.83-.14 10.9 10.9 0 1010.9 10.9V20.69a15.13 15.13 0 008.45 2.56v-1.57z" />
      </svg>
    </motion.div>

    {/* 3. Nike */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex-shrink-0"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
        alt="Nike"
        title="Nike"
        className="h-8 w-auto object-contain"
        style={{
          minWidth: "110px",
          transform: "scale(0.85)",
          filter: "brightness(0) invert(1)",
          opacity: 1
        }}
      />
    </motion.div>

    {/* 4. Twitch */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
    >
      <svg viewBox="0 0 256 268" className="h-8 w-auto fill-[#9146FF]">
        <path d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458zm23.259 23.263H232.73v128.029l-40.739 40.741h-63.992l-34.89 34.932v-34.932H40.717V23.263zm63.983 91.467h23.275V69.356H104.7v45.374zm63.993 0h23.27V69.356h-23.27v45.374z" />
      </svg>
    </motion.div>

    {/* Notion */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="opacity-60 hover:opacity-100 transition-opacity"
    >
      <svg viewBox="0 0 100 100" className="h-8 w-auto fill-white mx-5">
        <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" />
        <path
          fill="#000"
          d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V20.64c0-2.21-.873-2.847-3.443-4.733L75.24 3.263c-4.273-3.107-6.02-3.5-12.817-2.917L61.35.227zM25.96 19.287c-5.35.333-6.567.41-9.617-1.863L9.33 12.14c-.78-.78-.387-1.75 1.167-1.943l52.443-3.887c4.467-.387 6.8.973 8.543 2.333l8.737 6.417c.387.193.97 1.36.193 1.36L26.153 19.287h-.193v.087zm-3.5 74.047V32.463c0-2.53.78-3.697 3.113-3.893l57.5-3.307c2.14-.193 3.11 1.167 3.11 3.693v60.483c0 2.53-.39 4.67-3.887 4.863l-55.14 3.307c-3.5.193-4.697-1.003-4.697-3.473v.087zm54.36-57.757c.387 1.75 0 3.5-1.75 3.7l-2.72.387v44.683c-2.333 1.167-4.47 1.943-6.22 1.943-2.913 0-3.693-.97-5.83-3.5l-17.86-28.087v27.113l5.64 1.36s0 3.5-4.86 3.5L31.17 87.3c-.387-.78 0-2.723 1.36-3.11l3.5-.97V50.38l-4.86-.387c-.387-1.75.58-4.277 3.3-4.47l13.203-.78 18.64 28.477v-25.2l-4.667-.583c-.387-2.14 1.167-3.693 3.113-3.887l13.203-.78z"
        />
      </svg>
    </motion.div>

    {/* 6. OpenAI */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
    >
      <svg viewBox="0 0 24 24" className="h-8 w-auto fill-white scale-110 mx-1">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    </motion.div>

    {/* 7. GitHub */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
    >
      <svg viewBox="0 0 98 96" className="h-8 w-auto fill-white scale-110 mx-1">
        <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
      </svg>
    </motion.div>
  </div>
);

export function VanguardTechnology() {
  const { language } = useLanguage()
  const t = landingContent[language].vanguard

  // Variables no usadas comentadas para evitar warnings, pero mantenidas si se descomenta el bloque superior
  const seoFeatures = t.card1.features
  
  const seoMetrics = [
    { ...t.card1.metrics[0], icon: Search },
    { ...t.card1.metrics[1], icon: Zap },
    { ...t.card1.metrics[2], icon: Gauge },
    { ...t.card1.metrics[3], icon: Layers },
    { ...t.card1.metrics[4], icon: Globe },
  ]

  const performanceMetrics = [
    { ...t.card2.metrics[0], icon: Zap },
    { ...t.card2.metrics[1], icon: Layers },
    { ...t.card2.metrics[2], icon: Smartphone },
    { ...t.card2.metrics[3], icon: Globe },
  ]

  const techStackIcons = [Globe, Layers, Palette, Code2]
  const techStack = t.techStack.items.map((item: any, idx: number) => ({
    ...item,
    icon: techStackIcons[idx]
  }))

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* =================================================================
            SECCIÓN COMENTADA: Header y Cards de SEO/Performance
            ================================================================= */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t.title}
            <span className="block text-cyan-400">{t.subtitle}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold">{t.card1.title}</h3>
            </div>

            <p className="text-muted-foreground mb-6">
              {t.card1.desc[0]} <span className="text-cyan-400 font-semibold">{t.card1.desc[1]}</span>{t.card1.desc[2]}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {seoFeatures.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground mb-4">{t.card1.guarantee}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {seoMetrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold">{t.card2.title}</h3>
            </div>

            <p className="text-muted-foreground mb-6">
              {t.card2.desc[0]} <span className="text-red-400 font-semibold">{t.card2.desc[1]}</span>{t.card2.desc[2]} 
              <span className="text-cyan-400 font-semibold">{t.card2.desc[3]}</span>{t.card2.desc[4]}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {performanceMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <metric.icon className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-xl font-bold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground mb-4">{t.card2.impactTitle}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span className="text-sm">{t.card2.impact1[0]}</span>
                  <span className="text-red-400 font-semibold">{t.card2.impact1[1]}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span className="text-sm">{t.card2.impact2[0]}</span>
                  <span className="text-red-400 font-semibold">{t.card2.impact2[1]}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        */}
        {/* =================================================================
            FIN SECCIÓN COMENTADA
            ================================================================= */}

        {/* Technology Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pt-10"
        >
          <h3 className="text-2xl font-bold text-center mb-8">{t.techStack.title}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <tech.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="font-bold mb-2">{tech.title}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-8">{t.trust.text}</p>
          <CompanyLogos />

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">40%</div>
              <div className="text-sm text-muted-foreground">{t.trust.stat1}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">7M+</div>
              <div className="text-sm text-muted-foreground">{t.trust.stat2}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}