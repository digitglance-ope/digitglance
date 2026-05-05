'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'
import { useRole } from '@/hooks/useRole'

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  created_at: string
}

type CustomerInvoice = {
  id: string
  invoice_number: string
  issue_date: string
  due_date: string
  status: string
  total: number
  amount_paid: number
  balance: number
}

type CustomerPayment = {
  id: string
  invoice_id: string
  amount: number
  payment_date: string
  payment_method: string
  note: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const { canCreate, canEdit, canDelete } = useRole()

  // Statement
  const [showStatement, setShowStatement] = useState(false)
  const [statementCustomer, setStatementCustomer] = useState<Customer | null>(null)
  const [statementInvoices, setStatementInvoices] = useState<CustomerInvoice[]>([])
  const [statementPayments, setStatementPayments] = useState<CustomerPayment[]>([])
  const [loadingStatement, setLoadingStatement] = useState(false)

  const supabase = createClient()
  const fmt = (n: number) => `₦${Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  async function loadCustomers() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .order('name')
    setCustomers(data || [])
    setLoading(false)
  }

  useEffect(() => { loadCustomers() }, [])

  async function openStatement(c: Customer) {
    setStatementCustomer(c)
    setShowStatement(true)
    setLoadingStatement(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: invData } = await supabase
      .from('invoices')
      .select('id, invoice_number, issue_date, due_date, status, total, amount_paid, balance')
      .eq('customer_id', c.id)
      .eq('user_id', user.id)
      .order('issue_date', { ascending: false })
    setStatementInvoices(invData || [])

    const invoiceIds = (invData || []).map(i => i.id)
    if (invoiceIds.length > 0) {
      const { data: payData } = await supabase
        .from('payments')
        .select('id, invoice_id, amount, payment_date, payment_method, note')
        .in('invoice_id', invoiceIds)
        .order('payment_date', { ascending: false })
      setStatementPayments(payData || [])
    } else {
      setStatementPayments([])
    }

    setLoadingStatement(false)
  }

  function openNew() {
    setEditCustomer(null)
    setForm({ name: '', email: '', phone: '', address: '' })
    setError('')
    setShowForm(true)
  }

  function openEdit(c: Customer) {
    setEditCustomer(c)
    setForm({ name: c.name, email: c.email || '', phone: c.phone || '', address: c.address || '' })
    setError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Customer name is required.'); return }
    setSaving(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (editCustomer) {
      await supabase.from('customers').update({ ...form }).eq('id', editCustomer.id)
    } else {
      await supabase.from('customers').insert({ ...form, user_id: user.id })
    }
    setSaving(false)
    setShowForm(false)
    loadCustomers()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this customer? This cannot be undone.')) return
    await supabase.from('customers').delete().eq('id', id)
    loadCustomers()
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  const totalInvoiced = statementInvoices.reduce((s, i) => s + i.total, 0)
  const totalPaid = statementInvoices.reduce((s, i) => s + i.amount_paid, 0)
  const totalBalance = statementInvoices.reduce((s, i) => s + i.balance, 0)

  const STATUS_COLORS: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    partial: 'bg-yellow-100 text-yellow-700',
    outstanding: 'bg-red-100 text-red-700',
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="md:ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
            <p className="text-slate-500 text-sm mt-1">{customers.length} total customers</p>
          </div>
          {canCreate && (
            <button onClick={openNew} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Customer
            </button>
          )}
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers by name, email or phone..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading customers...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">{search ? 'No customers match your search.' : 'No customers yet. Add your first customer.'}</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Name', 'Email', 'Phone', 'Address', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{c.address || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <button onClick={() => openStatement(c)} className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors">Statement</button>
                        {canEdit && <button onClick={() => openEdit(c)} className="text-xs text-slate-500 hover:text-teal-600 font-medium transition-colors">Edit</button>}
                        {canDelete && <button onClick={() => handleDelete(c.id)} className="text-xs text-slate-500 hover:text-red-500 font-medium transition-colors">Delete</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Add/Edit Customer Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{editCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
            <div className="space-y-4">
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'e.g. John Adebayo' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '08012345678' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
                <textarea
                  value={form.address}
                  onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Customer address"
                  rows={2}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                {saving ? 'Saving...' : editCustomer ? 'Save Changes' : 'Add Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Statement Modal */}
      {showStatement && statementCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Customer Statement</h2>
                <p className="text-xs text-slate-500 mt-0.5">{statementCustomer.name}</p>
              </div>
              <button onClick={() => setShowStatement(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {loadingStatement ? (
              <div className="py-12 text-center text-slate-400 text-sm">Loading statement...</div>
            ) : (
              <>
                {/* Customer info */}
                <div className="bg-slate-50 rounded-xl p-4 mb-5">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><span className="text-slate-400 text-xs uppercase tracking-wider">Email</span><p className="text-slate-700 font-medium mt-0.5">{statementCustomer.email || '-'}</p></div>
                    <div><span className="text-slate-400 text-xs uppercase tracking-wider">Phone</span><p className="text-slate-700 font-medium mt-0.5">{statementCustomer.phone || '-'}</p></div>
                    <div><span className="text-slate-400 text-xs uppercase tracking-wider">Address</span><p className="text-slate-700 font-medium mt-0.5 truncate">{statementCustomer.address || '-'}</p></div>
                  </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: 'Total Invoiced', value: fmt(totalInvoiced), color: 'text-slate-900' },
                    { label: 'Total Paid', value: fmt(totalPaid), color: 'text-green-600' },
                    { label: 'Outstanding Balance', value: fmt(totalBalance), color: totalBalance > 0 ? 'text-red-600' : 'text-green-600' },
                  ].map(card => (
                    <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
                      <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
                    </div>
                  ))}
                </div>

                {/* Invoices table */}
                {statementInvoices.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-8">No invoices found for this customer.</p>
                ) : (
                  <>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Invoice History</h3>
                    <table className="w-full mb-5">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          {['Invoice #', 'Issue Date', 'Due Date', 'Total', 'Paid', 'Balance', 'Status'].map(h => (
                            <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {statementInvoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-slate-50">
                            <td className="px-3 py-2.5 text-sm font-semibold text-teal-600">
                              <Link href={`/app/invoice/invoices/${inv.id}`} onClick={() => setShowStatement(false)}>{inv.invoice_number}</Link>
                            </td>
                            <td className="px-3 py-2.5 text-sm text-slate-600">{new Date(inv.issue_date).toLocaleDateString('en-NG')}</td>
                            <td className="px-3 py-2.5 text-sm text-slate-600">{new Date(inv.due_date).toLocaleDateString('en-NG')}</td>
                            <td className="px-3 py-2.5 text-sm font-medium text-slate-900">{fmt(inv.total)}</td>
                            <td className="px-3 py-2.5 text-sm text-green-600">{fmt(inv.amount_paid)}</td>
                            <td className="px-3 py-2.5 text-sm text-red-600 font-medium">{fmt(inv.balance)}</td>
                            <td className="px-3 py-2.5">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[inv.status] || 'bg-slate-100 text-slate-600'}`}>{inv.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-slate-200 bg-slate-50">
                          <td colSpan={3} className="px-3 py-2.5 text-sm font-bold text-slate-900">Totals</td>
                          <td className="px-3 py-2.5 text-sm font-bold text-slate-900">{fmt(totalInvoiced)}</td>
                          <td className="px-3 py-2.5 text-sm font-bold text-green-600">{fmt(totalPaid)}</td>
                          <td className="px-3 py-2.5 text-sm font-bold text-red-600">{fmt(totalBalance)}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>

                    {/* Payment history */}
                    {statementPayments.length > 0 && (
                      <>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Payment History</h3>
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                              {['Date', 'Amount', 'Method', 'Note'].map(h => (
                                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {statementPayments.map(p => (
                              <tr key={p.id} className="hover:bg-slate-50">
                                <td className="px-3 py-2.5 text-sm text-slate-600">{new Date(p.payment_date).toLocaleDateString('en-NG')}</td>
                                <td className="px-3 py-2.5 text-sm font-semibold text-green-600">{fmt(p.amount)}</td>
                                <td className="px-3 py-2.5 text-sm text-slate-600">{p.payment_method}</td>
                                <td className="px-3 py-2.5 text-sm text-slate-500">{p.note || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
