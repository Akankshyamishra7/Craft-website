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
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-sm sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsQuickSearchOpen(false)}
        >
          <motion.div
            key="quick-search-card"
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-white shadow-[0_20px_60px_rgba(180,135,45,0.22)]"
            initial={{ scale: 0.96, y: -12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-[#DFCFA6]/60 bg-gradient-to-r from-[#FFFDF9] to-[#FAF6ED] p-4 sm:p-5">
              <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8860B]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search handmade bangles, candles, soaps, resin..."
                className="h-12 w-full rounded-2xl border border-[#DFCFA6]/80 bg-white pl-12 pr-12 text-base text-[#141414] outline-none placeholder:text-[#8C827A] transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-[#8C827A] transition hover:text-[#B8860B]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Category Filter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#DFCFA6]/40 bg-white px-4 py-2.5 sm:px-6">
              {['All', 'Jewelry', 'Home Decor', 'Beauty', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#1A120B] shadow-[0_2px_10px_rgba(212,175,55,0.3)] font-extrabold'
                      : 'border border-[#DFCFA6]/50 bg-[#FAF7F0] text-[#5A451A] hover:bg-[#FAF2DE] hover:border-[#D4AF37]/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Suggestions & Results List */}
            <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]">
              <div className="flex items-center justify-between pb-3 text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                <span>{query ? `Found ${searchResults.length} crafts` : 'Trending Artisan Pieces'}</span>
                <span className="text-[10px] text-[#B8860B] font-semibold">Press ESC to exit</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-xl text-[#141414] font-bold">No handmade pieces found for "{query}"</p>
                  <p className="mt-1 text-xs text-[#5A554E]">Try searching for "resin", "candles", "silk", or "decor".</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {searchResults.map((product) => {
                    const wish = isWishlisted(product.id)
                    return (
                      <div
                        key={product.id}
                        className="group flex items-center gap-3 rounded-2xl border border-[#DFCFA6]/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/90 p-2.5 shadow-sm transition hover:border-[#D4AF37]"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          onError={(e) => {
                            e.currentTarget.src = fallbackCraftImage
                          }}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover bg-[#F6F3EE] border border-[#DFCFA6]/40"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[#141414]">{product.title}</p>
                          <p className="text-[10px] uppercase tracking-wider text-[#8C827A] font-bold">{product.category}</p>
                          <p className="mt-0.5 text-xs font-extrabold text-[#875A10]">{product.price}</p>
                        </div>

                        <div className="flex flex-col gap-1 pr-1">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="grid h-7 w-7 place-items-center rounded-full bg-[#FAF8F5] text-[#5A554E] transition hover:text-rose-500 border border-[#DFCFA6]/40"
                          >
                            <Heart className={`h-3.5 w-3.5 ${wish ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(product, 1)
                              setIsQuickSearchOpen(false)
                            }}
                            className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-[#1A120B] to-[#2E2010] border border-[#D4AF37]/40 text-[#F2D785] transition hover:border-[#D4AF37] hover:shadow-[0_0_8px_rgba(212,175,55,0.3)]"
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
