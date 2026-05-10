import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors (Red, Orange, Yellow)
        primary: {
          DEFAULT: '#DC2626', // Red
          dark: '#B91C1C', // Dark Red
          light: '#EF4444', // Light Red
        },
        // Neutrals
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        card: '#FAFAFA',
        muted: '#E5E5E5',
        border: '#D9D9D9',
        // Accent
        accent: '#F97316', // Orange
        success: '#10B981',
        warning: '#F59E0B', // Yellow/Amber
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Geist', ...defaultTheme.fontFamily.sans],
        mono: ['Geist Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
