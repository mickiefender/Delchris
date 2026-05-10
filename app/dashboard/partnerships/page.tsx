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
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  Trash2,
  Eye,
  Loader2,
  Handshake
} from 'lucide-react'

interface Partnership {
  id: string
  company_name: string
  contact_person: string
  email: string
  phone?: string
  partnership_type: string
  description: string
  created_at: string
}

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null)

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const res = await fetch('/api/partnerships')
        const data = await res.json()
        setPartnerships(data.data || [])
      } catch (error) {
        console.error('Failed to fetch partnerships:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartnerships()
  }, [])

  const filteredPartnerships = partnerships.filter((partnership) =>
    partnership.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.partnership_type?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partnership request?')) return

    try {
      const res = await fetch(`/api/partnerships?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPartnerships(partnerships.filter((p) => p.id !== id))
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
          <p className="text-slate-600">Loading Partnerships...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Partnership Requests</h1>
          <p className="text-slate-500 mt-1">Manage business partnership inquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {partnerships.length} total
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by company, contact, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Partnerships List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="w-5 h-5" />
            All Requests
          </CardTitle>
          <CardDescription>
            {filteredPartnerships.length} request{filteredPartnerships.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPartnerships.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No partnerships found</p>
              {searchTerm && (
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search</p>
              )}
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {filteredPartnerships.map((partnership) => (
                  <div
                    key={partnership.id}
                    className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{partnership.company_name}</h3>
                          <Badge className="bg-amber-100 text-amber-700">
                            {partnership.partnership_type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {partnership.email}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          <span className="font-medium">Contact: </span>
                          {partnership.contact_person}
                        </div>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{partnership.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-slate-500 text-right">
                          {formatDate(partnership.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedPartnership(partnership)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Partnership Details</DialogTitle>
                                <DialogDescription>
                                  Request from {partnership.company_name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Company</label>
                                  <p className="text-slate-900">{partnership.company_name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Contact Person</label>
                                  <p className="text-slate-900">{partnership.contact_person}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Email</label>
                                  <p className="text-slate-900">{partnership.email}</p>
                                </div>
                                {partnership.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-slate-500">Phone</label>
                                    <p className="text-slate-900">{partnership.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Partnership Type</label>
                                  <p className="text-slate-900">{partnership.partnership_type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Description</label>
                                  <p className="text-slate-900 whitespace-pre-wrap">{partnership.description}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Submitted</label>
                                  <p className="text-slate-900">{formatDate(partnership.created_at)}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(partnership.id)}
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
