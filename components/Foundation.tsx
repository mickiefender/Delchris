'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Quote, ArrowRight, Loader2 } from 'lucide-react'
import { WorldMapPattern } from './WorldMapPattern'

interface FoundationBlog {
  id: string
  title: string
  description: string | null
  image_url: string
  raised: number
  goal: number
  progress: number
  published: boolean
  created_at: string
}

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
}

// Build gallery images from blogs and events — deduplicated and limited to 6
const galleryFromData = (blogs: FoundationBlog[], events: FoundationEvent[]): string[] => {
  const imageSet = new Set<string>()
  blogs.forEach((b) => { if (b.image_url) imageSet.add(b.image_url) })
  events.forEach((e) => { if (e.image_url) imageSet.add(e.image_url) })
  return Array.from(imageSet).slice(0, 6)
}

const testimonials = [
  {
    name: 'Elizabeth Joe',
    role: 'Volunteer',
    quote:
      'This is the best agency for me and them because they know exactly how to support when needed.',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Esther Howard',
    role: 'Donor',
    quote:
      'This foundation has transformed lives in our district through consistent support and transparency.',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Albert Flores',
    role: 'Partner',
    quote:
      'I trust their work and impact. Every contribution reaches communities that need help most.',
    avatar: '/placeholder-user.jpg',
  },
]


