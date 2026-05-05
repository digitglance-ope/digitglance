'use client'

import { useState, useEffect, useCallback } from 'react'
import AppSidebar from '@/components/AppSidebar'
import { createClient } from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────

interface VatPeriod {
  id: string
  period: string
  output_vat: number
  input_vat: number
  liability: number
  status: 'open' | 'filed'
  firs_ref: string | null
  filed_at: string | null
  created_at: string
}

interface VatBreakdown {
  standard_sales: number
  standard_vat: number
  zero_sales: number
  exempt_sales: number
  nil_sales: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function recentPeriods(): string[] {
  const result: string[] = []
  const d = new Date()
  for (let i = 0; i < 12; i++) {
    result.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
    d.setMonth(d.getMonth() - 1)
  }
  return result
}

function periodLabel(p: string) {
  const [y, m] = p.split('-')
  return new Date(parseInt(y), parseInt(m) - 1, 1)
    .toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })
}

function nowPeriod() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PosVatPage() {
  const supabase = createClient()

  const [ownerId,  setOwnerId]  = useState<string | null>(null)
  const [periods,  setPeriods]  = useState<VatPeriod[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  const [selected,  setSelected]  = useState(nowPeriod)
  const [breakdown, setBreakdown] = useState<VatBreakdown | null>(null)
  const [inputVat,  setInputVat]  = useState('')
  const [computing, setComputing] = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [firsRef,   setFirsRef]   = useState('')
  const [filing,    setFiling]    = useState(false)

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
        .from('pos_vat_periods')
        .select('*')
        .eq('account_owner_id', owner)
        .order('period', { ascending: false })

      if (err) throw err
      setPeriods(rows ?? [])
      return owner
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
      return null
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load() }, [load])

  // Pre-fill inputs when switching period
  useEffect(() => {
    const existing = periods.find(p => p.period === selected)
    if (existing) {
      setInputVat(String(existing.input_vat))
      setBreakdown({ standard_sales: 0, standard_vat: existing.output_vat, zero_sales: 0, exempt_sales: 0, nil_sales: 0 })
    } else {
      setBreakdown(null)
      setInputVat('')
    }
    setFirsRef('')
  }, [selected, periods])

  async function computeVat() {
    if (!ownerId) return
    setComputing(true)
    try {
      const [y, m] = selected.split('-').map(Number)
      const from = new Date(y, m - 1, 1).toISOString()
      const to   = new Date(y, m, 1).toISOString()

      const { data: sales } = await supabase
        .from('pos_sales')
        .select('id')
        .eq('account_owner_id', ownerId)
        .gte('created_at', from)
        .lt('created_at', to)

      const saleIds = (sales ?? []).map((s: { id: string }) => s.id)
      if (saleIds.length === 0) {
        setBreakdown({ standard_sales: 0, standard_vat: 0, zero_sales: 0, exempt_sales: 0, nil_sales: 0 })
        return
      }

      const { data: items } = await supabase
        .from('pos_sale_items')
        .select('vat_class, vat_amount, line_total')
        .in('sale_id', saleIds)

      const bd: VatBreakdown = { standard_sales: 0, standard_vat: 0, zero_sales: 0, exempt_sales: 0, nil_sales: 0 }
      for (const item of items ?? []) {
        const lineNet = item.line_total ?? 0
        const lineVat = item.vat_amount ?? 0
        if (item.vat_class === 'standard') {
          bd.standard_sales += lineNet
          bd.standard_vat   += lineVat
        } else if (item.vat_class === 'zero') {
          bd.zero_sales += lineNet
        } else if (item.vat_class === 'exempt') {
          bd.exempt_sales += lineNet
        } else {
          bd.nil_sales += lineNet
        }
      }
      setBreakdown(bd)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Compute failed')
    } finally {
      setComputing(false)
    }
  }

  async function savePeriod() {
    if (!ownerId || !breakdown) return
    setSaving(true)
    try {
      const outputVat   = breakdown.standard_vat
      const inputVatNum = parseFloat(inputVat) || 0
      const liability   = outputVat - inputVatNum
      const existing    = periods.find(p => p.period === selected)

      if (existing) {
        const { error: err } = await supabase
          .from('pos_vat_periods')
          .update({ output_vat: outputVat, input_vat: inputVatNum, liability })
          .eq('id', existing.id)
        if (err) throw err
      } else {
        const { error: err } = await supabase
          .from('pos_vat_periods')
          .insert({ account_owner_id: ownerId, period: selected, output_vat: outputVat, input_vat: inputVatNum, liability, status: 'open' })
        if (err) throw err
      }
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function filePeriod() {
    const existing = periods.find(p => p.period === selected)
    if (!existing) return
    setFiling(true)
    try {
      const { error: err } = await supabase
        .from('pos_vat_periods')
        .update({ status: 'filed', firs_ref: firsRef.trim() || null, filed_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (err) throw err
      setFirsRef('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Filing failed')
    } finally {
      setFiling(false)
    }
  }

  const savedPeriod = periods.find(p => p.period === selected) ?? null
  const outputVat   = breakdown?.standard_vat ?? 0
  const inputVatNum = parseFloat(inputVat) || 0
  const liability   = outputVat - inputVatNum

  const thCls = 'text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider'
  const tdCls = 'px-5 py-3.5'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />
      <main className="md:ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">VAT & FIRS</h1>
            <p className="text-slate-500 text-sm mt-1">Monthly VAT liability, FIRS classification, and filing history</p>
          </div>
          <select value={selected} onChange={e => setSelected(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
            {recentPeriods().map(p => (
              <option key={p} value={p}>{periodLabel(p)}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs text-slate-500 font-medium mb-1">Output VAT (Sales)</p>
            <p className="text-2xl font-bold text-slate-900">{fmt(outputVat)}</p>
            <p className="text-xs text-slate-400 mt-0.5">Collected from customers</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs text-slate-500 font-medium mb-1">Input VAT (Purchases)</p>
            <p className="text-2xl font-bold text-slate-900">{fmt(inputVatNum)}</p>
            <p className="text-xs text-slate-400 mt-0.5">Paid to suppliers</p>
          </div>
          <div className={`border rounded-xl p-5 ${liability > 0 ? 'bg-red-50 border-red-200' : liability < 0 ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
            <p className="text-xs text-slate-500 font-medium mb-1">Net VAT Liability</p>
            <p className={`text-2xl font-bold ${liability > 0 ? 'text-red-700' : liability < 0 ? 'text-green-700' : 'text-slate-400'}`}>
              {fmt(Math.abs(liability))}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {liability > 0 ? 'Payable to FIRS' : liability < 0 ? 'Refund due' : 'Nil liability'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-8">

          {/* Left: 3-step workflow */}
          <div className="col-span-3 space-y-5">

            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                    <h2 className="text-sm font-bold text-slate-900">Compute Output VAT</h2>
                  </div>
                  <p className="text-xs text-slate-500 pl-7">Pull VAT from POS sales for {periodLabel(selected)}</p>
                </div>
                <button onClick={computeVat} disabled={computing}
                  className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                  {computing ? 'Computing…' : 'Compute from Sales'}
                </button>
              </div>

              {breakdown ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
                      <th className="text-left pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="text-right pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Sales</th>
                      <th className="text-right pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">VAT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { code: 'V', badge: 'bg-blue-100 text-blue-700',   desc: 'Standard 7.5%', sales: breakdown.standard_sales, vat: breakdown.standard_vat },
                      { code: 'Z', badge: 'bg-green-100 text-green-700', desc: 'Zero-rated',    sales: breakdown.zero_sales,     vat: 0 },
                      { code: 'E', badge: 'bg-amber-100 text-amber-700', desc: 'Exempt',        sales: breakdown.exempt_sales,   vat: 0 },
                      { code: 'N', badge: 'bg-slate-100 text-slate-600', desc: 'Non-vatable',   sales: breakdown.nil_sales,      vat: 0 },
                    ].map(row => (
                      <tr key={row.code}>
                        <td className="py-2.5">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${row.badge}`}>{row.code}</span>
                        </td>
                        <td className="py-2.5 text-sm text-slate-700">{row.desc}</td>
                        <td className="py-2.5 text-sm text-slate-900 text-right">{fmt(row.sales)}</td>
                        <td className="py-2.5 text-sm font-semibold text-right">
                          {row.vat > 0 ? <span className="text-blue-700">{fmt(row.vat)}</span> : <span className="text-slate-300">₦0.00</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200">
                      <td colSpan={3} className="pt-2.5 text-sm font-bold text-slate-900">Total Output VAT</td>
                      <td className="pt-2.5 text-sm font-bold text-blue-700 text-right">{fmt(breakdown.standard_vat)}</td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm border border-dashed border-slate-200 rounded-lg">
                  Click &quot;Compute from Sales&quot; to pull VAT data for {periodLabel(selected)}
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
                <h2 className="text-sm font-bold text-slate-900">Enter Input VAT</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4 pl-7">VAT paid on supplier purchases this period</p>
              <div className="flex items-center gap-4">
                <div className="relative w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
                  <input type="number" min="0" step="0.01" value={inputVat}
                    onChange={e => setInputVat(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="0.00" />
                </div>
                <p className="text-xs text-slate-500">
                  Liability = {fmt(outputVat)} − {fmt(inputVatNum)} = {' '}
                  <span className={`font-bold ${liability > 0 ? 'text-red-600' : 'text-green-600'}`}>{fmt(liability)}</span>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                <h2 className="text-sm font-bold text-slate-900">Reconcile & Save</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4 pl-7">
                Save computed figures to create a period record.
                {savedPeriod && <span className="text-amber-600"> This period is already saved — saving again updates the figures.</span>}
              </p>
              <button onClick={savePeriod} disabled={saving || !breakdown}
                className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                {saving ? 'Saving…' : savedPeriod ? 'Update Period' : 'Save Period'}
              </button>
            </div>
          </div>

          {/* Right: status + guide */}
          <div className="col-span-2 space-y-5">

            {/* Filing status */}
            <div className={`rounded-xl border p-6 ${
              savedPeriod?.status === 'filed' ? 'bg-green-50 border-green-200'
              : savedPeriod ? 'bg-amber-50 border-amber-200'
              : 'bg-white border-slate-200'
            }`}>
              <h2 className="text-sm font-bold text-slate-900 mb-4">Filing Status</h2>

              {!savedPeriod ? (
                <p className="text-xs text-slate-400">Complete Steps 1–3 to create a period record before filing.</p>
              ) : savedPeriod.status === 'filed' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-green-700">Filed with FIRS</span>
                  </div>
                  {savedPeriod.firs_ref && (
                    <p className="text-xs text-slate-700">Ref: <span className="font-mono font-semibold">{savedPeriod.firs_ref}</span></p>
                  )}
                  {savedPeriod.filed_at && (
                    <p className="text-xs text-slate-500">
                      {new Date(savedPeriod.filed_at).toLocaleDateString('en-NG', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-amber-700">Pending — not yet filed</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">FIRS Reference No. (optional)</label>
                    <input type="text" value={firsRef} onChange={e => setFirsRef(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                      placeholder="e.g. VAT/2026/05/001" />
                  </div>
                  <button onClick={filePeriod} disabled={filing}
                    className="w-full bg-green-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    {filing ? 'Filing…' : 'Mark as Filed'}
                  </button>
                  <p className="text-xs text-slate-400">FIRS VAT returns are due by the 21st of the following month.</p>
                </div>
              )}
            </div>

            {/* FIRS class guide */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 mb-4">FIRS Classification Guide</h2>
              <div className="space-y-3">
                {[
                  { code: 'V', badge: 'bg-blue-100 text-blue-700',   title: 'Vatable',     desc: 'Standard rate — 7.5%' },
                  { code: 'Z', badge: 'bg-green-100 text-green-700', title: 'Zero-rated',  desc: 'Exports, basic foods' },
                  { code: 'E', badge: 'bg-amber-100 text-amber-700', title: 'Exempt',      desc: 'Medical, education' },
                  { code: 'N', badge: 'bg-slate-100 text-slate-600', title: 'Non-vatable', desc: 'Outside VAT scope' },
                ].map(item => (
                  <div key={item.code} className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${item.badge}`}>{item.code}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filing history */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Filing History</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading…</div>
          ) : periods.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No periods saved yet. Complete the workflow above to create your first VAT period.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Period', 'Output VAT', 'Input VAT', 'Net Liability', 'Status', 'FIRS Ref', 'Filed Date'].map(h => (
                    <th key={h} className={thCls}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {periods.map(p => (
                  <tr key={p.id}
                    onClick={() => setSelected(p.period)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className={`${tdCls} text-sm font-semibold text-slate-900`}>{periodLabel(p.period)}</td>
                    <td className={`${tdCls} text-sm text-slate-700`}>{fmt(p.output_vat)}</td>
                    <td className={`${tdCls} text-sm text-slate-700`}>{fmt(p.input_vat)}</td>
                    <td className={`${tdCls} text-sm font-semibold ${p.liability > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {fmt(p.liability)}
                    </td>
                    <td className={tdCls}>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.status === 'filed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {p.status === 'filed' ? 'Filed' : 'Pending'}
                      </span>
                    </td>
                    <td className={`${tdCls} text-sm font-mono text-slate-600`}>{p.firs_ref ?? '—'}</td>
                    <td className={`${tdCls} text-sm text-slate-500`}>
                      {p.filed_at
                        ? new Date(p.filed_at).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </main>
    </div>
  )
}
