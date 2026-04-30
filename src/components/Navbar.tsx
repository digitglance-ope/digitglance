'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/services',  label: 'Services' },
  { href: '/products',  label: 'Products' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/learn',     label: 'Learn' },
  { href: '/about',     label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight flex-shrink-0">
          <span style={{ color: '#1B4F72' }}>Digit</span>
          <span style={{ color: '#27AE60' }}>glance</span>
          <span style={{ color: '#27AE60' }}>.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-green transition-colors duration-200 py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/app/login"
            className="text-navy hover:text-brand-green transition-colors duration-200 py-1"
          >
            Sign In
          </Link>
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex btn-green text-sm py-2.5 px-5"
          >
            Book a Consultation
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-gray-200 gap-[5px] bg-white hover:border-brand-green transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[2px] bg-navy transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-navy transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-navy transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden mobile-menu border-t border-gray-100 bg-white shadow-xl">
          <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 40}ms` }}
                className="text-slate-700 hover:text-brand-green text-base font-semibold py-3.5 px-3 rounded-xl hover:bg-brand-green-light border-b border-gray-50 last:border-b-0 transition-all duration-150 animate-fade-in"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/app/login"
              className="text-navy font-semibold py-3.5 px-3 text-base border-b border-gray-50 transition-all hover:text-brand-green animate-fade-in"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="btn-green text-center mt-3 text-sm justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
