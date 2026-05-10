'use client'

import { Award, Leaf, Users, Zap, TrendingUp, Shield } from 'lucide-react'

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'International food safety standards and rigorous quality control at every stage of production',
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Environmentally responsible operations with zero-waste processing and organic farming initiatives',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Woman-owned enterprise dedicated to empowering farmers, women, and rural communities',
    },
    {
      icon: Zap,
      title: 'Modern Technology',
      description: 'State-of-the-art processing facilities with cutting-edge equipment and innovation',
    },
    {
      icon: TrendingUp,
      title: 'Market Ready',
      description: 'Products meeting domestic retail, hospitality, and international export market demands',
    },
    {
      icon: Shield,
      title: 'Reliable Partner',
      description: 'Consistent supply, transparent operations, and strong stakeholder relationships based on integrity',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            Why Partner With Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose Delchris Africa
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Multiple competitive advantages that set us apart in the agribusiness industry.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 mb-4 transition-colors">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Competitive Advantage Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">Integrated Value Chain</h3>
            <p className="text-lg text-foreground/70">
              From farm to table, we control every step of the process, ensuring quality, consistency, and sustainability throughout.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Local Sourcing',
                  description: 'Direct partnerships with Ghana\'s farmers ensuring fresh, quality raw materials',
                },
                {
                  title: 'Advanced Processing',
                  description: 'State-of-the-art facilities with modern technology and hygiene standards',
                },
                {
                  title: 'Strategic Distribution',
                  description: 'Multi-channel distribution reaching retail, hospitality, and export markets',
                },
                {
                  title: 'Social Impact',
                  description: 'Creating jobs and opportunities throughout the value chain for communities',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-foreground/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-border">
            <h4 className="text-2xl font-bold text-foreground mb-6">Our Promise</h4>
            <div className="space-y-4">
              {[
                'Premium quality products that exceed expectations',
                'Sustainable practices protecting our environment',
                'Fair partnerships with farmers and communities',
                'Consistent innovation in products and processes',
                'Transparent operations and honest relationships',
                'Commitment to empowering women and rural development',
              ].map((promise, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-primary font-bold text-lg flex-shrink-0">→</span>
                  <p className="text-foreground/70">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
