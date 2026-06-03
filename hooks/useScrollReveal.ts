'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial state
    element.style.opacity = '0'
    element.style.transform = 'translateY(30px)'
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  // Apply visible state
  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.transform = 'translateY(0)'
    }
  }, [isVisible])

  return { ref, isVisible }
}

// Hook for staggered children animations
export function useStaggerReveal(itemCount: number, options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const children = element.querySelectorAll('[data-animate-item]')
    
    // Initialize all children
    children.forEach((child) => {
      const el = child as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal items with stagger delay
          children.forEach((child, index) => {
            const el = child as HTMLElement
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, index * 100) // 100ms stagger
          })
          
          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, visibleItems }
}

// Animation CSS to inject
export const animationStyles = `
  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .scroll-reveal-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .scroll-reveal-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .scroll-reveal-right {
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .scroll-reveal-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .scroll-reveal-scale {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .scroll-reveal-scale.visible {
    opacity: 1;
    transform: scale(1);
  }

  .stagger-item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }
  
  .stagger-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .scroll-reveal,
    .scroll-reveal-left,
    .scroll-reveal-right,
    .scroll-reveal-scale,
    .stagger-item {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`
