"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  icon: LucideIcon
  iconColor: "blue" | "cyan" | "purple" | "green" | "orange"
  title: string
  description: string
  badge?: string
  features?: string[]
  delay?: number
  className?: string
}

const iconGradients = {
  blue: "from-blue-500 to-blue-600",
  cyan: "from-cyan-500 to-cyan-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
}

export function GlassmorphicCard({
  icon: Icon,
  iconColor,
  title,
  description,
  badge,
  features,
  delay = 0,
  className,
}: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={cn(
        "relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group",
        className,
      )}
    >
      {/* Corner gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
            iconGradients[iconColor],
          )}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>

        {/* Badge */}
        {badge && (
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-400 font-medium mb-4">
            {badge}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mt-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}
