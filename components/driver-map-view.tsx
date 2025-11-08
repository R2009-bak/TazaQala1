"use client"

import { Navigation } from "lucide-react"

interface DriverMapViewProps {
  pickups: any[]
}

export function DriverMapView({ pickups }: DriverMapViewProps) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-muted">
      {/* Mock map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-muted">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, var(--border) 50px, var(--border) 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, var(--border) 50px, var(--border) 51px)`,
          }}
        />
      </div>

      {/* Route line */}
      <svg className="absolute inset-0 h-full w-full">
        <path
          d="M 150 150 Q 250 200 350 250 T 550 400"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="3"
          strokeDasharray="10,5"
          opacity="0.5"
        />
      </svg>

      {/* Driver location */}
      <div className="absolute left-[15%] top-[20%]">
        <div className="relative">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-secondary/30" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg">
            <Navigation className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-2 rounded-md bg-card px-3 py-2 text-xs font-medium shadow-md">
          <p className="font-semibold">Your Location</p>
          <p className="text-muted-foreground">Kyzylorda</p>
        </div>
      </div>

      {/* Pickup locations */}
      {pickups.slice(0, 3).map((pickup, index) => {
        const positions = [
          { left: "35%", top: "35%" },
          { left: "50%", top: "45%" },
          { left: "65%", top: "60%" },
        ]
        const position = positions[index]

        return (
          <div key={pickup.id} className="absolute" style={position}>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
            </div>
            <div className="mt-2 max-w-[150px] rounded-md bg-card px-3 py-2 text-xs shadow-md">
              <p className="font-semibold">{pickup.customer}</p>
              <p className="truncate text-muted-foreground">{pickup.address}</p>
              <p className="text-muted-foreground">{pickup.time}</p>
            </div>
          </div>
        )
      })}

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-card p-3 shadow-lg">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
              <Navigation className="h-3 w-3 text-secondary-foreground" />
            </div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              1
            </div>
            <span>Pickup Stop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 border-t-2 border-dashed border-secondary" />
            <span>Route Path</span>
          </div>
        </div>
      </div>

      {/* Route info */}
      <div className="absolute right-4 top-4 max-w-xs rounded-lg bg-card p-4 shadow-lg">
        <h4 className="mb-3 font-semibold">Route Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Stops:</span>
            <span className="font-medium">{pickups.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Distance:</span>
            <span className="font-medium">32 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Est. Time:</span>
            <span className="font-medium">3 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Next Stop:</span>
            <span className="font-medium">10 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
