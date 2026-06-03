'use client'

import { Star } from 'lucide-react'
import { useEffect } from 'react'

export function Testimonials() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = entry.target.querySelector('.testimonials-header')
            header?.classList.add('visible')
            
            const cards = entry.target.querySelectorAll('.testimonial-card')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible')
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.querySelector('.testimonials-section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: 'Ama Mensah',
      role: 'Rice Farmer & Supplier',
      quote: 'Delchris transformed my farming. Their training and guaranteed market have doubled my income and allowed me to educate my children.',
      rating: 5,
    },
    {
      name: 'Kwame Asante',
      role: 'Restaurant Owner',
      quote: 'The quality and consistency of Delchris products are unmatched. My customers specifically request our Delchris rice and mushroom dishes.',
      rating: 5,
    },
    {
      name: 'Abena Owusu',
      role: 'Foundation Beneficiary',
      quote: 'The Delchris program gave me hope when I had none. Now I run my own cassava business and help other women in my community.',
      rating: 5,
    },
    {
      name: 'Kofi Boateng',
      role: 'Export Company Manager',
      quote: 'Their international quality standards and reliable supply make Delchris our preferred processing partner for seafood exports.',
      rating: 5,
    },
  ]

return (
    <section className="testimonials-section py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="testimonials-header scroll-reveal text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            Impact Stories
          </p>
          <h2 className="testimonials-header scroll-reveal text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Hear From Our Community
          </h2>
          <p className="testimonials-header scroll-reveal text-lg text-foreground/60 max-w-2xl mx-auto">
            Real stories of transformation and success from farmers, businesses, and beneficiaries of our programs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card scroll-reveal bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 card-hover-lift"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/70 leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-primary font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
