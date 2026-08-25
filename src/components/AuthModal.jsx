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
    email: user?.email || 'maya@crafty.market',
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
      email: 'ananya.artisan@crafty.market',
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
            className="relative my-8 w-full max-w-md overflow-hidden rounded-[2.2rem] bg-cream shadow-2xl"
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
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa shadow-soft transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-sand/70 bg-gradient-to-r from-blossom/60 via-sand/50 to-peach/50 p-6 sm:p-8">
              <span className="section-eyebrow">Artisan Account</span>
              <h3 className="mt-2 font-serif text-3xl text-cocoa">
                {mode === 'login' ? 'Welcome Back' : 'Join Crafty Circle'}
              </h3>
              <p className="mt-1 text-xs text-cocoa-muted sm:text-sm">
                Save bespoke wishlists, track handmade shipments, and connect directly with creators.
              </p>

              {/* Mode Tabs */}
              <div className="mt-5 flex rounded-full border border-white/80 bg-white/70 p-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 rounded-full py-1.5 text-xs font-bold transition ${
                    mode === 'login' ? 'bg-cocoa text-white shadow-sm' : 'text-cocoa/70 hover:text-cocoa'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 rounded-full py-1.5 text-xs font-bold transition ${
                    mode === 'register' ? 'bg-cocoa text-white shadow-sm' : 'text-cocoa/70 hover:text-cocoa'
                  }`}
                >
                  Create Account
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
              <div>
                <label className="mb-1 block text-xs font-bold text-cocoa">Full Name</label>
                <input
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Maya Lin"
                  className="h-11 w-full rounded-xl border border-sand bg-white px-3.5 text-sm text-cocoa outline-none focus:border-clay"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-cocoa">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="maya@example.com"
                  className="h-11 w-full rounded-xl border border-sand bg-white px-3.5 text-sm text-cocoa outline-none focus:border-clay"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-cocoa">Password</label>
                <input
                  type="password"
                  required
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-sand bg-white px-3.5 text-sm text-cocoa outline-none focus:border-clay"
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
                  className="rounded-full border border-sand bg-sand/40 px-3.5 text-xs font-bold text-cocoa transition hover:bg-sand"
                >
                  Demo Fill
                </button>
              </div>

              {user && (
                <div className="border-t border-sand/70 pt-3">
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
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}