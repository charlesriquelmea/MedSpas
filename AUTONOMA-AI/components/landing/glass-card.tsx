import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md bg-white/5",
        "transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
