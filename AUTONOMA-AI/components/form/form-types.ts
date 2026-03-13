// Form types and validation schemas for the multi-step onboarding form
import { z } from "zod"

export const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100),
  crm: z.string(),
  otherCrm: z.string().optional(),
  leadsPerMonth: z.number().min(0).max(1000),
  painPoints: z.array(z.string()).optional(),
  dealValue: z.string(),
  timeline: z.string(),
})

export type FormData = z.infer<typeof formSchema>

export const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  crm: "",
  otherCrm: "",
  leadsPerMonth: 50,
  painPoints: [],
  dealValue: "",
  timeline: "",
}

export type FormState = {
  step: number
  data: FormData
  timestamp: string
  isSubmitted: boolean
  leadScore: number
}

export const CRM_OPTIONS = [
  { id: "hubspot", label: "HubSpot", icon: "database" },
  { id: "salesforce", label: "Salesforce", icon: "cloud" },
  { id: "gohighlevel", label: "GoHighLevel", icon: "zap" },
  { id: "airtable", label: "Airtable", icon: "table" },
  { id: "other", label: "Other CRM", icon: "database" },
  { id: "none", label: "No CRM Yet", icon: "x-circle" },
] as const

export const DEAL_VALUE_OPTIONS = [
  { id: "under-1k", label: "Under $1,000", icon: "tag", fit: "Not ideal for our system" },
  { id: "1k-5k", label: "$1,000 - $5,000", icon: "dollar-sign", fit: "Good fit" },
  { id: "5k-20k", label: "$5,000 - $20,000", icon: "trending-up", fit: "Perfect fit" },
  { id: "20k-plus", label: "$20,000+", icon: "sparkles", fit: "Ideal client" },
] as const

export const TIMELINE_OPTIONS = [
  {
    id: "asap",
    label: "ASAP (This Week)",
    badge: "Priority",
    badgeColor: "red",
    description: "We have 1 spot available this week",
    cta: "Book Urgent Call",
  },
  {
    id: "2-4-weeks",
    label: "Within 2-4 Weeks",
    badge: "Standard",
    badgeColor: "yellow",
    description: "Most popular timeline",
    cta: "Schedule Implementation Call",
  },
  {
    id: "1-3-months",
    label: "1-3 Months",
    badge: "Planning",
    badgeColor: "blue",
    description: "We'll send you detailed info",
    cta: "Get Pricing PDF + Follow-up",
  },
  {
    id: "researching",
    label: "Just Researching",
    badge: "Exploring",
    badgeColor: "gray",
    description: "No pressure, we'll stay in touch",
    cta: "Send Me Resources",
  },
] as const

export function calculateLeadScore(data: FormData): number {
  let score = 0

  // CRM scoring
  if (["hubspot", "salesforce", "gohighlevel"].includes(data.crm)) {
    score += 2
  }

  // Leads per month scoring
  if (data.leadsPerMonth > 100) {
    score += 2
  }

  // Deal value scoring
  if (data.dealValue === "5k-20k" || data.dealValue === "20k-plus") {
    score += 3
  } else if (data.dealValue === "1k-5k") {
    score += 1
  }

  // Timeline scoring
  if (data.timeline === "asap" || data.timeline === "2-4-weeks") {
    score += 2
  }

  // Pain points scoring
  if (data.painPoints && data.painPoints.length === 2) {
    score += 1
  }

  return score
}

export function getLeadClassification(score: number): "hot" | "warm" | "cold" {
  if (score >= 8) return "hot"
  if (score >= 5) return "warm"
  return "cold"
}
