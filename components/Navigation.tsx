'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const shouldUseColoredHeader = scrolled || !isHomePage

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Foundation', href: '/foundation' },
    { label: 'Our Model', href: '/how-it-works' },
    { label: 'Team', href: '/team' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact', href: '/contact' },
  ]

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  // Container variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { stiffness: 120, damping: 20 },
    },
  }

  return (
    <>
      {/* Top Gradient Accent Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-red-500 via-amber-400 to-green-500" />

      <header
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          shouldUseColoredHeader
            ? 'bg-[#0898a2] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border-b border-white/30'
            : 'bg-transparent'
        }`}
      >
        {/* Decorative animated color blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden
            animate={{ x: [0, 24, 0], y: [0, -10, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-16 -left-12 h-40 w-40 rounded-full bg-red-400/20 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, -20, 0], y: [0, 12, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-14 left-1/3 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, 18, 0], y: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-14 right-8 h-44 w-44 rounded-full bg-green-400/20 blur-3xl"
          />
        </div>

        {shouldUseColoredHeader && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </motion.div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3 group">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-[180px] h-[74px] sm:w-[220px] sm:h-[88px] transition-transform duration-300 group-hover:scale-105"
              >
                <Image
                  src="/logo.png"
                  alt="Delchris Africa Logo"
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative px-5 py-2.5 text-base font-semibold tracking-wide transition-all duration-300 group rounded-xl"
                  >
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-red-500/15 via-amber-400/15 to-green-500/15 shadow-inner'
                          : 'bg-gradient-to-r from-red-500/0 via-amber-400/0 to-green-500/0 group-hover:from-red-500/10 group-hover:via-amber-400/10 group-hover:to-green-500/10'
                      }`}
                    />
                    <span
                      className={`relative z-10 ${
                        isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 bg-white transition-transform duration-300 origin-left rounded-full ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>


            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative z-10 p-2.5 rounded-full bg-[#0898a2] backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 right-0 bottom-0 top-[calc(5rem+1px)] z-30 md:hidden h-[calc(100vh-5rem-1px)]"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0898a2] bg-[#0898a2]/95 backdrop-blur-xl shadow-2xl border-l border-white/20"
              >
                {/* Gradient top bar */}
                <div className="h-1.5 bg-gradient-to-r from-red-500 via-amber-400 to-green-500" />

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col h-full"
                >
                  {/* Navigation Links */}
                  <div className="flex-1 flex flex-col justify-center px-8 py-8 space-y-2">
                    {navItems.map((item) => (
                      <motion.div key={item.label} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-lg font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          {item.label}
                          <span className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-white/50">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                

                  {/* Decorative Footer */}
                  <div className="px-8 pb-8 text-center">
                    <p className="text-xs text-white/70">
                      Delchris Africa Foundation
                    </p>
                    <div className="mt-3 flex justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
