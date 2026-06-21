import { Navigation } from '@/components/Navigation'
import { HowItWorks } from '@/components/HowItWorks'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Our Model"
          subtitle="Discover our step-by-step approach to delivering impactful, reliable, and scalable solutions for communities and businesses."
          backgroundImage="/Frm-picture.jpg"
        />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  )
}
