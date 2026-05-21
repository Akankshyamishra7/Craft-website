/* eslint-disable react-refresh/only-export-components */

import '../index.css'
import { MarketplaceProvider } from '../context/MarketplaceContext'

export const metadata = {
  title: 'Crafty | Handmade Craft Marketplace',
  description: 'A premium handmade craft marketplace for jewelry, decor, beauty DIY, and custom gifts.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MarketplaceProvider>{children}</MarketplaceProvider>
      </body>
    </html>
  )
}
