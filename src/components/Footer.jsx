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
    <footer id="contact" className="mt-20 bg-[#0E0E0E] text-white pt-20 pb-12 border-t border-[#222222]">
      <div className="section-shell">
        {/* Tilted Polaroid Gallery Showcase (From Attached Reference Image) */}
        <div className="flex justify-center items-center pb-12">
          <div className="relative flex items-center justify-center -space-x-4">
            {/* Left Polaroid */}
            <div className="group relative -rotate-6 transform transition-all duration-300 hover:rotate-0 hover:scale-110 hover:z-20">
              <div className="rounded-lg bg-white p-2 pb-5 shadow-2xl border border-white/20 w-24 sm:w-28">
                <div className="aspect-square w-full overflow-hidden rounded bg-[#1A1A1A]">
                  <img
                    src="/products/atelier-evil-eye-pendant.jpg"
                    alt="Art talisman"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Center Polaroid */}
            <div className="group relative z-10 rotate-0 transform transition-all duration-300 hover:scale-110 hover:z-20">
              <div className="rounded-lg bg-white p-2 pb-5 shadow-2xl border border-white/20 w-24 sm:w-28">
                <div className="aspect-square w-full overflow-hidden rounded bg-[#1A1A1A]">
                  <img
                    src="/products/atelier-diy-paint-kit-sea.jpg"
                    alt="Plaster sculpture kit"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Polaroid */}
            <div className="group relative rotate-6 transform transition-all duration-300 hover:rotate-0 hover:scale-110 hover:z-20">
              <div className="rounded-lg bg-white p-2 pb-5 shadow-2xl border border-white/20 w-24 sm:w-28">
                <div className="aspect-square w-full overflow-hidden rounded bg-[#1A1A1A]">
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

        {/* Central Contact Headline (From Reference Image) */}
        <div className="text-center space-y-3 pb-12 border-b border-[#222222]">
          <a
            href="mailto:hello@ateliernp.market"
            className="block text-2xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white hover:text-[#D0C9BE] transition-colors"
          >
            hello@ateliernp.market
          </a>
          <a
            href="https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noreferrer"
            className="block text-xl sm:text-3xl font-sans font-normal tracking-wide text-[#999999] hover:text-white transition-colors"
          >
            +91 76672 33182
          </a>
        </div>

        {/* Navigation & Details Grid */}
        <div className="pt-10 grid gap-10 md:grid-cols-3 items-center text-center md:text-left">
          {/* Brand Note */}
          <div className="space-y-2">
            <p className="font-serif text-2xl font-bold text-white tracking-tight">Atelier NP</p>
            <p className="text-xs text-[#888888] leading-relaxed max-w-xs mx-auto md:mx-0">
              Where pure handmade craftsmanship meets modern luxury. Curated collections direct from verified independent creators.
            </p>
          </div>

          {/* Minimal Links Row (From Attached Reference Image) */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#collection" className="hover:text-white transition-colors">Gallery</a>
            <a href="#collection" className="hover:text-white transition-colors">Shop</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#333333] bg-[#161616] text-[#BBBBBB] transition hover:border-white hover:bg-white hover:text-[#0E0E0E]"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#333333] bg-[#161616] text-[#BBBBBB] transition hover:border-white hover:bg-white hover:text-[#0E0E0E]"
            >
              <PinterestIcon className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#333333] bg-[#161616] text-[#BBBBBB] transition hover:border-white hover:bg-white hover:text-[#0E0E0E]"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1C1C1C] pt-8 text-[11px] text-[#666666]">
          <p>© {new Date().getFullYear()} Atelier NP. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#AAAAAA] transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-[#AAAAAA] transition-colors">Terms of Service</a>
            <a href="#makers" className="hover:text-[#AAAAAA] transition-colors">Artisan Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
