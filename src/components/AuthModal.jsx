"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogIn, UserPlus, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, login, user, logout } = useMarketplace()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [formState, setFormState] = useState({
    name: user?.name || 'Maya Lin',
    email: user?.email || 'maya@ateliernp.market',
    password: '••••••••',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formState)
    setIsAuthOpen(false)
  }

  const handleDemoFill = () => {
    setFormState({
      name: 'Ananya Sharma',
      email: 'ananya.artisan@ateliernp.market',
      password: 'password123',
    })
  }

  return (
    <AnimatePresence>
      {isAuthOpen ? (
        <motion.div
          key="auth-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-cocoa/50 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthOpen(false)}
        >
          <motion.div
            key="auth-modal-card"
            className="relative my-8 w-full max-w-md overflow-hidden rounded-[2.2rem] bg-[#fdf9f0] border border-[#d4a338]/40 shadow-[0_25px_60px_rgba(133,90,16,0.25),0_0_30px_rgba(212,163,56,0.2)]"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setIsAuthOpen(false)}
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/90 text-[#4a340e] shadow-soft transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-[#d4a338]/30 bg-gradient-to-r from-[#faeccd] via-[#f7e4b5] to-[#faeccd] p-6 sm:p-8 text-[#4a340e]">
              <span className="section-eyebrow">Artisan Account</span>
              <h3 className="mt-2 font-serif text-3xl text-[#241705] font-bold">
                {mode === 'login' ? 'Welcome Back' : 'Join Atelier NP Circle'}
              </h3>
              <p className="mt-1 text-xs text-[#5e4318] sm:text-sm font-medium">
                Save bespoke wishlists, track handmade shipments, and connect directly with creators.
              </p>

              {/* Mode Tabs */}
              <div className="mt-5 flex rounded-full border border-[#d4a338]/30 bg-white/60 p-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 rounded-full py-1.5 text-xs font-bold transition ${
                    mode === 'login' ? 'bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] shadow-sm' : 'text-[#4a340e] hover:text-[#1a1204]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 rounded-full py-1.5 text-xs font-bold transition ${
                    mode === 'register' ? 'bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] shadow-sm' : 'text-[#4a340e] hover:text-[#1a1204]'
                  }`}
                >
                  Create Account
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#241705]">Full Name</label>
                <input
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Maya Lin"
                  className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#241705]">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="maya@example.com"
                  className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#241705]">Password</label>
                <input
                  type="password"
                  required
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 py-3 text-xs"
                >
                  {mode === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {mode === 'login' ? 'Sign In to Account' : 'Create Artisan Account'}
                </button>

                <button
                  type="button"
                  onClick={handleDemoFill}
                  title="Auto-fill demo maker account"
                  className="rounded-full border border-[#d4a338]/35 bg-[#e5be5e]/20 px-3.5 text-xs font-bold text-[#4a340e] transition hover:bg-[#e5be5e]"
                >
                  Demo Fill
                </button>
              </div>

              {user && (
                <div className="border-t border-[#d4a338]/25 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setIsAuthOpen(false)
                    }}
                    className="w-full text-center text-xs font-bold text-rose-500 hover:underline"
                  >
                    Log Out of Current Session ({user.name})
                  </button>
                </div>
              )}

              <div className="border-t border-[#d4a338]/25 pt-3 text-center">
                <p className="text-[11px] text-[#5e4318]">
                  Looking for creator & inventory management?{' '}
                  <a
                    href="/admin/login"
                    onClick={() => setIsAuthOpen(false)}
                    className="font-bold text-[#8c5f0b] underline hover:text-[#241705] transition"
                  >
                    Open Admin Login Portal →
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}