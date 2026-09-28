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
        soft: '0 12px 32px -16px rgba(165, 115, 20, 0.18)',
        lift: '0 20px 48px -18px rgba(165, 115, 20, 0.25)',
        glow: '0 0 28px rgba(220, 170, 50, 0.32)',
        'glow-gold': '0 0 32px rgba(235, 185, 60, 0.38)',
        'glow-emerald': '0 0 25px rgba(210, 160, 45, 0.25)',
        glass: '0 14px 40px 0 rgba(140, 95, 15, 0.15)',
        dropdown: '0 22px 50px -10px rgba(130, 85, 10, 0.25)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 245, 215, 0.5)',
      },
      colors: {
        cream: '#fcf6e8',
        sand: '#f5e6c7',
        obsidian: '#241705',
        blossom: '#edd197',
        blush: '#b8860b',
        lilac: '#dfbe73',
        sky: '#c89122',
        mint: '#fef5dc',
        peach: '#e5be5e',
        gold: {
          light: '#fff9e8',
          DEFAULT: '#d4a338',
          dark: '#8b6310',
          glow: '#fadc8a',
        },
        amber: {
          DEFAULT: '#d4a338',
          glow: '#f5dfa5',
        },
        clay: {
          DEFAULT: '#8b6310',
          hover: '#6f4e09',
          light: '#fdf6e6',
        },
        moss: {
          DEFAULT: '#8b6310',
          light: '#eed6a1',
        },
        cocoa: {
          DEFAULT: '#241705',
          soft: '#3d2b0e',
          muted: '#73562a',
          light: '#fbf4e2',
        },
      },
      backgroundImage: {
        paper:
          'linear-gradient(145deg, rgba(255, 252, 245, 0.95) 0%, rgba(248, 235, 208, 0.9) 100%)',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(180, 130, 25, 0.12) 1px, transparent 0)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 250, 0.92) 0%, rgba(246, 230, 198, 0.88) 100%)',
        'terracotta-gradient':
          'linear-gradient(135deg, #fef5dc 0%, #b8860b 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #fff3cf 0%, #e8bc57 50%, #c89122 100%)',
        'soft-glow':
          'radial-gradient(circle, rgba(225, 175, 55, 0.25) 0%, transparent 70%)',
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