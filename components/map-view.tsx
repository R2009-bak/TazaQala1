"use client"

import { MapPin, Truck } from "lucide-react"

interface MapViewProps {
  userLocation: { lat: number; lng: number }
  activeOrders: any[]
}

export function MapView({ userLocation, activeOrders }: MapViewProps) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-muted">
      {/* Mock map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-muted">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, var(--border) 50px, var(--border) 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, var(--border) 50px, var(--border) 51px)`,
          }}
        />
      </div>

      {/* User location marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-4 animate-ping rounded-full bg-primary/30" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <MapPin className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 rounded-md bg-card px-3 py-1 text-xs font-medium shadow-md">Your Location</div>
      </div>

      {/* Active truck marker */}
      {activeOrders.length > 0 && (
        <div className="absolute left-1/3 top-1/3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 rounded-md bg-card px-3 py-1 text-xs font-medium shadow-md">
            Driver: {activeOrders[0].driver}
          </div>
        </div>
      )}

      {/* Map controls overlay */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-card p-3 shadow-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary" />
            <span>Active Truck</span>
          </div>
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute right-4 top-4 rounded-lg bg-card p-4 shadow-lg">
        <h4 className="mb-2 font-semibold">Kyzylorda City</h4>
        <p className="text-xs text-muted-foreground">
          Coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
        </p>
      </div>
    </div>
  )
}
