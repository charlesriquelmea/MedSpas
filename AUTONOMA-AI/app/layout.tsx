import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"

// Configuración de fuentes
const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Configuración de Metadatos (SEO y Redes Sociales)
export const metadata: Metadata = {
  metadataBase: new URL("https://autonoma.ai.protolylat.com"),

  // 1. Título de la pestaña
  title: "AI Sales Concierge | Autonoma",
  
  // 2. Descripción para Google
  description:
    "AI Sales Concierge: Stop Chasing Leads. Book Qualified Meetings 24/7 With AI Engine (Rag/Embedding).",
  
  generator: "v0.app",
  keywords: [
    "AI Chatbot",
    "Sales Automation",
    "n8n",
    "CRM Integration",
    "Lead Generation",
    "B2B SaaS",
    "Sales Infrastructure",
  ],

  // 3. Open Graph (Para que se vea bien en WhatsApp, LinkedIn, Facebook)
  openGraph: {
    title: "AI Sales Concierge:",
    description: "Stop Chasing Leads. Book Qualified Meetings 24/7 With AI Engine (Rag/Embedding).",
    url: "https://autonoma.ai.protolylat.com/", 
    siteName: "Autonoma",
    images: [
      {
        url: '/logo-whatsapp.png',
        // 👇 CAMBIO: Definimos tamaño pequeño y cuadrado explícitamente
        width: 300, 
        height: 300,
        alt: "AI Sales Concierge Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 4. Twitter Card
  twitter: {
    card: "summary", // Esto ya estaba bien para Twitter
    title: "AI Sales Concierge:",
    description: "Stop Chasing Leads. Book Qualified Meetings 24/7 With AI Engine (Rag/Embedding).",
    images: ["/logo-whatsapp.png"],
  },

  // 5. Iconos del navegador (Favicon)
  icons: {
    icon: '/logo-whatsapp.png',
    apple: '/logo-whatsapp.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}