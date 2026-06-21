'use client'

import { useEffect, useState } from 'react'

export function Hero() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const updateViewport = () => setIsDesktop(window.innerWidth >= 768)
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full py-32 md:py-48 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // Mobile browsers often do not render fixed backgrounds reliably.
        backgroundAttachment: isDesktop ? 'fixed' : 'scroll',
      }}
    >
      {/* Minimal overlay for image clarity */}
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  )
}
