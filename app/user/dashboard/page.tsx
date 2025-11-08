"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Truck,
  LogOut,
  User,
  TrendingUp,
  Clock,
  Star,
  Recycle,
} from "lucide-react"
import Link from "next/link"
import { KyzylordaMap } from "@/components/kyzylorda-map"
import { useLanguage } from "@/lib/language-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const mockOrders = [
  {
    id: "1",
    status: "scheduled",
    date: "2025-01-15",
    time: "10:00",
    address: "ул. Абая 123, Кызылорда",
    driver: "Нурлан К.",
    driverRating: 4.8,
    driverPhone: "+7 (701) 234-56-78",
    price: 1500,
    wasteType: "Бытовой мусор",
  },
  {
    id: "2",
    status: "in-progress",
    date: "2025-01-12",
    time: "14:00",
    address: "ул. Абая 123, Кызылорда",
    driver: "Аскар М.",
    driverRating: 4.9,
    driverPhone: "+7 (702) 345-67-89",
    price: 1500,
    wasteType: "Бытовой мусор",
    estimatedArrival: "15 мин",
  },
  {
    id: "3",
    status: "completed",
    date: "2025-01-08",
    time: "11:00",
    address: "ул. Абая 123, Кызылорда",
    driver: "Бекзат Т.",
    driverRating: 4.7,
    driverPhone: "+7 (703) 456-78-90",
    price: 1500,
    wasteType: "Бытовой мусор",
  },
  {
    id: "4",
    status: "completed",
    date: "2025-01-01",
    time: "09:30",
    address: "ул. Абая 123, Кызылорда",
    driver: "Ержан С.",
    driverRating: 4.6,
    driverPhone: "+7 (704) 567-89-01",
    price: 1500,
    wasteType: "Бытовой мусор",
  },
]

const statusTranslations: Record<string, Record<string, string>> = {
  scheduled: { ru: "Запланирован", kk: "Жоспарланған" },
  "in-progress": { ru: "В процессе", kk: "Орындалуда" },
  completed: { ru: "Завершен", kk: "Аяқталды" },
  cancelled: { ru: "Отменен", kk: "Болдырылмаған" },
}

const statusColors = {
  scheduled: "bg-chart-2 text-white",
  "in-progress": "bg-chart-4 text-white",
  completed: "bg-primary text-primary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
}

