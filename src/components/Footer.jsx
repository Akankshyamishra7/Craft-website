import { FacebookIcon, InstagramIcon, PinterestIcon } from './Icons'
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react'

function Footer() {
  return (
    <footer id="contact" className="mt-8 border-t border-white/70 bg-white/35 py-10 backdrop-blur-sm">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blossom to-sand text-lg shadow-soft">
                ✿
              </span>
              <p className="font-serif text-4xl text-cocoa">Crafty</p>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-cocoa/70 sm:text-base">
              A premium handmade craft destination with soft colors, careful spacing, and a boutique feel inspired by timeless artisan markets.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-white/75 p-4 shadow-soft">
                <Mail className="h-5 w-5 text-clay" />
                <p className="mt-3 text-sm font-semibold text-cocoa">hello@crafty.market</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/75 p-4 shadow-soft">
                <Phone className="h-5 w-5 text-clay" />
                <p className="mt-3 text-sm font-semibold text-cocoa">+91 98765 43210</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/75 p-4 shadow-soft">
                <MapPin className="h-5 w-5 text-clay" />
                <p className="mt-3 text-sm font-semibold text-cocoa">Studio pickup available</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.6rem] bg-white/75 p-5 shadow-soft">
              <div className="flex items-center gap-2 text-cocoa">
                <Sparkles className="h-4 w-4 text-clay" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">Newsletter</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-cocoa/70">
                Discover fresh handmade drops, styling ideas, and seller updates.
              </p>
              <a href="#newsletter" className="mt-4 inline-flex rounded-full bg-cocoa px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4f3b2f]">
                Join updates
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/75 text-cocoa transition hover:-translate-y-0.5 hover:bg-white">
              <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Pinterest" className="grid h-11 w-11 place-items-center rounded-full bg-white/75 text-cocoa transition hover:-translate-y-0.5 hover:bg-white">
              <PinterestIcon className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white/75 text-cocoa transition hover:-translate-y-0.5 hover:bg-white">
              <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.3em] text-cocoa/45">
          Handmade with care and soft shadows.
        </p>
      </div>
    </footer>
  )
}

export default Footer
