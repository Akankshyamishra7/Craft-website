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
        soft: '0 8px 24px -10px rgba(20, 20, 20, 0.06)',
        lift: '0 16px 36px -12px rgba(20, 20, 20, 0.10)',
        glow: '0 0 24px rgba(20, 20, 20, 0.08)',
        'glow-gold': '0 0 28px rgba(184, 134, 11, 0.15)',
        'glow-emerald': '0 0 20px rgba(20, 20, 20, 0.06)',
        glass: '0 10px 30px 0 rgba(20, 20, 20, 0.04)',
        dropdown: '0 20px 40px -10px rgba(20, 20, 20, 0.12)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
      },
      colors: {
        cream: '#FAF7F2',
        sand: '#F3EFE8',
        obsidian: '#141414',
        blossom: '#EAE5DC',
        blush: '#9E7938',
        lilac: '#E4DFD6',
        sky: '#8C827A',
        mint: '#F6F3EE',
        peach: '#E8E2D8',
        gold: {
          light: '#FAF6EE',
          DEFAULT: '#9E7938',
          dark: '#6E5223',
          glow: '#DCC69E',
        },
        amber: {
          DEFAULT: '#9E7938',
          glow: '#EEDCB8',
        },
        clay: {
          DEFAULT: '#7A6B5D',
          hover: '#5A4E43',
          light: '#F5F1EB',
        },
        moss: {
          DEFAULT: '#6E6659',
          light: '#E5DFD5',
        },
        cocoa: {
          DEFAULT: '#1A1A1A',
          soft: '#2D2A26',
          muted: '#6E6860',
          light: '#F7F5F0',
        },
      },
      backgroundImage: {
        paper:
          'linear-gradient(145deg, #FFFFFF 0%, #FAF8F5 100%)',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(40, 35, 30, 0.04) 1px, transparent 0)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 247, 242, 0.9) 100%)',
        'terracotta-gradient':
          'linear-gradient(135deg, #FAF7F2 0%, #D8CFC2 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #1F1F1F 0%, #141414 100%)',
        'soft-glow':
          'radial-gradient(circle, rgba(200, 190, 175, 0.2) 0%, transparent 70%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
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