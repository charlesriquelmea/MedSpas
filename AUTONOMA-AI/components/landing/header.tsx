"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { language, setLanguage } = useLanguage()
  const t = landingContent[language].nav

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        
        {/* 1. IZQUIERDA: Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="font-mono text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent"
          >
            Autonoma.ai
          </Link>
        </div>

        {/* 2. CENTRO: Navegación */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#architecture" className="text-sm text-muted-foreground hover:text-white transition-colors">
            {t.architecture}
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">
            {t.pricing}
          </Link>
        </nav>

        {/* 3. DERECHA: Botón Redondo con Desplegable */}
        <div className="flex-1 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-black/20 text-white font-bold text-sm tracking-wider shadow-[0_0_12px_-2px_rgba(255,255,255,0.5)] hover:shadow-[0_0_15px_0px_rgba(255,255,255,0.7)] hover:bg-white/10 transition-all outline-none"
              >
                {language === "en" ? "EN" : "ES"}
              </button>
            </DropdownMenuTrigger>
            
            {/* align="end" alinea la caja a la derecha del botón, pero el texto va a la izquierda por defecto */}
            <DropdownMenuContent align="end" className="bg-black/90 border-white/20 text-white backdrop-blur-xl min-w-[8rem]">
              <DropdownMenuItem 
                onClick={() => setLanguage("es")}
                // Quitamos 'justify-center' para que quede a la izquierda
                className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white font-medium pl-3"
              >
                Español
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("en")}
                className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white font-medium pl-3"
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </motion.header>
  )
}