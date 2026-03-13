"use client"
import { Cpu, Zap, MessageCircle } from "lucide-react"
// 1. Importamos hook y contenido
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

export function OpenAITechnology() {
  // 2. Obtenemos textos
  const { language } = useLanguage()
  const t = landingContent[language].tech

  // Definimos los iconos en orden para mapearlos con los datos traducidos
  const icons = [Zap, Cpu, MessageCircle]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl font-bold">
              {t.title} <span className="text-emerald-400">{t.highlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.description}
            </p>

            <div className="space-y-6">
              {t.models.map((item: any, idx: number) => {
                const Icon = icons[idx] // Asignamos el icono correspondiente al índice
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{t.chatkit.title}</h3>
                <p className="text-muted-foreground">{t.chatkit.subtitle}</p>
              </div>

              <ul className="space-y-3">
                {t.chatkit.list.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}