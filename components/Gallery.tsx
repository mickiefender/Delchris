'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Sample gallery images
  const sampleImages = [
    {
      id: '1',
      title: 'Rice Processing Facility',
      description: 'Modern rice milling operations at our Hohoe center',
      image_url: '/products-showcase.jpg',
      category: 'Operations',
    },
    {
      id: '2',
      title: 'Women Empowerment',
      description: 'Training and development programs for women entrepreneurs',
      image_url: '/foundation-women.jpg',
      category: 'Community',
    },
    {
      id: '3',
      title: 'Premium Products',
      description: 'Our complete range of quality food products',
      image_url: '/products-showcase.jpg',
      category: 'Products',
    },
    {
      id: '4',
      title: 'Sustainable Farming',
      description: 'Organic farming practices and crop diversity',
      image_url: '/hero-agribusiness.jpg',
      category: 'Agriculture',
    },
    {
      id: '5',
      title: 'Community Impact',
      description: 'Creating livelihoods and sustainable futures',
      image_url: '/foundation-women.jpg',
      category: 'Impact',
    },
  ]

  useEffect(() => {
    // Fetch images from Supabase
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        setImages(data.data?.length > 0 ? data.data : sampleImages)
      } catch (error) {
        console.error('Failed to fetch gallery images:', error)
        setImages(sampleImages)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  useEffect(() => {
    if (images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <section id="gallery" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
              Gallery
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Loading...
            </h2>
          </div>
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            Visual Journey
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Gallery
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Explore our operations, community impact, and quality products through stunning visuals.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-8 rounded-2xl overflow-hidden h-96 md:h-[700px] group cursor-pointer">
          <Link href="/gallery" className="block h-full">
            <img
              src={currentImage.image_url}
              alt={currentImage.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-sm font-semibold text-primary/80 mb-2">{currentImage.category}</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentImage.title}</h3>
              <p className="text-white/90 max-w-xl">{currentImage.description}</p>
            </div>
          </Link>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-2 rounded-full shadow-lg transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-2 rounded-full shadow-lg transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                currentIndex === index
                  ? 'bg-primary w-3 h-3'
                  : 'bg-border hover:bg-primary/50 w-2 h-2'
              }`}
            />
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
