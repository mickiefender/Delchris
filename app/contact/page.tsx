import { Navigation } from '@/components/Navigation'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { InternalPageHero } from '@/components/InternalPageHero'

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <InternalPageHero
          title="Contact Us"
          subtitle="Connect with our team for inquiries, collaborations, and support. We are here to help you take the next step with confidence."
          backgroundImage="/hero-img.jpeg"
        />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
