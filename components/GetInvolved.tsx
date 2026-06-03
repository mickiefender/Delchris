'use client'

import { Briefcase, Heart, Users, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { InternshipModal, VolunteeringModal, PartnershipModal } from './InvolvementModals'

export function GetInvolved() {
  const [internshipOpen, setInternshipOpen] = useState(false)
  const [volunteeringOpen, setVolunteeringOpen] = useState(false)
  const [partnershipOpen, setPartnershipOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.gi-animate').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('get-involved')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const opportunities = [
    {
      icon: Briefcase,
      title: 'Internships',
      description: 'Join our team and gain hands-on experience in agribusiness, food processing, operations, or community development.',
      cta: 'Apply Now',
    },
    {
      icon: Heart,
      title: 'Volunteering',
      description: 'Passionate about agribusiness? Help us empower rural women and communities while solving global food challenges.',
      cta: 'Get Involved',
    },
    {
      icon: Users,
      title: 'Partnerships',
      description: 'Partner with Delchris to expand our impact through supply chains, distribution, or collaborative projects.',
      cta: 'Explore Partnership',
    },
  ]

  return (
<section id="get-involved" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="gi-animate scroll-reveal text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            Join Us
          </p>
          <h2 className="gi-animate scroll-reveal text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Get Involved With Delchris
          </h2>
          <p className="gi-animate scroll-reveal text-lg text-foreground/60 max-w-2xl mx-auto">
            Multiple ways to partner with us and contribute to sustainable agribusiness and community empowerment.
          </p>
        </div>

{/* Opportunities Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {opportunities.map((opp, index) => {
            const Icon = opp.icon
            return (
              <div
                key={index}
                className="gi-animate scroll-reveal group bg-white rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 mb-4 transition-colors">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {opp.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed mb-6">
                  {opp.description}
                </p>
                <button
                  onClick={() => {
                    if (index === 0) setInternshipOpen(true)
                    else if (index === 1) setVolunteeringOpen(true)
                    else if (index === 2) setPartnershipOpen(true)
                  }}
                  className="text-primary font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all"
                >
                  {opp.cta}
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            )
          })}
        </div>

{/* Why Join Delchris */}
        <div className="gi-animate scroll-reveal bg-white rounded-xl p-12 border border-border mb-16">
          <h3 className="gi-animate scroll-reveal text-2xl font-bold text-foreground mb-8 text-center">Why Join the Delchris Team</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Make Real Impact',
                description: 'Directly contribute to economic empowerment of women, youth, and rural communities',
              },
              {
                title: 'Innovative Solutions',
                description: 'Work on cutting-edge sustainable agribusiness and food processing challenges',
              },
              {
                title: 'Learn & Grow',
                description: 'Access world-class mentorship from industry experts and experienced professionals',
              },
              {
                title: 'Collaborative Culture',
                description: 'Be part of a passionate, multidisciplinary team united by shared values',
              },
              {
                title: 'Global Reach',
                description: 'Work on projects with international partnerships and export market opportunities',
              },
              {
                title: 'Career Development',
                description: 'Build valuable skills in agribusiness, operations, and social enterprise management',
              },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-foreground/60 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

{/* CTA Section */}
        <div className="gi-animate scroll-reveal bg-gradient-to-r from-primary to-primary/80 rounded-xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re interested in internships, volunteering, or partnerships, we&apos;d love to hear from you.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-white/90 transition-colors font-semibold inline-flex items-center gap-2 group">
            Get In Touch
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Modals */}
        <InternshipModal isOpen={internshipOpen} onClose={() => setInternshipOpen(false)} />
        <VolunteeringModal isOpen={volunteeringOpen} onClose={() => setVolunteeringOpen(false)} />
        <PartnershipModal isOpen={partnershipOpen} onClose={() => setPartnershipOpen(false)} />
      </div>
    </section>
  )
}
