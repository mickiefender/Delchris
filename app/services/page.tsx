import { Navigation } from '@/components/Navigation'
import { Services } from '@/components/Services'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Our Services"
          subtitle="Explore tailored solutions designed to support sustainable growth, operational excellence, and long-term success for your business."
          backgroundImage="/Mashroom_processing.jpeg"
        />
        <Services />
      </div>
      <Footer />
    </main>
  )
}
