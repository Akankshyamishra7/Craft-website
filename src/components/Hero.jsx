"use client"

import { motion } from 'framer-motion'
import {
  ArrowRight,
  HeartHandshake,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { fallbackCraftImage } from '../utils/fallbackImage'

const showcaseItems = [
  {
    title: 'Silk Thread Bangles',
    price: '$24',
    category: 'Handmade Jewelry',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
    className: 'top-2 left-0 sm:left-4 -rotate-6 w-36 sm:w-44',
  },
  {
    title: 'Botanical Resin Coasters',
    price: '$32',
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
    className: 'top-8 right-0 sm:right-2 rotate-6 w-40 sm:w-48',
  },
  {
    title: 'Aromatherapy Soy Candle',
    price: '$22',
    category: 'Beauty DIY',
    image: 'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=800&q=80',
    className: 'bottom-2 left-6 -rotate-3 w-36 sm:w-44',
  },
]

export default function Hero() {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="home" ref={ref} className={`section-shell pt-4 sm:pt-8 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-paper p-6 sm:p-10 lg:p-14 shadow-glass">
        {/* Glow Spheres */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blossom/50 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-lilac/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-mint/40 blur-3xl pointer-events-none" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="section-eyebrow">
                <Sparkles className="h-3.5 w-3.5 text-clay" /> Handcrafted with Soul
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-mint/60 px-3 py-1 text-xs font-bold text-moss">
                <Users className="h-3 w-3" /> 240+ Verified Makers
              </span>
            </div>

            <h1 className="mt-5 text-5xl leading-[1.08] tracking-tight text-cocoa sm:text-6xl lg:text-7xl">
              Where Pure Craft <br />
              <span className="italic font-normal text-clay">Meets Modern Living.</span>
            </h1>

            <p className="mt-6 text-base leading-8 text-cocoa-muted sm:text-lg">
              A curated boutique marketplace connecting discerning collectors with independent creators. Discover bespoke silk jewelry, pressed floral resin, clean aromatherapy, and keepsake gifts.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="btn-primary py-4 px-8 text-base shadow-glow"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#customize"
                className="btn-secondary py-4 px-7 text-sm font-bold"
              >
                <Sparkles className="h-4 w-4 text-clay" />
                Custom Craft Studio
              </a>
            </div>

            {/* Social Proof Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-sand/70 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Artisan maker"
                      className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-cocoa">4.9/5 • 3,400+ Craft Reviews</p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-sand sm:block" />

              <div className="text-xs font-semibold text-cocoa-muted">
                <p className="font-bold text-moss">🌿 100% Eco Packaging</p>
                <p>Biodegradable boxes & honeycomb wrap</p>
              </div>
            </div>
          </div>

          {/* Interactive Floating Showcase */}
          <div className="relative mx-auto h-[460px] w-full max-w-[540px] lg:h-[520px]">
            {/* Center Artisan Disc */}
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-white/90 via-blossom/30 to-sand/60 p-6 shadow-soft backdrop-blur-md" />

            {/* Showcase Floating Cards */}
            {showcaseItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`absolute overflow-hidden rounded-[2rem] border border-white/90 bg-white/90 p-2.5 shadow-lift backdrop-blur-md transition duration-300 hover:scale-105 hover:shadow-glow ${item.className}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-cocoa shadow-soft backdrop-blur-md">
                    <span className="truncate">{item.title}</span>
                    <span className="text-clay">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Floating Center Pill */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/95 px-6 py-4 text-center shadow-lift backdrop-blur-xl animate-floaty">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-clay text-xs text-white">✿</span>
                <div className="text-left">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-moss">Limited Drop</p>
                  <p className="font-serif text-lg font-bold text-cocoa">Spring Artisan Edition</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Perks Row */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-sand/70 pt-8 sm:grid-cols-4">
          {[
            { icon: HeartHandshake, title: 'Direct from Makers', desc: 'Zero middlemen markup' },
            { icon: Sparkles, title: 'Bespoke Customization', desc: 'Engraving & color choices' },
            { icon: PackageCheck, title: 'Eco-Friendly Wrap', desc: 'Plastic-free boutique pack' },
            { icon: ShieldCheck, title: 'Artisan Guarantee', desc: '100% safe transit or refund' },
          ].map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/50 p-3 shadow-sm transition hover:bg-white"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand/40 text-clay">
                <perk.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-cocoa">{perk.title}</p>
                <p className="text-[11px] text-cocoa-muted">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

