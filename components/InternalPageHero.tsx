interface InternalPageHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
}

export function InternalPageHero({ title, subtitle, backgroundImage }: InternalPageHeroProps) {
  return (
    <section
      className="relative h-[48vh] min-h-[320px] w-full overflow-hidden flex items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-slate-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl py-16">
          <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs sm:text-sm tracking-[0.14em] uppercase text-blue-100 backdrop-blur-md mb-6">
            Delchris Africa
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
            {title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-100/95 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
