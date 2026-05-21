"use client"

import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

function Newsletter() {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="newsletter" ref={ref} className={`section-shell py-10 sm:py-14 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible soft-card overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(243,229,210,0.95))] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="section-eyebrow">Newsletter</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Join the soft handmade circle</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-cocoa/70 sm:text-lg">
              Get new drops, craft stories, and seasonal studio notes delivered with the same calm, curated feel as the shop.
            </p>
          </div>

          <form className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="h-14 flex-1 rounded-full border border-white/80 bg-white/80 px-5 text-sm text-cocoa outline-none transition placeholder:text-cocoa/45 focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
            />
            <button
              type="submit"
              className="h-14 rounded-full bg-cocoa px-6 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#4f3b2f] hover:shadow-lift"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
