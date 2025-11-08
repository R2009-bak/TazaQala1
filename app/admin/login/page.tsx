"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AdminLoginPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
            <Building2 className="h-6 w-6 text-chart-3" />
          </div>
          <CardTitle className="text-2xl">{t("landing.adminPortal")}</CardTitle>
          <CardDescription>
            {language === "ru" ? "Управление организацией и координация" : "Ұйымды басқару және үйлестіру"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("auth.email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("auth.password")}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("auth.login")}
            </Button>
          </form>
          <div className="mt-6 border-t pt-6">
            <Link href="/">
              <Button variant="ghost" className="w-full">
                ← {t("landing.title")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
