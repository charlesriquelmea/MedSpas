"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Zap, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ValueStackSectionProps {
  onOpenForm?: () => void;
}

const valueItems = [
  {
    icon: Users,
    title: "Virtual Secretary 24/7",
    realValue: "$4,000/month",
    description: "Answers customers instantly, follows up automatically, handles FAQs, and supports your business day and night."
  },
  {
    icon: BarChart3,
    title: "CRM + Management Dashboard",
    realValue: "$200/month",
    description: "Manage leads, track conversations, monitor performance, and keep your business organized in one place."
  },
  {
    icon: Zap,
    title: "AI Appointment Setter",
    realValue: "$300/month",
    description: "Qualifies leads, books appointments, sends reminders, and helps reduce missed opportunities."
  },
  {
    icon: BarChart3,
    title: "Sales Pipeline + Calendar + Unified Inbox",
    realValue: "$300/month",
    description: "Track every opportunity, manage appointments visually, and centralize all conversations in one inbox for faster follow-up."
  }
]

const trustPoints = [
  "No extra payroll",
  "No missed leads",
  "No 24/7 staffing costs",
  "Works even while you sleep"
]

export function ValueStackSection({ onOpenForm }: ValueStackSectionProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-[#00D084] font-semibold mb-4">
            THE COMPLETE SOLUTION
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Everything You Get for Less Than the Cost of One Employee
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            A complete AI-powered sales and customer service system designed to help your business respond faster, book more appointments, organize your pipeline, and operate 24/7.
          </p>
        </motion.div>

        {/* Value Stack Cards */}
        <div className="space-y-4 mb-12">
          {valueItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 md:p-8 hover:border-[#00D084]/30 transition-all duration-300"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D084]/5 to-transparent" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left side - Icon and Title */}
                  <div className="flex gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-[#00D084]/10 border border-[#00D084]/30 flex items-center justify-center group-hover:bg-[#00D084]/20 transition-colors duration-300">
                        <Icon className="w-7 h-7 text-[#00D084]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Value */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Real Value
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-[#00D084]">
                      {item.realValue}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Total Value Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="mb-12 rounded-3xl border-2 border-[#00D084]/30 bg-gradient-to-br from-[#00D084]/10 to-[#00D084]/5 p-8 md:p-10 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-[#00D084] font-semibold mb-2">
              Combined Value
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
              $4,800<span className="text-2xl text-gray-400">/month</span>
            </h3>
            <p className="text-gray-400">in premium features and services</p>
          </div>
        </motion.div>

        {/* Offer Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 md:p-12 mb-12 backdrop-blur"
        >
          <div className="text-center space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#A1A1AA] font-semibold mb-4">
                TODAY'S OFFER
              </p>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Setup Fee</p>
                  <p className="text-4xl md:text-5xl font-bold text-white">$1,497</p>
                </div>
                <p className="text-gray-400">+</p>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monthly</p>
                  <p className="text-4xl md:text-5xl font-bold text-white">$497<span className="text-xl text-gray-400">/mo</span></p>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA] mb-6">
                Initial Total <span className="text-white font-semibold">$1,994 USD</span>
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-400 mb-6 text-balance">
                Launch your AI sales and support system for a fraction of the cost of hiring and training staff.
              </p>
              
              {/* Trust Points */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {trustPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={onOpenForm}
                className="bg-[#00D084] hover:bg-[#00D084]/90 text-black font-bold text-lg px-8 py-6 h-auto rounded-xl border-0 mb-4 w-full md:w-auto"
              >
                Book a Demo
              </Button>

              <p className="text-sm text-gray-500">
                See how your AI agent can start working for your business in days, not months.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
