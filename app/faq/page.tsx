import { Navigation } from '@/components/Navigation'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function FAQPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Frequently Asked Questions"
          subtitle="Find clear answers to common questions about our services, programs, and how to engage with Delchris Africa."
          backgroundImage="/clams olive oil.jpg"
        />
        <FAQ />
      </div>
      <Footer />
    </main>
  )
}
