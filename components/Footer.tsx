'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Team', href: '/team' },
      { label: 'Foundation', href: '/how-it-works' },
    ],
    Programs: [
      { label: 'Rice Processing', href: '/services' },
      { label: 'Seafood & Mushrooms', href: '/services' },
      { label: 'Cassava Products', href: '/services' },
      { label: 'Get Involved', href: '/get-involved' },
    ],
    Resources: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/get-involved' },
      { label: 'Gallery', href: '/gallery' },
    ],
  }

  return (
    <footer className="bg-[#0898a2] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-5 gap-8 mb-12 border-b border-white/10">
{/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-17 h-10">
                <Image
                  src="/logo.png"
                  alt="Delchris Africa Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg">Delchris Africa</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Woman-owned agribusiness empowering communities through sustainable food processing in Ghana.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/70 text-sm">
            <p>© {currentYear} Delchris Africa Limited. All rights reserved.</p>
            <p className="mt-2">Registered as a limited liability company and social enterprise in Ghana.</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Powered by</span>
           
            <span>Vertex Blueprint Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
