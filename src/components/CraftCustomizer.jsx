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
    basePrice: 799,
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    description: 'High-gloss crystalline resin embedding dried botanicals with scalloped edges.',
  },
  {
    id: 'custom-bangles',
    title: 'Artisan Silk Thread Bangles Set',
    category: 'Handmade Jewelry',
    basePrice: 599,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-wrapped raw silk thread bangles embellished with delicate zari and pearl beadwork.',
  },
  {
    id: 'custom-candle',
    title: 'Botanical Hand-Poured Soy Candle',
    category: 'Beauty DIY Products',
    basePrice: 549,
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
    description: 'Pure soy wax blended with essential botanical oils and topped with dried floral petals.',
  },
  {
    id: 'custom-keychain',
    title: 'Ruby Gold Glitter Initial Keychain',
    category: 'Cute Handmade Accessories',
    basePrice: 299,
    image: '/products/atelier-ruby-glitter-keychains.jpg',
    description: 'Custom poured crystal resin monogram letter dipped with chunky 24k gold leaf flakes and gold swivel clip.',
  },
  {
    id: 'custom-pendant',
    title: 'Celestial Evil Eye Mandala Pendant',
    category: 'Handmade Jewelry',
    basePrice: 599,
    image: '/products/atelier-evil-eye-pendant.jpg',
    description: 'Handcrafted cobalt blue mandala evil eye talisman pendant set in high-polish gold bezel on cable chain.',
  },
]

const PALETTES = [
  {
    id: 'royal-gold',
    name: 'Royal Amber Gold',
    tones: ['#fbbf24', '#fde047', '#d97706'],
    description: 'Radiant 24K gold, champagne shimmer, and warm amber',
  },
  {
    id: 'champagne-pearl',
    name: 'Champagne Pearl',
    tones: ['#fef08a', '#f59e0b', '#fffbeb'],
    description: 'Lustrous ivory champagne, gilded pearl, and soft sunlight',
  },
  {
    id: 'imperial-bronze',
    name: 'Imperial Bronze',
    tones: ['#b45309', '#f59e0b', '#78350f'],
    description: 'Rich antique bronze, molten copper, and honeyed glaze',
  },
  {
    id: 'celestial-aureolin',
    name: 'Celestial Aureolin',
    tones: ['#fde68a', '#fbbf24', '#ca8a04'],
    description: 'Sunlit aurum, starlight gold, and celestial glow',
  },
]

