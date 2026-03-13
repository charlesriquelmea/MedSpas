"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  className?: string
  cursorColor?: string
}

export function TypewriterText({ text, className = "", cursorColor = "#22d3ee" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, 50) // Typing speed

    return () => clearInterval(timer)
  }, [text])

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, ease: "linear" }}
        style={{ color: cursorColor, display: "inline-block", marginLeft: "2px" }}
      >
        |
      </motion.span>
    </span>
  )
}
