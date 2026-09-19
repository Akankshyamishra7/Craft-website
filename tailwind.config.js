/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -16px rgba(0, 245, 160, 0.25)',
        lift: '0 20px 48px -18px rgba(0, 245, 160, 0.4)',
        glow: '0 0 35px rgba(0, 245, 160, 0.55)',
        'glow-gold': '0 0 35px rgba(245, 158, 11, 0.5)',
        'glow-emerald': '0 0 45px rgba(0, 245, 160, 0.65)',
        glass: '0 12px 40px 0 rgba(0, 0, 0, 0.75)',
        dropdown: '0 20px 50px -10px rgba(0, 0, 0, 0.85)',
        'inner-glow': 'inset 0 1px 0 0 rgba(0, 245, 160, 0.25)',
      },
      colors: {
        cream: '#030708',
        sand: '#081214',
        obsidian: '#020506',
        blossom: '#064e3b',
        blush: '#059669',
        lilac: '#00f5a0',
        sky: '#06b6d4',
        mint: '#10b981',
        peach: '#f59e0b',
        gold: {
          DEFAULT: '#fbbf24',
          light: '#fef3c7',
          dark: '#b45309',
        },
        amber: {
          DEFAULT: '#f59e0b',
          glow: '#fbbf24',
        },
        clay: {
          DEFAULT: '#00f5a0',
          hover: '#34d399',
          light: '#022c22',
        },
        moss: {
          DEFAULT: '#34d399',
          light: '#064e3b',
        },
        cocoa: {
          DEFAULT: '#ffffff',
          soft: '#e2e8f0',
          muted: '#94a3b8',
          light: '#030708',
        },
      },
      backgroundImage: {
        paper:
          'linear-gradient(145deg, rgba(8, 22, 18, 0.85) 0%, rgba(3, 8, 10, 0.95) 100%)',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(0, 245, 160, 0.12) 1px, transparent 0)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(0, 245, 160, 0.12) 0%, rgba(3, 7, 8, 0.8) 100%)',
        'terracotta-gradient':
          'linear-gradient(135deg, #00f5a0 0%, #059669 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
        'soft-glow':
          'radial-gradient(circle, rgba(0, 245, 160, 0.25) 0%, transparent 70%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' },
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