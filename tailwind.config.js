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
        soft: '0 18px 40px -22px rgba(97, 62, 28, 0.35)',
        lift: '0 24px 50px -24px rgba(97, 62, 28, 0.42)',
      },
      colors: {
        cream: '#fbf4ea',
        sand: '#f3e5d2',
        blossom: '#f7d7c4',
        blush: '#f7d9e0',
        lilac: '#dbd5ff',
        sky: '#d8ebff',
        mint: '#d8f1e4',
        peach: '#f9dcc2',
        gold: '#f4e1b8',
        clay: '#d59b74',
        moss: '#8e9b76',
        cocoa: '#5f4738',
      },
      backgroundImage: {
        paper:
          'radial-gradient(circle at top left, rgba(255,255,255,0.75), transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.5), rgba(248,238,224,0.96))',
        texture:
          'radial-gradient(circle at 1px 1px, rgba(151, 106, 62, 0.08) 1px, transparent 0)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        rise: 'rise 700ms ease forwards',
      },
    },
  },
  plugins: [],
}
