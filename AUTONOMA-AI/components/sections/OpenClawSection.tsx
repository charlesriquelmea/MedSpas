// components/sections/OpenClawSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Brain, Zap, RefreshCw, Eye, Shield } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Brain,
    title: "Memoria Persistente",
    description:
      "El agente recuerda cada interacción, contexto y preferencia del usuario. Sin repetir información. Sin fricción.",
  },
  {
    icon: Zap,
    title: "Proactividad Real",
    description:
      "No espera instrucciones. Detecta oportunidades, anticipa necesidades y actúa antes de que lo pidas.",
  },
  {
    icon: Eye,
    title: "Consciencia Contextual",
    description:
      "Entiende el estado de tu negocio en tiempo real: inventario, conversaciones activas, tickets abiertos y más.",
  },
  {
    icon: RefreshCw,
    title: "Aprendizaje Continuo",
    description:
      "Cada interacción entrena al agente. Mejora solo, sin intervención manual ni re-entrenamiento costoso.",
  },
  {
    icon: Shield,
    title: "Control Total",
    description:
      "Tú defines los límites. El agente opera con autonomía dentro de las reglas que estableces.",
  },
];

// ─── VARIANTS ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  description,
}: (typeof features)[0]) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 
                 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 
                 hover:border-violet-500/40 hover:bg-white/[0.07]"
    >
      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br 
                      from-violet-600/10 to-transparent opacity-0 transition-opacity 
                      duration-500 group-hover:opacity-100" />

      <div className="flex h-11 w-11 items-center justify-center rounded-xl 
                      bg-violet-600/20 ring-1 ring-violet-500/30">
        <Icon className="h-5 w-5 text-violet-400" />
      </div>

      <div>
        <h3 className="mb-1 text-base font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── JENSEN QUOTE ─────────────────────────────────────────────────────────────
function JensenQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative mx-auto mt-20 max-w-4xl overflow-hidden rounded-3xl 
                 border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 
                 p-8 shadow-2xl md:p-12"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 
                      rounded-full bg-violet-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 
                      rounded-full bg-blue-700/10 blur-3xl" />

      {/* Decorative quote mark */}
      <span className="pointer-events-none absolute left-8 top-4 select-none 
                       font-serif text-8xl leading-none text-violet-500/20">
        "
      </span>

      <div className="relative flex flex-col items-center gap-8 md:flex-row">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full 
                          ring-2 ring-violet-500/50 shadow-lg shadow-violet-900/30 
                          md:h-28 md:w-28">
            <Image
              src="/images/jensen-huang.jpg"
              alt="Jensen Huang, CEO de NVIDIA"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <blockquote className="text-lg font-light italic leading-relaxed 
                                  text-slate-200 md:text-xl">
            "OpenClaw es probablemente el lanzamiento de software más importante
            que hemos visto. Linux tardó unos 30 años en alcanzar este nivel de
            adopción. OpenClaw lo ha conseguido en apenas tres semanas y ya es
            el software open source más descargado de la historia."
          </blockquote>

          <footer>
            <p className="text-sm font-semibold text-white">Jensen Huang</p>
            <p className="text-xs text-slate-500">CEO de NVIDIA</p>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function OpenClawSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-24 md:py-32">
      {/* Section ambient background */}
      <div className="pointer-events-none absolute inset-0 
                      bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.12),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Badge + Headline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border 
                             border-violet-500/40 bg-violet-500/10 px-4 py-1.5 
                             text-xs font-medium tracking-wide text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Powered by OpenClaw Technology
            </span>
          </motion.div>

          {/* H2 */}
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-3xl text-3xl font-bold tracking-tight 
                       text-white sm:text-4xl md:text-5xl"
          >
            Agentes que piensan, recuerdan
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 
                             bg-clip-text text-transparent">
              y actúan — solos.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed 
                       text-slate-400 sm:text-lg"
          >
            OpenClaw nos permite construir agentes de IA de nueva generación.
            No son bots. Son colaboradores autónomos que trabajan 24/7 dentro
            de tu negocio, aprenden de cada interacción y{" "}
            <span className="text-slate-200 font-medium">nunca olvidan nada.</span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>

        {/* Jensen Huang Quote */}
        <JensenQuote />
      </div>
    </section>
  );
}