const ADDONS = [
  {
    id: 'monogram',
    name: 'Hand-Stamped Monogram / Name',
    price: 99,
    icon: FilePenLine,
    description: 'Personalized initials or short quote in calligraphy',
  },
  {
    id: 'gold-foil',
    name: '24K Gold Leaf Flake Accents',
    price: 79,
    icon: Sparkles,
    description: 'Luminous metallic foil flecks embedded within the craft',
  },
  {
    id: 'botanicals',
    name: 'Dried Lavender & Blossom Infusion',
    price: 69,
    icon: Flame,
    description: 'Real organic floral petals hand-harvested from studio gardens',
  },
  {
    id: 'gift-box',
    name: 'Artisan Keepsake Velvet Gift Box',
    price: 129,
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
      price: `₹${calculatedPrice.toFixed(0)}`,
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
            <Sparkles className="h-3.5 w-3.5 text-[#8c5f0b]" /> Interactive Studio
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl text-[#241705] font-serif font-bold tracking-tight">
            Design Your Bespoke Handmade Craft
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5e4318] sm:text-lg font-medium">
            Choose your artisan base piece, select a curated color mood, and personalize with custom engravings or gold leaf. We craft each one-of-a-kind piece from scratch.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="glass-card grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10 border border-[#d4a338]/35 bg-[#fffef9]/95">
          {/* Controls Column */}
          <div className="space-y-8">
            {/* Step 1: Base Craft */}
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-xs font-bold text-[#1a1204]">
                  1
                </span>
                <h3 className="font-serif text-2xl text-[#241705] font-bold">Choose Craft Base</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {BASE_CRAFTS.map((craft) => (
                  <button
                    key={craft.id}
                    type="button"
                    onClick={() => setSelectedCraft(craft)}
                    className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition duration-200 ${
                      selectedCraft.id === craft.id
                        ? 'border-[#b8860b] bg-[#e5be5e]/20 shadow-sm ring-1 ring-[#b8860b]'
                        : 'border-[#d4a338]/30 bg-white/90 hover:border-[#b8860b] hover:bg-white'
                    }`}
                  >
                    <p className="text-sm font-bold text-[#241705]">{craft.title}</p>
                    <p className="mt-1 text-xs text-[#73562a] line-clamp-1">{craft.category}</p>
                    <span className="mt-3 text-sm font-extrabold text-[#241705]">₹{craft.basePrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Color Palette */}
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-xs font-bold text-[#1a1204]">
                  2
                </span>
                <h3 className="font-serif text-2xl text-[#241705] font-bold">Select Artisan Color Mood</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setSelectedPalette(palette)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition ${
                      selectedPalette.id === palette.id
                        ? 'border-[#b8860b] bg-[#e5be5e]/20 shadow-sm ring-1 ring-[#b8860b]'
                        : 'border-[#d4a338]/30 bg-white/90 hover:border-[#b8860b] hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#241705]">{palette.name}</p>
                      <p className="text-xs text-[#73562a]">{palette.description}</p>
                    </div>
                    <div className="flex -space-x-1.5 pl-2">
                      {palette.tones.map((color, i) => (
                        <span
                          key={i}
                          className="h-5 w-5 rounded-full border border-black/10 shadow-sm"
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
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-xs font-bold text-[#1a1204]">
                  3
                </span>
                <h3 className="font-serif text-2xl text-[#241705] font-bold">Artisan Touches & Add-ons</h3>
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
                          ? 'border-[#b8860b] bg-[#e5be5e]/20 shadow-sm'
                          : 'border-[#d4a338]/30 bg-white/90 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-xl transition ${
                            isChecked ? 'bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] text-[#1a1204] font-bold' : 'bg-[#fbf4e4] text-[#8c5f0b]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#241705] sm:text-sm">{addon.name}</p>
                          <p className="text-[11px] text-[#73562a]">{addon.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#241705]">+₹{addon.price}</span>
                        <div
                          className={`grid h-5 w-5 place-items-center rounded-full border transition ${
                            isChecked ? 'border-[#b8860b] bg-[#b8860b] text-white' : 'border-[#d4a338]/40 bg-white'
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
                  <label className="mb-1 block text-xs font-bold text-[#241705]">
                    Custom Monogram / Inscription Text (Max 24 characters)
                  </label>
                  <input
                    maxLength={24}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g., 'Maya • 2026' or 'Forever Glowing'"
                    className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-4 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#d4a338]/35 bg-white/95 p-6 shadow-lift lg:p-8">
            <div>
              <div className="flex items-center justify-between">
                <span className="section-eyebrow">Live Custom Preview</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8c5f0b]">
                  1-of-1 Bespoke
                </span>
              </div>

              <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#fbf4e4] shadow-inner">
                <img
                  src={selectedCraft.image}
                  alt={selectedCraft.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241705]/50 via-transparent to-transparent" />

                {/* Floating Palette Tag */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-[#d4a338]/35 bg-white/95 px-3 py-1 text-xs font-bold text-[#241705] shadow-sm backdrop-blur-md">
                  <Palette className="h-3.5 w-3.5 text-[#8c5f0b]" />
                  {selectedPalette.name}
                </div>

                {customText && (
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl border border-[#d4a338]/35 bg-white/95 p-2 text-center shadow-sm backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c5f0b]">Custom Engraving</p>
                    <p className="font-serif text-sm font-semibold italic text-[#241705]">"{customText}"</p>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <h4 className="font-serif text-2xl text-[#241705] font-bold">{selectedCraft.title}</h4>
                <p className="text-xs leading-5 text-[#5e4318]">{selectedCraft.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="rounded-full bg-[#fbf4e4] border border-[#d4a338]/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4a340e]">
                    Palette: {selectedPalette.name}
                  </span>
                  {selectedAddons.map((id) => (
                    <span
                      key={id}
                      className="rounded-full bg-[#e5be5e]/20 border border-[#d4a338]/35 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4a340e]"
                    >
                      {ADDONS.find((a) => a.id === id)?.name.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#d4a338]/25 pt-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#73562a]">Total Craft Price</p>
                  <p className="font-serif text-3xl font-extrabold text-[#241705]">₹{calculatedPrice.toFixed(0)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomToBag}
                  className="btn-primary shadow-lift"
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
