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
      <div className="relative z-50 bg-gradient-to-r from-[#021813] via-[#05291f] to-[#1a1402] border-b border-emerald-500/25 py-2 text-emerald-200">
        <div className="section-shell flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/20 text-[10px] text-emerald-300">★</span>
            <span className="tracking-wide">
              Spring Artisan Drop Live &#8226; Use code <strong className="rounded bg-emerald-500/25 border border-emerald-400/30 px-1.5 py-0.5 text-amber-300 font-mono">ATELIER10</strong> for 10% off
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[11px] font-medium text-slate-300 sm:flex">
            <span className="text-emerald-300 font-semibold">✦ 100% Artisan Handcrafted</span>
            <span className="text-emerald-500/40">&#8226;</span>
            <span>Free Delivery Across India over <strong className="text-amber-300">&#8377;1,499</strong></span>
            <span className="text-emerald-500/40">&#8226;</span>
            <Link href="/admin" className="font-bold underline text-amber-300 hover:text-amber-200 transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-emerald-500/20 bg-[#030708]/90 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_1px_15px_rgba(0,245,160,0.1)] backdrop-blur-2xl transition-all">
        <div className="section-shell">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#00f5a0] via-emerald-500 to-teal-800 text-slate-950 font-black text-xl shadow-[0_0_20px_rgba(0,245,160,0.5)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,245,160,0.8)]">
                ✦
              </span>
              <div>
                <span className="font-serif text-3xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Atelier <span className="bg-gradient-to-r from-[#00f5a0] via-teal-300 to-[#fbbf24] bg-clip-text text-transparent">NP</span>
                </span>
                <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400 drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]">Luxury Craft Market</span>
              </div>
            </a>

            {/* Nav Links */}
            <nav className="hidden items-center gap-7 text-sm font-bold text-slate-300 lg:flex">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#00f5a0] hover:drop-shadow-[0_0_10px_rgba(0,245,160,0.5)]"
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
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-[#061214]/80 px-3.5 py-2.5 text-xs font-semibold text-slate-300 shadow-sm transition hover:border-emerald-400/60 hover:bg-[#0a1e22] hover:text-white"
              >
                <Search className="h-4 w-4 text-[#00f5a0]" />
                <span>Search crafts...</span>
                <kbd className="rounded bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 text-[10px] text-emerald-300 font-mono">⌘K</kbd>
              </button>

              {/* Sell Your Craft */}
              <button
                type="button"
                onClick={() => setIsSellOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#00f5a0] shadow-[0_0_15px_rgba(0,245,160,0.2)] transition hover:bg-gradient-to-r hover:from-[#00f5a0] hover:to-emerald-500 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(0,245,160,0.6)]"
              >
                <Store className="h-4 w-4" />
                Sell Craft
              </button>

              {/* Admin Portal Button */}
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs font-bold text-amber-300 shadow-sm transition hover:bg-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                title="Open Admin & Inventory Console"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" />
                <span>Admin</span>
              </Link>

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label="Open wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-emerald-500/25 bg-[#061214]/90 text-slate-200 shadow-soft transition duration-200 hover:scale-105 hover:border-rose-500/60 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
              >
                <Heart className="h-5 w-5 text-slate-300 transition group-hover:text-rose-400" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow-[0_0_10px_rgba(244,63,94,0.6)]">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                aria-label="Open shopping bag"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00f5a0] via-emerald-400 to-teal-500 px-4 py-2.5 text-xs font-black text-slate-950 shadow-[0_0_25px_rgba(0,245,160,0.5)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(0,245,160,0.75)] hover:scale-105"
              >
                <ShoppingBag className="h-4 w-4 stroke-[2.5]" />
                <span>Bag</span>
                {cartCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-slate-950 px-1.5 text-[11px] font-black text-[#00f5a0] border border-[#00f5a0]/40">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Auth */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#061214] p-1.5 pr-3 shadow-soft">
                    {user.avatarImage ? (
                      <img
                        src={user.avatarImage}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border border-emerald-400/50"
                      />
                    ) : (
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#00f5a0] to-emerald-600 text-xs font-black text-slate-950">
                        {user.avatar || 'U'}
                      </span>
                    )}
                    <span className="max-w-[80px] truncate text-xs font-bold text-white">{user.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    title="Sign Out"
                    className="grid h-9 w-9 place-items-center rounded-full border border-emerald-500/20 bg-[#061214] text-slate-400 transition hover:border-rose-500/50 hover:bg-[#1a0a0f] hover:text-rose-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#061214] px-4 py-2.5 text-xs font-bold text-white shadow-soft transition hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-[#00f5a0]"
                >
                  <LogIn className="h-4 w-4 text-[#00f5a0]" />
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
                className="relative grid h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-[#061214] text-white shadow-soft"
              >
                <Heart className="h-4 w-4 text-slate-300" />
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
                className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-[#00f5a0] to-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,245,160,0.5)]"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-slate-950 text-[9px] font-black text-[#00f5a0] border border-[#00f5a0]/50">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-emerald-500/30 bg-[#061214] text-white shadow-soft"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Navigation */}
          {isMenuOpen && (
            <div className="pb-5 lg:hidden">
              <div className="glass-card overflow-hidden p-5 shadow-dropdown border border-emerald-500/30">
                {/* Search Bar in Mobile */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsQuickSearchOpen(true)
                    }}
                    className="flex w-full items-center justify-between rounded-full border border-emerald-500/30 bg-[#061214] px-4 py-2.5 text-xs text-slate-300"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-[#00f5a0]" />
                      Search crafts...
                    </span>
                    <span className="rounded bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300">Open</span>
                  </button>
                </div>

                <nav className="grid gap-2 text-sm font-bold text-white">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 transition hover:bg-emerald-500/10 hover:text-[#00f5a0]"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-2.5 border-t border-emerald-500/20 pt-4">
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
