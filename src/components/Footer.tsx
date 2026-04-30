import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#020810] border-t border-white/5 px-5 sm:px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="text-white font-bold text-xl inline-block mb-3">
              Digit<span className="text-teal-400">Glance</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Accounting intelligence and software solutions for Nigerian businesses and beyond.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-xs text-slate-600">
              <a href="mailto:hello@digitglance.com" className="hover:text-teal-400 transition-colors">
                hello@digitglance.com
              </a>
              <span>28 Micheal Adekoya St, Ilupeju, Lagos</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-10 sm:gap-14 text-sm">
            <div>
              <p className="text-white font-semibold mb-4 text-sm">Services</p>
              <div className="space-y-3 text-slate-500">
                <Link href="/services"  className="block hover:text-teal-400 transition-colors">Accounting</Link>
                <Link href="/services"  className="block hover:text-teal-400 transition-colors">Tax Advisory</Link>
                <Link href="/solutions" className="block hover:text-teal-400 transition-colors">Excel VBA Tools</Link>
                <Link href="/products"  className="block hover:text-teal-400 transition-colors">Web Applications</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">Products</p>
              <div className="space-y-3 text-slate-500">
                <Link href="/products" className="block hover:text-teal-400 transition-colors">DigitGlance Invoice</Link>
                <Link href="/learn"    className="block hover:text-teal-400 transition-colors">DigitGlance Assist</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">Company</p>
              <div className="space-y-3 text-slate-500">
                <Link href="/about"   className="block hover:text-teal-400 transition-colors">About</Link>
                <Link href="/blog"    className="block hover:text-teal-400 transition-colors">Blog</Link>
                <Link href="/contact" className="block hover:text-teal-400 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
