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

type Supplier = {
  id: string
  name: string
  email: string
  phone: string
}

type ARCustomer = {
  name: string
  totalOwed: number
  invoiceCount: number
  oldestDue: string
}

type SupplierPayment = {
  id: string
  supplier_id: string
  amount: number
  payment_date: string
  payment_method: string
  reference: string
  notes: string
}

type SupplierInvoice = {
  id: string
  invoice_number: string
  invoice_date: string
  vat_amount: number
  total: number
  suppliers: { name: string } | { name: string }[] | null
}

export default function ReportsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [supplierPayments, setSupplierPayments] = useState<SupplierPayment[]>([])
  const [supplierInvoices, setSupplierInvoices] = useState<SupplierInvoice[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0])
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'summary' | 'vat' | 'vat_liability' | 'receivable' | 'payable'>('summary')
  const supabase = createClient()

  async function load() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    let query = supabase
      .from('invoices')
      .select('*, customers(name)')
      .eq('user_id', user.id)
      .gte('issue_date', startDate)
      .lte('issue_date', endDate)
      .order('issue_date', { ascending: false })
    if (statusFilter !== 'all') query = query.eq('status', statusFilter)
    const { data: invData } = await query
    setInvoices(invData || [])

    const { data: supData } = await supabase
      .from('suppliers')
      .select('id, name, email, phone')
      .eq('user_id', user.id)
      .order('name')
    setSuppliers(supData || [])

    const { data: spData } = await supabase
      .from('supplier_payments')
      .select('*')
      .eq('user_id', user.id)
      .order('payment_date', { ascending: false })
    setSupplierPayments(spData || [])

    const { data: siData } = await supabase
      .from('supplier_invoices')
      .select('id, invoice_number, invoice_date, vat_amount, total, suppliers(name)')
      .eq('user_id', user.id)
      .gte('invoice_date', startDate)
      .lte('invoice_date', endDate)
      .order('invoice_date', { ascending: false })
    setSupplierInvoices(siData || [])

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

  // VAT liability
  const outputVAT = invoices.reduce((s, i) => s + i.vat_amount, 0)
  const inputVAT = supplierInvoices.reduce((s, i) => s + i.vat_amount, 0)
  const netVATLiability = outputVAT - inputVAT

  // Accounts receivable
  const allOutstanding = invoices.filter(i => i.status === 'outstanding' || i.status === 'partial')
  const arByCustomer = allOutstanding.reduce<Record<string, ARCustomer>>((acc, inv) => {
    const name = inv.customers?.name || 'Unknown'
    if (!acc[name]) acc[name] = { name, totalOwed: 0, invoiceCount: 0, oldestDue: inv.due_date }
    acc[name].totalOwed += inv.balance
    acc[name].invoiceCount += 1
    if (inv.due_date < acc[name].oldestDue) acc[name].oldestDue = inv.due_date
    return acc
  }, {})
  const arList = Object.values(arByCustomer).sort((a, b) => b.totalOwed - a.totalOwed)
  const totalAR = arList.reduce((s, c) => s + c.totalOwed, 0)

  function exportCSV() {
    const headers = ['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Status', 'Subtotal', 'VAT', 'Total', 'Paid', 'Balance']
    const rows = invoices.map(i => [i.invoice_number, i.customers?.name || '', i.issue_date, i.due_date, i.status, i.subtotal, i.vat_amount, i.total, i.amount_paid, i.balance])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `report-${startDate}-to-${endDate}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  function exportVATCSV() {
    const headers = ['Invoice #', 'Customer', 'Issue Date', 'VAT Amount', 'Total']
    const rows = invoices.filter(i => i.vat_amount > 0).map(i => [i.invoice_number, i.customers?.name || '', i.issue_date, i.vat_amount.toFixed(2), i.total.toFixed(2)])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `vat-report-${startDate}-to-${endDate}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  function exportVATLiabilityCSV() {
    const headers = ['Description', 'Amount']
    const rows = [
      ['Output VAT (Sales)', outputVAT.toFixed(2)],
      ['Input VAT (Purchases)', inputVAT.toFixed(2)],
      ['Net VAT Liability', netVATLiability.toFixed(2)],
    ]
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `vat-liability-${startDate}-to-${endDate}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  function exportARCSV() {
    const headers = ['Customer', 'Invoices Outstanding', 'Amount Owed', 'Oldest Due Date']
    const rows = arList.map(c => [c.name, c.invoiceCount, c.totalOwed.toFixed(2), c.oldestDue])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `accounts-receivable-${startDate}-to-${endDate}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const STATUS_COLORS: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    partial: 'bg-yellow-100 text-yellow-700',
    outstanding: 'bg-red-100 text-red-700',
  }

  const today = new Date().toISOString().split('T')[0]

  const tabs = [
    { key: 'summary', label: 'Invoice Summary' },
    { key: 'vat', label: 'Output VAT' },
    { key: 'vat_liability', label: 'VAT Liability' },
    { key: 'receivable', label: 'Accounts Receivable' },
    { key: 'payable', label: 'Accounts Payable' },
  ] as const

  const showDateFilter = activeTab === 'summary' || activeTab === 'vat' || activeTab === 'receivable' || activeTab === 'vat_liability'

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
            { href: '/app/suppliers', label: 'Suppliers', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
            { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', active: true },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${(item as any).active ? 'bg-teal-600/10 text-teal-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800 mt-2 space-y-1">
            {[
              { href: '/app/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
              { href: '/app/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { href: '/app/subscription', label: 'Subscription', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-500 text-sm mt-1">Financial overview and tax reports</p>
          </div>
          <div className="flex gap-3">
            {activeTab === 'summary' && (
              <button onClick={exportCSV} className="border border-slate-200 text-slate-600 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Export CSV
              </button>
            )}
            {activeTab === 'vat' && (
              <button onClick={exportVATCSV} className="border border-teal-200 bg-teal-50 text-teal-700 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-teal-100 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>
                Export Output VAT CSV
              </button>
            )}
            {activeTab === 'vat_liability' && (
              <button onClick={exportVATLiabilityCSV} className="border border-orange-200 bg-orange-50 text-orange-700 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-orange-100 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Export VAT Return CSV
              </button>
            )}
            {activeTab === 'receivable' && (
              <button onClick={exportARCSV} className="border border-slate-200 text-slate-600 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Date Filters */}
        {showDateFilter && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">From</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">To</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-500" />
            </div>
            {activeTab === 'summary' && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-500">
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="outstanding">Outstanding</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Summary cards */}
        {(activeTab === 'summary' || activeTab === 'vat') && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Invoiced', value: fmt(totalInvoiced), color: 'text-slate-900' },
                { label: 'Total Collected', value: fmt(totalCollected), color: 'text-green-600' },
                { label: 'Outstanding', value: fmt(totalOutstanding), color: 'text-red-600' },
                { label: 'Output VAT', value: fmt(totalVAT), color: 'text-teal-600' },
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
          </>
        )}

        {/* VAT Liability summary cards */}
        {activeTab === 'vat_liability' && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Output VAT (Sales)', value: fmt(outputVAT), color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' },
              { label: 'Input VAT (Purchases)', value: fmt(inputVAT), color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
              {
                label: netVATLiability >= 0 ? 'Net VAT Payable to NRS' : 'VAT Credit (Refundable)',
                value: fmt(Math.abs(netVATLiability)),
                color: netVATLiability >= 0 ? 'text-orange-600' : 'text-green-600',
                bg: netVATLiability >= 0 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'
              },
            ].map(card => (
              <div key={card.label} className={`border rounded-xl p-5 ${card.bg}`}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{card.label}</p>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* AR summary cards */}
        {activeTab === 'receivable' && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Owed to You', value: fmt(totalAR), color: 'text-red-600' },
              { label: 'Customers with Balance', value: String(arList.length), color: 'text-slate-900' },
              { label: 'Overdue Invoices', value: String(allOutstanding.filter(i => i.due_date < today).length), color: 'text-orange-600' },
            ].map(card => (
              <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{card.label}</p>
                <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tables */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading...</div>
          ) : activeTab === 'summary' ? (
            invoices.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">No invoices found for this period.</div>
            ) : (
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
                      <td className="px-5 py-3 text-sm font-semibold text-teal-600"><Link href={`/app/invoices/${inv.id}`}>{inv.invoice_number}</Link></td>
                      <td className="px-5 py-3 text-sm text-slate-900">{inv.customers?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-900">{fmt(inv.total)}</td>
                      <td className="px-5 py-3 text-sm text-green-600">{fmt(inv.amount_paid)}</td>
                      <td className="px-5 py-3 text-sm text-red-600">{fmt(inv.balance)}</td>
                      <td className="px-5 py-3"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[inv.status]}`}>{inv.status}</span></td>
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
            )
          ) : activeTab === 'vat' ? (
            invoices.filter(i => i.vat_amount > 0).length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">No VATable sales invoices for this period.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['Invoice #', 'Customer', 'Issue Date', 'Output VAT', 'Invoice Total'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.filter(i => i.vat_amount > 0).map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-sm font-semibold text-teal-600"><Link href={`/app/invoices/${inv.id}`}>{inv.invoice_number}</Link></td>
                      <td className="px-5 py-3 text-sm text-slate-900">{inv.customers?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-teal-600">{fmt(inv.vat_amount)}</td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-900">{fmt(inv.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                    <td colSpan={3} className="px-5 py-3 text-sm font-bold text-slate-900">Total Output VAT</td>
                    <td className="px-5 py-3 text-sm font-bold text-teal-600">{fmt(outputVAT)}</td>
                    <td className="px-5 py-3 text-sm font-bold text-slate-900">{fmt(totalInvoiced)}</td>
                  </tr>
                </tfoot>
              </table>
            )
          ) : activeTab === 'vat_liability' ? (
            <div>
              <div className="px-6 py-4 bg-orange-50 border-b border-orange-100">
                <p className="text-xs text-orange-700 font-medium">This report shows your VAT position for the selected period. Output VAT is collected from customers. Input VAT is paid to suppliers. The difference is what you owe to NRS or can claim as a refund.</p>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Output VAT (from Sales)</h3>
                {invoices.filter(i => i.vat_amount > 0).length === 0 ? (
                  <p className="text-slate-400 text-sm mb-6">No VATable sales invoices for this period.</p>
                ) : (
                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {['Invoice #', 'Customer', 'Date', 'Output VAT'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-2">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {invoices.filter(i => i.vat_amount > 0).map(inv => (
                        <tr key={inv.id}>
                          <td className="py-2 text-sm text-teal-600 font-medium">{inv.invoice_number}</td>
                          <td className="py-2 text-sm text-slate-700">{inv.customers?.name}</td>
                          <td className="py-2 text-sm text-slate-500">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                          <td className="py-2 text-sm font-semibold text-teal-600">{fmt(inv.vat_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-slate-200">
                        <td colSpan={3} className="pt-2 text-sm font-bold text-slate-900">Total Output VAT</td>
                        <td className="pt-2 text-sm font-bold text-teal-600">{fmt(outputVAT)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}

                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Input VAT (from Purchases)</h3>
                {supplierInvoices.filter(i => i.vat_amount > 0).length === 0 ? (
                  <p className="text-slate-400 text-sm mb-6">No VATable purchase invoices for this period.</p>
                ) : (
                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {['Invoice #', 'Supplier', 'Date', 'Input VAT'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-2">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {supplierInvoices.filter(i => i.vat_amount > 0).map(inv => (
                        <tr key={inv.id}>
                          <td className="py-2 text-sm text-purple-600 font-medium">{inv.invoice_number}</td>
                          <td className="py-2 text-sm text-slate-700">
  {Array.isArray(inv.suppliers) ? inv.suppliers[0]?.name : inv.suppliers?.name}
</td>
                          <td className="py-2 text-sm text-slate-500">{new Date(inv.invoice_date).toLocaleDateString('en-NG')}</td>
                          <td className="py-2 text-sm font-semibold text-blue-600">{fmt(inv.vat_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-slate-200">
                        <td colSpan={3} className="pt-2 text-sm font-bold text-slate-900">Total Input VAT</td>
                        <td className="pt-2 text-sm font-bold text-blue-600">{fmt(inputVAT)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}

                <div className={`rounded-xl p-5 border ${netVATLiability >= 0 ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">VAT Return Summary</p>
                    <span className="text-xs text-slate-500">{startDate} to {endDate}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Output VAT (collected from customers)</span><span className="font-semibold text-teal-600">{fmt(outputVAT)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Input VAT (paid to suppliers)</span><span className="font-semibold text-blue-600">-{fmt(inputVAT)}</span></div>
                    <div className={`flex justify-between font-bold text-base border-t pt-2 mt-2 ${netVATLiability >= 0 ? 'border-orange-200' : 'border-green-200'}`}>
                      <span className="text-slate-900">{netVATLiability >= 0 ? 'Net VAT Payable to NRS' : 'VAT Credit (Refundable)'}</span>
                      <span className={netVATLiability >= 0 ? 'text-orange-600' : 'text-green-600'}>{fmt(Math.abs(netVATLiability))}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'receivable' ? (
            arList.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">No outstanding balances for this period.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['Customer', 'Invoices Outstanding', 'Oldest Due Date', 'Overdue', 'Amount Owed'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {arList.map(c => {
                    const isOverdue = c.oldestDue < today
                    return (
                      <tr key={c.name} className="hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">{c.name.charAt(0).toUpperCase()}</div>
                            <span className="text-sm font-medium text-slate-900">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-600">{c.invoiceCount} invoice{c.invoiceCount > 1 ? 's' : ''}</td>
                        <td className="px-5 py-3 text-sm text-slate-600">{new Date(c.oldestDue).toLocaleDateString('en-NG')}</td>
                        <td className="px-5 py-3">
                          {isOverdue ? <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Overdue</span> : <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Current</span>}
                        </td>
                        <td className="px-5 py-3 text-sm font-bold text-red-600">{fmt(c.totalOwed)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                    <td colSpan={4} className="px-5 py-3 text-sm font-bold text-slate-900">Total Accounts Receivable</td>
                    <td className="px-5 py-3 text-sm font-bold text-red-600">{fmt(totalAR)}</td>
                  </tr>
                </tfoot>
              </table>
            )
          ) : (
            suppliers.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-500 text-sm mb-2">No suppliers added yet.</p>
                <Link href="/app/suppliers" className="text-teal-600 text-sm font-medium hover:underline">Add your first supplier</Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {['Supplier', 'Email', 'Phone', 'Payments Made', 'Total Paid', ''].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {suppliers.map(s => {
                    const sPayments = supplierPayments.filter(p => p.supplier_id === s.id)
                    const totalPaid = sPayments.reduce((sum, p) => sum + p.amount, 0)
                    return (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">{s.name.charAt(0).toUpperCase()}</div>
                            <span className="text-sm font-medium text-slate-900">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-600">{s.email || '-'}</td>
                        <td className="px-5 py-3 text-sm text-slate-600">{s.phone || '-'}</td>
                        <td className="px-5 py-3 text-sm text-slate-600">{sPayments.length} payment{sPayments.length !== 1 ? 's' : ''}</td>
                        <td className="px-5 py-3 text-sm font-bold text-slate-900">{fmt(totalPaid)}</td>
                        <td className="px-5 py-3"><Link href="/app/suppliers" className="text-xs text-teal-600 hover:text-teal-700 font-medium">Record Payment</Link></td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                    <td colSpan={4} className="px-5 py-3 text-sm font-bold text-slate-900">Total Accounts Payable</td>
                    <td className="px-5 py-3 text-sm font-bold text-slate-900">{fmt(supplierPayments.reduce((sum, p) => sum + p.amount, 0))}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            )
          )}
        </div>
      </main>
    </div>
  )
}
