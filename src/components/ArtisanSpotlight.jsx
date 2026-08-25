"use client"

import { Award, MapPin, Star } from 'lucide-react'
import { fallbackCraftImage } from '../utils/fallbackImage'

const ARTISANS = [
  {
    id: 1,
    name: 'Ananya & Maya Studio',
    role: 'Silk Thread & Kundan Masters',
    location: 'Jaipur & California',
    experience: '8+ Years Crafting',
    rating: 4.96,
    reviews: 412,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80',
    bio: 'Preserving ancient silk-wrapping techniques while modernizing with blush tones and minimalist brass framing.',
    badges: ['Verified Master Maker', 'Eco-Packaging'],
  },
  {
    id: 2,
    name: 'Clara & Fern Botanicals',
    role: 'Pressed Florals & UV Resin Artist',
    location: 'Portland, OR',
    experience: '5+ Years Crafting',
    rating: 4.98,
    reviews: 680,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80',
    bio: 'Hand-foraging wild meadow blooms, pressing for 6 weeks, and casting in crystalline UV resin to preserve nature.',
    badges: ['Top Rated Artisan', '100% Hand-Foraged'],
  },
  {
    id: 3,
    name: 'Aiden & Co. Apothecary',
    role: 'Hand-Poured Botanical Candles',
    location: 'Burlington, VT',
    experience: '6+ Years Crafting',
    rating: 4.94,
    reviews: 520,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=600&q=80',
    bio: 'Small-batch soy candles poured at low temperatures with pure wooden wicks, therapeutic essential oils, and dried buds.',
    badges: ['Clean Burn Certified', 'Zero-Plastic'],
  },
]

export default function ArtisanSpotlight() {
  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="reveal is-visible space-y-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <Award className="h-3.5 w-3.5 text-clay" /> Meet the Makers
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl text-cocoa">
            Real Craftspeople Behind Every Creation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa-muted sm:text-lg">
            Every piece in the Crafty marketplace is designed and sculpted by independent artisans. When you buy, you directly support their creative studios.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTISANS.map((artisan) => (
            <article
              key={artisan.id}
              className="glass-card-hover group overflow-hidden rounded-[2.2rem] p-5"
            >
              <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-sand/30">
                <img
                  src={artisan.cover}
                  alt={artisan.name}
                  onError={(e) => {
                    e.currentTarget.src = fallbackCraftImage
                  }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-clay-light" /> {artisan.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-amber-300" /> {artisan.rating} ({artisan.reviews})
                  </span>
                </div>
              </div>

              <div className="relative -mt-7 px-2">
                <div className="flex items-end justify-between">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-soft"
                  />
                  <span className="rounded-full bg-sand/70 px-3 py-1 text-[11px] font-bold text-cocoa">
                    {artisan.experience}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif text-2xl font-bold text-cocoa">{artisan.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-clay">
                    {artisan.role}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-cocoa-muted line-clamp-3">
                    {artisan.bio}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-sand/60 pt-3.5">
                  {artisan.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-mint/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-moss"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
