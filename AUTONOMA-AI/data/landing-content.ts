import { BarChart3, Bell, CalendarCheck, Download, FileDown, Filter, Layers, LayoutDashboard, MessageSquare, ScrollText, Search, ShieldCheck, UserCheck, UserPlus, Users } from "lucide-react";
import { features } from "process";

export const landingContent = {
  // -------------------------------------------------------------------------------------
  // VERSIÓN EN INGLÉS
  // -------------------------------------------------------------------------------------
  en: {
    nav: { architecture: "Architecture", pricing: "Pricing" },
    hero: {
      eyebrow: "AI Sales Concierge",
      h1: "Stop Chasing Leads. Book Qualified Meetings 24/7.",
      subhead: "Autonoma is your bilingual Sales Concierge (EN/ES) that qualifies prospects with your rules and books on your calendar. You only step in when there is real buying intent.",
      ctaPrimary: "See if Autonoma fits my business",
      ctaSecondary: "I want a 14-day pilot",
      trustBadge: "Answers from your docs + executes only 1 action (booking) + human fallback.",
      bullets: [
        "Qualifies and books (single mission: meetings)",
        "Trained on your pricing/FAQs/services",
        "No manual work: CRM + email + alerts",
        "Implementation in 10 business days",
        "Safe fallback: routes to team if in doubt"
      ]
    },
    agentTiersSection: {
      eyebrow: "Choose your level of automation",
      title: "The right agent for every stage of your business",
      subtitle: "From your first automation to high-volume enterprise operations.",
      popu: "Most Popular",
      plan: "Plan",
      tiers: [
        {
          index: 1,
          name: "FAQ Assistant",
          tagline: "Capture leads 24/7 without human intervention",
          badge: "Ideal for landing pages",
          features: [
            "Automatically answers frequently asked questions",
            "Captures prospect's name, email, and phone",
            "1 active channel: webchat",
            "Knowledge base of up to 30 questions",
            "Team notification for each new lead",
          ],
          cta: "Start here",
          highlight: false,
        },
        {
          index: 2,
          name: "Sales Agent + CRM",
          tagline: "Qualify, negotiate, and schedule without an SDR",
          badge: "For active sales teams",
          features: [
            "Smart lead qualification by profile",
            "Fully automated email follow-up",
            "Schedules meetings in real time from chat",
            "CRM with active pipeline included in the plan",
            "Broad and customizable knowledge base",
            "Adapts tone and responses according to the prospect",
          ],
          cta: "See demo",
          highlight: true,
        },
        {
          index: 3,
          name: "Multi-channel AI Executive",
          tagline: "An agent that remembers everything, no matter the channel",
          badge: "For businesses with high demand",
          features: [
            "WhatsApp + Webchat + Instagram + Discord simultaneously",
            "Unified context across all channels",
            "Lead can switch channels without losing the thread",
            "Multi-channel CRM consolidated in a single view",
            "Performance reports by channel",
          ],
          cta: "Get a quote",
          highlight: false,
        },
        {
          index: 4,
          name: "Custom Enterprise",
          tagline: "Integrated into your operation from day one",
          badge: "For complex operations",
          features: [
            "Integration with your existing ERP or CRM",
            "Catalogs of 500+ products with smart search",
            "Multi-language: Spanish, English, and Portuguese",
            "Tailor-made conversation flows",
            "Custom reports and dashboards",
            "Dedicated support with service level agreement",
          ],
          cta: "Talk to sales",
          highlight: false,
        },
      ]
    },
    inboxSection: {
      conversations: [
        {
          name: "Carlos Mendoza",
          channel: "WhatsApp",
          status: "Qualified",
          statusColor: "bg-green-500",
          message: "Yes, I'm interested in the Pro plan. When can we talk?",
          time: "2 min ago",
          avatar: "CM",
        },
        {
          name: "Ana Torres",
          channel: "Webchat",
          status: "In progress",
          statusColor: "bg-yellow-500",
          message: "Does the agent work with my online store?",
          time: "15 min ago",
          avatar: "AT",
        },
        {
          name: "Roberto Silva",
          channel: "Instagram",
          status: "New",
          statusColor: "bg-blue-500",
          message: "Hi, I saw your post and wanted more info",
          time: "1h ago",
          avatar: "RS",
        },
        {
          name: "Daniela Reyes",
          channel: "WhatsApp",
          status: "Follow-up",
          statusColor: "bg-orange-500",
          message: "Sorry, I forgot to reply...",
          time: "3h ago",
          avatar: "DR",
        },
        {
          name: "Miguel Vargas",
          channel: "Webchat",
          status: "Closed",
          statusColor: "bg-gray-500",
          message: "Perfect, we'll leave it like that then.",
          time: "yesterday",
          avatar: "MV",
        },
      ],
      features: [
        {
          icon: Layers,
          label: "Unified View",
          description: "All channels in a single inbox. No switching apps.",
        },
        {
          icon: Filter,
          label: "Status Filters",
          description: "New, in progress, qualified, closed. Focus where it matters.",
        },
        {
          icon: UserPlus,
          label: "Lead Assignment",
          description: "Distribute prospects among your team in seconds from the same view.",
        },
        {
          icon: ScrollText,
          label: "Complete History",
          description: "Every message, every reply, in chronological and immutable order.",
        },
        {
          icon: Search,
          label: "Powerful Search",
          description: "Find any lead by name, company, or conversation text.",
        },
        {
          icon: Download,
          label: "Direct Export",
          description: "Download full conversations for auditing or agent training.",
        },
      ],
      eyebrow: "Smart Inbox",
      title: "All conversations. One single place.",
      subtitle: "No open tabs, no leads lost in WhatsApp. Your team focused on closing.",
      inbox: "Inbox",
      conver: "5 active conversations",
    },

    crmSection: {
      features: [
        {
          icon: LayoutDashboard,
          label: "Pipeline Visual",
          description: "Move leads between stages with drag & drop. No spreadsheets, no chaos."
        },
        {
          icon: MessageSquare,
          label: "Full History",
          description: "Every message your agent had with each prospect, in chronological order."
        },
        {
          icon: BarChart3,
          label: "Real-Time Metrics",
          description: "Captured leads, active conversions, and close speed at a glance."
        },
        {
          icon: UserCheck,
          label: "Lead Score",
          description: "Every contact arrives qualified with company, job title, and priority level."
        },
        {
          icon: Bell,
          label: "Qualified Lead Alerts",
          description: "Receive an email the moment a prospect enters, ready to close."
        },
        {
          icon: FileDown,
          label: "Exportable Reports",
          description: "Download the complete monthly performance report in one click. Without depending on anyone.",
        },
        {
          icon: Users,
          label: "User Roles",
          description: "Admin, salesperson, viewer. Each person only accesses what corresponds to them.",
        },
        {
          icon: ShieldCheck,
          label: "Isolated Instances",
          description: "Each client's data is stored separately. Total security by architecture.",
        },
        {
          icon: CalendarCheck,
          label: "Synchronized Calendar",
          description: "Appointments scheduled by the agent appear in your calendar immediately.",
        }
      ],
      demo: "View CRM demo",
      eyebrow: "CRM included in every plan",
      title: "Your sales team, finally organized",
      subtitle: "Each agent comes with a dedicated CRM so you never lose a qualified lead."
    },

    provenResults: {
      header: {
        badge: "LIVE DEMO — REAL CLIENT",
        title: "Watch Autonoma working in production",
        subtitle: "This is the real Victor Mane Tattoo Studio website. The AI ​​qualifies leads, schedules appointments, and updates the CRM — without human intervention.",
        cta: "Schedule Free Demo"
      },
      calificacionAutomatica: {
        title: "Automatic Qualification",
        subtitle: "The system filters and qualifies leads in real-time without human intervention.",
        badge: "24/7 Efficiency",
        footer: {
          badge: "Qualification in less than 5 seconds",
          text: "Your team focuses only on high-priority leads"
        },
        flow: {
          newLead: {
            title: "New Lead",
            description: "User starts chat",
            infoCollected: "Info collected:",
            items: ["Name", "Company", "Interest"]
          },
          qualifying: {
            title: "Qualifying",
            description: "AI analyzes profile",
            criteria: "Criteria:",
            items: ["Available budget", "Interest level", "Buying urgency", "Fit with your solution"]
          },
          results: {
            calificado: { title: "Qualified", subtitle: "High priority" },
            interesado: { title: "Interested", subtitle: "Moderate follow-up" },
            noCalifica: { title: "Not Qualified", subtitle: "Discarded" },
            spam: { title: "Spam", subtitle: "Blocked" }
          }
        }
      },
      howItWorks: {
        title: "How Automatic Qualification Works?",
        subtitle: "The AI qualifies your leads in 3 simple steps while you focus on closing sales.",
        steps: [
          {
            title: "Lead arrives via Widget Chat",
            desc: "When a potential client contacts you, the AI automatically starts a natural conversation.",
            features: ["Instant 24/7 responses", "Personalized greeting", "Contextual questions"]
          },
          {
            title: "AI asks key questions",
            desc: "The AI asks naturally to understand needs, budget, and urgency.",
            features: ["Custom qualification questions", "Real-time response analysis", "Buying intent detection"]
          },
          {
            title: "Automatic Assignment in CRM / Sales Pipeline",
            desc: "Based on business rules (scoring, tags, and geography), the lead is automatically assigned to a stage in the sales pipeline and to an owner. If API integration is enabled, a webhook is sent to the client's CRM; otherwise, it remains in the native CRM with the correct status.",
            /* features: [
              "Configurable scoring target in admin (scoreRules)",
              "Webhook POST /integrations/crm/lead with standard payload",
              "Fallback: If the webhook fails 3 times → mark integration_error",
              "Timeline: Auto-assigned to [Stage] by ruleset [name]"
            ] */
          }
        ],
        badge: "The entire process takes less than 2 minutes",
        footer: "While your team focuses on closing sales"
      },
      comparison: {
        title: "Manual Qualification vs AI",
        subtitle: "Discover why hundreds of companies are replacing manual qualification with AI",
        traditional: {
          label: "Traditional Process",
          title: "Traditional Process",
          costLabel: "Average cost: $3,000+ USD/mo per person",
          items: [
            { title: "Slow and tedious", description: "Hours or days to qualify each lead manually" },
            { title: "Inconsistent criteria", description: "Each person qualifies differently, no clear standards" },
            { title: "High operational cost", description: "You need a dedicated team just to qualify" },
            { title: "Lost opportunities", description: "Hot leads go cold while waiting for attention" },
            { title: "No scalability", description: "Cannot process more leads without hiring more people" },
            { title: "Limited hours", description: "Only works during business hours, losing night leads" }
          ]
        },
        automatic: {
          badge: "Recommended",
          label: "Automatic Qualification",
          title: "Automatic Qualification",
          costLabel: "From $99 USD/mo - Unlimited Leads",
          items: [
            { title: "Instant qualification", description: "Each lead qualified in less than 5 seconds" },
            { title: "Standardized criteria", description: "Objective evaluation based on your defined criteria" },
            { title: "90% less expensive", description: "Qualify unlimited leads at no extra cost" },
            { title: "Immediate response", description: "Hot leads receive attention instantly" },
            { title: "Infinite scalability", description: "Process 1 to 10,000 leads with the same efficiency" },
            { title: "24/7 Non-stop", description: "Qualify leads at any time, every day of the year" }
          ]
        }
      },
      metrics: {
        title: "Proven Results",
        subtitle: "Real metrics from companies already qualifying leads with AI",
        stats: [
          { value: "90%", label: "Accuracy in automatic qualification" },
          { value: "< 5 sec", label: "Average response time" },
          { value: "24/7", label: "Availability without interruptions" },
          { value: "3x", label: "More qualified leads per month" }
        ],
        ctaTitle: "Your team focused only on high-quality leads",
        ctaSubtitle: "Save time, increase conversions, and scale your business"
      }
    },
    architecture: {
      title: "What is delivered",
      subtitle: "Everything included for friction-free operation.",
      cards: [
        {
          title: "High-Performance Sites (Next.js)",
          desc: "Landing Pages/Sites ultra-fast, secure, and conversion-optimized infrastructure built to eliminate bounce rates and maximize organic reach.",
          features: [
            "Native SEO & Core Web Vitals: Unlike WordPress or Wix, our Next.js architecture delivers sub-second load times and perfect lighthouse scores for superior Google ranking.",
            "Bulletproof Security: Serverless deployment eliminates database vulnerabilities and legacy plugin bloat, ensuring 99.9% uptime even under heavy traffic spikes.",
            "Premium UX with Framer Motion: Apple-grade fluid animations that guide user attention and build instant brand authority that no-code builders cannot replicate."
          ]
        },
        {
          title: "Sales Concierge (EN/ES)",
          desc: "Sales Concierge with qualification script and objection handling.",
          features: ["Qualification script included", "Objection handling", "Bilingual (EN/ES)"]
        },
        {
          title: "Knowledge Base",
          desc: "Knowledge base built with your documents (prices, FAQs, services) so the AI knows your business.",
          features: ["Trained on your Prices", "Trained on your FAQs", "Trained on your Services"]
        },
        {
          title: "Automations & Mini-CRM",
          desc: "Calendar + CRM integration (HubSpot, GoHighLevel, Salesforce, Airtable). Note: If you don't use a CRM, a 'mini-CRM' in Budibase/Twenty is delivered ready to operate.",
          features: ["HubSpot / GHL / Salesforce", "Budibase/Twenty Mini-CRM", "Calendar Integration", "Emaling integration"]
        },
        {
          title: "Automations & Alerts",
          desc: "Automations (n8n) for emails, pipeline, and tasks. Plus team alerts (Slack alternative).",
          features: ["n8n Automations (Email/Pipeline)", "Team Alerts (Slack alternative)", "Instant Notification"]
        }
      ],
      crmCard: {
        badge: "Full Sync",
        title: "CRM · Sales Pipeline",
        description: "Lead management, contract signing, and sales pipeline in one place. Connect your CRM or use ours.",
        features: [
          { bold: "CRM", text: "Lead logging, conversation history, notes, and tags." },
          /* { bold: "Sign-up CRM", text: "Signup + e-signature flow tied to CRM to automate deals." }, */
          { bold: "Sales Pipeline", text: "Visual sales pipeline (custom stages): New → Contacted → Demo → Proposal → Close." },
          { bold: "Integration", text: "API integrations with external CRMs (depending on plan) or use our native CRM & pipeline." },
        ],
        button: "Use internal CRM"
      }
    },
    tech: {
      title: "Powered by",
      highlight: "OpenAI Technology",
      description: "We use OpenAI's most advanced AI models to deliver intelligent, context-aware conversations that drive real results.",
      models: [
        { title: "GPT-4.1 nano", desc: "Fastest, most cost-efficient model" },
        { title: "1,047,576 context window", desc: "Processes long, complex conversations" },
        { title: "32,768 max output tokens", desc: "Detailed, comprehensive responses" }
      ],
      chatkit: {
        title: "ChatKit",
        subtitle: "Conversational Widget Framework",
        list: [
          "Pre-built chat components",
          "Real-time streaming responses",
          "Tool and workflow integration",
          "File and image handling",
          "Cutting-edge technology"
        ]
      }
    },
    steps: {
      title: "How visits turn into meetings",
      subtitle: "I want to see an example with my process",
      items: [
        { title: "Capture", desc: "The prospect initiates a chat from your web or landing page." },
        { title: "Qualify", desc: "Autonoma asks 5–8 key questions (your checklist: budget, urgency, location, service type)." },
        { title: "Schedule", desc: "If qualified, books on your calendar and sends confirmation. La reserva se registra automáticamente en el CRM / Pipeline de ventas con score y tags del lead." },
        { title: "Sync (via CRM)", desc: "Create and update contacts and deals in your CRM/sales pipeline using structured data. If API integration is enabled, it will sync with your external CRM; otherwise, it will remain in the native CRM." },
        { title: "Alert", desc: "You get a message with: name, reason, score, calendar link, and CRM." }
      ]
    },
    vanguard: {
      title: "Vanguard Technology",
      subtitle: "at Small-Mid Market Price",
      description: "We build with the same tools used by the world's most innovative companies, but adapted to your budget.",
      card1: {
        title: "Built-In Search Engine Domination",
        desc: ["Next.js isn't just a framework—it's an", "SEO weapon", ". Google sees your content instantly. Your competitors using WordPress? They're fighting an uphill battle."],
        features: [
          "Server-Side Rendering (SSR)",
          "Automatic XML Sitemaps",
          "Semantic HTML5 + Schema Markup",
          "Image Optimization (WebP, lazy loading)",
          "Structured Data (JSON-LD)",
          "Mobile-First Indexing",
          "Canonical URLs",
          "Open Graph Tags"
        ],
        guarantee: "SEO Performance Guarantees:",
        metrics: [
          { label: "Lighthouse SEO Score", value: "90+" },
          { label: "First Contentful Paint", value: "<1.0s" },
          { label: "Time to Interactive", value: "<2.5s" },
          { label: "Layout Shift", value: "<0.1" },
          { label: "Google Indexed", value: "24-48hrs" }
        ]
      },
      card2: {
        title: "Every Millisecond = Money",
        desc: ["A 1-second delay kills", "7% of conversions", ". We guarantee", "<1 second load times", "."],
        metrics: [
          { label: "Load Time", value: "<1.0s" },
          { label: "Animations", value: "60 FPS" },
          { label: "Page Transitions", value: "Instant" },
          { label: "Edge Locations", value: "200+" }
        ],
        impactTitle: "Real Business Impact:",
        impact1: ["Amazon: 100ms delay", "= 1% revenue loss"],
        impact2: ["Google: 500ms delay", "= 20% traffic drop"]
      },
      techStack: {
        title: "Technology Stack",
        items: [
          { title: "Next.js 16", description: "SSR, SSG, API routes, code splitting" },
          { title: "Framer Motion", description: "60 FPS, spring physics, gestures" },
          { title: "Tailwind CSS", description: "40% smaller bundle, responsive, dark mode" },
          { title: "TypeScript", description: "Type-safe, catches bugs, maintainability" }
        ]
      },
      trust: {
        text: "Used by Industry Giants",
        stat1: "of top 10,000 websites",
        stat2: "developers trust Next.js"
      }
    },
    comparison: {
      title: "Generic Bots Hallucinate. Ours Doesn't.",
      card1: {
        title: "Generic AI Chatbots",
        items: [
          "Generic chatbots that hallucinate and give wrong answers",
          "Constant chatbot support tickets: 'Why did it say that?'",
          "Lead forgets to book a meeting—you chase them for days",
          "No lead qualification—wasted calls on tire-kickers",
          "Manual data entry into CRM (15+ minutes per lead)",
          "Sales team never notified until they check CRM"
        ]
      },
      card2: {
        title: "Autonoma.ai Sales Concierge",
        items: [
          "Specialized AI with narrow scope—qualifies + books ONLY",
          "Set-and-forget: AI trained on YOUR docs, zero ongoing support",
          "Meeting auto-booked in lead's calendar + confirmation email sent",
          "AI pre-qualifies leads—only hot leads get through",
          "Zero data entry—webhook syncs everything automatically",
          "Instant alert: 'Meeting booked with [Name] - Thu 2pm'"
        ]
      }
    },
    whatYouGet: {
      eyebrow: "What You Get",
      title: "Enterprise Value. Transparent Pricing. Benchmark Consulting Agencies in NYC/NJ",
      description: "We bundle the most powerful revenue infrastructure tools into one cohesive package.",
      marketValueLabel: "Market Value",
      totalLabel: "Total Market Value:",
      totalValue: "$29,500+",
      yourPriceLabel: "Your Price:",
      yourPriceValue: "$9,997",
      totalYear: "From $4,992 USD Set Up",
      products: [
        { title: "Landing Page Premium", value: "$12,500 USD", description: "Next.js 14, Framer Motion, SEO, responsive design with enterprise-grade performance." },
        { title: "AI Chatbot with RAG", value: "$10,000 USD", description: "Custom-trained on your data, vector embeddings, lead qualification & 24/7 availability." },
        { title: "n8n + CRM Integration", value: "$7,000 USD", description: "Workflow automation, OpenAI enrichment, API integrations & seamless CRM syncing." },
      ]
    },
    socialProof: {
      eyebrow: "Trusted by industry giants",
      quote: "Meetings book themselves now. No more chasing leads for days. The AI doesn't hallucinate because it only does ONE thing—qualify and schedule. We set it up once and haven't touched it since. Wake up to qualified leads already in HubSpot.",
      author: "Sarah Chen",
      role: "VP Sales @ TechCorp B2B SaaS",
      badges: [
        "Meetings Book Themselves",
        "No More Hallucinations",
        "Set & Forget"
      ]
    },
    /*     pricing: {
          title: "Investment Options Designed for ROI",
          subtitle: "Pay for Performance—Literally · Three Tiers Built for Different Growth Stages",
          eyebrow: "PRICING",
          tiers: [
            {
              name: "Foundation",
              tag: "TIER 1",
              price: "$697",
              dolar: "",
              period: "/month",
              setupFee: "+ $2,970 one-time setup",
              setupAlt: "OR $2,970 one-time setup + 4.5% of AI-generated appointment revenue",
              promo: "First month 50% discount",
              description: "Best for: Single-location medspas doing $15K–50K/month",
              roiTarget: "ROI Target: 3x in Month 1",
              features: [
                "Landing Page (One Single Page) in Next.js",
                "Web Chat AI",
                "Knowledge base — up to 10 services",
                "AI Sales Concierge (qualifies + books: Google Calendar, trained on your PDFs/FAQs)",
                "500 conversations/month",
                "Webhook → automation engine (capture → trigger → flow)",
                "CRM auto-sync (HubSpot / GoHighLevel / Salesforce / Airtable via API — check your plan — or our Open Source CRM)",
                "Basic Nurture: Confirmation email",
                "Basic monitoring + 1 monthly adjustment of prompts/flows",
                "Support SLA: 12–8 hrs",
                "LLM: OpenAI or Gemini"
              ],
              cta: "Get Started →",
              highlight: false
            },
            {
              name: "Free Pilot",
              tag: "START FREE PILOT",
              tagSub: "Available Only March",
              price: "$0",
              dolar: "",
              period: "",
              setupFee: "",
              setupAlt: "",
              promo: "",
              description: "1-week trial on YOUR website with YOUR services. Zero risk.",
              roiTarget: "",
              urgency: "Only available during March 2025",
              features: [
                "Web Chat AI",
                "AI Sales Concierge (qualifies + books: Google Calendar, trained on your PDFs/FAQs)",
                "Knowledge base — up to 2 services",
                "50 conversations",
                "Basic Nurturing",
                "Appointment Setting by email"
              ],
              cta: "Start Free Pilot →",
              highlight: true,
              footerNote: "No credit card required · Setup in 48 hrs · Your data, your site"
            },
            {
              name: "Scale Formula",
              tag: "COMING SOON",
              price: "",
              dolar: "",
              period: "",
              setupFee: "",
              setupAlt: "",
              promo: "",
              description: "Advanced multi-location features. Pricing announced Q2 2025.",
              roiTarget: "",
              features: [],
              cta: "Join Waitlist →",
              highlight: false,
              comingSoon: true
            }
          ],
          comparison: {
            title: "How Autonoma AI Compares to Other Options",
            text: "To get what Autonoma does (qualify and book, trigger webhook workflows, sync CRM, send confirmations, and alert the owner), you typically end up building a piece-meal stack and connecting it manually. Autonoma packages it as a “set-and-forget” system: Narrow-scope AI Sales Concierge (qualify + book) + webhook automation + CRM sync + team alerts.",
            cta: "See the full stack breakdown",
            modal: {
              title: "Build it piece‑by‑piece… or deploy one system",
              subtitle: "Stop stitching tools together. Autonoma captures, qualifies, and books meetings—then syncs everything automatically.",
              footer: "Autonoma runs the full flow “Webhook → CRM → Email → Alert” and notifies you only when there is a lead ready to buy.",
              tableHeaders: {
                features: "Features (what you need)",
                replaces: "Replaces (typical stack pieces)",
                tools: "Other tools (cost)",
                autonoma: "Autonoma AI"
              },
              tableRows: [
                { feat: "AI Sales Concierge (qualify + book only)", rep: "Generic chatbot + prompt mess", cost: "Varies", auto: true },
                { feat: "Knowledge trained on your docs (PDF/RAG)", rep: "KB tool + vector DB setup", cost: "Varies", auto: true },
                { feat: "Webhook → workflow automation", rep: "Zapier/Make/n8n DIY", cost: "Varies", auto: true },
                { feat: "CRM auto-sync", rep: "Custom integrations / manual entry", cost: "Varies", auto: true },
                { feat: "Confirmation email automation", rep: "Email tool + templates", cost: "Varies", auto: true },
                { feat: "Owner alerts (Slack/Discord/Teams)", rep: "Separate notification plumbing", cost: "Varies", auto: true },
                { feat: "Works with HubSpot/GoHighLevel/Salesforce/Airtable", rep: "Multiple connectors", cost: "Varies", auto: true },
              ]
            }
          }
        }, */
    pricing: {
      title: "Investment Designed for ROI",
      subtitle: "Pay for Performance · Three Levels for Different Growth Stages",
      eyebrow: "PRICING",
      tiers: [
        {
          name: "Foundation",
          tag: "TIER 1",
          price: "$697",
          dolar: "",
          period: "/month",
          setupFee: "+ $2,970 one-time setup payment",
          setupAlt: "Or $2,970 one-time setup payment + 4.5% of revenue generated by AI",
          promo: "First month 50% discount",
          description: "Ideal for: Single-location or remote billing $15K–50K/month",
          roiTarget: "ROI Target: 3x in Month 1",
          features: [
            "Landing Page (Single Page) in Next.js",
            "Web Chat AI",
            "Knowledge base — up to 10 services",
            "AI Sales Concierge (qualifies + schedules: Google Calendar, trained with your PDFs/FAQs)",
            "500 conversations/month",
            "Webhook → automation engine (capture → trigger → flow)",
            "CRM auto-sync (HubSpot / GoHighLevel / Salesforce / Airtable via API — depending on your plan — or our Open Source CRM)",
            "Basic nurturing: Confirmation email",
            "Basic monitoring + 1 monthly adjustment of prompts/flows",
            "Support SLA: 12–8 hrs",
            "LLM: OpenAI or Gemini",

            "Smart lead qualification by profile",
            "Fully automated email follow-up",
            "Schedules meetings in real time from chat",
            "CRM with active pipeline included in the plan",
            "Broad and customizable knowledge base",
            "Adapts tone and responses according to the prospect",
          ],
          cta: "Start →",
          highlight: false
        },
        {
          name: "Free Pilot",
          tag: "START FREE PILOT Only in March/April",
          tagSub: "Only for qualified business",
          price: "$0",
          dolar: "",
          period: "",
          setupFee: "",
          setupAlt: "",
          promo: "",
          description: "1 week trial on YOUR website with YOUR services. No risk.",
          roiTarget: "",
          urgency: "Only available during March 2025",
          features: [
            "Web Chat AI",
            "AI Sales Concierge (qualifies + schedules: Google Calendar, trained with your PDFs/FAQs)",
            "Knowledge base — up to 2 services",
            "50 conversations",
            "Basic nurturing",
            "Appointment scheduling via email",

            "Automatically answers frequently asked questions",
            "Captures prospect's name, email, and phone",
            "1 active channel: webchat",
            "Knowledge base of up to 30 questions",
            "Team notification for each new lead",
          ],
          cta: "Start Free Pilot →",
          highlight: true,
          footerNote: "No credit card · Setup in 48 hrs · Your data, your site"
        },
        {
          name: "Performance",
          tag: "TIER 2",
          tagSub: "MOST POPULAR",
          price: "$797",
          dolar: "",
          period: "/month",
          setupFee: "+ $3,470 one-time setup payment",
          setupAlt: "Or $3,470 one-time setup payment + 5.5% of revenue generated by AI",
          promo: "",
          description: "Everything included in Foundation + SMS integration",
          roiTarget: "ROI Target: 5x in Month 1",
          features: [
            "SMS integration",
            "Knowledge base — up to 30 services (FAQs)",
            "Unlimited conversations",
            "A/B testing of conversational flows",
            "Priority support (SLA 8–4 hrs)",
            "Advanced nurturing with CRM / Sales Pipeline Dashboard",
            "No-show reduction (automatic reminders)",
            "Package upselling (AI identifies high-value patients)",

            "WhatsApp + Webchat + Instagram + Discord simultaneously",
            "Unified context across all channels",
            "Lead can switch channels without losing the thread",
            "Multi-channel CRM consolidated in a single view",
            "Performance reports by channel",
          ],
          cta: "Scale Now →",
          highlight: false,
          footerNote: "Ideal for: Growing Medspas ready to scale ($50K–100K/month)"
        },
        {
          name: "Enterprise",
          tag: "TIER 3",
          price: "Custom Pricing",
          dolar: "",
          period: "",
          setupFee: "$4,970 setup + $997/month + 6.5% of revenue generated by AI",
          setupAlt: "",
          promo: "",
          description: "Everything included in Performance",
          roiTarget: "ROI Target: 10x in the First Quarter",
          features: [
            "Multi-location management",
            "White-label branding",
            "Custom API integrations",
            "Dedicated success manager",
            "Quarterly business reviews",

            "Integration with your existing ERP or CRM",
            "Catalogs of 500+ products with smart search",
            "Multi-language: Spanish, English, and Portuguese",
            "Tailor-made conversation flows",
            "Custom reports and dashboards",
            "Dedicated support with service level agreement",
          ],
          cta: "Contact Sales →",
          highlight: false,
          footerNote: "Ideal for: MedSpa chains or franchises ($100K+ monthly)"
        },
        /*         {
                  name: "Scale Formula",
                  tag: "COMING SOON",
                  price: "",
                  dolar: "",
                  period: "",
                  setupFee: "",
                  setupAlt: "",
                  promo: "",
                  description: "Advanced features for multiple locations. Pricing announced Q2 2025.",
                  roiTarget: "",
                  features: [],
                  cta: "Join the Waitlist →",
                  highlight: false,
                  comingSoon: true
                } */
      ],
      comparison: {
        title: "How Autonoma AI compares with other options",
        text: "To get what Autonoma does (qualify and schedule, trigger webhook to workflows, sync CRM, send confirmations and alert the owner), you usually end up building a stack piece by piece and connecting it manually. Autonoma packages it as a “set-and-forget” system: AI Sales Concierge with narrow scope (qualify + schedule) + webhook automation + CRM sync + team alerts.",
        cta: "See full stack breakdown",
        modal: {
          title: "Build it piece by piece... or deploy a system",
          subtitle: "Stop patching tools together. Autonoma captures, qualifies, and schedules meetings, then syncs everything automatically.",
          footer: "Autonoma runs the full flow “Webhook → CRM → Email → Alert” and notifies you only when there’s a lead ready to buy.",
          tableHeaders: {
            features: "Functionalities (what you need)",
            replaces: "Replaces (typical pieces)",
            tools: "Other tools (cost)",
            autonoma: "Autonoma AI"
          },
          tableRows: [
            { feat: "AI Sales Assistant (qualifies + schedules)", rep: "Generic chatbot + prompt mess", cost: "Varies", auto: true },
            { feat: "Knowledge trained with your docs (PDF/RAG)", rep: "KB tool + vector DB setup", cost: "Varies", auto: true },
            { feat: "Webhook → flow automation", rep: "Zapier/Make/n8n (Do it yourself)", cost: "Varies", auto: true },
            { feat: "Automatic CRM sync", rep: "Custom integrations / manual upload", cost: "Varies", auto: true },
            { feat: "Confirmation email automation", rep: "Email tool + templates", cost: "Varies", auto: true },
            { feat: "Owner alerts (Slack/Discord/Teams)", rep: "Separate notification setup", cost: "Varies", auto: true },
            { feat: "Works with HubSpot/GoHighLevel/Salesforce/Airtable", rep: "Multiple connectors", cost: "Varies", auto: true }
          ]
        }
      }
    },
    trust: {
      title: "Test before scaling",
      subtitle: "Start with a short pilot to validate that it books real meetings (not just chats).",
      items: [
        "Qualification checklist",
        "'Qualified Lead' definition",
        "CRM Setup"
      ]
    },
    retainer: {
      title: "Monthly Retainer",
      subtitle: "Full-Stack Maintenance",
      perMonth: "/mo",
      perMonthLong: "USD/month",
      description: "Everything you need to keep your AI sales system running at peak performance. Transparent pricing, no hidden fees.",
      slaLinkText: "See more SLA support...",
      categories: [
        {
          title: "Landing Page Infrastructure",
          total: "$179",
          items: [
            { name: "Serverless Hosting", price: "$99/mo", description: "Unlimited bandwidth, 200+ edge locations, 99.99% uptime" },
            { name: "Domain & DNS Management", price: "$30/mo", description: "SSL certificates, CDN configuration" }
          ]
        },
        {
          title: "AI Sales Concierge",
          total: "$349",
          items: [
            {
              name: "OpenAI API (GPT-4.1 Nano) Or Google (Gemini 2.5 Flash-Lite)",
              price: "$199/mo",
              description: "Up to 10k Interactions/Request per month. Note: An interaction is the complete 'question and answer' cycle."
            },
            { name: "Vector Database (RAG + Embeddings)", price: "$95/mo", description: "50k vectors" },
            { name: "Chatbot Widget Hosting", price: "$55/mo", description: "Pusher Channels, 1000k messages/month" }
          ]
        },
        {
          title: "Workflow Automation",
          total: "$169",
          items: [
            { name: "Cloud Hosting (n8n)", price: "$89/mo", description: "5k workflow runs/month" },
            { name: "CRM API Maintenance", price: "$50/mo", description: "HubSpot/Salesforce/GoHighLevel sync. Please note that accessing the API for CRM integration may incur additional costs depending on your provider." },
            { name: "Email Automation", price: "$30/mo", description: "3k emails/month, DKIM/SPF/DMARC" }
          ]
        },
        {
          title: "Support",
          total: "Included",
          items: [
            {
              name: "Priority Technical Support",
              price: "Included",
              description: "Guaranteed response times based on priority.",
              hasSLA: true
            },
            { name: "AI Model Updates & Retraining", price: "Included", description: "1 update/month (RAG/Embedding) Max 50 Pages (Base Knowledge)" }
          ]
        }
      ],
      sla: {
        title: "Service Level Agreement (SLA)",
        headers: ["Priority", "Impact", "Target Response Time", "Target Resolution Time"],
        rows: [
          { priority: "P1 - Critical", impact: "Full service interruption / Outage", response: "15 - 30 min", resolution: "< 4 - 8 hours" },
          { priority: "P2 - High", impact: "Critical functionality affected", response: "1 hour", resolution: "< 24 hours" },
          { priority: "P3 - Medium", impact: "Minor issue / Limited usage", response: "4 business hours", resolution: "3 - 5 business days" },
          { priority: "P4 - Low", impact: "General inquiries / Cosmetic requests", response: "1 business day", resolution: "> 5 business days" }
        ],
        close: "Close"
      },
      summary: {
        label: "MONTHLY RETAINER",
        priceLine1: "$497",
        priceLine2: "After $597 USD",
        note: "First month FREE with deployment"
      },
      benefits: [
        { title: "Set It & Forget It", description: "We monitor 24/7, auto-deploy updates" },
        { title: "Fixed Monthly Cost", description: "No surprise AWS bills, predictable budgeting" },
        { title: "Priority Support", description: "Direct Slack channel, 24hr response" }
      ],
      policy: {
        title: "Transparent Overage Policy",
        conversationTitle: "Conversation Overages",
        conversations: [{ range: "10,001 - 20,000", price: "+$150/mo", rate: "$0.015/interaction" }, { range: "20,001 - 50,000", price: "+$300/mo", rate: "$0.010/interaction" }, { range: "50,000+", price: "Custom", rate: "Enterprise pricing" }],
        workflowTitle: "Workflow Overages (n8n)",
        workflows: [{ range: "5,001 - 10,000 runs", price: "+$50/mo" }, { range: "10,000+ runs", price: "+$100/mo" }],
        note: "We'll always notify you before you hit overages. No surprise bills."
      },
      addOns: {
        title: "Add-On Services (À La Carte)",
        items: [{ name: "Extra AI Knowledge Base Updates", price: "$597/update", note: "(1/month included)" }, { name: "Custom Feature Development", price: "$75/hour", note: "" }, { name: "White-Label Support (Resellers)", price: "+$300/mo", note: "per client" }]
      },
      cta: "Add Retainer to My Project",
      finePrint: ["First month FREE when signing up during deployment", "Cancel anytime (30-day notice)"]
    },
    cta: {
      title: "Deploy Your Autonomous Sales System",
      subtitle: "Get the complete infrastructure: AI Chatbot + n8n Workflows + CRM Integration + Sales Alerts. Delivered in 14 - 21 business days.",
      button: "Schedule Implementation Call",
      secondaryText: "14 - 21 days deployment · Your CRM, your data · Full system ownership",
      features: [
        "Works with HubSpot, Salesforce, Airtable",
        "Slack/Discord/Teams alerts",
        "OpenAI-powered qualification"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about the tech and the process.",
      items: [
        { q: "What happens if I need custom changes after launch?", a: "We don't charge high hourly rates for small changes. Instead, we offer 'Improvement Buckets' of 5, 10, or 20 hours that you can purchase anytime for specific customizations, new flows, or advanced tweaks." },
        { q: "What is included in the technical infrastructure?", a: "The Core System includes a dedicated Vector Database (for your knowledge base), our custom AI Chat Widget, a private n8n automation instance, and the Alert System connected to your CRM and team channels (Slack/Teams)." },
        { q: "What happens if I exceed my monthly conversation limits?", a: "Don't worry, the service doesn't stop. If you exceed the limits, a growth package is automatically enabled. We will notify you in advance so there are no surprises on your bill." }
      ]
    },
    footer: {
      tagline: "Revenue Operations Infrastructure",
      builtWith: "Built with Next.js ⚡",
      copyright: "© 2025 Autonoma.ai. All rights reserved.",
      links: [
        { name: "Architecture", href: "#architecture" },
        { name: "Pricing", href: "#pricing" },
      ]
    },
    onboarding: {
      closeAriaLabel: "Close form",
      stepCompany: {
        title: "What company do you work for?",
        placeholder: "Acme Corporation",
        helper: "This helps us understand your business context",
        errorEmpty: "Please enter your company name",
        errorShort: "Company name must be at least 2 characters"
      },
      stepCRM: {
        title: "Which CRM do you currently use?",
        placeholderOther: "Which CRM do you use?",
        noCrmMessage: "No problem! We can set up an open-source CRM for you."
      },
      stepDealValue: {
        title: "What's your average deal value?",
        subtitle: "This helps us calculate your potential ROI",
        warningText: "Our system is optimized for high-ticket services. However, if you have high lead volume (500+/month), we can make it work. Want to continue?",
        warningBtnYes: "Yes, continue",
        warningBtnNo: "Select different option"
      },
      stepEmail: {
        title: "What's your work email?",
        errorEmpty: "Please enter your email address",
        errorInvalid: "Please enter a valid email address",
        warningGeneric: "We recommend using your company email for business inquiries",
        helper: "We'll send your custom proposal here"
      },
      stepPhone: {
        title: "What's your phone number?",
        placeholder: "+1 (555) 000-0000",
        errorEmpty: "Please enter your phone number",
        errorInvalid: "Please enter a valid phone number",
        helper: "We'll send the meeting confirmation via SMS/WhatsApp"
      },
      stepLeads: {
        title: "How many leads do you receive per month?",
        leadsPerMonth: "leads/month",
        categories: {
          starting: "Just starting",
          growing: "Growing consistently",
          highVolume: "High volume",
          enterprise: "Enterprise scale"
        },
        painPoints: {
          slow: "I lose leads due to slow response times",
          manual: "My team spends 10+ hours/week on manual entry"
        }
      },
      stepName: {
        title: "First, what's your name?",
        placeholder: "John Doe",
        errorEmpty: "Please enter your full name",
        errorShort: "Name must be at least 2 characters",
        helper: "We will use this to personalize your proposal"
      },
      stepReview: {
        title: "Review your Information",
        nextTitle: "What happens next?",
        sending: "Sending...",
        submitBtn: "Submit and Receive Proposal",
        labels: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          company: "Company",
          crm: "CRM",
          leads: "Leads/mo",
          dealValue: "Deal Value",
          timeline: "Timeline",
          otherCrm: "Other CRM"
        },
        nextSteps: [
          { title: "In 24 to 48 Hours", description: "We will review your information and send a personalized proposal to your email" },
          { title: "In 48 - 72 Hours", description: "One of our Sales Managers will contact you to schedule your implementation or discovery call" },
          { title: "In 10 - 14 Days", description: "Your autonomous sales system goes live" }
        ],
        trust: {
          secure: "Your data is secure (SSL encrypted)",
          spam: "No spam, ever",
          response: "Average response time: 2 hours"
        }
      },
      stepThankYou: {
        title: "All Set!",
        emailSentTo: "We have sent a confirmation email to",
        inboxTitle: "Check your inbox in the next hour:",
        inboxItems: [
          "Personalized pricing proposal",
          "Success stories from similar companies",
          "Implementation timeline",
          "Link to schedule your call"
        ],
        scheduleBtn: "Schedule Call Now",
        shareTitle: "Know someone who needs this? Share this page",
        copyUrl: "Copy Link",
        copied: "Copied!"
      },
      stepTimeline: {
        title: "When are you looking to deploy this system?"
      },
      stepWelcome: {
        headline: "Let's Build Your Autonomous Sales System",
        subheadline: "It will take 2 minutes. We'll ask about your business, current tools, and goals.",
        trustBadge: "Your data is safe. We never share your information.",
        cta: "Start"
      }
    },
    form: {
      back: "Back",
      continue: "Continue",
      pressEnter: "Press Enter ↵",
      submitting: "Submitting...",
      step: "Step",
      of: "of",
      complete: "completed"
    },
    formOptions: {
      crm: {
        hubspot: "HubSpot",
        salesforce: "Salesforce",
        gohighlevel: "GoHighLevel",
        airtable: "Airtable",
        other: "Other CRM",
        none: "I don't have a CRM yet"
      },
      dealValue: {
        "under-1k": { label: "Under $1,000", fit: "Not ideal for our system" },
        "1k-5k": { label: "$1,000 - $5,000", fit: "Good fit" },
        "5k-20k": { label: "$5,000 - $20,000", fit: "Perfect fit" },
        "20k-plus": { label: "$20,000+", fit: "Ideal client" }
      },
      timeline: {
        asap: { label: "ASAP (This Week)", badge: "Priority", desc: "We have 1 spot available this week", cta: "Schedule Urgent Call" },
        "2-4-weeks": { label: "In 2-4 Weeks", badge: "Standard", desc: "Most common timeline", cta: "Schedule Implementation" },
        "1-3-months": { label: "1-3 Months", badge: "Planning", desc: "We'll send you detailed info", cta: "View Pricing PDF + Follow up" },
        researching: { label: "Just Researching", badge: "Exploring", desc: "No pressure, let's keep in touch", cta: "Send me Resources" }
      }
    },
    workflowVisual: {
      nodes: {
        visitor: { label: "Web Visit", sublabel: "Prospect arrives" },
        ai: { label: "AI Assistant", sublabel: "Qualifies + Books" },
        workflow: { label: "AI Workflow", sublabel: "n8n triggered" },
        crm: { label: "CRM / Sales Pipeline", sublabel: "ACTIVE" },
        alert: { label: "Owner Alert", sublabel: "Meeting booked!" },
        operation: { title: "Your entire operation, visible in real time" },
        panelTitle: { title: "Control panel" },
        headerDescription: { title: "From the first message to the delivered order — all in one place" },
      },

      states: {
        interesado: "interested",
        negociacion: "negotiation",
        propuesta: "proposal",
        contactado: "contacted",
      },
      tasks: {
        send: "Send follow-up to Roberto V. (3 days without response)",
        confirm: "Confirm appointment with Maria G. — Thursday 2pm",
        update: "Update price in catalog — photography service",
      },

      popover: {
        title: "Sales Pipeline",
        leadsActive: "Active leads",
        inNegotiation: "In negotiation",
        wonThisMonth: "Won this month",
        lastActivity: "Last activity",
        lastActivityTime: "3 min ago",
        openCRM: "Open CRM →"
      },
      cards: {
        meeting: "Meeting Thu 2pm ✓",
        payload: "→ Payload sent in 0.3s",
        lead: "✓ Lead registered in CRM / Sales Pipeline — Stage: Demo — Score: 87",
        synced: "✓ Synced to HubSpot + Email sent",
        alertMsg: "'Meeting booked: John - Thu 2pm'"
      },
      metadata: {
        user: "John from Acme Corp"
      },
      active: "ACTIVE"
    },
    liveDemo: {
      productionLabel: "PRODUCTION — victormanetattoo.com",
      realClientNote: "Real client · Live system · Not a fabricated demo",
      panelTitle: "CRM / Sales Pipeline",
      panelBadge: "LIVE",
      leadCard: {
        newVisitor: "New Visitor",
        source: "victormanetattoo.com · Chat widget",
        stageLabel: "Stage",
        scoreLabel: "AI Score",
        chatStatus: "Chatting",
        scorePlaceholder: "—",
      },
      capturedData: "Captured data:",
      waitingResponses: "Waiting for responses...",
      conversationTitle: "Conversation",
      cta: {
        start: "Watch demo in real time",
        running: "AI qualifying lead...",
        completed: "Lead converted · Consultation booked",
        retry: "Watch again"
      },
      footerStats: [
        { value: "< 10 min", label: "AI setup on your site" },
        { value: "100%", label: "Trained on Victor's real services" },
        { value: "24/7", label: "Qualifying while you sleep" },
      ],
      chatSteps: [
        { id: 1, type: "bot", message: "Hey! I'm Mane's AI assistant. Are you thinking about your first tattoo or adding to your collection?", delay: 0 },
        { id: 2, type: "user", message: "First tattoo. I want a portrait of my dog.", delay: 1800 },
        { id: 3, type: "bot", message: "Love that! Portrait realism is Victor's specialty. What size are you thinking — and do you have a photo of your dog?", delay: 3200 },
        { id: 4, type: "user", message: "Maybe forearm size. Yes I have photos.", delay: 5000 },
        { id: 5, type: "bot", message: "Perfect. Forearm portraits typically run $400–$650 depending on detail. Victor has availability next week. Want me to book a free 30-min consultation?", delay: 6800 },
        { id: 6, type: "user", message: "Yes, Thursday works!", delay: 8400 },
        { id: 7, type: "bot", message: "Done! ✓ Consultation booked for Thursday. You'll receive a confirmation + design brief to fill out. Victor will review your photo before the session.", delay: 9800, isBooking: true },
      ],
      demo: {
        title: "Visit web"
      },
      crmStates: [
        {
          triggerAtStep: 1,
          stage: "New Lead",
          stageColor: "#3B82F6",
          score: 0,
          scoreLabel: "Qualifying...",
          scoreColor: "#A1A1AA",
          status: "Chatting",
          statusColor: "#F59E0B",
          actions: [],
        },
        {
          triggerAtStep: 2,
          stage: "New Lead",
          stageColor: "#3B82F6",
          score: 42,
          scoreLabel: "Building...",
          scoreColor: "#F59E0B",
          status: "Engaged",
          statusColor: "#3B82F6",
          actions: ["Service: Portrait Realism"],
        },
        {
          triggerAtStep: 4,
          stage: "Interested",
          stageColor: "#F59E0B",
          score: 71,
          scoreLabel: "High intent",
          scoreColor: "#F59E0B",
          status: "Qualified",
          statusColor: "#00D084",
          actions: ["Service: Portrait Realism", "Size: Forearm", "Has reference photo ✓"],
        },
        {
          triggerAtStep: 6,
          stage: "Booking",
          stageColor: "#8B5CF6",
          score: 94,
          scoreLabel: "Hot lead",
          scoreColor: "#00D084",
          status: "Booking",
          statusColor: "#8B5CF6",
          actions: ["Service: Portrait Realism", "Size: Forearm", "Has reference photo ✓", "Budget: $400–$650 ✓"],
        },
        {
          triggerAtStep: 7,
          stage: "Won ✓",
          stageColor: "#00D084",
          score: 98,
          scoreLabel: "Converted",
          scoreColor: "#00D084",
          status: "Booked",
          statusColor: "#00D084",
          actions: ["Service: Portrait Realism", "Size: Forearm", "Has reference photo ✓", "Budget: $400–$650 ✓", "Thursday consultation booked"],
        },
      ],
    },
    dashboardPreview: {
      tabs: [
        { id: "resumen", label: "Summary" },
        { id: "bandeja", label: "Inbox" },
        { id: "pipeline", label: "Pipeline" },
        { id: "pedidos", label: "Orders" },
        { id: "perdidos", label: "Lost" },
        { id: "catalogo", label: "Catalog" },
      ],
      kpis: {
        leadsToday: "Leads today",
        inPipeline: "In pipeline",
        closeRate: "Close rate",
        monthlyRevenue: "Monthly revenue",
        goalLabel: "goal",
        improvedOverYesterday: "+3 vs yesterday",
      },
      topDeals: {
        title: "Top active deals"
      },
      lostReasonsTitle: "Reasons for lost deals",
      insightsTitle: "AI Insights",
      lostDealsTitle: "Latest lost deals",
      lostDeals: {
        reactivateButton: "Reactivate"
      },
      tasks: {
        title: "AI pending actions",
        placeholder: "Type a message...",
        replyButton: "Reply as AI",
        manualButton: "Manual"
      },
      pipeline: {
        leadsLabel: "leads",
        moreLabel: "more"
      },
      orders: {
        labels: {
          id: "#",
          client: "Client",
          description: "Description",
          value: "Value",
          status: "Status",
          date: "Date"
        },
        kpiLabels: [
          { label: "Orders today", value: 7 },
          { label: "In preparation", value: 12 },
          { label: "Pending delivery", value: 5 },
          { label: "Completed", value: 84 },
        ]
      },
      catalog: {
        searchPlaceholder: "Search service...",
        addServiceButton: "Add service",
        toggleAILabel: "Toggle AI",
        instructionsTitle: "AI instructions",
        instructionsText: "When the customer mentions urgency, always offer the full package. If they ask about price, give a range and offer a 10-minute call to personalize."
      },
      conversationPlaceholder: "Select a conversation to see details.",
      replyPlaceholder: "Type a message...",
      aiActive: "AI active",
      newVisitor: "New visitor",
      stageLabel: "Stage",
      scoreLabel: "AI Score",
      chatStatus: "Chatting",
      scorePlaceholder: "—",
    },
    value: {
      headerTagline: "THE COMPLETE SOLUTION",
      headerTitle: "Everything You Get for Less Than the Cost of One Employee",
      headerDescription: "A complete AI-powered sales and customer service system...",
      realValueLabel: "Real Value",
      combinedValueLabel: "Combined Value",
      combinedValueAmount: "$4,800/month",
      combinedValueDescription: "in premium features and services",
      /* offerLabel: "TODAY'S OFFER", */
      offerLabel: "OFFER ONLY FOR HISPANIC CHAMBER OF COMMERCE OF NEW JERSEY",
      setupFeeLabel: "Setup Fee",
      setupFeeAmount: "$1,497",
      monthlyLabel: "Monthly",
      monthlyAmount: "$497/mo",
      where: "in premium features and services",
      initialTotalText: "Initial Total",
      initialTotalAmount: "$1,994 USD",
      launchDescription: "Launch your AI sales and support system...",
      ctaButton: "Book a Demo",
      ctaDescription: "See how your AI agent can start working...",
      valueItems: [
        {
          icon: "Users",
          title: "Virtual Secretary 24/7",
          realValue: "$4,000/month",
          description: "Answers customers instantly, follows up automatically, handles FAQs, and supports your business day and night."
        },
        {
          icon: "BarChart3",
          title: "CRM + Management Dashboard",
          realValue: "$200/month",
          description: "Manage leads, track conversations, monitor performance, and keep your business organized in one place."
        },
        {
          icon: "Zap",
          title: "AI Appointment Setter",
          realValue: "$300/month",
          description: "Qualifies leads, books appointments, sends reminders, and helps reduce missed opportunities."
        },
        {
          icon: "BarChart3",
          title: "Sales Pipeline + Calendar + Unified Inbox",
          realValue: "$300/month",
          description: "Track every opportunity, manage appointments visually, and centralize all conversations in one inbox for faster follow-up."
        }
      ],
      trustPoints: ["No extra payroll", "No missed leads", "No 24/7 staffing costs",
        "Works even while you sleep"]
    }
  },

  // -------------------------------------------------------------------------------------
  // VERSIÓN EN ESPAÑOL
  // -------------------------------------------------------------------------------------
  es: {
    nav: { architecture: "Arquitectura", pricing: "Precios" },
    hero: {
      eyebrow: "Asistente de Ventas IA",
      h1: "Deja de perseguir leads. Agenda reuniones calificadas 24/7.",
      subhead: "Autonoma es tu Asistente de Ventas bilingüe (EN/ES) que califica prospectos con tus reglas y agenda en tu calendario. Tú solo entras cuando ya hay intención real de compra.",
      ctaPrimary: "Ver si Autonoma encaja en mi negocio",
      ctaSecondary: "Quiero un pilot de 14 días",
      trustBadge: "Solo responde desde tus docs + solo ejecuta 1 acción (agendar) + fallback humano.",
      bullets: [
        "Califica y agenda (misión única: reuniones)",
        "Entrenado con tus precios/FAQs/servicios",
        "Sin trabajo manual: CRM + email + alertas",
        "Implementación en 10 días hábiles",
        "Fallback seguro: deriva al equipo si duda"
      ],
    },
    agentTiersSection: {
      eyebrow: "Elige tu nivel de automatización",
      title: "El agente correcto para cada etapa de tu negocio",
      subtitle: "Desde tu primera automatización hasta operaciones enterprise de alto volumen.",
      popu: "Más Popular",
      plan: "Plan",
      tiers: [
        {
          index: 1,
          name: "Asistente FAQ",
          tagline: "Captura leads 24/7 sin intervención humana",
          badge: "Ideal para landing pages",
          features: [
            "Responde preguntas frecuentes automáticamente",
            "Captura nombre, email y teléfono del prospecto",
            "1 canal activo: webchat",
            "Base de conocimiento de hasta 30 preguntas",
            "Notificación al equipo por cada lead nuevo",
          ],
          cta: "Empezar aquí",
          highlight: false,
        },
        {
          index: 2,
          name: "Agente de Ventas + CRM",
          tagline: "Califica, negocia y agenda sin un SDR",
          badge: "Para equipos de ventas activos",
          features: [
            "Calificación inteligente de leads por perfil",
            "Seguimiento por email completamente automatizado",
            "Agenda reuniones en tiempo real desde el chat",
            "CRM con pipeline activo incluido en el plan",
            "Base de conocimiento amplia y personalizable",
            "Adapta el tono y las respuestas según el prospecto",
          ],
          cta: "Ver demo",
          highlight: true,
        },
        {
          index: 3,
          name: "Ejecutivo IA Multi-canal",
          tagline: "Un agente que recuerda todo, sin importar el canal",
          badge: "Para negocios con alta demanda",
          features: [
            "WhatsApp + Webchat + Instagram + Discord simultáneos",
            "Contexto unificado entre todos los canales",
            "El lead puede cambiar de canal sin perder el hilo",
            "CRM multi-canal consolidado en una sola vista",
            "Reportes de rendimiento por canal",
          ],
          cta: "Cotizar",
          highlight: false,
        },
        {
          index: 4,
          name: "Enterprise Personalizado",
          tagline: "Integrado a tu operación desde el día uno",
          badge: "Para operaciones complejas",
          features: [
            "Integración con tu ERP o CRM existente",
            "Catálogos de 500+ productos con búsqueda inteligente",
            "Multi-idioma: español, inglés y portugués",
            "Flujos de conversación diseñados a medida",
            "Reportes y dashboards personalizados",
            "Soporte dedicado con acuerdo de nivel de servicio",
          ],
          cta: "Hablar con ventas",
          highlight: false,
        },
      ]
    },
    inboxSection: {
      conversations: [
        {
          name: "Carlos Mendoza",
          channel: "WhatsApp",
          status: "Calificado",
          statusColor: "bg-green-500",
          message: "Sí, me interesa el plan Pro. ¿Cuándo podemos hablar?",
          time: "hace 2 min",
          avatar: "CM",
        },
        {
          name: "Ana Torres",
          channel: "Webchat",
          status: "En progreso",
          statusColor: "bg-yellow-500",
          message: "¿El agente funciona con mi tienda en línea?",
          time: "hace 15 min",
          avatar: "AT",
        },
        {
          name: "Roberto Silva",
          channel: "Instagram",
          status: "Nuevo",
          statusColor: "bg-blue-500",
          message: "Hola, vi su publicación y quería más info",
          time: "hace 1h",
          avatar: "RS",
        },
        {
          name: "Daniela Reyes",
          channel: "WhatsApp",
          status: "Seguimiento",
          statusColor: "bg-orange-500",
          message: "Perdona, se me pasó responder...",
          time: "hace 3h",
          avatar: "DR",
        },
        {
          name: "Miguel Vargas",
          channel: "Webchat",
          status: "Cerrado",
          statusColor: "bg-gray-500",
          message: "Perfecto, quedamos así entonces.",
          time: "ayer",
          avatar: "MV",
        },
      ],
      features: [
        {
          icon: Layers,
          label: "Vista Unificada",
          description: "Todos los canales en una sola bandeja. Sin cambiar de app.",
        },
        {
          icon: Filter,
          label: "Filtros por Estado",
          description: "Nuevo, en progreso, calificado, cerrado. Enfócate donde importa.",
        },
        {
          icon: UserPlus,
          label: "Asignación de Leads",
          description: "Distribuye prospectos entre tu equipo en segundos desde la misma vista.",
        },
        {
          icon: ScrollText,
          label: "Historial Completo",
          description: "Cada mensaje, cada respuesta, en orden cronológico e inmutable.",
        },
        {
          icon: Search,
          label: "Búsqueda Potente",
          description: "Encuentra cualquier lead por nombre, empresa o texto de conversación.",
        },
        {
          icon: Download,
          label: "Exportación Directa",
          description: "Descarga conversaciones completas para auditoría o entrenamiento del agente.",
        },
      ],
      eyebrow: "Bandeja de entrada inteligente",
      title: "Todas las conversaciones. Un solo lugar.",
      subtitle: "Sin pestañas abiertas, sin leads perdidos en WhatsApp. Tu equipo enfocado en cerrar.",
      inbox: "Inbox",
      conver: "5 active conversations",
    },
    crmSection: {
      features: [
        {
          icon: LayoutDashboard,
          label: "Pipeline Visual",
          description: "Mueve leads entre etapas con drag & drop. Sin hojas de cálculo, sin caos.",
        },
        {
          icon: MessageSquare,
          label: "Historial Completo",
          description: "Cada mensaje que tu agente tuvo con cada prospecto, en orden cronológico.",
        },
        {
          icon: BarChart3,
          label: "Métricas en Tiempo Real",
          description: "Leads capturados, conversiones activas y velocidad de cierre en un solo vistazo.",
        },
        {
          icon: UserCheck,
          label: "Score de Leads",
          description: "Cada contacto llega calificado con empresa, cargo y nivel de prioridad.",
        },
        {
          icon: Bell,
          label: "Alertas de Leads Calificados",
          description: "Recibe un email en el momento en que entra un prospecto listo para cerrar.",
        },
        {
          icon: FileDown,
          label: "Reportes Exportables",
          description: "Descarga el rendimiento mensual completo en un clic. Sin depender de nadie.",
        },
        {
          icon: Users,
          label: "Roles por Usuario",
          description: "Admin, vendedor, viewer. Cada quien accede solo a lo que le corresponde.",
        },
        {
          icon: ShieldCheck,
          label: "Instancias Aisladas",
          description: "Los datos de cada cliente viven separados. Seguridad total por arquitectura.",
        },
        {
          icon: CalendarCheck,
          label: "Agenda Sincronizada",
          description: "Las citas agendadas por el agente aparecen en tu calendario de inmediato.",
        }
      ],
      demo: "Ver demo del CRM",
      eyebrow: "CRM incluido en cada plan",
      title: "Tu equipo de ventas, finalmente organizado",
      subtitle: "Cada agente viene con un CRM dedicado para que nunca pierdas un lead calificado.",
    },
    provenResults: {
      header: {
        badge: "LIVE DEMO — CLIENTE REAL",
        title: "Mira Autonoma trabajando en producción",
        subtitle: "Este es el sitio real de Victor Mane Tattoo Studio. El AI califica leads, agenda consultas y actualiza el CRM — sin intervención humana",
        cta: "Agendar Demo Gratis"
      },
      calificacionAutomatica: {
        title: "Calificación Automática",
        subtitle: "El sistema filtra y cualifica leads en tiempo real sin intervención humana.",
        badge: "Eficiencia 24/7",
        footer: {
          badge: "Calificación en menos de 5 segundos",
          text: "Tu equipo se enfoca solo en leads de alta prioridad"
        },
        flow: {
          newLead: {
            title: "Nuevo Lead",
            description: "El usuario inicia chat",
            infoCollected: "Info recolectada:",
            items: ["Nombre", "Empresa", "Interés"]
          },
          qualifying: {
            title: "Cualificando",
            description: "IA analiza perfil",
            criteria: "Criterios:",
            items: ["Presupuesto disponible", "Nivel de interés", "Urgencia de compra", "Fit con tu solución"]
          },
          results: {
            calificado: { title: "Calificado", subtitle: "Alta prioridad" },
            interesado: { title: "Interesado", subtitle: "Seguimiento moderado" },
            noCalifica: { title: "No califica", subtitle: "Descartado" },
            spam: { title: "Spam", subtitle: "Bloqueado" }
          }
        }
      },
      howItWorks: {
        title: "¿Cómo Funciona la Calificación Automática?",
        subtitle: "El IA califica tus leads en 3 simples pasos mientras tú te enfocas en cerrar ventas",
        steps: [
          {
            title: "Lead llega por Widget Chat",
            desc: "Cuando un potencial cliente te contacta, el IA inicia automáticamente una conversación natural",
            features: ["Respuestas instantáneas 24/7", "Saludo personalizado", "Preguntas contextuales"]
          },
          {
            title: "IA hace preguntas clave",
            desc: "El IA pregunta de forma natural para entender las necesidades, presupuesto y urgencia del lead",
            features: ["Preguntas de calificación personalizadas", "Análisis de respuestas en tiempo real", "Detección de intención de compra"]
          },
          {
            /* title: "Asignación automática al CRM",
            desc: "Basado en las respuestas, el IA asigna el lead al estado correcto de tu CRM y notifica a tu equipo",
            features: ["Calificación objetiva en segundos", "Integración directa con tu CRM", "Notificaciones prioritarias para leads calientes"] */
            title: "Asignación automática en CRM / Pipeline de ventas",
            desc: "Según reglas de negocio (scoring, tags y geografía) el lead se asigna automáticamente a una etapa del Pipeline de ventas y a un owner. Si está habilitada la integración API, se envía un webhook al CRM del cliente; si no, queda en el CRM nativo con el estado correcto.",
            /* features: [
              "Objetivo scoring configurable en admin (scoreRules)",
              "Webhook POST /integrations/crm/lead con payload estándar",
              "Fallback: si webhook falla 3 veces → marcar integration_error",
              "Timeline: Auto-assigned to [Stage] by ruleset [name]"
            ] */

          }
        ],
        badge: "Todo el proceso toma menos de 2 minutos",
        footer: "Mientras tu equipo se enfoca en cerrar ventas"
      },
      comparison: {
        title: "Calificación Manual vs IA",
        subtitle: "Descubre por qué cientos de empresas están reemplazando la calificación manual por IA",
        traditional: {
          label: "Proceso Tradicional",
          title: "Proceso Tradicional",
          costLabel: "Costo promedio: $3,000+ USD/mes por persona",
          items: [
            { title: "Lento y tedioso", description: "Horas o días para calificar cada lead manualmente" },
            { title: "Criterios inconsistentes", description: "Cada persona califica diferente, sin estándares claros" },
            { title: "Alto costo operativo", description: "Necesitas un equipo dedicado solo a calificar" },
            { title: "Pérdida de oportunidades", description: "Leads calientes se enfrían mientras esperan atención" },
            { title: "Sin escalabilidad", description: "No puedes procesar más leads sin contratar más personas" },
            { title: "Horario limitado", description: "Solo funciona en horario laboral, pierdes leads nocturnos" }
          ]
        },
        automatic: {
          badge: "Recomendado",
          label: "Calificación Automática",
          title: "Calificación Automática",
          costLabel: "Desde $99 USD/mes - Leads ilimitados",
          items: [
            { title: "Calificación instantánea", description: "Cada lead calificado en menos de 5 segundos" },
            { title: "Criterios estandarizados", description: "Evaluación objetiva basada en tu criterio definido" },
            { title: "90% menos costoso", description: "Califica ilimitados leads sin costo adicional" },
            { title: "Respuesta inmediata", description: "Los leads calientes reciben atención al instante" },
            { title: "Escalabilidad infinita", description: "Procesa 1 a 10,000 leads con la misma eficiencia" },
            { title: "24/7 Sin descanso", description: "Califica leads a cualquier hora, todos los días del año" }
          ]
        }
      },
      metrics: {
        title: "Resultados Comprobados",
        subtitle: "Métricas reales de empresas que ya califican leads con IA",
        stats: [
          { value: "90%", label: "Precisión en calificación automática" },
          { value: "< 5 seg", label: "Tiempo promedio de respuesta" },
          { value: "24/7", label: "Disponibilidad sin interrupciones" },
          { value: "3x", label: "Más leads calificados al mes" }
        ],
        ctaTitle: "Tu equipo enfocado solo en leads de alta calidad",
        ctaSubtitle: "Ahorra tiempo, aumenta conversiones y escala tu negocio"
      }
    },
    architecture: {
      title: "Lo que se entrega",
      subtitle: "Para que funcione sin fricción.",
      cards: [
        // --- TARJETA NUEVA AGREGADA (Versión en Español) ---
        {
          title: "Sitios de Alto Rendimiento (Next.js)",
          desc: "Infraestructura para Landing Pages ultra-rápida, segura y optimizada para conversión, diseñada para eliminar el rebote y maximizar alcance orgánico.",
          features: [
            "SEO Nativo y Core Web Vitals: A diferencia de WordPress o Wix, nuestra arquitectura Next.js ofrece tiempos de carga sub-segundo y puntuaciones Lighthouse perfectas para un ranking superior en Google.",
            "Seguridad A Prueba de Balas: El despliegue Serverless elimina vulnerabilidades de base de datos y el bloat de plugins legacy, asegurando 99.9% de uptime incluso bajo picos de tráfico pesado.",
            "UX Premium con Framer Motion: Animaciones fluidas nivel Apple que guían la atención del usuario y construyen autoridad de marca instantánea que los constructores no-code no pueden replicar."
          ]
        },
        // ---------------------------------------------------
        {
          title: "Asistente de Ventas (EN/ES)",
          desc: "Asistente de Ventas con guión de calificación y objeciones.",
          features: ["Guión de calificación incluido", "Manejo de objeciones", "Bilingüe (EN/ES)"]
        },
        {
          title: "Base de Conocimiento",
          desc: "Base de conocimiento con tus documentos (precios/FAQs/servicios).",
          features: ["Entrenado con tus Precios", "Entrenado con tus FAQs", "Entrenado con tus Servicios"]
        },
        {
          title: "Automatizaciones & Mini-CRM",
          desc: "Integración con calendario + CRM (HubSpot / GHL / Salesforce). Nota: Si no usas CRM, se entrega un “mini-CRM” en Budibase/Twenty listo para operar.",
          features: ["HubSpot / GHL / Salesforce", "Budibase/Twenty Mini-CRM", "Integración de Calendario", "Integración de Email"]
        },
        {
          title: "Automatizaciones & Alertas",
          desc: "Automatizaciones (n8n) para emails, pipeline y tareas. Alertas a tu equipo (Alternativa a Slack).",
          features: ["Automatizaciones n8n", "Alertas a Equipo (Slack alt.)", "Notificación Instantánea"]
        }
      ],
      crmCard: {
        badge: "Sincronización Total",
        title: "CRM · Sales Pipeline",
        description: "Gestión de leads, firma y flujo de ventas integrados. Integra tu CRM o usa el nuestro.",
        features: [
          { bold: "CRM", text: "Registro de leads, historial de conversaciones, notas y tags." },
          /* { bold: "Sign-up CRM", text: "Proceso de registro y firma ligado al CRM para automatizar altas y contratos." }, */
          { bold: "Sales Pipeline", text: "Pipeline de ventas visual (etapas personalizables): Nuevo → Contactado → Demo → Propuesta → Cierre." },
          { bold: "Integración", text: "Soporta integración vía API con CRMs externos (según plan del cliente) o usar nuestro CRM & Pipeline de ventas nativo." }
        ],
        button: "Usar CRM interno"
      }
    },
    tech: {
      title: "Potenciado por",
      highlight: "Tecnología OpenAI",
      description: "Usamos los modelos más avanzados de OpenAI para ofrecer conversaciones inteligentes y contextuales que generan resultados reales.",
      models: [
        { title: "GPT-4.1 nano", desc: "El modelo más rápido y rentable" },
        { title: "Ventana de contexto de 1M+", desc: "Procesa conversaciones largas y complejas" },
        { title: "32,768 tokens de salida", desc: "Respuestas detalladas y completas" }
      ],
      chatkit: {
        title: "ChatKit",
        subtitle: "Framework de Widget Conversacional",
        list: [
          "Componentes de chat preconstruidos",
          "Respuestas en tiempo real (streaming)",
          "Integración de herramientas y flujos",
          "Manejo de archivos e imágenes",
          "Tecnología de punta"
        ]
      }
    },
    steps: {
      title: "Así se convierten visitas en reuniones",
      subtitle: "Quiero ver un ejemplo con mi proceso",
      items: [
        { title: "Captura", desc: "El prospecto inicia chat desde tu web o landing." },
        { title: "Califica", desc: "Autonoma hace 5–8 preguntas clave (tu checklist: presupuesto, urgencia, ubicación, tipo de servicio)." },
        { title: "Agenda", desc: "Si califica, agenda en tu calendario y envía confirmación." },
        { title: "Sincroniza", desc: "Crea y actualiza el contacto y deal en tu CRM / Pipeline de ventas con datos estructurados. Si está habilitada la integración API, sincroniza con tu CRM externo; si no, queda en el CRM nativo." },
        { title: "Alerta", desc: "Te llega un mensaje con: nombre, motivo, score, enlace a calendario y CRM." }
      ]
    },
    vanguard: {
      title: "Tecnología de Vanguardia",
      subtitle: "a precio de mercado PyME",
      description: "Construimos con las mismas herramientas que usan las empresas más innovadoras del mundo, pero adaptadas a tu presupuesto.",
      card1: {
        title: "Dominación en Motores de Búsqueda",
        desc: ["Next.js no es solo un framework—it's an", "arma SEO", ". Google ve tu contenido al instante. ¿Tus competidores usan WordPress? Están peleando una batalla perdida."],
        features: [
          "Renderizado del lado del servidor (SSR)",
          "Sitemaps XML automáticos",
          "HTML5 Semántico + Schema Markup",
          "Optimización de imágenes (WebP, lazy load)",
          "Datos Estructurados (JSON-LD)",
          "Indexación Mobile-First",
          "URLs Canónicas",
          "Etiquetas Open Graph"
        ],
        guarantee: "Garantías de Rendimiento SEO:",
        metrics: [
          { label: "Puntaje SEO Lighthouse", value: "90+" },
          { label: "First Contentful Paint", value: "<1.0s" },
          { label: "Time to Interactive", value: "<2.5s" },
          { label: "Layout Shift", value: "<0.1" },
          { label: "Indexado en Google", value: "24-48hs" }
        ]
      },
      card2: {
        title: "Cada Milisegundo = Dinero",
        desc: ["Un retraso de 1 segundo mata el", "7% de las conversiones", ". Garantizamos", "tiempos de carga <1 segundo", "."],
        metrics: [
          { label: "Tiempo de Carga", value: "<1.0s" },
          { label: "Animaciones", value: "60 FPS" },
          { label: "Transiciones de Página", value: "Instantáneas" },
          { label: "Ubicaciones Edge", value: "200+" }
        ],
        impactTitle: "Impacto Real en el Negocio:",
        impact1: ["Amazon: 100ms retraso", "= 1% pérdida ingresos"],
        impact2: ["Google: 500ms retraso", "= 20% caída tráfico"]
      },
      techStack: {
        title: "Stack Tecnológico",
        items: [
          { title: "Next.js 16", description: "SSR, SSG, rutas API, code splitting" },
          { title: "Framer Motion", description: "60 FPS, físicas spring, gestos" },
          { title: "Tailwind CSS", description: "Bundle 40% más chico, responsive, dark mode" },
          { title: "TypeScript", description: "Type-safe, previene bugs, mantenibilidad" }
        ]
      },
      trust: {
        text: "Usado por Gigantes de la Industria",
        stat1: "del top 10,000 sitios web",
        stat2: "desarrolladores confían en Next.js"
      }
    },
    comparison: {
      title: "Los bots genéricos alucinan. El nuestro no.",
      card1: {
        title: "Chatbots de IA Genéricos",
        items: [
          "Chatbots genéricos que alucinan y dan respuestas incorrectas",
          "Tickets de soporte constantes: '¿Por qué dijo eso?'",
          "El lead olvida agendar—tienes que perseguirlo por días",
          "Sin calificación de leads—llamadas perdidas con curiosos",
          "Entrada manual de datos al CRM (15+ minutos por lead)",
          "El equipo de ventas no se entera hasta que revisa el CRM"
        ]
      },
      card2: {
        title: "Asistente de Ventas Autonoma.ai",
        items: [
          "IA especializada con alcance limitado—solo califica y agenda",
          "Configura y olvida: IA entrenada con TUS docs, cero soporte continuo",
          "Reunión auto-agendada en calendario + email de confirmación enviado",
          "IA pre-califica leads—solo pasan los leads calientes",
          "Cero entrada de datos—webhook sincroniza todo automáticamente",
          "Alerta instantánea: 'Reunión agendada con [Nombre] - Jue 2pm'"
        ]
      }
    },
    whatYouGet: {
      eyebrow: "Lo Que Obtienes",
      title: "Valor Empresarial. Precios Transparentes. Agencias de consultoría de referencia en Nueva York/Nueva Jersey",
      description: "Agrupamos las herramientas más potentes de infraestructura de ingresos en un paquete cohesivo.",
      marketValueLabel: "Valor de Mercado",
      totalLabel: "Valor Total de Mercado:",
      totalValue: "$29,500+",
      yourPriceLabel: "Tu Precio:",
      yourPriceValue: "$9,997",
      totalYear: "Desde $2,992 USD de instalación",
      products: [
        { title: "Landing Page Premium", value: "$12,500 USD", description: "Next.js 14, Framer Motion, SEO, diseño responsivo con rendimiento empresarial." },
        { title: "Chatbot IA con RAG", value: "$10,000 USD", description: "Entrenado con tus datos, embeddings vectoriales, calificación de leads y disponibilidad 24/7." },
        { title: "Integración n8n + CRM", value: "$7,000 USD", description: "Automatización de flujos, enriquecimiento con OpenAI, integraciones API y sincronización CRM." },
        // { title: "App de Colaboración", value: "$4,500 USD", description: "Configuración de Discord/Mattermost, alertas en tiempo real e infraestructura de comunicación." }
      ]
    },
    socialProof: {
      eyebrow: "Con la confianza de gigantes de la industria",
      quote: "Las reuniones se agendan solas. Ya no perseguimos leads por días. La IA no alucina porque solo hace UNA cosa: calificar y agendar. La configuramos una vez y no la hemos tocado. Nos despertamos con leads calificados ya en HubSpot.",
      author: "Sarah Chen",
      role: "VP Sales @ TechCorp B2B SaaS",
      badges: [
        "Reuniones se agendan solas",
        "Sin alucinaciones",
        "Configura y olvida"
      ]
    },
    /*    pricing: {
         title: "Inversión Diseñada para ROI",
         subtitle: "Paga por Rendimiento · Tres Niveles para Diferentes Etapas de Crecimiento",
         eyebrow: "PRECIOS",
         tiers: [
           {
             name: "Foundation",
             tag: "NIVEL 1",
             price: "$697",
             dolar: "",
             period: "/mes",
             setupFee: "+ $2,970 pago único de setup",
             setupAlt: "O $2,970 pago único de setup + 4.5% de ingresos generados por el AI",
             promo: "Primer mes 50% de descuento",
             description: "Ideal para: Medspas de una sola ubicación facturando $15K–50K/mes",
             roiTarget: "ROI Objetivo: 3x en el Mes 1",
             features: [
               "Landing Page (Una Sola Página) en Next.js",
               "Web Chat AI",
               "Base de conocimiento — hasta 10 servicios",
               "AI Sales Concierge (califica + agenda: Google Calendar, entrenado con tus PDFs/FAQs)",
               "500 conversaciones/mes",
               "Webhook → motor de automatización (captura → trigger → flujo)",
               "CRM auto-sync (HubSpot / GoHighLevel / Salesforce / Airtable vía API — según tu plan — o nuestro CRM Open Source)",
               "Nurturing básico: Email de confirmación",
               "Monitoreo básico + 1 ajuste mensual de prompts/flows",
               "Soporte SLA: 12–8 hrs",
               "LLM: OpenAI o Gemini"
             ],
             cta: "Comenzar →",
             highlight: false
           },
           {
             name: "Pilot Gratuito",
             tag: "INICIA PILOT GRATIS",
             tagSub: "Solo en Marzo",
             price: "$0",
             dolar: "",
             period: "",
             setupFee: "",
             setupAlt: "",
             promo: "",
             description: "1 semana de prueba en TU sitio web con TUS servicios. Sin riesgo.",
             roiTarget: "",
             urgency: "Solo disponible durante Marzo 2025",
             features: [
               "Web Chat AI",
               "AI Sales Concierge (califica + agenda: Google Calendar, entrenado con tus PDFs/FAQs)",
               "Base de conocimiento — hasta 2 servicios",
               "50 conversaciones",
               "Nurturing básico",
               "Agendamiento de citas por email"
             ],
             cta: "Iniciar Pilot Gratis →",
             highlight: true,
             footerNote: "Sin tarjeta de crédito · Setup en 48 hrs · Tus datos, tu sitio"
           },
           {
             name: "Scale Formula",
             tag: "PRÓXIMAMENTE",
             price: "",
             dolar: "",
             period: "",
             setupFee: "",
             setupAlt: "",
             promo: "",
             description: "Funciones avanzadas para múltiples ubicaciones. Precios anunciados Q2 2025.",
             roiTarget: "",
             features: [],
             cta: "Unirme a la Lista de Espera →",
             highlight: false,
             comingSoon: true
           }
         ],
         comparison: {
           title: "Cómo Autonoma AI se compara con otras opciones",
           text: "Para tener lo que hace Autonoma (calificar y agendar, disparar webhook a workflows, sincronizar CRM, enviar confirmaciones y alertar al owner), normalmente terminas armando un stack por piezas y conectándolo manualmente. Autonoma lo empaqueta como un sistema “set-and-forget”: AI Sales Concierge con alcance estrecho (califica + agenda) + automatización por webhook + sync con CRM + alertas al equipo.",
           cta: "Ver desglose completo del stack",
           modal: {
             title: "Constrúyelo pieza por pieza... o despliega un sistema",
             subtitle: "Deja de unir herramientas con parches. Autonoma captura, califica y agenda reuniones, y luego sincroniza todo automáticamente.",
             footer: "Autonoma ejecuta el flujo completo “Webhook → CRM → Email → Alert” y te notifica solo cuando hay un lead listo para comprar.",
   
             tableHeaders: {
               features: "Funcionalidades (lo que necesitas)",
               replaces: "Reemplaza (piezas típicas)",
               tools: "Otras herramientas (costo)",
               autonoma: "Autonoma AI"
             },
             tableRows: [
               { feat: "Asistente de Ventas IA (califica + agenda)", rep: "Chatbot genérico + desorden de prompts", cost: "Varía", auto: true },
               { feat: "Conocimiento entrenado con tus docs (PDF/RAG)", rep: "Herramienta KB + configuración BD vectorial", cost: "Varía", auto: true },
               { feat: "Webhook → automatización de flujos", rep: "Zapier/Make/n8n (Hazlo tú mismo)", cost: "Varía", auto: true },
               { feat: "Sincronización automática CRM", rep: "Integraciones a medida / carga manual", cost: "Varía", auto: true },
               { feat: "Automatización de email de confirmación", rep: "Herramienta de email + plantillas", cost: "Varía", auto: true },
               { feat: "Alertas al dueño (Slack/Discord/Teams)", rep: "Configuración de notificaciones separada", cost: "Varía", auto: true },
               { feat: "Funciona con HubSpot/GoHighLevel/Salesforce/Airtable", rep: "Múltiples conectores", cost: "Varía", auto: true },
             ]
           }
         }
       }, */
    pricing: {
      title: "Inversión Diseñada para ROI",
      subtitle: "Paga por Rendimiento · Tres Niveles para Diferentes Etapas de Crecimiento",
      eyebrow: "PRECIOS",
      tiers: [
        {
          name: "Foundation",
          tag: "NIVEL 1",
          price: "$697",
          dolar: "",
          period: "/mes",
          setupFee: "+ $2,970 pago único de setup",
          setupAlt: "O $2,970 pago único de setup + 4.5% de ingresos generados por el AI",
          promo: "Primer mes 50% de descuento",
          description: "Ideal para: Facturación en una sola ubicación o remota $15K–50K/mes.",
          roiTarget: "ROI Objetivo: 3x en el Mes 1",
          features: [
            "Landing Page (Una Sola Página) en Next.js",
            "Web Chat AI",
            "Base de conocimiento — hasta 10 servicios",
            "AI Sales Concierge (califica + agenda: Google Calendar, entrenado con tus PDFs/FAQs)",
            "500 conversaciones/mes",
            "Webhook → motor de automatización (captura → trigger → flujo)",
            "CRM auto-sync (HubSpot / GoHighLevel / Salesforce / Airtable vía API — según tu plan — o nuestro CRM Open Source)",
            "Nurturing básico: Email de confirmación",
            "Monitoreo básico + 1 ajuste mensual de prompts/flows",
            "Soporte SLA: 12–8 hrs",
            "LLM: OpenAI o Gemini"
          ],
          cta: "Comenzar →",
          highlight: false
        },
        {
          name: "Pilot Gratuito",
          tag: "PILOTO GRATUITO INICIO Solo en marzo/abril",
          tagSub: "Solo para empresas que cumplan los requisitos",
          price: "$0",
          dolar: "",
          period: "",
          setupFee: "",
          setupAlt: "",
          promo: "",
          description: "1 semana de prueba en TU sitio web con TUS servicios. Sin riesgo.",
          roiTarget: "",
          urgency: "Solo disponible durante Marzo 2025",
          features: [
            "Web Chat AI",
            "AI Sales Concierge (califica + agenda: Google Calendar, entrenado con tus PDFs/FAQs)",
            "Base de conocimiento — hasta 2 servicios",
            "50 conversaciones",
            "Nurturing básico",
            "Agendamiento de citas por email"
          ],
          cta: "Iniciar Pilot Gratis →",
          highlight: true,
          footerNote: "Sin tarjeta de crédito · Setup en 48 hrs · Tus datos, tu sitio"
        },
        {
          name: "Performance",
          tag: "NIVEL 2",
          tagSub: "MOST POPULAR",
          price: "$797",
          dolar: "",
          period: "/mes",
          setupFee: "+ $3,470 pago único de setup",
          setupAlt: "O $3,470 pago único de setup + 5.5% de ingresos generados por el AI",
          promo: "",
          description: "Todo lo incluido en Foundation + integración SMS",
          roiTarget: "ROI Objetivo: 5x en el Mes 1",
          features: [
            "Integración SMS",
            "Base de conocimiento — hasta 30 servicios (FAQs)",
            "Conversaciones ilimitadas",
            "Testing A/B de flujos conversacionales",
            "Soporte prioritario (SLA 8–4 hrs)",
            "Nurturing avanzado con CRM / Dashboard de Pipeline de Ventas",
            "Reducción de no-shows (recordatorios automáticos)",
            "Upselling de paquetes (AI identifica pacientes de alto valor)"
          ],
          cta: "Escalar Ahora →",
          highlight: false,
          footerNote: "Ideal para: Medspas en crecimiento listos para escalar ($50K–100K/mes)"
        },
        {
          name: "Enterprise",
          tag: "NIVEL 3",
          price: "Precio Personalizado",
          dolar: "",
          period: "",
          setupFee: "$4,970 setup + $997/mes + 6.5% de ingresos generados por el AI",
          setupAlt: "",
          promo: "",
          description: "Todo lo incluido en Performance",
          roiTarget: "ROI Objetivo: 10x en el Primer Trimestre",
          features: [
            "Gestión multi-ubicación",
            "Branding white-label",
            "Integraciones API personalizadas",
            "Success manager dedicado",
            "Revisiones trimestrales de negocio"
          ],
          cta: "Contactar Ventas →",
          highlight: false,
          footerNote: "Ideal para: Cadenas o franquicias de MedSpa ($100K+ mensual)"
        },

        /* Proximamente
         {
          name: "Scale Formula",
          tag: "PRÓXIMAMENTE",
          price: "",
          dolar: "",
          period: "",
          setupFee: "",
          setupAlt: "",
          promo: "",
          description: "Funciones avanzadas para múltiples ubicaciones. Precios anunciados Q2 2025.",
          roiTarget: "",
          features: [],
          cta: "Unirme a la Lista de Espera →",
          highlight: false,
          comingSoon: true
        } */
      ],
      comparison: {
        title: "Cómo Autonoma AI se compara con otras opciones",
        text: "Para tener lo que hace Autonoma (calificar y agendar, disparar webhook a workflows, sincronizar CRM, enviar confirmaciones y alertar al owner), normalmente terminas armando un stack por piezas y conectándolo manualmente. Autonoma lo empaqueta como un sistema “set-and-forget”: AI Sales Concierge con alcance estrecho (califica + agenda) + automatización por webhook + sync con CRM + alertas al equipo.",
        cta: "Ver desglose completo del stack",
        modal: {
          title: "Constrúyelo pieza por pieza... o despliega un sistema",
          subtitle: "Deja de unir herramientas con parches. Autonoma captura, califica y agenda reuniones, y luego sincroniza todo automáticamente.",
          footer: "Autonoma ejecuta el flujo completo “Webhook → CRM → Email → Alert” y te notifica solo cuando hay un lead listo para comprar.",
          tableHeaders: {
            features: "Funcionalidades (lo que necesitas)",
            replaces: "Reemplaza (piezas típicas)",
            tools: "Otras herramientas (costo)",
            autonoma: "Autonoma AI"
          },
          tableRows: [
            { feat: "Asistente de Ventas IA (califica + agenda)", rep: "Chatbot genérico + desorden de prompts", cost: "Varía", auto: true },
            { feat: "Conocimiento entrenado con tus docs (PDF/RAG)", rep: "Herramienta KB + configuración BD vectorial", cost: "Varía", auto: true },
            { feat: "Webhook → automatización de flujos", rep: "Zapier/Make/n8n (Hazlo tú mismo)", cost: "Varía", auto: true },
            { feat: "Sincronización automática CRM", rep: "Integraciones a medida / carga manual", cost: "Varía", auto: true },
            { feat: "Automatización de email de confirmación", rep: "Herramienta de email + plantillas", cost: "Varía", auto: true },
            { feat: "Alertas al dueño (Slack/Discord/Teams)", rep: "Configuración de notificaciones separada", cost: "Varía", auto: true },
            { feat: "Funciona con HubSpot/GoHighLevel/Salesforce/Airtable", rep: "Múltiples conectores", cost: "Varía", auto: true }
          ]
        }
      }
    },
    trust: {
      title: "Prueba antes de escalar",
      subtitle: "Empieza con un pilot corto para validar que agenda reuniones reales (not solo chats).",
      items: [
        "Checklist de calificación",
        "Definición de 'Lead Calificado'",
        "Implementación de CRM"
      ]
    },
    retainer: {
      title: "Mantenimiento Mensual",
      subtitle: "Mantenimiento Full-Stack",
      perMonth: "/mes",
      perMonthLong: "USD/mes",
      description: "Todo lo que necesitas para mantener tu sistema de ventas con IA al máximo rendimiento. Precios transparentes, sin cargos ocultos.",
      // Texto del botón SLA traducido
      slaLinkText: "Ver más detalles del SLA...",
      categories: [
        {
          title: "Infraestructura Landing Page",
          total: "$179",
          items: [
            { name: "Hosting Serverless", price: "$99/mes", description: "Ancho de banda ilimitado, 200+ ubicaciones edge, 99.99% uptime" },
            { name: "Gestión de Dominio y DNS", price: "$30/mes", description: "Certificados SSL, configuración CDN" }
            // Performance Monitoring ELIMINADO
          ]
        },
        {
          title: "Asistente de Ventas IA",
          total: "$349",
          items: [
            {
              name: "API OpenAI (GPT-4.1 Nano) o Google (Gemini 2.5 Flash-Lite)",
              price: "$199/mes",
              description: "Hasta 10k Interacciones/Solicitudes por mes. Nota: Una interacción es el ciclo completo de 'pregunta y respuesta' (Prompt + Respuesta)."
            },
            { name: "Base de Datos Vectorial (RAG + Embeddings)", price: "$95/mes", description: "50k vectores" },
            { name: "Hosting Widget Chatbot", price: "$55/mes", description: "Canales Pusher, 1000k mensajes/mes" }
          ]
        },
        {
          title: "Automatización de Flujos",
          total: "$169",
          items: [
            { name: "Hosting Cloud (n8n)", price: "$89/mes", description: "5k ejecuciones de flujo/mes" },
            { name: "Mantenimiento API CRM", price: "$50/mes", description: "Sincronización HubSpot/Salesforce/GoHighLevel. Ten en cuenta que el acceso a la API para la integración del CRM puede incurrir en costos adicionales. Estas tarifas son determinadas por tu proveedor de servicios actual y a menudo dependen de tu plan de suscripción específico. Recomendamos verificar con ellos si el acceso a la API está incluido o si se requiere una actualización antes de proceder con la integración." },
            { name: "Automatización de Email", price: "$30/mes", description: "3k emails/mes, DKIM/SPF/DMARC" }
          ]
        },
        {
          title: "Soporte",
          total: "Incluido",
          items: [
            {
              name: "Soporte Técnico Prioritario",
              price: "Incluido",
              description: "Tiempos de respuesta garantizados según prioridad.",
              hasSLA: true // Esto activa el botón
            },
            { name: "Actualizaciones y Reentrenamiento IA", price: "Incluido", description: "1 actualización/mes (RAG/Embedding) Máx 50 Páginas (Base de Conocimiento)" }
          ]
        }
      ],
      // Datos de la tabla SLA (Traducidos)
      sla: {
        title: "Acuerdo de Nivel de Servicio (SLA)",
        headers: ["Prioridad", "Impacto", "Tiempo Respuesta Objetivo", "Tiempo Resolución Objetivo"],
        rows: [
          { priority: "P1 - Crítica", impact: "Interrupción total / Caída del servicio", response: "15 - 30 min", resolution: "< 4 - 8 horas" },
          { priority: "P2 - Alta", impact: "Funcionalidad crítica afectada", response: "1 hora", resolution: "< 24 horas" },
          { priority: "P3 - Media", impact: "Problema menor / Uso limitado", response: "4 horas hábiles", resolution: "3 - 5 días hábiles" },
          { priority: "P4 - Baja", impact: "Consultas generales / Cambios cosméticos", response: "1 día hábil", resolution: "> 5 días hábiles" }
        ],
        close: "Cerrar"
      },
      summary: {
        label: "MANTENIMIENTO MENSUAL",
        priceLine1: "$497 ",
        priceLine2: "Despues $597 USD",
        note: "Primer mes GRATIS con el despliegue"
      },
      benefits: [
        { title: "Configura y Olvida", description: "Monitoreamos 24/7, auto-deploy de actualizaciones" },
        { title: "Costo Mensual Fijo", description: "Sin facturas sorpresa de AWS, presupuesto predecible" },
        { title: "Soporte Prioritario", description: "Canal directo de Slack, respuesta en 24hs" }
      ],
      policy: {
        title: "Política de Excedentes Transparente",
        conversationTitle: "Excedentes de Conversación",
        conversations: [{ range: "10,001 - 20,000", price: "+$150/mes", rate: "$0.015/conversación" }, { range: "20,001 - 50,000", price: "+$300/mes", rate: "$0.010/conversación" }, { range: "50,000+", price: "Personalizado", rate: "Precios Enterprise" }],
        workflowTitle: "Excedentes de Flujo (n8n)",
        workflows: [{ range: "5,001 - 10,000 ejecuciones", price: "+$50/mes" }, { range: "10,000+ ejecuciones", price: "+$100/mes" }],
        note: "Siempre te notificaremos antes de llegar a los excedentes. Sin facturas sorpresa."
      },
      addOns: {
        title: "Servicios Adicionales (A la Carta)",
        items: [{ name: "Actualizaciones Extra Base de Conocimiento", price: "$597/act", note: "(1/mes incluida)" }, { name: "Desarrollo de Funciones Personalizadas", price: "$75/hora", note: "" }, { name: "Soporte Marca Blanca (Revendedores)", price: "+$300/mes", note: "por cliente" }]
      },
      cta: "Agregar Retainer a Mi Proyecto",
      finePrint: ["Primer mes GRATIS al contratar durante el despliegue", "Cancela cuando quieras (aviso 30 días)"]
    },
    cta: {
      title: "Despliega tu Sistema de Ventas Autónomo",
      subtitle: "Obtén la infraestructura completa: Chatbot IA + Flujos n8n + Integración CRM + Alertas de Ventas. Entregado en 10 días hábiles.",
      button: "Agendar Llamada de Implementación",
      secondaryText: "Despliegue en 10 días · Tu CRM, tus datos · Propiedad total del sistema",
      features: [
        "Funciona con HubSpot, Salesforce, Airtable",
        "Alertas en Slack/Discord/Teams",
        "Calificación potenciada por OpenAI"
      ]
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre la tecnología y el proceso.",
      items: [
        { q: "¿Qué pasa si necesito cambios después del lanzamiento?", a: "No cobramos tarifas horarias altas. Ofrecemos 'Bolsas de Mejoras' de 5, 10 o 20 horas que puedes comprar cuando quieras para personalizaciones o nuevos flujos." },
        { q: "¿Qué incluye la infraestructura técnica?", a: "El sistema Core incluye Vector Database dedicada (para tu base de conocimiento), Chat Widget custom, instancia privada de n8n y sistema de Alertas conectado a tu CRM y canales (Slack/Teams)." },
        { q: "¿Qué pasa si excedo mis límites mensuales?", a: "No te preocupes, el servicio no se detiene. Si superas los límites, se habilita un paquete de crecimiento automáticamente. Te avisamos antes para que no haya sorpresas." }
      ]
    },
    footer: {
      tagline: "Infraestructura de Operaciones de Ingresos",
      builtWith: "Construido con Next.js ⚡",
      copyright: "© 2025 Autonoma.ai. Todos los derechos reservados.",
      links: [
        { name: "Arquitectura", href: "#architecture" },
        { name: "Precios", href: "#pricing" },
      ]
    },
    onboarding: {
      closeAriaLabel: "Cerrar formulario",
      stepCompany: {
        title: "¿Para qué empresa trabajas?",
        placeholder: "Acme Corporation",
        helper: "Esto nos ayuda a entender tu contexto de negocio",
        errorEmpty: "Por favor ingresa el nombre de tu empresa",
        errorShort: "El nombre debe tener al menos 2 caracteres"
      },
      stepCRM: {
        title: "¿Qué CRM utilizas actualmente?",
        placeholderOther: "¿Qué CRM utilizas?",
        noCrmMessage: "¡Sin problema! Podemos configurar un CRM open-source para ti."
      },
      stepDealValue: {
        title: "¿Cu��l es el valor promedio de tu venta?",
        subtitle: "Esto nos ayuda a calcular tu ROI potencial",
        warningText: "Nuestro sistema está optimizado para servicios de alto valor. Sin embargo, si tienes un alto volumen de leads (500+/mes), podemos hacerlo funcionar. ¿Quieres continuar?",
        warningBtnYes: "Sí, continuar",
        warningBtnNo: "Seleccionar otra opción"
      },
      stepEmail: {
        title: "¿Cuál es tu email de trabajo?",
        errorEmpty: "Por favor ingresa tu email",
        errorInvalid: "Por favor ingresa un email válido",
        warningGeneric: "Recomendamos usar tu email corporativo",
        helper: "Te enviaremos tu propuesta personalizada aquí"
      },
      stepPhone: {
        title: "¿Cuál es tu número de teléfono?",
        placeholder: "+54 9 11 1234 5678",
        errorEmpty: "Por favor ingresa tu teléfono",
        errorInvalid: "Por favor ingresa un número válido",
        helper: "Te enviaremos la confirmación por WhatsApp/SMS"
      },
      stepLeads: {
        title: "¿Cuántos leads recibes por mes?",
        leadsPerMonth: "leads/mes",
        categories: {
          starting: "Recién empezando",
          growing: "Creciendo constantemente",
          highVolume: "Alto volumen",
          enterprise: "Escala Enterprise"
        },
        painPoints: {
          slow: "Pierdo leads por tiempos de respuesta lentos",
          manual: "Mi equipo gasta 10+ horas/sem en carga manual"
        }
      },
      stepName: {
        title: "Primero, ¿cómo te llamas?",
        placeholder: "Juan Pérez",
        errorEmpty: "Por favor ingresa tu nombre completo",
        errorShort: "El nombre debe tener al menos 2 caracteres",
        helper: "Usaremos esto para personalizar tu propuesta"
      },
      stepReview: {
        title: "Revisa tu Información",
        nextTitle: "¿Qué sigue ahora?",
        sending: "Enviando...",
        submitBtn: "Enviar y Recibir Propuesta",
        labels: {
          name: "Nombre",
          email: "Email",
          phone: "Telefono",
          company: "Empresa",
          crm: "CRM",
          leads: "Leads/mes",
          dealValue: "Valor venta",
          timeline: "Timeline",
          otherCrm: "Otro CRM"
        },
        nextSteps: [
          { title: "En 24 a 48 Horas", description: "Revisaremos tu información y te enviaremos una propuesta personalizada a tu email" },
          { title: "En 48 - 72 Horas", description: "Uno de nuestros Gerentes de Ventas te contactará para agendar tu implementación o llamada de descubrimiento" },
          { title: "En 10 - 14 Días", description: "Tu sistema de ventas autónomo sale en vivo" }
        ],
        trust: {
          secure: "Tus datos están seguros (cifrado SSL)",
          spam: "Sin spam, nunca",
          response: "Tiempo promedio de respuesta: 2 horas"
        }
      },
      stepThankYou: {
        title: "¡Todo Listo!",
        emailSentTo: "Hemos enviado un email de confirmación a",
        inboxTitle: "Revisa tu bandeja en la próxima hora:",
        inboxItems: [
          "Propuesta de precios personalizada",
          "Casos de éxito de empresas similares",
          "Cronograma de implementación",
          "Enlace para agendar tu llamada"
        ],
        scheduleBtn: "Agendar Llamada Ahora",
        shareTitle: "¿Conoces a alguien que necesite esto? Comparte esta página",
        copyUrl: "Copiar Enlace",
        copied: "¡Copiado!"
      },
      stepTimeline: {
        title: "¿Cuándo buscas desplegar este sistema?"
      },
      stepWelcome: {
        headline: "Construyamos tu Sistema de Ventas Autónomo",
        subheadline: "Tomará 2 minutos. Te preguntaremos sobre tu negocio, herramientas actuales y objetivos.",
        trustBadge: "Tus datos están seguros. Nunca compartimos tu información.",
        cta: "Empezar"
      }
    },
    form: {
      back: "Atrás",
      continue: "Continuar",
      pressEnter: "Presiona Enter ↵",
      submitting: "Enviando...",
      step: "Paso",
      of: "de",
      complete: "completado"
    },
    formOptions: {
      crm: {
        hubspot: "HubSpot",
        salesforce: "Salesforce",
        gohighlevel: "GoHighLevel",
        airtable: "Airtable",
        other: "Otro CRM",
        none: "Aún no tengo CRM"
      },
      dealValue: {
        "under-1k": { label: "Menos de $1,000", fit: "No ideal para nuestro sistema" },
        "1k-5k": { label: "$1,000 - $5,000", fit: "Buen fit" },
        "5k-20k": { label: "$5,000 - $20,000", fit: "Fit perfecto" },
        "20k-plus": { label: "$20,000+", fit: "Cliente ideal" }
      },
      timeline: {
        asap: { label: "ASAP (Esta Semana)", badge: "Prioridad", desc: "Tenemos 1 lugar disponible esta semana", cta: "Agendar Llamada Urgente" },
        "2-4-weeks": { label: "En 2-4 Semanas", badge: "Estándar", desc: "El tiempo más común", cta: "Agendar Implementación" },
        "1-3-months": { label: "1-3 Meses", badge: "Planeación", desc: "Te enviaremos info detallada", cta: "Ver PDF Precios + Seguimiento" },
        researching: { label: "Solo Investigando", badge: "Explorando", desc: "Sin presión, seguimos en contacto", cta: "Enviarme Recursos" }
      }
    },
    workflowVisual: {
      nodes: {
        visitor: { label: "Visita Web", sublabel: "Prospecto llega" },
        ai: { label: "Asistente IA", sublabel: "Califica + Agenda" },
        workflow: { label: "Workflow IA", sublabel: "n8n activado" },
        crm: { label: "CRM / Sales Pipeline", sublabel: "ACTIVO" },
        operation: { title: "Tu operación completa, visible en tiempo real" },
        panelTitle: { title: "Panel de control" },
        headerDescription: { title: "Desde el primer mensaje hasta el pedido entregado — todo en un solo lugar." },
        alert: { label: "Alerta Dueño", sublabel: "¡Reunión agendada!" }
      },
      states: {
        interesado: "interested",
        negociacion: "negotiation",
        propuesta: "proposal",
        contactado: "contacted",
      },
      tasks: {
        send: "Enviar follow-up a Roberto V. (3 días sin respuesta)",
        confirm: "Confirmar cita con María G. — Jueves 2pm",
        update: "Actualizar precio en catálogo — servicio fotografía",
      },
      popover: {
        title: "Sales Pipeline",
        leadsActive: "Leads activos",
        inNegotiation: "En negociación",
        wonThisMonth: "Ganados este mes",
        lastActivity: "Última actividad",
        lastActivityTime: "hace 3 min",
        openCRM: "Abrir CRM →"
      },
      cards: {
        meeting: "Reunión Jue 2pm ✓",
        payload: "→ Payload enviado en 0.3s",
        lead: "✓ Lead registrado en CRM / Sales Pipeline — Etapa: Demo — Score: 87",
        synced: "✓ Sincronizado a HubSpot + Email enviado",
        alertMsg: "'Reunión agendada: John - Jue 2pm'"
      },
      metadata: {
        user: "John from Acme Corp"
      },
      active: "ACTIVO"
    },
    liveDemo: {
      productionLabel: "PRODUCCIÓN — victormanetattoo.com",
      realClientNote: "Cliente real · Sistema activo · No es una demo fabricada",
      panelTitle: "CRM / Sales Pipeline",
      panelBadge: "EN VIVO",
      leadCard: {
        newVisitor: "Nuevo visitante",
        source: "victormanetattoo.com · Chat widget",
        stageLabel: "Etapa",
        scoreLabel: "Score IA",
        chatStatus: "En chat",
        scorePlaceholder: "—",
      },
      capturedData: "Datos capturados:",
      waitingResponses: "Esperando respuestas...",
      conversationTitle: "Conversación",
      cta: {
        start: "Ver demo en tiempo real",
        running: "AI calificando lead...",
        completed: "Lead convertido · Consulta agendada",
        retry: "Ver de nuevo"
      },
      footerStats: [
        { value: "< 10 min", label: "Setup del AI sobre tu sitio" },
        { value: "100%", label: "Entrenado con servicios reales de Victor" },
        { value: "24/7", label: "Calificando mientras duermes" },
      ],
      chatSteps: [
        { id: 1, type: "bot", message: "¡Hey! Soy el asistente IA de Mane. ¿Estás pensando en tu primer tatuaje o agregar a tu colección?", delay: 0 },
        { id: 2, type: "user", message: "Primer tatuaje. Quiero un retrato de mi perro.", delay: 1800 },
        { id: 3, type: "bot", message: "¡Genial! El realismo en retratos es la especialidad de Victor. ¿Qué tamaño estás pensando y tienes una foto de tu perro?", delay: 3200 },
        { id: 4, type: "user", message: "Tal vez tamaño antebrazo. Sí, tengo fotos.", delay: 5000 },
        { id: 5, type: "bot", message: "Perfecto. Los retratos de antebrazo suelen costar $400–$650 según el detalle. Victor tiene disponibilidad la próxima semana. ¿Quieres que reserve una consulta gratuita de 30 min?", delay: 6800 },
        { id: 6, type: "user", message: "Sí, el jueves está bien.", delay: 8400 },
        { id: 7, type: "bot", message: "¡Listo! ✓ Consulta agendada para el jueves. Recibirás una confirmación + brief de diseño para completar. Victor revisará tu foto antes de la sesión.", delay: 9800, isBooking: true },
      ],
      demo: { title: "Visitar pagina web" },
      crmStates: [
        {
          triggerAtStep: 1,
          stage: "Nuevo Lead",
          stageColor: "#3B82F6",
          score: 0,
          scoreLabel: "Calificando...",
          scoreColor: "#A1A1AA",
          status: "En chat",
          statusColor: "#F59E0B",
          actions: [],
        },
        {
          triggerAtStep: 2,
          stage: "Nuevo Lead",
          stageColor: "#3B82F6",
          score: 42,
          scoreLabel: "En construcción...",
          scoreColor: "#F59E0B",
          status: "Comprometido",
          statusColor: "#3B82F6",
          actions: ["Servicio: Realismo de retrato"],
        },
        {
          triggerAtStep: 4,
          stage: "Interesado",
          stageColor: "#F59E0B",
          score: 71,
          scoreLabel: "Alta intención",
          scoreColor: "#F59E0B",
          status: "Calificado",
          statusColor: "#00D084",
          actions: ["Servicio: Realismo de retrato", "Tamaño: Antebrazo", "Tiene foto de referencia ✓"],
        },
        {
          triggerAtStep: 6,
          stage: "Reserva",
          stageColor: "#8B5CF6",
          score: 94,
          scoreLabel: "Lead caliente",
          scoreColor: "#00D084",
          status: "Reservando",
          statusColor: "#8B5CF6",
          actions: ["Servicio: Realismo de retrato", "Tamaño: Antebrazo", "Tiene foto de referencia ✓", "Presupuesto: $400–$650 ✓"],
        },
        {
          triggerAtStep: 7,
          stage: "Ganado ✓",
          stageColor: "#00D084",
          score: 98,
          scoreLabel: "Convertido",
          scoreColor: "#00D084",
          status: "Agendado",
          statusColor: "#00D084",
          actions: ["Servicio: Realismo de retrato", "Tamaño: Antebrazo", "Tiene foto de referencia ✓", "Presupuesto: $400–$650 ✓", "Consulta del jueves agendada"],
        },
      ],
    },
    dashboardPreview: {
      tabs: [
        { id: "resumen", label: "Resumen" },
        { id: "bandeja", label: "Bandeja" },
        { id: "pipeline", label: "Pipeline" },
        { id: "pedidos", label: "Pedidos" },
        { id: "perdidos", label: "Perdidos" },
        { id: "catalogo", label: "Catálogo" },
      ],
      kpis: {
        leadsToday: "Leads hoy",
        inPipeline: "En pipeline",
        closeRate: "Tasa de cierre",
        monthlyRevenue: "Ingresos del mes",
        goalLabel: "meta",
        improvedOverYesterday: "+3 vs ayer",
      },
      topDeals: {
        title: "Top deals activos"
      },
      lostReasonsTitle: "Razones de pérdida",
      insightsTitle: "AI Insights",
      lostDealsTitle: "Últimos deals perdidos",
      lostDeals: {
        reactivateButton: "Reactivar"
      },
      tasks: {
        title: "Acciones pendientes de IA",
        placeholder: "Escribe un mensaje...",
        replyButton: "Responder como IA",
        manualButton: "Manual"
      },
      pipeline: {
        leadsLabel: "leads",
        moreLabel: "más"
      },
      orders: {
        labels: {
          id: "#",
          client: "Cliente",
          description: "Descripción",
          value: "Valor",
          status: "Estado",
          date: "Fecha"
        },
        kpiLabels: [
          { label: "Pedidos hoy", value: 7 },
          { label: "En preparación", value: 12 },
          { label: "Pendiente entrega", value: 5 },
          { label: "Completados", value: 84 },
        ]
      },
      catalog: {
        searchPlaceholder: "Buscar servicio...",
        addServiceButton: "Agregar servicio",
        toggleAILabel: "Toggle AI",
        instructionsTitle: "Instrucciones al AI",
        instructionsText: "Cuando el cliente mencione urgencia, ofrece siempre el paquete completo. Si pregunta por precio, da el rango y ofrece una llamada de 10 minutos para personalizar."
      },
      conversationPlaceholder: "Selecciona una conversación para ver el detalle.",
      replyPlaceholder: "Escribe un mensaje...",
      aiActive: "AI activo",
      newVisitor: "Nuevo visitante",
      stageLabel: "Etapa",
      scoreLabel: "Score AI",
      chatStatus: "Chatting",
      scorePlaceholder: "—",
    },
    value: {
      headerTagline: "LA SOLUCIÓN COMPLETA",
      headerTitle: "Todo lo que obtienes por menos del costo de un empleado",
      headerDescription: "Un sistema completo de ventas y atención al cliente impulsado por IA, diseñado para ayudar a tu negocio a responder más rápido, agendar más citas, organizar tu pipeline y operar 24/7.",
      realValueLabel: "Valor Real",
      combinedValueLabel: "Valor Combinado",
      combinedValueAmount: "$4,800/mes",
      combinedValueDescription: "en funciones y servicios premium",
      offerLabel: "OFERTA VÁLIDA ÚNICAMENTE PARA LA CÁMARA DE COMERCIO HISPANA DE NUEVA JERSEY",
      /* offerLabel: "OFERTA DE HOY", */
      setupFeeLabel: "Tarifa de Configuración",
      setupFeeAmount: "$1,497",
      monthlyLabel: "Mensual",
      monthlyAmount: "$497/mes",
      initialTotalText: "Total Inicial",
      initialTotalAmount: "$1,994 USD",
      launchDescription: "Lanza tu sistema de ventas y soporte con IA por una fracción del costo de contratar y capacitar personal.",
      ctaButton: "Reservar una Demo",
      where: "en funciones y servicios premium",
      ctaDescription: "Descubre cómo tu agente de IA puede empezar a trabajar para tu negocio en días, no meses.",
      valueItems: [
        {
          icon: "Users",
          title: "Secretario Virtual 24/7",
          realValue: "$4,000/mes",
          description: "Responde a los clientes al instante, hace seguimiento automático, maneja preguntas frecuentes y apoya tu negocio día y noche."
        },
        {
          icon: "BarChart3",
          title: "CRM + Panel de Gestión",
          realValue: "$200/mes",
          description: "Gestiona prospectos, rastrea conversaciones, monitorea el rendimiento y mantiene tu negocio organizado en un solo lugar."
        },
        {
          icon: "Zap",
          title: "Agente de Citas con IA",
          realValue: "$300/mes",
          description: "Califica prospectos, agenda citas, envía recordatorios y ayuda a reducir oportunidades perdidas."
        },
        {
          icon: "BarChart3",
          title: "Pipeline de Ventas + Calendario + Bandeja Unificada",
          realValue: "$300/mes",
          description: "Rastrea cada oportunidad, gestiona citas de forma visual y centraliza todas las conversaciones en una sola bandeja para un seguimiento más rápido."
        }
      ],
      trustPoints: [
        "Sin nómina adicional",
        "Sin prospectos perdidos",
        "Sin costos de personal 24/7",
        "Funciona incluso mientras duermes"
      ]
    }
  }
}
