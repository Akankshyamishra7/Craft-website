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
            className="fixed inset-0 z-[80] bg-[#241705]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          <motion.aside
            key="cart-sidebar"
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-[#d4a338]/35 bg-[#fcf7ee] shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d4a338]/25 bg-white/80 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e5be5e]/20 text-[#8c5f0b] font-extrabold border border-[#d4a338]/35">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#241705] font-bold">Your Shopping Bag</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c5f0b]">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white text-[#4a340e] shadow-soft transition hover:bg-[#fbf4e4]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress Ticker */}
            <div className="border-b border-[#d4a338]/25 bg-[#e5be5e]/15 px-6 py-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#241705]">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-[#8c5f0b] font-extrabold" />
                  {cartSubtotal >= freeShippingThreshold ? (
                    <span className="text-[#8c5f0b]">🎉 You unlocked FREE Shipping!</span>
                  ) : (
                    <span>Add ₹{Math.max(0, remainingForFreeShipping).toFixed(0)} more for FREE Shipping</span>
                  )}
                </span>
                <span className="text-[10px] text-[#73562a] font-bold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#e8bc57] to-[#c89122]"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-[#d4a338]/35 bg-white/60 p-8 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e5be5e]/20 text-[#8c5f0b]">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-[#241705]">Your bag is empty</h4>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#5e4318]">
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
                        className="group overflow-hidden rounded-2xl border border-[#d4a338]/30 bg-white/95 p-3.5 shadow-sm transition duration-200 hover:border-[#b8860b]"
                      >
                        <div className="flex gap-3.5">
                          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#fbf4e4]">
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
                                <h5 className="truncate font-serif text-lg font-bold text-[#241705]">{item.title}</h5>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.cartItemId)}
                                  aria-label="Remove item"
                                  className="text-[#73562a] transition hover:text-rose-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c5f0b]">
                                {item.category}
                              </p>
                              {item.customization && (
                                <p className="mt-0.5 text-[10px] text-[#4a340e] font-bold">
                                  Bespoke: {item.customization.palette}
                                  {item.customization.personalization ? ` • "${item.customization.personalization}"` : ''}
                                </p>
                              )}
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-3">
                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-2 rounded-full border border-[#d4a338]/30 bg-[#fbf4e4] px-2 py-1">
                                <button
                                  type="button"
                                  onClick={() => setCartQuantity(item.cartItemId, item.quantity - 1)}
                                  className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#241705] shadow-sm transition hover:bg-[#e5be5e]"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="min-w-5 text-center text-xs font-bold text-[#241705]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCartQuantity(item.cartItemId, item.quantity + 1)}
                                  className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#241705] shadow-sm transition hover:bg-[#e5be5e]"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <span className="text-sm font-extrabold text-[#241705]">₹{itemTotal.toFixed(0)}</span>
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
              <div className="border-t border-[#d4a338]/25 bg-white/95 p-5 shadow-dropdown backdrop-blur-md">
                {/* Promo Code Input */}
                <div className="mb-3.5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between rounded-xl bg-[#e5be5e]/20 border border-[#d4a338]/35 px-3.5 py-2 text-xs font-bold text-[#241705]">
                      <span className="flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5 text-[#8c5f0b]" />
                        Code {appliedCoupon.code} Applied ({appliedCoupon.label})
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-[#73562a] underline hover:text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8c5f0b]" />
                          <input
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Coupon code..."
                            className="h-9 w-full rounded-xl border border-[#d4a338]/35 bg-white pl-8 pr-3 text-xs text-[#241705] outline-none focus:border-[#b8860b]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="rounded-xl bg-gradient-to-r from-[#fff3cf] via-[#e8bc57] to-[#c89122] px-3.5 text-xs font-bold text-[#1a1204] transition hover:brightness-110 shadow-sm"
                        >
                          Apply
                        </button>
                      </form>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#5e4318]">
                        <span className="shrink-0 font-medium">Quick apply:</span>
                        {['ATELIER10', 'HANDMADE20', 'FREESHIP'].map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => applyCouponCode(code)}
                            className="rounded-md border border-[#d4a338]/35 bg-[#e5be5e]/20 px-1.5 py-0.5 font-bold text-[#4a340e] transition hover:bg-[#e5be5e]"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Gift Wrap Toggle */}
                <div className="mb-4 flex items-center justify-between rounded-xl bg-[#fbf4e4] p-2.5 text-xs border border-[#d4a338]/25">
                  <label className="flex cursor-pointer items-center gap-2 font-bold text-[#241705]">
                    <input
                      type="checkbox"
                      checked={isGiftWrap}
                      onChange={(e) => setIsGiftWrap(e.target.checked)}
                      className="accent-[#b8860b]"
                    />
                    <Gift className="h-3.5 w-3.5 text-[#8c5f0b] font-extrabold" /> Add Boutique Gift Wrap (+₹49)
                  </label>
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-[#4a340e]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#241705]">₹{cartSubtotal.toFixed(0)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between font-bold text-[#8c5f0b]">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <strong className="text-[#8c5f0b]">FREE</strong> : `₹${shippingCost.toFixed(0)}`}</span>
                  </div>
                  {giftWrapCost > 0 && (
                    <div className="flex justify-between">
                      <span>Gift Wrap</span>
                      <span>+₹{giftWrapCost.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="border-t border-[#d4a338]/25 pt-2 flex justify-between text-base font-bold text-[#241705]">
                    <span>Estimated Total</span>
                    <span className="text-xl text-[#241705] font-extrabold">₹{cartFinalTotal.toFixed(0)}</span>
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