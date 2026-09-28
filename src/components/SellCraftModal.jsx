"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Image as ImageIcon, PackagePlus, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'

const PRESET_IMAGES = [
  { label: 'Resin Flora', url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Silk Bangles', url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80' },
  { label: 'Soy Candle', url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Botanical Soap', url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ceramic Decor', url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80' },
]

export default function SellCraftModal() {
  const { isSellOpen, setIsSellOpen, addProduct } = useMarketplace()
  const [formState, setFormState] = useState({
    image: PRESET_IMAGES[0].url,
    title: '',
    description: '',
    category: categories[0],
    price: '499',
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
      price: '499',
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
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.2rem] bg-[#fdf9f0] border border-[#d4a338]/40 shadow-[0_25px_60px_rgba(133,90,16,0.25),0_0_30px_rgba(212,163,56,0.2)]"
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
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/90 text-[#4a340e] shadow-soft transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-[#d4a338]/30 bg-gradient-to-r from-[#faeccd] via-[#f7e4b5] to-[#faeccd] px-6 py-6 sm:px-8 text-[#4a340e]">
              <span className="section-eyebrow">Artisan Creator Hub</span>
              <h3 className="mt-2 font-serif text-3xl text-[#241705] font-bold">List Your Handmade Craft</h3>
              <p className="mt-1 text-xs text-[#5e4318] sm:text-sm font-medium">
                Join our collective of independent craft makers. Your listing will appear live in the collection immediately.
              </p>
            </div>

            <form className="space-y-5 p-6 sm:p-8" onSubmit={submitProduct}>
              {/* Preset Image Chooser */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#241705]">
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
                            ? 'border-[#b8860b] bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] font-bold shadow-sm'
                            : 'border-[#d4a338]/30 bg-white text-[#4a340e] hover:border-[#b8860b]'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                        {img.label}
                      </button>
                    )
                  })}
                </div>

                <div className="relative mt-2.5">
                  <ImageIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c5f0b]" />
                  <input
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white pl-10 pr-4 text-xs text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30 font-medium"
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Craft Title</label>
                  <input
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
                    placeholder="e.g. Handmade Resin Trinket Dish"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
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
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Story & Materials Description</label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full rounded-xl border border-[#d4a338]/35 bg-white p-3 text-xs leading-5 text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
                    placeholder="Describe your handcrafting process, materials, scents, or styling notes..."
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#241705]">Price (₹ INR)</label>
                  <input
                    type="number"
                    min="1"
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                    className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm font-bold text-[#241705] outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#e5be5e]/30"
                    placeholder="499"
                    required
                  />
                </div>
              </div>

              {/* Live Mini Preview */}
              {formState.title && (
                <div className="flex items-center gap-3.5 rounded-2xl border border-[#d4a338]/30 bg-white p-3 shadow-sm">
                  <img
                    src={formState.image}
                    alt="Preview"
                    className="h-14 w-14 rounded-xl object-cover bg-[#fbf4e4]"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c5f0b]">
                      {formState.category}
                    </span>
                    <p className="truncate text-sm font-bold text-[#241705]">{formState.title}</p>
                    <p className="text-xs font-extrabold text-[#241705]">₹{formState.price}</p>
                  </div>
                  <span className="rounded-full bg-[#e5be5e]/20 border border-[#d4a338]/35 px-2.5 py-1 text-[10px] font-bold text-[#8c5f0b]">
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