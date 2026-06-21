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
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contacts')
        const data = await res.json()
        setContacts(data.data || [])
      } catch (error) {
        console.error('Failed to fetch contacts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts(contacts.filter((c) => c.id !== id))
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
          <p className="text-slate-600">Loading contacts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Contact Submissions</h1>
          <p className="text-slate-500 mt-1">Manage messages from website visitors</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {contacts.length} total
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            All Contacts
          </CardTitle>
          <CardDescription>
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No contacts found</p>
              {searchTerm && (
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search</p>
              )}
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </span>
                          {contact.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {contact.phone}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium text-slate-700">Subject: </span>
                          <span className="text-slate-600">{contact.subject}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{contact.message}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-slate-500 text-right">
                          {formatDate(contact.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Contact Details</DialogTitle>
                                <DialogDescription>
                                  Full message from {contact.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Name</label>
                                  <p className="text-slate-900">{contact.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Email</label>
                                  <p className="text-slate-900">{contact.email}</p>
                                </div>
                                {contact.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-slate-500">Phone</label>
                                    <p className="text-slate-900">{contact.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Subject</label>
                                  <p className="text-slate-900">{contact.subject}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Message</label>
                                  <p className="text-slate-900 whitespace-pre-wrap">{contact.message}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-500">Submitted</label>
                                  <p className="text-slate-900">{formatDate(contact.created_at)}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(contact.id)}
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
