'use client'

import { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypingText({ text, speed = 50, className }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (!isDeleting) {
          const next = text.slice(0, prev.length + 1)
          if (next === text) {
            setIsDeleting(true)
          }
          return next
        }

        const next = prev.slice(0, -1)
        if (next.length === 0) {
          setIsDeleting(false)
        }
        return next
      })
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, isDeleting])

  return (
    <span className={className}>
      {displayedText}
      <span className="ml-1 inline-block w-[1px] h-[1em] bg-current align-middle animate-pulse" />
    </span>
  )
}
