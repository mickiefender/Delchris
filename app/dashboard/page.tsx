'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  MessageSquare,
  Briefcase,
  Users,
  Heart,
  Image,
  Clock,
  ArrowRight,
  Plus,
  Eye,
  Loader2
} from 'lucide-react'

interface DashboardStats {
  contacts: number
  internships: number
  partnerships: number
  volunteering: number
  gallery: number
}

interface RecentItem {
  id: string
  name: string
  type: string
  date: string
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    contacts: 0,
    internships: 0,
    partnerships: 0,
    volunteering: 0,
    gallery: 0
  })
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, internRes, partnersRes, volunteerRes, galleryRes] = await Promise.all([
          fetch('/api/contacts'),
          fetch('/api/internships'),
          fetch('/api/partnerships'),
          fetch('/api/volunteering'),
          fetch('/api/gallery')
        ])

        const contactData = await contactsRes.json()
        const internData = await internRes.json()
        const partnersData = await partnersRes.json()
        const volunteerData = await volunteerRes.json()
        const galleryData = await galleryRes.json()

        const contacts = contactData.data || []
        const internships = internData.data || []
        const partnerships = partnersData.data || []
        const volunteering = volunteerData.data || []
        const gallery = galleryData.data || []

        // Get recent items (last 5 from each category)
        const allRecent: RecentItem[] = [
          ...contacts.slice(0, 3).map((c: any) => ({ id: c.id, name: c.name || c.full_name, type: 'Contact', date: c.created_at })),
          ...internships.slice(0, 3).map((i: any) => ({ id: i.id, name: i.full_name, type: 'Internship', date: i.created_at })),
          ...partnerships.slice(0, 3).map((p: any) => ({ id: p.id, name: p.company_name, type: 'Partnership', date: p.created_at })),
          ...volunteering.slice(0, 3).map((v: any) => ({ id: v.id, name: v.full_name, type: 'Volunteering', date: v.created_at }))
        ]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 8)

        setStats({
          contacts: contacts.length,
          internships: internships.length,
          partnerships: partnerships.length,
          volunteering: volunteering.length,
          gallery: gallery.length
        })
        setRecentItems(allRecent)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Contact': return 'bg-blue-100 text-blue-700'
      case 'Internship': return 'bg-emerald-100 text-emerald-700'
      case 'Partnership': return 'bg-amber-100 text-amber-700'
      case 'Volunteering': return 'bg-violet-100 text-violet-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const statCards = [
    {
      title: 'Contact Submissions',
      count: stats.contacts,
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      href: '/dashboard/contacts',
      description: 'Messages from website visitors'
    },
    {
      title: 'Internship Applications',
      count: stats.internships,
      icon: Briefcase,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      href: '/dashboard/internships',
      description: 'Student internship requests'
    },
    {
      title: 'Partnership Requests',
      count: stats.partnerships,
      icon: Users,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      href: '/dashboard/partnerships',
      description: 'Business partnership inquiries'
    },
    {
      title: 'Volunteering',
      count: stats.volunteering,
      icon: Heart,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      iconColor: 'text-violet-500',
      href: '/dashboard/volunteering',
      description: 'Volunteer applications'
    },
{
      title: 'Gallery Images',
      count: stats.gallery,
      icon: Image,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-500',
      href: '/dashboard/gallery',
      description: 'Website gallery photos'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome back!</h1>
          <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your dashboard today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/gallery">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Image
            </Button>
          </Link>
        </div>
      </div>

{/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Link key={index} href={card.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-none hover:bg-slate-50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-xl ${card.bgColor}`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-slate-900">{card.count}</p>
                    <p className="text-sm font-medium text-slate-600 mt-1">{card.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative  tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/contacts" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 h-11">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                View Contacts
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            <Link href="/dashboard/internships" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 h-11">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                View Internships
              </Button>
            </Link>
            <Link href="/dashboard/partnerships" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 h-11">
                <Users className="w-5 h-5 text-amber-500" />
                View Partnerships
              </Button>
            </Link>
            <Link href="/dashboard/volunteering" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 h-11">
                <Heart className="w-5 h-5 text-violet-500" />
                View Volunteering
              </Button>
            </Link>
            <Link href="/dashboard/gallery" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 h-11">
<Image className="w-5 h-5 text-slate-500" />
                Manage Gallery
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest submissions and applications</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {recentItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">No recent activity</p>
                <p className="text-sm text-slate-400 mt-1">Submissions will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-sm text-slate-500">{formatDate(item.date)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Contact Submissions
            </CardTitle>
            <CardDescription>Manage messages from website visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              {stats.contacts} contact form submission{stats.contacts !== 1 ? 's' : ''} waiting for review.
            </p>
            <Link href="/dashboard/contacts">
              <Button className="w-full">
                View All Contacts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
<Image className="w-5 h-5 text-slate-500" />
              Gallery Management
            </CardTitle>
            <CardDescription>Upload and manage gallery images</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              {stats.gallery} image{stats.gallery !== 1 ? 's' : ''} in your gallery. Keep your content fresh!
            </p>
            <Link href="/dashboard/gallery">
              <Button className="w-full">
                Manage Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
