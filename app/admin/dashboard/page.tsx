"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  Truck,
  Package,
  DollarSign,
  TrendingUp,
  LogOut,
  User,
  BarChart3,
  UserPlus,
  MapPin,
  Star,
} from "lucide-react"
import Link from "next/link"
import { KyzylordaMap } from "@/components/kyzylorda-map"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/lib/language-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const mockDrivers = [
  {
    id: "1",
    name: "Нурлан К.",
    status: "active",
    pickups: 8,
    completed: 5,
    vehicle: "A 123 BC 09",
    phone: "+7 (701) 234-56-78",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Аскар М.",
    status: "active",
    pickups: 6,
    completed: 4,
    vehicle: "A 456 DE 09",
    phone: "+7 (702) 345-67-89",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Бекзат Т.",
    status: "offline",
    pickups: 0,
    completed: 12,
    vehicle: "A 789 FG 09",
    phone: "+7 (703) 456-78-90",
    rating: 4.7,
  },
]

const mockUsers = [
  {
    id: "1",
    name: "Алибек Н.",
    address: "ул. Абая 123",
    phone: "+7 (777) 123-45-67",
    totalOrders: 15,
    status: "active",
  },
  {
    id: "2",
    name: "Аида К.",
    address: "пр. Назарбаева 456",
    phone: "+7 (777) 234-56-78",
    totalOrders: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Мурат С.",
    address: "ул. Сырдарья 789",
    phone: "+7 (777) 345-67-89",
    totalOrders: 22,
    status: "active",
  },
]

const mockOrders = [
  {
    id: "1",
    customer: "Алибек Н.",
    driver: "Не назначен",
    status: "pending",
    amount: 1500,
    time: "10:00",
    address: "ул. Абая 123",
  },
  {
    id: "2",
    customer: "Аида К.",
    driver: "Нурлан К.",
    status: "in-progress",
    amount: 1500,
    time: "10:30",
    address: "пр. Назарбаева 456",
  },
  {
    id: "3",
    customer: "Мурат С.",
    driver: "Аскар М.",
    status: "completed",
    amount: 1500,
    time: "09:00",
    address: "ул. Сырдарья 789",
  },
]

const statusColors = {
  active: "bg-primary text-primary-foreground",
  offline: "bg-muted text-muted-foreground",
  pending: "bg-chart-5 text-white",
  scheduled: "bg-chart-2 text-white",
  "in-progress": "bg-chart-4 text-white",
  completed: "bg-primary text-primary-foreground",
}

