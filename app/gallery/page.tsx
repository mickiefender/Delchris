'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<any>(null)

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
    {
      id: '6',
      title: 'Team Collaboration',
      description: 'Our dedicated team working towards excellence',
      image_url: '/products-showcase.jpg',
      category: 'Team',
    },
  ]

  useEffect(() => {
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
              Visual Stories
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Delchris Africa Gallery
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Explore our journey through high-quality visuals showcasing our operations, community impact, and premium products.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Gallery Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-xs font-semibold text-primary/80 mb-1">{image.category}</p>
                        <h3 className="text-lg font-bold">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-xl"
            />

            {/* Image Details */}
            <div className="mt-6 text-white">
              <p className="text-sm font-semibold text-primary/80 mb-2">{selectedImage.category}</p>
              <h2 className="text-3xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-300 text-lg">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
