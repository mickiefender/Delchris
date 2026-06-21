'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Loader2, Calendar, TrendingUp, Target } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

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
  updated_at: string
}

export default function FoundationBlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState<FoundationBlog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/foundation-blogs?id=${params.id}`)
        const data = await res.json()
        if (data.data) {
          setBlog(data.data)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [params.id])

  const progressPercent = blog?.goal && blog.goal > 0
    ? Math.round((blog.raised / blog.goal) * 100)
    : blog?.progress || 0

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-[#0898a2] animate-spin mx-auto mb-4" />
              <p className="text-[#5e6685]">Loading cause...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">😔</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1f3d] mb-2">Cause Not Found</h2>
              <p className="text-[#5e6685] mb-8">{error}</p>
              <Link
                href="/foundation"
                className="inline-flex items-center gap-2 rounded-full bg-[#0898a2] hover:bg-[#067a83] text-white px-8 py-3.5 text-sm font-semibold shadow-md transition-all duration-300"
              >
                <ArrowLeft size={16} />
                Back to Foundation
              </Link>
            </div>
          </div>
        )}

        {/* Blog Detail */}
        {blog && !loading && (
          <article>
            {/* Hero Image Section */}
            <section className="relative h-[50vh] md:h-[60vh] min-h-[320px]">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Back Button */}
              <div className="absolute top-6 left-4 sm:left-8 z-10">
                <Link
                  href="/foundation"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 text-white text-sm font-semibold hover:bg-white/30 transition-all"
                >
                  <ArrowLeft size={16} />
                  Back to Causes
                </Link>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-sm mb-4">
                    <Calendar size={14} />
                    {formatDate(blog.created_at)}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    {blog.title}
                  </h1>
                </div>
              </div>
            </section>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              {/* Progress Bar & Stats */}
              <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#0898a2]/10 flex items-center justify-center">
                      <TrendingUp className="text-[#0898a2]" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-[#5e6685]">Progress</p>
                      <p className="text-2xl font-bold text-[#1a1f3d]">{progressPercent}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <p className="text-sm text-[#5e6685]">Raised</p>
                      <p className="text-xl font-bold text-[#1a1f3d]">₵{blog.raised?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5e6685]">Goal</p>
                      <p className="text-xl font-bold text-[#1a1f3d]">₵{blog.goal?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 rounded-full bg-[#e2e8f0] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0898a2] to-[#2dd4bf] transition-all duration-1000"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-[#5e6685]">
                  <span>₵{blog.raised?.toLocaleString()} raised</span>
                  <span>₵{blog.goal?.toLocaleString()} goal</span>
                </div>
              </div>

              {/* Description */}
              {blog.description && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-[#1a1f3d] mb-4">About This Cause</h2>
                  <p className="text-[#4f5675] leading-relaxed whitespace-pre-line">
                    {blog.description}
                  </p>
                </div>
              )}

              {/* Additional Info Cards */}
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="text-[#0898a2]" size={20} />
                    <h3 className="font-semibold text-[#1a1f3d]">Our Goal</h3>
                  </div>
                  <p className="text-sm text-[#5e6685]">
                    We are committed to reaching our target of ₵{blog.goal?.toLocaleString()} to make a meaningful impact in the community.
                  </p>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#e2e8f0]">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="text-[#0898a2]" size={20} />
                    <h3 className="font-semibold text-[#1a1f3d]">Published</h3>
                  </div>
                  <p className="text-sm text-[#5e6685]">
                    This cause was published on {formatDate(blog.created_at)}. Help us reach the goal by contributing today.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 text-center p-8 bg-gradient-to-br from-[#0898a2] to-[#067a83] rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Support This Cause</h3>
                <p className="text-white/80 mb-6">
                  Your contribution can make a real difference. Join us in making an impact.
                </p>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/90 text-[#0898a2] px-8 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Involved
                </Link>
              </div>
            </section>
          </article>
        )}
      </div>
      <Footer />
    </main>
  )
}
