'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import {
  Home,
  MessageSquare,
  Briefcase,
  Users,
  Heart,
  ImageIcon,
  Menu,
  LogOut,
  User,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BookOpen,
  Calendar,
  Loader2
} from 'lucide-react'

// Navigation items
const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/contacts', label: 'Contact Submissions', icon: MessageSquare },
  { href: '/dashboard/internships', label: 'Internship Applications', icon: Briefcase },
  { href: '/dashboard/partnerships', label: 'Partnership Requests', icon: Users },
  { href: '/dashboard/volunteering', label: 'Volunteering', icon: Heart },
  { href: '/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
  // Foundation content management
  { href: '/dashboard/foundation-blogs', label: 'Foundation Blogs', icon: BookOpen },
  { href: '/dashboard/foundation-events', label: 'Foundation Events', icon: Calendar }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    contacts: 0,
    internships: 0,
    partnerships: 0,
    volunteering: 0,
    gallery: 0
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check auth and fetch stats
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        
        if (!authUser) {
          router.push('/login')
          return
        }

        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admins')
          .select('id, role, is_active')
          .eq('id', authUser.id)
          .eq('is_active', true)
          .single()

        if (!adminData) {
          router.push('/login')
          return
        }

        setUser(authUser)

        // Fetch stats
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

        setStats({
          contacts: contactData.data?.length || 0,
          internships: internData.data?.length || 0,
          partnerships: partnersData.data?.length || 0,
          volunteering: volunteerData.data?.length || 0,
          gallery: galleryData.data?.length || 0
        })
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Get unread counts (using total for now)
  const getNotificationCount = () => {
    return stats.contacts + stats.internships + stats.partnerships + stats.volunteering
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

// Sidebar content component for both desktop and mobile
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative w-15 h-10">
            <Image
              src="/logo.png"
              alt="Delchris Africa Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-sm">Delchris</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname?.startsWith(item.href))
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
                {item.href === '/dashboard/contacts' && stats.contacts > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary text-xs">
                    {stats.contacts}
                  </Badge>
                )}
                {item.href === '/dashboard/internships' && stats.internships > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-emerald-500/10 text-emerald-600 text-xs">
                    {stats.internships}
                  </Badge>
                )}
                {item.href === '/dashboard/partnerships' && stats.partnerships > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-amber-500/10 text-amber-600 text-xs">
                    {stats.partnerships}
                  </Badge>
                )}
                {item.href === '/dashboard/volunteering' && stats.volunteering > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-violet-500/10 text-violet-600 text-xs">
                    {stats.volunteering}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation Bar - Desktop */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

{/* Desktop sidebar trigger - shows icon only sidebar */}
            <div className="hidden lg:block w-64">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src="/placeholder-logo.png"
                    alt="Delchris Africa Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-sm">Delchris Dashboard</h1>
                  <p className="text-xs text-slate-500">Admin Panel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="w-64 pl-10 bg-slate-50 border-none focus:bg-white transition-colors"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {getNotificationCount() > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {getNotificationCount() > 9 ? '9+' : getNotificationCount()}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">Contact Submissions</span>
                  <span className="text-sm text-slate-500">{stats.contacts} new messages</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">Internship Applications</span>
                  <span className="text-sm text-slate-500">{stats.internships} new applications</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">Partnership Requests</span>
                  <span className="text-sm text-slate-500">{stats.partnerships} new requests</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">Volunteering Applications</span>
                  <span className="text-sm text-slate-500">{stats.volunteering} new applications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>Administrator</span>
                    <span className="text-xs font-normal text-slate-500">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-40">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
