'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { PRODUCTS, PLATFORM_NAV_ITEMS, type ProductSlug, type PlanSlug } from '@/lib/products'

interface AppSidebarProps {
  product: ProductSlug
}

const PLAN_BADGE: Record<string, string> = {
  free:    'bg-slate-700 text-slate-300',
  starter: 'bg-teal-900 text-teal-300',
  pro:     'bg-amber-900 text-amber-300',
}

export default function AppSidebar({ product }: AppSidebarProps) {
  const pathname  = usePathname()
  const router    = useRouter()
  const supabase  = createClient()

  const [businessName, setBusinessName] = useState<string | null>(null)
  const [plan, setPlan]                 = useState<PlanSlug>('free')

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('business_name, plan, is_team_member, account_owner_id')
        .eq('id', user.id)
        .single()

      if (profile?.is_team_member && profile.account_owner_id) {
        const { data: owner } = await supabase
          .from('profiles')
          .select('business_name, plan')
          .eq('id', profile.account_owner_id)
          .single()
        setBusinessName(owner?.business_name ?? null)
        setPlan((owner?.plan ?? 'free') as PlanSlug)
      } else {
        setBusinessName(profile?.business_name ?? null)
        setPlan((profile?.plan ?? 'free') as PlanSlug)
      }
    }
    loadProfile()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/app/login')
  }

  function isActive(href: string) {
    if (href === `/app/${product}/dashboard`) {
      return pathname === href
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  const currentProduct  = PRODUCTS.find(p => p.slug === product)!
  const liveProducts    = PRODUCTS.filter(p => p.status === 'live')
  const soonProducts    = PRODUCTS.filter(p => p.status === 'coming_soon')
  const initial         = businessName ? businessName.charAt(0).toUpperCase() : '?'
  const planLabel       = plan.charAt(0).toUpperCase() + plan.slice(1)

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0 z-40">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/app/dashboard" className="text-xl font-bold text-white">
          Digit<span className="text-teal-400">Glance</span>
        </Link>
        <p className="text-xs text-slate-500 mt-1">{currentProduct.shortName}</p>
      </div>

      {/* Product switcher */}
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 mb-2">
          Products
        </p>
        {liveProducts.map(p => (
          <Link
            key={p.slug}
            href={p.dashboardPath}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-0.5 transition-all ${
              p.slug === product
                ? 'bg-teal-600/10 text-teal-400 font-medium'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{p.shortName}</span>
            {p.slug === product && <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />}
          </Link>
        ))}
        {soonProducts.map(p => (
          <div
            key={p.slug}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-0.5 text-slate-600 cursor-not-allowed"
          >
            <span>{p.shortName}</span>
            <span className="text-xs bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">Soon</span>
          </div>
        ))}
      </div>

      {/* Product nav */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-3">
          {currentProduct.shortName} Menu
        </p>
        {currentProduct.navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(item.href)
                ? 'bg-teal-600/10 text-teal-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
            </svg>
            {item.label}
          </Link>
        ))}

        {/* Platform nav */}
        <div className="pt-4 mt-2 border-t border-slate-800 space-y-0.5">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-3">
            Account
          </p>
          {PLATFORM_NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(item.href)
                  ? 'bg-teal-600/10 text-teal-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
              </svg>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">
              {businessName ?? 'Loading…'}
            </p>
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${PLAN_BADGE[plan] ?? PLAN_BADGE.free}`}>
              {planLabel}
            </span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-400 text-xs rounded-lg hover:bg-slate-800 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>

    </aside>
  )
}
