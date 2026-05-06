import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS as PRODUCT_REGISTRY } from '@/lib/products'

const HUB_PRODUCTS = [
  {
    slug: 'invoice',
    name: 'Invoice',
    description: 'Create invoices, track payments, manage customers and suppliers, and generate VAT reports.',
    href: '/app/invoice/dashboard',
    activateHref: '/app/subscription',
    status: 'live' as const,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'teal',
  },
  {
    slug: 'pos',
    name: 'Point of Sale',
    description: 'Fast checkout, cash and card sales, FIRS VAT compliance, and multi-branch inventory management.',
    href: '/app/pos/dashboard',
    activateHref: '/app/pos/activate',
    status: 'live' as const,
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    color: 'blue',
  },
  {
    slug: 'accounting',
    name: 'Accounting',
    description: 'Full double-entry bookkeeping, P&L statements, balance sheet, and tax preparation.',
    href: '#',
    activateHref: '/contact',
    status: 'soon' as const,
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'purple',
  },
  {
    slug: 'school',
    name: 'School Manager',
    description: 'Student enrollment, fee collection, class scheduling, and results management.',
    href: '#',
    activateHref: '/contact',
    status: 'soon' as const,
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    color: 'orange',
  },
]

const COLOR_MAP: Record<string, { bg: string; icon: string; badge: string; btn: string; outline: string }> = {
  teal:   { bg: 'bg-teal-50 border-teal-200',     icon: 'bg-teal-100 text-teal-600',     badge: 'bg-teal-100 text-teal-700',     btn: 'bg-teal-600 hover:bg-teal-700 text-white',     outline: 'border border-teal-300 text-teal-600 hover:bg-teal-50' },
  blue:   { bg: 'bg-blue-50 border-blue-200',     icon: 'bg-blue-100 text-blue-600',     badge: 'bg-blue-100 text-blue-700',     btn: 'bg-blue-600 hover:bg-blue-700 text-white',     outline: 'border border-blue-300 text-blue-600 hover:bg-blue-50' },
  purple: { bg: 'bg-purple-50 border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700 text-white', outline: 'border border-purple-300 text-purple-600 hover:bg-purple-50' },
  orange: { bg: 'bg-orange-50 border-orange-200', icon: 'bg-orange-100 text-orange-600', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700 text-white', outline: 'border border-orange-300 text-orange-600 hover:bg-orange-50' },
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { upgrade?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, plan, onboarding_complete, is_team_member, account_owner_id')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarding_complete && !profile?.is_team_member) {
    redirect('/app/onboarding')
  }

  // Resolve effective owner — team members share the account owner's subscriptions
  const ownerId = (profile?.is_team_member && profile.account_owner_id)
    ? profile.account_owner_id
    : user.id

  let businessName = profile?.business_name
  if (profile?.is_team_member && profile.account_owner_id) {
    const { data: owner } = await supabase
      .from('profiles')
      .select('business_name')
      .eq('id', profile.account_owner_id)
      .single()
    businessName = owner?.business_name ?? businessName
  }

  const { data: subscriptions } = await supabase
    .from('product_subscriptions')
    .select('product_slug, plan_slug, status')
    .eq('account_owner_id', ownerId)
    .in('status', ['active', 'trial'])

  const subscribedSlugs = new Set(subscriptions?.map(s => s.product_slug) ?? [])
  const trialSlugs = new Set(subscriptions?.filter(s => s.status === 'trial').map(s => s.product_slug) ?? [])

  const upgradeSlug = searchParams?.upgrade
  const upgradeProduct = upgradeSlug
    ? PRODUCT_REGISTRY.find(p => p.slug === upgradeSlug)
    : null

  async function handleSignOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/app/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-xl font-bold text-slate-900 hover:opacity-80 transition-opacity">
              Digit<span className="text-teal-500">Glance</span>
            </Link>
            <Link href="/" className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-teal-600 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Website
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{businessName || 'Your Business'}</p>
              <p className="text-xs text-slate-500">
                {subscriptions && subscriptions.length > 0
                  ? `${subscriptions.length} active product${subscriptions.length > 1 ? 's' : ''}`
                  : 'No active products'}
              </p>
            </div>
            <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
            <form action={handleSignOut}>
              <button type="submit" className="text-sm text-slate-500 hover:text-red-500 transition-colors font-medium">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Upgrade notice — shown when redirected from a product the user hasn't subscribed to */}
      {upgradeProduct && (
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-amber-800">
                You do not have access to <strong>{upgradeProduct.name}</strong>. Subscribe to add it to your account.
              </p>
            </div>
            <a
              href={upgradeProduct?.slug === 'pos' ? '/app/pos/activate' : '/contact'}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
            >
              {upgradeProduct?.slug === 'pos' ? 'Add POS →' : 'Contact Us'}
            </a>
          </div>
        </div>
      )}

      {/* Welcome */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-slate-500 text-base">
          {subscribedSlugs.size > 0
            ? 'Select a product to continue working'
            : 'You have no active product subscriptions. Contact us to get started.'}
        </p>
      </div>

      {/* Product grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HUB_PRODUCTS.map(product => {
            const c = COLOR_MAP[product.color]
            const isLive = product.status === 'live'
            const isSubscribed = subscribedSlugs.has(product.slug)
            const isTrialing = trialSlugs.has(product.slug)

            return (
              <div
                key={product.slug}
                className={`relative bg-white border rounded-2xl p-6 flex flex-col transition-shadow ${
                  isSubscribed
                    ? 'border-slate-200 hover:shadow-md'
                    : isLive
                    ? 'border-slate-200'
                    : 'border-slate-200 opacity-55'
                }`}
              >
                {/* Icon + badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSubscribed ? c.icon : 'bg-slate-100 text-slate-400'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={product.icon} />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isTrialing
                      ? 'bg-amber-100 text-amber-700'
                      : isSubscribed
                      ? c.badge
                      : isLive
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isTrialing ? 'Free Trial' : isSubscribed ? 'Active' : isLive ? 'Available' : 'Coming Soon'}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 mb-2">{product.name}</h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-6">{product.description}</p>

                {isSubscribed ? (
                  <Link
                    href={product.href}
                    className={`w-full text-center font-semibold py-2.5 rounded-xl text-sm transition-colors ${c.btn}`}
                  >
                    Open {product.name}
                  </Link>
                ) : isLive ? (
                  <a
                    href={product.activateHref}
                    className={`w-full text-center font-semibold py-2.5 rounded-xl text-sm transition-colors ${c.outline}`}
                  >
                    {product.slug === 'pos' ? 'Start Free Trial' : 'Add to Account'}
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full text-center font-semibold py-2.5 rounded-xl text-sm bg-slate-100 text-slate-400 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
