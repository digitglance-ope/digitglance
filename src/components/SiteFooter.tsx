import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block text-xl font-bold text-white mb-3">
              Digit<span className="text-teal-400">Glance</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-5">
              Accounting intelligence and business software built for Nigerian SMEs.
              CAC registered. Nigeria-focused. Data private.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['CAC Registered', 'NRS Compliant', 'NDPR Compliant'].map(badge => (
                <span key={badge} className="text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Products</p>
            <div className="space-y-3 text-sm">
              <Link href="/products" className="block hover:text-teal-400 transition-colors">Invoice Manager</Link>
              <Link href="/products" className="block hover:text-teal-400 transition-colors">Point of Sale</Link>
              <Link href="/products" className="block hover:text-teal-400 transition-colors">Accounting (Soon)</Link>
              <Link href="/products" className="block hover:text-teal-400 transition-colors">School Manager (Soon)</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Company</p>
            <div className="space-y-3 text-sm">
              <Link href="/about" className="block hover:text-teal-400 transition-colors">About</Link>
              <Link href="/blog" className="block hover:text-teal-400 transition-colors">Blog</Link>
              <Link href="/services" className="block hover:text-teal-400 transition-colors">Services</Link>
              <Link href="/solutions" className="block hover:text-teal-400 transition-colors">Solutions</Link>
              <Link href="/contact" className="block hover:text-teal-400 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Resources</p>
            <div className="space-y-3 text-sm">
              <Link href="/ai-tools" className="block hover:text-teal-400 transition-colors">AI Tools</Link>
              <Link href="/blog" className="block hover:text-teal-400 transition-colors">Learn Centre</Link>
              <Link href="/app/login" className="block hover:text-teal-400 transition-colors">Sign In</Link>
              <Link href="/contact" className="block hover:text-teal-400 transition-colors">Get Started</Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} DigitGlance. A trading name of Digitglance Reliance (CAC registered).</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
