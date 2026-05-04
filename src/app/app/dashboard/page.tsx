import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const PRODUCTS = [
  {
    slug: 'invoice',
    name: 'Invoice',
    description: 'Create invoices, track payments, manage customers and suppliers, and generate VAT reports.',
    href: '/app/invoice/dashboard',
    status: 'active' as const,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'teal',
  },
  {
    slug: 'pos',
    name: 'Point of Sale',
    description: 'Fast checkout, cash and card sales, FIRS VAT compliance, and multi-branch sales reports.',
    href: '/app/pos/dashboard',
    status: 'active' as const,
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    color: 'blue',
  },
  {
    slug: 'accounting',
    name: 'Accounting',
    description: 'Full double-entry bookkeeping, P&L statements, balance sheet, and tax preparation.',
    href: '#',
    status: 'soon' as const,
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'purple',
  },
  {
    slug: 'school',
    name: 'School Manager',
    description: 'Student enrollment, fee collection, class scheduling, and results management.',
    href: '#',
    status: 'soon' as const,
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    color: 'orange',
  },
]

const COLOR_MAP: Record<string, { bg: string; icon: string; badge: string; btn: string }> = {
  teal:   { bg: 'bg-teal-50 border-teal-200',   icon: 'bg-teal-100 text-teal-600',   badge: 'bg-teal-100 text-teal-700',   btn: 'bg-teal-600 hover:bg-teal-700 text-white' },
  blue:   { bg: 'bg-blue-50 border-blue-200',   icon: 'bg-blue-100 text-blue-600',   badge: 'bg-blue-100 text-blue-700',   btn: 'bg-blue-600 hover:bg-blue-700 text-white' },
  purple: { bg: 'bg-purple-50 border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700 text-white' },
  orange: { bg: 'bg-orange-50 border-orange-200', icon: 'bg-orange-100 text-orange-600', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700 text-white' },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, plan, onboarding_complete')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarding_complete) {
    redirect('/app/onboarding')
  }

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
          <span className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-500">Glance</span>
          </span>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{profile?.business_name || 'Your Business'}</p>
              <p className="text-xs text-slate-500 capitalize">{profile?.plan || 'free'} plan</p>
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

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-slate-500 text-base">Choose a tool to continue working</p>
      </div>

      {/* Product grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map(product => {
            const c = COLOR_MAP[product.color]
            const isActive = product.status === 'active'

            return (
              <div
                key={product.slug}
                className={`relative bg-white border rounded-2xl p-6 flex flex-col transition-shadow ${isActive ? 'border-slate-200 hover:shadow-md' : 'border-slate-200 opacity-60'}`}
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={product.icon} />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isActive ? c.badge : 'bg-slate-100 text-slate-500'}`}>
                    {isActive ? 'Active' : 'Coming Soon'}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 mb-2">{product.name}</h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-6">{product.description}</p>

                {isActive ? (
                  <Link
                    href={product.href}
                    className={`w-full text-center font-semibold py-2.5 rounded-xl text-sm transition-colors ${c.btn}`}
                  >
                    Open {product.name}
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full text-center font-semibold py-2.5 rounded-xl text-sm bg-slate-100 text-slate-400 cursor-not-allowed"
                  >
                    Notify Me
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
