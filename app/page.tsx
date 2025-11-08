"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Truck, Users, Building2, MapPin, Clock, CreditCard, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LandingPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-primary">{t("landing.title")}</span>
              <span className="text-xs text-muted-foreground">{t("landing.subtitle")}</span>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language === "ru" ? "Русский" : "Қазақша"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("ru")}>Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("kk")}>Қазақша</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/login">
              <Button variant="ghost">{t("auth.login")}</Button>
            </Link>
            <Link href="/register">
              <Button>{t("auth.register")}</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <MapPin className="h-4 w-4" />
              {t("landing.subtitle")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              {t("landing.title")}
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{t("landing.description")}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base">
                  {t("landing.userPortal")}
                </Button>
              </Link>
              <Link href="/driver/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent">
                  {t("landing.driverPortal")}
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
                  {t("landing.adminPortal")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-3xl" />
            <img
              src="/garbage-truck-on-city-street.jpg"
              alt={t("landing.title")}
              className="relative rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">
            {language === "ru" ? "Наши возможности" : "Біздің мүмкіндіктер"}
          </h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            {language === "ru"
              ? "Современная платформа для эффективного управления вывозом мусора в городе Кызылорда"
              : "Қызылорда қаласындағы қоқыс тасымалдауды тиімді басқаруға арналған заманауи платформа"}
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 space-y-4 border-2 hover:border-primary/50 transition-colors">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t("landing.userPortal")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "ru"
                  ? "Заказывайте вывоз мусора онлайн, отслеживайте машину в реальном времени и оплачивайте безопасно через интернет"
                  : "Қоқыс тасымалдауға онлайн тапсырыс беріңіз, көлікті нақты уақытта бақылаңыз және интернет арқылы қауіпсіз төлеңіз"}
              </p>
            </Card>
            <Card className="p-6 space-y-4 border-2 hover:border-secondary/50 transition-colors">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                <Truck className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">{t("landing.driverPortal")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "ru"
                  ? "Оптимизируйте маршруты, управляйте заказами эффективно и ведите учет выполненных работ"
                  : "Бағыттарды оңтайландырыңыз, тапсырыстарды тиімді басқарыңыз және орындалған жұмыстардың есебін жүргізіңіз"}
              </p>
            </Card>
            <Card className="p-6 space-y-4 border-2 hover:border-chart-3/50 transition-colors">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-chart-3/10">
                <Building2 className="h-7 w-7 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">{t("landing.adminPortal")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "ru"
                  ? "Координируйте все операции, управляйте водителями, отслеживайте показатели и контролируйте финансы"
                  : "Барлық операцияларды үйлестіріңіз, жүргізушілерді басқарыңыз, көрсеткіштерді бақылаңыз және қаржыны бақылаңыз"}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="mb-4 text-center text-3xl font-bold">
          {language === "ru" ? "Преимущества платформы" : "Платформаның артықшылықтары"}
        </h2>
        <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
          {language === "ru"
            ? "Все необходимые инструменты для удобного управления вывозом мусора"
            : "Қоқыс тасымалдауды ыңғайлы басқару үшін қажетті барлық құралдар"}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{language === "ru" ? "Интерактивная карта" : "Интерактивті карта"}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ru"
                  ? "Отслеживание в реальном времени и визуализация маршрутов"
                  : "Нақты уақытта бақылау және бағыттарды визуализациялау"}
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{t("landing.feature3")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ru"
                  ? "Выбирайте удобное время для вывоза мусора"
                  : "Қоқыс тасымалдау үшін ыңғайлы уақытты таңдаңыз"}
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{t("landing.feature1")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ru"
                  ? "Безопасная обработка платежей через интернет"
                  : "Интернет арқылы төлемдерді қауіпсіз өңдеу"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-16 md:py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {language === "ru" ? "Готовы начать?" : "Бастауға дайынсыз ба?"}
          </h2>
          <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
            {language === "ru"
              ? "Присоединяйтесь к сотням жителей, использующих нашу платформу для удобного вывоза мусора"
              : "Қоқысты ыңғайлы тасымалдау үшін біздің платформаны пайдаланатын жүздеген тұрғындарға қосылыңыз"}
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base shadow-lg">
              {language === "ru" ? "Создать аккаунт" : "Аккаунт жасау"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="font-semibold">{t("landing.title")}</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {language === "ru"
                ? "© 2025 Платформа по вывозу мусора. Все права защищены."
                : "© 2025 Қоқыс тасымалдау платформасы. Барлық құқықтар қорғалған."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
