import { categories } from '../data/products'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section id="collection" ref={ref} className={`section-shell py-16 sm:py-20 ${isVisible ? 'is-visible' : ''}`}>
      <div className="reveal is-visible space-y-8">
        <div className="flex flex-col gap-4 text-center">
          <span className="section-eyebrow">Trending</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#241705]">Get the Trending products this season</h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-[#5e4318] sm:text-lg">
            A gentle mix of handmade essentials, soft textures, and one-of-a-kind accents for your next thoughtful gift or home refresh.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[#d4a338]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#241705] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#faeed1] hover:border-[#d4a338] cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
