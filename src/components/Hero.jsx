"use client"

import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { fallbackCraftImage } from '../utils/fallbackImage'

const decorations = [
  {
    title: 'Silk bangles',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
    className: 'left-0 top-10 w-28 -rotate-12 sm:w-36',
  },
  {
    title: 'Resin earrings',
    image:
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80',
    className: 'right-8 top-0 w-32 rotate-6 sm:w-40',
  },
  {
    title: 'Handmade candles',
    image:
      'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=900&q=80',
    className: 'left-10 bottom-4 w-28 rotate-12 sm:w-36',
  },
  {
    title: 'Wall hangings',
    image:
      'https://images.unsplash.com/photo-1513694203232-67d81f3dc7f7?auto=format&fit=crop&w=900&q=80',
    className: 'right-0 bottom-10 w-32 -rotate-6 sm:w-40',
  },
]

function Hero() {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="home" ref={ref} className={`section-shell pt-6 sm:pt-10 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible soft-card relative overflow-hidden bg-paper p-6 sm:p-8 lg:p-12">
        <div className="absolute inset-0 bg-[length:26px_26px] bg-texture opacity-35" />
        <div className="absolute -left-12 top-10 h-36 w-36 rounded-full bg-blossom/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sand/70 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Handcrafted marketplace</span>
            <h1 className="mt-4 max-w-xl text-5xl leading-none tracking-tight text-cocoa sm:text-6xl lg:text-7xl">
              Handmade Craft Collection
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cocoa/70 sm:text-xl">
              A premium Etsy-inspired craft marketplace for jewelry, decor, beauty DIY, and giftable handmade pieces.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="inline-flex items-center justify-center rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-[#c98055] hover:shadow-lift"
              >
                Explore the collection
              </a>
              <a
                href="#customize"
                className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/75 px-7 py-3.5 text-sm font-semibold text-cocoa shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Customize your craft
              </a>
              <div className="rounded-full border border-white/70 bg-white/65 px-5 py-3 text-sm font-medium text-cocoa/70 shadow-soft">
                Curated with care, made to be kept.
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-[560px] lg:h-[520px]">
            <div className="absolute inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),rgba(249,235,220,0.95)_55%,rgba(242,225,204,0.95))] shadow-soft" />
            <div className="absolute inset-8 rounded-[2.5rem] border border-white/70" />

            {decorations.map((item, index) => (
              <figure
                key={item.title}
                className={`absolute overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/80 p-2 shadow-soft transition duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lift ${item.className}`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(event) => {
                      event.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                  />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/85 px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-cocoa/75 backdrop-blur">
                    {item.title}
                  </figcaption>
                </div>
              </figure>
            ))}

            <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-center shadow-soft backdrop-blur animate-floaty">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moss">Limited drop</p>
                <p className="mt-3 font-serif text-3xl text-cocoa">Warm craft season</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
