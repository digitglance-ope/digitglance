'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

type Sale = {
  id: string
  reference: string
  created_at: string
  total: number
  vat_amount: number
  discount_amount: number
  payment_method: string
  pos_branches: { name: string } | null
  pos_terminals: { name: string } | null
  pos_shifts: { cashier_name: string | null } | null
}

type SaleDetail = {
  sale: Sale
  items: { product_name: string; quantity: number; unit_price: number; line_total: number; vat_amount: number; discount_amount: number }[]
  payments: { method: string; amount: number }[]
}

function fmt(n: number) {
  return '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })
}

export default function ReceiptsPage() {
  const [sales, setSales]               = useState<Sale[]>([])
  const [loading, setLoading]           = useState(true)
  const [selectedSale, setSelectedSale] = useState<SaleDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [search, setSearch]             = useState('')
  const supabase = createClient()

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: profile } = await supabase.from('profiles')
      .select('is_team_member, account_owner_id').eq('id', user.id).single()
    const owner = (profile?.is_team_member && profile.account_owner_id)
      ? profile.account_owner_id : user.id

    const { data } = await supabase
      .from('pos_sales')
      .select('id, reference, created_at, total, vat_amount, discount_amount, payment_method, pos_branches(name), pos_terminals(name), pos_shifts(cashier_name)')
      .eq('account_owner_id', owner)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(500)
    setSales((data as unknown as Sale[]) || [])
    setLoading(false)
  }

  async function openDetail(sale: Sale) {
    setSelectedSale(null)
    setDetailLoading(true)
    const [{ data: items }, { data: payments }] = await Promise.all([
      supabase.from('pos_sale_items')
        .select('quantity, unit_price, line_total, vat_amount, discount_amount, pos_products(name)')
        .eq('sale_id', sale.id),
      supabase.from('pos_payments')
        .select('method, amount')
        .eq('sale_id', sale.id),
    ])
    setSelectedSale({
      sale,
      items: (items || []).map((i: any) => ({
        product_name: i.pos_products?.name || 'Unknown',
        quantity: i.quantity,
        unit_price: i.unit_price,
        line_total: i.line_total,
        vat_amount: i.vat_amount,
        discount_amount: i.discount_amount,
      })),
      payments: (payments || []) as { method: string; amount: number }[],
    })
    setDetailLoading(false)
  }

  const filtered = sales.filter(s =>
    s.reference.toLowerCase().includes(search.toLowerCase()) ||
    (s.pos_branches?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.pos_shifts?.cashier_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />

      <main className="md:ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Receipt History</h1>
            <p className="text-slate-500 text-sm mt-1">{sales.length} completed sales</p>
          </div>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by reference, branch, or cashier..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading receipt history...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              {search ? 'No receipts match your search.' : 'No completed sales yet.'}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Reference', 'Date & Time', 'Branch', 'Cashier', 'Total', 'Payment', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(sale => (
                  <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-blue-600">{sale.reference}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{new Date(sale.created_at).toLocaleString('en-NG')}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{sale.pos_branches?.name || '—'}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{sale.pos_shifts?.cashier_name || '—'}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">{fmt(sale.total)}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize bg-slate-100 text-slate-700">
                        {sale.payment_method}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => openDetail(sale)} className="text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Receipt detail modal */}
      {(detailLoading || selectedSale) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setSelectedSale(null) }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm max-h-[90vh] flex flex-col">
            {detailLoading || !selectedSale ? (
              <div className="p-8 text-center text-slate-400 text-sm">Loading receipt…</div>
            ) : (
              <>
                <div className="p-5 border-b border-slate-100 text-center shrink-0">
                  <p className="text-base font-bold text-slate-900">{selectedSale.sale.reference}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedSale.sale.pos_branches?.name} · {new Date(selectedSale.sale.created_at).toLocaleString('en-NG')}
                  </p>
                  {selectedSale.sale.pos_shifts?.cashier_name && (
                    <p className="text-xs text-slate-400">Cashier: {selectedSale.sale.pos_shifts.cashier_name}</p>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1 mb-3">
                    {selectedSale.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-slate-600">{item.product_name} × {item.quantity}</span>
                        <span className="font-medium text-slate-800">{fmt(item.line_total)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-2 mb-3 space-y-1">
                    {selectedSale.sale.discount_amount > 0 && (
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Discount</span><span>−{fmt(selectedSale.sale.discount_amount)}</span>
                      </div>
                    )}
                    {selectedSale.sale.vat_amount > 0 && (
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>VAT</span><span>{fmt(selectedSale.sale.vat_amount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-slate-900">
                      <span>Total</span><span>{fmt(selectedSale.sale.total)}</span>
                    </div>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-2 space-y-1">
                    {selectedSale.payments.map((p, i) => (
                      <div key={i} className="flex justify-between text-xs text-slate-500">
                        <span className="capitalize">{p.method}</span><span>{fmt(p.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 flex gap-2 shrink-0">
                  <button onClick={() => setSelectedSale(null)}
                    className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    Close
                  </button>
                  <button onClick={() => window.print()}
                    className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                    Print Receipt
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
