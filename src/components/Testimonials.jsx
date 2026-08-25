"use client"

import { CheckCircle2, Heart, Star } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const TESTIMONIALS_DATA = [
  {
    name: 'Maya Chen',
    role: 'Verified Buyer • Silk Bangles Collector',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote:
      'The silk bangles and kundan earrings arrived in gorgeous velvet-lined packaging. The craftsmanship feels like high-end boutique couture at an accessible price.',
    rating: 5,
    craft: 'Silk Thread Bangles Set',
  },
  {
    name: 'Lena Ortiz',
    role: 'Verified Buyer • Interior Stylist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quote:
      'The resin coaster set has the most luminous botanical pressed flowers. It instantly elevated my coffee table and made an unforgettable housewarming gift!',
    rating: 5,
    craft: 'Pressed Botanical Resin Tray',
  },
  {
    name: 'Iris Bennett',
    role: 'Verified Buyer • Gift Curator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote:
      'Ordering bespoke custom items with custom engravings was so seamless. The seller kept me updated and the hand-poured candle smells like pure lavender meadow.',
    rating: 5,
    craft: 'Custom Botanical Candle',
  },
]

export default function Testimonials() {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="about" ref={ref} className={`section-shell py-14 sm:py-20 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible space-y-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">
            <Heart className="h-3.5 w-3.5 text-clay" /> Collector Love
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl text-cocoa">Loved by Handmade Lovers Worldwide</h2>
          <p className="mx-auto mt-3 text-xs leading-6 text-cocoa-muted sm:text-base">
            Read authentic reviews from collectors who cherish thoughtful artisan craftsmanship.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <article
              key={idx}
              className="glass-card-hover flex flex-col justify-between rounded-[2.2rem] p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-mint/50 px-2.5 py-0.5 text-[10px] font-bold text-moss">
                    <CheckCircle2 className="h-3 w-3" /> Verified Purchase
                  </span>
                </div>

                <p className="mt-4 font-serif text-lg italic leading-7 text-cocoa sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-sand/60 pt-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full border border-white object-cover shadow-soft"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-cocoa">{t.name}</h4>
                    <p className="text-[11px] text-cocoa-muted">{t.role}</p>
                  </div>
                </div>
                {t.craft && (
                  <span className="hidden sm:inline-block rounded-full bg-sand/40 px-2.5 py-1 text-[10px] font-bold text-clay">
                    {t.craft}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

