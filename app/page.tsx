import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { CTABanner } from '@/components/CTABanner'
import { HowItWorks } from '@/components/HowItWorks'
import { Team } from '@/components/Team'
import { Gallery } from '@/components/Gallery'
import { Testimonials } from '@/components/Testimonials'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { GetInvolved } from '@/components/GetInvolved'
import { FAQ } from '@/components/FAQ'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <CTABanner />
      <HowItWorks />
      <Team />
      <Gallery />
      <Testimonials />
      <WhyChooseUs />
      <GetInvolved />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
