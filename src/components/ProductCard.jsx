"use client"

import { motion } from 'framer-motion'
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react'
import { fallbackCraftImage } from '../utils/fallbackImage'

export default function ProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
  onBuyNow,
  className = '',
}) {

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-3.5 shadow-soft backdrop-blur-md transition-shadow duration-300 hover:shadow-lift hover:border-white ${className}`}
    >
      <div>
        {/* Image Container with Floating Action Pills */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-sand/30">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = fallbackCraftImage
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {(product.badges || ['Handmade']).slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-cocoa shadow-soft backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Floating Actions (Wishlist & Quick View) */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button
              type="button"
              aria-pressed={isWishlisted}
              aria-label={`Save ${product.title} to wishlist`}
              onClick={(e) => {
                e.stopPropagation()
                onWishlistToggle()
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/95 text-cocoa shadow-soft backdrop-blur-md transition duration-200 hover:scale-110 hover:bg-white"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-cocoa/70'
                }`}
              />
            </button>
            <button
              type="button"
              aria-label={`Quick view ${product.title}`}
              onClick={(e) => {
                e.stopPropagation()
                onQuickView()
              }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/95 text-cocoa shadow-soft backdrop-blur-md transition duration-200 hover:scale-110 hover:bg-white"
            >
              <Eye className="h-4 w-4 text-cocoa/80" />
            </button>
          </div>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-cocoa/95 py-2.5 text-xs font-bold text-white shadow-lift backdrop-blur-md transition hover:bg-clay"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add to Bag
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3.5 px-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-moss">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-cocoa">{product.rating ?? '4.9'}</span>
              <span className="text-[10px] text-cocoa-muted">({product.reviews ?? 48})</span>
            </div>
          </div>

          <h3
            onClick={onQuickView}
            className="mt-1 cursor-pointer truncate font-serif text-xl font-bold text-cocoa transition hover:text-clay"
          >
            {product.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-cocoa-muted">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-4 border-t border-sand/50 px-1.5 pt-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-medium text-cocoa-muted">Artisan Direct</span>
            <p className="text-lg font-extrabold text-clay">{product.price}</p>
          </div>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onBuyNow(product, 1)}
              className="rounded-full bg-sand/60 px-3.5 py-1.5 text-xs font-bold text-cocoa transition hover:bg-clay hover:text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

