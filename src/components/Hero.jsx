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
  Leaf,
} from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { fallbackCraftImage } from '../utils/fallbackImage'

const showcaseItems = [
  {
    title: 'Evil Eye Mandala Pendant',
    price: '\u20B91,599',
    category: 'Handmade Jewelry',
    image: '/products/atelier-evil-eye-pendant.jpg',
    className: 'top-2 left-0 sm:left-4 -rotate-6 w-36 sm:w-44',
  },
  {
    title: 'Atelier NP DIY Paint Kit',
    price: '\u20B91,449',
    category: 'DIY Crafts',
    image: '/products/atelier-diy-paint-kit-sea.jpg',
    className: 'top-8 right-0 sm:right-2 rotate-6 w-40 sm:w-48',
  },
  {
    title: 'Ruby Initial Keychains',
    price: '\u20B91,299',
    category: 'Accessories',
    image: '/products/atelier-ruby-glitter-keychains.jpg',
    className: 'bottom-2 left-6 -rotate-3 w-36 sm:w-44',
  },
]

export default function Hero() {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="home" ref={ref} className={`section-shell pt-4 sm:pt-8 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible relative overflow-hidden rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-b from-[#081617]/90 via-[#040a0c]/95 to-[#020506] p-6 sm:p-10 lg:p-14 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,245,160,0.12)] backdrop-blur-2xl">
        {/* Luminous Glow Spheres */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="section-eyebrow">
                <Sparkles className="h-4 w-4 text-emerald-300 animate-pulse" /> Handcrafted with Soul
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1 text-xs font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Users className="h-3.5 w-3.5" /> 240+ Verified Makers
              </span>
            </div>

            <h1 className="mt-6 text-5xl leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl font-serif">
              Where Pure Craft <br />
              <span className="italic font-normal bg-gradient-to-r from-[#00f5a0] via-[#2dd4bf] to-[#fbbf24] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,245,160,0.3)]">
                Meets Modern Luxury.
              </span>
            </h1>

            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              A curated boutique marketplace connecting discerning collectors with independent creators. Discover bespoke silk jewelry, pressed floral resin, clean aromatherapy, and keepsake gifts.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="btn-primary py-4 px-8 text-base shadow-[0_0_30px_rgba(0,245,160,0.55)] hover:scale-105"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </a>

              <a
                href="#customize"
                className="btn-secondary py-4 px-7 text-sm font-bold"
              >
                <Sparkles className="h-4 w-4 text-emerald-300" />
                Custom Craft Studio
              </a>
            </div>

            {/* Social Proof Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-emerald-500/20 pt-6">
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
                      className="h-9 w-9 rounded-full border-2 border-emerald-400/50 object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-white">4.9/5 &#8226; 3,400+ Verified Reviews</p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-emerald-500/20 sm:block" />

              <div className="text-xs font-semibold text-slate-300">
                <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-emerald-400" /> 100% Eco Packaging
                </p>
                <p className="text-slate-400">Biodegradable boxes & honeycomb wrap</p>
              </div>
            </div>
          </div>

          {/* Interactive Floating Showcase */}
          <div className="relative mx-auto h-[460px] w-full max-w-[540px] lg:h-[520px]">
            {/* Center Artisan Ambient Disc */}
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-emerald-500/20 via-teal-900/30 to-[#03080a]/90 p-6 border border-emerald-500/30 shadow-[0_0_50px_rgba(0,245,160,0.15)] backdrop-blur-xl" />

            {/* Showcase Floating Cards */}
            {showcaseItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`absolute overflow-hidden rounded-[2rem] border border-emerald-500/35 bg-[#051012]/90 p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(0,245,160,0.2)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(0,245,160,0.45)] ${item.className}`}
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
                  <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-full bg-[#03080a]/90 border border-emerald-500/30 px-3 py-1.5 text-[10px] font-bold text-white shadow-soft backdrop-blur-md">
                    <span className="truncate max-w-[90px]">{item.title}</span>
                    <span className="text-amber-400 font-extrabold">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Floating Center Pill */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/50 bg-[#061214]/95 px-6 py-4 text-center shadow-[0_0_30px_rgba(245,158,11,0.3)] backdrop-blur-2xl animate-floaty">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-sm">
                  ★
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">Limited Drop</p>
                  <p className="font-serif text-lg font-bold text-white">Spring Artisan Edition</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Perks Row */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 border-t border-emerald-500/20 pt-8 sm:grid-cols-4">
          {[
            { icon: HeartHandshake, title: 'Direct from Makers', desc: 'Zero middlemen markup', color: 'text-emerald-400' },
            { icon: Sparkles, title: 'Bespoke Customization', desc: 'Engraving & color choices', color: 'text-amber-300' },
            { icon: PackageCheck, title: 'Eco-Friendly Wrap', desc: 'Plastic-free boutique pack', color: 'text-teal-300' },
            { icon: ShieldCheck, title: 'Artisan Guarantee', desc: '100% safe transit or refund', color: 'text-emerald-400' },
          ].map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#061316]/70 p-3.5 shadow-sm transition-all duration-300 hover:border-emerald-400/60 hover:bg-[#0a2024]/90 hover:shadow-[0_0_20px_rgba(0,245,160,0.15)]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                <perk.icon className={`h-5 w-5 ${perk.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{perk.title}</p>
                <p className="text-[11px] text-slate-400">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
