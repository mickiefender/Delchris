import { Navigation } from '@/components/Navigation'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function WhyChooseUsPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Why Choose Us"
          subtitle="See what sets Delchris Africa apart through trusted expertise, innovation, and a commitment to measurable outcomes."
          backgroundImage="/Rice_milling_15_tons_hour_202605090121.jpeg"
        />
        <WhyChooseUs />
      </div>
      <Footer />
    </main>
  )
}
