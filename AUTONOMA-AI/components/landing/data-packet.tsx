"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface DataPacketProps {
  startDelay?: number
  pathId: string
}

export function DataPacket({ startDelay = 0, pathId }: DataPacketProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)

      // Loop the animation
      const interval = setInterval(() => {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 100)
      }, 2800)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [startDelay])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.8, ease: "easeInOut" }}
          className="absolute"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50"
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            transition={{
              duration: 2.8,
              ease: "easeInOut",
            }}
            style={{
              offsetPath: `path('${pathId}')`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
