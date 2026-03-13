"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  MessageSquare,
  Zap,
  ShoppingBag,
  TrendingDown,
  Package,
  CheckSquare,
  Square,
  Search,
  Plus,
  RotateCcw,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { landingContent } from "@/data/landing-content"

const MOCK_DATA = {
  kpis: {
    leadsHoy: 12,
    pipeline: 34,
    pipelineValue: 47200,
    tasaCierre: 28,
    ingresos: 8450,
    meta: 12000,
  },
  deals: [
    { name: "María González", canal: "WA", valor: "$850", estado: "Interesado", estadoColor: "blue" },
    { name: "Panadería Los Alpes", canal: "SMS", valor: "$450", estado: "Negociación", estadoColor: "amber" },
    { name: "Carlos Mendez", canal: "IG", valor: "$2,400", estado: "Propuesta env.", estadoColor: "purple" },
    { name: "Ana Torres", canal: "WA", valor: "$1,200", estado: "Contactado", estadoColor: "gray" },
  ],
  tasks: [
    "Enviar follow-up a Roberto V. (3 días sin respuesta)",
    "Confirmar cita con María G. — Jueves 2pm",
    "Actualizar precio en catálogo — servicio fotografía",
  ],
  conversations: [
    { initials: "MG", name: "María González", last: "Perfecto, ¿y el envío es...", time: "2m", canal: "WA", active: true },
    { initials: "PA", name: "Panadería Los Alpes", last: "Necesitamos 200 unidades p...", time: "15m", canal: "SMS", active: false },
    { initials: "CM", name: "Carlos Mendez", last: "El presupuesto que enviaron...", time: "1h", canal: "IG", active: false },
    { initials: "AT", name: "Ana Torres", last: "¿Tienen disponibilidad para...", time: "3h", canal: "WA", active: false },
  ],
  kanban: [
    {
      col: "Nuevo Lead",
      count: 4,
      value: "$3,200",
      borderColor: "#3B82F6",
      cards: [
        { name: "María G.", canal: "WA", valor: "$850", time: "hace 1 día" },
        { name: "Ferretería Vega", canal: "IG", valor: "$600", time: "hace 2 días" },
        { name: "Luis Herrera", canal: "SMS", valor: "$350", time: "hace 3 días" },
      ],
    },
    {
      col: "Interesado",
      count: 6,
      value: "$8,400",
      borderColor: "#F59E0B",
      cards: [
        { name: "Carlos M.", canal: "IG", valor: "$2,400", time: "hace 2 días" },
        { name: "Ana Torres", canal: "WA", valor: "$1,200", time: "hace 1 día" },
      ],
    },
    {
      col: "Propuesta",
      count: 3,
      value: "$5,800",
      borderColor: "#8B5CF6",
      cards: [
        { name: "Eventos Reyes", canal: "WA", valor: "$3,200", time: "hace 4 días" },
        { name: "Reforma Cocina", canal: "SMS", valor: "$2,600", time: "hace 5 días" },
      ],
    },
    {
      col: "Cerrado Ganado",
      count: 2,
      value: "$4,650",
      borderColor: "#00D084",
      cards: [
        { name: "Clínica Morales", canal: "WA", valor: "$2,400", time: "hace 2 días" },
        { name: "Bodega Don Pedro", canal: "IG", valor: "$2,250", time: "hace 3 días" },
      ],
    },
  ],
  orders: [
    { id: "#1042", cliente: "Panadería Los Alpes", desc: "200 panes artesanales", valor: "$450", estado: "En preparación", estadoColor: "amber", fecha: "Hoy" },
    { id: "#1041", cliente: "María González", desc: "Sesión fotográfica quinc.", valor: "$850", estado: "Confirmado", estadoColor: "blue", fecha: "Mañana" },
    { id: "#1040", cliente: "Clínica Morales", desc: "Papelería corporativa x500", valor: "$320", estado: "Enviado", estadoColor: "purple", fecha: "Ayer" },
    { id: "#1039", cliente: "Eventos Reyes", desc: "Decoración boda completa", valor: "$1,800", estado: "Entregado", estadoColor: "green", fecha: "Mar 8" },
    { id: "#1038", cliente: "Luis Herrera", desc: "Instalación eléctrica", valor: "$650", estado: "Cancelado", estadoColor: "red", fecha: "—" },
  ],
  lostReasons: [
    { label: "Precio muy alto", pct: 34, color: "#EF4444" },
    { label: "Sin respuesta (follow-up)", pct: 28, color: "#F59E0B" },
    { label: "Eligió competencia", pct: 18, color: "#A1A1AA" },
    { label: "No era el momento", pct: 12, color: "#A1A1AA" },
    { label: "No entendió el servicio", pct: 8, color: "#A1A1AA" },
  ],
  aiInsights: [
    "67% de los deals perdidos en 'Propuesta' no recibieron follow-up en 48 hrs.",
    "El canal Instagram tiene 2x más abandono que WhatsApp en etapa inicial.",
    "Leads de Lunes tienen 40% menos tasa de cierre — considera cambiar tu script.",
  ],
  lostDeals: [
    { prospecto: "Roberto Vega", valor: "$3,800", razon: "Precio alto", fecha: "Hace 3 días" },
    { prospecto: "Sandra Reyes", valor: "$1,100", razon: "Sin respuesta", fecha: "Hace 5 días" },
    { prospecto: "Imprenta Cruz", valor: "$600", razon: "Competencia", fecha: "Hace 8 días" },
  ],
  services: [
    { nombre: "Sesión Fotográfica", precio: "$850", aiOn: true, estado: "Activo" },
    { nombre: "Video Quinceañera", precio: "$1,400", aiOn: true, estado: "Activo" },
    { nombre: "Cobertura Boda", precio: "$3,200", aiOn: true, estado: "Activo" },
    { nombre: "Mini Sesión", precio: "$350", aiOn: true, estado: "Activo" },
    { nombre: "Edición Adicional", precio: "$150", aiOn: false, estado: "Pausado" },
    { nombre: "Sesión Corporativa", precio: "$600", aiOn: true, estado: "Activo" },
  ],
}

