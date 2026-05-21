"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CategorySection from './CategorySection'
import ProductCard from './ProductCard'
import { categoryGroups, inspirationTiles } from '../data/products'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useMarketplace } from '../context/MarketplaceContext'
import { ArrowRight, Minus, Plus, Search, X } from 'lucide-react'
import { fallbackCraftImage } from '../utils/fallbackImage'

const allCategories = ['All', ...categoryGroups.map((category) => category.title)]

function HandmadeGallery() {
  const { ref, isVisible } = useRevealOnScroll()
  const { products, addToCart, setIsCartOpen } = useMarketplace()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [wishlistedIds, setWishlistedIds] = useState(() => new Set())
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [quickViewQuantity, setQuickViewQuantity] = useState(1)

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesSearch =
        query.length === 0 ||
        [product.title, product.category, product.description, ...(product.badges || [])]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, products, searchTerm])

  const featuredCategories = categoryGroups.map((category) => ({
    ...category,
    products: products.filter((product) => product.category === category.title).slice(0, 3),
    onAddToCart: addToCart,
    onBuyNow: (product, quantity) => {
      addToCart(product, quantity)
      setIsCartOpen(true)
    },
  }))

  const toggleWishlist = (productId) => {
    setWishlistedIds((current) => {
      const next = new Set(current)

      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }

      return next
    })
  }

  const addProductToCart = (product, quantity) => {
    addToCart(product, quantity)
  }

  const buyProductNow = (product, quantity) => {
    addToCart(product, quantity)
    setIsCartOpen(true)
  }

  return (
    <section id="collection" ref={ref} className={`section-shell py-16 sm:py-20 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible space-y-14">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-eyebrow">Handmade Craft Collection</span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Pinterest-inspired DIY finds with a premium handmade glow</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-cocoa/70 sm:text-lg">
            Browse colorful handmade jewelry, cozy decor, clean beauty favorites, and giftable accessories through a soft pastel layout built for discovery.
          </p>
        </div>

        <div className="soft-card overflow-hidden p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cocoa/40" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search handmade jewelry, candles, soaps, charms..."
                className="h-14 w-full rounded-full border border-white/80 bg-white/80 pl-12 pr-4 text-sm text-cocoa outline-none transition placeholder:text-cocoa/40 focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => {
                const isActive = activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                      isActive
                        ? 'bg-cocoa text-white shadow-soft'
                        : 'border border-white/80 bg-white/70 text-cocoa/70 hover:-translate-y-0.5 hover:bg-white'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-cocoa/60">
            <span className="rounded-full bg-blush/40 px-3 py-1 font-semibold text-cocoa">{filteredProducts.length} items</span>
            <span className="rounded-full bg-sand/70 px-3 py-1 font-semibold text-cocoa/70">New</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-cocoa/70">Trending</span>
            <span className="rounded-full bg-white/80 px-3 py-1 font-semibold text-cocoa/70">Handmade</span>
          </div>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistedIds.has(product.id)}
              onWishlistToggle={() => toggleWishlist(product.id)}
              onQuickView={() => setQuickViewProduct(product)}
                onAddToCart={addProductToCart}
                onBuyNow={buyProductNow}
              className="mb-4 break-inside-avoid"
            />
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredCategories.map((category) => (
            <CategorySection
              key={category.title}
              category={category}
              products={category.products}
              wishlistedIds={wishlistedIds}
              onWishlistToggle={toggleWishlist}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        <section id="inspiration" className="soft-card overflow-hidden p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 text-center">
            <span className="section-eyebrow">Pinterest Inspiration</span>
            <h3 className="text-3xl sm:text-4xl">A dreamy DIY moodboard for handmade lovers</h3>
            <p className="mx-auto max-w-2xl text-base leading-7 text-cocoa/70">
              Soft palettes, tactile textures, and cozy studio moments to spark your next craft idea.
            </p>
          </div>

          <div className="mt-6 columns-1 gap-4 md:columns-2 xl:columns-3">
            {inspirationTiles.map((tile, index) => (
              <figure
                key={tile.title}
                className={`relative mb-4 break-inside-avoid overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/80 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[1/1.05]'
                }`}
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = fallbackCraftImage
                  }}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-4 bottom-4 rounded-full bg-white/88 px-3 py-2 text-center text-sm font-semibold text-cocoa shadow-soft backdrop-blur">
                  {tile.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="customize" className="soft-card overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(247,216,224,0.82),rgba(223,238,255,0.92))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="section-eyebrow">Customize Your Craft</span>
              <h3 className="mt-3 text-3xl sm:text-4xl">Design a handmade piece that feels personal and premium</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-cocoa/70 sm:text-lg">
                Mix colors, materials, and keepsake details to create gifts and decor that feel thoughtful from the first glance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-[#4f3b2f] hover:shadow-lift"
                >
                  Start a custom order
                </a>
                <a
                  href="#inspiration"
                  className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/75 px-6 py-3 text-sm font-semibold text-cocoa shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Browse inspiration
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Silk thread palettes',
                'Resin keepsakes',
                'Pastel beauty kits',
                'Gift-ready packaging',
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/80 bg-white/80 px-4 py-5 text-sm font-semibold text-cocoa shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {quickViewProduct ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/40 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-cream shadow-lift"
              initial={{ y: 24, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <button
                type="button"
                aria-label="Close quick view"
                onClick={() => {
                  setQuickViewProduct(null)
                  setQuickViewQuantity(1)
                }}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa shadow-soft transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[280px] lg:min-h-[520px]">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.title}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.src = fallbackCraftImage
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-5 p-6 sm:p-8 lg:p-10">
                  <span className="section-eyebrow">Quick view</span>
                  <h3 className="text-4xl sm:text-5xl">{quickViewProduct.title}</h3>
                  <p className="text-lg leading-8 text-cocoa/70">{quickViewProduct.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.badges.map((badge) => (
                      <span key={badge} className="rounded-full bg-sand/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cocoa/70">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-[1.4rem] border border-white/80 bg-white/75 px-5 py-4 shadow-soft">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss">Category</p>
                      <p className="mt-2 text-lg font-semibold text-cocoa">{quickViewProduct.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss">Price</p>
                      <p className="mt-2 text-2xl font-semibold text-clay">{quickViewProduct.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-sand/55 px-3 py-2 w-fit">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuickViewQuantity((value) => Math.max(1, value - 1))}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-cocoa transition hover:bg-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-cocoa">{quickViewQuantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuickViewQuantity((value) => value + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-cocoa transition hover:bg-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => buyProductNow(quickViewProduct, quickViewQuantity)}
                      className="inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Buy Now
                    </button>
                    <button
                      type="button"
                      onClick={() => addProductToCart(quickViewProduct, quickViewQuantity)}
                      className="rounded-full border border-white/80 bg-white/80 px-6 py-3 text-sm font-semibold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toggleWishlist(quickViewProduct.id)
                      }}
                      className="rounded-full border border-white/80 bg-white/80 px-6 py-3 text-sm font-semibold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      {wishlistedIds.has(quickViewProduct.id) ? 'Saved' : 'Save'}
                    </button>
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

export default HandmadeGallery
