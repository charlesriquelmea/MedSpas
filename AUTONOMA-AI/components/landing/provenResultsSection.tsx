"use client"

import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"
import { 
  Gauge, 
  Clock, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Bot, 
  CheckCircle, 
  X, 
  ArrowRight, 
  Ban, 
  Zap, 
  Database, 
  Check, 
  AlertCircle,
  XCircle,
  Star
} from "lucide-react"
import { LiveDemoShowcase } from "@/components/LiveDemoShowcase"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { useInView } from "framer-motion"

interface CTASectionProps {
  onOpenForm?: () => void;
}

export function ProvenResultsSection({ onOpenForm }: CTASectionProps) {
  const { language } = useLanguage()
  const t = (landingContent as any)[language]?.provenResults
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!t) return null

  const stepIcons = [MessageCircle, Bot, Database];

  return (
    <section ref={ref} className="w-full py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        
        {/* 1. HERO SECTION */}
        <div className="text-center mb-24 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-8 border border-teal-500/20 shadow-sm shadow-teal-500/10"
          >
            <Bot className="w-4 h-4" /> 
            {t.header.badge}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            {t.header.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.header.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              onClick={onOpenForm}
            >
              {t.header.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* LIVE DEMO SHOWCASE (Cambio 4b) */}
        <div className="mb-24" id="live-demo">
          <LiveDemoShowcase />
          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              className="bg-[#00D084] hover:bg-[#00D084]/90 text-black font-semibold px-8"
              onClick={onOpenForm}
            >
              Schedule Free Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* 2. FLOW DIAGRAM (Igual que antes) */}
        <div className="mb-32">
             {/* ... (Contenido del diagrama igual al anterior) ... */}
             <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
             <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.calificacionAutomatica.title}</h3>
             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.calificacionAutomatica.subtitle}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative"> 
              <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10 opacity-30" />
              {/* Paso 1 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-background rounded-2xl flex items-center justify-center mb-6 border border-border shadow-lg">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.calificacionAutomatica.flow.newLead.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{t.calificacionAutomatica.flow.newLead.description}</p>
                <div className="w-full bg-white/5 rounded-xl p-4 text-left border border-white/10">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t.calificacionAutomatica.flow.newLead.infoCollected}</p>
                  <ul className="text-sm text-foreground space-y-1.5">
                    {t.calificacionAutomatica.flow.newLead.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Paso 2 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-background rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/50 shadow-[0_0_30px_-5px_rgba(234,179,8,0.2)]">
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500"><Bot className="w-8 h-8" /></div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.calificacionAutomatica.flow.qualifying.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{t.calificacionAutomatica.flow.qualifying.description}</p>
                <div className="w-full bg-yellow-950/10 rounded-xl p-4 text-left border border-yellow-500/20">
                  <p className="text-xs font-semibold text-yellow-500 uppercase tracking-wider mb-2">{t.calificacionAutomatica.flow.qualifying.criteria}</p>
                  <ul className="text-sm text-foreground space-y-1.5">
                    {t.calificacionAutomatica.flow.qualifying.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Paso 3 */}
              <div className="flex flex-col items-center text-center relative z-10 h-full">
                  <div className="w-24 h-24 flex items-center justify-center mb-6 opacity-0 md:opacity-100"></div>
                  <div className="grid grid-cols-1 gap-3 w-full mt-[-6rem] md:mt-0">
                    <ResultCard icon={CheckCircle} color="teal" title={t.calificacionAutomatica.flow.results.calificado.title} subtitle={t.calificacionAutomatica.flow.results.calificado.subtitle} />
                    <ResultCard icon={Clock} color="blue" title={t.calificacionAutomatica.flow.results.interesado.title} subtitle={t.calificacionAutomatica.flow.results.interesado.subtitle} />
                    <ResultCard 
                      icon={AlertCircle} 
                      color="orange" 
                      title={t.calificacionAutomatica.flow.results.noCalifica.title} 
                      subtitle={t.calificacionAutomatica.flow.results.noCalifica.subtitle}
                      /* extra={
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-[#A1A1AA]">Si no califica: marcar como Spam o enviar a nurturing.</p>
                          <Button size="sm" variant="outline" className="border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] text-xs w-full">
                            Sign-up with CRM
                          </Button>
                          <p className="text-xs text-[#00D084] font-medium">Sign-up → Registrar lead en CRM & Pipeline de ventas</p>
                        </div>
                      } */
                    />
                    <ResultCard icon={XCircle} color="red" title={t.calificacionAutomatica.flow.results.spam.title} subtitle={t.calificacionAutomatica.flow.results.spam.subtitle} />
                  </div>
              </div>
            </div>
            <motion.div className="mt-12 pt-8 border-t border-border/50 flex flex-col items-center text-center" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-sm mb-3 border border-emerald-500/20">
                    <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />{t.calificacionAutomatica.footer.badge}
                </div>
                <p className="text-muted-foreground text-sm">{t.calificacionAutomatica.footer.text}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* 3. HOW IT WORKS (Igual que antes) */}
        {t.howItWorks && (
          <div className="mb-32">
             <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.howItWorks.title}</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.howItWorks.steps.map((step: any, index: number) => {
                const Icon = stepIcons[index] || MessageCircle;
                return (
                  <motion.div key={index} className="relative bg-card/50 rounded-3xl p-8 border border-white/10 hover:border-teal-500/30 transition-colors" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * index }}>
                    <div className="absolute -top-4 left-8"><div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/20">0{index + 1}</div></div>
                    <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 mt-2"><Icon className="h-7 w-7 text-teal-500" /></div>
                    <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{step.desc}</p>
                    <ul className="space-y-3">
                      {step.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground/80"><Check className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />{feature}</li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
            <motion.div className="mt-12 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }}>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20"><Zap className="h-5 w-5" /><span className="font-bold">{t.howItWorks.badge}</span></div>
              <p className="text-muted-foreground mt-3 text-sm">{t.howItWorks.footer}</p>
            </motion.div>
          </div>
        )}

        {/* =========================================
            4. COMPARISON SECTION (CORREGIDO: 6 ITEMS + FOOTER COSTO)
           ========================================= */}
        <div className="mb-24">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.comparison.title}</h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">{t.comparison.subtitle}</p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Tradicional (Tarjeta Oscura) */}
                <motion.div 
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors relative overflow-hidden"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="inline-block bg-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6">
                        {t.comparison.traditional.label}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-8">{t.comparison.traditional.title}</h3>
                    <div className="space-y-6">
                        {t.comparison.traditional.items.map((item:any, idx:number) => (
                              <div key={idx} className="flex items-start gap-3">
                                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-200 mb-1">{item.title}</p>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </div>
                              </div>
                        ))}
                    </div>
                    {/* COSTO ROJO AL FINAL */}
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-red-400 text-sm font-semibold text-center">{t.comparison.traditional.costLabel}</p>
                    </div>
                </motion.div>

                {/* Automático (Tarjeta Teal Oscura/Gradiente) */}
                <motion.div 
                    className="bg-gradient-to-b from-teal-950/30 to-background border border-teal-500/30 rounded-3xl p-8 relative overflow-hidden"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            RECOMENDADO
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />
                    <div className="inline-block bg-teal-500/20 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6 border border-teal-500/20">
                        {t.comparison.automatic.label}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-8">{t.comparison.automatic.title}</h3>
                    <div className="space-y-6">
                        {t.comparison.automatic.items.map((item:any, idx:number) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-100 mb-1">{item.title}</p>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </div>
                              </div>
                        ))}
                    </div>
                    {/* COSTO VERDE AL FINAL */}
                    {/* <div className="mt-8 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                        <p className="text-teal-400 text-sm font-semibold text-center">{t.comparison.automatic.costLabel}</p>
                    </div> */}
                </motion.div>
              </div>
        </div>


        {/* =========================================
            5. METRICS (CORREGIDO CON BANNER FINAL)
           ========================================= */}
        <div>
           <motion.div 
             className="text-center mb-16"
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6 }}
           >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.metrics.title}</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">{t.metrics.subtitle}</p>
           </motion.div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
              {t.metrics.stats.map((stat:any, index:number) => {
                  const icons = [Gauge, Clock, Users, TrendingUp];
                  const Icon = icons[index] || TrendingUp;
                  return (
                      <motion.div 
                        key={index} 
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-colors group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                          <div className="w-12 h-12 bg-white/5 text-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-500/20 group-hover:text-teal-400 transition-colors">
                              <Icon className="w-6 h-6" />
                          </div>
                          <motion.div 
                            className="text-3xl md:text-4xl font-bold text-white mb-2"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                          >
                             {stat.value}
                             {stat.unit && <span className="text-xl md:text-2xl ml-1 text-gray-500">{stat.unit}</span>}
                          </motion.div>
                          <p className="text-sm text-gray-400">{stat.label}</p>
                      </motion.div>
                  )
              })}
           </div>

           {/* BANNER CTA FINAL (Verde Grande) */}
           <motion.div 
             className="bg-teal-500 rounded-2xl p-8 text-center"
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.4 }}
           >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.metrics.ctaTitle}</h3>
                <p className="text-teal-50 font-medium">{t.metrics.ctaSubtitle}</p>
           </motion.div>
        </div>

      </div>
    </section>
  )
}

function ResultCard({ icon: Icon, color, title, subtitle, extra }: any) {
    const colors: any = {
        teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
    }
    const colorClass = colors[color] || colors.teal

    return (
        <div className={`border rounded-xl p-4 bg-card hover:bg-white/5 transition-colors ${colorClass.split(" ")[2]}`}> 
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass.split(" ").slice(0,2).join(" ")}`}>
                  <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                  <p className="font-bold text-foreground text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            {extra && <div className="mt-3">{extra}</div>}
        </div>
    )
}
