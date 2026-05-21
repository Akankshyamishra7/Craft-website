"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { fallbackCraftImage } from '../utils/fallbackImage'

function CartSidebar() {
  const { cartItems, cartSubtotal, isCartOpen, setIsCartOpen, setCartQuantity, removeFromCart } = useMarketplace()

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-50 bg-cocoa/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-white/70 bg-cream shadow-lift"
            initial={{ x: 480 }}
            animate={{ x: 0 }}
            exit={{ x: 480 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <div className="flex items-center justify-between border-b border-white/70 px-5 py-4 sm:px-6">
              <div>
                <p className="section-eyebrow">Your cart</p>
                <h3 className="mt-1 text-2xl">Handmade treasures</h3>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/80 text-cocoa transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-cocoa/15 bg-white/55 p-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-cocoa/25" />
                  <p className="mt-4 text-xl font-semibold text-cocoa">Your cart is empty</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-cocoa/65">
                    Add a few handmade pieces, then come back here to review quantity and checkout.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemTotal = (Number.parseFloat(item.price.replace('$', '')) || 0) * item.quantity

                    return (
                      <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-3 shadow-soft">
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            onError={(event) => {
                              event.currentTarget.src = fallbackCraftImage
                            }}
                            className="h-24 w-24 rounded-[1.1rem] object-cover"
                          />

                          <div className="min-w-0 flex-1 space-y-2">
                            <div>
                              <p className="truncate font-serif text-xl text-cocoa">{item.title}</p>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss">{item.category}</p>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                              <p className="text-lg font-semibold text-clay">{item.price}</p>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa/55 transition hover:text-cocoa"
                              >
                                <Trash2 className="mr-1 inline-block h-3.5 w-3.5" />
                                Remove
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-full bg-sand/55 px-3 py-2">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  aria-label={`Decrease quantity for ${item.title}`}
                                  onClick={() => setCartQuantity(item.id, item.quantity - 1)}
                                  className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="min-w-6 text-center text-sm font-semibold text-cocoa">{item.quantity}</span>
                                <button
                                  type="button"
                                  aria-label={`Increase quantity for ${item.title}`}
                                  onClick={() => setCartQuantity(item.id, item.quantity + 1)}
                                  className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-sm font-semibold text-cocoa">${itemTotal.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-white/70 bg-white/55 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between rounded-[1.4rem] bg-white/85 px-4 py-3 shadow-soft">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">Subtotal</p>
                  <p className="mt-1 text-2xl font-semibold text-cocoa">${cartSubtotal.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]"
                  onClick={() => setIsCartOpen(false)}
                >
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.26em] text-cocoa/45">
                Secure checkout preview only
              </p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}

export default CartSidebar