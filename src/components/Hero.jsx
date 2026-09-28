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
      <div className="reveal is-visible relative overflow-hidden rounded-[2.5rem] border border-[#d4a338]/35 bg-gradient-to-b from-[#fffcf5]/95 via-[#fcf5e5]/95 to-[#f7e8ce]/90 p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_rgba(133,90,16,0.12),0_0_35px_rgba(212,163,56,0.15)] backdrop-blur-2xl">
        {/* Subtle Light Gold Glow Spheres */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#e5be5e]/25 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-[#f5dfad]/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#ebd29b]/25 blur-3xl pointer-events-none" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="section-eyebrow">
                <Sparkles className="h-4 w-4 text-[#8c5f0b] animate-pulse" /> Handcrafted with Soul
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4a338]/35 bg-[#e5be5e]/15 px-3.5 py-1 text-xs font-bold text-[#4a340e] shadow-sm">
                <Users className="h-3.5 w-3.5" /> 240+ Verified Makers
              </span>
            </div>

            <h1 className="mt-6 text-5xl leading-[1.08] tracking-tight text-[#241705] sm:text-6xl lg:text-7xl font-serif font-bold">
              Where Pure Craft <br />
              <span className="italic font-normal bg-gradient-to-r from-[#b8860b] via-[#8c5f0b] to-[#b8860b] bg-clip-text text-transparent drop-shadow-sm">
                Meets Modern Luxury.
              </span>
            </h1>

            <p className="mt-6 text-base leading-8 text-[#5e4318] sm:text-lg font-medium">
              A curated boutique marketplace connecting discerning collectors with independent creators. Discover bespoke silk jewelry, pressed floral resin, clean aromatherapy, and keepsake gifts.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="btn-primary py-4 px-8 text-base hover:scale-105"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </a>

              <a
                href="#customize"
                className="btn-secondary py-4 px-7 text-sm font-bold"
              >
                <Sparkles className="h-4 w-4 text-[#8c5f0b]" />
                Custom Craft Studio
              </a>
            </div>

            {/* Social Proof Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#d4a338]/25 pt-6">
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
                      className="h-9 w-9 rounded-full border-2 border-[#d4a338]/50 object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-0.5 text-[#b8860b]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#b8860b] text-[#b8860b]" />
                    ))}
                  </div>
                  <p className="font-bold text-[#241705]">4.9/5 &#8226; 3,400+ Verified Reviews</p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-[#d4a338]/25 sm:block" />

              <div className="text-xs font-semibold text-[#5e4318]">
                <p className="font-bold text-[#241705] flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-[#8c5f0b]" /> 100% Eco Packaging
                </p>
                <p className="text-[#73562a]">Biodegradable boxes & honeycomb wrap</p>
              </div>
            </div>
          </div>

          {/* Interactive Floating Showcase */}
          <div className="relative mx-auto h-[460px] w-full max-w-[540px] lg:h-[520px]">
            {/* Center Artisan Ambient Disc */}
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-[#fff7e2] via-[#faeed0] to-[#ecd39b] p-6 border border-[#d4a338]/40 shadow-[0_0_35px_rgba(212,163,56,0.15)] backdrop-blur-xl" />

            {/* Showcase Floating Cards */}
            {showcaseItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`absolute overflow-hidden rounded-[2rem] border border-[#d4a338]/35 bg-white/95 p-2.5 shadow-[0_15px_35px_rgba(133,90,16,0.15),0_0_15px_rgba(212,163,56,0.12)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-[#b8860b] ${item.className}`}
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
                  <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-full bg-white/95 border border-[#d4a338]/35 px-3 py-1.5 text-[10px] font-bold text-[#241705] shadow-sm backdrop-blur-md">
                    <span className="truncate max-w-[90px]">{item.title}</span>
                    <span className="text-[#8c5f0b] font-black">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Floating Center Pill */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a338]/40 bg-white/95 px-6 py-4 text-center shadow-[0_10px_30px_rgba(133,90,16,0.15)] backdrop-blur-2xl animate-floaty">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-[#fff3cf] to-[#e8bc57] text-[#1a1204] font-black text-sm">
                  ★
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c5f0b]">Limited Drop</p>
                  <p className="font-serif text-lg font-bold text-[#241705]">Spring Artisan Edition</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Perks Row */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 border-t border-[#d4a338]/25 pt-8 sm:grid-cols-4">
          {[
            { icon: HeartHandshake, title: 'Direct from Makers', desc: 'Zero middlemen markup' },
            { icon: Sparkles, title: 'Bespoke Customization', desc: 'Engraving & color choices' },
            { icon: PackageCheck, title: 'Eco-Friendly Wrap', desc: 'Plastic-free boutique pack' },
            { icon: ShieldCheck, title: 'Artisan Guarantee', desc: '100% safe transit or refund' },
          ].map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-[#d4a338]/25 bg-white/80 p-3.5 shadow-sm transition-all duration-300 hover:border-[#b8860b] hover:bg-white"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e5be5e]/20 border border-[#d4a338]/35 text-[#8c5f0b]">
                <perk.icon className="h-5 w-5 text-[#8c5f0b]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#241705]">{perk.title}</p>
                <p className="text-[11px] text-[#73562a]">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
