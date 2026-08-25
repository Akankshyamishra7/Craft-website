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
        soft: '0 12px 32px -16px rgba(95, 71, 56, 0.18)',
        lift: '0 20px 48px -18px rgba(95, 71, 56, 0.28)',
        glow: '0 0 30px -5px rgba(213, 155, 116, 0.35)',
        glass: '0 8px 32px 0 rgba(95, 71, 56, 0.08)',
        dropdown: '0 16px 40px -10px rgba(95, 71, 56, 0.22)',
      },
      colors: {
        cream: '#fdfbf7',
        sand: '#f5ecdf',
        blossom: '#f8dcd0',
        blush: '#f9dee4',
        lilac: '#ded9ff',
        sky: '#dcf0ff',
        mint: '#d9f3e5',
        peach: '#fbe2cc',
        gold: '#f6e4bc',
        clay: {
          DEFAULT: '#c86d51',
          hover: '#b55a3f',
          light: '#faeae3',
        },
        moss: {
          DEFAULT: '#6e8062',
          light: '#eef3ea',
        },
        cocoa: {
          DEFAULT: '#2c221e',
          soft: '#5f4738',
          muted: '#8c7668',
          light: '#f2ede7',
        },
      },
      backgroundImage: {
        paper:
          'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 45%), linear-gradient(135deg, rgba(255,255,255,0.8), rgba(250,244,236,0.98))',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(140, 118, 104, 0.09) 1px, transparent 0)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)',
        'terracotta-gradient':
          'linear-gradient(135deg, #d57a5d 0%, #b85b40 100%)',
        'soft-glow':
          'radial-gradient(circle, rgba(248, 220, 208, 0.6) 0%, rgba(253, 251, 247, 0) 70%)',
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
