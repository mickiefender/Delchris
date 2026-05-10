'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      question: 'What products does Delchris Africa Limited produce?',
      answer: 'We specialize in rice processing (parboiled, precooked, and rice mixes), mushroom and seafood processing (canned and dried mushrooms, clams, crab, squid, prawns), and cassava products (Gari, cassava flour, starch, and specialty snacks). All products are made to international quality standards with African authenticity.',
    },
    {
      question: 'Where are your processing facilities located?',
      answer: 'We operate three main processing centers: a state-of-the-art rice mill in Hohoe (15 tons/hour capacity), a modern cannery in Adenta (500kg/hour capacity for mushrooms and seafood), and an additional production facility in Hohoe for cassava and specialty products.',
    },
    {
      question: 'How does Delchris support local farmers?',
      answer: 'We provide resources, training in best agricultural practices, technical assistance, and guaranteed markets for raw materials. We also partner with farming communities through our Delchris Africa Foundation to create sustainable income opportunities.',
    },
    {
      question: 'What is the Delchris Africa Foundation?',
      answer: 'Our foundation is a self-sustainable social enterprise supporting rural economic development. We identify and train vulnerable groups (single mothers, school dropouts, women, and youth) in agriculture and entrepreneurship, provide farmland and housing, and offer continuous mentorship for business success.',
    },
    {
      question: 'Are your products available for export?',
      answer: 'Yes, all our products meet international quality and food safety standards. We have products specifically processed and packaged for export markets, with a particular focus on West African distribution and global opportunities.',
    },
    {
      question: 'How can I purchase Delchris products?',
      answer: 'Our products are available through retail partners, hospitality suppliers, and direct partnerships. For bulk orders, wholesale inquiries, or partnership opportunities, please contact our sales team directly.',
    },
    {
      question: 'What makes Delchris different from other food processors?',
      answer: 'We combine commercial excellence with genuine social impact. As a woman-owned enterprise, we prioritize sustainability, community empowerment, and integrity. Our foundation model ensures profits are reinvested in transforming lives and communities.',
    },
    {
      question: 'How can I get involved with Delchris?',
      answer: 'There are multiple ways: apply for internships and gain hands-on agribusiness experience, volunteer with our projects, or explore partnership opportunities in supply chains or distribution. We welcome passionate individuals committed to sustainable development.',
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and mission.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 bg-card hover:bg-card/80 transition-colors flex items-start justify-between gap-4 text-left"
              >
                <span className="font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-primary transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openItems.includes(index) && (
                <div className="px-6 py-4 bg-white border-t border-border">
                  <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground/60 mb-4">Didn&apos;t find what you&apos;re looking for?</p>
          <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
            Contact our team →
          </button>
        </div>
      </div>
    </section>
  )
}
