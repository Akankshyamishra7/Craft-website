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
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-emerald-500/25 bg-gradient-to-b from-[#071518]/90 to-[#03090b]/95 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,160,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/70 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(0,245,160,0.3)] ${className}`}
    >
      <div>
        {/* Image Container with Floating Action Pills */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-[#020608] border border-emerald-500/20">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#020608]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {(product.badges || ['Handmade']).slice(0, 2).map((badge, idx) => (
              <span
                key={badge}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm ${
                  idx === 0
                    ? 'border-emerald-400/50 bg-emerald-950/85 text-[#00f5a0]'
                    : 'border-amber-400/50 bg-amber-950/85 text-amber-300'
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
              className="grid h-9 w-9 place-items-center rounded-full border border-emerald-500/30 bg-[#03080a]/90 text-slate-200 shadow-soft backdrop-blur-md transition duration-200 hover:scale-110 hover:border-rose-500/60 hover:bg-[#1a0a0f]"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-300'
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
              className="grid h-9 w-9 place-items-center rounded-full border border-emerald-500/30 bg-[#03080a]/90 text-slate-200 shadow-soft backdrop-blur-md transition duration-200 hover:scale-110 hover:border-emerald-400 hover:text-[#00f5a0]"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00f5a0] to-[#10b981] py-2.5 text-xs font-black text-slate-950 shadow-[0_0_20px_rgba(0,245,160,0.6)] backdrop-blur-md transition hover:scale-105"
            >
              <ShoppingBag className="h-3.5 w-3.5 stroke-[2.5]" />
              Quick Add to Bag
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3.5 px-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{product.rating ?? '4.9'}</span>
              <span className="text-[10px] text-slate-400">({product.reviews ?? 48})</span>
            </div>
          </div>

          <h3
            onClick={onQuickView}
            className="mt-1 cursor-pointer truncate font-serif text-xl font-bold text-white transition hover:text-[#00f5a0]"
          >
            {product.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-4 border-t border-emerald-500/20 px-1 pt-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Artisan Direct</span>
            <p className="text-xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]">
              {formattedPrice}
            </p>
          </div>

          <div className="flex gap-1.5">
            <a
              href={`https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(product.title)}%20%E2%80%94%20please%20confirm%20availability!`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-[#00f5a0] to-[#10b981] px-4 py-2 text-xs font-black text-slate-950 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,245,160,0.6)] flex items-center gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5 stroke-[2.5]" /> Order Now
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
