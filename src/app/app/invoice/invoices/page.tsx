'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

type Invoice = {
  id: string
  invoice_number: string
  issue_date: string
  due_date: string
  status: string
  total: number
  amount_paid: number
  balance: number
  customers: { name: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  partial: 'bg-yellow-100 text-yellow-700',
  outstanding: 'bg-red-100 text-red-700',
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const supabase = createClient()

  async function loadInvoices() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('invoices')
      .select('*, customers(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setInvoices(data || [])
    setLoading(false)
  }

  useEffect(() => { loadInvoices() }, [])

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter)

  const formatCurrency = (n: number) => `₦${n.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-500 text-sm mt-1">{invoices.length} total invoices</p>
          </div>
          <Link href="/app/invoice/invoices/new" className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'outstanding', 'partial', 'paid'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}
            >
              {f === 'all' ? 'All Invoices' : f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading invoices...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">No invoices found.</p>
              <Link href="/app/invoice/invoices/new" className="inline-block mt-3 text-teal-600 text-sm font-medium hover:text-teal-700">Create your first invoice</Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Total', 'Paid', 'Balance', 'Status', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-teal-600">{inv.invoice_number}</td>
                    <td className="px-5 py-4 text-sm text-slate-900">{inv.customers?.name || 'No customer'}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{new Date(inv.due_date).toLocaleDateString('en-NG')}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">{formatCurrency(inv.total)}</td>
                    <td className="px-5 py-4 text-sm text-green-600">{formatCurrency(inv.amount_paid)}</td>
                    <td className="px-5 py-4 text-sm text-red-600">{formatCurrency(inv.balance)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[inv.status] || 'bg-slate-100 text-slate-600'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/app/invoice/invoices/${inv.id}`} className="text-xs text-slate-500 hover:text-teal-600 font-medium transition-colors">View</Link>
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
