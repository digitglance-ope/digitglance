'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

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
    includedUsers: 1,
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
    includedUsers: 1,
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
    includedUsers: 2,
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

const EXTRA_USER_PRICE = 2000

export default function SubscriptionPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [extraUsers, setExtraUsers] = useState<Record<string, number>>({ starter: 0, pro: 0 })

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setUserEmail(user.email || '')
    const { data } = await supabase.from('profiles').select('plan, full_name, business_name').eq('id', user.id).single()
    setProfile(data)
    setLoading(false)
  }

  function getTotalPrice(plan: typeof PLANS[0]) {
    if (plan.value === 'free') return 0
    return plan.price + (extraUsers[plan.value] || 0) * EXTRA_USER_PRICE
  }

  function changeExtraUsers(planValue: string, delta: number) {
    setExtraUsers(prev => ({
      ...prev,
      [planValue]: Math.max(0, (prev[planValue] || 0) + delta),
    }))
  }

  function handlePaystack(plan: typeof PLANS[0]) {
    if (plan.value === 'free') return

    if (!(window as any).PaystackPop) {
      alert('Payment system is still loading. Please wait a moment and try again.')
      return
    }

    setProcessingPlan(plan.value)
    const totalPrice = getTotalPrice(plan)
    const extra = extraUsers[plan.value] || 0

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: totalPrice * 100,
      currency: 'NGN',
      ref: `DG-${plan.value}-${Date.now()}`,
      metadata: {
        plan: plan.value,
        extra_users: extra,
        business_name: profile?.business_name || '',
      },
      callback: async function(response: any) {
        await verifyAndUpgrade(plan.value, response.reference, extra)
      },
      onClose: function() {
        setProcessingPlan('')
      },
    })

    handler.openIframe()
  }

  async function verifyAndUpgrade(planValue: string, reference: string, extraUserCount: number) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('profiles').update({ plan: planValue }).eq('id', user.id)

    await supabase.from('audit_logs').insert({
      account_owner_id: user.id,
      user_id: user.id,
      user_email: userEmail,
      action: 'Plan Upgraded',
      resource: 'Subscription',
      details: `Upgraded to ${planValue} plan with ${extraUserCount} extra users. Reference: ${reference}`,
    })

    setProcessingPlan('')
    load()
  }

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`
  const currentPlan = profile?.plan || 'free'

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
          <p className="text-slate-500 text-sm mt-1">
            Current plan: <span className="font-semibold text-teal-600 capitalize">{currentPlan}</span>
          </p>
        </div>

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

        <div className="grid grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const isCurrent = currentPlan === plan.value
            const isProcessing = processingPlan === plan.value
            const extra = extraUsers[plan.value] || 0
            const totalPrice = getTotalPrice(plan)
            const totalUsers = plan.includedUsers + extra

            return (
              <div key={plan.value} className={`bg-white border-2 rounded-2xl p-6 relative flex flex-col ${isCurrent ? 'border-teal-500' : plan.color}`}>
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

                <div className="mb-4">
                  {plan.price === 0 ? (
                    <div className="text-3xl font-bold text-slate-900">Free</div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">{fmt(totalPrice)}</span>
                        <span className="text-sm text-slate-400">/month</span>
                      </div>
                      {extra > 0 && (
                        <p className="text-xs text-blue-600 font-medium mt-0.5">
                          {fmt(plan.price)} base + {fmt(extra * EXTRA_USER_PRICE)} for {extra} extra user{extra > 1 ? 's' : ''}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-1 line-through">{fmt(plan.originalPrice)}/month</p>
                      <p className="text-xs text-green-600 font-semibold">Save {fmt(plan.originalPrice - plan.price)} per month</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-5 flex-1">
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

                {plan.value !== 'free' && (
                  <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Team Size</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{totalUsers} user{totalUsers > 1 ? 's' : ''}</p>
                        <p className="text-xs text-slate-400">
                          {plan.includedUsers} included{extra > 0 ? ` + ${extra} extra` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changeExtraUsers(plan.value, -1)}
                          disabled={extra === 0}
                          className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-lg flex items-center justify-center hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-slate-900">{extra}</span>
                        <button
                          onClick={() => changeExtraUsers(plan.value, 1)}
                          className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-lg flex items-center justify-center hover:border-teal-400 hover:text-teal-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {extra > 0 && (
                      <p className="text-xs text-teal-600 font-medium mt-2">
                        +{fmt(extra * EXTRA_USER_PRICE)}/month for additional users
                      </p>
                    )}
                  </div>
                )}

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
                    {isProcessing ? 'Processing...' : `Upgrade to ${plan.name} — ${fmt(totalPrice)}/mo`}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-900">Need more team members?</p>
            <p className="text-xs text-blue-700 mt-0.5">Use the + button on any paid plan to add extra users at ₦2,000 per user per month. Starter includes 1 user, Pro includes 2 users.</p>
          </div>
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
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
  )
}
