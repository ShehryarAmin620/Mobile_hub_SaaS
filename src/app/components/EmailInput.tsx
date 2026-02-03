"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"

interface EmailInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
}

const STORAGE_KEY = "mobile_hub_recent_emails"
const MAX_RECENT = 5

export function EmailInput({ 
  id = "email", 
  value, 
  onChange, 
  label = "Email",
  placeholder = "m@example.com",
  required = true,
  className = ""
}: EmailInputProps) {
  const [showRecent, setShowRecent] = useState(false)
  const [recentEmails, setRecentEmails] = useState<string[]>([])

  // Load recent emails from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentEmails(JSON.parse(stored))
      } else {
        // Initialize with demo emails if nothing stored
        const defaultEmails = [
          "admin@gmail.com",
          "shopkeeper@gmail.com",
          "buyer@gmail.com"
        ]
        setRecentEmails(defaultEmails)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEmails))
      }
    } catch (error) {
      console.error("Failed to load recent emails:", error)
    }
  }, [])

  // Save email to localStorage (called externally after successful login)
  const saveEmail = (email: string) => {
    if (!email || !email.includes('@')) return

    try {
      const updated = [email, ...recentEmails.filter(e => e !== email)].slice(0, MAX_RECENT)
      setRecentEmails(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save email:", error)
    }
  }

  // Expose saveEmail method via ref (used by parent after login)
  React.useImperativeHandle(
    React.useRef({ saveEmail }),
    () => ({ saveEmail })
  )

  const handleEmailClick = (email: string) => {
    onChange(email)
    setShowRecent(false)
  }

  return (
    <div className={`grid gap-2 relative ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowRecent(true)}
        onBlur={() => setTimeout(() => setShowRecent(false), 200)}
        autoComplete="off"
      />
      
      {/* Recent Emails Dropdown */}
      {showRecent && recentEmails.length > 0 && (
        <div className="absolute top-[70px] z-50 w-full rounded-md border bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
              Recent logins
            </div>
            {recentEmails.map((recentEmail) => (
              <div
                key={recentEmail}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 transition-colors"
                onClick={() => handleEmailClick(recentEmail)}
              >
                {recentEmail}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Hook to save email after successful login
export function useSaveRecentEmail() {
  return (email: string) => {
    if (!email || !email.includes('@')) return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const recentEmails = stored ? JSON.parse(stored) : []
      const updated = [email, ...recentEmails.filter((e: string) => e !== email)].slice(0, MAX_RECENT)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save email:", error)
    }
  }
}
