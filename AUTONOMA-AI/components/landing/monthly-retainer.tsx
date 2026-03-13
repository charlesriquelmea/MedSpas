"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Server,
  Bot,
  Workflow,
  Headphones,
  Shield,
  DollarSign,
  Clock,
  ChevronRight,
  MessageSquare,
  Check,
  X,
  Code2 // Icono para Infraestructura (High-Performance Sites)
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

interface MonthlyRetainerProps {
  onOpenForm?: () => void;
}

// Orden de iconos alineado con landing-content:
// 1. Landing Page Infra -> Code2 (Antes Server, pero Code2 va mejor con "High-Performance")
// 2. AI Sales -> Bot
// 3. Workflow -> Workflow
// 4. Support -> Headphones
const categoryIcons = [Code2, Bot, Workflow, Headphones]
const categoryColors = ["cyan", "purple", "orange", "green"]
const benefitIcons = [Shield, DollarSign, Clock]

export function MonthlyRetainer({ onOpenForm }: MonthlyRetainerProps) {
  const { language } = useLanguage()
  const t = landingContent[language].retainer
  const [isSlaOpen, setIsSlaOpen] = useState(false)

  const categories = t.categories.map((cat: any, idx: number) => ({
    ...cat,
    icon: categoryIcons[idx] || Server,
    color: categoryColors[idx] || "blue"
  }))

  return (
    <section id="retainer" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
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

        {/* Retainer Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category: any, idx: number) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-${category.color}-500/10 flex items-center justify-center shrink-0`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>

                <div className="space-y-4 pl-0 md:pl-16 flex-grow">
                  {category.items.map((item: any, itemIdx: number) => (
                    <div
                      key={itemIdx}
                      className="flex items-start gap-3 py-1 border-b border-white/5 last:border-0"
                    >
                      <Check className="w-4 h-4 text-cyan-500/50 mt-1 shrink-0" />
                      <div className="w-full">
                        <span className="text-foreground/90 font-medium block">
                            {item.name}
                        </span>
                        
                        <p className={`text-muted-foreground leading-relaxed ${item.description.length > 60 ? 'text-xs mt-1' : 'text-xs'}`}>
                          {item.description}
                        </p>

                        {/* --- BOTÓN SLA (Se muestra SOLO si item.hasSLA es true en landing-content) --- */}
                        {item.hasSLA && (
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsSlaOpen(true)}
                                className="mt-4 flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600/20 to-cyan-900/20 border border-cyan-500/40 px-4 py-2 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/30 transition-all shadow-[0_0_15px_-5px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] group w-fit"
                            >
                                <Shield className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
                                <span className="tracking-wide">See more SLA support...</span>
                                <ChevronRight className="w-3.5 h-3.5 text-cyan-500 group-hover:translate-x-0.5 transition-transform" />
                            </motion.button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 mb-12"
        >
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
             <div className="w-full md:w-1/2 space-y-3 text-left">
                 <h3 className="text-lg font-medium text-muted-foreground mb-4 border-b border-white/10 pb-2">
                   {t.summary.label}
                 </h3>
                 {categories.map((cat: any, idx: number) => (
                   <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${cat.color}-400 shrink-0`} />
                      <span className="text-lg font-medium text-foreground/90">{cat.title}</span>
                   </div>
                 ))}
             </div>

             <div className="w-full md:w-1/2 text-center md:text-right">
                 <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                   {t.summary.price}<span className="text-2xl">{t.perMonthLong}</span>
                 </div>
                 
                 <p className="text-sm text-green-400 bg-green-900/20 py-1 px-4 rounded-full inline-block mb-6">
                     {t.summary.note}
                 </p>

                 <div className="flex justify-center md:justify-end">
                     <Button 
                         size="lg" 
                         className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-12 py-6 text-lg"
                         onClick={onOpenForm}
                     >
                         {t.cta}
                         <ChevronRight className="w-5 h-5 ml-2" />
                     </Button>
                 </div>
             </div>
           </div>
        </motion.div>
{/* 
        Policy Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-12"
        >
          <h3 className="text-xl font-bold mb-6">{t.policy.title}</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-cyan-400 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> {t.policy.conversationTitle}
              </h4>
              <div className="space-y-2">
                {t.policy.conversations.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm">{item.range}</span>
                    <div className="text-right">
                      <span className="text-cyan-400 font-medium block">{item.price}</span>
                      <p className="text-[10px] text-muted-foreground">{item.rate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-orange-400 mb-4 flex items-center gap-2">
                <Workflow className="w-4 h-4" /> {t.policy.workflowTitle}
              </h4>
              <div className="space-y-2">
                {t.policy.workflows.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm">{item.range}</span>
                    <span className="text-orange-400 font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center italic border-t border-white/5 pt-4">
            {t.policy.note}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 space-y-1 text-sm text-muted-foreground"
        >
          <p>{t.finePrint[0]}</p>
          <p>{t.finePrint[1]}</p>
        </motion.div> */}

        {/* SLA MODAL */}
        <AnimatePresence>
            {isSlaOpen && t.sla && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setIsSlaOpen(false)}
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl relative"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-green-400" />
                                    {t.sla.title}
                                </h3>
                                <button 
                                    onClick={() => setIsSlaOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            {t.sla.headers.map((header: string, idx: number) => (
                                                <th key={idx} className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-white/5 first:rounded-tl-lg last:rounded-tr-lg">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {t.sla.rows.map((row: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-bold text-white whitespace-nowrap">
                                                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                                                        idx === 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                        idx === 1 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                        idx === 2 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                        'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    }`}>
                                                        {row.priority}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-300">{row.impact}</td>
                                                <td className="p-4 text-sm font-mono text-cyan-300">{row.response}</td>
                                                <td className="p-4 text-sm font-mono text-purple-300">{row.resolution}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button onClick={() => setIsSlaOpen(false)} variant="outline">
                                    {t.sla.close}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  )
}