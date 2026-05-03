'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { templates } from '@/lib/templates'

export default function TemplateSidebar() {
  const pathname = usePathname()
  const activeSlug = pathname.split('/').pop() ?? ''

  return (
    <aside className="w-56 flex-shrink-0">

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:flex flex-col sticky top-[65px] h-[calc(100vh-65px)] bg-white border-r border-gray-200">
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
            Industries
          </p>
          <nav className="space-y-0.5">
            {templates.map(t => {
              const isActive = activeSlug === t.slug
              return (
                <Link
                  key={t.slug}
                  href={`/resources/templates/${t.slug}`}
                  className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-white/10' : t.accentIcon
                  }`}>
                    <svg
                      className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-600'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={t.iconPath} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium truncate flex-1">{t.industry}</span>
                  {!t.available && !isActive && (
                    <span className="text-xs text-slate-300 flex-shrink-0 font-normal">Soon</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-700 mb-1">Need custom Excel?</p>
            <p className="text-xs text-slate-500 mb-2.5 leading-relaxed">
              We build VBA systems and dashboards for Nigerian businesses.
            </p>
            <Link
              href="/contact"
              className="block text-center bg-slate-900 text-white text-xs font-semibold py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal scrollable pill row */}
      <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {templates.map(t => (
            <Link
              key={t.slug}
              href={`/resources/templates/${t.slug}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeSlug === t.slug
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {t.industry}
              {!t.available && activeSlug !== t.slug && (
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-300`} />
              )}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  )
}
