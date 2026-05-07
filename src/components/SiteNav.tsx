'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Products',  href: '/products' },
  { label: 'Services',  href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'AI Tools',  href: '/ai-tools' },
  { label: 'Blog',      href: '/blog' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">
            Nigeria
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/app/login" className="text-sm font-medium text-slate-600 hover:text-teal-600 px-3 py-2 rounded-lg transition-colors">
            Sign In
          </Link>
          <Link href="/contact" className="text-sm font-semibold bg-teal-600 text-white px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 pb-6 pt-3">
          <div className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
            <Link href="/app/login" onClick={() => setOpen(false)} className="text-center text-sm font-medium text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:border-teal-300 hover:text-teal-600 transition-all">
              Sign In
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-center text-sm font-semibold bg-teal-600 text-white px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
