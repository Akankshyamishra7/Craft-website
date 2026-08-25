"use client"

import { useState, useMemo, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Search, ShoppingBag, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { fallbackCraftImage } from '../utils/fallbackImage'

export default function QuickSearchModal() {
  const {
    isQuickSearchOpen,
    setIsQuickSearchOpen,
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useMarketplace()

  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isQuickSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isQuickSearchOpen])


  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase()
    if (!cleanQuery) {
      return products.slice(0, 6) // Top trending initial
    }

    return products.filter((p) =>
      [p.title, p.category, p.description, ...(p.badges || [])]
        .join(' ')
        .toLowerCase()
        .includes(cleanQuery)
    )
  }, [products, query])

  return (
    <AnimatePresence>
      {isQuickSearchOpen ? (
        <motion.div
          key="quick-search-backdrop"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-cocoa/45 p-4 pt-16 backdrop-blur-md sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsQuickSearchOpen(false)}
        >
          <motion.div
            key="quick-search-card"
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/90 bg-cream shadow-2xl"
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-sand/70 p-4 sm:p-5">
              <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search handmade bangles, candles, soaps, resin..."
                className="h-12 w-full rounded-2xl border border-white/80 bg-white/90 pl-12 pr-12 text-base text-cocoa outline-none placeholder:text-cocoa-muted/60 focus:ring-2 focus:ring-clay/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-cocoa-muted transition hover:text-cocoa"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Suggestions & Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
              <div className="flex items-center justify-between pb-3 text-xs font-bold uppercase tracking-wider text-cocoa-muted">
                <span>{query ? `Found ${searchResults.length} crafts` : 'Trending Artisan Pieces'}</span>
                <span className="text-[10px] text-moss">Press ESC to exit</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-xl text-cocoa">No handmade pieces found for "{query}"</p>
                  <p className="mt-1 text-xs text-cocoa-muted">Try searching for "resin", "candles", "silk", or "decor".</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {searchResults.map((product) => {
                    const wish = isWishlisted(product.id)
                    return (
                      <div
                        key={product.id}
                        className="group flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-2.5 shadow-sm transition hover:bg-white hover:shadow-soft"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          onError={(e) => {
                            e.currentTarget.src = fallbackCraftImage
                          }}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-cocoa">{product.title}</p>
                          <p className="text-[10px] uppercase tracking-wider text-moss">{product.category}</p>
                          <p className="mt-0.5 text-xs font-bold text-clay">{product.price}</p>
                        </div>
                        <div className="flex flex-col gap-1 pr-1">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="grid h-7 w-7 place-items-center rounded-full bg-sand/40 text-cocoa transition hover:text-rose-500"
                          >
                            <Heart className={`h-3.5 w-3.5 ${wish ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(product, 1)
                              setIsQuickSearchOpen(false)
                            }}
                            className="grid h-7 w-7 place-items-center rounded-full bg-cocoa text-white transition hover:bg-clay"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
