"use client"

import { motion } from "framer-motion"
import { User, MessageSquare, Brain, LayoutDashboard } from "lucide-react"
import { WorkflowNode } from "./workflow-node"
import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function WorkflowVisualization() {
  const [packets, setPackets] = useState<number[]>([])
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].workflowVisual

  useEffect(() => {
    // Create staggered packet animations
    const intervals: NodeJS.Timeout[] = []

    // Start first packet immediately
    setTimeout(() => setPackets((prev) => [...prev, Date.now()]), 0)

    // Add new packets every 2.8 seconds
    const interval = setInterval(() => {
      setPackets((prev) => [...prev, Date.now()])
    }, 2800)

    intervals.push(interval)

    return () => {
      intervals.forEach(clearInterval)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      }}
      className="relative w-full h-[600px] flex items-center justify-center"
    >
      {/* SVG for connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Flowing curved paths */}
        <motion.path
          d="M 80 100 Q 120 150, 160 200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M 160 200 Q 200 250, 240 300"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.path
          d="M 240 300 Q 280 350, 300 420"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />

        {/* Animated data packets */}
        {packets.slice(-3).map((id, idx) => (
          <motion.circle
            key={id}
            r="4"
            fill="url(#lineGradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              ease: "easeInOut",
            }}
          >
            <animateMotion
              dur="2.8s"
              repeatCount="1"
              path={
                idx === 0
                  ? "M 80 100 Q 120 150, 160 200"
                  : idx === 1
                    ? "M 160 200 Q 200 250, 240 300"
                    : "M 240 300 Q 280 350, 300 420"
              }
            />
          </motion.circle>
        ))}
      </svg>

      {/* Workflow nodes positioned along the path */}
      <div className="relative w-full h-full">
        {/* Node 1: Website Visitor */}
        <div className="absolute top-[80px] left-[40px]">
          <WorkflowNode icon={User} label={t.nodes.visitor.label} sublabel={t.nodes.visitor.sublabel} color="blue" delay={0.5} />
        </div>

        {/* Node 2: AI Sales Concierge */}
        <div className="absolute top-[180px] left-[120px]">
          <WorkflowNode
            icon={MessageSquare}
            label={t.nodes.ai.label}
            sublabel={t.nodes.ai.sublabel}
            color="cyan"
            delay={0.7}
          />
        </div>

        {/* Node 3: Workflow AI */}
        <div className="absolute top-[280px] left-[200px]">
          <WorkflowNode icon={Brain} label={t.nodes.workflow.label} sublabel={t.nodes.workflow.sublabel} color="purple" delay={0.9} />
        </div>

        {/* Node 4: CRM / Sales Pipeline (with Popover) */}
        <div className="absolute top-[400px] left-[240px]">
          <Popover>
            <PopoverTrigger asChild aria-label="crm-pipeline-button">
              <div className="cursor-pointer">
                <WorkflowNode icon={LayoutDashboard} label="CRM / Sales Pipeline" sublabel="ACTIVE" color="green" delay={1.1} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-[#111113] border border-[#27272A] text-[#FAFAFA] p-4" side="right">
              <p className="text-xs font-medium text-[#A1A1AA] mb-3 uppercase tracking-wide">Sales Pipeline</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Leads activos</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">En negociación</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Ganados este mes</span>
                  <span className="font-medium text-[#00D084]">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Última actividad</span>
                  <span className="text-[#A1A1AA] text-xs">hace 3 min</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full mt-4 bg-[#00D084] hover:bg-[#00D084]/90 text-black font-medium text-xs"
                onClick={() =>
                  document.getElementById("crm-pipeline")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Abrir CRM &rarr;
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Floating metadata cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute top-[220px] right-[40px] backdrop-blur-md bg-white/5 border border-cyan-500/30 rounded-lg px-3 py-2 text-xs"
        >
          <p className="text-cyan-400 font-mono">John from Acme Corp</p>
          <p className="text-green-400 font-bold">{t.cards.meeting}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="absolute top-[320px] right-[60px] backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-lg px-3 py-2 text-xs"
        >
          <p className="text-purple-400 font-mono">{t.cards.payload}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="absolute top-[360px] right-[10px] backdrop-blur-md bg-white/5 border border-green-500/30 rounded-lg px-3 py-2 text-xs max-w-[180px]"
        >
          <p className="text-green-400 font-mono leading-relaxed">
            {t.cards.lead}</p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="absolute top-[520px] left-[20px] backdrop-blur-md bg-white/5 border border-orange-500/30 rounded-lg px-3 py-2 text-xs flex items-center gap-2"
        >
          <span className="text-orange-400 text-base">🔔</span>
          <p className="text-orange-400 font-mono">{t.cards.alertMsg}</p>
        </motion.div> */}

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute top-[140px] left-[20px] px-2 py-1 rounded bg-green-500/20 border border-green-500/50"
        >
          <p className="text-green-400 font-mono text-[10px] font-bold">{t.active}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute top-[240px] left-[100px] px-2 py-1 rounded bg-green-500/20 border border-green-500/50"
        >
          <p className="text-green-400 font-mono text-[10px] font-bold">{t.active}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
