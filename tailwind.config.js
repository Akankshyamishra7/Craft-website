/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -16px rgba(88, 28, 135, 0.15)',
        lift: '0 20px 48px -18px rgba(88, 28, 135, 0.25)',
        glow: '0 0 30px -5px rgba(139, 92, 246, 0.35)',
        glass: '0 8px 32px 0 rgba(88, 28, 135, 0.08)',
        dropdown: '0 16px 40px -10px rgba(88, 28, 135, 0.22)',
      },
      colors: {
        cream: '#f0eaff',
        sand: '#e4dbfc',
        blossom: '#ddd6fe',
        blush: '#f0abfc',
        lilac: '#c4b5fd',
        sky: '#e0e7ff',
        mint: '#d1fae5',
        peach: '#fce7f3',
        gold: '#fef3c7',
        clay: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          light: '#f5f3ff',
        },
        moss: {
          DEFAULT: '#059669',
          light: '#ecfdf5',
        },
        cocoa: {
          DEFAULT: '#1e1b2e',
          soft: '#4c3f6e',
          muted: '#7c6f9b',
          light: '#f3f0ff',
        },
      },
      backgroundImage: {
        paper:
          'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 45%), linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,243,255,0.98))',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.06) 1px, transparent 0)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)',
        'terracotta-gradient':
          'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        'soft-glow':
          'radial-gradient(circle, rgba(196, 181, 253, 0.5) 0%, rgba(250, 248, 255, 0) 70%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}
