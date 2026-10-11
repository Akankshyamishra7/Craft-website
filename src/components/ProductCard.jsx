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
    ? String(product.price).replace(/^[?,]/, '₹')
    : '₹999'

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#DFCFA6]/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/80 p-4 shadow-[0_10px_28px_rgba(180,135,45,0.06),0_1px_3px_rgba(220,185,110,0.12)] transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-[0_18px_40px_rgba(180,135,45,0.12),0_0_20px_rgba(235,200,100,0.15)] ${className}`}
    >
      <div>
        {/* Image Container with Floating Action Pills */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-[#F7F2E6] border border-[#E8DEC7]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {(product.badges || ['Handmade']).slice(0, 2).map((badge, idx) => (
              <span
                key={badge}
                className="rounded-full border border-[#DFCFA6]/60 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#141414] backdrop-blur-md shadow-sm"
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
              className="grid h-9 w-9 place-items-center rounded-full border border-[#DFCFA6]/60 bg-white/95 text-[#141414] shadow-sm backdrop-blur-md transition duration-200 hover:scale-110 hover:border-rose-500/50 hover:bg-rose-50 hover:text-rose-500"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-[#141414]'
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
              className="grid h-9 w-9 place-items-center rounded-full border border-[#DFCFA6]/60 bg-white/95 text-[#141414] shadow-sm backdrop-blur-md transition duration-200 hover:scale-110 hover:border-[#141414] hover:bg-white"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#141414] py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:bg-[#2C2C2C]"
            >
              <ShoppingBag className="h-3.5 w-3.5 stroke-[2.2]" />
              Quick Add to Bag
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3.5 px-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#141414] text-[#141414]" />
              <span className="text-xs font-bold text-[#141414]">{product.rating ?? '4.9'}</span>
              <span className="text-[10px] text-[#7A7369]">({product.reviews ?? 48})</span>
            </div>
          </div>

          <h3
            onClick={onQuickView}
            className="mt-1 cursor-pointer truncate font-serif text-xl font-bold text-[#141414] transition hover:text-[#5A554E]"
          >
            {product.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#5A554E]">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="mt-4 border-t border-[#DFCFA6]/50 px-1 pt-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[#8C827A] block uppercase tracking-wider">Artisan Direct</span>
            <p className="text-xl font-extrabold text-[#141414]">
              {formattedPrice}
            </p>
          </div>

          <div className="flex gap-1.5">
            <a
              href={`https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(product.title)}%20%E2%80%94%20please%20confirm%20availability!`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#141414] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:bg-[#2C2C2C] flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="h-3.5 w-3.5 stroke-[2.2]" /> Order Now
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
