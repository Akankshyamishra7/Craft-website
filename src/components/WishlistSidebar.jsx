"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Heart, ShoppingBag, Sparkles, Trash2, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { fallbackCraftImage } from '../utils/fallbackImage'

export default function WishlistSidebar() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistedProducts,
    toggleWishlist,
    addToCart,
    moveAllWishlistToCart,
  } = useMarketplace()

  return (
    <AnimatePresence>
      {isWishlistOpen ? (
        <>
          <motion.div
            key="wishlist-overlay"
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
          />

          <motion.aside
            key="wishlist-drawer"
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-[#E5E0D8] bg-[#FAF8F5] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-[#EAE5DC] bg-white px-6 py-5">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#141414] text-white font-extrabold">
                  <Heart className="h-5 w-5 fill-white text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#141414] font-bold">Saved Treasures</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C827A]">
                    {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close wishlist"
                onClick={() => setIsWishlistOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#141414] shadow-sm transition hover:bg-[#FAF8F5]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {wishlistedProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-[#DDD7CE] bg-white p-8 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#EFECE6] text-[#141414]">
                    <Heart className="h-8 w-8 text-[#141414]" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-[#141414]">No saved items yet</h4>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#5A554E]">
                    Click the heart icon on any handmade craft to save your favorite pieces here.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsWishlistOpen(false)}
                    className="btn-primary mt-6 text-xs uppercase tracking-wider"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistedProducts.map((product) => (
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-2xl border border-[#DFCFA6]/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/80 p-3.5 shadow-[0_4px_16px_rgba(180,135,45,0.05)] transition duration-300 hover:border-[#D4AF37]/80"
                    >
                      <div className="flex gap-3.5">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F7F2E6] border border-[#DFCFA6]/40">
                          <img
                            src={product.image}
                            alt={product.title}
                            onError={(e) => {
                              e.currentTarget.src = fallbackCraftImage
                            }}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="truncate font-serif text-lg font-bold text-[#141414]">{product.title}</h5>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                aria-label="Remove from wishlist"
                                className="text-[#8C827A] transition hover:text-rose-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C827A]">
                              {product.category}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="text-base font-extrabold text-[#141414]">{product.price}</span>
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(product, 1)
                              }}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#2C2C2C]"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {wishlistedProducts.length > 0 && (
              <div className="border-t border-[#EAE5DC] bg-white p-5 shadow-lg">
                <button
                  type="button"
                  onClick={moveAllWishlistToCart}
                  className="btn-primary w-full shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  Move All to Cart & Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
