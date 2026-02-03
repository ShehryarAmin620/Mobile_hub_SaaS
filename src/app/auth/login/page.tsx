"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag } from "lucide-react"
import { EmailInput, useSaveRecentEmail } from "@/app/components/EmailInput"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const saveRecentEmail = useSaveRecentEmail()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Save email to recent list
    saveRecentEmail(email)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email.includes("admin")) {
      window.location.href = "/admin/dashboard"
    } else if (email.includes("shopkeeper")) {
      window.location.href = "/shopkeeper/dashboard"
    } else {
      window.location.href = "/"
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50/50 px-4">
      <div className="mb-8 flex items-center gap-2">
        <ShoppingBag className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Mobile Hub</span>
      </div>
      
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <EmailInput
              id="email"
              value={email}
              onChange={setEmail}
              label="Email"
              placeholder="m@example.com"
              required
            />
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}