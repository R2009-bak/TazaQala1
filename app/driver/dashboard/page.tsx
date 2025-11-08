"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Navigation,
  CheckCircle,
  Clock,
  Package,
  LogOut,
  User,
  Phone,
  TrendingUp,
  DollarSign,
  Star,
  Calendar,
  AlertCircle,
  Play,
  Pause,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { KyzylordaMap } from "@/components/kyzylorda-map"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const mockPickups = [
  {
    id: "1",
    status: "assigned",
    customer: "Алибек Н.",
    address: "ул. Абая 123",
    time: "10:00",
    phone: "+7 (701) 234-56-78",
    wasteType: "Бытовой мусор",
    priority: "normal",
    distance: "2.5 км",
  },
  {
    id: "2",
    status: "assigned",
    customer: "Аида К.",
    address: "пр. Назарбаева 456",
    time: "10:30",
    phone: "+7 (702) 345-67-89",
    wasteType: "Вторсырье",
    priority: "normal",
    distance: "3.8 км",
  },
  {
    id: "3",
    status: "assigned",
    customer: "Ержан М.",
    address: "ул. Сырдарья 789",
    time: "11:00",
    phone: "+7 (703) 456-78-90",
    wasteType: "Бытовой мусор",
    priority: "urgent",
    distance: "1.2 км",
  },
  {
    id: "4",
    status: "completed",
    customer: "Мурат С.",
    address: "ул. Байтурсынова 234",
    time: "09:00",
    phone: "+7 (704) 567-89-01",
    wasteType: "Бытовой мусор",
    priority: "normal",
    distance: "4.1 км",
  },
  {
    id: "5",
    status: "completed",
    customer: "Айгуль Б.",
    address: "ул. Гагарина 567",
    time: "08:30",
    phone: "+7 (705) 678-90-12",
    wasteType: "Строительный мусор",
    priority: "normal",
    distance: "5.3 км",
  },
]

const priorityColors = {
  urgent: "bg-destructive text-destructive-foreground",
  normal: "bg-secondary text-secondary-foreground",
}

