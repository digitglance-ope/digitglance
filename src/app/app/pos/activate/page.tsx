'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface ExistingSub {
  id: string
  status: string
  plan_slug: string
  created_at: string
}

const POS_PLANS = [
  {
    slug: 'starter',
    name: 'POS Starter',
    price: 8000,
    desc: 'For single-location retail',
    badge: '',
    color: 'border-slate-200',
    btnColor: 'bg-slate-900 hover:bg-slate-800 text-white',
    trialColor: 'border-slate-300 text-slate-700 hover:bg-slate-50',
    features: [
      '1 branch, 1 terminal',
      'Up to 500 products',
      'Fast checkout terminal',
      'FIRS VAT compliance',
      'Sales and inventory reports',
      'CSV export',
    ],
  },
  {
    slug: 'pro',
    name: 'POS Pro',
    price: 18000,
    desc: 'For multi-branch operations',
    badge: 'Most Popular',
    color: 'border-blue-500',
    btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    trialColor: 'border-blue-300 text-blue-700 hover:bg-blue-50',
    features: [
      '3 branches, 3 terminals',
      'Unlimited products',
      'Fast checkout terminal',
      'FIRS VAT compliance',
      'Full reports + CSV export',
      'Vendor management',
      'Customer accounts and A/R',
      'Priority support',
    ],
  },
]

export default function PosActivatePage({
  searchParams,
}: {
  searchParams: { expired?: string }
}) {
  const router = useRouter()
  const supabase = createClient()

  const [userEmail, setUserEmail] = useState('')
  const [existingSub, setExistingSub] = useState<ExistingSub | null>(null)
  const [loading, setLoading] = useState(true)
  const [activating, setActivating] = useState('')
  const [error, setError] = useState('')

  const isExpired = searchParams?.expired === 'true'

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/app/login'); return }
    setUserEmail(user.email || '')

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_team_member, account_owner_id')
      .eq('id', user.id)
      .single()

    const ownerId = (profile?.is_team_member && profile.account_owner_id)
      ? profile.account_owner_id
      : user.id

    const { data: sub } = await supabase
      .from('product_subscriptions')
      .select('id, status, plan_slug, created_at')
      .eq('account_owner_id', ownerId)
      .eq('product_slug', 'pos')
      .maybeSingle()

    setExistingSub(sub || null)
    setLoading(false)
  }

  async function startTrial(planSlug: string) {
    setActivating(`trial-${planSlug}`)
    setError('')

    const res = await fetch('/api/pos-activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planSlug, mode: 'trial' }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Failed to start trial. Please try again.')
      setActivating('')
      return
    }

    router.push('/app/pos/dashboard')
  }

  function subscribePlan(plan: typeof POS_PLANS[0]) {
    if (!(window as any).PaystackPop) {
      setError('Payment system is still loading. Please wait a moment and try again.')
      return
    }

    setActivating(`pay-${plan.slug}`)
    setError('')

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: plan.price * 100,
      currency: 'NGN',
      ref: `DG-POS-${plan.slug}-${Date.now()}`,
      metadata: { product: 'pos', plan: plan.slug },
      callback: async (response: any) => {
        const res = await fetch('/api/pos-activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: plan.slug, mode: 'subscribe', reference: response.reference }),
        })

        if (res.ok) {
          router.push('/app/pos/dashboard')
        } else {
          const data = await res.json()
          setError(data.error || 'Payment was received but activation failed. Please contact hello@digitglance.com.')
          setActivating('')
        }
      },
      onClose: () => { setActivating('') },
    })

    handler.openIframe()
  }

  function trialDaysLeft(): number | null {
    if (!existingSub || existingSub.status !== 'trial') return null
    const start = new Date(existingSub.created_at)
    const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000)
    return Math.max(0, Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
  }

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    )
  }

  // Already on a paid subscription
  if (existingSub?.status === 'active') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">POS Already Active</h2>
          <p className="text-slate-500 text-sm mb-6">
            Your POS <span className="capitalize font-semibold">{existingSub.plan_slug}</span> subscription is active and ready to use.
          </p>
          <Link
            href="/app/pos/dashboard"
            className="block bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Open POS Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const isTrial = existingSub?.status === 'trial'
  const daysLeft = trialDaysLeft()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/app/dashboard">
            <span className="text-xl font-bold text-slate-900">Digit<span className="text-teal-500">Glance</span></span>
          </Link>
          <Link href="/app/dashboard" className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Trial expired banner */}
        {isExpired && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-amber-800 font-medium">Your 14-day free trial has ended. Subscribe to a plan below to continue using POS.</p>
          </div>
        )}

        {/* Active trial countdown banner */}
        {isTrial && daysLeft !== null && !isExpired && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800 font-medium">
              Your free trial is active —{' '}
              <strong>{daysLeft} day{daysLeft !== 1 ? 's' : ''} remaining</strong>.
              Subscribe below to keep your access after the trial ends.
            </p>
            {daysLeft > 0 && (
              <Link href="/app/pos/dashboard" className="ml-auto text-xs font-semibold text-blue-700 whitespace-nowrap hover:text-blue-900 border border-blue-300 px-3 py-1.5 rounded-lg">
                Continue Using POS →
              </Link>
            )}
          </div>
        )}

        {/* Page heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            DigitGlance POS
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            {isTrial ? 'Subscribe to Continue After Your Trial' : 'Add POS to Your Account'}
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            {isTrial
              ? 'Choose a plan that fits your business. You keep all your data when you subscribe.'
              : 'Start a 14-day free trial with no payment required, or subscribe directly today.'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {POS_PLANS.map(plan => {
            const isTrialingThisPlan = isTrial && existingSub?.plan_slug === plan.slug
            const isProcessingTrial = activating === `trial-${plan.slug}`
            const isProcessingPay = activating === `pay-${plan.slug}`
            const isAnyActivating = !!activating

            return (
              <div
                key={plan.slug}
                className={`bg-white border-2 rounded-2xl p-8 flex flex-col relative ${plan.color}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">{plan.badge}</span>
                  </div>
                )}
                {isTrialingThisPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white">Your Trial Plan</span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-5">{plan.desc}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">{fmt(plan.price)}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  {!isTrial && (
                    <p className="text-xs text-blue-600 font-semibold mt-1">14-day free trial — no card required</p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  {/* Paystack subscribe button */}
                  <button
                    onClick={() => subscribePlan(plan)}
                    disabled={isAnyActivating}
                    className={`w-full font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 ${plan.btnColor}`}
                  >
                    {isProcessingPay ? 'Processing...' : `Subscribe — ${fmt(plan.price)}/mo`}
                  </button>

                  {/* Free trial button — hidden once already in trial */}
                  {!isTrial && (
                    <button
                      onClick={() => startTrial(plan.slug)}
                      disabled={isAnyActivating}
                      className={`w-full font-semibold py-3 rounded-xl text-sm border transition-colors disabled:opacity-50 ${plan.trialColor}`}
                    >
                      {isProcessingTrial ? 'Activating trial...' : 'Start 14-Day Free Trial'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust signals */}
        {!isTrial && (
          <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Free trial starts instantly — no card required' },
              { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', text: 'Payments secured by Paystack — card details never stored' },
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'Questions? Email hello@digitglance.com' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
