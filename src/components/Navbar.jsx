"use client"

import { useState } from 'react'
import { Menu, X, ShoppingCart, Store, Search, LogIn, LogOut, UserCircle2 } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'

const links = ['Home', 'Collection', 'Inspiration', 'About', 'Contact']

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCount, user, setIsCartOpen, setIsAuthOpen, setIsSellOpen, logout } = useMarketplace()

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-cream/85 shadow-[0_12px_36px_-28px_rgba(97,62,28,0.55)] backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 text-xl font-semibold tracking-[0.25em] text-cocoa">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blossom to-sand text-lg shadow-soft">
              ✿
            </span>
            <span className="font-serif text-3xl tracking-wide">Crafty</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-cocoa/80 lg:flex">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="transition hover:text-cocoa">
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => setIsSellOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2.5 text-sm font-semibold text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Store className="h-4 w-4" />
              Sell Your Craft
            </button>
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setIsCartOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-white/70 text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-full border border-white/80 bg-white/75 px-3 py-2 shadow-soft">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blossom to-sand text-sm font-semibold text-cocoa">
                    {user.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cocoa">{user.name}</p>
                    <p className="text-[11px] text-cocoa/55">Logged in</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2.5 text-sm font-semibold text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            )}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-white/70 text-cocoa transition hover:bg-white lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={`lg:hidden ${isMenuOpen ? 'pb-5' : 'hidden'}`}>
          <div className="soft-card overflow-hidden p-4">
            <nav className="grid gap-3 text-sm font-semibold text-cocoa/80">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 transition hover:bg-sand/60 hover:text-cocoa"
                >
                  {link}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid gap-3 border-t border-sand/70 pt-4 text-cocoa/80">
              <button type="button" onClick={() => setIsSellOpen(true)} className="flex items-center justify-center gap-2 rounded-full bg-sand/70 px-4 py-2 text-sm font-semibold">
                <Store className="h-4 w-4" />
                Sell Your Craft
              </button>
              <button type="button" onClick={() => setIsCartOpen(true)} className="flex items-center justify-center gap-2 rounded-full bg-sand/70 px-4 py-2 text-sm font-semibold">
                <ShoppingCart className="h-4 w-4" />
                Cart {cartCount > 0 ? `(${cartCount})` : ''}
              </button>
              {user ? (
                <button type="button" onClick={logout} className="flex items-center justify-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold">
                  <UserCircle2 className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <button type="button" onClick={() => setIsAuthOpen(true)} className="flex items-center justify-center gap-2 rounded-full bg-cocoa px-4 py-2 text-sm font-semibold text-white">
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              )}
              <button type="button" className="flex items-center justify-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-cocoa">
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
