"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  CreditCard,
  Lock,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react'
import { useMarketplace } from '../context/MarketplaceContext'
import { fallbackCraftImage } from '../utils/fallbackImage'

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    cartSubtotal,
    cartFinalTotal,
    discountAmount,
    shippingCost,
    giftWrapCost,
    appliedCoupon,
    createOrder,
    user,
  } = useMarketplace()

  const [step, setStep] = useState('form') // 'form' | 'success'
  const [confirmedOrder, setConfirmedOrder] = useState(null)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'card', // 'card' | 'applepay' | 'cod'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const order = createOrder(formData)
    setConfirmedOrder(order)
    setStep('success')
  }

  const handleClose = () => {
    setIsCheckoutOpen(false)
    // reset state after animation
    setTimeout(() => {
      setStep('form')
      setConfirmedOrder(null)
    }, 300)
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen ? (
        <motion.div
          key="checkout-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-cocoa/50 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="checkout-modal-card"
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.2rem] bg-cream shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button
              type="button"
              aria-label="Close checkout modal"
              onClick={handleClose}
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-cocoa shadow-soft transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {step === 'form' ? (
              <div>
                <div className="border-b border-white/80 bg-gradient-to-r from-blossom/60 via-sand/50 to-mint/40 px-6 py-6 sm:px-8">
                  <div className="flex items-center gap-2">
                    <span className="section-eyebrow">Artisan Checkout</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-moss">
                      <Lock className="h-3.5 w-3.5" /> 256-bit Encrypted
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-3xl text-cocoa">Complete Your Craft Order</h3>
                  <p className="mt-1 text-xs text-cocoa-muted sm:text-sm">
                    Handmade directly by artisan creators • Ships with eco-friendly boutique packaging
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                  {/* Order Summary Pill */}
                  <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-soft">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-moss">
                      <span>Order Items ({cartItems.length})</span>
                      <span>Total: ${cartFinalTotal.toFixed(2)}</span>
                    </div>
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="flex shrink-0 items-center gap-2 rounded-xl bg-sand/30 p-1.5 pr-3 text-xs"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.src = fallbackCraftImage
                            }}
                            className="h-9 w-9 rounded-lg object-cover"
                          />
                          <div>
                            <p className="max-w-[120px] truncate font-medium text-cocoa">{item.title}</p>
                            <p className="text-[10px] text-cocoa-muted">{item.quantity}x • {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cocoa">
                      <Truck className="h-4 w-4 text-clay" /> 1. Shipping Address
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-cocoa">Full Name</label>
                        <input
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Maya Lin"
                          className="h-11 w-full rounded-xl border border-white/90 bg-white/90 px-3.5 text-sm text-cocoa outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-cocoa">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="maya@example.com"
                          className="h-11 w-full rounded-xl border border-white/90 bg-white/90 px-3.5 text-sm text-cocoa outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-semibold text-cocoa">Street Address</label>
                        <input
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="742 Evergreen Studio Way, Apt 3B"
                          className="h-11 w-full rounded-xl border border-white/90 bg-white/90 px-3.5 text-sm text-cocoa outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-cocoa">City</label>
                        <input
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="San Francisco"
                          className="h-11 w-full rounded-xl border border-white/90 bg-white/90 px-3.5 text-sm text-cocoa outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-cocoa">Postal / Zip Code</label>
                        <input
                          required
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          placeholder="94107"
                          className="h-11 w-full rounded-xl border border-white/90 bg-white/90 px-3.5 text-sm text-cocoa outline-none focus:border-clay focus:ring-2 focus:ring-clay/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cocoa">
                      <CreditCard className="h-4 w-4 text-clay" /> 2. Payment Method
                    </h4>
                    <div className="mt-3 grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'card', label: 'Credit Card', icon: CreditCard },
                        { id: 'applepay', label: 'Apple / Google Pay', icon: Sparkles },
                        { id: 'cod', label: 'Cash on Delivery', icon: ShieldCheck },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: item.id })}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition ${
                            formData.paymentMethod === item.id
                              ? 'border-clay bg-clay-light/60 text-clay shadow-sm'
                              : 'border-white/80 bg-white/70 text-cocoa/70 hover:bg-white'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-xs font-semibold">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-3.5 rounded-2xl border border-white/90 bg-white/85 p-3.5 shadow-sm">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label className="mb-1 block text-xs font-semibold text-cocoa">Card Number</label>
                            <input
                              defaultValue="4532 •••• •••• 8892"
                              className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-sm text-cocoa outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs font-semibold text-cocoa">Expiry Date</label>
                            <input
                              defaultValue="08/29"
                              className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-sm text-cocoa outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-cocoa">CVV</label>
                            <input
                              defaultValue="882"
                              className="h-10 w-full rounded-xl border border-sand bg-white px-3 text-sm text-cocoa outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 rounded-2xl bg-cocoa-light/60 p-4 text-xs text-cocoa">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-semibold text-clay">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    {giftWrapCost > 0 && (
                      <div className="flex justify-between">
                        <span>Boutique Gift Wrapping</span>
                        <span>+${giftWrapCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-cocoa/10 pt-2 flex justify-between text-sm font-bold text-cocoa">
                      <span>Total Due</span>
                      <span className="text-base text-clay">${cartFinalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-base shadow-lift"
                  >
                    <PackageCheck className="h-5 w-5" />
                    Place Artisan Order • ${cartFinalTotal.toFixed(2)}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Celebration State */
              <div className="p-8 text-center sm:p-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint/50 text-moss shadow-glow">
                  <CheckCircle2 className="h-10 w-10 text-moss" />
                </div>

                <span className="section-eyebrow mt-5">Handcrafted Order Placed</span>
                <h3 className="mt-2 font-serif text-4xl text-cocoa">Thank You for Supporting Artisans!</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-cocoa-muted">
                  We have received your order <strong className="text-clay">#{confirmedOrder?.orderId}</strong>.
                  Our craftspeople are now preparing your handmade items with personalized care.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/80 bg-white/90 p-4 text-left shadow-soft">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-cocoa-muted">Estimated Delivery:</span>
                    <strong className="text-moss">{confirmedOrder?.estimatedDelivery}</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="font-semibold text-cocoa-muted">Shipping to:</span>
                    <strong className="text-cocoa">{formData.fullName} ({formData.city})</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="font-semibold text-cocoa-muted">Order Total:</span>
                    <strong className="text-clay">${confirmedOrder?.total.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
