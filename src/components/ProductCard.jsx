"use client"

import { motion } from 'framer-motion'
import { Eye, Heart, MessageCircle, ShoppingBag, Star } from 'lucide-react'
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
  const formattedPrice = product.price
    ? String(product.price).replace(/^[?,]/, '\u20B9')
    : '\u20B9999'

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#d4a338]/35 bg-gradient-to-b from-[#fffdfa]/95 via-[#fcf6e8]/95 to-[#f8ecce]/95 p-4 shadow-[0_12px_32px_rgba(133,90,16,0.10),0_0_15px_rgba(212,163,56,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-[#b8860b] hover:shadow-[0_20px_45px_rgba(133,90,16,0.18),0_0_25px_rgba(212,163,56,0.25)] ${className}`}
    >
      <div>
        {/* Image Container with Floating Action Pills */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-[#fbf4e4] border border-[#d4a338]/25">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#241705]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {(product.badges || ['Handmade']).slice(0, 2).map((badge, idx) => (
              <span
                key={badge}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                  idx === 0
                    ? 'border-[#d4a338]/40 bg-white/95 text-[#241705]'
                    : 'border-[#d4a338]/30 bg-white/85 text-[#8c5f0b]'
                }`}
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
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d4a338]/30 bg-white/90 text-[#4a340e] shadow-soft backdrop-blur-md transition duration-200 hover:scale-110 hover:border-rose-500/50 hover:bg-rose-50 hover:text-rose-500"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-[#63430b]'
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
              className="grid h-9 w-9 place-items-center rounded-full border border-[#d4a338]/30 bg-white/90 text-[#4a340e] shadow-soft backdrop-blur-md transition duration-200 hover:scale-110 hover:border-[#b8860b] hover:bg-white hover:text-[#1a1204]"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] py-2.5 text-xs font-bold text-[#1a1204] shadow-[0_4px_16px_rgba(200,145,34,0.35)] backdrop-blur-md transition hover:scale-105"
            >
              <ShoppingBag className="h-3.5 w-3.5 stroke-[2.2]" />
              Quick Add to Bag
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3.5 px-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c5f0b]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#b8860b] text-[#b8860b]" />
              <span className="text-xs font-bold text-[#241705]">{product.rating ?? '4.9'}</span>
              <span className="text-[10px] text-[#73562a]">({product.reviews ?? 48})</span>
            </div>
          </div>

          <h3
            onClick={onQuickView}
            className="mt-1 cursor-pointer truncate font-serif text-xl font-bold text-[#241705] transition hover:text-[#8c5f0b]"
          >
            {product.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#5e4318]">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-4 border-t border-[#d4a338]/25 px-1 pt-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[#73562a] block uppercase tracking-wider">Artisan Direct</span>
            <p className="text-xl font-extrabold text-[#241705]">
              {formattedPrice}
            </p>
          </div>

          <div className="flex gap-1.5">
            <a
              href={`https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(product.title)}%20%E2%80%94%20please%20confirm%20availability!`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] px-4 py-2 text-xs font-bold text-[#1a1204] transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_16px_rgba(200,145,34,0.3)] flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5 stroke-[2.2]" /> Order Now
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
