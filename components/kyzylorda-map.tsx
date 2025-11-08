"use client"

import { useLanguage } from "@/lib/language-context"
import { Truck } from "lucide-react"

interface MapProps {
  trucks?: Array<{
    id: string
    lat: number
    lng: number
    driver: string
    status: string
  }>
  userLocation?: { lat: number; lng: number }
}

export function KyzylordaMap({ trucks = [], userLocation }: MapProps) {
  const { language } = useLanguage()

  // Kyzylorda center coordinates
  const centerLat = 44.8526
  const centerLng = 65.4935

  return (
    <div className="relative w-full h-full min-h-[400px] bg-muted rounded-lg overflow-hidden border">
      {/* Map Background - Kyzylorda styled */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Grid overlay to simulate map */}
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* City marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary/30">Кызылорда</div>
            <div className="text-sm text-muted-foreground">
              {centerLat.toFixed(4)}, {centerLng.toFixed(4)}
            </div>
          </div>
        </div>

        {/* User location */}
        {userLocation && (
          <div
            className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"
            style={{
              top: "45%",
              left: "48%",
            }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-xs font-medium">
              {language === "ru" ? "Ваш дом" : "Сіздің үйіңіз"}
            </div>
          </div>
        )}

        {/* Trucks on map */}
        {trucks.map((truck, index) => (
          <div
            key={truck.id}
            className="absolute"
            style={{
              top: `${40 + index * 15}%`,
              left: `${35 + index * 20}%`,
            }}
          >
            <div className="relative group">
              <div className="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
                <Truck className="w-4 h-4 text-white" />
              </div>
              {/* Truck info tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap border">
                  <div className="font-semibold">{truck.driver}</div>
                  <div className="text-muted-foreground">{truck.status}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg text-xs space-y-2 border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>{language === "ru" ? "Ваше местоположение" : "Сіздің орналасуыңыз"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>{language === "ru" ? "Мусоровоз" : "Қоқыс көлігі"}</span>
        </div>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-xs text-muted-foreground border">
        {language === "ru" ? "Карта Кызылорды" : "Қызылорда картасы"}
      </div>
    </div>
  )
}
