'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Team', href: '#team' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Contact', href: '#contact' },
  ]

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2">
            <div className="relative w-33 h-15">
              <Image
                src="/logo.png"
                alt="Delchris Africa Logo"
                fill
                className="object-contain"
              />
            </div>
           
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Contact Us
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

{/* Full Screen Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 md:hidden animate-fade-in"
          style={{ top: '4rem' }}
        >
          {/* Navigation Links - Centered */}
          <div className="flex flex-col items-center justify-center h-full space-y-8 pt-16">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleLinkClick}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
            
            {/* CTA Button in Mobile Menu */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-8 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium animate-slide-up"
              style={{ animationDelay: `${navItems.length * 50}ms` }}
            >
              Contact Us
            </a>
          </div>

          {/* Decorative Footer in Menu */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-sm text-muted-foreground">
              Delchris Africa Foundation
            </p>
          </div>
        </div>
      )}
    </nav>
  )
}
