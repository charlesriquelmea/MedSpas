"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PricingSectionProps {
  onOpenForm?: () => void;
}

export function PricingSection({ onOpenForm }: PricingSectionProps) {
  const { language } = useLanguage()
  const t = landingContent[language].pricing

  return (
    <section id="pricing" className="py-24 px-6 relative bg-black/40">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          {(t as any).eyebrow && (
            <p className="text-xs uppercase tracking-widest text-[#00D084] font-semibold">{(t as any).eyebrow}</p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {t.title}
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Grid de Planes */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {t.tiers.map((tier: any, index: number) => {
            const isHighlight = tier.highlight
            const isComingSoon = tier.comingSoon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-3xl border relative overflow-hidden flex flex-col h-full ${
                  isHighlight
                    ? "border-2 border-[#00D084] bg-[#111113] ring-1 ring-[#00D084]/20"
                    : isComingSoon
                      ? "border-white/10 bg-white/[0.02] opacity-70"
                      : "border-white/10 bg-[#0A0A0B]"
                }`}
              >
                {/* Most Popular badge for Free Pilot */}
                {isHighlight && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 bg-[#00D084] text-black text-xs font-bold uppercase tracking-wider rounded-b-lg">
                      Recomendado
                    </div>
                  </div>
                )}

                {/* Tag */}
                <div className="mb-4 mt-4">
                  <span className={`text-xs font-mono uppercase tracking-wider font-bold ${isHighlight ? "text-[#00D084]" : isComingSoon ? "text-[#A1A1AA]" : "text-[#A1A1AA]"}`}>
                    {tier.tag}
                  </span>
                  {tier.tagSub && (
                    <span className="ml-2 text-xs bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5 rounded-full font-medium">
                      {tier.tagSub}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>

                {/* Promo badge */}
                {tier.promo && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] text-xs font-medium mb-3 self-start">
                    {tier.promo}
                  </div>
                )}

                {/* Urgency badge */}
                {tier.urgency && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs font-medium mb-3 self-start">
                    <Clock className="w-3 h-3" />
                    {tier.urgency}
                  </div>
                )}

                {/* Price */}
                <div className={`mb-4 pb-4 border-b ${isHighlight ? "border-[#00D084]/20" : "border-white/10"}`}>
                  {tier.price !== "" ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>
                      {tier.setupFee && (
                        <p className="text-xs text-[#A1A1AA] mt-1">{tier.setupFee}</p>
                      )}
                      {tier.setupAlt && (
                        <p className="text-xs text-[#A1A1AA]/70 mt-0.5 italic">{tier.setupAlt}</p>
                      )}
                    </>
                  ) : isComingSoon ? (
                    <p className="text-lg font-semibold text-[#A1A1AA]">Pricing TBA</p>
                  ) : null}

                  {/* Description */}
                  <p className={`text-sm mt-3 ${isHighlight ? "text-[#00D084]" : "text-muted-foreground"}`}>
                    {tier.description}
                  </p>

                  {/* ROI badge */}
                  {tier.roiTarget && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] text-xs font-semibold mt-3">
                      {tier.roiTarget}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlight ? "text-[#00D084]" : "text-gray-500"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {isComingSoon && tier.features.length === 0 && (
                    <li className="text-sm text-[#A1A1AA] italic">Advanced multi-location features coming Q2 2025.</li>
                  )}
                </ul>

                <Button
                  onClick={isComingSoon ? undefined : onOpenForm}
                  variant={isHighlight ? "default" : "outline"}
                  className={`w-full ${
                    isHighlight
                      ? "bg-[#00D084] hover:bg-[#00D084]/90 text-black font-bold border-0"
                      : isComingSoon
                        ? "border-white/10 hover:bg-white/10 text-[#A1A1AA]"
                        : "border-white/10 hover:bg-white/10"
                  }`}
                >
                  {tier.cta}
                </Button>

                {tier.footerNote && (
                  <p className="text-center text-xs text-[#A1A1AA] mt-3">{tier.footerNote}</p>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Sección Comparativa (Nueva) */}
        {t.comparison && (
          <div className="mt-16 max-w-4xl mx-auto text-center bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">{t.comparison.title}</h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-2xl mx-auto">
              {t.comparison.text}
            </p>

            {/* Botón que abre el Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/20 hover:text-cyan-300">
                  {t.comparison.cta}
                </Button>
              </DialogTrigger>
              
              {/* Contenido del Modal (Tabla) */}
              <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader className="text-center mb-6">
                  <DialogTitle className="text-2xl font-bold mb-2">
                    {t.comparison.modal.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {t.comparison.modal.subtitle}
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/20 text-sm text-gray-400">
                        <th className="py-4 px-4 font-normal w-[35%]">{t.comparison.modal.tableHeaders.features}</th>
                        <th className="py-4 px-4 font-normal w-[30%]">{t.comparison.modal.tableHeaders.replaces}</th>
                        <th className="py-4 px-4 font-normal w-[15%] text-center">{t.comparison.modal.tableHeaders.tools}</th>
                        <th className="py-4 px-4 font-bold text-cyan-400 w-[20%] text-center bg-cyan-950/10 rounded-t-lg">
                          {t.comparison.modal.tableHeaders.autonoma}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {t.comparison.modal.tableRows.map((row: any, i: number) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-medium">{row.feat}</td>
                          <td className="py-4 px-4 text-gray-400">{row.rep}</td>
                          <td className="py-4 px-4 text-center text-gray-500">{row.cost}</td>
                          <td className="py-4 px-4 text-center bg-cyan-950/5">
                            {row.auto && <div className="flex justify-center"><Check className="w-5 h-5 text-green-500" /></div>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-3 bg-cyan-950/20 border border-cyan-900/30 rounded text-center text-xs text-cyan-200">
                  {t.comparison.modal.footer}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

      </div>
    </section>
  )
}
