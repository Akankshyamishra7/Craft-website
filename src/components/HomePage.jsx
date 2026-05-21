import Footer from './Footer'
import CartSidebar from './CartSidebar'
import AuthModal from './AuthModal'
import SellCraftModal from './SellCraftModal'
import Hero from './Hero'
import HandmadeGallery from './HandmadeGallery'
import Navbar from './Navbar'
import Newsletter from './Newsletter'
import Testimonials from './Testimonials'
import { testimonials } from '../data/products'

function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <HandmadeGallery />
        <Testimonials testimonials={testimonials} />
        <Newsletter />
      </main>
      <Footer />
      <CartSidebar />
      <AuthModal />
      <SellCraftModal />
    </div>
  )
}

export default HomePage
