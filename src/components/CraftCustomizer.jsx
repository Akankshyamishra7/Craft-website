"use client"

import { useState, useMemo } from 'react'
import {
  Check,
  Palette,
  Sparkles,
  ShoppingBag,
  FilePenLine,
  Gift,
  Flame,
} from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'

const BASE_CRAFTS = [
  {
    id: 'custom-resin',
    title: 'Pressed Botanical Resin Tray',
    category: 'DIY Home Decor & Crafts',
    basePrice: 38,
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    description: 'High-gloss crystalline resin embedding dried botanicals with scalloped edges.',
  },
  {
    id: 'custom-bangles',
    title: 'Artisan Silk Thread Bangles Set',
    category: 'Handmade Jewelry',
    basePrice: 28,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-wrapped raw silk thread bangles embellished with delicate zari and pearl beadwork.',
  },
  {
    id: 'custom-candle',
    title: 'Botanical Hand-Poured Soy Candle',
    category: 'Beauty DIY Products',
    basePrice: 26,
    image: 'https://images.unsplash.com/photo-1603006905393-df8f1d1e8c7b?auto=format&fit=crop&w=800&q=80',
    description: 'Pure soy wax blended with essential botanical oils and topped with dried floral petals.',
  },
  {
    id: 'custom-pendant',
    title: 'Pressed Flower Locket Pendant',
    category: 'Handmade Jewelry',
    basePrice: 34,
    image: 'https://images.unsplash.com/photo-1617038220319-4f9adf07f779?auto=format&fit=crop&w=800&q=80',
    description: 'Vintage-inspired glass locket framing real pressed wild flora in warm brass trim.',
  },
]

const PALETTES = [
  {
    id: 'blush-dawn',
    name: 'Blush Dawn',
    tones: ['#f8dcd0', '#f9dee4', '#f5ecdf'],
    description: 'Soft peach, petal pink, and pearl shimmer',
  },
  {
    id: 'sage-botanical',
    name: 'Sage Botanical',
    tones: ['#6e8062', '#d9f3e5', '#f5ecdf'],
    description: 'Earthy moss, pistachio leaves, and cream',
  },
  {
    id: 'golden-sunset',
    name: 'Golden Sunset',
    tones: ['#f6e4bc', '#c86d51', '#fbe2cc'],
    description: 'Warm amber, terracotta clay, and gold leaf',
  },
  {
    id: 'celestial-dusk',
    name: 'Celestial Dusk',
    tones: ['#ded9ff', '#dcf0ff', '#fdfbf7'],
    description: 'Lilac haze, misty blue, and starry glow',
  },
]

const ADDONS = [
  {
    id: 'monogram',
    name: 'Hand-Stamped Monogram / Name',
    price: 5,
    icon: FilePenLine,
    description: 'Personalized initials or short quote in calligraphy',
  },
  {
    id: 'gold-foil',
    name: '24K Gold Leaf Flake Accents',
    price: 4,
    icon: Sparkles,
    description: 'Luminous metallic foil flecks embedded within the craft',
  },
  {
    id: 'botanicals',
    name: 'Dried Lavender & Blossom Infusion',
    price: 3.5,
    icon: Flame,
    description: 'Real organic floral petals hand-harvested from studio gardens',
  },
  {
    id: 'gift-box',
    name: 'Artisan Keepsake Velvet Gift Box',
    price: 6,
    icon: Gift,
    description: 'Embossed gift presentation with wax seal and handwritten note',
  },
]

