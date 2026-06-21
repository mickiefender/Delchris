import { Navigation } from '@/components/Navigation'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="About Delchris Africa"
          subtitle="Learn more about our mission, values, and the impact we are creating through innovation, agribusiness, and community development."
          backgroundImage="/stylish-logo.jpg"
        />
        <About />
      </div>
      <Footer />
    </main>
  )
}
