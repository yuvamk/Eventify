'use client'

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Event {
  date: Date
  title: string
  description: string
}

export function EventCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [events, setEvents] = React.useState<Event[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [newEvent, setNewEvent] = React.useState({ title: '', description: '' })

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      setIsDialogOpen(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date && newEvent.title) {
      setEvents([...events, { date, ...newEvent }])
      setNewEvent({ title: '', description: '' })
      setIsDialogOpen(false)
    }
  }

  const getDayContent = (day: Date) => {
    const hasEvent = events.some(event => 
      event.date.toDateString() === day.toDateString()
    )
    return hasEvent ? <div className="w-1.5 h-1.5 bg-primary rounded-full mx-auto" /> : null
  }

  return (
    <div className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        components={{
          DayContent: ({ date }) => (
            <div className="w-full h-full">
              <div>{date.getDate()}</div>
              {getDayContent(date)}
            </div>
          )
        }}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event for {date?.toLocaleDateString()}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Enter event description"
              />
            </div>
            <Button type="submit">Save Event</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Upcoming Events</h3>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-muted-foreground">
                {event.date.toLocaleDateString()}
              </div>
              {event.description && (
                <div className="text-sm mt-1">{event.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

