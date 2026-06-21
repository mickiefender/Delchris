import { Navigation } from '@/components/Navigation'
import { GetInvolved } from '@/components/GetInvolved'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function GetInvolvedPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Get Involved"
          subtitle="Join us through volunteering, partnerships, and programs that empower communities and drive sustainable transformation."
          backgroundImage="/hero-agribusiness.jpg"
        />
        <GetInvolved />
      </div>
      <Footer />
    </main>
  )
}
