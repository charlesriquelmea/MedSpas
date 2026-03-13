"use client"

import Link from "next/link"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function Footer() {
  // 2. Obtenemos idioma y textos
  const { language } = useLanguage()
  const t = landingContent[language].footer

  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Logo + Tagline */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-mono text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent"
            >
              Autonoma.ai
            </Link>
            <p className="text-sm text-gray-500 mt-2">{t.tagline}</p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {t.links.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Built with badge */}
          <div className="text-sm text-gray-500">{t.builtWith}</div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          {t.copyright}
        </div>
      </div>
    </footer>
  )
}