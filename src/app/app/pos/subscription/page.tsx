'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

type Profile = {
  plan: string
  full_name: string
  business_name: string
}

const POS_PLANS = [
  {
    name: 'Starter',
    value: 'starter',
    price: 8000,
    originalPrice: 12000,
    includedUsers: 1,
    description: 'Perfect for a single-branch retail store',
    color: 'border-teal-500',
    badge: 'Most Popular',
    features: [
      '1 branch, 1 terminal',
      'Up to 500 products',
      'Cash, card, and transfer payments',
      'Daily sales reports',
      'VAT tracking (NRS compliant)',
      'Customer credit accounts',
      '1 user included',
      'Additional users at ₦2,000 each',
    ],
    excluded: [
      'Multi-branch',
      'Inventory valuation',
      'Vendor management',
    ],
  },
  {
    name: 'Pro',
    value: 'pro',
    price: 18000,
    originalPrice: 25000,
    includedUsers: 2,
    description: 'For multi-branch and high-volume retail',
    color: 'border-slate-900',
    badge: 'Best Value',
    features: [
      'Up to 3 branches, 3 terminals',
      'Unlimited products',
      'All payment methods incl. USSD & OPay',
      'Full VAT compliance (NRS export)',
      'Vendor and purchase management',
      'FIFO/LIFO/WAVG inventory valuation',
      'Staff performance reports',
      '2 users included',
      'Additional users at ₦2,000 each',
      'Priority support',
    ],
    excluded: [],
  },
]

const EXTRA_USER_PRICE = 2000
const PLAN_RANK: Record<string, number> = { starter: 0, pro: 1 }

export default function PosSubscriptionPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [extraUsers, setExtraUsers] = useState<Record<string, number>>({ starter: 0, pro: 0 })
  const [downgradeTarget, setDowngradeTarget] = useState<typeof POS_PLANS[0] | null>(null)
  const [downgrading, setDowngrading] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setUserEmail(user.email || '')
    const { data } = await supabase.from('profiles').select('plan, full_name, business_name').eq('id', user.id).single()
    setProfile(data)
    setLoading(false)
  }

  function getTotalPrice(plan: typeof POS_PLANS[0]) {
    return plan.price + (extraUsers[plan.value] || 0) * EXTRA_USER_PRICE
  }

  function changeExtraUsers(planValue: string, delta: number) {
    setExtraUsers(prev => ({ ...prev, [planValue]: Math.max(0, (prev[planValue] || 0) + delta) }))
  }

  function handlePaystack(plan: typeof POS_PLANS[0]) {
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
      ref: `DG-POS-${plan.value}-${Date.now()}`,
      metadata: { product: 'pos', plan: plan.value, extra_users: extra, business_name: profile?.business_name || '' },
      callback: async function(response: any) { await verifyAndUpgrade(plan.value, response.reference, extra) },
      onClose: function() { setProcessingPlan('') },
    })
    handler.openIframe()
  }

  async function verifyAndUpgrade(planValue: string, reference: string, extraUserCount: number) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({ plan: planValue }).eq('id', user.id)
    await supabase.from('audit_logs').insert({ account_owner_id: user.id, user_id: user.id, user_email: userEmail, action: 'Plan Upgraded', resource: 'Subscription', details: `POS upgraded to ${planValue} plan with ${extraUserCount} extra users. Ref: ${reference}` })
    setProcessingPlan('')
    load()
  }

  async function handleDowngrade(plan: typeof POS_PLANS[0]) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setDowngrading(true)
    await supabase.from('profiles').update({ plan: plan.value }).eq('id', user.id)
    await supabase.from('audit_logs').insert({ account_owner_id: user.id, user_id: user.id, user_email: userEmail, action: 'Plan Downgraded', resource: 'Subscription', details: `POS downgraded to ${plan.value} plan.` })
    setDowngrading(false)
    setDowngradeTarget(null)
    load()
  }

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`
  const currentPlan = profile?.plan || 'starter'

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />
      <main className="md:ml-64 flex-1 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />

      <main className="md:ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">POS Subscription</h1>
          <p className="text-slate-500 text-sm mt-1">
            Current plan: <span className="font-semibold text-teal-600 capitalize">{currentPlan}</span>
          </p>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-800">
              DigitGlance POS — <span className="capitalize">{currentPlan}</span> Plan
            </p>
            <p className="text-xs text-teal-600 mt-0.5">
              Upgrade to unlock more branches, terminals, and features.
            </p>
          </div>
          <span className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full font-semibold">Active</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {POS_PLANS.map(plan => {
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

                <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Team Size</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{totalUsers} user{totalUsers > 1 ? 's' : ''}</p>
                      <p className="text-xs text-slate-400">{plan.includedUsers} included{extra > 0 ? ` + ${extra} extra` : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeExtraUsers(plan.value, -1)} disabled={extra === 0} className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-lg flex items-center justify-center hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">-</button>
                      <span className="w-6 text-center text-sm font-bold text-slate-900">{extra}</span>
                      <button onClick={() => changeExtraUsers(plan.value, 1)} className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-lg flex items-center justify-center hover:border-teal-400 hover:text-teal-600 transition-colors">+</button>
                    </div>
                  </div>
                  {extra > 0 && <p className="text-xs text-teal-600 font-medium mt-2">+{fmt(extra * EXTRA_USER_PRICE)}/month for additional users</p>}
                </div>

                {isCurrent ? (
                  <button disabled className="w-full bg-slate-100 text-slate-400 font-semibold py-3 rounded-xl text-sm cursor-not-allowed">Current Plan</button>
                ) : PLAN_RANK[plan.value] < PLAN_RANK[currentPlan] ? (
                  <button onClick={() => setDowngradeTarget(plan)} className="w-full border border-slate-300 text-slate-600 font-semibold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                    Downgrade to {plan.name}
                  </button>
                ) : (
                  <button onClick={() => handlePaystack(plan)} disabled={isProcessing} className={`w-full font-semibold py-3 rounded-xl text-sm transition-colors ${plan.value === 'starter' ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'} disabled:opacity-50`}>
                    {isProcessing ? 'Processing...' : `Upgrade to ${plan.name} — ${fmt(totalPrice)}/mo`}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 max-w-3xl">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Payment Information</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-500">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>Secured by Paystack. Your card details are never stored.</span>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>Subscriptions renew monthly. Contact us to change your plan.</span>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>Billing questions: hello@digitglance.com — 24 hour response.</span>
            </div>
          </div>
        </div>
      </main>

      {downgradeTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) setDowngradeTarget(null) }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Downgrade to {downgradeTarget.name}?</h3>
                <p className="text-xs text-slate-500">This takes effect immediately.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-5">Your existing data will not be deleted. You can upgrade again at any time.</p>
            <div className="flex gap-3">
              <button onClick={() => setDowngradeTarget(null)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">Keep Current Plan</button>
              <button onClick={() => handleDowngrade(downgradeTarget)} disabled={downgrading} className="flex-1 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                {downgrading ? 'Downgrading...' : 'Confirm Downgrade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
