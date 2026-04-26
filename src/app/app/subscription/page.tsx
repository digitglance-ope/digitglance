'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Profile = {
  plan: string
  full_name: string
  business_name: string
}

const PLANS = [
  {
    name: 'Free',
    value: 'free',
    price: 0,
    originalPrice: 0,
    description: 'Get started at no cost',
    color: 'border-slate-200',
    badge: '',
    features: [
      '20 invoices per month',
      'Customer management',
      'PDF invoice generation',
      'Basic reports',
    ],
    excluded: [
      'Inventory management',
      'VAT reports',
      'User control',
      'Supplier management',
    ],
  },
  {
    name: 'Starter',
    value: 'starter',
    price: 5000,
    originalPrice: 7500,
    description: 'For growing businesses',
    color: 'border-teal-500',
    badge: 'Most Popular',
    features: [
      '100 invoices per month',
      'Customer management',
      'PDF invoice generation',
      'Inventory (up to 1,000 items)',
      'Full reports and VAT report',
      'User control (1 user included)',
      'Additional users at ₦2,000 each',
    ],
    excluded: [
      'Supplier management',
      'Accounts payable and receivable',
    ],
  },
  {
    name: 'Pro',
    value: 'pro',
    price: 12000,
    originalPrice: 18000,
    description: 'Full access for established businesses',
    color: 'border-slate-900',
    badge: 'Best Value',
    features: [
      'Unlimited invoices',
      'Customer management',
      'PDF invoice generation',
      'Unlimited inventory',
      'Full reports and VAT report',
      'User control (2 users included)',
      'Supplier management',
      'Accounts payable and receivable',
      'Additional users at ₦2,000 each',
      'Priority support',
    ],
    excluded: [],
  },
]

export default function SubscriptionPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setUserEmail(user.email || '')
    const { data } = await supabase.from('profiles').select('plan, full_name, business_name').eq('id', user.id).single()
    setProfile(data)
    setLoading(false)
  }

  function handlePaystack(plan: typeof PLANS[0]) {
    if (plan.value === 'free') return
    setProcessingPlan(plan.value)

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: plan.price * 100,
      currency: 'NGN',
      ref: `DG-${plan.value}-${Date.now()}`,
      metadata: {
        plan: plan.value,
        business_name: profile?.business_name || '',
      },
      callback: async function(response: any) {
        await verifyAndUpgrade(plan.value, response.reference)
      },
      onClose: function() {
        setProcessingPlan('')
      },
    })

    handler.openIframe()
  }

  async function verifyAndUpgrade(planValue: string, reference: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('profiles').update({ plan: planValue }).eq('id', user.id)

    await supabase.from('audit_logs').insert({
      account_owner_id: user.id,
      user_id: user.id,
      user_email: userEmail,
      action: 'Plan Upgraded',
      resource: 'Subscription',
      details: `Upgraded to ${planValue} plan. Reference: ${reference}`,
    })

    setProcessingPlan('')
    load()
  }

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`
  const currentPlan = profile?.plan || 'free'

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>

  return (
    <>
      <script src="https://js.paystack.co/v1/inline.js" async />

      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0">
          <div className="p-6 border-b border-slate-800">
            <Link href="/app/dashboard"><span className="text-xl font-bold text-white">Digit<span className="text-teal-400">Glance</span></span></Link>
            <p className="text-xs text-slate-500 mt-1">Invoice System</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[
              { href: '/app/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { href: '/app/invoices', label: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { href: '/app/customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
              { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-800 mt-2 space-y-1">
              <Link href="/app/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
              </Link>
              <Link href="/app/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Users
              </Link>
              <Link href="/app/subscription" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-teal-600/10 text-teal-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                Subscription
              </Link>
            </div>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
            <p className="text-slate-500 text-sm mt-1">
              Current plan: <span className="font-semibold text-teal-600 capitalize">{currentPlan}</span>
            </p>
          </div>

          {/* Current plan banner */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-800">You are on the <span className="capitalize">{currentPlan}</span> plan</p>
              <p className="text-xs text-teal-600 mt-0.5">
                {currentPlan === 'free' ? 'Upgrade to unlock more features and higher invoice limits.' : 'Thank you for your subscription. All features are active.'}
              </p>
            </div>
            {currentPlan !== 'free' && (
              <span className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full font-semibold">Active</span>
            )}
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-3 gap-6">
            {PLANS.map(plan => {
              const isCurrent = currentPlan === plan.value
              const isProcessing = processingPlan === plan.value

              return (
                <div key={plan.value} className={`bg-white border-2 rounded-2xl p-6 relative ${isCurrent ? 'border-teal-500' : plan.color}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${plan.value === 'starter' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-white'}`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-3 right-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500 text-white">Current Plan</span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price === 0 ? (
                      <div className="text-3xl font-bold text-slate-900">Free</div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-slate-900">{fmt(plan.price)}</span>
                          <span className="text-sm text-slate-400">/month</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-through">{fmt(plan.originalPrice)}/month</p>
                        <p className="text-xs text-green-600 font-semibold">Save {fmt(plan.originalPrice - plan.price)} per month</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </div>
                    ))}
                    {plan.excluded.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-400">
                        <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>

                  {isCurrent ? (
                    <button disabled className="w-full bg-slate-100 text-slate-400 font-semibold py-3 rounded-xl text-sm cursor-not-allowed">
                      Current Plan
                    </button>
                  ) : plan.value === 'free' ? (
                    <button disabled className="w-full border border-slate-200 text-slate-400 font-semibold py-3 rounded-xl text-sm cursor-not-allowed">
                      Free Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePaystack(plan)}
                      disabled={isProcessing}
                      className={`w-full font-semibold py-3 rounded-xl text-sm transition-colors ${plan.value === 'starter' ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'} disabled:opacity-50`}
                    >
                      {isProcessing ? 'Processing...' : `Upgrade to ${plan.name}`}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Payment Information</h3>
            <div className="grid grid-cols-3 gap-4 text-sm text-slate-500">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>Payments are secured by Paystack. Your card details are never stored on our servers.</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Subscriptions renew monthly. You can upgrade or contact us to change your plan at any time.</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>For billing questions contact hello@digitglance.com and we will respond within 24 hours.</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
