"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkflowNodeProps {
  icon: LucideIcon
  label: string
  sublabel: string
  color: "blue" | "cyan" | "purple" | "green" | "orange"
  delay?: number
}

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/50 shadow-blue-500/20",
  cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/50 shadow-cyan-500/20",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/50 shadow-purple-500/20",
  green: "from-green-500/20 to-green-600/20 border-green-500/50 shadow-green-500/20",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/50 shadow-orange-500/20",
}

const iconColorClasses = {
  blue: "text-blue-400",
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  green: "text-green-400",
  orange: "text-orange-400",
}

export function WorkflowNode({ icon: Icon, label, sublabel, color, delay = 0 }: WorkflowNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      }}
      className="flex flex-col items-center gap-3"
    >
      {/* Node */}
      <div
        className={cn(
          "relative w-20 h-20 rounded-2xl backdrop-blur-xl bg-gradient-to-br border flex items-center justify-center shadow-lg",
          colorClasses[color],
        )}
      >
        <Icon className={cn("w-10 h-10", iconColorClasses[color])} strokeWidth={2} />

        {/* Pulse effect */}
        <motion.div
          className={cn("absolute inset-0 rounded-2xl border", `border-${color}-500/50`)}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-xs text-muted-foreground">{sublabel}</span>
      </div>
    </motion.div>
  )
}
