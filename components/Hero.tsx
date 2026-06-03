'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'

export function Hero() {
  useEffect(() => {
    // Trigger animations on load with staggered timing
    const timer1 = setTimeout(() => {
      document.getElementById('hero-subtitle')?.classList.add('visible')
    }, 200)
    const timer2 = setTimeout(() => {
      document.getElementById('hero-cta')?.classList.add('visible')
    }, 600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative py-32 md:py-48 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/Hero-img.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="max-w-2xl space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in"
              style={{ animationDelay: '0s' }}
            >
              Premium Agribusiness Solutions for a{' '}
              <span className="text-primary">Sustainable Future</span>
            </h1>
          </div>

          {/* Subtitle with stagger */}
          <p 
            id="hero-subtitle"
            className="text-xl text-white/80 max-w-lg scroll-reveal-left"
          >
            Delchris Africa Limited - Empowering communities through sustainable agriculture, 
            premium food processing, and women-led enterprise since 2017.
          </p>

          {/* CTA Buttons with stagger */}
          <div 
            id="hero-cta"
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Explore Services
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-white/90 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
