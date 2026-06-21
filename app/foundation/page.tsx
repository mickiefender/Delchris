import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Foundation } from '@/components/Foundation'

export default function FoundationPage() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <Foundation />
      </div>
      <Footer />
    </main>
  )
}
