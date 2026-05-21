"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogIn, UserCircle2, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'

function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, login, user, logout } = useMarketplace()
  const [formState, setFormState] = useState(() => ({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  }))

  return (
    <AnimatePresence>
      {isAuthOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa/40 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key={user?.email ?? 'guest'}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-cream shadow-lift"
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <button
              type="button"
              aria-label="Close login modal"
              onClick={() => setIsAuthOpen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(247,223,210,0.92))] px-6 py-6 sm:px-8">
              <p className="section-eyebrow">Account</p>
              <h3 className="mt-2 text-3xl">Login to continue shopping</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-cocoa/70">
                Keep your wishlist and marketplace checkout ready across refreshes with local storage.
              </p>
            </div>

            <form
              className="space-y-4 px-6 py-6 sm:px-8"
              onSubmit={(event) => {
                event.preventDefault()
                login(formState)
                setIsAuthOpen(false)
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-cocoa">Name</span>
                <input
                  value={formState.name}
                  onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                  className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-cocoa">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                  className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-cocoa">Password</span>
                <input
                  type="password"
                  value={formState.password}
                  onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
                  className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                  placeholder="Enter password"
                  required
                />
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </button>
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setIsAuthOpen(false)
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-6 py-3 text-sm font-semibold text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <UserCircle2 className="h-4 w-4" />
                    Logout
                  </button>
                ) : null}
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default AuthModal