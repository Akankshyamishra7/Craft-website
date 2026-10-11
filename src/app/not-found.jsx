import Link from 'next/link'
import { ArrowLeft, Compass, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#1A1A1A] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5E0D8] p-8 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EFECE6] border border-[#DDD7CE] text-[#1A1A1A]">
          <Compass className="w-8 h-8 stroke-[1.75]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C827A]">
            404 • EXHIBITION NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#141414]">
            Lost in the Gallery?
          </h1>
          <p className="text-sm leading-relaxed text-[#6E6860]">
            The piece or page you are looking for has moved or does not exist. Explore our active artisan collections and custom studios below.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] text-white py-3.5 px-6 text-sm font-bold tracking-wide hover:bg-[#2C2C2C] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Atelier Gallery
          </Link>
          <Link
            href="/#collection"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#EFECE6] text-[#141414] py-3.5 px-6 text-sm font-bold tracking-wide hover:bg-[#E5E0D6] transition-colors border border-[#DDD7CE]"
          >
            <Sparkles className="w-4 h-4 text-[#8C827A]" />
            Browse Artisan Drops
          </Link>
        </div>
      </div>
    </div>
  )
}
