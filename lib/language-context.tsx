"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ru" | "kk"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ru: {
    // Landing Page
    "landing.title": "Вывоз мусора",
    "landing.subtitle": "Кызылорда",
    "landing.description": "Цифровая платформа для организации вывоза мусора у частных домов",
    "landing.userPortal": "Для жителей",
    "landing.driverPortal": "Для водителей",
    "landing.adminPortal": "Для организации",
    "landing.feature1": "Онлайн оплата",
    "landing.feature2": "Отслеживание в реальном времени",
    "landing.feature3": "Быстрое обслуживание",
    "landing.feature4": "Удобное управление",

    // Auth
    "auth.login": "Войти",
    "auth.register": "Регистрация",
    "auth.email": "Электронная почта",
    "auth.password": "Пароль",
    "auth.confirmPassword": "Подтвердите пароль",
    "auth.fullName": "Полное имя",
    "auth.phone": "Телефон",
    "auth.address": "Адрес",
    "auth.forgotPassword": "Забыли пароль?",
    "auth.noAccount": "Нет аккаунта?",
    "auth.haveAccount": "Уже есть аккаунт?",
    "auth.signIn": "Войти в систему",
    "auth.signUp": "Зарегистрироваться",

    // User Dashboard
    "user.dashboard": "Панель управления",
    "user.map": "Карта",
    "user.orderPickup": "Заказать вывоз",
    "user.myOrders": "Мои заказы",
    "user.statistics": "Статистика",
    "user.profile": "Профиль",
    "user.activeOrders": "Активные заказы",
    "user.completedOrders": "Выполненные заказы",
    "user.totalOrders": "Всего заказов",
    "user.totalSpent": "Потрачено",
    "user.averageRating": "Средняя оценка",
    "user.wasteCollected": "Собрано мусора",

    // Driver Dashboard
    "driver.dashboard": "Панель водителя",
    "driver.startSession": "Начать смену",
    "driver.endSession": "Завершить смену",
    "driver.incomingOrders": "Входящие заказы",
    "driver.currentOrders": "Текущие заказы",
    "driver.completedToday": "Выполнено сегодня",
    "driver.earnings": "Заработок",
    "driver.rating": "Рейтинг",
    "driver.statistics": "Статистика",

    // Admin Dashboard
    "admin.dashboard": "Панель организации",
    "admin.overview": "Обзор",
    "admin.drivers": "Водители",
    "admin.users": "Пользователи",
    "admin.orders": "Заказы",
    "admin.addDriver": "Добавить водителя",
    "admin.assignOrder": "Назначить заказ",
    "admin.totalDrivers": "Всего водителей",
    "admin.activeDrivers": "Активные водители",
    "admin.totalUsers": "Всего пользователей",
    "admin.pendingOrders": "Ожидающие заказы",

    // Common
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.edit": "Редактировать",
    "common.delete": "Удалить",
    "common.status": "Статус",
    "common.date": "Дата",
    "common.time": "Время",
    "common.price": "Цена",
    "common.loading": "Загрузка...",
    "common.logout": "Выйти",
  },
  kk: {
    // Landing Page
    "landing.title": "Қоқыс тасымалдау",
    "landing.subtitle": "Қызылорда",
    "landing.description": "Жеке үйлерден қоқыс тасымалдауды ұйымдастыруға арналған цифрлық платформа",
    "landing.userPortal": "Тұрғындарға",
    "landing.driverPortal": "Жүргізушілерге",
    "landing.adminPortal": "Ұйымға",
    "landing.feature1": "Онлайн төлем",
    "landing.feature2": "Нақты уақытта бақылау",
    "landing.feature3": "Жылдам қызмет",
    "landing.feature4": "Ыңғайлы басқару",

    // Auth
    "auth.login": "Кіру",
    "auth.register": "Тіркелу",
    "auth.email": "Электрондық пошта",
    "auth.password": "Құпия сөз",
    "auth.confirmPassword": "Құпия сөзді растаңыз",
    "auth.fullName": "Толық аты",
    "auth.phone": "Телефон",
    "auth.address": "Мекен-жайы",
    "auth.forgotPassword": "Құпия сөзді ұмыттыңыз ба?",
    "auth.noAccount": "Аккаунт жоқ па?",
    "auth.haveAccount": "Аккаунт бар ма?",
    "auth.signIn": "Жүйеге кіру",
    "auth.signUp": "Тіркелу",

    // User Dashboard
    "user.dashboard": "Басқару панелі",
    "user.map": "Карта",
    "user.orderPickup": "Тасымалдауға тапсырыс",
    "user.myOrders": "Менің тапсырыстарым",
    "user.statistics": "Статистика",
    "user.profile": "Профиль",
    "user.activeOrders": "Белсенді тапсырыстар",
    "user.completedOrders": "Орындалған тапсырыстар",
    "user.totalOrders": "Барлық тапсырыстар",
    "user.totalSpent": "Жұмсалған",
    "user.averageRating": "Орташа бағалау",
    "user.wasteCollected": "Жиналған қоқыс",

    // Driver Dashboard
    "driver.dashboard": "Жүргізуші панелі",
    "driver.startSession": "Ауысымды бастау",
    "driver.endSession": "Ауысымды аяқтау",
    "driver.incomingOrders": "Кіріс тапсырыстар",
    "driver.currentOrders": "Ағымдағы тапсырыстар",
    "driver.completedToday": "Бүгін орындалды",
    "driver.earnings": "Табыс",
    "driver.rating": "Рейтинг",
    "driver.statistics": "Статистика",

    // Admin Dashboard
    "admin.dashboard": "Ұйым панелі",
    "admin.overview": "Шолу",
    "admin.drivers": "Жүргізушілер",
    "admin.users": "Пайдаланушылар",
    "admin.orders": "Тапсырыстар",
    "admin.addDriver": "Жүргізуші қосу",
    "admin.assignOrder": "Тапсырыс беру",
    "admin.totalDrivers": "Барлық жүргізушілер",
    "admin.activeDrivers": "Белсенді жүргізушілер",
    "admin.totalUsers": "Барлық пайдаланушылар",
    "admin.pendingOrders": "Күтілетін тапсырыстар",

    // Common
    "common.save": "Сақтау",
    "common.cancel": "Болдырмау",
    "common.edit": "Өңдеу",
    "common.delete": "Жою",
    "common.status": "Мәртебе",
    "common.date": "Күні",
    "common.time": "Уақыт",
    "common.price": "Бағасы",
    "common.loading": "Жүктелуде...",
    "common.logout": "Шығу",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)["ru"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
