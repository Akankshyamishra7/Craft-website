"use client"

import { useState } from 'react'
import Link from 'next/link'
import {
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  Store,
  UserCircle2,
  X,
} from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'

const links = [
  { name: 'Collection', href: '#collection' },
  { name: 'Custom Studio', href: '#customize' },
  { name: 'Makers', href: '#makers' },
  { name: 'Inspiration', href: '#inspiration' },
  { name: 'About', href: '#about' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {
    cartCount,
    wishlist,
    user,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthOpen,
    setIsSellOpen,
    setIsQuickSearchOpen,
    logout,
  } = useMarketplace()

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="relative z-50 bg-gradient-to-r from-clay via-cocoa to-clay py-2 text-white">
        <div className="section-shell flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[10px]">✨</span>
            <span className="tracking-wide">
              Spring Artisan Drop Live • Use code <strong className="rounded bg-white/20 px-1.5 py-0.5 text-gold">CRAFTY10</strong> for 10% off
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[11px] font-medium text-white/85 sm:flex">
            <span>🌿 100% Artisan Handcrafted</span>
            <span>•</span>
            <span>📦 Free Worldwide Shipping over $50</span>
            <span>•</span>
            <Link href="/admin" className="font-bold underline hover:text-gold transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-white/80 bg-cream/85 shadow-dropdown backdrop-blur-xl transition-all">
        <div className="section-shell">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blossom via-peach to-sand text-lg shadow-soft transition duration-300 group-hover:scale-105 group-hover:shadow-glow">
                ✿
              </span>
              <div>
                <span className="font-serif text-3xl font-extrabold tracking-tight text-cocoa">Crafty</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-clay">Artisan Market</span>
              </div>
            </a>

            {/* Nav Links */}
            <nav className="hidden items-center gap-7 text-sm font-bold text-cocoa-muted lg:flex">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="transition hover:text-clay"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden items-center gap-2.5 lg:flex">
              {/* Quick Search */}
              <button
                type="button"
                onClick={() => setIsQuickSearchOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/80 px-3.5 py-2.5 text-xs font-semibold text-cocoa-muted shadow-sm transition hover:bg-white hover:text-cocoa"
              >
                <Search className="h-4 w-4 text-clay" />
                <span>Search crafts...</span>
                <kbd className="rounded bg-sand/60 px-1.5 py-0.5 text-[10px] text-cocoa-muted">⌘K</kbd>
              </button>

              {/* Sell Your Craft */}
              <button
                type="button"
                onClick={() => setIsSellOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay-light/50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-clay shadow-sm transition hover:bg-clay hover:text-white"
              >
                <Store className="h-4 w-4" />
                Sell Craft
              </button>

              {/* Admin Portal Button */}
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white/80 px-3.5 py-2.5 text-xs font-bold text-cocoa shadow-sm transition hover:bg-cocoa hover:text-white"
                title="Open Admin & Inventory Console"
              >
                <LayoutDashboard className="h-4 w-4 text-clay" />
                <span>Admin</span>
              </Link>

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-white/90 bg-white/80 text-cocoa shadow-soft transition duration-200 hover:scale-105 hover:bg-white"
              >
                <Heart className="h-5 w-5 text-cocoa-muted transition hover:text-rose-500" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-extrabold text-white shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                aria-label="Open shopping bag"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 rounded-full bg-cocoa px-4 py-2.5 text-xs font-bold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-clay hover:shadow-glow"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Bag</span>
                {cartCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-clay-light px-1.5 text-[11px] font-black text-clay">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Auth */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-white/90 bg-white/90 p-1.5 pr-3 shadow-soft">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blossom to-sand text-xs font-bold text-cocoa">
                      {user.avatar || 'U'}
                    </span>
                    <span className="max-w-[80px] truncate text-xs font-bold text-cocoa">{user.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    title="Sign Out"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/70 text-cocoa/70 transition hover:bg-white hover:text-rose-500"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/80 px-4 py-2.5 text-xs font-bold text-cocoa shadow-soft transition hover:bg-white hover:text-clay"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              )}
            </div>


            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-white/90 bg-white text-cocoa shadow-soft"
              >
                <Heart className="h-4 w-4 text-cocoa-muted" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="Open cart"
                onClick={() => setIsCartOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full bg-cocoa text-white shadow-soft"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-clay text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white bg-white text-cocoa shadow-soft"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation */}
          {isMenuOpen && (
            <div className="pb-5 lg:hidden">
              <div className="glass-card overflow-hidden p-5 shadow-dropdown">
                {/* Search Bar in Mobile */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsQuickSearchOpen(true)
                    }}
                    className="flex w-full items-center justify-between rounded-full border border-sand bg-white/90 px-4 py-2.5 text-xs text-cocoa-muted"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-clay" />
                      Search crafts...
                    </span>
                    <span className="rounded bg-sand/60 px-2 py-0.5 text-[10px]">Open</span>
                  </button>
                </div>

                <nav className="grid gap-2 text-sm font-bold text-cocoa">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 transition hover:bg-sand/50 hover:text-clay"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-2.5 border-t border-sand/70 pt-4">
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-dark w-full text-xs"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin & Operations Console
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsSellOpen(true)
                    }}
                    className="btn-primary w-full text-xs"
                  >
                    <Store className="h-4 w-4" />
                    Sell Your Craft
                  </button>

                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="btn-secondary w-full text-xs"
                    >
                      <UserCircle2 className="h-4 w-4" />
                      Sign Out ({user.name})
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsAuthOpen(true)
                      }}
                      className="btn-dark w-full text-xs"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In / Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

