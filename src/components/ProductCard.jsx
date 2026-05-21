"use client"

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Heart, Search, ShoppingBag, Star } from 'lucide-react'
import { fallbackCraftImage } from '../utils/fallbackImage'

function starCount(value = 4.8) {
  return Math.max(0, Math.min(5, Math.round(value)))
}

function ProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
  onBuyNow,
  className = '',
}) {
  const [quantity, setQuantity] = useState(1)
  const stars = useMemo(() => starCount(product.rating ?? 4.8), [product.rating])

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`group overflow-hidden rounded-[1.9rem] border border-white/80 bg-white/85 shadow-soft backdrop-blur ${className}`}
    >
      <div className="relative overflow-hidden p-3">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-sand/30">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = fallbackCraftImage
            }}
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {(product.badges || []).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/75 bg-white/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cocoa shadow-soft backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button
              type="button"
              aria-pressed={isWishlisted}
              aria-label={`Save ${product.title} to wishlist`}
              onClick={onWishlistToggle}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/92 text-cocoa shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-cocoa/80'}`} />
            </button>
            <button
              type="button"
              aria-label={`Quick view ${product.title}`}
              onClick={onQuickView}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/92 text-cocoa shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-white/92 px-3 py-2 text-xs font-semibold text-cocoa shadow-soft backdrop-blur">
            <span>{product.category}</span>
            <span>{product.price}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-5 pb-5 pt-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl leading-tight text-cocoa">{product.title}</h3>
          <p className="text-lg font-semibold text-clay">{product.price}</p>
        </div>

        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={`${product.id}-star-${index}`} className={`h-4 w-4 ${index < stars ? 'fill-amber-400 text-amber-400' : 'text-amber-200'}`} />
          ))}
          <span className="ml-2 text-xs font-semibold uppercase tracking-[0.2em] text-cocoa/55">
            {(product.reviews ?? 120) + ' reviews'}
          </span>
        </div>

        <p className="text-sm leading-6 text-cocoa/70">{product.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sand/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cocoa/70">
            Handmade
          </span>
          <span className="rounded-full bg-blush/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cocoa/70">
            {product.category}
          </span>
        </div>

        <div className="grid gap-3 rounded-[1.4rem] bg-cream/75 p-3 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 shadow-soft">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="grid h-8 w-8 place-items-center rounded-full bg-sand/60 text-cocoa transition hover:bg-sand"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center text-sm font-semibold text-cocoa">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((current) => current + 1)}
              className="grid h-8 w-8 place-items-center rounded-full bg-sand/60 text-cocoa transition hover:bg-sand"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, quantity)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-3 text-sm font-semibold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
        </div>

        <button
          type="button"
          onClick={() => onBuyNow(product, quantity)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]"
        >
          Buy Now
        </button>

        <button
          type="button"
          onClick={onQuickView}
          className="w-full text-sm font-semibold text-clay transition hover:text-cocoa"
        >
          Quick view details
        </button>
      </div>
    </motion.article>
  )
}

export default ProductCard
