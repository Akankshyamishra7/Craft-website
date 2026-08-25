"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Image as ImageIcon, PackagePlus, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'

const PRESET_IMAGES = [
  { label: 'Resin Flora', url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Silk Bangles', url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80' },
  { label: 'Soy Candle', url: 'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Botanical Soap', url: 'https://images.unsplash.com/photo-1600857062241-98c4a8f1f08f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ceramic Decor', url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80' },
]

export default function SellCraftModal() {
  const { isSellOpen, setIsSellOpen, addProduct } = useMarketplace()
  const [formState, setFormState] = useState({
    image: PRESET_IMAGES[0].url,
    title: '',
    description: '',
    category: categories[0],
    price: '34',
  })

  const submitProduct = (event) => {
    event.preventDefault()
    if (!formState.title.trim() || !formState.image.trim()) return

    addProduct(formState)
    setIsSellOpen(false)
    setFormState({
      image: PRESET_IMAGES[0].url,
      title: '',
      description: '',
      category: categories[0],
      price: '34',
    })
  }

  return (
    <AnimatePresence>
      {isSellOpen ? (
        <motion.div
          key="sell-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-cocoa/50 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSellOpen(false)}
        >
          <motion.div
            key="sell-modal-card"
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.2rem] bg-cream shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close sell modal"
              onClick={() => setIsSellOpen(false)}
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa shadow-soft transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-sand/70 bg-gradient-to-r from-blossom/60 via-sand/50 to-peach/50 px-6 py-6 sm:px-8">
              <span className="section-eyebrow">Artisan Creator Hub</span>
              <h3 className="mt-2 font-serif text-3xl text-cocoa">List Your Handmade Craft</h3>
              <p className="mt-1 text-xs text-cocoa-muted sm:text-sm">
                Join our collective of independent craft makers. Your listing will appear live in the collection immediately.
              </p>
            </div>

            <form className="space-y-5 p-6 sm:p-8" onSubmit={submitProduct}>
              {/* Preset Image Chooser */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-cocoa">
                  1. Select Photo Preset or Enter Image URL
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES.map((img) => {
                    const isSelected = formState.image === img.url
                    return (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => setFormState({ ...formState, image: img.url })}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          isSelected
                            ? 'border-clay bg-clay text-white shadow-sm'
                            : 'border-white/80 bg-white/80 text-cocoa/70 hover:bg-white'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                        {img.label}
                      </button>
                    )
                  })}
                </div>

                <div className="relative mt-2.5">
                  <ImageIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-muted" />
                  <input
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    className="h-11 w-full rounded-xl border border-sand bg-white pl-10 pr-4 text-xs text-cocoa outline-none focus:border-clay"
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Craft Title</label>
                  <input
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="h-11 w-full rounded-xl border border-sand bg-white px-3.5 text-sm text-cocoa outline-none focus:border-clay"
                    placeholder="e.g. Handmade Resin Trinket Dish"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="h-11 w-full rounded-xl border border-sand bg-white px-3.5 text-sm text-cocoa outline-none focus:border-clay"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Description */}
              <div className="grid gap-4 sm:grid-cols-[1fr_130px]">
                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Story & Materials Description</label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full rounded-xl border border-sand bg-white p-3 text-xs leading-5 text-cocoa outline-none focus:border-clay"
                    placeholder="Describe your handcrafting process, materials, scents, or styling notes..."
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-cocoa">Price ($ USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                    className="h-11 w-full rounded-xl border border-sand bg-white px-3.5 text-sm font-bold text-cocoa outline-none focus:border-clay"
                    placeholder="34"
                    required
                  />
                </div>
              </div>

              {/* Live Mini Preview */}
              {formState.title && (
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-soft">
                  <img
                    src={formState.image}
                    alt="Preview"
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-moss">
                      {formState.category}
                    </span>
                    <p className="truncate text-sm font-bold text-cocoa">{formState.title}</p>
                    <p className="text-xs font-bold text-clay">${formState.price}</p>
                  </div>
                  <span className="rounded-full bg-sand/60 px-2.5 py-1 text-[10px] font-bold text-cocoa">
                    Live Preview
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-sm shadow-lift"
              >
                <PackagePlus className="h-4 w-4" />
                Publish Live to Marketplace
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}