const TAB_ICONS = [
  { id: "resumen", icon: LayoutDashboard },
  { id: "bandeja", icon: MessageSquare },
  { id: "pipeline", icon: Zap },
  { id: "pedidos", icon: ShoppingBag },
  { id: "perdidos", icon: TrendingDown },
  { id: "catalogo", icon: Package },
]

const estadoBadge: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  amber: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  purple: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  gray: "bg-white/10 text-[#A1A1AA] border border-white/10",
  green: "bg-[#00D084]/20 text-[#00D084] border border-[#00D084]/30",
  red: "bg-red-500/20 text-red-400 border border-red-500/30",
}

// ─── Tab content components ────────────────────────────────────────────────

function TabResumen() {
  const { language } = useLanguage()
  const t = landingContent[language].dashboardPreview
  const d = MOCK_DATA
  const progressPct = Math.round((d.kpis.ingresos / d.kpis.meta) * 100)
  const sparkBars = [30, 45, 35, 60, 50, 70, 80]

  return (
    <div className="space-y-6">
      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1E] rounded-xl p-4 border border-[#27272A]">
          <p className="text-xs text-[#A1A1AA] mb-1">{t.kpis.leadsToday}</p>
          <p className="text-2xl font-bold text-[#FAFAFA]">{d.kpis.leadsHoy}</p>
          <span className="text-xs text-[#00D084]">{t.kpis.improvedOverYesterday}</span>
        </div>
        <div className="bg-[#1A1A1E] rounded-xl p-4 border border-[#27272A]">
          <p className="text-xs text-[#A1A1AA] mb-1">{t.kpis.inPipeline}</p>
          <p className="text-2xl font-bold text-[#FAFAFA]">{d.kpis.pipeline}</p>
          <span className="text-xs text-[#A1A1AA]">${d.kpis.pipelineValue.toLocaleString()} {t.kpis.inDeals}</span>
        </div>
        <div className="bg-[#1A1A1E] rounded-xl p-4 border border-[#27272A]">
          <p className="text-xs text-[#A1A1AA] mb-1">{t.kpis.closeRate}</p>
          <p className="text-2xl font-bold text-[#FAFAFA]">{d.kpis.tasaCierre}%</p>
          <div className="flex gap-0.5 items-end mt-1 h-4">
            {sparkBars.map((h, i) => (
              <div key={i} className="flex-1 bg-[#3B82F6]/60 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="bg-[#1A1A1E] rounded-xl p-4 border border-[#27272A]">
          <p className="text-xs text-[#A1A1AA] mb-1">{t.kpis.monthlyRevenue}</p>
          <p className="text-2xl font-bold text-[#FAFAFA]">${d.kpis.ingresos.toLocaleString()}</p>
          <div className="w-full bg-[#27272A] rounded-full h-1.5 mt-2">
            <div className="h-full bg-[#00D084] rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-[10px] text-[#A1A1AA] mt-1">{t.kpis.goalLabel} ${d.kpis.meta.toLocaleString()}</p>
        </div>
      </div>

      {/* Top deals */}
      <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#27272A]">
          <p className="text-sm font-semibold text-[#FAFAFA]">{t.topDeals.title}</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-[#A1A1AA] border-b border-[#27272A]">
              <th className="text-left px-4 py-2 font-normal">Prospecto</th>
              <th className="text-left px-4 py-2 font-normal">Canal</th>
              <th className="text-left px-4 py-2 font-normal">Valor</th>
              <th className="text-left px-4 py-2 font-normal">Estado</th>
            </tr>
          </thead>
          <tbody>
            {d.deals.map((deal, i) => (
              <tr key={i} className="border-b border-[#27272A] last:border-0 hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 text-[#FAFAFA]">{deal.name}</td>
                <td className="px-4 py-2.5 text-[#A1A1AA] text-xs">{deal.canal}</td>
                <td className="px-4 py-2.5 text-[#00D084] font-medium text-xs">{deal.valor}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${estadoBadge[deal.estadoColor]}`}>{deal.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending tasks */}
      <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] p-4">
        <p className="text-sm font-semibold text-[#FAFAFA] mb-3">{t.tasks.title}</p>
        <div className="space-y-2">
          {d.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
              <Square className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#27272A]" />
              {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabBandeja() {
  const { language } = useLanguage()
  const t = landingContent[language].dashboardPreview
  const convs = MOCK_DATA.conversations
  const [active, setActive] = useState(0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-0 rounded-xl border border-[#27272A] overflow-hidden bg-[#1A1A1E]" style={{ minHeight: 420 }}>
      {/* Left: list */}
      <div className="border-r border-[#27272A]">
        {convs.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-full text-left px-4 py-3 border-b border-[#27272A] last:border-0 transition-colors ${active === i ? "bg-[#111113]" : "hover:bg-white/[0.03]"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center text-xs font-bold text-[#3B82F6] flex-shrink-0">
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-xs font-medium text-[#FAFAFA] truncate">{c.name}</p>
                  <span className="text-[10px] text-[#A1A1AA] ml-1">{c.time}</span>
                </div>
                <p className="text-[10px] text-[#A1A1AA] truncate">{c.last}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Right: chat */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#27272A]">
          <p className="text-sm font-semibold text-[#FAFAFA]">{convs[active].name}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#00D084]/10 text-[#00D084] border border-[#00D084]/20">{convs[active].canal}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#00D084]/10 text-[#00D084] border border-[#00D084]/20">{t.aiActive}</span>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {active === 0 ? (
            <>
              <div className="flex justify-start">
                <div className="bg-[#27272A] rounded-lg px-3 py-2 text-xs text-[#FAFAFA] max-w-[80%]">Hola, vi su anuncio sobre sesiones de fotos para quinceañeras</div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#111113] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-[#FAFAFA] max-w-[80%]">
                  <span className="text-[#00D084] font-semibold mr-1 text-[10px]">AI</span>
                  ¡Hola María! Con gusto te cuento. Tenemos disponibilidad para quinceañeras en marzo y abril. ¿Cuántas personas serían en la sesión?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#27272A] rounded-lg px-3 py-2 text-xs text-[#FAFAFA] max-w-[80%]">Serían como 15 personas, ¿cuánto costaría?</div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-[#A1A1AA] italic">{t.conversationPlaceholder}</p>
            </div>
          )}
        </div>
        <div className="p-3 border-t border-[#27272A] flex gap-2">
          <div className="flex-1 bg-[#0A0A0B] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-[#A1A1AA] cursor-not-allowed">{t.tasks.placeholder}</div>
          <button className="px-3 py-2 rounded-lg bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] text-xs font-medium">{t.tasks.replyButton}</button>
          <button className="px-3 py-2 rounded-lg bg-white/5 border border-[#27272A] text-[#A1A1AA] text-xs">{t.tasks.manualButton}</button>
        </div>
      </div>
    </div>
  )
}

function TabPipeline() {
  const cols = MOCK_DATA.kanban

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto">
      {cols.map((col, ci) => (
        <div key={ci} className="bg-[#1A1A1E] rounded-xl border border-[#27272A] overflow-hidden min-w-[180px]">
          <div className="px-3 py-2.5 border-b-2 border-[#27272A]" style={{ borderTopColor: col.borderColor, borderTopWidth: 2 }}>
            <p className="text-xs font-semibold text-[#FAFAFA]">{col.col}</p>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[10px] text-[#A1A1AA]">{col.count} {t.pipeline.leadsLabel}</span>
              <span className="text-[10px] font-medium text-[#00D084]">{col.value}</span>
            </div>
          </div>
          <div className="p-2 space-y-2">
            {col.cards.map((card, ki) => (
              <div key={ki} className="bg-[#0A0A0B] rounded-lg p-2.5 border border-[#27272A] hover:border-white/20 transition-colors">
                <p className="text-xs font-medium text-[#FAFAFA] mb-1">{card.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#00D084] font-semibold">{card.valor}</span>
                  <span className="text-[10px] text-[#A1A1AA]">{card.canal}</span>
                </div>
                <p className="text-[10px] text-[#A1A1AA] mt-1">{card.time}</p>
              </div>
            ))}
            {col.count > col.cards.length && (
              <p className="text-[10px] text-[#A1A1AA] text-center py-1">+ {col.count - col.cards.length} {t.pipeline.moreLabel}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function TabPedidos() {
  const { language } = useLanguage()
  const t = landingContent[language].dashboardPreview
  const orders = MOCK_DATA.orders

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {t.orders.kpiLabels.map((kpi, i) => (
          <div key={i} className="bg-[#1A1A1E] rounded-xl p-4 border border-[#27272A]">
            <p className="text-xs text-[#A1A1AA] mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-[#FAFAFA]">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-[#A1A1AA] border-b border-[#27272A]">
              <th className="text-left px-4 py-2 font-normal">{t.orders.labels.id}</th>
              <th className="text-left px-4 py-2 font-normal">{t.orders.labels.client}</th>
              <th className="text-left px-4 py-2 font-normal hidden md:table-cell">{t.orders.labels.description}</th>
              <th className="text-left px-4 py-2 font-normal">{t.orders.labels.value}</th>
              <th className="text-left px-4 py-2 font-normal">{t.orders.labels.status}</th>
              <th className="text-left px-4 py-2 font-normal hidden md:table-cell">{t.orders.labels.date}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-b border-[#27272A] last:border-0 hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 text-xs text-[#A1A1AA] font-mono">{o.id}</td>
                <td className="px-4 py-2.5 text-xs text-[#FAFAFA]">{o.cliente}</td>
                <td className="px-4 py-2.5 text-xs text-[#A1A1AA] hidden md:table-cell">{o.desc}</td>
                <td className="px-4 py-2.5 text-xs text-[#00D084] font-medium">{o.valor}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${estadoBadge[o.estadoColor]}`}>{o.estado}</span>
                </td>
                <td className="px-4 py-2.5 text-xs text-[#A1A1AA] hidden md:table-cell">{o.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TabPerdidos() {
  const { language } = useLanguage()
  const t = landingContent[language].dashboardPreview
  const reasons = MOCK_DATA.lostReasons
  const insights = MOCK_DATA.aiInsights
  const lost = MOCK_DATA.lostDeals

  return (
    <div className="space-y-4">
      {/* Top: reasons + insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Reasons bars */}
        <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] p-4">
          <p className="text-sm font-semibold text-[#FAFAFA] mb-4">{t.lostReasonsTitle}</p>
          <div className="space-y-3">
            {reasons.map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#A1A1AA]">{r.label}</span>
                  <span className="font-medium text-[#FAFAFA]">{r.pct}%</span>
                </div>
                <div className="w-full bg-[#27272A] rounded-full h-1.5">
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] p-4">
          <p className="text-sm font-semibold text-[#FAFAFA] mb-4">{t.insightsTitle}</p>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#F59E0B]/5 border border-[#F59E0B]/30">
                <p className="text-xs text-[#FAFAFA] leading-relaxed">
                  <span className="text-[#F59E0B] font-bold mr-1">!</span>
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lost deals table */}
      <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#27272A]">
          <p className="text-sm font-semibold text-[#FAFAFA]">{t.lostDealsTitle}</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-[#A1A1AA] border-b border-[#27272A]">
              <th className="text-left px-4 py-2 font-normal">Prospecto</th>
              <th className="text-left px-4 py-2 font-normal">Valor perdido</th>
              <th className="text-left px-4 py-2 font-normal hidden md:table-cell">Razón (AI)</th>
              <th className="text-left px-4 py-2 font-normal hidden md:table-cell">Fecha</th>
              <th className="text-left px-4 py-2 font-normal">Acción</th>
            </tr>
          </thead>
          <tbody>
            {lost.map((d, i) => (
              <tr key={i} className="border-b border-[#27272A] last:border-0 hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 text-xs text-[#FAFAFA]">{d.prospecto}</td>
                <td className="px-4 py-2.5 text-xs text-[#EF4444] font-medium">{d.valor}</td>
                <td className="px-4 py-2.5 text-xs text-[#A1A1AA] hidden md:table-cell">{d.razon}</td>
                <td className="px-4 py-2.5 text-xs text-[#A1A1AA] hidden md:table-cell">{d.fecha}</td>
                <td className="px-4 py-2.5">
                  <button className="text-xs px-2 py-1 rounded-md bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] hover:bg-[#00D084]/20 transition-colors">
                    {t.lostDeals.reactivateButton}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TabCatalogo() {
  const services = MOCK_DATA.services

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#1A1A1E] border border-[#27272A] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-[#A1A1AA]" />
          <span className="text-xs text-[#A1A1AA]">{t.catalog.searchPlaceholder}</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D084] text-black text-xs font-semibold hover:bg-[#00D084]/90 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          {t.catalog.addServiceButton}
        </button>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((s, i) => (
          <div key={i} className="bg-[#1A1A1E] rounded-xl border border-[#27272A] p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-[#FAFAFA]">{s.nombre}</p>
                <p className="text-lg font-bold text-[#00D084]">{s.precio}</p>
              </div>
              {/* Toggle mock */}
              <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${s.aiOn ? "bg-[#00D084]" : "bg-[#27272A]"}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${s.aiOn ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#A1A1AA]">{t.catalog.toggleAILabel}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.estado === "Activo" ? estadoBadge.green : "bg-white/10 text-[#A1A1AA] border border-white/10"}`}>
                {s.estado}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI instructions */}
      <div className="bg-[#1A1A1E] rounded-xl border border-[#27272A] p-4">
        <p className="text-sm font-semibold text-[#FAFAFA] mb-3">{t.catalog.instructionsTitle}</p>
        <textarea
          readOnly
          className="w-full bg-[#0A0A0B] border border-[#27272A] rounded-lg p-3 text-xs text-[#A1A1AA] resize-none focus:outline-none"
          rows={3}
          defaultValue={t.catalog.instructionsText}
        />
      </div>
    </div>
  )
}


// ─── Main component ────────────────────────────────────────────────────────

export function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState("resumen")
  const { language } = useLanguage()
  const t = landingContent[language].workflowVisual

  const tabContent: Record<string, React.ReactNode> = {
    resumen: <TabResumen />,
    bandeja: <TabBandeja />,
    pipeline: <TabPipeline />,
    pedidos: <TabPedidos />,
    perdidos: <TabPerdidos />,
    catalogo: <TabCatalogo />,
  }

  return (
    <section id="crm-pipeline" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
          <span className="text-xs font-medium text-[#00D084] uppercase tracking-widest">{t.panelTitle}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-3 text-balance"
        >
          {}{/* TODO: audio  7 */}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[#A1A1AA] text-lg mb-10 max-w-2xl"
        >
          {t.headerDescription}
        </motion.p>

        {/* Tab container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#0A0A0B] rounded-2xl border border-[#27272A] overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-[#27272A] bg-[#111113]">
            {TAB_ICONS.map((tab) => {
              const isActive = activeTab === tab.id
              /* const translatedTab = t.tabs.find((tt) => tt.id === tab.id) */
              /* const label = translatedTab?.label ?? tab.id */
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 border-b-2 ${isActive
                      ? "bg-[#1A1A1E] text-[#FAFAFA] border-[#00D084]"
                      : "text-[#A1A1AA] border-transparent hover:text-[#FAFAFA]"
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {/* {label} */}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div className="p-5" style={{ minHeight: 420 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
