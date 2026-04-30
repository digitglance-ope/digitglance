import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0f2e45' }} className="text-slate-400 px-5 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="text-xl font-extrabold tracking-tight inline-block mb-4">
              <span className="text-white">Digit</span>
              <span style={{ color: '#27AE60' }}>glance</span>
              <span style={{ color: '#27AE60' }}>.</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Accounting intelligence and software solutions for Nigerian businesses and beyond.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500">
              <a href="mailto:hello@digitglance.com" className="hover:text-white transition-colors">
                hello@digitglance.com
              </a>
              <span>28 Micheal Adekoya St, Ilupeju, Lagos</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 sm:gap-14 text-sm">
            <div>
              <p className="text-white font-bold mb-4">Services</p>
              <div className="space-y-3 text-slate-400">
                <Link href="/services"  className="block hover:text-white transition-colors">Accounting</Link>
                <Link href="/services"  className="block hover:text-white transition-colors">Tax Advisory</Link>
                <Link href="/solutions" className="block hover:text-white transition-colors">Excel VBA Tools</Link>
                <Link href="/products"  className="block hover:text-white transition-colors">Web Applications</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-bold mb-4">Products</p>
              <div className="space-y-3 text-slate-400">
                <Link href="/products" className="block hover:text-white transition-colors">DigitGlance Invoice</Link>
                <Link href="/learn"    className="block hover:text-white transition-colors">DigitGlance Assist</Link>
              </div>
            </div>
            <div>
              <p className="text-white font-bold mb-4">Company</p>
              <div className="space-y-3 text-slate-400">
                <Link href="/about"   className="block hover:text-white transition-colors">About</Link>
                <Link href="/blog"    className="block hover:text-white transition-colors">Blog</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
