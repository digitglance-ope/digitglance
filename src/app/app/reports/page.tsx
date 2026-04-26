'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Invoice = {
  id: string
  invoice_number: string
  issue_date: string
  due_date: string
  status: string
  subtotal: number
  vat_amount: number
  total: number
  amount_paid: number
  balance: number
  customers: { name: string } | null
}

export default function ReportsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0])
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'summary' | 'vat'>('summary')
  const supabase = createClient()

  async function load() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    let query = supabase.from('invoices').select('*, customers(name)').eq('user_id', user.id).gte('issue_date', startDate).lte('issue_date', endDate).order('issue_date', { ascending: false })
    if (statusFilter !== 'all') query = query.eq('status', statusFilter)
    const { data } = await query
    setInvoices(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [startDate, endDate, statusFilter])

  const fmt = (n: number) => `₦${Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  const totalInvoiced = invoices.reduce((s, i) => s + i.total, 0)
  const totalCollected = invoices.reduce((s, i) => s + i.amount_paid, 0)
  const totalOutstanding = invoices.reduce((s, i) => s + i.balance, 0)
  const totalVAT = invoices.reduce((s, i) => s + i.vat_amount, 0)
  const paidInvoices = invoices.filter(i => i.status === 'paid')
  const outstandingInvoices = invoices.filter(i => i.status === 'outstanding')
  const partialInvoices = invoices.filter(i => i.status === 'partial')

  function exportCSV() {
    const headers = ['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Status', 'Subtotal', 'VAT', 'Total', 'Paid', 'Balance']
    const rows = invoices.map(i => [
      i.invoice_number,
      i.customers?.name || '',
      i.issue_date,
      i.due_date,
      i.status,
      i.subtotal,
      i.vat_amount,
      i.total,
      i.amount_paid,
      i.balance,
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${startDate}-to-${endDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportVATCSV() {
    const headers = ['Invoice #', 'Customer', 'Issue Date', 'Taxable Amount', 'VAT (7.5%)', 'Total']
    const rows = invoices.filter(i => i.vat_amount > 0).map(i => [
      i.invoice_number,
      i.customers?.name || '',
      i.issue_date,
      (i.subtotal - (i.total - i.subtotal - i.vat_amount)).toFixed(2),
      i.vat_amount.toFixed(2),
      i.total.toFixed(2),
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vat-report-${startDate}-to-${endDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const STATUS_COLORS: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    partial: 'bg-yellow-100 text-yellow-700',
    outstanding: 'bg-red-100 text-red-700',
  }

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
            { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', active: true },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${(item as any).active ? 'bg-teal-600/10 text-teal-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-500 text-sm mt-1">Financial overview and VAT reports</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="border border-slate-200 text-slate-600 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export CSV
            </button>
            <button onClick={exportVATCSV} className="border border-teal-200 bg-teal-50 text-teal-700 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-teal-100 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>
              VAT Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">From</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">To</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-500">
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="outstanding">Outstanding</option>
            </select>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Invoiced', value: fmt(totalInvoiced), color: 'text-slate-900', bg: 'bg-slate-50' },
            { label: 'Total Collected', value: fmt(totalCollected), color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Outstanding', value: fmt(totalOutstanding), color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Total VAT', value: fmt(totalVAT), color: 'text-teal-600', bg: 'bg-teal-50' },
          ].map(card => (
            <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{card.label}</p>
              <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Paid', count: paidInvoices.length, color: 'text-green-600' },
            { label: 'Partial', count: partialInvoices.length, color: 'text-yellow-600' },
            { label: 'Outstanding', count: outstandingInvoices.length, color: 'text-red-600' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{s.label} Invoices</span>
              <span className={`text-2xl font-bold ${s.color}`}>{s.count}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {(['summary', 'vat'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}>
              {tab === 'vat' ? 'VAT Report' : 'Invoice Summary'}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading...</div>
          ) : invoices.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">No invoices found for this period.</div>
          ) : activeTab === 'summary' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Invoice #', 'Customer', 'Date', 'Total', 'Paid', 'Balance', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-sm font-semibold text-teal-600">
                      <Link href={`/app/invoices/${inv.id}`}>{inv.invoice_number}</Link>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-900">{inv.customers?.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">{fmt(inv.total)}</td>
                    <td className="px-5 py-3 text-sm text-green-600">{fmt(inv.amount_paid)}</td>
                    <td className="px-5 py-3 text-sm text-red-600">{fmt(inv.balance)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[inv.status]}`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td colSpan={3} className="px-5 py-3 text-sm font-bold text-slate-900">Totals</td>
                  <td className="px-5 py-3 text-sm font-bold text-slate-900">{fmt(totalInvoiced)}</td>
                  <td className="px-5 py-3 text-sm font-bold text-green-600">{fmt(totalCollected)}</td>
                  <td className="px-5 py-3 text-sm font-bold text-red-600">{fmt(totalOutstanding)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Invoice #', 'Customer', 'Issue Date', 'VAT Amount', 'Total'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.filter(i => i.vat_amount > 0).map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-sm font-semibold text-teal-600">
                      <Link href={`/app/invoices/${inv.id}`}>{inv.invoice_number}</Link>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-900">{inv.customers?.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-teal-600">{fmt(inv.vat_amount)}</td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">{fmt(inv.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td colSpan={3} className="px-5 py-3 text-sm font-bold text-slate-900">Total VAT for Period</td>
                  <td className="px-5 py-3 text-sm font-bold text-teal-600">{fmt(totalVAT)}</td>
                  <td className="px-5 py-3 text-sm font-bold text-slate-900">{fmt(totalInvoiced)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
