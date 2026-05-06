'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

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
  const [activeTab, setActiveTab] = useState<'business' | 'banking' | 'preferences' | 'security'>('business')
  const [userId, setUserId] = useState('')
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' })
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

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

  async function handlePasswordChange() {
    setPasswordError('')
    setPasswordSuccess(false)
    if (!passwordForm.newPassword) { setPasswordError('Please enter a new password.'); return }
    if (passwordForm.newPassword.length < 8) { setPasswordError('Password must be at least 8 characters.'); return }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { setPasswordError('Passwords do not match.'); return }
    setPasswordSaving(true)
    const { error } = await supabase.auth.updateUser({ password: passwordForm.newPassword })
    if (error) {
      setPasswordError(error.message || 'Failed to update password. Please try again.')
    } else {
      setPasswordSuccess(true)
      setPasswordForm({ newPassword: '', confirmPassword: '' })
      setTimeout(() => setPasswordSuccess(false), 4000)
    }
    setPasswordSaving(false)
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="md:ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your business profile and preferences</p>
          </div>
          {activeTab !== 'security' && (
            <button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              {saving ? 'Saving...' : success ? '✓ Saved' : 'Save Changes'}
            </button>
          )}
        </div>

        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-6">Your settings have been saved successfully.</div>}

        <div className="flex gap-2 mb-6">
          {(['business', 'banking', 'preferences', 'security'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">

          {activeTab === 'business' && (
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Business Information</h2>

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

          {activeTab === 'security' && (
            <div className="max-w-md">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Change Password</h2>
              <p className="text-sm text-slate-500 mb-6">Set a new password for your account.</p>
              {passwordError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{passwordError}</div>}
              {passwordSuccess && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">Password updated successfully.</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="At least 8 characters"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Repeat new password"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  disabled={passwordSaving}
                  className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {passwordSaving ? 'Updating...' : 'Update Password'}
                </button>
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
