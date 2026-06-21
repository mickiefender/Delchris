'use client'

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full py-32 md:py-48 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Minimal overlay for image clarity */}
      <div className="absolute inset-0 bg-black/10"></div>

    
    </section>
  )
}
