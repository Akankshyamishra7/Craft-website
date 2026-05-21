"use client"

import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

function Testimonials({ testimonials }) {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="about" ref={ref} className={`section-shell py-10 sm:py-14 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible space-y-8">
        <div className="text-center">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Loved by handmade lovers</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="soft-card p-6">
              <p className="text-lg leading-8 text-cocoa/75">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="font-serif text-2xl text-cocoa">{testimonial.name}</p>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
