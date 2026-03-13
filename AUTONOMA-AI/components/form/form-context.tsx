"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { type FormData, type FormState, initialFormData, calculateLeadScore } from "./form-types"

const STORAGE_KEY = "autonoma_form_data"
const TOTAL_STEPS = 11

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormData; value: FormData[keyof FormData] }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "SUBMIT" }
  | { type: "RESET" }
  | { type: "RESTORE"; state: FormState }

const initialState: FormState = {
  step: 1,
  data: initialFormData,
  timestamp: new Date().toISOString(),
  isSubmitted: false,
  leadScore: 0,
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      const newData = { ...state.data, [action.field]: action.value }
      return {
        ...state,
        data: newData,
        timestamp: new Date().toISOString(),
        leadScore: calculateLeadScore(newData),
      }
    case "NEXT_STEP":
      return {
        ...state,
        step: Math.min(state.step + 1, TOTAL_STEPS),
        timestamp: new Date().toISOString(),
      }
    case "PREV_STEP":
      return {
        ...state,
        step: Math.max(state.step - 1, 1),
        timestamp: new Date().toISOString(),
      }
    case "GO_TO_STEP":
      return {
        ...state,
        step: action.step,
        timestamp: new Date().toISOString(),
      }
    case "SUBMIT":
      return {
        ...state,
        isSubmitted: true,
        timestamp: new Date().toISOString(),
      }
    case "RESET":
      return { ...initialState, timestamp: new Date().toISOString() }
    case "RESTORE":
      return action.state
    default:
      return state
  }
}

type FormContextType = {
  state: FormState
  dispatch: React.Dispatch<FormAction>
  totalSteps: number
  canGoNext: boolean
  canGoBack: boolean
}

const FormContext = createContext<FormContextType | null>(null)

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FormState
        // Only restore if not submitted and within 24 hours
        const savedTime = new Date(parsed.timestamp).getTime()
        const now = Date.now()
        const hoursAgo = (now - savedTime) / (1000 * 60 * 60)
        if (!parsed.isSubmitted && hoursAgo < 24) {
          dispatch({ type: "RESTORE", state: parsed })
        }
      } catch {
        // Invalid data, ignore
      }
    }
  }, [])

  // Save to localStorage on state change
  useEffect(() => {
    if (state.step > 1 && !state.isSubmitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  // Clear localStorage on submission
  useEffect(() => {
    if (state.isSubmitted) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [state.isSubmitted])

  const canGoNext = state.step < TOTAL_STEPS && !state.isSubmitted
  const canGoBack = state.step > 1 && !state.isSubmitted

  return (
    <FormContext.Provider value={{ state, dispatch, totalSteps: TOTAL_STEPS, canGoNext, canGoBack }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
