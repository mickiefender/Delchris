'use client'

import { Leaf, Fish, Wheat, Droplet } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function Services() {
  const services = [
    {
      icon: Wheat,
      title: 'Rice Processing',
      description: 'State-of-the-art rice milling at 15 tons/hour capacity. Offering parboiled, precooked, and seasoned rice mixes with eco-friendly packaging.',
      features: ['Parboiled Rice', 'Precooked Rice', 'Rice Mixes', 'International Standards'],
      location: 'Hohoe',
    },
    {
      icon: Leaf,
      title: 'Mushroom & Seafood Processing',
      description: 'Premium "Made-in-Ghana" processed mushrooms and seafood with authentic African spices. 500kg/hour processing capacity.',
      features: ['Dried Mushrooms', 'Canned Mushrooms', 'Shellfish Processing', 'Export Quality'],
      location: 'Adenta',
    },
    {
      icon: Droplet,
      title: 'Cassava Products',
      description: 'Value-added cassava processing including Gari, cassava flour, starch, and premium snacks. Supporting nutrition and food security.',
      features: ['Cassava Flour', 'Gari Processing', 'Cassava Shortbread', 'Cassava Starch'],
      location: 'Hohoe',
    },
    {
      icon: Fish,
      title: 'Specialized Food Products',
      description: 'Innovative cereal bars, corn flour, and health-focused snacks made from locally sourced ingredients.',
      features: ['Cereal Bars', 'Corn Flour', 'Health Snacks', 'Natural Ingredients'],
      location: 'Multiple Centers',
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Processing Excellence
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Multiple processing centers equipped with modern technology delivering premium quality products for domestic and export markets.
          </p>
        </div>

        {/* Services Grid - Image Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            const images = [
              '/Rice_milling_15_tons_hour_202605090121.jpeg',
              '/Mashroom_processing.jpeg',
              '/products-showcase.jpg',
              '/products-showcase.jpg',
            ]
            return (
              <div
                key={index}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={images[index]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full">
                      {service.location}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Icon className="text-primary" size={28} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div>
                    <p className="text-xs font-semibold text-foreground/50 uppercase mb-3">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-sm text-primary bg-primary/5 px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Products Showcase */}
        <div className="mb-16 rounded-xl overflow-hidden shadow-lg h-96">
          <img
            src="/kube toffee.png"
            alt="Premium Delchris food products - packaged rice, canned mushrooms, and cassava products"
            className="w-full h-full object-cover"
          />
        </div>
   {/* Awards Carousel - Scrolling Right to Left */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Awards & Recognition</h3>
            <p className="text-foreground/60">Recognized for excellence, sustainability, and innovation in agribusiness</p>

 </div>

          <AwardsCarousel />
        </div>
      </div>
    </section>
  )
}

function AwardsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const awards = [
    {
      image: '/awards/SMEGA awards1.png',
      title: 'SME Product Innovation Award',
      year: '2024',
    },
    {
      image: '/awards/wofaGrid 1.png',
      title: 'WOFAGRIG-GOLD Lady of the Region Export Award',
      year: '2023',
    },
    {
      image: '/awards/SMEGA awards2.png',
      title: 'SME Product Innovation Award',
      year: '2023',
    },
    {
      image: '/awards/wofaGrid 2.png',
      title: 'WOFAGRIG-GOLD Lady of the Region Export Award',
      year: '2022',
    },
    
  ]

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollPos = 0
    const scrollSpeed = 1

    const scroll = () => {
      scrollPos += scrollSpeed
      
      // Reset to beginning when reaching end for seamless loop
      if (scrollPos >= container.scrollWidth - container.clientWidth) {
        scrollPos = 0
      }
      
      container.scrollLeft = scrollPos
    }

    const interval = setInterval(scroll, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-white rounded-xl p-8 border border-border overflow-hidden group">
      {/* Left Gradient Overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Gradient Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-hidden scrollbar-hide"
      >
        {/* Original awards */}
        {awards.map((award, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 md:w-40 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 shadow-lg mb-3">
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
              {award.title}
            </h4>
            <p className="text-xs text-foreground/50">{award.year}</p>
          </div>
        ))}

        {/* Duplicate awards for seamless loop */}
        {awards.map((award, index) => (
          <div
            key={`duplicate-${index}`}
            className="flex-shrink-0 w-32 md:w-40 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 shadow-lg mb-3">
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
              {award.title}
            </h4>
            <p className="text-xs text-foreground/50">{award.year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}