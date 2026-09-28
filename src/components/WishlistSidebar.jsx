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
            className="fixed inset-0 z-[80] bg-[#241705]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
          />

          <motion.aside
            key="wishlist-drawer"
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-[#d4a338]/35 bg-[#fcf7ee] shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-[#d4a338]/25 bg-white/80 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e5be5e]/20 border border-[#d4a338]/35 text-[#8c5f0b]">
                  <Heart className="h-5 w-5 fill-[#8c5f0b]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#241705] font-bold">Saved Treasures</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c5f0b]">
                    {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close wishlist"
                onClick={() => setIsWishlistOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white text-[#4a340e] shadow-soft transition hover:bg-[#fbf4e4]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {wishlistedProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-[#d4a338]/35 bg-white/60 p-8 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e5be5e]/20 text-[#8c5f0b]">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-[#241705]">No saved items yet</h4>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#5e4318]">
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
                      className="group overflow-hidden rounded-2xl border border-[#d4a338]/30 bg-white/95 p-3.5 shadow-sm transition duration-300 hover:border-[#b8860b]"
                    >
                      <div className="flex gap-3.5">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#fbf4e4]">
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
                              <h5 className="truncate font-serif text-lg font-bold text-[#241705]">{product.title}</h5>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                aria-label="Remove from wishlist"
                                className="text-[#73562a] transition hover:text-rose-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c5f0b]">
                              {product.category}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="text-base font-extrabold text-[#241705]">{product.price}</span>
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(product, 1)
                              }}
                              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] px-3.5 py-1.5 text-xs font-bold text-[#1a1204] shadow-sm transition hover:brightness-110"
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
              <div className="border-t border-[#d4a338]/25 bg-white/95 p-5 shadow-dropdown backdrop-blur-md">
                <button
                  type="button"
                  onClick={moveAllWishlistToCart}
                  className="btn-primary w-full shadow-soft"
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
