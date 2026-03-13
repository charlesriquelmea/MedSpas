"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow?: string
  title: string | ReactNode
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ eyebrow, title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={centered ? "text-center" : ""}
    >
      {eyebrow && <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4 font-semibold">{eyebrow}</p>}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">{title}</h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
