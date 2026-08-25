/* eslint-disable react-refresh/only-export-components */

import '../index.css'
import { MarketplaceProvider } from '../context/MarketplaceContext'

export const metadata = {
  title: 'Crafty | Luxury Handmade & Bespoke Craft Marketplace',
  description:
    'Discover genuine artisan handmade jewelry, pressed floral resin, clean aromatherapy soy candles, and bespoke custom crafts direct from independent creators.',
  keywords: [
    'handmade crafts',
    'artisan jewelry',
    'resin decor',
    'soy candles',
    'custom gifts',
    'bespoke crafts',
    'craft marketplace',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <MarketplaceProvider>{children}</MarketplaceProvider>
      </body>
    </html>
  )
}

