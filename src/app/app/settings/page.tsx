'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const INDUSTRIES = ['Retail and Trading', 'Professional Services', 'Consulting', 'Construction and Real Estate', 'Healthcare', 'Education', 'Hospitality and Food', 'Logistics and Transport', 'Technology', 'Manufacturing', 'Agriculture', 'Creative and Media', 'Other']
const THEMES = [
  { name: 'Teal', value: 'teal', color: 'bg-teal-500' },
  { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
  { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
  { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
  { name: 'Green', value: 'green', color: 'bg-green-500' },
]
const TEMPLATES = ['classic', 'modern', 'minimal', 'bold', 'corporate']

export default function SettingsPage() {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    full_name: '', business_name: '', business_address: '', phone: '',
    industry: '', tin: '', vat_rate: 7.5, bank_name: '',
    bank_account_number: '', bank_account_name: '', theme: 'teal',
    invoice_template: 'classic', logo_url: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'business' | 'banking' | 'preferences'>('business')
  const [userId, setUserId] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setUserId(user.id)
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (data) {
      setForm({
        full_name: data.full_name || '',
        business_name: data.business_name || '',
        business_address: data.business_address || '',
        phone: data.phone || '',
        industry: data.industry || '',
        tin: data.tin || '',
        vat_rate: data.vat_rate || 7.5,
        bank_name: data.bank_name || '',
        bank_account_number: data.bank_account_number || '',
        bank_account_name: data.bank_account_name || '',
        theme: data.theme || 'teal',
        invoice_template: data.invoice_template || 'classic',
        logo_url: data.logo_url || '',
      })
    }
    setLoading(false)
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userId) return

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo must be smaller than 2MB.')
      return
    }

    setUploadingLogo(true)
    const ext = file.name.split('.').pop()
    const path = `${userId}/logo.${ext}`

    const { error } = await supabase.storage.from('logos').upload(path, file, { upsert: true })

    if (error) {
      alert('Failed to upload logo. Please try again.')
      setUploadingLogo(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(path)
    const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`

    await supabase.from('profiles').update({ logo_url: publicUrl }).eq('id', userId)
    setForm(prev => ({ ...prev, logo_url: urlWithTimestamp }))
    setUploadingLogo(false)
  }

  async function handleRemoveLogo() {
    if (!confirm('Remove your business logo?')) return
    await supabase.from('profiles').update({ logo_url: null }).eq('id', userId)
    setForm(prev => ({ ...prev, logo_url: '' }))
  }

  async function handleSave() {
    setSaving(true)
    setSuccess(false)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { logo_url, ...rest } = form
    await supabase.from('profiles').update({ ...rest }).eq('id', user.id)
    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  function update(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>

  return (
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
          <div className="pt-4 border-t border-slate-800 mt-2">
            <Link href="/app/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-teal-600/10 text-teal-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </Link>
          </div>
        </nav>
      </aside>

      <main className="md:ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your business profile and preferences</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            {saving ? 'Saving...' : success ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>

        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-6">Your settings have been saved successfully.</div>}

        <div className="flex gap-2 mb-6">
          {(['business', 'banking', 'preferences'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">

          {activeTab === 'business' && (
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Business Information</h2>

              {/* Logo upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Business Logo</label>
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 overflow-hidden">
                    {form.logo_url ? (
                      <img src={form.logo_url} alt="Business logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml" onChange={handleLogoUpload} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploadingLogo} className="block mb-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                      {uploadingLogo ? 'Uploading...' : form.logo_url ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    {form.logo_url && (
                      <button onClick={handleRemoveLogo} className="block text-xs text-red-400 hover:text-red-600 font-medium transition-colors">
                        Remove logo
                      </button>
                    )}
                    <p className="text-xs text-slate-400 mt-2">PNG, JPG or SVG. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input type="text" value={form.full_name} onChange={e => update('full_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Business Name</label>
                  <input type="text" value={form.business_name} onChange={e => update('business_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Business Address</label>
                  <textarea value={form.business_address} onChange={e => update('business_address', e.target.value)} rows={2} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Industry</label>
                  <select value={form.industry} onChange={e => update('industry', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500">
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">TIN</label>
                  <input type="text" value={form.tin} onChange={e => update('tin', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">VAT Rate (%)</label>
                  <input type="number" value={form.vat_rate} onChange={e => update('vat_rate', parseFloat(e.target.value) || 0)} min="0" max="100" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banking' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Bank Details</h2>
              <p className="text-sm text-slate-500 mb-4">These details appear at the bottom of every invoice for payment.</p>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bank Name</label>
                <input type="text" value={form.bank_name} onChange={e => update('bank_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Account Number</label>
                <input type="text" value={form.bank_account_number} onChange={e => update('bank_account_number', e.target.value)} maxLength={10} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Account Name</label>
                <input type="text" value={form.bank_account_name} onChange={e => update('bank_account_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Preferences</h2>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Theme Color</label>
                <div className="flex gap-3">
                  {THEMES.map(t => (
                    <button key={t.value} onClick={() => update('theme', t.value)} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${form.theme === t.value ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <div className={`w-8 h-8 rounded-full ${t.color}`} />
                      <span className="text-xs text-slate-500">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Invoice Template</label>
                <div className="grid grid-cols-5 gap-3">
                  {TEMPLATES.map(t => (
                    <button key={t} onClick={() => update('invoice_template', t)} className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${form.invoice_template === t ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
