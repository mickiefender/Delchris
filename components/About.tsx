'use client'

import { Heart, Target, Zap } from 'lucide-react'

export function About() {
  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Embracing cutting-edge technologies to enhance efficiency and product offerings',
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to environmentally responsible practices for long-term community benefit',
    },
    {
      icon: Target,
      title: 'Quality',
      description: 'Consistently delivering excellence meeting local and international standards',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Who We Are
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Delchris Africa Limited is a woman-owned and women-led social enterprise combining commercial excellence with community impact.
          </p>
        </div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-foreground/70 leading-relaxed">
              Contribute to Ghana's economic growth by delivering high-quality, locally processed rice, mushrooms, and seafood while supporting local farmers, women, and youth.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed">
              Be the premier and most admired cereals, cassava, seafood, and mushroom processing company in Ghana and beyond, catalyzing positive transformation.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Our Values</h3>
            <p className="text-foreground/70 leading-relaxed">
              Sustainability, quality, innovation, community empowerment, and integrity guide every decision and action we take.
            </p>
          </div>
        </div>

        {/* Core Values Details */}
        <div className="bg-white rounded-xl p-12 mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8">Core Values</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                      <Icon className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-foreground/60">{value.description}</p>
                  </div>
                </div>
              )
            })}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Target className="text-primary" size={24} />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Community Empowerment</h4>
                <p className="text-foreground/60">Empowering local farmers and communities through resources, training, and economic opportunities.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Heart className="text-primary" size={24} />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Integrity</h4>
                <p className="text-foreground/60">Conducting business with honesty, transparency, and accountability in all stakeholder relationships.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Goals */}
        <div className="bg-primary/5 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-foreground mb-8">Strategic Goals</h3>
          <div className="space-y-4">
            {[
              'Lead the manufacturing of healthy, convenient foods',
              'Establish strong presence in agroprocessing with emphasis on quality and sustainability',
              'Increase production capacity through technology investment and operational expansion',
              'Support local farmers with resources, training, and technical assistance',
              'Create significant employment opportunities in processing and farming communities',
            ].map((goal, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="text-primary font-bold text-lg flex-shrink-0">•</span>
                <p className="text-foreground/70">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
