import TemplateSidebar from '@/components/TemplateSidebar'
import Link from 'next/link'

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Digit<span className="text-teal-600">Glance</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/services" className="hover:text-teal-600">Services</Link>
          <Link href="/products" className="hover:text-teal-600">Products</Link>
          <Link href="/solutions" className="hover:text-teal-600">Solutions</Link>
          <Link href="/ai-tools" className="hover:text-teal-600">AI Tools</Link>
          <Link href="/blog" className="hover:text-teal-600">Blog</Link>
          <Link href="/app/login" className="hover:text-teal-600">Sign In</Link>
        </div>
        <Link href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
          Book a Consultation
        </Link>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 px-6 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">Digit<span className="text-teal-400">Glance</span></p>
          <p className="text-sm max-w-xs">Accounting intelligence and software solutions for Nigerian businesses and beyond.</p>
        </div>
        <div className="flex gap-12 text-sm">
          <div>
            <p className="text-white font-medium mb-3">Services</p>
            <div className="space-y-2">
              <Link href="/services" className="block hover:text-teal-400">Accounting</Link>
              <Link href="/services" className="block hover:text-teal-400">Tax Advisory</Link>
              <Link href="/solutions" className="block hover:text-teal-400">Excel VBA Tools</Link>
            </div>
          </div>
          <div>
            <p className="text-white font-medium mb-3">Resources</p>
            <div className="space-y-2">
              <Link href="/blog" className="block hover:text-teal-400">Blog</Link>
              <Link href="/blog#templates" className="block hover:text-teal-400">Free Templates</Link>
              <Link href="/contact" className="block hover:text-teal-400">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-8 text-xs flex flex-col md:flex-row justify-between gap-3">
        <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-teal-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-teal-400">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <TemplateSidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
