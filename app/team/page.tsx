import { Navigation } from '@/components/Navigation'
import { Team } from '@/components/Team'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function TeamPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Meet Our Team"
          subtitle="Our dedicated professionals bring deep expertise, passion, and collaboration to deliver meaningful impact across every project."
          backgroundImage="/foundation-women.jpg"
        />
        <Team />
      </div>
      <Footer />
    </main>
  )
}
