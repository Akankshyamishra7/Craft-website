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
  const [selectedCategory, setSelectedCategory] = useState('All')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isQuickSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isQuickSearchOpen])

  const searchResults = useMemo(() => {
    let list = products
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    }
    const cleanQuery = query.trim().toLowerCase()
    if (!cleanQuery) {
      return list.slice(0, 8)
    }

    return list.filter((p) =>
      [p.title, p.category, p.description, ...(p.badges || [])]
        .join(' ')
        .toLowerCase()
        .includes(cleanQuery)
    )
  }, [products, query, selectedCategory])

  return (
    <AnimatePresence>
      {isQuickSearchOpen ? (
        <motion.div
          key="quick-search-backdrop"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#241705]/60 p-4 pt-16 backdrop-blur-md sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsQuickSearchOpen(false)}
        >
          <motion.div
            key="quick-search-card"
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#d4a338]/40 bg-[#fffdfa] shadow-[0_25px_60px_rgba(133,90,16,0.25),0_0_30px_rgba(212,163,56,0.2)]"
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-[#d4a338]/25 p-4 sm:p-5">
              <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c5f0b]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search handmade bangles, candles, soaps, resin..."
                className="h-12 w-full rounded-2xl border border-[#d4a338]/30 bg-[#fbf4e4] pl-12 pr-12 text-base text-[#241705] outline-none placeholder:text-[#9c7b4c] focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30 font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-[#73562a] transition hover:text-[#241705]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Category Filter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#d4a338]/20 bg-white/80 px-4 py-2.5 sm:px-6">
              {['All', 'Jewelry', 'Home Decor', 'Beauty', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] shadow-sm'
                      : 'bg-[#fbf4e4] text-[#4a340e] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Suggestions & Results List */}
            <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-6 bg-[#fdf9f0]">
              <div className="flex items-center justify-between pb-3 text-xs font-bold uppercase tracking-wider text-[#5e4318]">
                <span>{query ? `Found ${searchResults.length} crafts` : 'Trending Artisan Pieces'}</span>
                <span className="text-[10px] text-[#8c5f0b] font-semibold">Press ESC to exit</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-xl text-[#241705] font-bold">No handmade pieces found for "{query}"</p>
                  <p className="mt-1 text-xs text-[#5e4318]">Try searching for "resin", "candles", "silk", or "decor".</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {searchResults.map((product) => {
                    const wish = isWishlisted(product.id)
                    return (
                      <div
                        key={product.id}
                        className="group flex items-center gap-3 rounded-2xl border border-[#d4a338]/30 bg-white p-2.5 shadow-sm transition hover:border-[#b8860b] hover:shadow-soft"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          onError={(e) => {
                            e.currentTarget.src = fallbackCraftImage
                          }}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover bg-[#fbf4e4]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[#241705]">{product.title}</p>
                          <p className="text-[10px] uppercase tracking-wider text-[#8c5f0b] font-bold">{product.category}</p>
                          <p className="mt-0.5 text-xs font-extrabold text-[#241705]">{product.price}</p>
                        </div>

                        <div className="flex flex-col gap-1 pr-1">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="grid h-7 w-7 place-items-center rounded-full bg-[#fbf4e4] text-[#4a340e] transition hover:text-rose-500"
                          >
                            <Heart className={`h-3.5 w-3.5 ${wish ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(product, 1)
                              setIsQuickSearchOpen(false)
                            }}
                            className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] transition hover:brightness-110 shadow-sm"
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