export default function DriverDashboard() {
  const { t, language } = useLanguage()
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [sessionActive, setSessionActive] = useState(true)

  const handleStartPickup = (id: string) => {
    setSelectedPickup(id)
  }

  const handleCompletePickup = (id: string) => {
    console.log("[v0] Pickup completed:", id)
    setSelectedPickup(null)
  }

  // Statistics
  const totalPickups = mockPickups.length
  const completedPickups = mockPickups.filter((p) => p.status === "completed").length
  const remainingPickups = mockPickups.filter((p) => p.status === "assigned").length
  const todayEarnings = completedPickups * 500
  const driverRating = 4.9
  const totalDistance = mockPickups.reduce((sum, p) => sum + Number.parseFloat(p.distance), 0)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
              <Navigation className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-secondary">{t("landing.driverPortal")}</span>
              <span className="text-xs text-muted-foreground">{t("landing.subtitle")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={sessionActive ? "default" : "secondary"} className="hidden sm:flex">
              {sessionActive
                ? language === "ru"
                  ? "Смена активна"
                  : "Ауысым белсенді"
                : language === "ru"
                  ? "Смена завершена"
                  : "Ауысым аяқталды"}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => setShowProfileDialog(true)}>
              <User className="h-5 w-5" />
            </Button>
            <Link href="/driver/login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("driver.dashboard")}</h1>
            <p className="text-muted-foreground">
              {language === "ru" ? "Управление маршрутами и заказами" : "Бағыттар мен тапсырыстарды басқару"}
            </p>
          </div>
          <Button
            size="lg"
            variant={sessionActive ? "destructive" : "default"}
            onClick={() => setSessionActive(!sessionActive)}
          >
            {sessionActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {sessionActive ? t("driver.endSession") : t("driver.startSession")}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === "ru" ? "Всего заказов" : "Барлық тапсырыстар"}
              </CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalPickups}</div>
              <p className="text-xs text-muted-foreground mt-1">{language === "ru" ? "Сегодня" : "Бүгін"}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("driver.completedToday")}</CardTitle>
              <CheckCircle className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3">{completedPickups}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((completedPickups / totalPickups) * 100)}% {language === "ru" ? "выполнено" : "орындалды"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("driver.earnings")}</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-2">{todayEarnings.toLocaleString()}₸</div>
              <p className="text-xs text-muted-foreground mt-1">{language === "ru" ? "За сегодня" : "Бүгінге"}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("driver.rating")}</CardTitle>
              <Star className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-5">{driverRating}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ru" ? "Средняя оценка" : "Орташа бағалау"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t("driver.statistics")}
            </CardTitle>
            <CardDescription>
              {language === "ru"
                ? "Подробная статистика работы и эффективности"
                : "Жұмыс пен тиімділіктің толық статистикасы"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Navigation className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalDistance.toFixed(1)} км</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Пройдено сегодня" : "Бүгін өтілді"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                  <Clock className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{language === "ru" ? "6 ч 30 м" : "6 с 30 м"}</p>
                  <p className="text-sm text-muted-foreground">{language === "ru" ? "В смене" : "Ауысымда"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                  <Package className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{remainingPickups}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Осталось заказов" : "Қалған тапсырыстар"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-4/10">
                  <Calendar className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Заказов за неделю" : "Аптаға тапсырыстар"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-5/10">
                  <Star className="h-5 w-5 text-chart-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Положительных отзывов" : "Оң пікірлер"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12,000₸</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Заработано за неделю" : "Аптаға табыс"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pickups" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="pickups">{t("driver.currentOrders")}</TabsTrigger>
            <TabsTrigger value="completed">{language === "ru" ? "Выполнено" : "Орындалды"}</TabsTrigger>
            <TabsTrigger value="map">{t("user.map")}</TabsTrigger>
          </TabsList>

          <TabsContent value="pickups" className="space-y-4">
            {mockPickups
              .filter((p) => p.status === "assigned")
              .map((pickup) => (
                <Card key={pickup.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={priorityColors[pickup.priority as keyof typeof priorityColors]}>
                            {pickup.priority === "urgent"
                              ? language === "ru"
                                ? "Срочно"
                                : "Шұғыл"
                              : language === "ru"
                                ? "Обычный"
                                : "Қалыпты"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {language === "ru" ? "Заказ" : "Тапсырыс"} #{pickup.id}
                          </span>
                        </div>
                        {pickup.priority === "urgent" && <AlertCircle className="h-5 w-5 text-destructive" />}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{pickup.customer}</h3>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-medium">{pickup.address}</p>
                            <p className="text-muted-foreground">
                              {language === "ru" ? "Расстояние" : "Қашықтық"}: {pickup.distance}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {language === "ru" ? "Время" : "Уақыт"}: {pickup.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${pickup.phone}`} className="hover:text-primary">
                              {pickup.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{pickup.wasteType}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" variant="secondary" onClick={() => handleStartPickup(pickup.id)}>
                          <Navigation className="mr-2 h-4 w-4" />
                          {language === "ru" ? "Начать навигацию" : "Навигацияны бастау"}
                        </Button>
                        <Button className="flex-1" onClick={() => handleCompletePickup(pickup.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {language === "ru" ? "Завершить" : "Аяқтау"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {mockPickups
              .filter((p) => p.status === "completed")
              .map((pickup) => (
                <Card key={pickup.id} className="opacity-90">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{pickup.customer}</h3>
                          <Badge className="bg-primary text-primary-foreground">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {language === "ru" ? "Выполнено" : "Орындалды"}
                          </Badge>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                          <p>{pickup.address}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === "ru" ? "Завершено в" : "Аяқталды"} {pickup.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-chart-3">500₸</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ru" ? "Карта маршрута" : "Бағыт картасы"}</CardTitle>
                <CardDescription>
                  {language === "ru" ? "Ваш оптимизированный маршрут на сегодня" : "Бүгінгі оңтайландырылған бағытыңыз"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <KyzylordaMap
                    trucks={[
                      {
                        id: "current",
                        lat: 44.8526,
                        lng: 65.4935,
                        driver: language === "ru" ? "Вы" : "Сіз",
                        status: language === "ru" ? "На маршруте" : "Бағытта",
                      },
                    ]}
                    userLocation={{ lat: 44.8526, lng: 65.5091 }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("user.profile")}</DialogTitle>
            <DialogDescription>
              {language === "ru" ? "Просмотр и редактирование профиля водителя" : "Жүргізуші профилін қарау және өңдеу"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">НК</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">Нурлан Касымов</p>
                <p className="text-sm text-muted-foreground">nurlan@example.com</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-chart-5 text-chart-5" />
                  <span className="text-sm font-medium">{driverRating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("auth.fullName")}</Label>
                <Input defaultValue="Нурлан Касымов" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.email")}</Label>
                <Input type="email" defaultValue="nurlan@example.com" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.phone")}</Label>
                <Input type="tel" defaultValue="+7 (701) 234-56-78" />
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Номер автомобиля" : "Көлік нөмірі"}</Label>
                <Input defaultValue="A 123 BC 09" />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowProfileDialog(false)} className="flex-1">
              {t("common.cancel")}
            </Button>
            <Button onClick={() => setShowProfileDialog(false)} className="flex-1">
              {t("common.save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
