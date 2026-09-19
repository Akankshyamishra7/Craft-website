"use client"

import { FacebookIcon, InstagramIcon, PinterestIcon } from './Icons'
import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-emerald-500/25 bg-[#020506] bg-[#0a0a0a] py-16 backdrop-blur-md">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-lg shadow-soft">
                ✿
              </span>
              <div>
                <p className="font-serif text-3xl font-bold text-white">Atelier NP</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-clay">Artisan Market</p>
              </div>
            </div>

            <p className="max-w-md text-xs leading-6 text-white-muted sm:text-sm">
              Atelier NP is an independent marketplace dedicated to genuine handmade craftsmanship, bespoke jewelry, botanical decor, and clean DIY beauty rituals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-[#111] text-white shadow-sm transition hover:bg-emerald-500 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-[#111] text-white shadow-sm transition hover:bg-emerald-500 hover:text-white"
              >
                <PinterestIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-[#111] text-white shadow-sm transition hover:bg-emerald-500 hover:text-white"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-serif text-base font-bold text-white">Explore</h4>
              <ul className="mt-3 space-y-2 font-medium text-white-muted">
                <li><a href="#collection" className="hover:text-[#00f5a0] transition-colors">Artisan Drops</a></li>
                <li><a href="#customize" className="hover:text-[#00f5a0] transition-colors">Custom Studio</a></li>
                <li><a href="#makers" className="hover:text-[#00f5a0] transition-colors">Meet the Makers</a></li>
                <li><a href="#inspiration" className="hover:text-[#00f5a0] transition-colors">DIY Moodboard</a></li>
                <li><a href="#about" className="hover:text-[#00f5a0] transition-colors">Collector Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-white">Artisan Direct</h4>
              <ul className="mt-3 space-y-2 font-medium text-white-muted">
                <li><a href="#newsletter" className="hover:text-[#00f5a0] transition-colors">Artisan Circle</a></li>
                <li><span className="text-moss font-bold">100% Eco Packaging</span></li>
                <li><span className="text-moss font-bold">Buyer Protection</span></li>
                <li><span>Worldwide Dispatch</span></li>
                <li><span>Zero Plastic Guarantee</span></li>
              </ul>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white">Studio & Support</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.04] p-2.5 text-white shadow-sm">
                <Mail className="h-4 w-4 text-clay" />
                <span>hello@ateliernp.market</span>
              </div>
              <a
                href="https://wa.me/917667233182?text=Hi%20Atelier%20NP%2C%20I%20want%20to%20place%20an%20order!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-sm transition hover:bg-green-100"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">+91 76672 33182 · WhatsApp Orders</span>
              </a>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.04] p-2.5 text-white shadow-sm">
                <MapPin className="h-4 w-4 text-clay" />
                <span>San Francisco, CA & Global Studios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-500/25 bg-[#020506] pt-8 text-xs font-semibold text-white-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Atelier NP Handmade Marketplace. Handcrafted with care & soft shadows.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#about" className="hover:text-[#00f5a0] transition-colors transition">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-[#00f5a0] transition-colors transition">Terms of Service</a>
            <span>•</span>
            <a href="#makers" className="hover:text-[#00f5a0] transition-colors transition">Artisan Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

