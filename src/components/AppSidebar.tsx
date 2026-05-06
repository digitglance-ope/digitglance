'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { PRODUCTS, type ProductSlug, type PlanSlug } from '@/lib/products'

interface AppSidebarProps {
  product: ProductSlug
}

type TeamRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer'

const PLAN_BADGE: Record<string, string> = {
  free:    'bg-slate-700 text-slate-300',
  starter: 'bg-teal-900 text-teal-300',
  pro:     'bg-amber-900 text-amber-300',
}

export default function AppSidebar({ product }: AppSidebarProps) {
  const pathname  = usePathname()
  const router    = useRouter()
  const supabase  = createClient()

  const [businessName, setBusinessName]         = useState<string | null>(null)
  const [plan, setPlan]                         = useState<PlanSlug>('free')
  const [subscribedSlugs, setSubscribedSlugs]   = useState<Set<string>>(new Set())
  const [teamRole, setTeamRole]                 = useState<TeamRole>('owner')
  const [isOwner, setIsOwner]                   = useState(true)
  const [mobileOpen, setMobileOpen]             = useState(false)

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('business_name, plan, is_team_member, account_owner_id')
        .eq('id', user.id)
        .single()

      const ownerId = (profile?.is_team_member && profile.account_owner_id)
        ? profile.account_owner_id
        : user.id

      if (profile?.is_team_member && profile.account_owner_id) {
        const { data: owner } = await supabase
          .from('profiles')
          .select('business_name, plan')
          .eq('id', profile.account_owner_id)
          .single()
        setBusinessName(owner?.business_name ?? null)
        setPlan((owner?.plan ?? 'free') as PlanSlug)
        setIsOwner(false)

        // Load team role
        const { data: membership } = await supabase
          .from('account_users')
          .select('role')
          .eq('user_id', user.id)
          .eq('account_owner_id', profile.account_owner_id)
          .maybeSingle()
        setTeamRole((membership?.role ?? 'viewer') as TeamRole)
      } else {
        setBusinessName(profile?.business_name ?? null)
        setPlan((profile?.plan ?? 'free') as PlanSlug)
        setIsOwner(true)
        setTeamRole('owner')
      }

      const { data: subs } = await supabase
        .from('product_subscriptions')
        .select('product_slug')
        .eq('account_owner_id', ownerId)
        .eq('status', 'active')

      setSubscribedSlugs(new Set(subs?.map(s => s.product_slug) ?? []))
    }
    loadProfile()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const currentProduct      = PRODUCTS.find(p => p.slug === product)!
  const subscribedProducts  = PRODUCTS.filter(p => p.status === 'live' && subscribedSlugs.has(p.slug))
  const initial         = businessName ? businessName.charAt(0).toUpperCase() : '?'
  const planLabel       = plan.charAt(0).toUpperCase() + plan.slice(1)

  const canManageUsers  = ['owner', 'admin'].includes(teamRole)
  const canManageBilling = isOwner

  const accountNavItems = [
    { label: 'Settings',     suffix: '/settings',     show: true,              iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Team',         suffix: '/users',        show: canManageUsers,    iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Subscription', suffix: '/subscription', show: canManageBilling,  iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { label: 'Audit Log',    suffix: '/audit',        show: canManageUsers,    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  ]

  return (
    <>
      {/* Mobile hamburger — floats in top-left, only visible on small screens */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-slate-900 text-white p-2 rounded-lg shadow-lg"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`w-64 bg-slate-900 h-screen flex flex-col fixed top-0 left-0 z-50 transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        {/* Logo + mobile close */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <Link href="/app/dashboard" className="text-xl font-bold text-white">
              Digit<span className="text-teal-400">Glance</span>
            </Link>
            <p className="text-xs text-slate-500 mt-1">{currentProduct.shortName}</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-300 p-1"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product switcher */}
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 mb-2">
            Products
          </p>
          {subscribedProducts.map(p => (
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
          {subscribedProducts.length === 0 && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-0.5 text-slate-600">
              <span>Loading…</span>
            </div>
          )}
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
              onClick={() => setMobileOpen(false)}
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

          {/* Account nav — filtered by role */}
          <div className="pt-4 mt-2 border-t border-slate-800 space-y-0.5">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-3">
              Account
            </p>
            {accountNavItems.filter(i => i.show).map(item => {
              const href = currentProduct.basePath + item.suffix
              return (
                <Link
                  key={item.suffix}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(href)
                      ? 'bg-teal-600/10 text-teal-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                  </svg>
                  {item.label}
                </Link>
              )
            })}
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
    </>
  )
}
