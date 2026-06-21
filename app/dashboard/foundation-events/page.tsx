'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Calendar,
  Plus,
  Trash2,
  Loader2,
  Search,
  X,
  CalendarDays,
  MapPin
} from 'lucide-react'

interface FoundationEvent {
  id: string
  title: string
  description: string | null
  image_url: string
  event_day: string
  event_month: string
  event_date: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export default function FoundationEventsPage() {
  const [events, setEvents] = useState<FoundationEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadPreview, setUploadPreview] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    event_day: '',
    event_month: '',
    event_date: '',
    published: true,
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/foundation-events')
      const data = await res.json()
      setEvents(data.data || [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_month?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setUploadPreview(dataUrl)
      setFormData({ ...formData, image_url: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.image_url || !formData.event_day || !formData.event_month) {
      alert('Please fill in title, image, event day, and event month')
      return
    }

    try {
      const res = await fetch('/api/foundation-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          image_url: formData.image_url,
          event_day: formData.event_day,
          event_month: formData.event_month,
          event_date: formData.event_date || null,
          published: formData.published,
        }),
      })

      if (res.ok) {
        const result = await res.json()
        setEvents([result.data[0], ...events])
        setFormData({ title: '', description: '', image_url: '', event_day: '', event_month: '', event_date: '', published: true })
        setUploadPreview('')
        alert('Event created successfully!')
      } else {
        alert('Failed to create event')
      }
    } catch (error) {
      console.error('Create error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const res = await fetch(`/api/foundation-events?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setEvents(events.filter((e) => e.id !== id))
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const togglePublished = async (event: FoundationEvent) => {
    try {
      const res = await fetch('/api/foundation-events', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: event.id, published: !event.published }),
      })
      if (res.ok) {
        setEvents(events.map((e) => (e.id === event.id ? { ...e, published: !e.published } : e)))
      }
    } catch (error) {
      console.error('Toggle error:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading foundation events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Foundation Events</h1>
          <p className="text-slate-500 mt-1">Manage "Latest Events" for the foundation page</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {events.length} events
          </Badge>
        </div>
      </div>

      {/* Create New Event */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Event
          </CardTitle>
          <CardDescription>Add a new event to the foundation page</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  required
                  placeholder="e.g., Education for All"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Month *</label>
                <select
                  required
                  value={formData.event_month}
                  onChange={(e) => setFormData({ ...formData, event_month: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Day *</label>
                <Input
                  required
                  placeholder="e.g., 23"
                  value={formData.event_day}
                  onChange={(e) => setFormData({ ...formData, event_day: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Full Date (optional)</label>
                <Input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input
                placeholder="Brief description of the event..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image *</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
            </div>

            {uploadPreview && (
              <div className="relative h-40 rounded-lg overflow-hidden border">
                <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setUploadPreview(''); setFormData({ ...formData, image_url: '' }) }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <Button type="submit" className="w-full">
              <CalendarDays className="w-4 h-4 mr-2" />
              Publish Event
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            All Events
          </CardTitle>
          <CardDescription>
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No events yet</p>
              <p className="text-sm text-slate-400 mt-1">Create your first foundation event above</p>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Date badge */}
                      <div className="w-16 h-16 rounded-xl bg-[#0898a2] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-xl font-bold leading-none">{event.event_day}</span>
                        <span className="text-xs mt-0.5">{event.event_month}</span>
                      </div>
                      {/* Image thumbnail */}
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm text-slate-600 mt-0.5 line-clamp-1">{event.description}</p>
                            )}
                          </div>
                          <Badge
                            variant={event.published ? 'default' : 'secondary'}
                            className="cursor-pointer"
                            onClick={() => togglePublished(event)}
                          >
                            {event.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                          <span>Created: {formatDate(event.created_at)}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
