import type { ReactNode } from "react"

interface AnimatedGradientTextProps {
  children: ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className = "" }: AnimatedGradientTextProps) {
  return (
    <span className={`bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}
