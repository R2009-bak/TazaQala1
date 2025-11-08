"use client"

import { Truck, MapPin } from "lucide-react"

interface AdminOverviewMapProps {
  drivers: any[]
  orders: any[]
}

export function AdminOverviewMap({ drivers, orders }: AdminOverviewMapProps) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-muted">
      {/* Mock map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 to-muted">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, var(--border) 50px, var(--border) 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, var(--border) 50px, var(--border) 51px)`,
          }}
        />
      </div>

      {/* Active drivers */}
      {drivers.slice(0, 2).map((driver, index) => {
        const positions = [
          { left: "30%", top: "35%" },
          { left: "60%", top: "50%" },
        ]
        const position = positions[index]

        return (
          <div key={driver.id} className="absolute" style={position}>
            <div className="relative">
              <div className="absolute -inset-3 animate-pulse rounded-full bg-secondary/20" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg">
                <Truck className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2 rounded-md bg-card px-3 py-2 text-xs shadow-md">
              <p className="font-semibold">{driver.name}</p>
              <p className="text-muted-foreground">{driver.vehicle}</p>
              <p className="text-xs text-primary">{driver.pickups} pickups</p>
            </div>
          </div>
        )
      })}

      {/* Order locations */}
      {orders.slice(0, 3).map((order, index) => {
        const positions = [
          { left: "20%", top: "25%" },
          { left: "50%", top: "30%" },
          { left: "70%", top: "65%" },
        ]
        const position = positions[index]

        return (
          <div key={order.id} className="absolute" style={position}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
        )
      })}

      {/* City center marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-lg bg-card px-4 py-2 text-center shadow-lg">
          <p className="text-xs font-semibold">Kyzylorda City Center</p>
          <p className="text-xs text-muted-foreground">Operations Hub</p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-card p-4 shadow-lg">
        <h4 className="mb-3 text-sm font-semibold">Map Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
              <Truck className="h-3 w-3 text-secondary-foreground" />
            </div>
            <span>Active Drivers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <MapPin className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>Pickup Locations</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute right-4 top-4 rounded-lg bg-card p-4 shadow-lg">
        <h4 className="mb-3 font-semibold">Live Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-8">
            <span className="text-muted-foreground">Active Drivers:</span>
            <span className="font-medium">{drivers.length}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-muted-foreground">In Progress:</span>
            <span className="font-medium">{orders.length}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-muted-foreground">Coverage:</span>
            <span className="font-medium">8 districts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
