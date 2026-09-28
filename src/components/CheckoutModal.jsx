"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  CreditCard,
  Lock,
  PackageCheck,
  QrCode,
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
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
    upiId: 'artisan@okhdfcbank',
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
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.2rem] bg-[#fdf9f0] border border-[#d4a338]/40 shadow-[0_25px_60px_rgba(133,90,16,0.25),0_0_30px_rgba(212,163,56,0.2)]"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button
              type="button"
              aria-label="Close checkout modal"
              onClick={handleClose}
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/90 text-[#4a340e] shadow-soft transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {step === 'form' ? (
              <div>
                <div className="border-b border-[#d4a338]/30 bg-gradient-to-r from-[#faeccd] via-[#f7e4b5] to-[#faeccd] px-6 py-6 sm:px-8 text-[#4a340e]">
                  <div className="flex items-center gap-2">
                    <span className="section-eyebrow">Artisan Checkout</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8c5f0b]">
                      <Lock className="h-3.5 w-3.5" /> 256-bit Encrypted • India
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-3xl text-[#241705] font-bold">Complete Your Craft Order</h3>
                  <p className="mt-1 text-xs text-[#5e4318] sm:text-sm font-medium">
                    Handmade directly by artisan creators • Ships with eco-friendly boutique packaging across India
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                  {/* Order Summary Pill */}
                  <div className="rounded-2xl border border-[#d4a338]/30 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8c5f0b]">
                      <span>Order Items ({cartItems.length})</span>
                      <span className="text-[#241705]">Total: ₹{cartFinalTotal.toFixed(0)}</span>
                    </div>
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="flex shrink-0 items-center gap-2 rounded-xl bg-[#fbf4e4] p-1.5 pr-3 text-xs"
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
                            <p className="max-w-[120px] truncate font-bold text-[#241705]">{item.title}</p>
                            <p className="text-[10px] text-[#73562a]">{item.quantity}x • {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#241705]">
                      <Truck className="h-4 w-4 text-[#8c5f0b] font-extrabold" /> 1. Shipping Address (India)
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#241705]">Full Name</label>
                        <input
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ananya Sharma"
                          className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#241705]">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ananya@example.in"
                          className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-bold text-[#241705]">Street Address / Landmark</label>
                        <input
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Flat 402, Lotus Studio Apts, Indiranagar"
                          className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#241705]">City</label>
                        <input
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Bengaluru"
                          className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#241705]">PIN Code (6 digits)</label>
                        <input
                          required
                          maxLength={6}
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          placeholder="560038"
                          className="h-11 w-full rounded-xl border border-[#d4a338]/35 bg-white px-3.5 text-sm text-[#241705] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#e5be5e]/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#241705]">
                      <CreditCard className="h-4 w-4 text-[#8c5f0b] font-extrabold" /> 2. Payment Method
                    </h4>
                    <div className="mt-3 grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: QrCode },
                        { id: 'card', label: 'Cards / NetBanking', icon: CreditCard },
                        { id: 'cod', label: 'Cash on Delivery', icon: ShieldCheck },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: item.id })}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition ${
                            formData.paymentMethod === item.id
                              ? 'border-[#b8860b] bg-[#e5be5e]/25 text-[#1a1204] font-extrabold shadow-sm'
                              : 'border-[#d4a338]/30 bg-white text-[#4a340e] hover:border-[#b8860b]'
                          }`}
                        >
                          <item.icon className="h-4 w-4 text-[#8c5f0b]" />
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {formData.paymentMethod === 'upi' && (
                      <div className="mt-3.5 rounded-2xl border border-[#d4a338]/30 bg-white p-4 shadow-sm">
                        <label className="mb-1 block text-xs font-bold text-[#241705]">Enter UPI ID / VPA</label>
                        <div className="flex gap-2">
                          <input
                            defaultValue="yourname@okhdfcbank"
                            className="h-10 flex-1 rounded-xl border border-[#d4a338]/30 bg-[#fbf4e4] px-3 text-sm text-[#241705] outline-none focus:border-[#b8860b]"
                            placeholder="e.g. mobile@upi"
                          />
                          <button
                            type="button"
                            className="rounded-xl bg-[#e5be5e]/20 border border-[#d4a338]/35 px-4 text-xs font-bold text-[#241705] hover:bg-[#e5be5e] transition"
                          >
                            Verify
                          </button>
                        </div>
                        <p className="mt-2 text-[11px] text-[#73562a]">Supports Google Pay, PhonePe, Paytm, BHIM, and Cred UPI.</p>
                      </div>
                    )}

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-3.5 rounded-2xl border border-[#d4a338]/30 bg-white p-3.5 shadow-sm">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label className="mb-1 block text-xs font-bold text-[#241705]">Card Number (RuPay / Visa / Mastercard)</label>
                            <input
                              defaultValue="4532 •••• •••• 8892"
                              className="h-10 w-full rounded-xl border border-[#d4a338]/30 bg-[#fbf4e4] px-3 text-sm text-[#241705] outline-none focus:border-[#b8860b]"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-[#241705]">Expiry Date</label>
                            <input
                              defaultValue="08/29"
                              className="h-10 w-full rounded-xl border border-[#d4a338]/30 bg-[#fbf4e4] px-3 text-sm text-[#241705] outline-none focus:border-[#b8860b]"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-[#241705]">CVV</label>
                            <input
                              defaultValue="882"
                              className="h-10 w-full rounded-xl border border-[#d4a338]/30 bg-[#fbf4e4] px-3 text-sm text-[#241705] outline-none focus:border-[#b8860b]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 rounded-2xl bg-white border border-[#d4a338]/30 p-4 text-xs text-[#4a340e]">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-bold text-[#241705]">₹{cartSubtotal.toFixed(0)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-bold text-[#8c5f0b]">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-₹{discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? <strong className="text-[#8c5f0b]">FREE</strong> : `₹${shippingCost.toFixed(0)}`}</span>
                    </div>
                    {giftWrapCost > 0 && (
                      <div className="flex justify-between">
                        <span>Boutique Gift Wrapping</span>
                        <span>+₹{giftWrapCost.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="border-t border-[#d4a338]/25 pt-2 flex justify-between text-sm font-bold text-[#241705]">
                      <span>Total Due</span>
                      <span className="text-xl text-[#241705] font-extrabold">₹{cartFinalTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 text-base shadow-lift"
                  >
                    <PackageCheck className="h-5 w-5" />
                    Place Artisan Order • ₹{cartFinalTotal.toFixed(0)}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Celebration State */
              <div className="p-8 text-center sm:p-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e5be5e]/20 text-[#8c5f0b] shadow-[0_0_30px_rgba(212,163,56,0.3)] border border-[#d4a338]/40">
                  <CheckCircle2 className="h-10 w-10 text-[#8c5f0b]" />
                </div>

                <span className="section-eyebrow mt-5">Handcrafted Order Placed</span>
                <h3 className="mt-2 font-serif text-4xl text-[#241705] font-bold">Thank You for Supporting Artisans!</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5e4318]">
                  We have received your order <strong className="text-[#241705] font-extrabold">#{confirmedOrder?.orderId}</strong>.
                  Our craftspeople are now preparing your handmade items with personalized care.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#d4a338]/30 bg-white p-4 text-left shadow-sm">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#5e4318]">Estimated Delivery:</span>
                    <strong className="text-[#241705]">{confirmedOrder?.estimatedDelivery}</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="font-semibold text-[#5e4318]">Shipping to:</span>
                    <strong className="text-[#241705]">{formData.fullName} ({formData.city})</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="font-semibold text-[#5e4318]">Order Total:</span>
                    <strong className="text-[#241705] font-extrabold">₹{confirmedOrder?.total.toFixed(0)}</strong>
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
