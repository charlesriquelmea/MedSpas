"use client"



import { useState, type ReactNode } from "react"

import { OnboardingForm } from "./onboarding-form"



type FormTriggerProps = {

  children: ReactNode

  className?: string

}



export function FormTrigger({ children, className }: FormTriggerProps) {

  const [isOpen, setIsOpen] = useState(false)



  return (

    <>

      <div

        className={className}

        onClick={() => setIsOpen(true)}

        onKeyDown={(e) => {

          if (e.key === "Enter" || e.key === " ") {

            e.preventDefault()

            setIsOpen(true)

          }

        }}

        role="button"

        tabIndex={0}

        style={{ cursor: "pointer" }}

      >

        {children}

      </div>

      <OnboardingForm isOpen={isOpen} onClose={() => setIsOpen(false)} />

    </>

  )

}