export default function AdminDashboard() {
  const { t, language } = useLanguage()
  const [showAddDriverDialog, setShowAddDriverDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showAssignOrderDialog, setShowAssignOrderDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)

  // Statistics
  const totalOrders = 248
  const activeDrivers = mockDrivers.filter((d) => d.status === "active").length
  const totalUsers = 1234
  const monthlyRevenue = 372000
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length

  const activeTrucks = mockDrivers
    .filter((d) => d.status === "active")
    .map((driver, index) => ({
      id: driver.id,
      lat: 44.8526 + (Math.random() - 0.5) * 0.02,
      lng: 65.4935 + (Math.random() - 0.5) * 0.02,
      driver: driver.name,
      status: language === "ru" ? "На маршруте" : "Бағытта",
    }))

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-3/10">
              <Building2 className="h-5 w-5 text-chart-3" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-chart-3">{t("landing.adminPortal")}</span>
              <span className="text-xs text-muted-foreground">{t("landing.subtitle")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowProfileDialog(true)}>
              <User className="h-5 w-5" />
            </Button>
            <Link href="/admin/login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("admin.dashboard")}</h1>
          <p className="text-muted-foreground">
            {language === "ru"
              ? "Мониторинг и координация всех операций по вывозу мусора"
              : "Қоқыс тасымалдау бойынша барлық операцияларды бақылау және үйлестіру"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("admin.totalUsers")}</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+89</span> {language === "ru" ? "новых за месяц" : "айға жаңа"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("admin.activeDrivers")}</CardTitle>
              <Truck className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-3">{activeDrivers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ru" ? `из ${mockDrivers.length} всего` : `барлығы ${mockDrivers.length}`}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === "ru" ? "Всего заказов" : "Барлық тапсырыстар"}
              </CardTitle>
              <Package className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-2">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+12%</span> {language === "ru" ? "к прошлому месяцу" : "өткен айға"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{language === "ru" ? "Доход" : "Табыс"}</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chart-5">{monthlyRevenue.toLocaleString()}₸</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+18%</span> {language === "ru" ? "к прошлому месяцу" : "өткен айға"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {language === "ru" ? "Детальная статистика" : "Толық статистика"}
            </CardTitle>
            <CardDescription>
              {language === "ru"
                ? "Подробная аналитика по всем показателям работы организации"
                : "Ұйымның жұмысы бойынша барлық көрсеткіштердің толық талдауы"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingOrders}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Ожидающих заказов" : "Күтілетін тапсырыстар"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                  <TrendingUp className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Процент выполнения" : "Орындау пайызы"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                  <Star className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.7/5</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Удовлетворенность клиентов" : "Клиенттердің қанағаттануы"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-4/10">
                  <MapPin className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2,340 км</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Пройдено за месяц" : "Айға өтілген"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="overview">{t("admin.overview")}</TabsTrigger>
            <TabsTrigger value="drivers">{t("admin.drivers")}</TabsTrigger>
            <TabsTrigger value="users">{t("admin.users")}</TabsTrigger>
            <TabsTrigger value="orders">{t("admin.orders")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ru" ? "Карта операций" : "Операциялар картасы"}</CardTitle>
                <CardDescription>
                  {language === "ru"
                    ? "Отслеживание всех активных водителей в режиме реального времени"
                    : "Барлық белсенді жүргізушілерді нақты уақытта бақылау"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <KyzylordaMap trucks={activeTrucks} userLocation={{ lat: 44.8526, lng: 65.5091 }} />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "ru" ? "Последняя активность" : "Соңғы белсенділік"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === "ru" ? "Водитель" : "Жүргізуші"}: {order.driver} • {order.time}
                          </p>
                        </div>
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status === "pending"
                            ? language === "ru"
                              ? "Ожидает"
                              : "Күтуде"
                            : order.status === "in-progress"
                              ? language === "ru"
                                ? "В процессе"
                                : "Орындалуда"
                              : language === "ru"
                                ? "Завершен"
                                : "Аяқталды"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === "ru" ? "Лучшие водители" : "Үздік жүргізушілер"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDrivers
                      .filter((d) => d.completed > 0)
                      .sort((a, b) => b.completed - a.completed)
                      .map((driver) => (
                        <div key={driver.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {driver.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{driver.name}</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-chart-5 text-chart-5" />
                                <span className="text-xs text-muted-foreground">{driver.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{driver.completed}</p>
                            <p className="text-xs text-muted-foreground">
                              {language === "ru" ? "выполнено" : "орындалды"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{language === "ru" ? "Управление водителями" : "Жүргізушілерді басқару"}</CardTitle>
                    <CardDescription>
                      {language === "ru" ? "Управление парком водителей" : "Жүргізушілер паркін басқару"}
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddDriverDialog(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t("admin.addDriver")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "ru" ? "Имя" : "Аты"}</TableHead>
                      <TableHead>{language === "ru" ? "Автомобиль" : "Көлік"}</TableHead>
                      <TableHead>{language === "ru" ? "Статус" : "Мәртебе"}</TableHead>
                      <TableHead>{language === "ru" ? "Заказы сегодня" : "Бүгінгі тапсырыстар"}</TableHead>
                      <TableHead>{language === "ru" ? "Выполнено" : "Орындалды"}</TableHead>
                      <TableHead>{language === "ru" ? "Рейтинг" : "Рейтинг"}</TableHead>
                      <TableHead>{language === "ru" ? "Действия" : "Әрекеттер"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.vehicle}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[driver.status as keyof typeof statusColors]}>
                            {driver.status === "active"
                              ? language === "ru"
                                ? "Активен"
                                : "Белсенді"
                              : language === "ru"
                                ? "Не в сети"
                                : "Желіде жоқ"}
                          </Badge>
                        </TableCell>
                        <TableCell>{driver.pickups}</TableCell>
                        <TableCell>{driver.completed}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-chart-5 text-chart-5" />
                            <span>{driver.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            {language === "ru" ? "Подробнее" : "Толығырақ"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ru" ? "Управление пользователями" : "Пайдаланушыларды басқару"}</CardTitle>
                <CardDescription>
                  {language === "ru"
                    ? "Просмотр всех зарегистрированных пользователей"
                    : "Барлық тіркелген пайдаланушыларды қарау"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "ru" ? "Имя" : "Аты"}</TableHead>
                      <TableHead>{language === "ru" ? "Адрес" : "Мекен-жай"}</TableHead>
                      <TableHead>{language === "ru" ? "Телефон" : "Телефон"}</TableHead>
                      <TableHead>{language === "ru" ? "Всего заказов" : "Барлық тапсырыстар"}</TableHead>
                      <TableHead>{language === "ru" ? "Статус" : "Мәртебе"}</TableHead>
                      <TableHead>{language === "ru" ? "Действия" : "Әрекеттер"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.totalOrders}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                            {language === "ru" ? "Активен" : "Белсенді"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            {language === "ru" ? "Подробнее" : "Толығырақ"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ru" ? "Управление заказами" : "Тапсырыстарды басқару"}</CardTitle>
                <CardDescription>
                  {language === "ru"
                    ? "Просмотр и назначение заказов водителям"
                    : "Тапсырыстарды қарау және жүргізушілерге тағайындау"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>{language === "ru" ? "Клиент" : "Клиент"}</TableHead>
                      <TableHead>{language === "ru" ? "Адрес" : "Мекен-жай"}</TableHead>
                      <TableHead>{language === "ru" ? "Водитель" : "Жүргізуші"}</TableHead>
                      <TableHead>{language === "ru" ? "Статус" : "Мәртебе"}</TableHead>
                      <TableHead>{language === "ru" ? "Время" : "Уақыт"}</TableHead>
                      <TableHead>{language === "ru" ? "Сумма" : "Сома"}</TableHead>
                      <TableHead>{language === "ru" ? "Действия" : "Әрекеттер"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>{order.driver}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                            {order.status === "pending"
                              ? language === "ru"
                                ? "Ожидает"
                                : "Күтуде"
                              : order.status === "in-progress"
                                ? language === "ru"
                                  ? "В процессе"
                                  : "Орындалуда"
                                : language === "ru"
                                  ? "Завершен"
                                  : "Аяқталды"}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>{order.amount}₸</TableCell>
                        <TableCell>
                          {order.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order)
                                setShowAssignOrderDialog(true)
                              }}
                            >
                              {language === "ru" ? "Назначить" : "Тағайындау"}
                            </Button>
                          )}
                          {order.status !== "pending" && (
                            <Button variant="ghost" size="sm">
                              {language === "ru" ? "Просмотр" : "Қарау"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Driver Dialog */}
      <Dialog open={showAddDriverDialog} onOpenChange={setShowAddDriverDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("admin.addDriver")}</DialogTitle>
            <DialogDescription>
              {language === "ru" ? "Добавление нового водителя в систему" : "Жаңа жүргізушіні жүйеге қосу"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t("auth.fullName")}</Label>
              <Input placeholder={language === "ru" ? "Имя водителя" : "Жүргізушінің аты"} />
            </div>
            <div className="space-y-2">
              <Label>{t("auth.email")}</Label>
              <Input type="email" placeholder="driver@example.com" />
            </div>
            <div className="space-y-2">
              <Label>{t("auth.phone")}</Label>
              <Input type="tel" placeholder="+7 (7XX) XXX-XX-XX" />
            </div>
            <div className="space-y-2">
              <Label>{language === "ru" ? "Номер автомобиля" : "Көлік нөмірі"}</Label>
              <Input placeholder="A 123 BC 09" />
            </div>
            <div className="space-y-2">
              <Label>{t("auth.password")}</Label>
              <Input type="password" placeholder={t("auth.password")} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddDriverDialog(false)} className="flex-1">
              {t("common.cancel")}
            </Button>
            <Button onClick={() => setShowAddDriverDialog(false)} className="flex-1">
              {language === "ru" ? "Добавить" : "Қосу"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Order Dialog */}
      <Dialog open={showAssignOrderDialog} onOpenChange={setShowAssignOrderDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("admin.assignOrder")}</DialogTitle>
            <DialogDescription>
              {language === "ru"
                ? "Назначьте водителя для выполнения заказа"
                : "Тапсырысты орындау үшін жүргізушіні тағайындаңыз"}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm font-medium">
                  {language === "ru" ? "Заказ" : "Тапсырыс"} #{selectedOrder.id}
                </p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "ru" ? "Время" : "Уақыт"}: {selectedOrder.time}
                </p>
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Выберите водителя" : "Жүргізушіні таңдаңыз"}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "ru" ? "Выберите водителя" : "Жүргізушіні таңдаңыз"} />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDrivers
                      .filter((d) => d.status === "active")
                      .map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name} - {driver.vehicle}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAssignOrderDialog(false)} className="flex-1">
              {t("common.cancel")}
            </Button>
            <Button onClick={() => setShowAssignOrderDialog(false)} className="flex-1">
              {language === "ru" ? "Назначить" : "Тағайындау"}
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
              {language === "ru" ? "Просмотр и редактирование профиля организации" : "Ұйым профилін қарау және өңдеу"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-chart-3 text-chart-3-foreground text-2xl">АО</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{language === "ru" ? 'АО "Таза Қала"' : 'АҚ "Таза Қала"'}</p>
                <p className="text-sm text-muted-foreground">admin@tazaqala.kz</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{language === "ru" ? "Название организации" : "Ұйым атауы"}</Label>
                <Input defaultValue='АО "Таза Қала"' />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.email")}</Label>
                <Input type="email" defaultValue="admin@tazaqala.kz" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.phone")}</Label>
                <Input type="tel" defaultValue="+7 (7242) 12-34-56" />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.address")}</Label>
                <Input defaultValue="ул. Аль-Фараби 1, Кызылорда" />
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
