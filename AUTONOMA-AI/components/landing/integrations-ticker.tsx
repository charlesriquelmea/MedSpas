"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const integrations = [
  { name: "HubSpot", logo: "/hubspot-logo.png" },
  { name: "Salesforce", logo: "/salesforce-logo.png" },
  { name: "Airtable", logo: "/airtable-logo.png" },
  { name: "Slack", logo: "/slack-logo.png" },
  { name: "Discord", logo: "/discord-logo.png" },
  { name: "Microsoft Teams", logo: "/microsoft-teams-logo.png" },
  { name: "OpenAI", logo: "/openai-logo-inspired-abstract.png" },
  { name: "n8n", logo: "/n8n-logo.jpg" },
  { name: "Next.js", logo: "/nextjs-logo.png" },
  { name: "Vercel", logo: "/vercel-logo.png" },
]

export function IntegrationsTicker() {
  return (
    <section id="integrations" className="py-16 backdrop-blur-sm bg-white/5 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm uppercase tracking-widest text-gray-500 mb-8">
          Integrates seamlessly with your existing tools
        </p>

        {/* First Row - Scrolling Left */}
        <div className="relative overflow-hidden mb-8">
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {/* Duplicate the array for seamless loop */}
            {[...integrations, ...integrations].map((integration, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[120px] opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={integration.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Scrolling Right */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [-1920, 0],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {/* Duplicate the array for seamless loop */}
            {[...integrations, ...integrations].map((integration, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[120px] opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={integration.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
