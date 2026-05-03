'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { templates } from '@/lib/templates'

const available = templates.filter(t => t.available)
const comingSoon = templates.filter(t => !t.available)

export default function TemplateSidebar() {
  const pathname = usePathname()
  const activeSlug = pathname.split('/').pop() ?? ''

  return (
    <aside className="w-64 flex-shrink-0">
      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto border-r border-gray-100 bg-white">
        <div className="p-5">

          {/* Header */}
          <div className="mb-6">
            <Link href="/blog#templates" className="text-xs text-slate-400 hover:text-teal-600 flex items-center gap-1 mb-3">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Free Templates</p>
            <p className="text-xs text-slate-400 mt-1">{available.length} available · {comingSoon.length} coming soon</p>
          </div>

          {/* Available */}
          {available.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Available Now</p>
              <nav className="space-y-0.5">
                {available.map(t => (
                  <Link
                    key={t.slug}
                    href={`/resources/templates/${t.slug}`}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      activeSlug === t.slug
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activeSlug === t.slug ? t.accentIcon : 'bg-slate-100'
                      }`}>
                        <svg className={`w-3.5 h-3.5 ${activeSlug === t.slug ? 'text-teal-600' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={t.iconPath} />
                        </svg>
                      </div>
                      <span className="truncate">{t.industry}</span>
                    </div>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${activeSlug === t.slug ? 'bg-teal-500' : 'bg-green-400'}`} />
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Coming Soon */}
          {comingSoon.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Publishing Soon</p>
              <nav className="space-y-0.5">
                {comingSoon.map(t => (
                  <Link
                    key={t.slug}
                    href={`/resources/templates/${t.slug}`}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                      activeSlug === t.slug
                        ? 'bg-slate-100 text-slate-700 border border-slate-200 font-medium'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={t.iconPath} />
                        </svg>
                      </div>
                      <span className="truncate">{t.industry}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-slate-300" />
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-slate-100 pt-5">
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
              <p className="text-xs font-bold text-teal-800 mb-1">Need a custom solution?</p>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Custom VBA systems, dashboards, and advanced templates built for your business.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-teal-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile: horizontal scrollable industry nav */}
      <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {templates.map(t => (
            <Link
              key={t.slug}
              href={`/resources/templates/${t.slug}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeSlug === t.slug
                  ? 'bg-teal-600 text-white'
                  : t.available
                    ? 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600'
                    : 'bg-slate-50 text-slate-400'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                activeSlug === t.slug ? 'bg-white' : t.available ? 'bg-green-400' : 'bg-slate-300'
              }`} />
              {t.industry}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
