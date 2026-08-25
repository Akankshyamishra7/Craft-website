"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { fallbackCraftImage } from '../utils/fallbackImage'

export default function CartSidebar() {
  const {
    cartItems,
    cartSubtotal,
    cartFinalTotal,
    discountAmount,
    shippingCost,
    giftWrapCost,
    isGiftWrap,
    setIsGiftWrap,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setCartQuantity,
    removeFromCart,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
  } = useMarketplace()

  const [couponInput, setCouponInput] = useState('')

  const freeShippingThreshold = 50
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    applyCouponCode(couponInput)
    setCouponInput('')
  }

  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.div
            key="cart-backdrop"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-[80] bg-cocoa/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          <motion.aside
            key="cart-sidebar"
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-white/80 bg-cream shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/70 bg-white/60 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-clay-light text-clay">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-cocoa">Your Shopping Bag</h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white text-cocoa shadow-soft transition hover:bg-sand/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress Ticker */}
            <div className="border-b border-sand/60 bg-white/40 px-6 py-3">
              <div className="flex items-center justify-between text-xs font-bold text-cocoa">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-clay" />
                  {cartSubtotal >= freeShippingThreshold ? (
                    <span className="text-moss">🎉 You unlocked FREE Shipping!</span>
                  ) : (
                    <span>Add ${remainingForFreeShipping.toFixed(2)} more for FREE Shipping</span>
                  )}
                </span>
                <span className="text-[10px] text-cocoa-muted">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sand/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blossom via-clay to-moss"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-cocoa/15 bg-white/50 p-8 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-sand/40 text-cocoa/30">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-cocoa">Your bag is empty</h4>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-cocoa-muted">
                    Explore our handmade jewelry, candles, and custom gifts to fill your bag.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary mt-6 text-xs uppercase tracking-wider"
                  >
                    Explore Marketplace
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const priceNum = Number.parseFloat(item.price.replace('$', '')) || 0
                    const itemTotal = priceNum * item.quantity

                    return (
                      <article
                        key={item.cartItemId}
                        className="group overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-soft transition duration-200 hover:shadow-lift"
                      >
                        <div className="flex gap-3.5">
                          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand/30">
                            <img
                              src={item.image}
                              alt={item.title}
                              onError={(e) => {
                                e.currentTarget.src = fallbackCraftImage
                              }}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="truncate font-serif text-lg font-bold text-cocoa">{item.title}</h5>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.cartItemId)}
                                  aria-label="Remove item"
                                  className="text-cocoa/40 transition hover:text-rose-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-moss">
                                {item.category}
                              </p>
                              {item.customization && (
                                <p className="mt-0.5 text-[10px] text-clay">
                                  Bespoke: {item.customization.palette}
                                  {item.customization.personalization ? ` • "${item.customization.personalization}"` : ''}
                                </p>
                              )}
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-3">
                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-2 rounded-full border border-sand/70 bg-sand/30 px-2 py-1">
                                <button
                                  type="button"
                                  onClick={() => setCartQuantity(item.cartItemId, item.quantity - 1)}
                                  className="grid h-6 w-6 place-items-center rounded-full bg-white text-cocoa shadow-sm transition hover:bg-sand"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="min-w-5 text-center text-xs font-bold text-cocoa">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCartQuantity(item.cartItemId, item.quantity + 1)}
                                  className="grid h-6 w-6 place-items-center rounded-full bg-white text-cocoa shadow-sm transition hover:bg-sand"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <span className="text-sm font-extrabold text-clay">${itemTotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/80 bg-white/80 p-5 shadow-dropdown backdrop-blur-md">
                {/* Promo Code Input */}
                <div className="mb-3.5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between rounded-xl bg-mint/40 px-3.5 py-2 text-xs font-bold text-moss">
                      <span className="flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5" />
                        Code {appliedCoupon.code} Applied ({appliedCoupon.label})
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-cocoa/50 underline hover:text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cocoa-muted" />
                        <input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon: CRAFTY10 or FREESHIP"
                          className="h-9 w-full rounded-xl border border-sand bg-white/90 pl-8 pr-3 text-xs text-cocoa outline-none focus:border-clay"
                        />
                      </div>
                      <button
                        type="submit"
                        className="rounded-xl bg-cocoa px-3 text-xs font-bold text-white transition hover:bg-clay"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Gift Wrap Toggle */}
                <div className="mb-4 flex items-center justify-between rounded-xl bg-sand/30 p-2.5 text-xs">
                  <label className="flex cursor-pointer items-center gap-2 font-medium text-cocoa">
                    <input
                      type="checkbox"
                      checked={isGiftWrap}
                      onChange={(e) => setIsGiftWrap(e.target.checked)}
                      className="accent-clay"
                    />
                    <Gift className="h-3.5 w-3.5 text-clay" /> Add Boutique Gift Wrap (+$3.50)
                  </label>
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-cocoa">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between font-bold text-clay">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <strong className="text-moss">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {giftWrapCost > 0 && (
                    <div className="flex justify-between">
                      <span>Gift Wrap</span>
                      <span>+${giftWrapCost.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-sand/70 pt-2 flex justify-between text-base font-bold text-cocoa">
                    <span>Estimated Total</span>
                    <span className="text-lg text-clay">${cartFinalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="btn-primary mt-4 w-full py-3.5 shadow-lift"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}