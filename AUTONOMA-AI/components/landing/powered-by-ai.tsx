"use client"

import { motion } from "framer-motion"
import { Database, Sparkles } from "lucide-react"

export function PoweredByAI() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-white/5">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4 border border-purple-500/30">
            Powered by AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Power Your Landing Page with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Conversational AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Transform visitors into customers with an intelligent agent that responds 24/7, qualifies leads and
            increases conversions up to 3x.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "RAG Technology",
              desc: "Your agent queries documents, PDFs and databases in real-time to give accurate answers based on YOUR content.",
              icon: Database,
              color: "text-blue-400",
            },
            {
              title: "Latest Generation LLM",
              desc: "Powered by GPT-4 / Claude / custom models. Natural conversations that understand context and your brand's personality.",
              icon: Sparkles,
              color: "text-purple-400",
            },
            {
              title: "Perfect Integration",
              desc: "Integrates with your stack: Shopify, WordPress, Next.js, custom. Responsive widget that adapts to any design.",
              icon: Layers,
              color: "text-pink-400",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-left space-y-4"
            >
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
          {[
            { val: "73%", label: "More Conversions" },
            { val: "24/7", label: "Availability" },
            { val: "5 sec", label: "Avg Response" },
            { val: "3x", label: "Lead Quality" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl font-bold text-white">{stat.val}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Layers } from "lucide-react"
