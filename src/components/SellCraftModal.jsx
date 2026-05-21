"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PackagePlus, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'

function SellCraftModal() {
  const { isSellOpen, setIsSellOpen, addProduct } = useMarketplace()
  const [formState, setFormState] = useState({
    image: '',
    title: '',
    description: '',
    category: categories[0],
    price: '',
  })

  const submitProduct = (event) => {
    event.preventDefault()
    addProduct(formState)
    setIsSellOpen(false)
    setFormState({
      image: '',
      title: '',
      description: '',
      category: categories[0],
      price: '',
    })
  }

  return (
    <AnimatePresence>
      {isSellOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa/40 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-cream shadow-lift"
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <button
              type="button"
              aria-label="Close sell modal"
              onClick={() => setIsSellOpen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-6 py-6 sm:px-8">
              <p className="section-eyebrow">Sell your craft</p>
              <h3 className="mt-2 text-3xl">List a new handmade product</h3>
              <p className="mt-3 text-sm leading-6 text-cocoa/70">
                Add your craft to the marketplace instantly. The new item will appear in the collection after you save it.
              </p>
            </div>

            <form className="grid gap-4 px-6 pb-6 sm:px-8" onSubmit={submitProduct}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-cocoa">Product image URL</span>
                <input
                  value={formState.image}
                  onChange={(event) => setFormState((current) => ({ ...current, image: event.target.value }))}
                  className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                  placeholder="https://..."
                  required
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-cocoa">Title</span>
                  <input
                    value={formState.title}
                    onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
                    className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                    placeholder="Custom resin tray"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-cocoa">Category</span>
                  <input
                    value={formState.category}
                    onChange={(event) => setFormState((current) => ({ ...current, category: event.target.value }))}
                    className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                    list="craft-categories"
                    placeholder="Handmade Jewelry"
                    required
                  />
                  <datalist id="craft-categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-cocoa">Description</span>
                  <textarea
                    value={formState.description}
                    onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
                    className="min-h-32 w-full rounded-[1.6rem] border border-white/80 bg-white/80 px-4 py-3 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                    placeholder="Describe the craft, materials, and vibe"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-cocoa">Price</span>
                  <input
                    value={formState.price}
                    onChange={(event) => setFormState((current) => ({ ...current, price: event.target.value }))}
                    className="h-12 w-full rounded-full border border-white/80 bg-white/80 px-4 text-sm text-cocoa outline-none focus:border-clay/60 focus:ring-4 focus:ring-clay/10"
                    placeholder="34"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]"
              >
                <PackagePlus className="h-4 w-4" />
                Publish craft listing
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default SellCraftModal