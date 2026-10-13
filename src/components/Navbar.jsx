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
      <div className="relative z-50 bg-gradient-to-r from-[#FAF4E4] via-[#F6EAC9] to-[#FAF4E4] border-b border-[#E8D6A7] py-2 text-[#4A380A]">
        <div className="section-shell flex items-center justify-between text-xs font-semibold gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[10px] text-white shadow-sm">★</span>
            <span className="tracking-wide truncate">
              Artisan Spring Drop Live &#8226; Use code <strong className="rounded bg-white/90 border border-[#D4AF37]/60 px-1.5 py-0.5 text-[#735206] font-mono shadow-xs">ATELIER10</strong> for 10% off
            </span>
          </div>
          <div className="hidden items-center gap-3.5 text-[11px] font-medium text-[#6B531C] sm:flex shrink-0">
            <span className="text-[#855E0D] font-bold">✦ 100% Artisan Handcrafted</span>
            <span className="text-[#D8C7A0]">&#8226;</span>
            <span>Free Delivery Across India over <strong className="text-[#5C4106]">&#8377;1,499</strong></span>
            <span className="text-[#D8C7A0]">&#8226;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#D4AF37]/50 px-2.5 py-0.5 text-[11px] font-semibold text-[#5C4106] hover:border-[#D4AF37] hover:bg-white transition-all shadow-xs"
              title="Open Admin & Operations Console"
            >
              <LayoutDashboard className="h-3 w-3 text-[#B8860B]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-[#EEDBBA]/80 bg-[#FDFBF7]/95 shadow-[0_4px_25px_rgba(184,134,11,0.06)] backdrop-blur-md">
        <div className="section-shell">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
              <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#241A06] via-[#141414] to-[#382705] text-[#ECC872] border border-[#D4AF37]/50 font-black text-lg sm:text-xl shadow-[0_4px_16px_rgba(184,134,11,0.25)] transition-transform duration-200 group-hover:scale-105">
                ✦
              </span>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414] flex items-center gap-1.5 whitespace-nowrap">
                  Atelier <span className="text-gold-gradient font-bold">NP</span>
                </span>
                <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-[#9E7A2E] whitespace-nowrap">
                  Luxury Craft Market
                </span>
              </div>
            </a>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 text-sm font-semibold tracking-wide text-[#3A3630] shrink-0">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative whitespace-nowrap py-1 transition-colors duration-200 hover:text-[#946B08] group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] transition-[width] duration-200 ease-out group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Curated Action Buttons (Desktop) */}
            <div className="hidden items-center gap-2.5 lg:flex shrink-0">
              {/* Quick Search */}
              <button
                type="button"
                onClick={() => setIsQuickSearchOpen(true)}
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-[#E5D7B7] bg-white px-3.5 text-xs font-semibold text-[#3A3630] shadow-sm transition hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(212,175,55,0.2)] hover:text-[#141414] shrink-0 whitespace-nowrap"
                title="Search crafts (⌘K)"
              >
                <Search className="h-4 w-4 text-[#B8860B] transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden xl:inline text-[#3A3630]">Search crafts...</span>
                <span className="xl:hidden text-[#3A3630]">Search</span>
                <kbd className="hidden 2xl:inline-block rounded bg-[#F5EEDC] border border-[#E0D0AB] px-1.5 py-0.5 text-[10px] text-[#735206] font-mono">⌘K</kbd>
              </button>

              {/* Sell Your Craft */}
              <button
                type="button"
                onClick={() => setIsSellOpen(true)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#FAF5E6] to-[#F5ECCF] px-4 text-xs font-bold tracking-wide text-[#4D3505] shadow-xs transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#171103] hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] shrink-0 whitespace-nowrap"
              >
                <Store className="h-4 w-4" />
                <span>Sell Craft</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-[#E5D7B7] bg-white text-[#3A3630] shadow-sm transition duration-200 hover:scale-105 hover:border-rose-500/50 hover:text-rose-500 shrink-0"
                title="Wishlist"
              >
                <Heart className="h-4 w-4 xl:h-5 xl:w-5 text-[#8C7A54] transition group-hover:text-rose-500" />
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
                className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#141414] border border-[#D4AF37]/50 px-4 text-xs font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.18),0_0_12px_rgba(212,175,55,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25),0_0_18px_rgba(212,175,55,0.4)] hover:bg-[#241D0E] shrink-0 whitespace-nowrap"
              >
                <ShoppingBag className="h-4 w-4 stroke-[2.2] text-[#ECC872]" />
                <span>Bag</span>
                {mounted && cartCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-[#ECC872] to-[#D4AF37] px-1.5 text-[11px] font-bold text-[#141414]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Auth */}
              {mounted && user ? (
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex h-10 items-center gap-2 rounded-full border border-[#DDD7CE] bg-white p-1 pr-3 shadow-sm whitespace-nowrap">
                    {user.avatarImage ? (
                      <img
                        src={user.avatarImage}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border border-[#DDD7CE]"
                      />
                    ) : (
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#141414] text-xs font-black text-white">
                        {user.avatar || 'U'}
                      </span>
                    )}
                    <span className="max-w-[70px] xl:max-w-[90px] truncate text-xs font-bold text-[#141414]">{user.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    title="Sign Out"
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#5A554E] transition hover:border-rose-500/50 hover:bg-rose-50 hover:text-rose-600 shrink-0"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#DDD7CE] bg-white px-4 text-xs font-bold text-[#141414] shadow-sm transition hover:border-[#141414] hover:bg-[#F3EFE8] shrink-0 whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4 text-[#5A554E]" />
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
                className="grid h-10 w-10 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#141414] transition hover:bg-[#EFECE6]"
              >
                <Search className="h-4 w-4 text-[#5A554E]" />
              </button>

              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#141414] shadow-sm"
              >
                <Heart className="h-4 w-4 text-[#5A554E]" />
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
                className="relative grid h-10 w-10 place-items-center rounded-full bg-[#141414] text-white font-bold shadow-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-white text-[9px] font-bold text-[#141414]">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#141414] shadow-sm"
              >
                {isMenuOpen ? <X className="h-5 w-5 text-[#141414]" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation */}
          {isMenuOpen && (
            <div className="pb-5 lg:hidden">
              <div className="glass-card overflow-hidden p-5 shadow-dropdown border border-[#E5E0D8] bg-[#FAF8F5]">
                {/* Search Bar in Mobile */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsQuickSearchOpen(true)
                    }}
                    className="flex w-full items-center justify-between rounded-full border border-[#DDD7CE] bg-white px-4 py-2.5 text-xs text-[#141414]"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-[#8C827A]" />
                      Search crafts...
                    </span>
                    <span className="rounded bg-[#EFECE6] border border-[#DDD7CE] px-2 py-0.5 text-[10px] text-[#141414] font-bold">Open</span>
                  </button>
                </div>

                <nav className="grid gap-2 text-sm font-bold text-[#141414]">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 transition hover:bg-[#EFECE6] hover:text-[#141414]"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-2.5 border-t border-[#E5E0D8] pt-4">
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
