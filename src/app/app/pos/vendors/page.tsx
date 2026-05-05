'use client'

import { useState, useEffect, useCallback } from 'react'
import AppSidebar from '@/components/AppSidebar'
import { createClient } from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Vendor {
  id: string
  account_owner_id: string
  name: string
  contact_email: string | null
  contact_phone: string | null
  payment_terms: string | null
  rating: string
  outstanding_balance: number
  created_at: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RATING_META: Record<string, { label: string; badge: string }> = {
  A: { label: 'A — Excellent', badge: 'bg-green-100 text-green-700'   },
  B: { label: 'B — Good',      badge: 'bg-blue-100 text-blue-700'     },
  C: { label: 'C — Average',   badge: 'bg-amber-100 text-amber-700'   },
  D: { label: 'D — Poor',      badge: 'bg-red-100 text-red-700'       },
}

const PAYMENT_TERMS = ['COD', 'Net 7', 'Net 15', 'Net 30', 'Net 45', 'Net 60']

const EMPTY_FORM = {
  name: '', contact_email: '', contact_phone: '',
  payment_terms: 'Net 30', rating: 'B',
}

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PosVendorsPage() {
  const supabase = createClient()

  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  const [search,       setSearch]       = useState('')
  const [ratingFilter, setRatingFilter] = useState<string>('all')

  // Add/Edit modal
  const [modal,  setModal]  = useState<{ open: boolean; editing: Vendor | null }>({ open: false, editing: null })
  const [form,   setForm]   = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  // Delete confirm
  const [deleting, setDeleting] = useState<string | null>(null)

  // Record bill modal (increases A/P)
  const [billVendor, setBillVendor] = useState<Vendor | null>(null)
  const [billAmount, setBillAmount] = useState('')
  const [billRef,    setBillRef]    = useState('')
  const [billSaving, setBillSaving] = useState(false)

  // Record payment modal (reduces A/P)
  const [payVendor, setPayVendor] = useState<Vendor | null>(null)
  const [payAmount, setPayAmount] = useState('')
  const [paySaving, setPaySaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_team_member, account_owner_id')
        .eq('id', user.id)
        .single()

      const owner = (profile?.is_team_member && profile.account_owner_id)
        ? profile.account_owner_id
        : user.id

      setOwnerId(owner)

      const { data: rows, error: err } = await supabase
        .from('pos_vendors')
        .select('*')
        .eq('account_owner_id', owner)
        .order('name')

      if (err) throw err
      setVendors(rows ?? [])
      return owner
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
      return null
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load() }, [load])

  function openAdd() {
    setForm(EMPTY_FORM)
    setModal({ open: true, editing: null })
  }

  function openEdit(v: Vendor) {
    setForm({
      name: v.name,
      contact_email: v.contact_email ?? '',
      contact_phone: v.contact_phone ?? '',
      payment_terms: v.payment_terms ?? 'Net 30',
      rating: v.rating,
    })
    setModal({ open: true, editing: v })
  }

  async function saveVendor() {
    if (!ownerId || !form.name.trim()) return
    setSaving(true)
    try {
      const payload = {
        account_owner_id: ownerId,
        name: form.name.trim(),
        contact_email: form.contact_email.trim() || null,
        contact_phone: form.contact_phone.trim() || null,
        payment_terms: form.payment_terms || null,
        rating: form.rating,
      }
      if (modal.editing) {
        const { error: err } = await supabase.from('pos_vendors').update(payload).eq('id', modal.editing.id)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('pos_vendors').insert({ ...payload, outstanding_balance: 0 })
        if (err) throw err
      }
      setModal({ open: false, editing: null })
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function deleteVendor(id: string) {
    try {
      const { error: err } = await supabase.from('pos_vendors').delete().eq('id', id)
      if (err) throw err
      setDeleting(null)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  async function recordBill() {
    if (!billVendor) return
    const amt = parseFloat(billAmount)
    if (!amt || amt <= 0) return
    setBillSaving(true)
    try {
      const { error: err } = await supabase
        .from('pos_vendors')
        .update({ outstanding_balance: billVendor.outstanding_balance + amt })
        .eq('id', billVendor.id)
      if (err) throw err
      setBillVendor(null)
      setBillAmount('')
      setBillRef('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to record bill')
    } finally {
      setBillSaving(false)
    }
  }

  async function recordPayment() {
    if (!payVendor) return
    const amt = parseFloat(payAmount)
    if (!amt || amt <= 0) return
    setPaySaving(true)
    try {
      const newBalance = Math.max(0, payVendor.outstanding_balance - amt)
      const { error: err } = await supabase
        .from('pos_vendors')
        .update({ outstanding_balance: newBalance })
        .eq('id', payVendor.id)
      if (err) throw err
      setPayVendor(null)
      setPayAmount('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Payment failed')
    } finally {
      setPaySaving(false)
    }
  }

  const filtered = vendors.filter(v => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      v.name.toLowerCase().includes(q) ||
      (v.contact_phone ?? '').includes(search) ||
      (v.contact_email ?? '').toLowerCase().includes(q)
    const matchRating = ratingFilter === 'all' || v.rating === ratingFilter
    return matchSearch && matchRating
  })

  const totalVendors     = vendors.length
  const totalAP          = vendors.reduce((s, v) => s + v.outstanding_balance, 0)
  const vendorsWithBills = vendors.filter(v => v.outstanding_balance > 0).length
  const topRated         = vendors.filter(v => v.rating === 'A').length

  const thCls = 'text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider'
  const tdCls = 'px-5 py-3.5'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />
      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Vendors</h1>
            <p className="text-slate-500 text-sm mt-1">Supplier directory, A/P balances, and payments</p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Vendor
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Vendors',    value: String(totalVendors),     sub: 'registered suppliers',  color: 'text-slate-900'  },
            { label: 'Total A/P',        value: fmt(totalAP),              sub: 'owed to suppliers',     color: totalAP > 0 ? 'text-red-600' : 'text-green-600' },
            { label: 'With Open Bills',  value: String(vendorsWithBills),  sub: 'have outstanding A/P',  color: vendorsWithBills > 0 ? 'text-amber-600' : 'text-slate-400' },
            { label: 'Top Rated (A)',    value: String(topRated),          sub: 'excellent suppliers',   color: 'text-green-600'  },
          ].map(k => (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs text-slate-500 font-medium mb-1">{k.label}</p>
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Search + rating filter */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input type="text" placeholder="Search name, phone, or email…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64" />
          <div className="flex gap-1.5">
            {['all', 'A', 'B', 'C', 'D'].map(r => (
              <button key={r} onClick={() => setRatingFilter(r)}
                className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
                  ratingFilter === r ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}>
                {r === 'all' ? 'All Ratings' : `Rating ${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 text-sm">Loading vendors…</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-400 text-sm mb-3">
                {vendors.length === 0 ? 'No vendors yet' : 'No vendors match your filter'}
              </p>
              {vendors.length === 0 && (
                <button onClick={openAdd} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Add your first vendor →
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Vendor', 'Contact', 'Terms', 'Rating', 'Outstanding A/P', 'Actions'].map(h => (
                    <th key={h} className={thCls}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className={tdCls}>
                      <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Since {new Date(v.created_at).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className={tdCls}>
                      <p className="text-sm text-slate-700">{v.contact_phone ?? '—'}</p>
                      <p className="text-xs text-slate-400">{v.contact_email ?? ''}</p>
                    </td>
                    <td className={`${tdCls} text-sm text-slate-600`}>{v.payment_terms ?? '—'}</td>
                    <td className={tdCls}>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${RATING_META[v.rating]?.badge ?? 'bg-slate-100 text-slate-600'}`}>
                        {v.rating}
                      </span>
                    </td>
                    <td className={tdCls}>
                      <p className={`text-sm font-semibold ${v.outstanding_balance > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                        {fmt(v.outstanding_balance)}
                      </p>
                    </td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setBillVendor(v); setBillAmount(''); setBillRef('') }}
                          className="text-xs text-amber-600 hover:text-amber-700 font-medium px-2 py-1 rounded hover:bg-amber-50 transition-colors">
                          Bill
                        </button>
                        {v.outstanding_balance > 0 && (
                          <button onClick={() => { setPayVendor(v); setPayAmount('') }}
                            className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors">
                            Pay
                          </button>
                        )}
                        <button onClick={() => openEdit(v)}
                          className="text-xs text-slate-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                          Edit
                        </button>
                        {deleting === v.id ? (
                          <span className="flex items-center gap-1 text-xs">
                            <button onClick={() => deleteVendor(v.id)} className="text-red-600 font-semibold hover:text-red-700">Yes</button>
                            <span className="text-slate-300">/</span>
                            <button onClick={() => setDeleting(null)} className="text-slate-500 hover:text-slate-700">No</button>
                          </span>
                        ) : (
                          <button onClick={() => setDeleting(v.id)}
                            className="text-xs text-slate-400 hover:text-red-500 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add / Edit modal */}
        {modal.open && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  {modal.editing ? 'Edit Vendor' : 'New Vendor'}
                </h2>
                <button onClick={() => setModal({ open: false, editing: null })} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Vendor Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Supplier or company name" autoFocus />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
                    <input type="tel" value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="080…" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="vendor@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Payment Terms</label>
                    <select value={form.payment_terms} onChange={e => setForm(f => ({ ...f, payment_terms: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Rating</label>
                    <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {Object.entries(RATING_META).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
                <button onClick={() => setModal({ open: false, editing: null })}
                  className="flex-1 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={saveVendor} disabled={saving || !form.name.trim()}
                  className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {saving ? 'Saving…' : modal.editing ? 'Save Changes' : 'Add Vendor'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Record Bill modal */}
        {billVendor && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">Record Purchase Bill</h2>
                <button onClick={() => setBillVendor(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-900">{billVendor.name}</p>
                  <p className="text-xs text-amber-600 mt-0.5">Current A/P: {fmt(billVendor.outstanding_balance)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Bill Amount (₦) *</label>
                  <input type="number" min="0" step="0.01" value={billAmount}
                    onChange={e => setBillAmount(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="0.00" autoFocus />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Reference / Invoice No.</label>
                  <input type="text" value={billRef} onChange={e => setBillRef(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Supplier invoice number" />
                </div>
              </div>
              <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
                <button onClick={() => setBillVendor(null)}
                  className="flex-1 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={recordBill} disabled={billSaving || !billAmount || parseFloat(billAmount) <= 0}
                  className="flex-1 bg-amber-500 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {billSaving ? 'Recording…' : 'Record Bill'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Record Payment modal */}
        {payVendor && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">Record Payment</h2>
                <button onClick={() => setPayVendor(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-900">{payVendor.name}</p>
                  <p className="text-xs text-blue-600 mt-0.5">Outstanding A/P: {fmt(payVendor.outstanding_balance)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Payment Amount (₦) *</label>
                  <input type="number" min="0" step="0.01" value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="0.00" autoFocus />
                </div>
              </div>
              <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
                <button onClick={() => setPayVendor(null)}
                  className="flex-1 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={recordPayment} disabled={paySaving || !payAmount || parseFloat(payAmount) <= 0}
                  className="flex-1 bg-green-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {paySaving ? 'Recording…' : 'Record Payment'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
