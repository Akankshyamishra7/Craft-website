"use client"

import { FacebookIcon, InstagramIcon, PinterestIcon } from './Icons'
import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-sand/80 bg-white/60 py-16 backdrop-blur-md">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blossom to-sand text-lg shadow-soft">
                ✿
              </span>
              <div>
                <p className="font-serif text-3xl font-bold text-cocoa">Crafty</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-clay">Artisan Market</p>
              </div>
            </div>

            <p className="max-w-md text-xs leading-6 text-cocoa-muted sm:text-sm">
              Crafty is an independent marketplace dedicated to genuine handmade craftsmanship, bespoke jewelry, botanical decor, and clean DIY beauty rituals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-white text-cocoa shadow-sm transition hover:bg-clay hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-white text-cocoa shadow-sm transition hover:bg-clay hover:text-white"
              >
                <PinterestIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-white text-cocoa shadow-sm transition hover:bg-clay hover:text-white"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-serif text-base font-bold text-cocoa">Explore</h4>
              <ul className="mt-3 space-y-2 font-medium text-cocoa-muted">
                <li><a href="#collection" className="hover:text-clay">Artisan Drops</a></li>
                <li><a href="#customize" className="hover:text-clay">Custom Studio</a></li>
                <li><a href="#makers" className="hover:text-clay">Meet the Makers</a></li>
                <li><a href="#inspiration" className="hover:text-clay">DIY Moodboard</a></li>
                <li><a href="#about" className="hover:text-clay">Collector Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-cocoa">Artisan Direct</h4>
              <ul className="mt-3 space-y-2 font-medium text-cocoa-muted">
                <li><a href="#newsletter" className="hover:text-clay">Artisan Circle</a></li>
                <li><span className="text-moss font-bold">100% Eco Packaging</span></li>
                <li><span className="text-moss font-bold">Buyer Protection</span></li>
                <li><span>Worldwide Dispatch</span></li>
                <li><span>Zero Plastic Guarantee</span></li>
              </ul>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-cocoa">Studio & Support</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/80 p-2.5 text-cocoa shadow-sm">
                <Mail className="h-4 w-4 text-clay" />
                <span>hello@crafty.market</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/80 p-2.5 text-cocoa shadow-sm">
                <Phone className="h-4 w-4 text-clay" />
                <span>+1 (800) 248-CRAFT</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/80 p-2.5 text-cocoa shadow-sm">
                <MapPin className="h-4 w-4 text-clay" />
                <span>San Francisco, CA & Global Studios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sand/70 pt-8 text-xs font-semibold text-cocoa-muted sm:flex-row">
          <p>© 2026 Crafty Handmade Marketplace. Handcrafted with care & soft shadows.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Artisan Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

