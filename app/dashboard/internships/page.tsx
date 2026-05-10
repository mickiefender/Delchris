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
  Briefcase,
  Mail,
  GraduationCap,
  Calendar,
  Trash2,
  Eye,
  Loader2,
  MapPin
} from 'lucide-react'

interface Internship {
  id: string
  full_name: string
  email: string
  phone?: string
  institution: string
  field_of_study: string
  year_of_study: string
  duration: string
  covered: boolean
  created_at: string
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null)

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch('/api/internships')
        const data = await res.json()
        setInternships(data.data || [])
      } catch (error) {
        console.error('Failed to fetch internships:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  const filteredInternships = internships.filter((intern) =>
    intern.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.field_of_study?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const res = await fetch(`/api/internships?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setInternships(internships.filter((i) => i.id !== id))
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
          <p className="text-slate-600">Loading Internships...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Internship Applications</h1>
          <p className="text-slate-500 mt-1">Manage student internship program applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {internships.length} total
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, institution, or field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Internships List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            All Applications
          </CardTitle>
          <CardDescription>
            {filteredInternships.length} application{filteredInternships.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInternships.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No internships found</p>
              {searchTerm && (
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search</p>
              )}
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {filteredInternships.map((intern) => (
                  <div
                    key={intern.id}
                    className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{intern.full_name}</h3>
                          {intern.covered && (
                            <Badge className="bg-emerald-100 text-emerald-700">Covered</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {intern.email}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            {intern.institution}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {intern.field_of_study}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {intern.year_of_study} - {intern.duration}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-slate-500 text-right">
                          {formatDate(intern.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedInternship(intern)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                  Full application from {intern.full_name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Full Name</label>
                                  <p className="text-slate-900">{intern.full_name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Email</label>
                                  <p className="text-slate-900">{intern.email}</p>
                                </div>
                                {intern.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-slate-500">Phone</label>
                                    <p className="text-slate-900">{intern.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Institution</label>
                                  <p className="text-slate-900">{intern.institution}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Field of Study</label>
                                  <p className="text-slate-900">{intern.field_of_study}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Year of Study</label>
                                  <p className="text-slate-900">{intern.year_of_study}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Duration</label>
                                  <p className="text-slate-900">{intern.duration}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Funding Status</label>
                                  <p className="text-slate-900">{intern.covered ? 'Covered by organization' : 'Needs funding'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Applied</label>
                                  <p className="text-slate-900">{formatDate(intern.created_at)}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(intern.id)}
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
