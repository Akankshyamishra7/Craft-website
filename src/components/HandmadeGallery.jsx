"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Grid2X2,
  Heart,
  LayoutGrid,
  Minus,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import ProductCard from './ProductCard'
import { categoryGroups, inspirationTiles } from '../data/products'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useMarketplace } from '../context/MarketplaceContext'
import { fallbackCraftImage } from '../utils/fallbackImage'

const allCategories = ['All', ...categoryGroups.map((c) => c.title)]
const BADGE_TAGS = ['All', 'Trending', 'New', 'Handmade', 'Under $30']

export default function HandmadeGallery() {
  const { ref, isVisible } = useRevealOnScroll()
  const {
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    addReview,
  } = useMarketplace()

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeBadge, setActiveBadge] = useState('All')
  const [sortBy, setSortBy] = useState('featured') // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [searchTerm, setSearchTerm] = useState('')
  const [layoutMode, setLayoutMode] = useState('grid') // 'grid' | 'masonry'
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [quickViewQuantity, setQuickViewQuantity] = useState(1)
  const [activeQuickTab, setActiveQuickTab] = useState('details') // 'details' | 'materials' | 'reviews'

  // Review Form in Quick View
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    let result = products.filter((product) => {
      // Category filter
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory

      // Badge / Tag filter
      let matchesBadge = true
      if (activeBadge === 'Under $30') {
        const priceNum = Number.parseFloat(product.price.replace('$', '')) || 0
        matchesBadge = priceNum <= 30
      } else if (activeBadge !== 'All') {
        matchesBadge = (product.badges || []).some(
          (b) => b.toLowerCase() === activeBadge.toLowerCase()
        )
      }

      // Search query
      const matchesSearch =
        query.length === 0 ||
        [product.title, product.category, product.description, ...(product.badges || [])]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesCategory && matchesBadge && matchesSearch
    })

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const pA = Number.parseFloat(a.price.replace('$', '')) || 0
        const pB = Number.parseFloat(b.price.replace('$', '')) || 0
        return pA - pB
      })
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const pA = Number.parseFloat(a.price.replace('$', '')) || 0
        const pB = Number.parseFloat(b.price.replace('$', '')) || 0
        return pB - pA
      })
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 4.8) - (a.rating || 4.8))
    }

    return result
  }, [activeCategory, activeBadge, products, searchTerm, sortBy])

  const handlePostReview = (e) => {
    e.preventDefault()
    if (!quickViewProduct || !reviewName.trim()) return

    addReview(quickViewProduct.id, {
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    })

    setReviewName('')
    setReviewComment('')
    setReviewRating(5)
  }

  return (
    <section id="collection" ref={ref} className={`section-shell py-16 sm:py-24 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible space-y-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-clay" /> Curated Marketplace
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl text-cocoa">
            Artisan Drops & Handcrafted Pieces
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa-muted sm:text-lg">
            Discover one-of-a-kind silk jewelry, botanical UV resin, clean-burn soy candles, and bespoke gifts crafted in independent artisan studios.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card space-y-5 p-5 sm:p-6">
          {/* Search + Category Tabs */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-clay" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jewelry, candles, resin, soaps..."
                className="h-12 w-full rounded-full border border-white/90 bg-white/90 pl-11 pr-4 text-xs text-cocoa outline-none transition placeholder:text-cocoa-muted/60 focus:border-clay focus:ring-2 focus:ring-clay/20 sm:text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition duration-200 ${
                      isActive
                        ? 'bg-cocoa text-white shadow-soft'
                        : 'border border-white/80 bg-white/70 text-cocoa/70 hover:bg-white hover:text-cocoa'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Secondary Filter Row: Badge Chips + Sort + Layout Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sand/60 pt-4 text-xs">
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-cocoa-muted">Filter by:</span>
              {BADGE_TAGS.map((tag) => {
                const isSelected = activeBadge === tag
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveBadge(tag)}
                    className={`rounded-full px-3 py-1 font-bold transition ${
                      isSelected
                        ? 'bg-clay text-white shadow-sm'
                        : 'bg-sand/40 text-cocoa/70 hover:bg-sand/70'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>

            {/* Controls: Sort Dropdown & Layout Grid Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cocoa-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-sand bg-white px-3 py-1.5 font-bold text-cocoa outline-none"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Grid / Masonry Toggle */}
              <div className="flex items-center rounded-full border border-sand bg-white/70 p-1">
                <button
                  type="button"
                  title="Grid View"
                  onClick={() => setLayoutMode('grid')}
                  className={`grid h-7 w-7 place-items-center rounded-full transition ${
                    layoutMode === 'grid' ? 'bg-cocoa text-white' : 'text-cocoa/60 hover:text-cocoa'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Masonry View"
                  onClick={() => setLayoutMode('masonry')}
                  className={`grid h-7 w-7 place-items-center rounded-full transition ${
                    layoutMode === 'masonry' ? 'bg-cocoa text-white' : 'text-cocoa/60 hover:text-cocoa'
                  }`}
                >
                  <Grid2X2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <span className="font-bold text-moss">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'craft' : 'crafts'}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Container */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-cocoa/15 bg-white/50 py-16 text-center">
            <Package className="mx-auto h-12 w-12 text-cocoa/30" />
            <h3 className="mt-4 font-serif text-2xl text-cocoa">No crafts matched your filter</h3>
            <p className="mt-1 text-xs text-cocoa-muted">Try clearing your search term or switching categories.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All')
                setActiveBadge('All')
                setSearchTerm('')
              }}
              className="btn-primary mt-5 text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : layoutMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isWishlisted(product.id)}
                onWishlistToggle={() => toggleWishlist(product.id)}
                onQuickView={() => {
                  setQuickViewProduct(product)
                  setQuickViewQuantity(1)
                  setActiveQuickTab('details')
                }}
                onAddToCart={(prod, qty) => addToCart(prod, qty)}
                onBuyNow={(prod, qty) => {
                  addToCart(prod, qty)
                  setIsCartOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="mb-6 break-inside-avoid">
                <ProductCard
                  product={product}
                  isWishlisted={isWishlisted(product.id)}
                  onWishlistToggle={() => toggleWishlist(product.id)}
                  onQuickView={() => {
                    setQuickViewProduct(product)
                    setQuickViewQuantity(1)
                    setActiveQuickTab('details')
                  }}
                  onAddToCart={(prod, qty) => addToCart(prod, qty)}
                  onBuyNow={(prod, qty) => {
                    addToCart(prod, qty)
                    setIsCartOpen(true)
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pinterest DIY Moodboard */}
        <section id="inspiration" className="glass-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="text-center">
            <span className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-clay" /> Pinterest Moodboard
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl text-cocoa">Artisan Studio Inspiration & Styling</h3>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-cocoa-muted sm:text-sm">
              Explore tactile textures, sunlit studio tables, and soft palette ideas to inspire your home decor and gift giving.
            </p>
          </div>

          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {inspirationTiles.map((tile) => (
              <figure
                key={tile.title}
                className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-soft transition hover:shadow-lift"
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackCraftImage
                  }}
                  className="w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 px-3 py-2 text-center text-xs font-bold text-cocoa shadow-soft backdrop-blur-md">
                  {tile.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {/* Expanded Quick View Modal with Reviews & Material Details */}
      <AnimatePresence>
        {quickViewProduct ? (
          <motion.div
            key="quick-view-modal-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-cocoa/50 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              key="quick-view-modal-card"
              className="relative my-8 w-full max-w-3xl overflow-hidden rounded-[2.2rem] bg-cream shadow-2xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close quick view"
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa shadow-soft transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                {/* Product Image Side */}
                <div className="relative min-h-[300px] bg-sand/30 lg:min-h-[500px]">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                    {(quickViewProduct.badges || []).map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-cocoa shadow-soft backdrop-blur-md"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Information & Tabs Side */}
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-moss">
                        {quickViewProduct.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span>{quickViewProduct.rating ?? 4.9}</span>
                        <span className="text-cocoa-muted">({quickViewProduct.reviews ?? 48} reviews)</span>
                      </div>
                    </div>

                    <h3 className="mt-2 font-serif text-3xl text-cocoa sm:text-4xl">
                      {quickViewProduct.title}
                    </h3>
                    <p className="mt-2 text-2xl font-extrabold text-clay">
                      {quickViewProduct.price}
                    </p>

                    {/* Tab Switcher */}
                    <div className="mt-5 flex gap-2 border-b border-sand/70 pb-2 text-xs font-bold">
                      {[
                        { id: 'details', label: 'Story & Details' },
                        { id: 'materials', label: 'Artisan Materials' },
                        { id: 'reviews', label: `Reviews (${quickViewProduct.reviews ?? 48})` },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveQuickTab(tab.id)}
                          className={`rounded-full px-3 py-1.5 transition ${
                            activeQuickTab === tab.id
                              ? 'bg-cocoa text-white'
                              : 'text-cocoa/60 hover:text-cocoa'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 min-h-[120px] text-xs leading-6 text-cocoa-muted sm:text-sm">
                      {activeQuickTab === 'details' && (
                        <div className="space-y-2">
                          <p>{quickViewProduct.description}</p>
                          <p className="text-[11px] text-cocoa">
                            🌿 Handcrafted in small boutique batches • Sealed with eco-friendly wax finish.
                          </p>
                        </div>
                      )}

                      {activeQuickTab === 'materials' && (
                        <div className="space-y-1.5 text-xs text-cocoa">
                          <p>• <strong>Primary Material:</strong> 100% natural, non-toxic components</p>
                          <p>• <strong>Maker Origin:</strong> Verified Independent Craft Studio</p>
                          <p>• <strong>Packaging:</strong> 100% Biodegradable & Gift-Ready</p>
                          <p>• <strong>Lead Time:</strong> Dispatched in 1-2 business days</p>
                        </div>
                      )}

                      {activeQuickTab === 'reviews' && (
                        <div className="space-y-3">
                          {/* Sample Review */}
                          <div className="rounded-xl bg-sand/30 p-2.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-cocoa">Elena R.</span>
                              <div className="flex text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-cocoa-muted">
                              "The craftsmanship is remarkable. The textures and packaging exceeded my expectations!"
                            </p>
                          </div>

                          {/* Post Review Form */}
                          <form onSubmit={handlePostReview} className="space-y-2 rounded-xl border border-sand p-3">
                            <p className="text-xs font-bold text-cocoa">Leave a Review for Maker</p>
                            <div className="flex gap-2">
                              <input
                                required
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                                placeholder="Your Name"
                                className="h-8 flex-1 rounded-lg border border-sand bg-white px-2.5 text-xs text-cocoa outline-none"
                              />
                              <select
                                value={reviewRating}
                                onChange={(e) => setReviewRating(Number(e.target.value))}
                                className="h-8 rounded-lg border border-sand bg-white px-2 text-xs text-cocoa outline-none"
                              >
                                <option value={5}>5 ★★★★★</option>
                                <option value={4}>4 ★★★★☆</option>
                                <option value={3}>3 ★★★☆☆</option>
                              </select>
                            </div>
                            <input
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              placeholder="Write your review notes..."
                              className="h-8 w-full rounded-lg border border-sand bg-white px-2.5 text-xs text-cocoa outline-none"
                            />
                            <button
                              type="submit"
                              className="rounded-lg bg-cocoa px-3 py-1 text-xs font-bold text-white transition hover:bg-clay"
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & CTAs */}
                  <div className="mt-6 border-t border-sand/70 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-sand bg-white px-3 py-1.5">
                        <button
                          type="button"
                          onClick={() => setQuickViewQuantity((q) => Math.max(1, q - 1))}
                          className="grid h-6 w-6 place-items-center rounded-full bg-sand/40 text-cocoa transition hover:bg-sand"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-cocoa">
                          {quickViewQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuickViewQuantity((q) => q + 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-sand/40 text-cocoa transition hover:bg-sand"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          addToCart(quickViewProduct, quickViewQuantity)
                          setQuickViewProduct(null)
                        }}
                        className="btn-primary flex-1 py-3 text-xs"
                      >
                        Add {quickViewQuantity} to Bag
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleWishlist(quickViewProduct.id)}
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${
                          isWishlisted(quickViewProduct.id)
                            ? 'border-rose-300 bg-rose-50 text-rose-500'
                            : 'border-sand bg-white text-cocoa hover:bg-sand/30'
                        }`}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isWishlisted(quickViewProduct.id) ? 'fill-rose-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

