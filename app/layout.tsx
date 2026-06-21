import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import './globals.css'

export const metadata: Metadata = {
  title: 'Delchris Africa Limited - Premium Agribusiness Solutions',
  description: 'Woman-owned agribusiness specializing in rice, mushroom, seafood, and cassava processing. Committed to sustainability, quality, and community empowerment in Ghana.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <WhatsAppButton />
      </body>
    </html>
  )
}
