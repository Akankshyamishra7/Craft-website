"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    question: 'How long do bespoke custom craft orders take to make?',
    answer:
      'Most custom craft orders (such as resin trays, monogrammed bangles, or personalized candles) take 3 to 5 business days to handcraft, cure, and polish before shipping. Once shipped, standard delivery takes 3-4 days.',
  },
  {
    question: 'What happens if my delicate craft arrives damaged in shipping?',
    answer:
      'We pack all delicate resin, glassware, and candles in reinforced eco-friendly honeycomb wrap and crush-proof boutique boxes. In the rare event of breakage, we offer 100% free replacements or instant full refunds with our Artisan Guarantee.',
  },
  {
    question: 'How do I list and sell my own handmade crafts on Crafty?',
    answer:
      'Click the "Sell Your Craft" button in the top navigation! You can instantly list your handmade items, set your prices, add photos, and join our verified artisan community with zero setup fees.',
  },
  {
    question: 'Are all products truly 100% handmade and eco-friendly?',
    answer:
      'Yes! Every listing is vetted to ensure genuine artisan crafting. Our makers prioritize sustainable materials including non-toxic soy waxes, pure raw silks, organic dried botanicals, and biodegradable packaging.',
  },
  {
    question: 'How do coupon codes and free shipping work?',
    answer:
      'Use code CRAFTY10 at checkout for 10% off your entire order, or HANDMADE20 for 20% off during seasonal drops. All orders with a subtotal over $50 automatically receive Free Worldwide Shipping!',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="reveal is-visible space-y-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">
            <HelpCircle className="h-3.5 w-3.5 text-clay" /> Help & Assurance
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl text-cocoa">Frequently Asked Questions</h2>
          <p className="mx-auto mt-4 text-base leading-7 text-cocoa-muted">
            Everything you need to know about custom orders, handmade materials, and our buyer protection guarantee.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-soft transition duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-white/90"
                >
                  <span className="font-serif text-xl font-bold text-cocoa sm:text-2xl">
                    {faq.question}
                  </span>
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand/40 text-cocoa transition duration-300 ${
                      isOpen ? 'rotate-180 bg-clay text-white' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-sand/40 px-5 pb-5 pt-3 text-sm leading-6 text-cocoa-muted sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mx-auto max-w-lg rounded-2xl border border-white/80 bg-white/70 p-4 text-center shadow-soft backdrop-blur-sm">
          <p className="text-xs text-cocoa-muted">
            Still have questions about a custom piece?{' '}
            <a href="#contact" className="font-bold text-clay underline transition hover:text-cocoa">
              Contact our studio team →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