export function Foundation() {
  const [blogs, setBlogs] = useState<FoundationBlog[]>([])
  const [events, setEvents] = useState<FoundationEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, eventsRes] = await Promise.all([
          fetch('/api/foundation-blogs'),
          fetch('/api/foundation-events')
        ])
        const blogsData = await blogsRes.json()
        const eventsData = await eventsRes.json()
        setBlogs((blogsData.data || []).filter((b: FoundationBlog) => b.published))
        setEvents((eventsData.data || []).filter((e: FoundationEvent) => e.published))
      } catch (error) {
        console.error('Failed to fetch foundation data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const scrollToGetInvolved = () => {
    const el = document.getElementById('get-involved')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate to the get-involved page if section not on this page
      window.location.href = '/get-involved'
    }
  }

  return (
    <div className="bg-white text-[#1a1f3d]">
      {/* ===== HERO SECTION with background image ===== */}
      <section className="relative bg-[#0a7f8a] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/foundation.jpg"
            alt="Foundation background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a7f8a]/85 via-[#0a7f8a]/65 to-[#0a7f8a]/85" />
        </div>

        {/* World Map Pattern overlay for texture */}
        <div className="absolute inset-0 text-white/10">
          <WorldMapPattern />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2dd4bf]" />
            Give them a chance.
          </div>

          {/* Headline */}
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] max-w-2xl">
            Give The Child
            <br />
            Of Education.
          </h1>
         
          {/* CTA + Avatars */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              onClick={scrollToGetInvolved}
              className="rounded-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-white px-8 py-3.5 text-sm font-semibold shadow-lg shadow-[#2dd4bf]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#2dd4bf]/40 hover:-translate-y-0.5"
            >
              Join Our Team
            </button>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['/placeholder-user.jpg', '/placeholder-user.jpg', '/placeholder-user.jpg', '/placeholder-user.jpg'].map(
                  (avatar, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src={avatar} alt="avatar" width={36} height={36} className="w-full h-full object-cover" />
                    </div>
                  )
                )}
              </div>
              <span className="text-white/80 text-sm">+200 volunteers</span>
            </div>
          </div>

          {/* Stats row in the hero */}
          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['82', 'Total Causes'],
              ['200,000', 'Total Fund Raised'],
              ['200', 'Happy Volunteers'],
              ['10', 'Years of Impact'],
            ].map(([value, label]) => (
              <div key={label} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-black text-white">{value}</p>
                <p className="text-xs md:text-sm text-white/70 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT BLOCK ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          {/* Image collage */}
          <div className="relative h-[380px] md:h-[460px]">
            {/* Decorative teal blob top-left */}
            <div className="absolute -left-8 -top-6 h-48 w-48 rounded-[40%] bg-[#2dd4bf]/20 blur-2xl" />

            {/* Left rotated segment */}
            <div className="absolute left-0 top-20 h-[230px] w-[140px] -rotate-[25deg] rounded-[70px] overflow-hidden shadow-lg border-[6px] border-white z-10">
              <Image
                src="/foundation-women.jpg"
                alt="Charity work"
                fill
                className="object-cover object-left"
              />
            </div>

            {/* Center main segment */}
            <div className="absolute left-14 top-0 h-[380px] md:h-[440px] w-[240px] md:w-[290px] rounded-[130px] overflow-hidden shadow-xl border-[6px] border-white z-20">
              <Image
                src="/foundation-women.jpg"
                alt="Charity work"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Right rotated segment */}
            <div className="absolute left-[250px] md:left-[310px] top-[140px] h-[230px] w-[140px] rotate-[25deg] rounded-[70px] overflow-hidden shadow-lg border-[6px] border-white z-10">
              <Image
                src="/foundation-women.jpg"
                alt="Charity work"
                fill
                className="object-cover object-right"
              />
            </div>

            {/* Small decorative teal circle */}
            <div className="absolute left-[225px] md:left-[285px] top-[65px] h-16 w-16 rounded-full bg-[#2dd4bf]/30 z-0" />
          </div>

          {/* Content */}
          <div>
            <p className="text-[#0898a2] font-semibold text-sm tracking-wider uppercase">Welcome To Africa Foundation</p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mt-3">
              You're the Hope of Others.
            </h2>
            <div className="w-16 h-1 bg-[#2dd4bf] rounded-full mt-4" />
            <p className="text-[#4f5675] mt-6 leading-relaxed">
              While we have made significant strides in our mission, there is still much work to be done. We invite you to join us in making a difference in the lives of those who need it most.
            </p>
            <p className="text-[#4f5675] mt-4 leading-relaxed">
              Together, we can create a brighter future for our communities and empower individuals to reach their full potential. Your support, whether through volunteering, donating, or spreading awareness, is invaluable in helping us continue our work and expand our impact.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button className="rounded-full bg-[#0898a2] hover:bg-[#067a83] text-white px-8 py-3.5 text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <a href="/contact">Discover More</a>
              </button>
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-[#2dd4bf]/15 text-[#0898a2] flex items-center justify-center">
                  <Phone size={18} />
                </span>
               <a href="tel:+233 20 898 3545"><span className="font-bold text-lg">(233) 20 898 3545</span></a> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAUSES SECTION (Blogs) ===== */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[#0898a2] font-semibold text-sm tracking-wider uppercase">Favorite Cause</p>
            <h3 className="text-4xl md:text-5xl font-extrabold mt-2">Find the popular cause</h3>
            <div className="w-16 h-1 bg-[#2dd4bf] rounded-full mx-auto mt-4" />
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#0898a2]" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 text-[#5e6685]">
              <p>No causes published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog) => {
                const progressPercent = blog.goal > 0
                  ? Math.round((blog.raised / blog.goal) * 100)
                  : blog.progress
                return (
                  <article
                    key={blog.id}
                    className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold leading-snug">{blog.title}</h4>
                      {blog.description && (
                        <p className="text-sm text-[#5e6685] mt-2 line-clamp-2">{blog.description}</p>
                      )}
                      <Link href={`/foundation/blog/${blog.id}`}>
                        <div className="mt-6">
                          <div className="h-2 rounded-full bg-[#e2e8f0]">
                            <div
                              className="h-full rounded-full bg-[#0898a2] transition-all duration-500"
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            />
                          </div>
                          <div className="mt-2 flex justify-between text-sm text-[#5e6685]">
                            <span>Raised <strong className="text-[#1a1f3d]">₵{blog.raised?.toLocaleString()}</strong></span>
                            <span>Goal <strong className="text-[#1a1f3d]">₵{blog.goal?.toLocaleString()}</strong></span>
                          </div>
                        </div>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0898a2] group/btn">
                          Read More <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== IMAGE GALLERY STRIP ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleryFromData(blogs, events).length === 0 ? (
            <div className="text-center py-8 text-[#5e6685]">
              <p>No gallery images available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {galleryFromData(blogs, events).map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  className="relative h-28 md:h-32 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Image src={img} alt="Gallery" fill className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[#0898a2] font-semibold text-sm tracking-wider uppercase">Testimonials</p>
            <h3 className="text-4xl md:text-5xl font-extrabold mt-2">What People Say</h3>
            <div className="w-16 h-1 bg-[#2dd4bf] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="w-12 h-12 rounded-full bg-[#0898a2] text-white inline-flex items-center justify-center shadow-md">
                  <Quote size={20} />
                </span>
                <p className="text-[#545c7a] mt-5 leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4 pt-5 border-t border-[#e2e8f0]">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover ring-2 ring-[#0898a2]/20"
                  />
                  <div>
                    <p className="font-bold text-[#1a1f3d]">{item.name}</p>
                    <p className="text-sm text-[#6b7290]">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[#0898a2] font-semibold text-sm tracking-wider uppercase">Latest Event Donate</p>
            <h3 className="text-4xl md:text-5xl font-extrabold mt-2">Join Our Upcoming Events</h3>
            <div className="w-16 h-1 bg-[#2dd4bf] rounded-full mx-auto mt-4" />
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#0898a2]" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-[#5e6685]">
              <p>No events published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event) => (
                <article
                  key={event.id}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Image src={event.image_url} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Date badge */}
                  <div className="absolute top-5 left-5 bg-[#0898a2] text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center leading-none shadow-lg">
                    <span className="text-xl font-bold">{event.event_day}</span>
                    <span className="text-xs mt-0.5">{event.event_month}</span>
                  </div>
                  {/* Event title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-white text-xl font-bold">{event.title}</h4>
                    {event.description && (
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">{event.description}</p>
                    )}
                    <button className="mt-2 text-[#2dd4bf] text-sm font-semibold inline-flex items-center gap-1 group/btn">
                      Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
