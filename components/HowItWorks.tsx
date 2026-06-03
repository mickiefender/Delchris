'use client'

import { CheckCircle, Users, Sprout, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

export function HowItWorks() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = entry.target.querySelector('.hiw-header')
            header?.classList.add('visible')
            
            const steps = entry.target.querySelectorAll('.hiw-step')
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('visible')
              }, index * 100)
            })
            
            const model = entry.target.querySelector('.hiw-model')
            const advantages = entry.target.querySelector('.hiw-advantages')
            setTimeout(() => model?.classList.add('visible'), 900)
            setTimeout(() => advantages?.classList.add('visible'), 1200)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('how-it-works')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const steps = [
{
      number: '1',
      title: 'Identification of suitable candidate',
      description: 'Single mothers, school dropouts, and vulnerable women/youth identified and recruited from local communities.',
      icon: Users,
    },
    {
      number: '2',
      title: 'Individual Needs Assessment',
      description: "Comprehensive evaluation of each candidate's skills, interests, and circumstances to tailor training and support.",
      icon: CheckCircle,
    },
    {
      number: '3',
      title: 'Consulting, purpose and dream definition, and training',
      description: 'Personalized coaching to define goals and dreams, followed by intensive training in sustainable agriculture and/or trade skills.',
      icon: Sprout,
    },
    {
      number: '4',
      title: 'Allocation of farmland and farmhouse',
      description: 'Allocation of farmland and farmhouse with ongoing coaching for agriculture or trade of choice.',
      icon: Zap,
    },
    {
      number: '5',
      title: 'Mentoring and support',
      description: 'Continous mentoring,coaching and further training on farm or tradeof your choice.',
      icon: Users,
    },
    {
      number: '6',
      title: 'Graduation and ongoing support',
      description: 'After one year of mandatory attachment, a candidate is graduated and can either continue to work with the foundation or go into personal trade of choice.',
      icon: Zap,
    },
    {
      number: '7',
      title: 'Continous visitation, support, and monitoring',
      description: 'The foundation continues to visit, support, and monitor all graduates to ensure continued success and sustainability.',
      icon: Zap,
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="hiw-header scroll-reveal text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            The Delchris Model
          </p>
          <h2 className="hiw-header scroll-reveal text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="hiw-header scroll-reveal text-lg text-foreground/60 max-w-2xl mx-auto">
            A comprehensive approach to economic empowerment combining commercial success with meaningful community impact.
          </p>
        </div>

        {/* Steps Timeline - Horizontal Scrollable */}
        <div className="mb-16">
          <div className="relative">
            {/* Scroll Buttons */}
            {showLeftScroll && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {showRightScroll && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 px-8"
            >
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="hiw-step scroll-reveal flex-shrink-0 w-80">
                    <div className="bg-white rounded-xl p-6 border border-border h-full hover:border-primary/30 hover:shadow-lg transition-all duration-300 card-hover-lift">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                        {step.number}
                      </div>
                      <Icon className="text-primary mb-3" size={28} />
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Foundation Model */}
        <div className="hiw-model scroll-reveal grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg md:order-2">
            <img
              src="/Flyer_for_Delchris_Africa_202605101506.jpeg"
              alt="Women farmers engaged in sustainable agriculture training and community empowerment"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-xl p-8 border border-border md:order-1">
            <h3 className="text-2xl font-bold text-foreground mb-6">Delchris Africa Foundation</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Our foundation is a self-sustainable social enterprise supporting the rural economy to alleviate poverty, empower women and youth, and create decent jobs through quality training and sustainable income sources.
            </p>
            <div className="space-y-3">
              {[
                'All-year round farming model',
                'Farm-to-processing value chain',
                'Waste management & sustainability',
                'Irrigation systems for year-round production',
                'Organic farming practices',
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span className="text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h4 className="font-bold text-foreground mb-2">Technological Model</h4>
              <p className="text-sm text-foreground/60">
                All-year round farming combining maize, rice, groundnut, ginger, millet, cassava, and livestock production with innovative processing.
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h4 className="font-bold text-foreground mb-2">Sustainability Focus</h4>
              <p className="text-sm text-foreground/60">
                Cassava peels converted to livestock feed and biofuel. Maize stock and husks packaged for sale, creating zero-waste operations.
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h4 className="font-bold text-foreground mb-2">Continuous Support</h4>
              <p className="text-sm text-foreground/60">
                After one year of training, graduates can continue with the foundation or pursue personal ventures with ongoing mentorship and support.
              </p>
            </div>
          </div>
        </div>

        {/* Model Advantages */}
        <div className="hiw-advantages scroll-reveal bg-gradient-to-r from-primary to-primary/80 rounded-xl p-12 text-white">
          <h3 className="text-2xl font-bold mb-8">Why the Delchris Model Works</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Self-Sustainable',
                description: 'Donor support is leveraged and revolved to continuously support the model',
              },
              {
                title: 'Environmentally Friendly',
                description: 'Organic farming and sustainable practices preventing harmful alternatives',
              },
              {
                title: 'Financial Independence',
                description: 'Beneficiaries learn money-making skills and become self-sufficient',
              },
              {
                title: 'Hands-On Training',
                description: 'Interactive learning through daily farm and trade experience with regular facilitator support',
              },
              {
                title: 'Restored Dignity',
                description: 'Women and youth regain confidence and true sense of identity and wholeness',
              },
              {
                title: 'Easily Replicable',
                description: 'The model can be adapted and implemented in communities anywhere',
              },
            ].map((advantage, i) => (
              <div key={i}>
                <h4 className="font-bold mb-2">{advantage.title}</h4>
                <p className="text-white/90 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
