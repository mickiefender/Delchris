'use client'

import { ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export function CTABanner() {
  const [counts, setCounts] = useState({
    centers: 0,
    lines: 0,
    lives: 0,
    women: 0,
  })
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const targets = {
      centers: 3,
      lines: 5,
      lives: 1000,
      women: 100,
    }

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / steps, 1)

      setCounts({
        centers: Math.floor(targets.centers * progress),
        lines: Math.floor(targets.lines * progress),
        lives: Math.floor(targets.lives * progress),
        women: Math.floor(targets.women * progress),
      })

      if (progress === 1) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [hasStarted])

  return (
    <section ref={sectionRef} className="bg-gradient-to-r from-primary to-primary/80 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              Partner with Delchris Africa for premium quality agribusiness products and sustainable solutions that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-white/90 transition-colors font-semibold group"
              >
                Get In Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <p className="text-white/80 text-sm font-medium">Processing Centers</p>
                <p className="text-3xl font-bold text-white">{counts.centers}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <p className="text-white/80 text-sm font-medium">Product Lines</p>
                <p className="text-3xl font-bold text-white">{counts.lines}+</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <p className="text-white/80 text-sm font-medium">Lives Impacted</p>
                <p className="text-3xl font-bold text-white">{counts.lives}+</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <p className="text-white/80 text-sm font-medium">Women Empowered</p>
                <p className="text-3xl font-bold text-white">{counts.women}+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
