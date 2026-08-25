"use client"

import { useState } from 'react'
import { CheckCircle2, Mail, Send, Sparkles } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useMarketplace } from '../context/MarketplaceContext'

export default function Newsletter() {
  const { ref, isVisible } = useRevealOnScroll()
  const { showToast, applyCouponCode } = useMarketplace()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubscribed(true)
    showToast({
      title: 'Welcome to the Circle! 🌸',
      message: 'Here is your $5 welcome coupon: WELCOME5',
      type: 'success',
    })
  }

  const handleApplyWelcome = () => {
    applyCouponCode('WELCOME5')
  }

  return (
    <section id="newsletter" ref={ref} className={`section-shell py-14 sm:py-20 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-white/95 via-blossom/30 to-sand/60 p-8 sm:p-12 lg:p-16 shadow-glass">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-peach/40 blur-3xl pointer-events-none" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-clay" /> Artisan Circle
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl text-cocoa">
              Join the Soft Handmade Circle
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-cocoa-muted sm:text-lg">
              Get notified of limited batch drops, maker studio journals, and seasonal DIY tutorials. Plus receive a <strong className="text-clay">$5.00 voucher</strong> on your first order.
            </p>
          </div>

          <div>
            {isSubscribed ? (
              <div className="rounded-3xl border border-white/90 bg-white/95 p-6 shadow-soft text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint/50 text-moss">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-serif text-2xl text-cocoa">You're on the list! 🌸</h3>
                <p className="mt-1 text-xs text-cocoa-muted">
                  Use coupon code below at checkout for $5.00 off:
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="rounded-xl border border-dashed border-clay bg-clay-light/50 px-3.5 py-1.5 font-mono text-sm font-bold text-clay">
                    WELCOME5
                  </span>
                  <button
                    type="button"
                    onClick={handleApplyWelcome}
                    className="rounded-xl bg-cocoa px-3 py-1.5 text-xs font-bold text-white transition hover:bg-clay"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-14 w-full rounded-full border border-white/90 bg-white/90 pl-12 pr-5 text-sm text-cocoa outline-none shadow-sm transition placeholder:text-cocoa-muted/60 focus:border-clay focus:ring-2 focus:ring-clay/20"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary h-14 px-8 text-sm font-bold shadow-glow shrink-0"
                >
                  <Send className="h-4 w-4" />
                  Subscribe & Get $5
                </button>
              </form>
            )}
            {!isSubscribed && (
              <p className="mt-2.5 text-center text-[11px] text-cocoa-muted sm:text-left">
                🔒 We respect your privacy. Zero spam, unsubscribe anytime.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

