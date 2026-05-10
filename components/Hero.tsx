'use client'

import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="home"
      className="relative py-32 md:py-48 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero-img.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="max-w-2xl animate-fade-in space-y-8">
          <div className="space-y-4">
            <p className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase">
              Welcome to Delchris Africa
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Premium Agribusiness Solutions for a{' '}
              <span className="text-primary">Sustainable Future</span>
            </h1>
          </div>

          

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold flex items-center justify-center gap-2 group shadow-lg">
              Explore Services
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-white/90 transition-colors font-semibold shadow-lg">
              Learn More
            </button>
          </div>

          
          
        </div>
      </div>
    </section>
  )
}
