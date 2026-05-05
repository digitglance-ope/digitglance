'use client'

import { useState, useEffect, useCallback } from 'react'
import AppSidebar from '@/components/AppSidebar'
import { createClient } from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Customer {
  id: string
  account_owner_id: string
  name: string
  phone: string | null
  email: string | null
  tier: 'walk_in' | 'regular' | 'vip' | 'wholesale'
  credit_limit: number
  balance: number
  created_at: string
}

interface LinkedSale {
  id: string
  invoice_no: string | null
  grand_total: number
  posted_at: string
  status: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIER_META: Record<string, { label: string; badge: string }> = {
  walk_in:   { label: 'Walk-In',   badge: 'bg-slate-100 text-slate-600'     },
  regular:   { label: 'Regular',   badge: 'bg-blue-100 text-blue-700'       },
  vip:       { label: 'VIP',       badge: 'bg-purple-100 text-purple-700'   },
  wholesale: { label: 'Wholesale', badge: 'bg-amber-100 text-amber-700'     },
}

const EMPTY_FORM = { name: '', phone: '', email: '', tier: 'regular' as Customer['tier'], credit_limit: '' }

type TierFilter = 'all' | Customer['tier']

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PosCustomersPage() {
  const supabase = createClient()

  const [ownerId,   setOwnerId]   = useState<string | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  const [search,     setSearch]     = useState('')
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')

  // Add/Edit modal
  const [modal,  setModal]  = useState<{ open: boolean; editing: Customer | null }>({ open: false, editing: null })
  const [form,   setForm]   = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  // Delete confirm
  const [deleting, setDeleting] = useState<string | null>(null)

  // Statement modal
  const [stmtCustomer, setStmtCustomer] = useState<Customer | null>(null)
  const [stmtSales,    setStmtSales]    = useState<LinkedSale[]>([])
  const [stmtLoading,  setStmtLoading]  = useState(false)

  // Record payment modal
  const [payCustomer, setPayCustomer] = useState<Customer | null>(null)
  const [payAmount,   setPayAmount]   = useState('')
  const [paySaving,   setPaySaving]   = useState(false)

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
        .from('pos_customers')
        .select('*')
        .eq('account_owner_id', owner)
        .order('name')

      if (err) throw err
      setCustomers(rows ?? [])
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

  function openEdit(c: Customer) {
    setForm({ name: c.name, phone: c.phone ?? '', email: c.email ?? '', tier: c.tier, credit_limit: String(c.credit_limit) })
    setModal({ open: true, editing: c })
  }

  async function saveCustomer() {
    if (!ownerId || !form.name.trim()) return
    setSaving(true)
    try {
      const payload = {
        account_owner_id: ownerId,
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        tier: form.tier,
        credit_limit: parseFloat(form.credit_limit) || 0,
      }
      if (modal.editing) {
        const { error: err } = await supabase.from('pos_customers').update(payload).eq('id', modal.editing.id)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('pos_customers').insert({ ...payload, balance: 0 })
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

  async function deleteCustomer(id: string) {
    try {
      const { error: err } = await supabase.from('pos_customers').delete().eq('id', id)
      if (err) throw err
      setDeleting(null)
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  async function openStatement(c: Customer) {
    setStmtCustomer(c)
    setStmtSales([])
    setStmtLoading(true)
    try {
      const { data } = await supabase
        .from('pos_sales')
        .select('id, invoice_no, grand_total, posted_at, status')
        .eq('customer_id', c.id)
        .order('posted_at', { ascending: false })
        .limit(100)
      setStmtSales((data ?? []) as LinkedSale[])
    } finally {
      setStmtLoading(false)
    }
  }

  async function recordPayment() {
    if (!payCustomer || !ownerId) return
    const amt = parseFloat(payAmount)
    if (!amt || amt <= 0) return
    setPaySaving(true)
    try {
      const newBalance = Math.max(0, payCustomer.balance - amt)
      const { error: err } = await supabase
        .from('pos_customers')
        .update({ balance: newBalance })
        .eq('id', payCustomer.id)
      if (err) throw err
      setPayCustomer(null)
      setPayAmount('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Payment failed')
    } finally {
      setPaySaving(false)
    }
  }

  const filtered = customers.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      c.name.toLowerCase().includes(q) ||
      (c.phone ?? '').includes(search) ||
      (c.email ?? '').toLowerCase().includes(q)
    const matchTier = tierFilter === 'all' || c.tier === tierFilter
    return matchSearch && matchTier
  })

  const totalCustomers   = customers.length
  const totalCredit      = customers.reduce((s, c) => s + c.credit_limit, 0)
  const totalOutstanding = customers.reduce((s, c) => s + c.balance, 0)
  const atRisk           = customers.filter(c => c.credit_limit > 0 && c.balance >= c.credit_limit * 0.9).length

  const thCls = 'text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider'
  const tdCls = 'px-5 py-3.5'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />
      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
            <p className="text-slate-500 text-sm mt-1">Credit accounts, A/R balances, and statements</p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Customer
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
            { label: 'Total Customers', value: String(totalCustomers),  sub: 'registered accounts', color: 'text-slate-900'  },
            { label: 'Credit Extended', value: fmt(totalCredit),         sub: 'total credit limits',  color: 'text-blue-700'  },
            { label: 'Outstanding A/R', value: fmt(totalOutstanding),    sub: 'owed to you',          color: totalOutstanding > 0 ? 'text-amber-600' : 'text-green-600' },
            { label: 'Near Limit',      value: String(atRisk),           sub: '≥ 90% utilised',       color: atRisk > 0 ? 'text-red-600' : 'text-green-600' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs text-slate-500 font-medium mb-1">{k.label}</p>
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Search + tier filter */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input type="text" placeholder="Search name, phone, or email…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64" />
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'walk_in', 'regular', 'vip', 'wholesale'] as TierFilter[]).map(t => (
              <button key={t} onClick={() => setTierFilter(t)}
                className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
                  tierFilter === t ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}>
                {t === 'all' ? 'All Tiers' : TIER_META[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 text-sm">Loading customers…</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-400 text-sm mb-3">
                {customers.length === 0 ? 'No customers yet' : 'No customers match your filter'}
              </p>
              {customers.length === 0 && (
                <button onClick={openAdd} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Add your first customer →
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Customer', 'Contact', 'Tier', 'Credit Limit', 'Outstanding', 'Available', 'Actions'].map(h => (
                    <th key={h} className={thCls}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(c => {
                  const available = Math.max(0, c.credit_limit - c.balance)
                  const pct       = c.credit_limit > 0 ? Math.min(100, (c.balance / c.credit_limit) * 100) : 0
                  const barColor  = pct >= 90 ? 'bg-red-400' : pct >= 70 ? 'bg-amber-400' : 'bg-green-400'
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className={tdCls}>
                        <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Since {new Date(c.created_at).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                        </p>
                      </td>
                      <td className={tdCls}>
                        <p className="text-sm text-slate-700">{c.phone ?? '—'}</p>
                        <p className="text-xs text-slate-400">{c.email ?? ''}</p>
                      </td>
                      <td className={tdCls}>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TIER_META[c.tier]?.badge}`}>
                          {TIER_META[c.tier]?.label}
                        </span>
                      </td>
                      <td className={`${tdCls} text-sm text-slate-700`}>{fmt(c.credit_limit)}</td>
                      <td className={tdCls}>
                        <p className={`text-sm font-semibold ${c.balance > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                          {fmt(c.balance)}
                        </p>
                        {c.credit_limit > 0 && (
                          <div className="mt-1 h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                          </div>
                        )}
                      </td>
                      <td className={`${tdCls} text-sm text-slate-600`}>{fmt(available)}</td>
                      <td className={tdCls}>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => openStatement(c)}
                            className="text-xs text-slate-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                            Statement
                          </button>
                          {c.balance > 0 && (
                            <button onClick={() => { setPayCustomer(c); setPayAmount('') }}
                              className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors">
                              Pay
                            </button>
                          )}
                          <button onClick={() => openEdit(c)}
                            className="text-xs text-slate-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                            Edit
                          </button>
                          {deleting === c.id ? (
                            <span className="flex items-center gap-1 text-xs">
                              <button onClick={() => deleteCustomer(c.id)} className="text-red-600 font-semibold hover:text-red-700">Yes</button>
                              <span className="text-slate-300">/</span>
                              <button onClick={() => setDeleting(null)} className="text-slate-500 hover:text-slate-700">No</button>
                            </span>
                          ) : (
                            <button onClick={() => setDeleting(c.id)}
                              className="text-xs text-slate-400 hover:text-red-500 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
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
                  {modal.editing ? 'Edit Customer' : 'New Customer'}
                </h2>
                <button onClick={() => setModal({ open: false, editing: null })} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Full name or business name" autoFocus />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="080…" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="email@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Tier</label>
                    <select value={form.tier} onChange={e => setForm(f => ({ ...f, tier: e.target.value as Customer['tier'] }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="walk_in">Walk-In</option>
                      <option value="regular">Regular</option>
                      <option value="vip">VIP</option>
                      <option value="wholesale">Wholesale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Credit Limit (₦)</label>
                    <input type="number" min="0" value={form.credit_limit}
                      onChange={e => setForm(f => ({ ...f, credit_limit: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
                <button onClick={() => setModal({ open: false, editing: null })}
                  className="flex-1 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={saveCustomer} disabled={saving || !form.name.trim()}
                  className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {saving ? 'Saving…' : modal.editing ? 'Save Changes' : 'Add Customer'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Record Payment modal */}
        {payCustomer && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">Record Payment</h2>
                <button onClick={() => setPayCustomer(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-900">{payCustomer.name}</p>
                  <p className="text-xs text-blue-600 mt-0.5">Outstanding: {fmt(payCustomer.balance)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Amount (₦) *</label>
                  <input type="number" min="0" step="0.01" value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="0.00" autoFocus />
                </div>
              </div>
              <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
                <button onClick={() => setPayCustomer(null)}
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

        {/* Statement modal */}
        {stmtCustomer && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{stmtCustomer.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Customer Statement</p>
                </div>
                <button onClick={() => setStmtCustomer(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Summary strip */}
              <div className="grid grid-cols-3 border-b border-slate-100 shrink-0">
                {[
                  { label: 'Credit Limit', value: fmt(stmtCustomer.credit_limit), color: 'text-slate-900'  },
                  { label: 'Outstanding',  value: fmt(stmtCustomer.balance),       color: stmtCustomer.balance > 0 ? 'text-amber-600' : 'text-green-600' },
                  { label: 'Available',    value: fmt(Math.max(0, stmtCustomer.credit_limit - stmtCustomer.balance)), color: 'text-blue-700' },
                ].map((s, i) => (
                  <div key={s.label} className={`px-6 py-4 ${i < 2 ? 'border-r border-slate-100' : ''}`}>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className={`text-lg font-bold mt-0.5 ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto">
                {stmtLoading ? (
                  <div className="p-12 text-center text-slate-400 text-sm">Loading…</div>
                ) : stmtSales.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-sm">
                    No linked sales found. Link this customer at the terminal when processing a sale.
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                      <tr>
                        {['Date', 'Reference', 'Amount', 'Status'].map(h => (
                          <th key={h} className={thCls}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stmtSales.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="px-5 py-3 text-sm text-slate-600">
                            {new Date(s.posted_at).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-5 py-3 text-sm font-medium text-slate-900">{s.invoice_no ?? '—'}</td>
                          <td className="px-5 py-3 text-sm font-semibold text-slate-900">{fmt(s.grand_total)}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              s.status === 'completed' ? 'bg-green-100 text-green-700' :
                              s.status === 'voided'    ? 'bg-red-100 text-red-700'    :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
