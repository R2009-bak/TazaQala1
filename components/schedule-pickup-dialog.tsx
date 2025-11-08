"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SchedulePickupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SchedulePickupDialog({ open, onOpenChange }: SchedulePickupDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    address: "123 Abay Street, Kyzylorda",
    time: "",
    wasteType: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission
    onOpenChange(false)
    // In real app, would submit to backend
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Waste Pickup</DialogTitle>
          <DialogDescription>Choose your preferred date, time, and provide pickup details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">8:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="12:00">12:00 PM - 2:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM - 4:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM - 6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wasteType">Waste Type</Label>
                  <Select
                    value={formData.wasteType}
                    onValueChange={(value) => setFormData({ ...formData, wasteType: value })}
                  >
                    <SelectTrigger id="wasteType">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Waste</SelectItem>
                      <SelectItem value="recyclable">Recyclable Materials</SelectItem>
                      <SelectItem value="organic">Organic Waste</SelectItem>
                      <SelectItem value="bulk">Bulk Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Estimated Price</p>
                  <p className="text-sm text-muted-foreground">Standard pickup fee</p>
                </div>
                <p className="text-2xl font-bold">1,500₸</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