export default function CraftCustomizer() {
  const { addToCart, setIsCartOpen } = useMarketplace()

  const [selectedCraft, setSelectedCraft] = useState(BASE_CRAFTS[0])
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0])
  const [customText, setCustomText] = useState('')
  const [selectedAddons, setSelectedAddons] = useState(['gold-foil'])

  const toggleAddon = (addonId) => {
    setSelectedAddons((current) =>
      current.includes(addonId) ? current.filter((id) => id !== addonId) : [...current, addonId]
    )
  }

  const calculatedPrice = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id)
      return sum + (addon?.price || 0)
    }, 0)
    return selectedCraft.basePrice + addonsTotal
  }, [selectedCraft, selectedAddons])

  const handleAddCustomToBag = () => {
    const customProduct = {
      id: Date.now(),
      title: `Custom ${selectedCraft.title}`,
      price: `$${calculatedPrice.toFixed(2)}`,
      category: selectedCraft.category,
      image: selectedCraft.image,
      badges: ['Bespoke Custom', 'Artisan Made'],
      description: `Bespoke crafted with ${selectedPalette.name} palette. ${
        customText ? `Personalization: "${customText}". ` : ''
      }Add-ons: ${selectedAddons.join(', ')}.`,
      rating: 5.0,
      reviews: 1,
    }

    addToCart(customProduct, 1, {
      palette: selectedPalette.name,
      personalization: customText,
      addons: selectedAddons,
    })
    setIsCartOpen(true)
  }

  return (
    <section id="customize" className="section-shell py-16 sm:py-24">
      <div className="reveal is-visible space-y-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-clay" /> Interactive Studio
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl text-cocoa">
            Design Your Bespoke Handmade Craft
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa-muted sm:text-lg">
            Choose your artisan base piece, select a curated color mood, and personalize with custom engravings or gold leaf. We craft each one-of-a-kind piece from scratch.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="glass-card grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          {/* Controls Column */}
          <div className="space-y-8">
            {/* Step 1: Base Craft */}
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-xs font-bold text-white">
                  1
                </span>
                <h3 className="font-serif text-2xl text-cocoa">Choose Craft Base</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {BASE_CRAFTS.map((craft) => (
                  <button
                    key={craft.id}
                    type="button"
                    onClick={() => setSelectedCraft(craft)}
                    className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition duration-200 ${
                      selectedCraft.id === craft.id
                        ? 'border-clay bg-clay-light/50 shadow-soft ring-1 ring-clay'
                        : 'border-white/80 bg-white/70 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <p className="text-sm font-bold text-cocoa">{craft.title}</p>
                    <p className="mt-1 text-xs text-cocoa-muted line-clamp-1">{craft.category}</p>
                    <span className="mt-3 text-sm font-extrabold text-clay">${craft.basePrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Color Palette */}
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-xs font-bold text-white">
                  2
                </span>
                <h3 className="font-serif text-2xl text-cocoa">Select Artisan Color Mood</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setSelectedPalette(palette)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition ${
                      selectedPalette.id === palette.id
                        ? 'border-clay bg-clay-light/50 shadow-soft ring-1 ring-clay'
                        : 'border-white/80 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-cocoa">{palette.name}</p>
                      <p className="text-xs text-cocoa-muted">{palette.description}</p>
                    </div>
                    <div className="flex -space-x-1.5 pl-2">
                      {palette.tones.map((color, i) => (
                        <span
                          key={i}
                          className="h-5 w-5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons & Engraving */}
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-xs font-bold text-white">
                  3
                </span>
                <h3 className="font-serif text-2xl text-cocoa">Artisan Touches & Add-ons</h3>
              </div>

              <div className="mt-4 space-y-2.5">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id)
                  const Icon = addon.icon

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 transition ${
                        isChecked
                          ? 'border-clay/50 bg-clay-light/40 shadow-sm'
                          : 'border-white/80 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-xl transition ${
                            isChecked ? 'bg-clay text-white' : 'bg-sand/40 text-cocoa-muted'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-cocoa sm:text-sm">{addon.name}</p>
                          <p className="text-[11px] text-cocoa-muted">{addon.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-clay">+${addon.price.toFixed(2)}</span>
                        <div
                          className={`grid h-5 w-5 place-items-center rounded-full border transition ${
                            isChecked ? 'border-clay bg-clay text-white' : 'border-sand bg-white'
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedAddons.includes('monogram') && (
                <div className="mt-3.5">
                  <label className="mb-1 block text-xs font-semibold text-cocoa">
                    Custom Monogram / Inscription Text (Max 24 characters)
                  </label>
                  <input
                    maxLength={24}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g., 'Maya • 2026' or 'Forever Glowing'"
                    className="h-11 w-full rounded-xl border border-white bg-white/90 px-4 text-sm text-cocoa outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lift lg:p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="section-eyebrow">Live Custom Preview</span>
                <span className="text-xs font-bold uppercase tracking-wider text-moss">
                  1-of-1 Bespoke
                </span>
              </div>

              <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sand/30 shadow-inner">
                <img
                  src={selectedCraft.image}
                  alt={selectedCraft.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent" />

                {/* Floating Palette Tag */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold text-cocoa shadow-soft backdrop-blur-md">
                  <Palette className="h-3.5 w-3.5 text-clay" />
                  {selectedPalette.name}
                </div>

                {customText && (
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl border border-white/80 bg-white/95 p-2 text-center shadow-lift backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-clay">Custom Engraving</p>
                    <p className="font-serif text-sm font-semibold italic text-cocoa">"{customText}"</p>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <h4 className="font-serif text-2xl text-cocoa">{selectedCraft.title}</h4>
                <p className="text-xs leading-5 text-cocoa-muted">{selectedCraft.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="rounded-full bg-sand/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cocoa">
                    Palette: {selectedPalette.name}
                  </span>
                  {selectedAddons.map((id) => (
                    <span
                      key={id}
                      className="rounded-full bg-mint/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-moss"
                    >
                      {ADDONS.find((a) => a.id === id)?.name.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-cocoa/10 pt-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cocoa-muted">Total Craft Price</p>
                  <p className="font-serif text-3xl font-bold text-clay">${calculatedPrice.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomToBag}
                  className="btn-primary shadow-glow"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add Custom Craft to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
