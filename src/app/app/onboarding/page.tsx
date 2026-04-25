'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const INDUSTRIES = [
  'Retail and Trading',
  'Professional Services',
  'Consulting',
  'Construction and Real Estate',
  'Healthcare',
  'Education',
  'Hospitality and Food',
  'Logistics and Transport',
  'Technology',
  'Manufacturing',
  'Agriculture',
  'Creative and Media',
  'Other',
]

const THEMES = [
  { name: 'Teal', value: 'teal', color: 'bg-teal-500' },
  { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
  { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
  { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
  { name: 'Green', value: 'green', color: 'bg-green-500' },
]

const TEMPLATES = [
  { name: 'Classic', value: 'classic', desc: 'Traditional professional layout' },
  { name: 'Modern', value: 'modern', desc: 'Clean with accent color header' },
  { name: 'Minimal', value: 'minimal', desc: 'Simple and elegant' },
  { name: 'Bold', value: 'bold', desc: 'Strong visual with status badges' },
  { name: 'Corporate', value: 'corporate', desc: 'Formal letterhead style' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    business_name: '',
    business_address: '',
    phone: '',
    industry: '',
    tin: '',
    bank_name: '',
    bank_account_number: '',
    bank_account_name: '',
    theme: 'teal',
    invoice_template: 'classic',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/app/login')
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        ...form,
        vat_rate: 7.5,
        onboarding_complete: true,
      })
      .eq('id', user.id)

    if (error) {
      setError('Failed to save your details. Please try again.')
      setLoading(false)
      return
    }

    router.push('/app/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-white">
            Digit<span className="text-teal-400">Glance</span>
          </span>
          <p className="text-slate-400 mt-2 text-sm">Set up your business profile</p>

          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s < step ? 'bg-teal-600 text-white' :
                  s === step ? 'bg-teal-600 text-white' :
                  'bg-slate-700 text-slate-500'
                }`}>
                  {s < step ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-teal-600' : 'bg-slate-700'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-2 text-xs text-slate-500">
            <span className={step >= 1 ? 'text-teal-400' : ''}>Business</span>
            <span className={step >= 2 ? 'text-teal-400' : ''}>Banking</span>
            <span className={step >= 3 ? 'text-teal-400' : ''}>Preferences</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {/* Step 1: Business Details */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Business Details</h2>
              <p className="text-slate-400 text-sm mb-6">This information appears on your invoices.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={form.business_name}
                    onChange={e => update('business_name', e.target.value)}
                    placeholder="e.g. Ade Fajemisin and Associates"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Business Address *
                  </label>
                  <textarea
                    value={form.business_address}
                    onChange={e => update('business_address', e.target.value)}
                    placeholder="28 Michael Adekoya Street, Ilupeju, Lagos"
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder="08012345678"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Business Industry *
                  </label>
                  <select
                    value={form.industry}
                    onChange={e => update('industry', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    TIN (Tax Identification Number)
                    <span className="text-slate-600 normal-case font-normal ml-1">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={form.tin}
                    onChange={e => update('tin', e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!form.business_name || !form.business_address || !form.phone || !form.industry) {
                    setError('Please fill in all required fields.')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm mt-6"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Bank Details */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Bank Details</h2>
              <p className="text-slate-400 text-sm mb-6">These appear at the bottom of your invoices for payment.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={form.bank_name}
                    onChange={e => update('bank_name', e.target.value)}
                    placeholder="e.g. First Bank of Nigeria"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={form.bank_account_number}
                    onChange={e => update('bank_account_number', e.target.value)}
                    placeholder="0123456789"
                    maxLength={10}
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    value={form.bank_account_name}
                    onChange={e => update('bank_account_name', e.target.value)}
                    placeholder="e.g. Mustapha Idris Opeyemi"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>

                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-xs text-slate-400">
                    <span className="text-teal-400 font-semibold">VAT Rate: 7.5%</span> — This is set automatically in line with NRS requirements for Nigerian businesses.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!form.bank_name || !form.bank_account_number || !form.bank_account_name) {
                      setError('Please fill in all bank details.')
                      return
                    }
                    setError('')
                    setStep(3)
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Preferences</h2>
              <p className="text-slate-400 text-sm mb-6">Choose your theme and default invoice template.</p>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Theme Color
                </label>
                <div className="flex gap-3">
                  {THEMES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => update('theme', t.value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        form.theme === t.value
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${t.color}`} />
                      <span className="text-xs text-slate-400">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Invoice Template
                </label>
                <div className="space-y-2">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => update('invoice_template', t.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                        form.invoice_template === t.value
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                      </div>
                      {form.invoice_template === t.value && (
                        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  {loading ? 'Setting up...' : 'Go to Dashboard'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
