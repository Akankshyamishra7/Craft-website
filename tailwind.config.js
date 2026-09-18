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
        soft: '0 12px 32px -16px rgba(5, 102, 57, 0.18)',
        lift: '0 20px 48px -18px rgba(5, 102, 57, 0.28)',
        glow: '0 0 30px -5px rgba(16, 185, 129, 0.4)',
        glass: '0 8px 32px 0 rgba(5, 102, 57, 0.08)',
        dropdown: '0 16px 40px -10px rgba(5, 102, 57, 0.22)',
      },
      colors: {
        cream: '#eefbf3',
        sand: '#d1f5de',
        blossom: '#a7f3d0',
        blush: '#6ee7b7',
        lilac: '#86efac',
        sky: '#d1fae5',
        mint: '#bbf7d0',
        peach: '#fef3c7',
        gold: '#fde68a',
        clay: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#ecfdf5',
        },
        moss: {
          DEFAULT: '#065f46',
          light: '#d1fae5',
        },
        cocoa: {
          DEFAULT: '#052e16',
          soft: '#14532d',
          muted: '#4d7c5f',
          light: '#f0fdf4',
        },
      },
      backgroundImage: {
        paper:
          'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 45%), linear-gradient(135deg, rgba(255,255,255,0.8), rgba(236,253,245,0.98))',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(5, 150, 105, 0.06) 1px, transparent 0)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)',
        'terracotta-gradient':
          'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'soft-glow':
          'radial-gradient(circle, rgba(167, 243, 208, 0.5) 0%, rgba(236, 253, 245, 0) 70%)',
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
