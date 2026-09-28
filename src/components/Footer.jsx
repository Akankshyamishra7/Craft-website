"use client"

import { FacebookIcon, InstagramIcon, PinterestIcon } from './Icons'
import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-[#d4a338]/30 bg-gradient-to-b from-[#fdf7ec] via-[#f8ebd0] to-[#ebd29b] py-16">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#fff3cf] via-[#e8bc57] to-[#b38320] text-[#17120a] font-black text-lg shadow-soft border border-[#fbf3d5]">
                ✿
              </span>
              <div>
                <p className="font-serif text-3xl font-bold text-[#241705]">Atelier NP</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8c5f0b]">Artisan Market</p>
              </div>
            </div>

            <p className="max-w-md text-xs leading-6 text-[#5e4318] sm:text-sm">
              Atelier NP is an independent marketplace dedicated to genuine handmade craftsmanship, bespoke jewelry, botanical decor, and clean DIY beauty rituals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/80 text-[#5e4318] shadow-sm transition hover:bg-[#c59325] hover:text-[#17120a]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/80 text-[#5e4318] shadow-sm transition hover:bg-[#c59325] hover:text-[#17120a]"
              >
                <PinterestIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d4a338]/30 bg-white/80 text-[#5e4318] shadow-sm transition hover:bg-[#c59325] hover:text-[#17120a]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-serif text-base font-bold text-[#241705]">Explore</h4>
              <ul className="mt-3 space-y-2 font-medium text-[#5e4318]">
                <li><a href="#collection" className="hover:text-[#17120a] transition-colors">Artisan Drops</a></li>
                <li><a href="#customize" className="hover:text-[#17120a] transition-colors">Custom Studio</a></li>
                <li><a href="#makers" className="hover:text-[#17120a] transition-colors">Meet the Makers</a></li>
                <li><a href="#inspiration" className="hover:text-[#17120a] transition-colors">DIY Moodboard</a></li>
                <li><a href="#about" className="hover:text-[#17120a] transition-colors">Collector Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-[#241705]">Artisan Direct</h4>
              <ul className="mt-3 space-y-2 font-medium text-[#5e4318]">
                <li><a href="#newsletter" className="hover:text-[#17120a] transition-colors">Artisan Circle</a></li>
                <li><span className="text-[#8c5f0b] font-bold">100% Eco Packaging</span></li>
                <li><span className="text-[#8c5f0b] font-bold">Buyer Protection</span></li>
                <li><span>Worldwide Dispatch</span></li>
                <li><span>Zero Plastic Guarantee</span></li>
              </ul>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#241705]">Studio & Support</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-[#d4a338]/25 bg-white/70 backdrop-blur-sm p-2.5 text-[#241705] shadow-sm">
                <Mail className="h-4 w-4 text-[#a46e10]" />
                <span className="font-medium">hello@ateliernp.market</span>
              </div>
              <a
                href="https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20place%20an%20order!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-[#d4a338]/35 bg-[#faeed1] p-2.5 text-[#855a10] shadow-sm transition hover:bg-[#f5dfad]"
              >
                <Phone className="h-4 w-4 text-[#855a10]" />
                <span className="font-bold">+91 76672 33182 · WhatsApp Orders</span>
              </a>
              <div className="flex items-center gap-2.5 rounded-xl border border-[#d4a338]/25 bg-white/70 backdrop-blur-sm p-2.5 text-[#241705] shadow-sm">
                <MapPin className="h-4 w-4 text-[#a46e10]" />
                <span className="font-medium">San Francisco, CA & Global Studios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#d4a338]/25 pt-8 text-xs font-semibold text-[#73562a] sm:flex-row">
          <p>© {new Date().getFullYear()} Atelier NP Handmade Marketplace. Handcrafted with golden radiance.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#about" className="hover:text-[#17120a] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-[#17120a] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#makers" className="hover:text-[#17120a] transition-colors">Artisan Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

