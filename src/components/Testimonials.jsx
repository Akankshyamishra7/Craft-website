"use client"

import { CheckCircle2, Heart, Star, Quote } from 'lucide-react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const TESTIMONIALS_DATA = [
  {
    name: 'Emma Thompson',
    role: 'Interior Designer & Studio Stylist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote:
      'Each piece feels meaningful, intentional, and full of heart. The craftsmanship is both beautiful and inspiring.',
    rating: 5,
    craft: 'Botanical Resin Tray',
  },
  {
    name: 'Maya Chen',
    role: 'Verified Buyer • Silk Bangles Collector',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quote:
      'The silk bangles and kundan earrings arrived in gorgeous velvet-lined packaging. The craftsmanship feels like high-end boutique couture.',
    rating: 5,
    craft: 'Silk Thread Bangles Set',
  },
  {
    name: 'Iris Bennett',
    role: 'Verified Buyer • Gift Curator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote:
      'Ordering bespoke custom items with custom engravings was so seamless. The seller kept me updated and the hand-poured candle smells heavenly.',
    rating: 5,
    craft: 'Custom Soy Candle',
  },
]

export default function Testimonials() {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="about" ref={ref} className={`section-shell py-16 sm:py-24 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible space-y-12">
        {/* Editorial Featured Quote (Matching top-left of reference image) */}
        <div className="mx-auto max-w-4xl text-center px-4 space-y-4">
          <div className="flex justify-center">
            <Quote className="h-10 w-10 text-[#DDD7CE] rotate-180" />
          </div>
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#141414] leading-snug uppercase">
            &ldquo;Each piece feels meaningful, intentional, and full of heart. The craftsmanship is both beautiful and inspiring.&rdquo;
          </blockquote>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C827A]">
            Emma Thompson &#8226; Interior Designer
          </p>
        </div>

        <div className="mx-auto max-w-2xl text-center pt-6">
          <span className="section-eyebrow">
            <Heart className="h-3.5 w-3.5 text-[#141414]" /> Collector Love
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-[#141414] font-serif font-bold">
            Loved by Handmade Lovers Worldwide
          </h2>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-[#5A554E]">
            Read authentic reviews from collectors who cherish thoughtful artisan craftsmanship.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-[2rem] border border-[#DFCFA6]/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/80 p-6 sm:p-7 shadow-[0_8px_24px_rgba(180,135,45,0.06)] transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-[#141414]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#141414]" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-[#FAF5E8] border border-[#DFCFA6]/60 px-2.5 py-0.5 text-[10px] font-bold text-[#141414]">
                    <CheckCircle2 className="h-3 w-3 text-[#141414]" /> Verified Purchase
                  </span>
                </div>

                <p className="mt-4 font-serif text-lg italic leading-relaxed text-[#141414] sm:text-xl font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E8DEC7] pt-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full border border-[#DDD7CE] object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#141414]">{t.name}</h4>
                    <p className="text-[11px] text-[#8C827A] font-medium">{t.role}</p>
                  </div>
                </div>
                {t.craft && (
                  <span className="hidden sm:inline-block rounded-full bg-[#FAF8F5] border border-[#DDD7CE] px-2.5 py-1 text-[10px] font-bold text-[#141414]">
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
