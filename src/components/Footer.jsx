"use client"

import { FacebookIcon, InstagramIcon, PinterestIcon } from './Icons'
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="mt-20 bg-gradient-to-b from-[#0E0E0E] via-[#120F09] to-[#0A0805] text-white pt-20 pb-12 border-t border-[#D4AF37]/25 relative overflow-hidden">
      {/* Subtle top gold halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#D4AF37]/10 to-transparent blur-2xl pointer-events-none" />

      <div className="section-shell relative z-10">
        {/* Tilted Polaroid Gallery Showcase with Gold Foil accents */}
        <div className="flex justify-center items-center pb-12">
          <div className="relative flex items-center justify-center -space-x-4">
            {/* Left Polaroid */}
            <div className="group relative -rotate-6 transform-gpu transition-transform duration-200 ease-out hover:rotate-0 hover:scale-110 hover:z-20 will-change-transform">
              <div className="rounded-lg bg-gradient-to-b from-white to-[#FDFBF7] p-2 pb-5 shadow-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:shadow-[0_12px_30px_rgba(212,175,55,0.3)] transition-all w-24 sm:w-28">
                <div className="aspect-square w-full overflow-hidden rounded bg-[#1A1A1A] ring-1 ring-[#D4AF37]/20">
                  <img
                    src="/products/atelier-evil-eye-pendant.jpg"
                    alt="Art talisman"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Center Polaroid */}
            <div className="group relative z-10 rotate-0 transform-gpu transition-transform duration-200 ease-out hover:scale-110 hover:z-20 will-change-transform">
              <div className="rounded-lg bg-gradient-to-b from-white to-[#FDFBF7] p-2 pb-5 shadow-2xl border border-[#D4AF37]/60 group-hover:border-[#D4AF37] group-hover:shadow-[0_12px_35px_rgba(212,175,55,0.35)] transition-all w-24 sm:w-28">
                <div className="aspect-square w-full overflow-hidden rounded bg-[#1A1A1A] ring-1 ring-[#D4AF37]/30">
                  <img
                    src="/products/atelier-diy-paint-kit-sea.jpg"
                    alt="Plaster sculpture kit"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Polaroid */}
            <div className="group relative rotate-6 transform-gpu transition-transform duration-200 ease-out hover:rotate-0 hover:scale-110 hover:z-20 will-change-transform">
              <div className="rounded-lg bg-gradient-to-b from-white to-[#FDFBF7] p-2 pb-5 shadow-2xl border border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:shadow-[0_12px_30px_rgba(212,175,55,0.3)] transition-all w-24 sm:w-28">
                <div className="aspect-square w-full overflow-hidden rounded bg-[#1A1A1A] ring-1 ring-[#D4AF37]/20">
                  <img
                    src="/products/atelier-ruby-glitter-keychains.jpg"
                    alt="Artisan gold monogram"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Contact Headline */}
        <div className="text-center space-y-3 pb-12 border-b border-[#D4AF37]/20">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Private Inquiries & Commissions</p>
          <a
            href="mailto:hello@ateliernp.market"
            className="block text-2xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white hover:text-[#F2D785] transition-colors"
          >
            hello@ateliernp.market
          </a>
          <a
            href="https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noreferrer"
            className="block text-xl sm:text-3xl font-sans font-normal tracking-wide text-[#E8C566] hover:text-[#FFF2BE] transition-colors"
          >
            +91 76672 33182
          </a>
        </div>

        {/* Navigation & Details Grid */}
        <div className="pt-10 grid gap-10 md:grid-cols-3 items-center text-center md:text-left">
          {/* Brand Note */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              <p className="font-serif text-2xl font-bold bg-gradient-to-r from-white via-[#F2D785] to-[#D4AF37] bg-clip-text text-transparent tracking-tight">Atelier NP</p>
            </div>
            <p className="text-xs text-[#999999] leading-relaxed max-w-xs mx-auto md:mx-0">
              Where pure handmade craftsmanship meets golden luxury. Curated collections direct from verified independent creators.
            </p>
          </div>

          {/* Minimal Links Row */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D0C9BE]">
            <a href="#home" className="hover:text-[#F2D785] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#F2D785] transition-colors">About</a>
            <a href="#collection" className="hover:text-[#F2D785] transition-colors">Gallery</a>
            <a href="#collection" className="hover:text-[#F2D785] transition-colors">Shop</a>
            <a href="#contact" className="hover:text-[#F2D785] transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/30 bg-[#161410] text-[#D0C9BE] transition duration-200 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A120B] hover:shadow-[0_0_15px_rgba(212,175,55,0.45)]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/30 bg-[#161410] text-[#D0C9BE] transition duration-200 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A120B] hover:shadow-[0_0_15px_rgba(212,175,55,0.45)]"
            >
              <PinterestIcon className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/30 bg-[#161410] text-[#D0C9BE] transition duration-200 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A120B] hover:shadow-[0_0_15px_rgba(212,175,55,0.45)]"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D4AF37]/15 pt-8 text-[11px] text-[#777777]">
          <p>© {new Date().getFullYear()} Atelier NP. All Rights Reserved. Gilded with care.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            <a href="#makers" className="hover:text-[#D4AF37] transition-colors">Artisan Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
