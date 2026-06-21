import { Navigation } from '@/components/Navigation'
import { Testimonials } from '@/components/Testimonials'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function TestimonialsPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Testimonials"
          subtitle="Hear from clients and partners who have experienced the value, professionalism, and impact of working with Delchris Africa."
          backgroundImage="/mushroom.jpg"
        />
        <Testimonials />
      </div>
      <Footer />
    </main>
  )
}