export default function UserDashboard() {
  const { t, language } = useLanguage()
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)

  // Calculate statistics
  const activeOrders = mockOrders.filter((o) => o.status === "scheduled" || o.status === "in-progress")
  const completedOrders = mockOrders.filter((o) => o.status === "completed")
  const totalSpent = mockOrders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.price, 0)
  const averageRating = 4.8
  const totalWaste = completedOrders.length * 50 // kg

  // Trucks on map
  const activeTrucks = mockOrders
    .filter((o) => o.status === "in-progress")
    .map((order, index) => ({
      id: order.id,
      lat: 44.8526 + (Math.random() - 0.5) * 0.02,
      lng: 65.4935 + (Math.random() - 0.5) * 0.02,
      driver: order.driver,
      status: language === "ru" ? "В пути к вам" : "Сізге бара жатыр",
    }))

  return (
    <div className="min-h-screen bg-muted/30">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowProfileDialog(true)}>
              <User className="h-5 w-5" />
            </Button>
            <Link href="/login">
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
            <h1 className="text-3xl font-bold">{t("user.dashboard")}</h1>
            <p className="text-muted-foreground">
              {language === "ru" ? "Управление заказами на вывоз мусора" : "Қоқыс тасымалдау тапсырыстарын басқару"}
            </p>
          </div>
          <Button onClick={() => setShowScheduleDialog(true)} size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            {t("user.orderPickup")}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("user.activeOrders")}</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{activeOrders.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ru"
                  ? `${activeOrders.filter((o) => o.status === "scheduled").length} запланировано`
                  : `${activeOrders.filter((o) => o.status === "scheduled").length} жоспарланған`}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("user.completedOrders")}</CardTitle>
              <Truck className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3">{completedOrders.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ru" ? "Всего выполнено" : "Барлығы орындалды"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("user.totalSpent")}</CardTitle>
              <CreditCard className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-2">{totalSpent.toLocaleString()}₸</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ru" ? "За всё время" : "Барлық уақыт бойы"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("user.averageRating")}</CardTitle>
              <Star className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-5">{averageRating}</div>
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
              {t("user.statistics")}
            </CardTitle>
            <CardDescription>
              {language === "ru"
                ? "Подробная статистика ваших заказов и активности"
                : "Тапсырыстарыңыз бен белсенділігіңіздің толық статистикасы"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Recycle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalWaste} кг</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Собрано мусора" : "Жиналған қоқыс"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                  <Calendar className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{t("user.totalOrders")}</p>
                  <p className="text-sm text-muted-foreground">{mockOrders.length}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                  <Clock className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{language === "ru" ? "~30 мин" : "~30 мин"}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Среднее время ожидания" : "Орташа күту уақыты"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-4/10">
                  <Star className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedOrders.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Успешных вывозов" : "Сәтті тасымалдау"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-5/10">
                  <CreditCard className="h-5 w-5 text-chart-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.round(totalSpent / completedOrders.length)}₸</p>
                  <p className="text-sm text-muted-foreground">{language === "ru" ? "Средний чек" : "Орташа чек"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{language === "ru" ? "Регулярно" : "Үнемі"}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Частота использования" : "Пайдалану жиілігі"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders">{t("user.myOrders")}</TabsTrigger>
            <TabsTrigger value="map">{t("user.map")}</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          {statusTranslations[order.status]?.[language] || order.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {language === "ru" ? "Заказ" : "Тапсырыс"} #{order.id}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-primary">{order.price}₸</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{order.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} {language === "ru" ? "в" : "сағат"} {order.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <User className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{order.driver}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-chart-5 text-chart-5" />
                            <span>{order.driverRating}</span>
                            {order.estimatedArrival && (
                              <span className="ml-2 text-primary font-medium">• {order.estimatedArrival}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.status === "in-progress" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="default" className="flex-1" onClick={() => setSelectedOrder(order)}>
                          {language === "ru" ? "Отследить на карте" : "Картада бақылау"}
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${order.driverPhone}`}>{language === "ru" ? "Позвонить" : "Қоңырау шалу"}</a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ru" ? "Карта Кызылорды" : "Қызылорда картасы"}</CardTitle>
                <CardDescription>
                  {language === "ru"
                    ? "Отслеживайте мусоровозы в реальном времени"
                    : "Қоқыс көліктерін нақты уақытта бақылаңыз"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <KyzylordaMap trucks={activeTrucks} userLocation={{ lat: 44.8526, lng: 65.5091 }} />
                </div>
                {activeTrucks.length === 0 && (
                  <p className="text-center text-muted-foreground mt-4">
                    {language === "ru"
                      ? "Нет активных заказов для отслеживания"
                      : "Бақылау үшін белсенді тапсырыстар жоқ"}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Schedule Pickup Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("user.orderPickup")}</DialogTitle>
            <DialogDescription>
              {language === "ru"
                ? "Заполните форму для заказа вывоза мусора"
                : "Қоқыс тасымалдауға тапсырыс беру үшін форманы толтырыңыз"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t("auth.address")}</Label>
              <Input defaultValue="ул. Абая 123, Кызылорда" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("common.date")}</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>{t("common.time")}</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{language === "ru" ? "Тип мусора" : "Қоқыс түрі"}</Label>
              <Input defaultValue="Бытовой мусор" />
            </div>
            <div className="space-y-2">
              <Label>{language === "ru" ? "Комментарий" : "Түсініктеме"}</Label>
              <Textarea placeholder={language === "ru" ? "Дополнительная информация..." : "Қосымша ақпарат..."} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">{t("common.price")}:</span>
              <span className="text-2xl font-bold text-primary">1500₸</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)} className="flex-1">
              {t("common.cancel")}
            </Button>
            <Button onClick={() => setShowScheduleDialog(false)} className="flex-1">
              {language === "ru" ? "Заказать" : "Тапсырыс беру"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("user.profile")}</DialogTitle>
            <DialogDescription>
              {language === "ru" ? "Просмотр и редактирование профиля" : "Профильді қарау және өңдеу"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">АБ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">Алексей Бекмуратов</p>
                <p className="text-sm text-muted-foreground">alexey@example.com</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("auth.fullName")}</Label>
                <Input defaultValue="Алексей Бекмуратов" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.email")}</Label>
                <Input type="email" defaultValue="alexey@example.com" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.phone")}</Label>
                <Input type="tel" defaultValue="+7 (777) 123-45-67" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.address")}</Label>
                <Input defaultValue="ул. Абая 123, Кызылорда" />
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
