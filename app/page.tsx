import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { CTABanner } from '@/components/CTABanner'
import { Footer } from '@/components/Footer'
import { TypingText } from '@/components/TypingText'
import { ArrowRight, Heart, Target, Zap, Leaf, Fish, Wheat, Droplet, Briefcase, Users, ShoppingCart } from 'lucide-react'
import { AwardsRecognitionSection } from '@/components/Services'
import { AppShowcaseTimeline } from '@/components/AppShowcaseTimeline'

const previewSections = [
  {
    id: 'about',
    title: 'About Us',
    subtitle: 'Who We Are',
    description: 'Delchris Africa Limited is a woman-owned and women-led social enterprise combining commercial excellence with community impact.',
    link: '/about',
    items: [
      { icon: Target, label: 'Mission', text: 'Delivering high-quality processed foods' },
      { icon: Heart, label: 'Values', text: 'Sustainability, quality, community empowerment' },
      { icon: Zap, label: 'Vision', text: 'Premier processing company in Ghana' },
    ],
  },
  {
    id: 'services',
    title: 'Our Services',
    subtitle: 'Processing Excellence',
    description: 'Multiple processing centers equipped with modern technology delivering premium quality products for domestic and export markets.',
    link: '/services',
    items: [
      { icon: Wheat, label: 'Rice Processing', text: '15 tons/hour capacity in Hohoe' },
      { icon: Leaf, label: 'Mushroom & Seafood', text: 'Premium canned & dried products' },
      { icon: ShoppingCart, label: 'Delx E-commerce', text: 'Online shopping platform' },
    ],
  },
  {
    id: 'get-involved',
    title: 'Get Involved',
    subtitle: 'Join Us',
    description: 'Multiple ways to partner with us and contribute to sustainable agribusiness and community empowerment.',
    link: '/get-involved',
    items: [
      { icon: Briefcase, label: 'Internships', text: 'Hands-on agribusiness experience' },
      { icon: Heart, label: 'Volunteering', text: 'Empower rural communities' },
      { icon: Users, label: 'Partnerships', text: 'Supply chain & distribution' },
    ],
  },
]

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm bg-black">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/hero-img.jpeg"
              >
                <source src="/video/delchris-video.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="space-y-5">
              <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
               Watch Our Delx Crab
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                <TypingText text="Delx crab In Sunflower Oil           " speed={25} className="text-[#0898a2]" />
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                Experience the rich flavors of our premium canned crab, sustainably sourced and expertly processed for quality and taste.
              </p>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                Our Delx Crab in Sunflower Oil is a testament to our commitment to delivering high-quality, delicious products that empower communities and promote sustainable agribusiness in Ghana.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AppShowcaseTimeline />

      {/* Awards & Recognition */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AwardsRecognitionSection />
        </div>
      </section>

      {/* Section Previews */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
              Explore Delchris
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              What We Offer
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Discover our agribusiness solutions, community impact, and how you can get involved.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {previewSections.map((section) => (
              <Link
                key={section.id}
                href={section.link}
                className="group bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 card-hover-lift"
              >
                <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-2">
                  {section.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed mb-6">
                  {section.description}
                </p>

                <div className="space-y-3 mb-6">
                  {section.items.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="text-primary" size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-foreground/60">{item.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <span className="text-primary font-semibold flex items-center gap-2 group/btn">
                  Learn More
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Row */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Our Team', href: '/team', desc: 'Meet the leadership' },
              { label: 'How It Works', href: '/how-it-works', desc: 'The Delchris model' },
              { label: 'Foundation', href: '/foundation', desc: 'Support our causes' },
              { label: 'Testimonials', href: '/testimonials', desc: 'Impact stories' },
              { label: 'FAQ', href: '/faq', desc: 'Common questions' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="bg-white rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all text-center group"
              >
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </p>
                <p className="text-sm text-foreground/60 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
