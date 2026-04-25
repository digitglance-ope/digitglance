'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Invoice = {
  id: string
  invoice_number: string
  issue_date: string
  due_date: string
  status: string
  subtotal: number
  discount_type: string
  discount_value: number
  discount_amount: number
  vat_rate: number
  vat_amount: number
  total: number
  amount_paid: number
  balance: number
  notes: string
  customers: { name: string; email: string; phone: string; address: string } | null
}

type InvoiceItem = {
  id: string
  description: string
  quantity: number
  unit_price: number
  amount: number
  vatable: boolean
}

type Payment = {
  id: string
  amount: number
  payment_date: string
  payment_method: string
  note: string
}

type Profile = {
  business_name: string
  business_address: string
  phone: string
  tin: string
  bank_name: string
  bank_account_number: string
  bank_account_name: string
  vat_rate: number
}

const STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-700 border-green-200',
  partial: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  outstanding: 'bg-red-100 text-red-700 border-red-200',
}

const PAYMENT_METHODS = ['Bank Transfer', 'Cash', 'POS', 'Cheque', 'Online Payment', 'Other']

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Bank Transfer',
    note: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fmt = (n: number) => `₦${Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  useEffect(() => { loadData() }, [params.id])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [invoiceRes, itemsRes, paymentsRes, profileRes] = await Promise.all([
      supabase.from('invoices').select('*, customers(name, email, phone, address)').eq('id', params.id).single(),
      supabase.from('invoice_items').select('*').eq('invoice_id', params.id),
      supabase.from('payments').select('*').eq('invoice_id', params.id).order('payment_date', { ascending: false }),
      supabase.from('profiles').select('*').eq('id', user.id).single(),
    ])

    setInvoice(invoiceRes.data)
    setItems(itemsRes.data || [])
    setPayments(paymentsRes.data || [])
    setProfile(profileRes.data)
    setLoading(false)
  }

  async function handlePayment() {
    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
      setError('Please enter a valid payment amount.')
      return
    }
    if (Number(paymentForm.amount) > (invoice?.balance || 0)) {
      setError(`Payment cannot exceed the balance of ${fmt(invoice?.balance || 0)}.`)
      return
    }

    setSaving(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('payments').insert({
      invoice_id: params.id,
      user_id: user.id,
      amount: Number(paymentForm.amount),
      payment_date: paymentForm.payment_date,
      payment_method: paymentForm.payment_method,
      note: paymentForm.note,
    })

    const newAmountPaid = (invoice?.amount_paid || 0) + Number(paymentForm.amount)
    const newBalance = (invoice?.total || 0) - newAmountPaid
    const newStatus = newBalance <= 0 ? 'paid' : newAmountPaid > 0 ? 'partial' : 'outstanding'

    await supabase.from('invoices').update({
      amount_paid: newAmountPaid,
      balance: newBalance,
      status: newStatus,
    }).eq('id', params.id)

    setPaymentForm({ amount: '', payment_date: new Date().toISOString().split('T')[0], payment_method: 'Bank Transfer', note: '' })
    setShowPaymentForm(false)
    setSaving(false)
    loadData()
  }

  function handleWhatsApp() {
    if (!invoice || !invoice.customers) return
    const phone = invoice.customers.phone?.replace(/\D/g, '').replace(/^0/, '234')
    const message = `Hello ${invoice.customers.name}, please find your invoice ${invoice.invoice_number} for ${fmt(invoice.total)} attached. Balance due: ${fmt(invoice.balance)}. Thank you for your business - ${profile?.business_name}`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  function handlePrint() {
    window.print()
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Loading invoice...</p></div>
  if (!invoice) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Invoice not found.</p></div>

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0 print:hidden">
        <div className="p-6 border-b border-slate-800">
          <Link href="/app/dashboard">
            <span className="text-xl font-bold text-white">Digit<span className="text-teal-400">Glance</span></span>
          </Link>
          <p className="text-xs text-slate-500 mt-1">Invoice System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/app/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { href: '/app/invoices', label: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active: true },
            { href: '/app/customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
            { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
          ].map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${(item as any).active ? 'bg-teal-600/10 text-teal-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-64 flex-1 p-8 print:ml-0 print:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <div>
            <Link href="/app/invoices" className="text-sm text-slate-500 hover:text-teal-600 mb-1 inline-block">← Back to Invoices</Link>
            <h1 className="text-2xl font-bold text-slate-900">{invoice.invoice_number}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={handlePrint} className="border border-slate-200 text-slate-600 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            {invoice.customers?.phone && (
              <button onClick={handleWhatsApp} className="border border-green-200 bg-green-50 text-green-700 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-green-100 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WhatsApp
              </button>
            )}
            {invoice.status !== 'paid' && (
              <button onClick={() => setShowPaymentForm(true)} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Record Payment
              </button>
            )}
          </div>
        </div>

        {/* Invoice document */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 mb-6">

          {/* Business header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{profile?.business_name}</h2>
              <p className="text-slate-500 text-sm mt-1 whitespace-pre-line">{profile?.business_address}</p>
              {profile?.phone && <p className="text-slate-500 text-sm">{profile.phone}</p>}
              {profile?.tin && <p className="text-slate-500 text-sm">TIN: {profile.tin}</p>}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-teal-600 mb-2">INVOICE</div>
              <p className="text-slate-900 font-semibold">{invoice.invoice_number}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize border mt-2 ${STATUS_COLORS[invoice.status]}`}>
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Invoice meta */}
          <div className="grid grid-cols-3 gap-6 mb-8 p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Bill To</p>
              <p className="font-semibold text-slate-900">{invoice.customers?.name}</p>
              {invoice.customers?.address && <p className="text-sm text-slate-500">{invoice.customers.address}</p>}
              {invoice.customers?.phone && <p className="text-sm text-slate-500">{invoice.customers.phone}</p>}
              {invoice.customers?.email && <p className="text-sm text-slate-500">{invoice.customers.email}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Issue Date</p>
              <p className="text-slate-900 font-medium">{new Date(invoice.issue_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Due Date</p>
              <p className="text-slate-900 font-medium">{new Date(invoice.due_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Line items */}
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Description</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Qty</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Unit Price</th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">VAT</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map(item => (
                <tr key={item.id}>
                  <td className="py-3 text-sm text-slate-900">{item.description}</td>
                  <td className="py-3 text-sm text-slate-600 text-right">{item.quantity}</td>
                  <td className="py-3 text-sm text-slate-600 text-right">{fmt(item.unit_price)}</td>
                  <td className="py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.vatable ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                      {item.vatable ? 'VAT' : 'Exempt'}
                    </span>
                  </td>
                  <td className="py-3 text-sm font-medium text-slate-900 text-right">{fmt(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-900">{fmt(invoice.subtotal)}</span>
              </div>
              {invoice.discount_amount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount ({invoice.discount_type === 'percentage' ? `${invoice.discount_value}%` : 'Fixed'})</span>
                  <span className="text-red-500">-{fmt(invoice.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">VAT ({invoice.vat_rate}% on VATable items)</span>
                <span className="text-slate-900">{fmt(invoice.vat_amount)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold">
                <span className="text-slate-900">Total</span>
                <span className="text-teal-600 text-lg">{fmt(invoice.total)}</span>
              </div>
              {invoice.amount_paid > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Amount Paid</span>
                    <span className="text-green-600">-{fmt(invoice.amount_paid)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-bold">
                    <span className="text-slate-900">Balance Due</span>
                    <span className="text-red-600">{fmt(invoice.balance)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bank details */}
          {profile?.bank_name && (
            <div className="border-t border-slate-200 pt-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Payment Details</p>
              <div className="flex gap-8 text-sm">
                <div><span className="text-slate-400">Bank: </span><span className="text-slate-900 font-medium">{profile.bank_name}</span></div>
                <div><span className="text-slate-400">Account: </span><span className="text-slate-900 font-medium">{profile.bank_account_number}</span></div>
                <div><span className="text-slate-400">Name: </span><span className="text-slate-900 font-medium">{profile.bank_account_name}</span></div>
              </div>
            </div>
          )}

          {invoice.notes && (
            <div className="border-t border-slate-200 pt-4 mt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-slate-600">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Payment history */}
        {payments.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 print:hidden">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Payment History</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Date', 'Amount', 'Method', 'Note'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map(p => (
                  <tr key={p.id}>
                    <td className="py-3 text-sm text-slate-600">{new Date(p.payment_date).toLocaleDateString('en-NG')}</td>
                    <td className="py-3 text-sm font-semibold text-green-600">{fmt(p.amount)}</td>
                    <td className="py-3 text-sm text-slate-600">{p.payment_method}</td>
                    <td className="py-3 text-sm text-slate-500">{p.note || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Payment modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Record Payment</h2>
              <button onClick={() => setShowPaymentForm(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Invoice Total</span>
                <span className="font-semibold">{fmt(invoice.total)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-slate-500">Balance Due</span>
                <span className="font-bold text-red-600">{fmt(invoice.balance)}</span>
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Amount Received (₦) *</label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={e => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  max={invoice.balance}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Payment Date *</label>
                <input
                  type="date"
                  value={paymentForm.payment_date}
                  onChange={e => setPaymentForm(prev => ({ ...prev, payment_date: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Payment Method</label>
                <select
                  value={paymentForm.payment_method}
                  onChange={e => setPaymentForm(prev => ({ ...prev, payment_method: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                >
                  {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Note (Optional)</label>
                <input
                  type="text"
                  value={paymentForm.note}
                  onChange={e => setPaymentForm(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="e.g. First instalment"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPaymentForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handlePayment} disabled={saving} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                {saving ? 'Saving...' : 'Record Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
