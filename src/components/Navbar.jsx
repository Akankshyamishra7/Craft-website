"use client"

import { useState, useEffect } from 'react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      <div className="relative z-50 bg-gradient-to-r from-[#faeccd] via-[#f7e4b5] to-[#faeccd] border-b border-[#d4a338]/30 py-2 text-[#4a340e]">
        <div className="section-shell flex items-center justify-between text-xs font-semibold gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#d4a338]/20 text-[10px] text-[#4a340e]">★</span>
            <span className="tracking-wide truncate">
              Spring Artisan Drop Live &#8226; Use code <strong className="rounded bg-[#d4a338]/20 border border-[#d4a338]/40 px-1.5 py-0.5 text-[#241705] font-mono">ATELIER10</strong> for 10% off
            </span>
          </div>
          <div className="hidden items-center gap-3.5 text-[11px] font-medium text-[#5e4318] sm:flex shrink-0">
            <span className="text-[#8c5f0b] font-bold">✦ 100% Artisan Handcrafted</span>
            <span className="text-[#d4a338]/50">&#8226;</span>
            <span>Free Delivery Across India over <strong className="text-[#241705]">&#8377;1,499</strong></span>
            <span className="text-[#d4a338]/50">&#8226;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#d4a338]/20 border border-[#d4a338]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#4a340e] hover:bg-[#d4a338]/35 hover:text-[#1a1204] transition-all shadow-sm"
              title="Open Admin & Operations Console"
            >
              <LayoutDashboard className="h-3 w-3 text-[#7a520a]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-[#d4a338]/25 bg-[#fbf5e7]/90 shadow-[0_10px_35px_rgba(133,90,16,0.08),0_1px_12px_rgba(212,163,56,0.12)] backdrop-blur-2xl transition-all">
        <div className="section-shell">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
              <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] font-black text-lg sm:text-xl shadow-[0_4px_15px_rgba(200,145,34,0.35)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_22px_rgba(200,145,34,0.5)]">
                ✦
              </span>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#241705] flex items-center gap-1.5 whitespace-nowrap">
                  Atelier <span className="bg-gradient-to-r from-[#b8860b] via-[#946400] to-[#b8860b] bg-clip-text text-transparent font-black">NP</span>
                </span>
                <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-[#8c5f0b] whitespace-nowrap">
                  Luxury Craft Market
                </span>
              </div>
            </a>

            {/* Nav Links (Centered Luxury Navigation) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 text-sm font-semibold tracking-wide text-[#4a3514] shrink-0">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative whitespace-nowrap py-1 transition-colors duration-200 hover:text-[#17120a] group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#b8860b] to-[#e5be5e] transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Curated Action Buttons (Desktop) */}
            <div className="hidden items-center gap-2.5 lg:flex shrink-0">
              {/* Quick Search */}
              <button
                type="button"
                onClick={() => setIsQuickSearchOpen(true)}
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-[#d4a338]/30 bg-white/70 px-3.5 text-xs font-semibold text-[#4a3514] shadow-sm transition hover:border-[#b8860b] hover:bg-white hover:text-[#17120a] shrink-0 whitespace-nowrap backdrop-blur-md"
                title="Search crafts (⌘K)"
              >
                <Search className="h-4 w-4 text-[#8c5f0b] transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden xl:inline text-[#4a3514]">Search crafts...</span>
                <span className="xl:hidden text-[#4a3514]">Search</span>
                <kbd className="hidden 2xl:inline-block rounded bg-[#d4a338]/20 border border-[#d4a338]/40 px-1.5 py-0.5 text-[10px] text-[#4a340e] font-mono">⌘K</kbd>
              </button>

              {/* Sell Your Craft */}
              <button
                type="button"
                onClick={() => setIsSellOpen(true)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#d4a338]/40 bg-[#e5be5e]/15 px-4 text-xs font-bold tracking-wide text-[#4a340e] shadow-sm transition hover:border-[#b8860b] hover:bg-[#e5be5e]/30 hover:text-[#1a1204] shrink-0 whitespace-nowrap"
              >
                <Store className="h-4 w-4 text-[#8c5f0b]" />
                <span>Sell Craft</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/70 text-[#4a3514] shadow-soft transition duration-200 hover:scale-105 hover:border-rose-500/50 hover:text-rose-500 shrink-0"
                title="Wishlist"
              >
                <Heart className="h-4 w-4 xl:h-5 xl:w-5 text-[#63430b] transition group-hover:text-rose-500" />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                aria-label="Open shopping bag"
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] px-4 text-xs font-bold text-[#1a1204] shadow-[0_4px_16px_rgba(200,145,34,0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_22px_rgba(200,145,34,0.45)] shrink-0 whitespace-nowrap"
              >
                <ShoppingBag className="h-4 w-4 stroke-[2.2]" />
                <span>Bag</span>
                {mounted && cartCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#1a1204] px-1.5 text-[11px] font-bold text-[#faecd0] border border-[#ebd499]/30">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Auth */}
              {mounted && user ? (
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex h-10 items-center gap-2 rounded-full border border-[#d4a338]/35 bg-white/70 p-1 pr-3 shadow-soft whitespace-nowrap">
                    {user.avatarImage ? (
                      <img
                        src={user.avatarImage}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border border-[#d4a338]/40"
                      />
                    ) : (
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-xs font-black text-[#1a1204]">
                        {user.avatar || 'U'}
                      </span>
                    )}
                    <span className="max-w-[70px] xl:max-w-[90px] truncate text-xs font-bold text-[#241705]">{user.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    title="Sign Out"
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/70 text-[#63430b] transition hover:border-rose-500/50 hover:bg-rose-50 hover:text-rose-600 shrink-0"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#d4a338]/35 bg-white/70 px-4 text-xs font-bold text-[#4a340e] shadow-soft transition hover:border-[#b8860b] hover:bg-[#e5be5e]/20 hover:text-[#1a1204] shrink-0 whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4 text-[#8c5f0b]" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle & Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setIsQuickSearchOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-[#fbf4e4] text-[#4a340e] transition hover:text-[#1a1204]"
              >
                <Search className="h-4 w-4 text-[#8c5f0b]" />
              </button>

              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-[#fbf4e4] text-[#4a340e] shadow-soft"
              >
                <Heart className="h-4 w-4 text-[#63430b]" />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="Open cart"
                onClick={() => setIsCartOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] font-bold shadow-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#1a1204] text-[9px] font-bold text-[#faecd0] border border-[#ebd499]/40">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-[#fbf4e4] text-[#4a340e] shadow-soft"
              >
                {isMenuOpen ? <X className="h-5 w-5 text-[#8c5f0b]" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation */}
          {isMenuOpen && (
            <div className="pb-5 lg:hidden">
              <div className="glass-card overflow-hidden p-5 shadow-dropdown border border-[#d4a338]/35 bg-[#fdf8ee]">
                {/* Search Bar in Mobile */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsQuickSearchOpen(true)
                    }}
                    className="flex w-full items-center justify-between rounded-full border border-[#d4a338]/30 bg-white/80 px-4 py-2.5 text-xs text-[#4a340e]"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-[#8c5f0b]" />
                      Search crafts...
                    </span>
                    <span className="rounded bg-[#d4a338]/20 border border-[#d4a338]/40 px-2 py-0.5 text-[10px] text-[#4a340e] font-bold">Open</span>
                  </button>
                </div>

                <nav className="grid gap-2 text-sm font-bold text-[#241705]">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 transition hover:bg-[#d4a338]/20 hover:text-[#1a1204]"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-2.5 border-t border-[#ebd499]/20 pt-4">
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-secondary w-full text-xs"
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

                  {mounted && user ? (
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
                      className="btn-primary w-full text-xs"
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
