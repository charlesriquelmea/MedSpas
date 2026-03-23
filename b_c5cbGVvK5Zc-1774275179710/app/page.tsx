"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion"
import {
  Zap, MessageSquare, Database, CreditCard, GitMerge,
  PhoneCall, ShieldCheck, Lock, FileText, BarChart2,
  Star, ArrowRight, Check, ChevronDown, Menu, X,
  Mic, Bot, ExternalLink, Phone,
  CheckCircle2
} from "lucide-react"
import CRMDemoSection from "@/components/CRMDemoSection"

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const fadeUpStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

const slideRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

// ─── I18N CONTENT ────────────────────────────────────────────────────────────
const content = {
  es: {
    lang: "ES",
    langAlt: "EN",
    nav: {
      links: ["Producto", "Cómo funciona", "Precios", "HIPAA"],
      demo: "Ver demo",
      cta: "Reservar cupo →",
    },
    hero: {
      badge: "Ahora disponible en NY & NJ · HIPAA-Compliant · Quedan 2 cupos",
      line1: "Mientras tu recepcionista duerme,",
      line2: "tu MedSpa sigue",
      phrases: [
        "cerrando citas.",
        "cobrando depósitos.",
        "calificando leads.",
        "agendando pacientes.",
        "generando revenue.",
      ],
      sub: "AI Receptionist 2.0 responde en 5 segundos, habla español o inglés, cobra el depósito vía Stripe y sincroniza con GoHighLevel — sin que tu equipo toque nada.",
      primaryCta: "Activar mi SDR Clínico →",
      secondaryCta: "Ver cómo funciona",
      badges: [
        "HIPAA Compliant",
        "AES-256 Encrypted",
        "BAA Firmado",
        "<800ms Latencia",
      ],
      chatHeader: "receptor.ai · WhatsApp Business",
      online: "En línea",
      msgs: [
        { side: "user", text: "Precio de relleno de labios? 💉", time: "11:47 PM" },
        { side: "ai", text: "¡Hola María! 😊 El relleno de ácido hialurónico está en $450. ¿Tienes alguna condición de piel que deba conocer?" },
        { side: "user", text: "Tengo rosácea ¿es seguro?", time: "11:48 PM" },
        { side: "ai", text: "Sí, el HA es seguro para rosácea según nuestro protocolo Allergan ✓. Tengo disponibilidad el sábado 11 AM. ¿Aseguro tu lugar con depósito ($75)?" },
        { side: "user", text: "Sí, mándamelo 🙌", time: "11:49 PM" },
        { side: "ai", text: "¡Perfecto! Aquí tu link de pago seguro:", payment: true },
      ],
      statusBar: "✓ Cita confirmada · Boulevard API · Respondido en 4.8 seg",
    },
    stats: [
      { number: 5, suffix: "seg", label: "Tiempo de respuesta al lead", sub: "vs. 4-8 hrs del staff", prefix: "<" },
      { number: 8, suffix: "%", label: "Tasa de no-shows", sub: "vs. 35% promedio", prefix: "<" },
      { number: 800, suffix: "ms", label: "Latencia de voz E2E", sub: "STT → LLM → TTS", prefix: "<" },
      { number: 0, suffix: "/mes", label: "Suscripción mensual", sub: "Solo pagas por citas efectivizadas", prefix: "$" },
    ],
    how: {
      title: "De clic en el ad a depósito cobrado",
      sub: "En menos de 10 minutos. Sin intervención humana.",
      steps: [
        { icon: Zap, time: "Minuto 0", title: "El lead hace clic", desc: "El usuario ve tu ad en Instagram. Envía un DM. El sistema detecta canal e idioma en 3 palabras.", tech: "Meta Webhooks · NLP · Intent Classification" },
        { icon: MessageSquare, time: "<5 seg", title: "Respuesta instantánea", desc: "El agente responde con el nombre del lead, hace triaje clínico y extrae intención: tratamiento, disponibilidad, contraindicaciones.", tech: "GPT-4o · RAG Pipeline" },
        { icon: Database, time: "Minuto 2", title: "Triaje clínico con RAG", desc: "Pinecone consulta tu base: protocolos Allergan, precios, contraindicaciones. El bot responde como tu mejor patient coordinator.", tech: "Pinecone · text-embedding-3-small" },
        { icon: CreditCard, time: "Minuto 5", title: "Depósito cobrado antes de bloquear el slot", desc: "Disponibilidad real (TTL 30s). Link de Stripe Health. El slot se bloquea solo cuando el webhook de pago confirma.", tech: "Stripe Health · Boulevard API · Webhooks" },
        { icon: GitMerge, time: "Pago ✓", title: "Todo sincronizado automáticamente", desc: "Ficha del paciente creada, ad attribution etiquetada (Ad_Campaign_NJ_Botox), notas de conversación, automatizaciones HIPAA.", tech: "GoHighLevel v2 · Boulevard · n8n" },
        { icon: PhoneCall, time: "Día -1", title: "Voice AI retiene al paciente", desc: "Si el paciente cancela por SMS, el sistema dispara una llamada saliente. El Voice AI ofrece reprogramar protegiendo el depósito.", tech: "LiveKit WebRTC · Telnyx SIP · ElevenLabs" },
      ],
    },
    bento: {
      title: "Todo el stack. Cero riesgo.",
      sub: "Valor técnico $7,000+. Pagas solo cuando un paciente cruza tu puerta.",
      cardA: {
        title: "Voice + Text AI Bilingüe",
        body: "Latencia E2E <800ms. Español, inglés o Spanglish sin reiniciar contexto. Detecta idioma en primeros 3 tokens.",
        badges: ["<800ms E2E", "Español/English", "Spanglish OK", "WhatsApp + Phone"],
      },
      cardB: { title: "RAG Clínico con Pinecone", body: "Indexamos tus protocolos Allergan/Cynosure. El bot actúa como tu mejor patient coordinator." },
      cardC: { title: "CRM Sync Bidireccional", body: "API v2 de GoHighLevel y Boulevard. Cada cita, nota y atribución de ad sincronizada automáticamente." },
      bonus1: { badge: "BONO #1", title: "Clinical KB Setup", value: "$2,500 valor incluido", desc: "Indexamos tu base completa en 72h." },
      setupTitle: "Qué incluye el setup",
      setupItems: [
        "Indexación RAG completa — servicios, precios, protocolos, FAQ",
        "Configuración de canales activos",
        "Personalización del agente: tono, idioma, nombre y personalidad",
        "Testing end-to-end antes del go-live",
        "Go-live asistido por nuestro equipo",
      ],
      includesTitle: "Qué incluye el plan",
      includesItems: [
        "Agente omnicanal — Web Chat + WhatsApp + Instagram DM",
        "RAG Clínico — protocolos, servicios, FAQ indexados",
        "CRM con dashboard de métricas, Pipeline y conversiones",
        "Booking Loop — Appointment Setter + Cobro con Stripe",
        "CRM Sync bidireccional",
        "Bilingüe nativo (Español / Inglés)",
        "Soporte técnico invisible — tu cliente solo ve tu marca",
        "Updates y mejoras continuas sin costo adicional",
        "Deploy, monitoring y operación 24/7",
      ],
    },
    voiceAddon: {
      eyebrow: "Add-on opcional",
      title: "Voice + Text AI Bilingüe",
      subtitle: "Latencia E2E <800ms. Español, inglés o Spanglish sin reiniciar contexto. Detecta idioma en primeros 3 tokens.",
      setupLabel: "Setup",
      setupPrice: "desde $1,190",
      retainerLabel: "Retainer mensual",
      retainerPrice: "$397",
      includes: [
        "Llamadas salientes automáticas — seguimiento, retención y recordatorios",
        "Mismo entrenamiento y base de conocimiento que el agente web",
        "Bilingüe nativo: Español, Inglés o Spanglish sin reiniciar contexto",
      ],
      cta: "Agregar Voice AI →",
    },
    pricing: {
      leftTitle: "Lo que ya estás pagando",
      costs: [
        { label: "Recepcionista bilingüe NJ", value: "$3,200/mes" },
        { label: "Revenue perdido por no-shows", value: "$4,000-8,000/mes" },
        { label: "Leads perdidos fuera de horario", value: "Incontable" },
      ],
      totalLabel: "Costo de no actuar:",
      totalValue: "$7,000–11,000/mes",
      badge: "Precio de Lanzamiento",
      setupLabel: "Setup único:",
      setupPrice: "$1,590",
      setupSub: "usd · pago único · hasta en 2 cuotas (50% al comenzar, 50% al entregar)",
      divider: "o",
      opLabel: "Por cita efectivizada:",
      opPrice: "$30",
      opSub: "usd · solo pagas si el paciente llega",
      retainerLabel: "Retainer mensual",
      retainerPrice: "$597",
      checklist: [
        "RAG clínico Pinecone Enterprise",
        "Integración GHL v2 + Boulevard API",
        "Cobro depósito automático Stripe Health",
        "HIPAA: BAA + AES-256 + Zero-Retention",
        "Onboarding done-for-you 72h",
      ],
      scarcityTitle: "⚡ Cupos técnicos este mes",
      scarcityTaken: "4 de 6 tomados",
      guarantee: "Garantía de 60 días: Si no efectivizamos 30 citas, devolvemos tu $1,590 completo. Te quedas con toda la configuración.",
      cta: "Reservar mi cupo de onboarding →",
      ctaSub: "Sin suscripción. Sin riesgo. Activo en 72 horas.",
    },
    social: {
      title: "Lo que dicen los MedSpas que ya lo usan",
      reviews: [
        { name: "Carolina M.", role: "Owner · Glow MedSpa · Jersey City, NJ", text: "En el primer mes cerramos 47 citas a través de Instagram. Antes respondíamos manualmente y perdíamos el 60% de los leads nocturnos. Ahora el bot trabaja mientras dormimos.", stars: 5 },
        { name: "Dr. Rafael S.", role: "Medical Director · Prestige Aesthetics · Manhattan, NY", text: "La integración con GoHighLevel es perfecta. Cada paciente queda etiquetado con la campaña exacta de Meta Ads. Finalmente sé qué ads funcionan.", stars: 5 },
        { name: "Valentina C.", role: "Spa Director · Elite Beauty · Hoboken, NJ", text: "Los no-shows bajaron del 34% al 6% en 6 semanas gracias al Voice Recovery Protocol. El ROI se pagó en la primera semana.", stars: 5 },
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Funciona con GoHighLevel, Boulevard o CRM propio con Pipeline Sales, Bandeja de entrada y Actividades?", a: "Sí. Integración nativa bidireccional con la API v2 de GoHighLevel, Boulevard y CRMs personalizados. Sincroniza Pipeline Sales, Bandeja de entrada y Actividades automáticamente." },
        { q: "¿Es realmente HIPAA-compliant?", a: "Todos los proveedores (AWS, Pinecone Enterprise, Azure OpenAI, LiveKit Enterprise) firman BAA. PHI encriptado AES-256 en reposo, TLS 1.3 en tránsito. Transcripciones en EMR, purgadas del bot en 24h." },
        { q: "¿El bot suena robótico?", a: "No. Arquitectura LiveKit + Telnyx + TTS Enterprise con latencia E2E <800ms. Los pacientes generalmente no detectan que hablan con IA." },
        { q: "¿Qué pasa si quiero cancelar?", a: "Sin contrato de permanencia. Si en 60 días no efectivizamos 30 citas, devolvemos el setup fee completo y te quedas la configuración. Fuera del periodo, aviso de 30 días." },
        { q: "¿Cuánto tarda el setup?", a: "5 a 7 días hábiles desde el pago. Nuestro equipo configura todo: indexa tu knowledge base en Pinecone, conecta las APIs de tu CRM, y prueba las conversaciones antes de activar en producción." },
      ],
    },
    finalCta: {
      eyebrow: "¿Listo para automatizar tu revenue?",
      headline: "Tu agenda no debería depender de cuándo duerme tu recepcionista.",
      sub: "Únete a los MedSpas de NY y NJ que ya tienen su SDR Clínico activo.",
      primary: "Activar mi SDR Clínico →",
      ghost: "Hablar con el equipo",
    },
    modal: {
      stepIndicator: (s: number, total: number) => `0${s + 1} / 0${total}`,
      welcome: {
        title: "¡Hola! Vamos a activar tu SDR Clínico.",
        sub: "Toma menos de 2 minutos. Configuramos todo nosotros.",
        cta: "Empezar →",
      },
      steps: [
        {
          question: "¿Qué sistema usas actualmente en tu MedSpa?",
          hint: "Presiona Enter para continuar",
          options: ["GoHighLevel", "Boulevard", "Jane App", "Mindbody", "Ninguno / Otro"],
          key: "crm",
        },
        {
          question: "¿Cuántos leads o consultas recibes por mes?",
          hint: "Presiona Enter para continuar",
          options: ["Menos de 50", "50–150 leads", "150–500 leads", "Más de 500 leads"],
          key: "volume",
        },
        {
          question: "¿Cuál es tu mayor problema hoy?",
          hint: "Presiona Enter para continuar",
          options: ["Leads sin responder fuera de horario", "Alta tasa de no-shows", "Staff sobrecargado con admin", "No sé de dónde vienen mis pacientes"],
          key: "pain",
        },
        {
          question: "Casi listo. ¿A dónde te enviamos la propuesta?",
          hint: "Responde aquí...",
          fields: [
            { placeholder: "Tu nombre", type: "text", key: "name" },
            { placeholder: "Nombre de tu MedSpa o clínica", type: "text", key: "business" },
            { placeholder: "WhatsApp (+1...)", type: "tel", key: "phone" },
            { placeholder: "tu@email.com", type: "email", key: "email" },
          ],
        },
      ],
      success: {
        title: "¡Solicitud recibida!",
        sub: "Nuestro equipo se contacta en menos de 2 horas por WhatsApp.",
        summaryLabels: { crm: "CRM:", volume: "Leads/mes:", pain: "Problema:" },
        close: "Cerrar",
      },
      back: "Atrás",
      next: "Continuar",
      submit: "Enviar solicitud ✓",
    },
    footer: {
      tagline: "SDR Clínico Autónomo para MedSpas",
      compliance: ["HIPAA Compliant", "BAA Firmado", "SOC 2 Eligible"],
      col2: { title: "Producto", links: ["Cómo funciona", "Stack técnico", "Precios", "HIPAA & Compliance", "Integraciones"] },
      col3: { title: "Empresa", links: ["Acerca de", "Blog", "Casos de uso", "Partner Program", "Contacto"] },
      col4: { title: "Legal", links: ["Términos de servicio", "Política de privacidad", "BAA Template", "HIPAA Notice"] },
      copy: "© 2025 Receptor AI · Todos los derechos reservados",
      powered: "Construido para MedSpas en NY & NJ · Powered by Protolylat",
    },
  },
  en: {
    lang: "EN",
    langAlt: "ES",
    nav: {
      links: ["Product", "How it works", "Pricing", "HIPAA"],
      demo: "View demo",
      cta: "Book a slot →",
    },
    hero: {
      badge: "Now available in NY & NJ · HIPAA-Compliant · 2 spots left",
      line1: "While your receptionist sleeps,",
      line2: "your MedSpa keeps",
      phrases: [
        "closing appointments.",
        "collecting deposits.",
        "qualifying leads.",
        "scheduling patients.",
        "generating revenue.",
      ],
      sub: "AI Receptionist 2.0 responds in 5 seconds, speaks Spanish or English, collects the deposit via Stripe and syncs with GoHighLevel — without your team touching anything.",
      primaryCta: "Activate my Clinical SDR →",
      secondaryCta: "See how it works",
      badges: [
        "HIPAA Compliant",
        "AES-256 Encrypted",
        "BAA Signed",
        "<800ms Latency",
      ],
      chatHeader: "receptor.ai · WhatsApp Business",
      online: "Online",
      msgs: [
        { side: "user", text: "Price for lip filler? 💉", time: "11:47 PM" },
        { side: "ai", text: "Hi Maria! 😊 Hyaluronic acid filler is $450. Do you have any skin conditions I should know about?" },
        { side: "user", text: "I have rosacea, is it safe?", time: "11:48 PM" },
        { side: "ai", text: "Yes, HA is safe for rosacea per our Allergan protocol ✓. I have availability Saturday 11 AM. Shall I secure your spot with a deposit ($75)?" },
        { side: "user", text: "Yes, send it! 🙌", time: "11:49 PM" },
        { side: "ai", text: "Perfect! Here's your secure payment link:", payment: true },
      ],
      statusBar: "✓ Appointment confirmed · Boulevard API · Responded in 4.8 sec",
    },
    stats: [
      { number: 5, suffix: "sec", label: "Lead response time", sub: "vs. 4-8 hrs from staff", prefix: "<" },
      { number: 8, suffix: "%", label: "No-show rate", sub: "vs. 35% average", prefix: "<" },
      { number: 800, suffix: "ms", label: "Voice E2E latency", sub: "STT → LLM → TTS", prefix: "<" },
      { number: 0, suffix: "/mo", label: "Monthly subscription", sub: "Only pay per appointment", prefix: "$" },
    ],
    how: {
      title: "From ad click to deposit collected",
      sub: "In less than 10 minutes. No human intervention.",
      steps: [
        { icon: Zap, time: "Minute 0", title: "Lead clicks the ad", desc: "User sees your Instagram ad. Sends a DM. System detects channel and language in 3 words.", tech: "Meta Webhooks · NLP · Intent Classification" },
        { icon: MessageSquare, time: "<5 sec", title: "Instant response", desc: "Agent replies with lead's name, performs clinical triage and extracts intent: treatment, availability, contraindications.", tech: "GPT-4o · RAG Pipeline" },
        { icon: Database, time: "Minute 2", title: "Clinical triage with RAG", desc: "Pinecone queries your base: Allergan protocols, pricing, contraindications. Bot responds like your best patient coordinator.", tech: "Pinecone · text-embedding-3-small" },
        { icon: CreditCard, time: "Minute 5", title: "Deposit collected before blocking the slot", desc: "Real availability (TTL 30s). Stripe Health link. Slot only blocked when payment webhook confirms.", tech: "Stripe Health · Boulevard API · Webhooks" },
        { icon: GitMerge, time: "Payment ✓", title: "Everything synced automatically", desc: "Patient record created, ad attribution tagged (Ad_Campaign_NJ_Botox), conversation notes, HIPAA automations.", tech: "GoHighLevel v2 · Boulevard · n8n" },
        { icon: PhoneCall, time: "Day -1", title: "Voice AI retains the patient", desc: "If patient cancels via SMS, system triggers an outbound call. Voice AI offers rescheduling protecting the deposit.", tech: "LiveKit WebRTC · Telnyx SIP · ElevenLabs" },
      ],
    },
    bento: {
      title: "Full stack. Zero risk.",
      sub: "Technical value $7,000+. You only pay when a patient walks through your door.",
      cardA: {
        title: "Bilingual Voice + Text AI",
        body: "E2E latency <800ms. Spanish, English or Spanglish without resetting context. Detects language in first 3 tokens.",
        badges: ["<800ms E2E", "Spanish/English", "Spanglish OK", "WhatsApp + Phone"],
      },
      cardB: { title: "Clinical RAG with Pinecone", body: "We index your Allergan/Cynosure protocols. Bot acts as your best patient coordinator." },
      cardC: { title: "Bidirectional CRM Sync", body: "GoHighLevel v2 and Boulevard API. Every appointment, note and ad attribution synced automatically." },
      bonus1: { badge: "BONUS #1", title: "Clinical KB Setup", value: "$2,500 value included", desc: "We index your full knowledge base in 72h." },
      setupTitle: "What's included in setup",
      setupItems: [
        "Full RAG indexing — services, pricing, protocols, FAQ",
        "Active channel configuration",
        "Agent customization: tone, language, name and personality",
        "End-to-end testing before go-live",
        "Assisted go-live by our team",
      ],
      includesTitle: "What's included in the plan",
      includesItems: [
        "Omnichannel agent — Web Chat + WhatsApp + Instagram DM",
        "Clinical RAG — protocols, services, FAQ indexed",
        "CRM with metrics dashboard, Pipeline and conversions",
        "Booking Loop — Appointment Setter + Stripe payments",
        "Bidirectional CRM Sync",
        "Native bilingual (Spanish / English)",
        "Invisible technical support — your client only sees your brand",
        "Continuous updates and improvements at no extra cost",
        "Deploy, monitoring and 24/7 operation",
      ],
    },
    voiceAddon: {
      eyebrow: "Optional add-on",
      title: "Bilingual Voice + Text AI",
      subtitle: "E2E latency <800ms. Spanish, English or Spanglish without resetting context. Detects language in first 3 tokens.",
      setupLabel: "Setup",
      setupPrice: "from $1,190",
      retainerLabel: "Monthly retainer",
      retainerPrice: "$397",
      includes: [
        "Automatic outbound calls — follow-up, retention and reminders",
        "Same training and knowledge base as the web agent",
        "Native bilingual: Spanish, English or Spanglish without resetting context",
      ],
      cta: "Add Voice AI →",
    },
    pricing: {
      leftTitle: "What you're already paying",
      costs: [
        { label: "Bilingual receptionist NJ", value: "$3,200/mo" },
        { label: "Revenue lost from no-shows", value: "$4,000-8,000/mo" },
        { label: "Leads lost after hours", value: "Uncountable" },
      ],
      totalLabel: "Cost of inaction:",
      totalValue: "$7,000–11,000/mo",
      badge: "Launch Price",
      setupLabel: "One-time setup:",
      setupPrice: "$1,590",
      setupSub: "usd · one-time · up to 2 installments (50% to start, 50% on delivery)",
      divider: "or",
      opLabel: "Per completed appointment:",
      opPrice: "$30",
      opSub: "usd · only pay when patient shows",
      retainerLabel: "Monthly retainer",
      retainerPrice: "$597",
      checklist: [
        "Clinical RAG Pinecone Enterprise",
        "GHL v2 + Boulevard API integration",
        "Automatic deposit collection Stripe Health",
        "HIPAA: BAA + AES-256 + Zero-Retention",
        "Done-for-you onboarding 72h",
      ],
      scarcityTitle: "⚡ Technical slots this month",
      scarcityTaken: "4 of 6 taken",
      guarantee: "60-day guarantee: If we don't complete 30 appointments, we refund your full $1,590. You keep the entire setup.",
      cta: "Reserve my onboarding slot →",
      ctaSub: "No subscription. No risk. Live in 72 hours.",
    },
    social: {
      title: "What MedSpas already using it say",
      reviews: [
        { name: "Carolina M.", role: "Owner · Glow MedSpa · Jersey City, NJ", text: "In the first month we closed 47 appointments through Instagram. Before, we responded manually and lost 60% of after-hours leads. Now the bot works while we sleep.", stars: 5 },
        { name: "Dr. Rafael S.", role: "Medical Director · Prestige Aesthetics · Manhattan, NY", text: "The GoHighLevel integration is perfect. Every patient is tagged with the exact Meta Ads campaign. I finally know which ads work.", stars: 5 },
        { name: "Valentina C.", role: "Spa Director · Elite Beauty · Hoboken, NJ", text: "No-shows dropped from 34% to 6% in 6 weeks thanks to the Voice Recovery Protocol. The ROI paid off in the first week.", stars: 5 },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Does it work with GoHighLevel, Boulevard or a custom CRM with Pipeline Sales, Inbox and Activities?", a: "Yes. Native bidirectional integration with GoHighLevel API v2, Boulevard and custom CRMs. Automatically syncs Pipeline Sales, Inbox and Activities." },
        { q: "Is it really HIPAA-compliant?", a: "All providers (AWS, Pinecone Enterprise, Azure OpenAI, LiveKit Enterprise) sign BAA. PHI encrypted AES-256 at rest, TLS 1.3 in transit. Transcriptions in EMR, purged from bot in 24h." },
        { q: "Does the bot sound robotic?", a: "No. LiveKit + Telnyx + Enterprise TTS architecture with E2E latency <800ms. Patients generally can't tell they're talking to AI." },
        { q: "What if I want to cancel?", a: "No long-term contract. If within 60 days we don't complete 30 appointments, we refund the full setup fee and you keep the configuration. Outside that period, 30-day notice." },
        { q: "How long does setup take?", a: "5 to 7 business days from payment. Our team sets everything up: indexes your knowledge base in Pinecone, connects your CRM APIs, and tests conversations before going live." },
      ],
    },
    finalCta: {
      eyebrow: "Ready to automate your revenue?",
      headline: "Your schedule shouldn't depend on when your receptionist sleeps.",
      sub: "Join the MedSpas in NY and NJ that already have their Clinical SDR active.",
      primary: "Activate my Clinical SDR →",
      ghost: "Talk to the team",
    },
    modal: {
      stepIndicator: (s: number, total: number) => `0${s + 1} / 0${total}`,
      welcome: {
        title: "Hi! Let's activate your Clinical SDR.",
        sub: "Takes less than 2 minutes. We configure everything.",
        cta: "Get started →",
      },
      steps: [
        {
          question: "What system do you currently use in your MedSpa?",
          hint: "Press Enter to continue",
          options: ["GoHighLevel", "Boulevard", "Jane App", "Mindbody", "None / Other"],
          key: "crm",
        },
        {
          question: "How many leads or inquiries do you receive per month?",
          hint: "Press Enter to continue",
          options: ["Less than 50", "50–150 leads", "150–500 leads", "More than 500 leads"],
          key: "volume",
        },
        {
          question: "What is your biggest problem today?",
          hint: "Press Enter to continue",
          options: ["Unanswered leads after hours", "High no-show rate", "Staff overwhelmed with admin", "Don't know where my patients come from"],
          key: "pain",
        },
        {
          question: "Almost done. Where should we send the proposal?",
          hint: "Type here...",
          fields: [
            { placeholder: "Your name", type: "text", key: "name" },
            { placeholder: "Your MedSpa or clinic name", type: "text", key: "business" },
            { placeholder: "WhatsApp (+1...)", type: "tel", key: "phone" },
            { placeholder: "you@email.com", type: "email", key: "email" },
          ],
        },
      ],
      success: {
        title: "Request received!",
        sub: "Our team will contact you within 2 hours on WhatsApp.",
        summaryLabels: { crm: "CRM:", volume: "Leads/mo:", pain: "Problem:" },
        close: "Close",
      },
      back: "Back",
      next: "Continue",
      submit: "Submit request ✓",
    },
    footer: {
      tagline: "Autonomous Clinical SDR for MedSpas",
      compliance: ["HIPAA Compliant", "BAA Signed", "SOC 2 Eligible"],
      col2: { title: "Product", links: ["How it works", "Tech stack", "Pricing", "HIPAA & Compliance", "Integrations"] },
      col3: { title: "Company", links: ["About", "Blog", "Use cases", "Partner Program", "Contact"] },
      col4: { title: "Legal", links: ["Terms of service", "Privacy policy", "BAA Template", "HIPAA Notice"] },
      copy: "© 2025 Receptor AI · All rights reserved",
      powered: "Built for MedSpas in NY & NJ · Powered by Protolylat",
    },
  },
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (isInView) motionValue.set(target)
  }, [isInView, motionValue, target])

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix
    })
  }, [spring, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Page() {
  // Language
  const [lang, setLang] = useState<"es" | "en">("es")
  const t = content[lang]

  // Navbar
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  // Typewriter
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState("")

  // FAQ
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Focused fields for floating labels
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const PHRASES = t.hero.phrases

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, 65)
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      }, 35)
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % PHRASES.length)
      }, 400)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex, PHRASES])

  // Reset typewriter when language changes
  useEffect(() => {
    setDisplayText("")
    setCharIndex(0)
    setIsDeleting(false)
    setPhraseIndex(0)
  }, [lang])

  // Modal navigation
  const TOTAL_STEPS = t.modal.steps.length + 2 // welcome + steps + success
  const goNext = useCallback(() => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }, [TOTAL_STEPS])
  const goPrev = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalOpen) return
      if (e.key === "Enter") goNext()
      if (e.key === "Escape") setModalOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [modalOpen, step, goNext])

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
  }

  function renderModalStep(s: number) {
    // Welcome
    if (s === 0) {
      return (
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00D2AA]/15 border border-[#00D2AA]/30 flex items-center justify-center mx-auto">
            <Zap size={28} className="text-[#00D2AA]" />
          </div>
          <p className="font-serif italic text-2xl text-[#EFF6FF] leading-snug">{t.modal.welcome.title}</p>
          <p className="text-sm text-[#94A3B8] mt-1">{t.modal.welcome.sub}</p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,210,170,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={goNext}
            className="mt-4 w-full bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-xl py-3.5 cursor-pointer"
          >
            {t.modal.welcome.cta}
          </motion.button>
        </div>
      )
    }

    // Success
    if (s === TOTAL_STEPS - 1) {
      return (
        <div className="flex flex-col items-center text-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#00D2AA]/15 border border-[#00D2AA]/30 flex items-center justify-center mx-auto">
              <Check size={32} className="text-[#00D2AA]" />
            </div>
          </motion.div>
          <p className="font-serif italic text-2xl text-[#EFF6FF] mt-6">{t.modal.success.title}</p>
          <p className="text-sm text-[#94A3B8] mt-2">{t.modal.success.sub}</p>
          <div className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-left">
            {Object.entries(t.modal.success.summaryLabels).map(([k, label]) => (
              answers[k] ? (
                <div key={k} className="contents">
                  <span className="text-[#4B5563]">{label}</span>
                  <span className="text-[#EFF6FF] truncate">{answers[k]}</span>
                </div>
              ) : null
            ))}
          </div>
          <button
            onClick={() => { setModalOpen(false); setStep(0) }}
            className="w-full mt-4 border border-white/10 text-[#94A3B8] hover:text-[#EFF6FF] rounded-xl py-3 text-sm transition-colors cursor-pointer"
          >
            {t.modal.success.close}
          </button>
        </div>
      )
    }

    // Actual steps (s 1 to TOTAL_STEPS-2)
    const stepData = t.modal.steps[s - 1]

    if (!stepData) return null

    // Input fields step
    if ("fields" in stepData) {
      return (
        <div>
          <p className="text-[#4B5563] text-xs font-mono uppercase tracking-widest mb-1">{`${s} →`}</p>
          <p className="font-medium text-lg text-[#EFF6FF] mb-6">{stepData.question}</p>
          <motion.div variants={fadeUpStagger} initial="hidden" animate="show" className="flex flex-col gap-6">
            {stepData.fields!.map((field, i) => {
              const val = answers[field.key] || ""
              const isFocused = focusedField === field.key
              return (
                <motion.div key={field.key} variants={fadeUp} className="relative">
                  <motion.label
                    animate={isFocused || val ? { top: "-16px", fontSize: "10px", color: "#00D2AA" } : { top: "12px", fontSize: "14px", color: "#4B5563" }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 pointer-events-none"
                    style={{ lineHeight: 1 }}
                  >
                    {field.placeholder}
                  </motion.label>
                  <input
                    type={field.type}
                    value={val}
                    onChange={(e) => setAnswers((a) => ({ ...a, [field.key]: e.target.value }))}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-[#EFF6FF] text-base focus:outline-none focus:border-[#00D2AA]/50 transition-colors"
                    autoFocus={i === 0}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      )
    }

    // Single choice step
    if ("options" in stepData) {
      return (
        <div>
          <p className="text-[#4B5563] text-xs font-mono uppercase tracking-widest mb-1">{`${s} →`}</p>
          <p className="font-medium text-lg text-[#EFF6FF] mb-2">{stepData.question}</p>
          <p className="text-xs text-[#4B5563] mb-5">{stepData.hint}</p>
          <div className="flex flex-col gap-2">
            {stepData.options!.map((opt) => {
              const selected = answers[stepData.key!] === opt
              return (
                <motion.button
                  key={opt}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, [stepData.key!]: opt }))
                    setTimeout(goNext, 300)
                  }}
                  className={`w-full text-left border rounded-xl px-5 py-3.5 text-sm text-[#EFF6FF] transition-all flex items-center justify-between cursor-pointer ${selected
                    ? "border-[#00D2AA]/40 bg-[#00D2AA]/8"
                    : "border-white/8 hover:bg-[#00D2AA]/5"
                    }`}
                >
                  <span>{opt}</span>
                  <AnimatePresence>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={16} className="text-[#00D2AA]" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>
        </div>
      )
    }

    return null
  }

  const isLastStep = step === TOTAL_STEPS - 1
  const isWelcome = step === 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-sans  { font-family: 'DM Sans', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-[#06080B] text-[#EFF6FF] font-sans overflow-x-hidden">

        {/* ── MODAL ── */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200] bg-[#06080B]/95 backdrop-blur-md flex items-center justify-center sm:p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
            >
              <motion.div
                key="modal-card"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative w-full max-w-lg bg-[#0C1018] sm:border sm:border-white/8 sm:rounded-2xl overflow-hidden h-full sm:h-auto"
              >
                {/* Top bar */}
                <div className="px-6 pt-6 flex items-center gap-3">
                  <span className="text-xs text-[#4B5563] font-mono shrink-0">
                    {`0${step + 1} / 0${TOTAL_STEPS}`}
                  </span>
                  <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#00D2AA] rounded-full"
                      animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </div>
                  <button onClick={() => setModalOpen(false)} className="shrink-0 cursor-pointer">
                    <X size={18} className="text-[#4B5563] hover:text-[#EFF6FF] transition-colors" />
                  </button>
                </div>

                {/* Step content */}
                <div className="min-h-[340px] px-8 py-8 flex flex-col justify-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {renderModalStep(step)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom bar */}
                {!isLastStep && (
                  <div className="px-8 pb-8 flex justify-between items-center">
                    <div>
                      {step > 0 && !isWelcome && (
                        <button
                          onClick={goPrev}
                          className="text-sm text-[#4B5563] hover:text-[#EFF6FF] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronDown className="rotate-90" size={14} />
                          {t.modal.back}
                        </button>
                      )}
                    </div>
                    {!isWelcome && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={step === TOTAL_STEPS - 2 ? goNext : goNext}
                        className="bg-[#00D2AA] text-[#06080B] font-semibold text-sm rounded-lg px-5 py-2.5 cursor-pointer flex items-center gap-2"
                      >
                        {step === TOTAL_STEPS - 2 ? t.modal.submit : t.modal.next}
                        <ArrowRight size={14} />
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 transition-all duration-300 ${scrolled ? "bg-[#06080B]/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
            }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="10" cy="13" r="8" fill="#00D2AA" fillOpacity="0.9" />
              <circle cx="17" cy="13" r="8" fill="#00D2AA" fillOpacity="0.4" />
            </svg>
            <span className="font-semibold text-sm text-[#EFF6FF]">AI Receptionist for Med Spas</span>
          </div>
          {/* Center links */}
          <div className="hidden md:flex items-center gap-7">
            {t.nav.links.map((link) => (
              <span key={link} className="text-sm text-[#94A3B8] hover:text-[#EFF6FF] transition-colors cursor-pointer">
                {link}
              </span>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center bg-[#0C1018] border border-white/8 rounded-lg p-0.5 gap-0.5">
              {(["es", "en"] as const).map((l) => (
                <motion.button
                  key={l}
                  onClick={() => setLang(l)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${lang === l ? "text-[#06080B]" : "text-[#4B5563] hover:text-[#94A3B8]"
                    }`}
                >
                  {lang === l && (
                    <motion.span
                      layoutId="lang-pill-desktop"
                      className="absolute inset-0 bg-[#00D2AA] rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
            <button className="border border-white/10 hover:border-white/20 hover:bg-white/4 rounded-lg px-4 py-2 text-sm text-[#EFF6FF] transition-all cursor-pointer">
              {t.nav.demo}
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="bg-[#00D2AA] text-[#06080B] font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer"
            >
              {t.nav.cta}
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center bg-[#0C1018] border border-white/8 rounded-lg p-0.5 gap-0.5">
              {(["es", "en"] as const).map((l) => (
                <motion.button
                  key={l}
                  onClick={() => setLang(l)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${lang === l ? "text-[#06080B]" : "text-[#4B5563]"
                    }`}
                >
                  {lang === l && (
                    <motion.span
                      layoutId="lang-pill-mobile"
                      className="absolute inset-0 bg-[#00D2AA] rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="cursor-pointer">
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute top-full left-0 right-0 bg-[#0C1018] border-b border-white/5 px-6 py-6 flex flex-col gap-4"
              >
                {t.nav.links.map((link) => (
                  <span key={link} className="text-sm text-[#94A3B8] hover:text-[#EFF6FF] transition-colors cursor-pointer py-1">
                    {link}
                  </span>
                ))}
                <button className="w-full border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#EFF6FF] cursor-pointer text-left">
                  {t.nav.demo}
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setModalOpen(true); setMobileOpen(false) }}
                  className="w-full bg-[#00D2AA] text-[#06080B] font-semibold rounded-lg px-4 py-2.5 text-sm cursor-pointer"
                >
                  {t.nav.cta}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[900px] h-[560px] bg-[#00D2AA]/8 blur-[120px] rounded-full left-1/2 -translate-x-1/2 top-[-15%]" />
            <div className="absolute w-[480px] h-[480px] bg-[#7C3AED]/6 blur-[100px] rounded-full right-[-8%] top-[25%]" />
            <div
              className="absolute inset-0 opacity-[0.028]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
              }}
            />
          </div>

          {/* Badge */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
            <div className="rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/22 px-4 py-1.5 flex items-center gap-2 w-fit mx-auto mb-10">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-[#00D2AA] inline-block"
              />
              <span className="text-xs text-[#00D2AA] font-medium tracking-wide">{t.hero.badge}</span>
              <ArrowRight size={12} className="text-[#00D2AA]" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUpStagger} initial="hidden" animate="show" className="w-full">
            <motion.p variants={fadeUp} className="font-serif italic text-[clamp(34px,5.5vw,70px)] leading-[1.05] tracking-[-0.02em] text-[#EFF6FF]">
              {t.hero.line1}
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif italic text-[clamp(34px,5.5vw,70px)] leading-[1.05] tracking-[-0.02em] text-[#EFF6FF]">
              {t.hero.line2}
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif italic text-[clamp(34px,5.5vw,70px)] leading-[1.05] tracking-[-0.02em] flex items-baseline gap-3 justify-center flex-wrap">
              <span className="text-[#00D2AA] min-w-[4ch]">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "steps(1)" }}
                className="inline-block w-[3px] h-[0.8em] bg-[#00D2AA] rounded-sm align-middle ml-1"
              />
            </motion.p>
          </motion.div>

          {/* SVG underline */}
          <motion.svg viewBox="0 0 400 8" className="w-full max-w-[380px] mx-auto mt-1" preserveAspectRatio="none">
            <motion.path
              d="M 0 4 Q 200 8 400 4"
              stroke="#00D2AA" strokeWidth="2.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
            />
          </motion.svg>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="text-[clamp(15px,1.8vw,18px)] text-[#94A3B8] max-w-[600px] mx-auto leading-[1.75] text-center mt-8"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA cluster */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.6 }}
            className="flex gap-3 justify-center mt-10 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,210,170,0.25)" }}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              onClick={() => setModalOpen(true)}
              className="bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-lg px-7 py-3.5 cursor-pointer"
            >
              {t.hero.primaryCta}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="border border-white/10 hover:bg-white/5 text-[#EFF6FF] font-medium text-base rounded-lg px-7 py-3.5 cursor-pointer transition-colors"
            >
              {t.hero.secondaryCta}
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUpStagger}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.75 }}
            className="flex gap-6 flex-wrap justify-center mt-8"
          >
            {[
              { icon: <ShieldCheck size={14} className="text-[#00D2AA]" />, text: t.hero.badges[0] },
              { icon: <Lock size={14} />, text: t.hero.badges[1] },
              { icon: <FileText size={14} />, text: t.hero.badges[2] },
              { icon: <Zap size={14} className="text-[#00D2AA]" />, text: t.hero.badges[3] },
            ].map((b) => (
              <motion.div key={b.text} variants={fadeUp} className="flex items-center gap-2 text-xs text-[#4B5563]">
                {b.icon}
                {b.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Conversation card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.9 }}
            className="max-w-[560px] w-full mx-auto mt-16"
          >
            <div className="bg-[#0C1018] border border-white/8 rounded-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="bg-[#131B24] border-b border-white/5 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D2AA]/70" />
                </div>
                <span className="flex-1 text-center text-xs text-[#4B5563]">{t.hero.chatHeader}</span>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-[#00D2AA] inline-block"
                  />
                  <span className="text-xs text-[#00D2AA]">{t.hero.online}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4">
                {t.hero.msgs.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.5, duration: 0.4 }}
                  >
                    {msg.side === "user" ? (
                      <div className="ml-auto max-w-[75%] bg-white/8 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-[#EFF6FF]">
                        {msg.text}
                        {"time" in msg && <p className="text-[10px] text-[#4B5563] text-right mt-1">{msg.time}</p>}
                      </div>
                    ) : (
                      <div className="flex gap-2 max-w-[82%]">
                        <div className="w-7 h-7 rounded-full bg-[#00D2AA]/15 flex items-center justify-center shrink-0">
                          <Bot size={14} className="text-[#00D2AA]" />
                        </div>
                        <div className="bg-[#00D2AA]/10 border border-[#00D2AA]/15 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#EFF6FF]">
                          {msg.text}
                          {"payment" in msg && msg.payment && (
                            <div className="bg-[#06080B] border border-white/10 rounded-lg px-3 py-2 text-xs flex items-center gap-2 mt-2 w-fit">
                              <CreditCard size={12} className="text-[#00D2AA]" />
                              <span>{lang === "es" ? "Pagar depósito $75 · Stripe" : "Pay deposit $75 · Stripe"}</span>
                              <ExternalLink size={10} className="text-[#4B5563]" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Status */}
              <p className="text-[10px] text-[#00D2AA]/60 text-center pb-4">{t.hero.statusBar}</p>
            </div>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-[#0C1018] border-y border-white/5 py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-[#0C1018] border border-white/5 rounded-xl p-8 text-center"
                >
                  <div className="font-serif italic text-5xl text-[#00D2AA]">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="text-sm text-[#94A3B8] mt-2">{stat.label}</p>
                  <p className="text-xs text-[#4B5563] mt-1">{stat.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        {/*
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
              <h2 className="font-serif italic text-[clamp(26px,3.5vw,40px)] text-[#EFF6FF] tracking-[-0.02em]">{t.social.title}</h2>
            </motion.div>
            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {t.social.reviews.map((review, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-6 transition-colors"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-[1.75] mb-4">{`"${review.text}"`}</p>
                  <div>
                    <p className="text-sm font-medium text-[#EFF6FF]">{review.name}</p>
                    <p className="text-xs text-[#4B5563] mt-0.5">{review.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        */}


        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6 bg-[#0C1018]/40">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
              <h2 className="font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.03em] text-[#EFF6FF]">{t.how.title}</h2>
              <p className="text-[#94A3B8] mt-3">{t.how.sub}</p>
            </motion.div>

            <motion.div
              variants={fadeUpStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {t.how.steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-6 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full border border-[#00D2AA]/30 text-[#00D2AA] text-sm font-semibold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <span className="bg-[#00D2AA]/10 text-[#00D2AA] text-xs px-2 py-0.5 rounded-full font-medium">{step.time}</span>
                    </div>
                    <div className="mb-3">
                      <Icon size={20} className="text-[#00D2AA] mb-2" />
                      <h3 className="font-semibold text-[#EFF6FF] text-base">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-[1.65] mb-4">{step.desc}</p>
                    <span className="bg-white/3 border border-white/8 text-[#4B5563] text-[11px] px-2 py-0.5 rounded-md font-mono">{step.tech}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── CRM DEMO SECTION ── */}
        <CRMDemoSection />

        {/* ── BENTO GRID ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
              <h2 className="font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.03em] text-[#EFF6FF]">{t.bento.title}</h2>
              <p className="text-[#94A3B8] mt-3">{t.bento.sub}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Card A */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:col-span-7 bg-gradient-to-br from-[#0C1018] to-[#0D1520] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <div className="flex gap-2 mb-6">
                  {[Mic, MessageSquare, Phone].map((Icon, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/20 flex items-center justify-center ${i > 0 ? "-ml-3" : ""}`}>
                      <Icon size={16} className="text-[#00D2AA]" />
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-[#EFF6FF] mb-2">{t.bento.cardA.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-[1.65] mb-5">{t.bento.cardA.body}</p>
                <div className="flex flex-wrap gap-2">
                  {t.bento.cardA.badges.map((b) => (
                    <span key={b} className="rounded-full bg-[#00D2AA]/10 text-[#00D2AA] text-xs px-3 py-1">{b}</span>
                  ))}
                </div>
              </motion.div>

              {/* Card B */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:col-span-5 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <Database size={24} className="text-[#00D2AA] mb-4" />
                <h3 className="text-lg font-semibold text-[#EFF6FF] mb-2">{t.bento.cardB.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-[1.65]">{t.bento.cardB.body}</p>
              </motion.div>

              {/* Card C */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:col-span-5 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <GitMerge size={24} className="text-[#00D2AA] mb-4" />
                <h3 className="text-lg font-semibold text-[#EFF6FF] mb-2">{t.bento.cardC.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-[1.65]">{t.bento.cardC.body}</p>
              </motion.div>

              {/* Bonus cards */}
              {[
                { ...t.bento.bonus1, icon: Star },
                /* { ...t.bento.bonus2, icon: PhoneCall },
                { ...t.bento.bonus3, icon: BarChart2 }, */
              ].map((bonus, i) => {
                const Icon = bonus.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="lg:col-span-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 rounded-xl p-6 transition-colors"
                  >
                    <span className="bg-[#F59E0B]/15 text-[#F59E0B] text-xs px-2 py-0.5 rounded-full font-medium">{bonus.badge}</span>
                    <Icon size={20} className="text-[#F59E0B] mt-4 mb-2" />
                    <h3 className="font-semibold text-[#EFF6FF] mb-1">{bonus.title}</h3>
                    <p className="text-xs text-[#F59E0B] font-medium mb-2">{bonus.value}</p>
                    <p className="text-sm text-[#94A3B8]">{bonus.desc}</p>
                  </motion.div>
                )
              })}
              {/* Setup + Includes row */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-6 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/20 flex items-center justify-center">
                    <Zap size={14} className="text-[#00D2AA]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#00D2AA] font-medium">{t.bento.setupTitle}</span>
                </div>
                <ul className="space-y-2.5">
                  {t.bento.setupItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ArrowRight size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-6 bg-[#0C1018] border border-white/5 hover:border-[#00D2AA]/20 rounded-xl p-8 transition-colors"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#00D2AA]/10 border border-[#00D2AA]/20 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-[#00D2AA]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#00D2AA] font-medium">{t.bento.includesTitle}</span>
                </div>
                <ul className="space-y-2.5">
                  {t.bento.includesItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-[#0C1018]/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Left: anchor costs */}
              <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
                <h2 className="font-bold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] text-[#EFF6FF] mb-8">{t.pricing.leftTitle}</h2>
                <div className="space-y-4">
                  {t.pricing.costs.map((c, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <X size={16} className="text-[#EF4444]/60 shrink-0" />
                        <span className="text-sm text-[#94A3B8] line-through decoration-[#EF4444]/50">{c.label}</span>
                      </div>
                      <span className="text-sm text-[#EF4444]/60 line-through font-medium">{c.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-[#94A3B8] font-medium">{t.pricing.totalLabel}</span>
                    <span className="text-base text-[#EF4444] font-semibold">{t.pricing.totalValue}</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: offer card */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
                <div className="relative bg-[#0C1018] border border-white/8 rounded-2xl p-8 overflow-hidden">
                  {/* Teal glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2AA]/6 blur-[80px] rounded-full pointer-events-none" />

                  <span className="bg-[#00D2AA]/10 text-[#00D2AA] rounded-full px-3 py-1 text-xs uppercase tracking-widest">{t.pricing.badge}</span>

                  <div className="mt-6 mb-2">
                    <span className="text-[#4B5563] text-sm">{t.pricing.setupLabel}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif italic text-6xl text-[#EFF6FF]">{t.pricing.setupPrice}</span>
                      <span className="text-[#4B5563] text-sm">{t.pricing.setupSub}</span>
                    </div>
                  </div>

                  <div className="relative h-px bg-white/5 my-6">
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-[#4B5563] bg-[#0C1018] px-3"></span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[#4B5563] text-sm">{t.pricing.opLabel}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif italic text-5xl text-[#00D2AA]">{t.pricing.opPrice}</span>
                      <span className="text-[#4B5563] text-sm">{t.pricing.opSub}</span>
                    </div>
                  </div>

                  <div className="relative h-px bg-white/5 my-6">
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-[#4B5563] bg-[#0C1018] px-3">{t.pricing.divider}</span>
                  </div>

                  <div className="mb-6">
                    <span className="text-[#4B5563] text-sm">{t.pricing.retainerLabel}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif italic text-5xl text-[#EFF6FF]">{t.pricing.retainerPrice}</span>
                      <span className="text-[#4B5563] text-sm">usd · mensual</span>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-6">
                    {t.pricing.checklist.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check size={14} className="text-[#00D2AA] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#94A3B8]">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Scarcity */}
                  <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl p-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#F59E0B] text-sm font-medium">{t.pricing.scarcityTitle}</span>
                      <span className="text-[#4B5563] text-xs">{t.pricing.scarcityTaken}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "66%" }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-full bg-[#F59E0B] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mt-4 flex gap-3">
                    <ShieldCheck size={20} className="text-[#00D2AA] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#94A3B8]">{t.pricing.guarantee}</p>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(0,210,170,0.28)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-xl py-4 cursor-pointer mt-6"
                  >
                    {t.pricing.cta}
                  </motion.button>
                  <p className="text-center text-xs text-[#4B5563] mt-2">{t.pricing.ctaSub}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VOICE ADD-ON ── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="relative bg-gradient-to-br from-[#0D1520] to-[#0C1018] border border-[#6366F1]/25 rounded-2xl p-8 md:p-12 overflow-hidden"
            >
              {/* Subtle indigo glow */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-[#6366F1]/6 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-[#6366F1]/15 text-[#818CF8] text-xs px-3 py-1 rounded-full uppercase tracking-widest font-medium">
                    {t.voiceAddon.eyebrow}
                  </span>
                  <span className="text-xs text-[#4B5563]">— precio separado</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  {/* Left: title + description + includes */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center shrink-0">
                        <Mic size={18} className="text-[#818CF8]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#EFF6FF] tracking-tight">{t.voiceAddon.title}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{t.voiceAddon.subtitle}</p>
                    <ul className="space-y-3">
                      {t.voiceAddon.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#818CF8] shrink-0 mt-0.5" />
                          <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: pricing + CTA */}
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.03] border border-white/6 rounded-xl p-5">
                        <span className="text-xs text-[#4B5563] uppercase tracking-widest block mb-2">{t.voiceAddon.setupLabel}</span>
                        <span className="text-2xl font-bold text-[#EFF6FF]">{t.voiceAddon.setupPrice}</span>
                        <span className="text-xs text-[#4B5563] block mt-1">usd · único</span>
                      </div>
                      <div className="bg-white/[0.03] border border-white/6 rounded-xl p-5">
                        <span className="text-xs text-[#4B5563] uppercase tracking-widest block mb-2">{t.voiceAddon.retainerLabel}</span>
                        <span className="text-2xl font-bold text-[#818CF8]">{t.voiceAddon.retainerPrice}</span>
                        <span className="text-xs text-[#4B5563] block mt-1">usd · mensual</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(99,102,241,0.25)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setModalOpen(true)}
                      className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white font-semibold text-sm rounded-xl py-3.5 cursor-pointer transition-colors"
                    >
                      {t.voiceAddon.cta}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="text-center mb-12">
              <h2 className="font-bold text-[clamp(26px,3.5vw,40px)] tracking-[-0.02em] text-[#EFF6FF]">{t.faq.title}</h2>
            </motion.div>
            <motion.div variants={fadeUpStagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              {t.faq.items.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border-b border-white/6">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
                  >
                    <span className="font-medium text-base text-[#EFF6FF] pr-4">{item.q}</span>
                    <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                      <ChevronDown size={18} className="text-[#4B5563]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-[#94A3B8] leading-[1.75]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative bg-[#0C1018] border-t border-white/5 py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[400px] bg-[#00D2AA]/7 blur-[140px] rounded-full opacity-[0.07]" />
          </div>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <motion.div variants={fadeUpStagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#00D2AA]">
                {t.finalCta.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif italic text-[clamp(28px,4vw,44px)] text-[#EFF6FF] leading-[1.1] mt-4">
                {t.finalCta.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#94A3B8] mt-4">
                {t.finalCta.sub}
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-4 justify-center mt-8 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,210,170,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setModalOpen(true)}
                  className="bg-[#00D2AA] text-[#06080B] font-semibold text-base rounded-lg px-7 py-3.5 cursor-pointer"
                >
                  {t.finalCta.primary}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="border border-white/10 hover:bg-white/5 text-[#EFF6FF] font-medium text-base rounded-lg px-7 py-3.5 cursor-pointer transition-colors"
                >
                  {t.finalCta.ghost}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-[#06080B] border-t border-white/5 pt-16 pb-10 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                    <circle cx="10" cy="13" r="8" fill="#00D2AA" fillOpacity="0.9" />
                    <circle cx="17" cy="13" r="8" fill="#00D2AA" fillOpacity="0.4" />
                  </svg>
                  <span className="font-semibold text-sm text-[#EFF6FF]">AI Receptionist for Med Spas</span>
                </div>
                <p className="text-sm text-[#4B5563] mt-3">{t.footer.tagline}</p>
                <div className="flex flex-col gap-2 mt-4">
                  {t.footer.compliance.map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-xs text-[#4B5563] border border-white/8 rounded-full px-3 py-1 w-fit">
                      <ShieldCheck size={11} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Product */}
              {/* <div>
                <p className="text-sm font-semibold text-[#EFF6FF] mb-4">{t.footer.col2.title}</p>
                <div className="flex flex-col gap-3">
                  {t.footer.col2.links.map((l) => (
                    <span key={l} className="text-sm text-[#4B5563] hover:text-[#94A3B8] transition-colors cursor-pointer">{l}</span>
                  ))}
                </div>
              </div> */}

              {/* Company */}
              {/* <div>
                <p className="text-sm font-semibold text-[#EFF6FF] mb-4">{t.footer.col3.title}</p>
                <div className="flex flex-col gap-3">
                  {t.footer.col3.links.map((l) => (
                    <span key={l} className="text-sm text-[#4B5563] hover:text-[#94A3B8] transition-colors cursor-pointer">{l}</span>
                  ))}
                </div>
              </div> */}

              {/* Legal */}
              {/* <div>
                <p className="text-sm font-semibold text-[#EFF6FF] mb-4">{t.footer.col4.title}</p>
                <div className="flex flex-col gap-3">
                  {t.footer.col4.links.map((l) => (
                    <span key={l} className="text-sm text-[#4B5563] hover:text-[#94A3B8] transition-colors cursor-pointer">{l}</span>
                  ))}
                </div>
              </div> */}
            </div>

            <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4">
              <span className="text-xs text-[#4B5563]">{t.footer.copy}</span>
              <span className="text-xs text-[#4B5563]">{t.footer.powered}</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
