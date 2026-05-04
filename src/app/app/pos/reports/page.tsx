'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawSale     { id: string; created_at: string; branch_id: string; subtotal: number; vat_amount: number; discount_amount: number; total: number; payment_method: string }
interface RawItem     { sale_id: string; product_id: string; quantity: number; line_total: number; vat_amount: number; vat_class: string; discount_amount: number }
interface RawProduct  { id: string; name: string; sku: string | null; category_id: string | null; cost_price: number; selling_price: number; unit: string }
interface RawCategory { id: string; name: string }
interface RawBranch   { id: string; name: string }
interface RawStock    { product_id: string; branch_id: string; quantity: number }
interface RawMovement { id: string; created_at: string; product_id: string; branch_id: string; movement_type: string; quantity: number; notes: string | null }

type TabId = 'summary' | 'products' | 'categories' | 'vat' | 'valuation' | 'movements'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) { return '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function todayStr() { return new Date().toISOString().split('T')[0] }
function monthStartStr() { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0] }
function lastMonthStartStr() { const d = new Date(); return new Date(d.getFullYear(), d.getMonth() - 1, 1).toISOString().split('T')[0] }
function lastMonthEndStr() { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).toISOString().split('T')[0] }

function downloadCSV(rows: Record<string, unknown>[], filename: string) {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function CsvBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export CSV
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PosReportsPage() {
  const supabase = createClient()

  const [ownerId,      setOwnerId]      = useState<string | null>(null)
  const [dateFrom,     setDateFrom]     = useState(monthStartStr())
  const [dateTo,       setDateTo]       = useState(todayStr())
  const [branchFilter, setBranchFilter] = useState('all')
  const [tab,          setTab]          = useState<TabId>('summary')
  const [loading,      setLoading]      = useState(true)

  // Master data (loaded once)
  const [branches,   setBranches]   = useState<RawBranch[]>([])
  const [products,   setProducts]   = useState<RawProduct[]>([])
  const [categories, setCategories] = useState<RawCategory[]>([])

  // Report data (re-loaded on Apply)
  const [sales,     setSales]     = useState<RawSale[]>([])
  const [items,     setItems]     = useState<RawItem[]>([])
  const [stock,     setStock]     = useState<RawStock[]>([])
  const [movements, setMovements] = useState<RawMovement[]>([])

  // ─── Initial load — owner + master data
  const loadMaster = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: profile } = await supabase.from('profiles')
      .select('is_team_member, account_owner_id').eq('id', user.id).single()
    const owner = (profile?.is_team_member && profile.account_owner_id) ? profile.account_owner_id : user.id
    setOwnerId(owner)

    const [{ data: b }, { data: p }, { data: cats }] = await Promise.all([
      supabase.from('pos_branches').select('id, name').eq('account_owner_id', owner),
      supabase.from('pos_products').select('id, name, sku, category_id, cost_price, selling_price, unit').eq('account_owner_id', owner),
      supabase.from('pos_categories').select('id, name').eq('account_owner_id', owner),
    ])
    setBranches(b ?? [])
    setProducts(p ?? [])
    setCategories(cats ?? [])
    return owner
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Fetch report data for current filters
  async function fetchReport(owner: string, from: string, to: string, branch: string) {
    setLoading(true)
    try {
      const fromISO = from + 'T00:00:00.000Z'
      const toISO   = to   + 'T23:59:59.999Z'

      let salesQ = supabase.from('pos_sales')
        .select('id, created_at, branch_id, subtotal, vat_amount, discount_amount, total, payment_method')
        .eq('account_owner_id', owner).eq('status', 'completed')
        .gte('created_at', fromISO).lte('created_at', toISO)
      if (branch !== 'all') salesQ = salesQ.eq('branch_id', branch)
      const { data: salesData } = await salesQ
      setSales(salesData ?? [])

      const saleIds = salesData?.map(s => s.id) ?? []
      if (saleIds.length > 0) {
        const { data: itemsData } = await supabase.from('pos_sale_items')
          .select('sale_id, product_id, quantity, line_total, vat_amount, vat_class, discount_amount')
          .in('sale_id', saleIds)
        setItems(itemsData ?? [])
      } else {
        setItems([])
      }

      let stockQ = supabase.from('pos_stock').select('product_id, branch_id, quantity').eq('account_owner_id', owner)
      if (branch !== 'all') stockQ = stockQ.eq('branch_id', branch)
      const { data: stockData } = await stockQ
      setStock(stockData ?? [])

      let moveQ = supabase.from('pos_stock_movements')
        .select('id, created_at, product_id, branch_id, movement_type, quantity, notes')
        .eq('account_owner_id', owner)
        .gte('created_at', fromISO).lte('created_at', toISO)
        .order('created_at', { ascending: false })
      if (branch !== 'all') moveQ = moveQ.eq('branch_id', branch)
      const { data: moveData } = await moveQ
      setMovements(moveData ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMaster().then(owner => {
      if (owner) fetchReport(owner, monthStartStr(), todayStr(), 'all')
    })
  }, [loadMaster])

  function applyFilters() {
    if (ownerId) fetchReport(ownerId, dateFrom, dateTo, branchFilter)
  }

  // ─── Lookup maps
  const productMap  = Object.fromEntries(products.map(p  => [p.id,  p]))
  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))
  const branchMap   = Object.fromEntries(branches.map(b  => [b.id,  b]))
  const saleMap     = Object.fromEntries(sales.map(s     => [s.id,  s]))

  // ─── Summary: group by date
  const summaryByDate: Record<string, { date: string; transactions: number; subtotal: number; discount: number; vat: number; total: number }> = {}
  for (const s of sales) {
    const d = s.created_at.split('T')[0]
    if (!summaryByDate[d]) summaryByDate[d] = { date: d, transactions: 0, subtotal: 0, discount: 0, vat: 0, total: 0 }
    summaryByDate[d].transactions++
    summaryByDate[d].subtotal  += s.subtotal
    summaryByDate[d].discount  += s.discount_amount
    summaryByDate[d].vat       += s.vat_amount
    summaryByDate[d].total     += s.total
  }
  const summaryRows = Object.values(summaryByDate).sort((a, b) => a.date.localeCompare(b.date))
  const totalRevenue = sales.reduce((s, r) => s + r.total, 0)
  const totalVatOut  = sales.reduce((s, r) => s + r.vat_amount, 0)
  const totalDisc    = sales.reduce((s, r) => s + r.discount_amount, 0)
  const totalTxn     = sales.length
  const avgTicket    = totalTxn > 0 ? totalRevenue / totalTxn : 0
  const payBreakdown: Record<string, number> = {}
  for (const s of sales) payBreakdown[s.payment_method] = (payBreakdown[s.payment_method] ?? 0) + s.total

  // ─── Products: group by product_id
  const productSalesMap: Record<string, { product: RawProduct | undefined; qty: number; revenue: number; vat: number }> = {}
  for (const item of items) {
    if (!productSalesMap[item.product_id]) productSalesMap[item.product_id] = { product: productMap[item.product_id], qty: 0, revenue: 0, vat: 0 }
    productSalesMap[item.product_id].qty     += item.quantity
    productSalesMap[item.product_id].revenue += item.line_total
    productSalesMap[item.product_id].vat     += item.vat_amount
  }
  const productRows = Object.values(productSalesMap).sort((a, b) => b.revenue - a.revenue)

  // ─── Categories: group by category
  const catSalesMap: Record<string, { name: string; qty: number; revenue: number; vat: number }> = {}
  for (const item of items) {
    const catId = productMap[item.product_id]?.category_id ?? '__none__'
    const name  = catId === '__none__' ? 'Uncategorised' : (categoryMap[catId]?.name ?? 'Unknown')
    if (!catSalesMap[catId]) catSalesMap[catId] = { name, qty: 0, revenue: 0, vat: 0 }
    catSalesMap[catId].qty     += item.quantity
    catSalesMap[catId].revenue += item.line_total
    catSalesMap[catId].vat     += item.vat_amount
  }
  const categoryRows = Object.values(catSalesMap).sort((a, b) => b.revenue - a.revenue)

  // ─── VAT: group by date
  const vatByDate: Record<string, { date: string; standard_base: number; output_vat: number; zero_sales: number; exempt_sales: number }> = {}
  for (const item of items) {
    const date = saleMap[item.sale_id]?.created_at?.split('T')[0] ?? ''
    if (!date) continue
    if (!vatByDate[date]) vatByDate[date] = { date, standard_base: 0, output_vat: 0, zero_sales: 0, exempt_sales: 0 }
    if (item.vat_class === 'standard') {
      vatByDate[date].standard_base += item.line_total - item.vat_amount
      vatByDate[date].output_vat    += item.vat_amount
    } else if (item.vat_class === 'zero') {
      vatByDate[date].zero_sales += item.line_total
    } else if (item.vat_class === 'exempt') {
      vatByDate[date].exempt_sales += item.line_total
    }
  }
  const vatRows       = Object.values(vatByDate).sort((a, b) => a.date.localeCompare(b.date))
  const totalOutputVat = vatRows.reduce((s, r) => s + r.output_vat, 0)
  const totalStdBase   = vatRows.reduce((s, r) => s + r.standard_base, 0)
  const totalZero      = vatRows.reduce((s, r) => s + r.zero_sales, 0)
  const totalExempt    = vatRows.reduce((s, r) => s + r.exempt_sales, 0)

  // ─── Inventory valuation (current snapshot)
  const stockByProduct: Record<string, number> = {}
  for (const s of stock) stockByProduct[s.product_id] = (stockByProduct[s.product_id] ?? 0) + s.quantity
  const valuationRows = products
    .map(p => ({ name: p.name, sku: p.sku, unit: p.unit, qty: stockByProduct[p.id] ?? 0, cost_price: p.cost_price, selling_price: p.selling_price, stock_value: (stockByProduct[p.id] ?? 0) * p.cost_price, pot_revenue: (stockByProduct[p.id] ?? 0) * p.selling_price }))
    .filter(r => r.qty > 0)
    .sort((a, b) => b.stock_value - a.stock_value)
  const totalStockValue    = valuationRows.reduce((s, r) => s + r.stock_value, 0)
  const totalPotRevenue    = valuationRows.reduce((s, r) => s + r.pot_revenue, 0)

  const TABS: { id: TabId; label: string }[] = [
    { id: 'summary',    label: 'Sales Summary'  },
    { id: 'products',   label: 'Top Products'   },
    { id: 'categories', label: 'Categories'     },
    { id: 'vat',        label: 'VAT Report'     },
    { id: 'valuation',  label: 'Inventory'      },
    { id: 'movements',  label: 'Movements'      },
  ]

  const thCls = 'text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider'
  const tdCls = 'px-5 py-3'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />
      <main className="ml-64 flex-1 p-8">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Sales, VAT, inventory, and stock movement reports</p>
        </div>

        {/* ── Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">From</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">To</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          {branches.length > 1 && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Branch</label>
              <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="all">All Branches</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          )}
          <button onClick={applyFilters}
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Apply
          </button>
          <div className="flex gap-1.5 ml-1 flex-wrap">
            {[
              { label: 'Today',      from: todayStr(),         to: todayStr()         },
              { label: 'This Month', from: monthStartStr(),    to: todayStr()         },
              { label: 'Last Month', from: lastMonthStartStr(), to: lastMonthEndStr() },
            ].map(p => (
              <button key={p.label} onClick={() => { setDateFrom(p.from); setDateTo(p.to) }}
                className="text-xs font-medium px-2.5 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabs */}
        <div className="flex gap-0 mb-6 border-b border-slate-200 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                tab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400 text-sm">Loading…</div>
        ) : (
          <>

            {/* ── Sales Summary */}
            {tab === 'summary' && (
              <div>
                <div className="grid grid-cols-5 gap-4 mb-5">
                  {[
                    { label: 'Total Revenue',  value: fmt(totalRevenue) },
                    { label: 'Transactions',   value: String(totalTxn)  },
                    { label: 'Average Ticket', value: fmt(avgTicket)    },
                    { label: 'Output VAT',     value: fmt(totalVatOut)  },
                    { label: 'Total Discount', value: fmt(totalDisc)    },
                  ].map(k => (
                    <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-500 mb-1">{k.label}</p>
                      <p className="text-lg font-bold text-slate-900">{k.value}</p>
                    </div>
                  ))}
                </div>

                {Object.keys(payBreakdown).length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 flex items-center gap-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">By Method</p>
                    {Object.entries(payBreakdown).map(([method, amount]) => (
                      <div key={method} className="flex items-center gap-2">
                        <span className="text-xs font-medium capitalize text-slate-500">{method}</span>
                        <span className="text-sm font-bold text-slate-900">{fmt(amount)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">Daily Breakdown</h2>
                    <CsvBtn onClick={() => downloadCSV(summaryRows.map(r => ({ Date: r.date, Transactions: r.transactions, Subtotal: r.subtotal, Discount: r.discount, VAT: r.vat, Total: r.total })), `pos-sales-${dateFrom}-${dateTo}.csv`)} />
                  </div>
                  {summaryRows.length === 0
                    ? <div className="p-10 text-center text-sm text-slate-400">No sales in this period</div>
                    : (
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50"><tr>
                          {['Date', 'Transactions', 'Subtotal', 'Discount', 'VAT', 'Total'].map(h => <th key={h} className={thCls}>{h}</th>)}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">
                          {summaryRows.map(r => (
                            <tr key={r.date} className="hover:bg-slate-50">
                              <td className={`${tdCls} font-medium text-slate-900`}>{r.date}</td>
                              <td className={`${tdCls} text-slate-600`}>{r.transactions}</td>
                              <td className={`${tdCls} text-slate-600`}>{fmt(r.subtotal)}</td>
                              <td className={`${tdCls} text-red-500`}>{r.discount > 0 ? `−${fmt(r.discount)}` : '—'}</td>
                              <td className={`${tdCls} text-slate-600`}>{fmt(r.vat)}</td>
                              <td className={`${tdCls} font-semibold text-slate-900`}>{fmt(r.total)}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50 border-t-2 border-slate-200">
                            <td className={`${tdCls} font-bold text-slate-900`}>Total</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{totalTxn}</td>
                            <td className={tdCls}></td>
                            <td className={`${tdCls} font-bold text-red-500`}>{totalDisc > 0 ? `−${fmt(totalDisc)}` : '—'}</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{fmt(totalVatOut)}</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{fmt(totalRevenue)}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </div>
            )}

            {/* ── Top Products */}
            {tab === 'products' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Top Products by Revenue</h2>
                  <CsvBtn onClick={() => downloadCSV(productRows.map((r, i) => ({ Rank: i + 1, Product: r.product?.name ?? '', SKU: r.product?.sku ?? '', 'Units Sold': r.qty, Revenue: r.revenue, VAT: r.vat })), `pos-products-${dateFrom}-${dateTo}.csv`)} />
                </div>
                {productRows.length === 0
                  ? <div className="p-10 text-center text-sm text-slate-400">No sales data in this period</div>
                  : (
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr>
                        {['#', 'Product', 'SKU', 'Units Sold', 'Revenue', 'VAT', '% of Total'].map(h => <th key={h} className={thCls}>{h}</th>)}
                      </tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {productRows.map((r, i) => (
                          <tr key={r.product?.id ?? i} className="hover:bg-slate-50">
                            <td className={`${tdCls} text-slate-400 text-xs w-8`}>{i + 1}</td>
                            <td className={`${tdCls} font-medium text-slate-900`}>{r.product?.name ?? '—'}</td>
                            <td className={`${tdCls} text-slate-400`}>{r.product?.sku ?? '—'}</td>
                            <td className={`${tdCls} text-slate-600`}>{r.qty}</td>
                            <td className={`${tdCls} font-semibold text-slate-900`}>{fmt(r.revenue)}</td>
                            <td className={`${tdCls} text-slate-500`}>{fmt(r.vat)}</td>
                            <td className={`${tdCls} text-slate-500`}>{totalRevenue > 0 ? ((r.revenue / totalRevenue) * 100).toFixed(1) + '%' : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                }
              </div>
            )}

            {/* ── Categories */}
            {tab === 'categories' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Sales by Category</h2>
                  <CsvBtn onClick={() => downloadCSV(categoryRows.map(r => ({ Category: r.name, 'Units Sold': r.qty, Revenue: r.revenue, VAT: r.vat })), `pos-categories-${dateFrom}-${dateTo}.csv`)} />
                </div>
                {categoryRows.length === 0
                  ? <div className="p-10 text-center text-sm text-slate-400">No sales data in this period</div>
                  : (
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr>
                        {['Category', 'Units Sold', 'Revenue', 'VAT', '% of Revenue'].map(h => <th key={h} className={thCls}>{h}</th>)}
                      </tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {categoryRows.map(r => (
                          <tr key={r.name} className="hover:bg-slate-50">
                            <td className={`${tdCls} font-medium text-slate-900`}>{r.name}</td>
                            <td className={`${tdCls} text-slate-600`}>{r.qty}</td>
                            <td className={`${tdCls} font-semibold text-slate-900`}>{fmt(r.revenue)}</td>
                            <td className={`${tdCls} text-slate-500`}>{fmt(r.vat)}</td>
                            <td className={`${tdCls}`}>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-slate-100 rounded-full h-1.5">
                                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: totalRevenue > 0 ? `${Math.min(100, (r.revenue / totalRevenue) * 100)}%` : '0%' }} />
                                </div>
                                <span className="text-xs text-slate-500">{totalRevenue > 0 ? ((r.revenue / totalRevenue) * 100).toFixed(1) + '%' : '—'}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                }
              </div>
            )}

            {/* ── VAT Report */}
            {tab === 'vat' && (
              <div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="bg-white border border-blue-200 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Total Output VAT</p>
                    <p className="text-xl font-bold text-blue-700">{fmt(totalOutputVat)}</p>
                    <p className="text-xs text-slate-400 mt-1">Payable to FIRS</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Standard-Rated Base</p>
                    <p className="text-xl font-bold text-slate-900">{fmt(totalStdBase)}</p>
                    <p className="text-xs text-slate-400 mt-1">Sales excluding VAT</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Zero / Exempt</p>
                    <p className="text-xl font-bold text-slate-900">{fmt(totalZero + totalExempt)}</p>
                    <p className="text-xs text-slate-400 mt-1">Zero-rated: {fmt(totalZero)} · Exempt: {fmt(totalExempt)}</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">VAT Output — FIRS Format</h2>
                    <CsvBtn onClick={() => downloadCSV(vatRows.map(r => ({ Date: r.date, 'Standard Base (ex-VAT)': r.standard_base, 'Output VAT (7.5%)': r.output_vat, 'Zero-Rated': r.zero_sales, 'Exempt': r.exempt_sales })), `pos-vat-${dateFrom}-${dateTo}.csv`)} />
                  </div>
                  {vatRows.length === 0
                    ? <div className="p-10 text-center text-sm text-slate-400">No VAT transactions in this period</div>
                    : (
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50"><tr>
                          {['Date', 'Taxable Base (ex-VAT)', 'Output VAT 7.5%', 'Zero-Rated', 'Exempt'].map(h => <th key={h} className={thCls}>{h}</th>)}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">
                          {vatRows.map(r => (
                            <tr key={r.date} className="hover:bg-slate-50">
                              <td className={`${tdCls} font-medium text-slate-900`}>{r.date}</td>
                              <td className={`${tdCls} text-slate-600`}>{fmt(r.standard_base)}</td>
                              <td className={`${tdCls} font-semibold text-blue-700`}>{fmt(r.output_vat)}</td>
                              <td className={`${tdCls} text-slate-500`}>{fmt(r.zero_sales)}</td>
                              <td className={`${tdCls} text-slate-500`}>{fmt(r.exempt_sales)}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50 border-t-2 border-slate-200">
                            <td className={`${tdCls} font-bold text-slate-900`}>Total</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{fmt(totalStdBase)}</td>
                            <td className={`${tdCls} font-bold text-blue-700`}>{fmt(totalOutputVat)}</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{fmt(totalZero)}</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{fmt(totalExempt)}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </div>
            )}

            {/* ── Inventory Valuation */}
            {tab === 'valuation' && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Total Stock Value (at Cost)</p>
                    <p className="text-xl font-bold text-slate-900">{fmt(totalStockValue)}</p>
                    <p className="text-xs text-slate-400 mt-1">Cost price × current quantity</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Potential Revenue (at Selling Price)</p>
                    <p className="text-xl font-bold text-teal-700">{fmt(totalPotRevenue)}</p>
                    <p className="text-xs text-slate-400 mt-1">Selling price × current quantity</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">Current Stock Valuation</h2>
                    <CsvBtn onClick={() => downloadCSV(valuationRows.map(r => ({ Product: r.name, SKU: r.sku ?? '', Unit: r.unit, Quantity: r.qty, 'Cost Price': r.cost_price, 'Selling Price': r.selling_price, 'Stock Value (Cost)': r.stock_value, 'Potential Revenue': r.pot_revenue })), `pos-valuation-${todayStr()}.csv`)} />
                  </div>
                  {valuationRows.length === 0
                    ? <div className="p-10 text-center text-sm text-slate-400">No products with stock on hand</div>
                    : (
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50"><tr>
                          {['Product', 'SKU', 'Unit', 'Qty', 'Cost Price', 'Selling Price', 'Stock Value', 'Pot. Revenue'].map(h => <th key={h} className={thCls}>{h}</th>)}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">
                          {valuationRows.map(r => (
                            <tr key={r.name} className="hover:bg-slate-50">
                              <td className={`${tdCls} font-medium text-slate-900`}>{r.name}</td>
                              <td className={`${tdCls} text-slate-400`}>{r.sku ?? '—'}</td>
                              <td className={`${tdCls} text-slate-500`}>{r.unit}</td>
                              <td className={`${tdCls} font-semibold text-slate-900`}>{r.qty}</td>
                              <td className={`${tdCls} text-slate-600`}>{fmt(r.cost_price)}</td>
                              <td className={`${tdCls} text-slate-600`}>{fmt(r.selling_price)}</td>
                              <td className={`${tdCls} font-semibold text-slate-900`}>{fmt(r.stock_value)}</td>
                              <td className={`${tdCls} text-teal-700`}>{fmt(r.pot_revenue)}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50 border-t-2 border-slate-200">
                            <td colSpan={6} className={`${tdCls} font-bold text-slate-900`}>Total</td>
                            <td className={`${tdCls} font-bold text-slate-900`}>{fmt(totalStockValue)}</td>
                            <td className={`${tdCls} font-bold text-teal-700`}>{fmt(totalPotRevenue)}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </div>
            )}

            {/* ── Stock Movements */}
            {tab === 'movements' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Stock Movement Ledger</h2>
                  <CsvBtn onClick={() => downloadCSV(movements.map(m => ({ 'Date & Time': m.created_at, Product: productMap[m.product_id]?.name ?? m.product_id, Branch: branchMap[m.branch_id]?.name ?? m.branch_id, Type: m.movement_type, Quantity: m.quantity, Notes: m.notes ?? '' })), `pos-movements-${dateFrom}-${dateTo}.csv`)} />
                </div>
                {movements.length === 0
                  ? <div className="p-10 text-center text-sm text-slate-400">No stock movements in this period</div>
                  : (
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50"><tr>
                        {['Date & Time', 'Product', 'Branch', 'Type', 'Qty Change', 'Notes'].map(h => <th key={h} className={thCls}>{h}</th>)}
                      </tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {movements.map(m => {
                          const TYPE_BADGE: Record<string, string> = {
                            sale:       'bg-red-100 text-red-700',
                            purchase:   'bg-green-100 text-green-700',
                            adjustment: 'bg-amber-100 text-amber-700',
                            opening:    'bg-blue-100 text-blue-700',
                          }
                          return (
                            <tr key={m.id} className="hover:bg-slate-50">
                              <td className={`${tdCls} text-slate-500 text-xs whitespace-nowrap`}>{new Date(m.created_at).toLocaleString('en-NG')}</td>
                              <td className={`${tdCls} font-medium text-slate-900`}>{productMap[m.product_id]?.name ?? '—'}</td>
                              <td className={`${tdCls} text-slate-500`}>{branchMap[m.branch_id]?.name ?? '—'}</td>
                              <td className={tdCls}>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${TYPE_BADGE[m.movement_type] ?? 'bg-slate-100 text-slate-600'}`}>
                                  {m.movement_type}
                                </span>
                              </td>
                              <td className={`${tdCls} font-bold ${m.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {m.quantity > 0 ? '+' : ''}{m.quantity}
                              </td>
                              <td className={`${tdCls} text-slate-400 text-xs`}>{m.notes ?? '—'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )
                }
              </div>
            )}

          </>
        )}
      </main>
    </div>
  )
}
