'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search,
  Heart,
  Mail,
  Calendar,
  Clock,
  Trash2,
  Eye,
  Loader2,
  User
} from 'lucide-react'

interface Volunteering {
  id: string
  full_name: string
  email: string
  phone?: string
  skills: string
  availability: string
  motivation: string
  created_at: string
}

export default function VolunteeringPage() {
  const [volunteering, setVolunteering] = useState<Volunteering[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVol, setSelectedVol] = useState<Volunteering | null>(null)

  useEffect(() => {
    const fetchVolunteering = async () => {
      try {
        const res = await fetch('/api/volunteering')
        const data = await res.json()
        setVolunteering(data.data || [])
      } catch (error) {
        console.error('Failed to fetch volunteering:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVolunteering()
  }, [])

  const filteredVolunteering = volunteering.filter((vol) =>
    vol.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vol.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vol.skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vol.availability?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const res = await fetch(`/api/volunteering?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setVolunteering(volunteering.filter((v) => v.id !== id))
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading Volunteering...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Volunteering Applications</h1>
          <p className="text-slate-500 mt-1">Manage community volunteering program applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {volunteering.length} total
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, skills, or availability..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Volunteering List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            All Applications
          </CardTitle>
          <CardDescription>
            {filteredVolunteering.length} application{filteredVolunteering.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredVolunteering.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No volunteering found</p>
              {searchTerm && (
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search</p>
              )}
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {filteredVolunteering.map((vol) => (
                  <div
                    key={vol.id}
                    className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{vol.full_name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {vol.email}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {vol.skills}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {vol.availability}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{vol.motivation}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-slate-500 text-right">
                          {formatDate(vol.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedVol(vol)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Volunteering Details</DialogTitle>
                                <DialogDescription>
                                  Application from {vol.full_name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Full Name</label>
                                  <p className="text-slate-900">{vol.full_name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Email</label>
                                  <p className="text-slate-900">{vol.email}</p>
                                </div>
                                {vol.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-slate-500">Phone</label>
                                    <p className="text-slate-900">{vol.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Skills</label>
                                  <p className="text-slate-900">{vol.skills}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Availability</label>
                                  <p className="text-slate-900">{vol.availability}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Motivation</label>
                                  <p className="text-slate-900 whitespace-pre-wrap">{vol.motivation}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Applied</label>
                                  <p className="text-slate-900">{formatDate(vol.created_at)}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(vol.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
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
