"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
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
const BADGE_TAGS = ['All', 'Trending', 'New', 'Handmade', 'Under ₹1,500']

const MAKER_ARTICLES = [
  {
    title: '10 Easy DIY Craft Ideas to Try This Weekend',
    date: 'January 18, 2026',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80',
    category: 'DIY Home Decor',
  },
  {
    title: 'The Art of Botanical Resin: Beginner’s Guide',
    date: 'May 12, 2026',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=700&q=80',
    category: 'Resin Art',
  },
  {
    title: 'Choosing the Right Tools for Your Craft',
    date: 'August 21, 2026',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=700&q=80',
    category: 'Studio Guide',
  },
]

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
  const [sortBy, setSortBy] = useState('featured')
  const [searchTerm, setSearchTerm] = useState('')
  const [layoutMode, setLayoutMode] = useState('grid')
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [quickViewQuantity, setQuickViewQuantity] = useState(1)
  const [activeQuickTab, setActiveQuickTab] = useState('details')

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
      if (activeBadge.startsWith('Under')) {
        const priceNum = Number.parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0
        matchesBadge = priceNum <= 1500
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
        const pA = Number.parseFloat(String(a.price).replace(/[^0-9.]/g, '')) || 0
        const pB = Number.parseFloat(String(b.price).replace(/[^0-9.]/g, '')) || 0
        return pA - pB
      })
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const pA = Number.parseFloat(String(a.price).replace(/[^0-9.]/g, '')) || 0
        const pB = Number.parseFloat(String(b.price).replace(/[^0-9.]/g, '')) || 0
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
            <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" /> Curated Marketplace
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl text-[#141414] font-serif tracking-tight font-bold">
            Artisan Drops & <span className="italic font-normal text-gold-gradient">Handcrafted Pieces</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A554E] sm:text-lg font-medium">
            Discover one-of-a-kind silk jewelry, botanical UV resin, clean-burn soy candles, and bespoke gifts crafted in independent artisan studios.
          </p>
        </div>

        {/* Visual Category Showcase Cards */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4">
          {categoryGroups.map((cat) => {
            const isSelected = activeCategory === cat.title
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => {
                  setActiveCategory(isSelected ? 'All' : cat.title)
                }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition duration-300 ${
                  isSelected
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-[0_8px_24px_rgba(184,134,11,0.18)] bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E5] to-[#F5E8C4]'
                    : 'border-[#D4AF37]/45 bg-gradient-to-b from-white via-[#FCF8EE] to-[#FAF3DE] hover:border-[#D4AF37] hover:shadow-[0_8px_24px_rgba(184,134,11,0.14)]'
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF6EC]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 right-2.5 truncate font-serif text-xs sm:text-sm font-bold text-white">
                    {cat.title}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-b from-white to-[#FAF6ED]">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9E7314]">
                    {cat.badge}
                  </span>
                  <span className="text-[10px] text-[#141414] font-bold">
                    {isSelected ? 'Selected ✓' : 'Browse →'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card space-y-5 p-5 sm:p-6 border border-[#D4AF37]/50 bg-gradient-to-b from-white via-[#FAF5E8] to-[#F7ECCF]/80 shadow-[0_12px_36px_rgba(184,134,11,0.10),0_0_15px_rgba(212,175,55,0.10)]">
          {/* Search + Category Tabs */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9E7314]" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jewelry, candles, resin, soaps..."
                className="h-12 w-full rounded-full border border-[#E2D2AD] bg-[#FCFBF8] pl-11 pr-4 text-xs text-[#141414] outline-none transition placeholder:text-[#8C827A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 focus:bg-white sm:text-sm font-medium shadow-xs"
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
                        ? 'bg-[#141414] border border-[#D4AF37]/70 text-[#ECC872] shadow-sm'
                        : 'border border-[#E2D2AD] bg-white text-[#4A3810] hover:border-[#D4AF37] hover:bg-[#FAF4E5]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Secondary Filter Row: Badge Chips + Sort + Layout Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E8DEC7] pt-4 text-xs">
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#694806]">Filter by:</span>
              {BADGE_TAGS.map((tag) => {
                const isSelected = activeBadge === tag
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveBadge(tag)}
                    className={`rounded-full px-3 py-1 font-bold transition ${
                      isSelected
                        ? 'bg-[#141414] border border-[#D4AF37]/70 text-[#ECC872] shadow-sm'
                        : 'border border-[#E2D2AD] bg-[#FAF8F2] text-[#695222] hover:border-[#D4AF37] hover:bg-[#F6ECDA]'
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
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#5A554E]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-[#DDD7CE] bg-white px-3 py-1.5 font-bold text-[#141414] outline-none focus:border-[#141414] shadow-sm"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Grid / Masonry Toggle */}
              <div className="flex items-center rounded-full border border-[#DDD7CE] bg-white p-1 shadow-sm">
                <button
                  type="button"
                  title="Grid View"
                  onClick={() => setLayoutMode('grid')}
                  className={`grid h-7 w-7 place-items-center rounded-full transition ${
                    layoutMode === 'grid' ? 'bg-[#141414] text-white font-bold shadow-sm' : 'text-[#5A554E] hover:text-[#141414]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Compact View"
                  onClick={() => setLayoutMode('masonry')}
                  className={`grid h-7 w-7 place-items-center rounded-full transition ${
                    layoutMode === 'masonry' ? 'bg-[#141414] text-white font-bold shadow-sm' : 'text-[#5A554E] hover:text-[#141414]'
                  }`}
                >
                  <Grid2X2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Display */}
        {filteredProducts.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
            <Package className="h-12 w-12 text-[#8C827A]" />
            <h3 className="mt-4 font-serif text-2xl font-bold text-[#141414]">No Crafts Found</h3>
            <p className="mt-2 text-sm text-[#5A554E]">
              Try adjusting your search filters or browse another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All')
                setActiveBadge('All')
                setSearchTerm('')
              }}
              className="btn-primary mt-6 text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              layoutMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
            }`}
          >
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={isWishlisted(prod.id)}
                onWishlistToggle={() => toggleWishlist(prod.id)}
                onQuickView={() => {
                  setQuickViewProduct(prod)
                  setQuickViewQuantity(1)
                }}
                onAddToCart={(p, qty) => addToCart(p, qty)}
                onBuyNow={(p) => {
                  addToCart(p, 1)
                  setIsCartOpen(true)
                }}
              />
            ))}
          </div>
        )}

        {/* INSPIRATION FOR EVERY MAKER (Matching user's reference image) */}
        <section id="inspiration" className="glass-card overflow-hidden p-6 sm:p-10 lg:p-12 border border-[#DFCFA6]/60 bg-gradient-to-b from-white via-[#FCF9F1] to-[#FAF4E5]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-eyebrow">
              <BookOpen className="h-3.5 w-3.5 text-[#141414]" /> Maker Journals
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl text-[#141414] font-serif font-bold tracking-tight">
              Inspiration for Every Maker
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5A554E]">
              Explore tactile textures, studio journals, and beginner DIY tutorials from our creative artisan collective.
            </p>
          </div>

          {/* 3 Editorial Cards like attached reference image */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MAKER_ARTICLES.map((article, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#DFCFA6]/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/80 p-4 transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#D4AF37]/80 hover:shadow-[0_12px_32px_rgba(180,135,45,0.10)]"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#EFECE6]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#141414] shadow-sm">
                      {article.category}
                    </span>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C827A]">
                      {article.date}
                    </p>
                    <h4 className="font-serif text-lg font-bold leading-snug text-[#141414] transition group-hover:text-[#5A554E]">
                      {article.title}
                    </h4>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAE5DC] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center gap-1 group-hover:underline">
                    Read More <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional tactile moodboard preview tiles */}
          <div className="mt-8 pt-8 border-t border-[#EAE5DC]">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C827A] text-center mb-4">
              Tactile Studio Moodboard
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {inspirationTiles.slice(0, 6).map((tile) => (
                <div
                  key={tile.title}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-[#E5E0D8] bg-[#F6F3EE]"
                >
                  <img
                    src={tile.image}
                    alt={tile.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <span className="text-[10px] font-bold text-white truncate">{tile.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Expanded Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct ? (
          <motion.div
            key="quick-view-modal-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              key="quick-view-modal-card"
              className="relative my-8 w-full max-w-3xl overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F7F1E1] border border-[#DFCFA6]/70 shadow-[0_25px_60px_rgba(180,135,45,0.18)]"
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close quick view"
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#141414] shadow-sm transition hover:bg-[#F3EFE8]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                {/* Product Image Side */}
                <div className="relative min-h-[300px] bg-[#F6F3EE] lg:min-h-[500px]">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                    {(quickViewProduct.badges || ['Handmade']).map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#141414] shadow-sm"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details & Interactive Tabs */}
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C827A]">
                      {quickViewProduct.category}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-[#141414] sm:text-3xl">
                      {quickViewProduct.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-between border-b border-[#EAE5DC] pb-4">
                      <div>
                        <span className="text-2xl font-extrabold text-[#141414]">
                          {quickViewProduct.price}
                        </span>
                        <span className="ml-2 text-xs text-[#8C827A]">Taxes & shipping calculated at checkout</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#141414] text-[#141414]" />
                        <span className="text-sm font-bold text-[#141414]">
                          {quickViewProduct.rating ?? '4.9'}
                        </span>
                        <span className="text-xs text-[#8C827A]">({quickViewProduct.reviews ?? 48})</span>
                      </div>
                    </div>

                    {/* Quick Tabs */}
                    <div className="mt-4 flex border-b border-[#EAE5DC]">
                      {[
                        { id: 'details', label: 'Story & Craft' },
                        { id: 'materials', label: 'Materials' },
                        { id: 'reviews', label: 'Reviews' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveQuickTab(tab.id)}
                          className={`border-b-2 px-4 py-2 text-xs font-bold transition ${
                            activeQuickTab === tab.id
                              ? 'border-[#141414] text-[#141414]'
                              : 'border-transparent text-[#8C827A] hover:text-[#141414]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 min-h-[120px] text-xs leading-relaxed text-[#5A554E]">
                      {activeQuickTab === 'details' && (
                        <p>{quickViewProduct.description}</p>
                      )}

                      {activeQuickTab === 'materials' && (
                        <ul className="space-y-1.5 list-disc pl-4 text-xs">
                          <li>Hand-cast non-toxic botanical resins and natural waxes</li>
                          <li>100% genuine natural dried flowers pressed in boutique studios</li>
                          <li>Plastic-free biodegradable packaging & recycled kraft box</li>
                        </ul>
                      )}

                      {activeQuickTab === 'reviews' && (
                        <div className="space-y-3">
                          <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-2.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#141414]">Elena R.</span>
                              <div className="flex text-[#141414]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-[#141414]" />
                                ))}
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-[#5A554E]">
                              "The craftsmanship is remarkable. The textures and packaging exceeded my expectations!"
                            </p>
                          </div>

                          {/* Post Review Form */}
                          <form onSubmit={handlePostReview} className="space-y-2 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3">
                            <p className="text-xs font-bold text-[#141414]">Leave a Review for Maker</p>
                            <div className="flex gap-2">
                              <input
                                required
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                                placeholder="Your Name"
                                className="h-8 flex-1 rounded-lg border border-[#DDD7CE] bg-white px-2.5 text-xs text-[#141414] outline-none focus:border-[#141414]"
                              />
                              <select
                                value={reviewRating}
                                onChange={(e) => setReviewRating(Number(e.target.value))}
                                className="h-8 rounded-lg border border-[#DDD7CE] bg-white px-2 text-xs text-[#141414] outline-none focus:border-[#141414]"
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
                              className="h-8 w-full rounded-lg border border-[#DDD7CE] bg-white px-2.5 text-xs text-[#141414] outline-none focus:border-[#141414]"
                            />
                            <button
                              type="submit"
                              className="rounded-lg bg-[#141414] px-3 py-1 text-xs font-bold text-white transition hover:bg-[#2C2C2C] shadow-sm"
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & CTAs */}
                  <div className="mt-6 border-t border-[#EAE5DC] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-[#DDD7CE] bg-white px-3 py-1.5 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setQuickViewQuantity((q) => Math.max(1, q - 1))}
                          className="grid h-6 w-6 place-items-center rounded-full bg-[#EFECE6] text-[#141414] transition hover:bg-[#DDD7CE]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-[#141414]">
                          {quickViewQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuickViewQuantity((q) => q + 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-[#EFECE6] text-[#141414] transition hover:bg-[#DDD7CE]"
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
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#DDD7CE] bg-white text-[#141414] transition ${
                          isWishlisted(quickViewProduct.id)
                            ? 'border-rose-400 bg-rose-50 text-rose-500'
                            : 'hover:border-[#141414]'
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
