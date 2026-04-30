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
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050d1a]/92 backdrop-blur-xl border-b border-teal-500/10 shadow-xl shadow-black/30'
          : 'bg-[#050d1a]/75 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white tracking-tight flex-shrink-0">
          Digit<span className="text-teal-400 teal-glow-text">Glance</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-teal-400 transition-colors duration-200 py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center btn-primary text-sm py-2.5 px-5"
          >
            Book a Consultation
          </Link>

          {/* Hamburger — shown on mobile & tablet (below md) */}
          <button
            className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-xl glass gap-[5px] transition-all hover:border-teal-500/30"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-[1.5px] bg-slate-300 transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-slate-300 transition-all duration-200 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-slate-300 transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      {menuOpen && (
        <div className="md:hidden mobile-menu border-t border-white/5 bg-[#050d1a]/98 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 40}ms` }}
                className="text-slate-300 hover:text-teal-400 text-base font-medium py-3.5 px-3 rounded-xl hover:bg-teal-500/5 border-b border-white/5 last:border-b-0 transition-all duration-200 animate-fade-in"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary text-center mt-3 text-sm justify-center"
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
