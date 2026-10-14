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
    upiId: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="checkout-modal-card"
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-[2.2rem] bg-white border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(180,135,45,0.22)]"
            initial={{ scale: 0.96, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 14 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              aria-label="Close checkout modal"
              onClick={handleClose}
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#DFCFA6]/60 bg-white text-[#141414] shadow-sm transition hover:bg-[#FAF6ED] hover:border-[#D4AF37]"
            >
              <X className="h-5 w-5" />
            </button>

            {step === 'form' ? (
              <div>
                <div className="border-b border-[#DFCFA6]/60 bg-gradient-to-r from-white via-[#FDFBF7] to-[#FAF6ED] px-6 py-6 sm:px-8 text-[#141414]">
                  <div className="flex items-center gap-2">
                    <span className="section-eyebrow">Artisan Checkout</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8C827A]">
                      <Lock className="h-3.5 w-3.5 text-[#B8860B]" /> 256-bit Encrypted • India
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-3xl text-[#141414] font-bold">Complete Your Craft Order</h3>
                  <p className="mt-1 text-xs text-[#5A554E] sm:text-sm font-medium">
                    Handmade directly by artisan creators • Ships with eco-friendly boutique packaging across India
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                  {/* Order Summary Pill */}
                  <div className="rounded-2xl border border-[#DFCFA6]/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/90 p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                      <span>Order Items ({cartItems.length})</span>
                      <span className="text-[#875A10] font-extrabold">Total: ₹{cartFinalTotal.toFixed(0)}</span>
                    </div>
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="flex shrink-0 items-center gap-2 rounded-xl bg-white/95 border border-[#DFCFA6]/60 p-1.5 pr-3 text-xs"
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
                            <p className="max-w-[120px] truncate font-bold text-[#141414]">{item.title}</p>
                            <p className="text-[10px] text-[#8C827A]">{item.quantity}x • {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#141414]">
                      <Truck className="h-4 w-4 text-[#B8860B]" /> 1. Shipping Address (India)
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#141414]">Full Name</label>
                        <input
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ananya Sharma"
                          className="h-11 w-full rounded-xl border border-[#DFCFA6]/80 bg-[#FAF8F5] px-3.5 text-sm text-[#141414] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 font-medium"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#141414]">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ananya@example.in"
                          className="h-11 w-full rounded-xl border border-[#DFCFA6]/80 bg-[#FAF8F5] px-3.5 text-sm text-[#141414] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 font-medium"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-bold text-[#141414]">Street Address / Landmark</label>
                        <input
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Flat 402, Lotus Studio Apts, Indiranagar"
                          className="h-11 w-full rounded-xl border border-[#DFCFA6]/80 bg-[#FAF8F5] px-3.5 text-sm text-[#141414] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 font-medium"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#141414]">City</label>
                        <input
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Bengaluru"
                          className="h-11 w-full rounded-xl border border-[#DFCFA6]/80 bg-[#FAF8F5] px-3.5 text-sm text-[#141414] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 font-medium"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-[#141414]">PIN Code (6 digits)</label>
                        <input
                          required
                          maxLength={6}
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          placeholder="560038"
                          className="h-11 w-full rounded-xl border border-[#DFCFA6]/80 bg-[#FAF8F5] px-3.5 text-sm text-[#141414] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#141414]">
                      <CreditCard className="h-4 w-4 text-[#B8860B]" /> 2. Payment Method
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
                              ? 'border-[#D4AF37] bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC] text-[#3E2D07] font-bold shadow-sm ring-1 ring-[#D4AF37]'
                              : 'border-[#DFCFA6]/50 bg-gradient-to-b from-[#FFFDF9]/70 to-[#FAF6ED]/50 text-[#5A554E] hover:border-[#D4AF37]/70'
                          }`}
                        >
                          <item.icon className="h-4 w-4 text-[#B8860B]" />
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {formData.paymentMethod === 'upi' && (
                      <div className="mt-3.5 rounded-2xl border border-[#DFCFA6]/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/90 p-4 shadow-sm">
                        <label className="mb-1 block text-xs font-bold text-[#141414]">Enter UPI ID / VPA</label>
                        <div className="flex gap-2">
                          <input
                            value={formData.upiId}
                            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                            className="h-10 flex-1 rounded-xl border border-[#DFCFA6]/80 bg-white px-3 text-sm text-[#141414] outline-none focus:border-[#D4AF37]"
                            placeholder="e.g. yourname@upi"
                          />
                          <button
                            type="button"
                            className="rounded-xl bg-gradient-to-r from-[#1A120B] to-[#2E2010] border border-[#D4AF37]/40 px-4 text-xs font-bold text-[#F2D785] hover:border-[#D4AF37] transition"
                          >
                            Verify
                          </button>
                        </div>
                        <p className="mt-2 text-[11px] text-[#8C827A]">Supports Google Pay, PhonePe, Paytm, BHIM, and Cred UPI.</p>
                      </div>
                    )}

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-3.5 rounded-2xl border border-[#DFCFA6]/80 bg-[#FAF8F5] p-3.5 shadow-sm">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label className="mb-1 block text-xs font-bold text-[#141414]">Card Number (RuPay / Visa / Mastercard)</label>
                            <input
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              placeholder="1234 5678 9012 3456"
                              className="h-10 w-full rounded-xl border border-[#DFCFA6]/80 bg-white px-3 text-sm text-[#141414] outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-[#141414]">Expiry Date</label>
                            <input
                              value={formData.cardExp}
                              onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                              placeholder="MM/YY"
                              className="h-10 w-full rounded-xl border border-[#DFCFA6]/80 bg-white px-3 text-sm text-[#141414] outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-[#141414]">CVV</label>
                            <input
                              value={formData.cardCvc}
                              onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                              placeholder="123"
                              maxLength={4}
                              className="h-10 w-full rounded-xl border border-[#DFCFA6]/80 bg-white px-3 text-sm text-[#141414] outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF6ED] border border-[#DFCFA6]/80 p-4 text-xs text-[#5A554E]">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-bold text-[#141414]">₹{cartSubtotal.toFixed(0)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-bold text-[#B8860B]">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-₹{discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? <strong className="text-[#875A10]">FREE</strong> : `₹${shippingCost.toFixed(0)}`}</span>
                    </div>
                    {giftWrapCost > 0 && (
                      <div className="flex justify-between">
                        <span>Boutique Gift Wrapping</span>
                        <span>+₹{giftWrapCost.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="border-t border-[#DFCFA6]/60 pt-2 flex justify-between text-sm font-bold text-[#141414]">
                      <span>Total Due</span>
                      <span className="text-xl text-[#875A10] font-extrabold">₹{cartFinalTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-4 text-base shadow-[0_8px_25px_rgba(212,175,55,0.35)] justify-center font-bold tracking-wide"
                  >
                    <PackageCheck className="h-5 w-5" />
                    Place Artisan Order • ₹{cartFinalTotal.toFixed(0)}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Celebration State */
              <div className="p-8 text-center sm:p-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#996515] text-[#1A120B] border border-[#F2D785] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                  <CheckCircle2 className="h-10 w-10 text-[#1A120B]" />
                </div>

                <span className="section-eyebrow mt-5">Handcrafted Order Placed</span>
                <h3 className="mt-2 font-serif text-4xl text-[#141414] font-bold">Thank You for Supporting Artisans!</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5A554E]">
                  We have received your order <strong className="text-[#875A10] font-extrabold">#{confirmedOrder?.orderId}</strong>.
                  Our craftspeople are now preparing your handmade items with personalized care.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#DFCFA6]/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDC]/90 p-4 text-left shadow-sm">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#5A554E]">Estimated Delivery:</span>
                    <strong className="text-[#141414]">{confirmedOrder?.estimatedDelivery}</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="font-semibold text-[#5A554E]">Shipping to:</span>
                    <strong className="text-[#141414]">{formData.fullName} ({formData.city})</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="font-semibold text-[#5A554E]">Order Total:</span>
                    <strong className="text-[#875A10] font-extrabold">₹{confirmedOrder?.total.toFixed(0)}</strong>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-gold"
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
