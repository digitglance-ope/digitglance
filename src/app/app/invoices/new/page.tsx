'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Customer = { id: string; name: string; email: string }
type LineItem = {
  description: string
  quantity: number
  unit_price: number
  amount: number
  vatable: boolean
}

export default function NewInvoicePage() {
  const router = useRouter()
  const supabase = createClient()

  const [customers, setCustomers] = useState<Customer[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    customer_id: '',
    invoice_number: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    notes: '',
    discount_type: 'percentage',
    discount_value: 0,
    vat_rate: 7.5,
  })

  const [items, setItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unit_price: 0, amount: 0, vatable: true }
  ])

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: custData } = await supabase.from('customers').select('id, name, email').eq('user_id', user.id).order('name')
    setCustomers(custData || [])
    const { data: invData } = await supabase.from('invoices').select('invoice_number').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1)
    const last = invData?.[0]?.invoice_number
    let nextNum = 'INV-001'
    if (last) {
      const num = parseInt(last.replace('INV-', '')) + 1
      nextNum = `INV-${String(num).padStart(3, '0')}`
    }
    setForm(prev => ({ ...prev, invoice_number: nextNum }))
  }

  function updateItem(index: number, field: string, value: string | number | boolean) {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    if (field === 'quantity' || field === 'unit_price') {
      updated[index].amount = Number(updated[index].quantity) * Number(updated[index].unit_price)
    }
    setItems(updated)
  }

  function addItem() {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, amount: 0, vatable: true }])
  }

  function removeItem(index: number) {
    if (items.length === 1) return
    setItems(items.filter((_, i) => i !== index))
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const discountAmount = form.discount_type === 'percentage'
    ? (subtotal * form.discount_value) / 100
    : Number(form.discount_value)
  const vatableSubtotal = items.filter(i => i.vatable).reduce((sum, i) => sum + i.amount, 0)
  const vatableAfterDiscount = form.discount_type === 'percentage'
    ? vatableSubtotal * (1 - form.discount_value / 100)
    : Math.max(0, vatableSubtotal - Number(form.discount_value))
  const vatAmount = (vatableAfterDiscount * form.vat_rate) / 100
  const afterDiscount = subtotal - discountAmount
  const total = afterDiscount + vatAmount

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  async function handleSave() {
    if (!form.customer_id) { setError('Please select a customer.'); return }
    if (!form.due_date) { setError('Please set a due date.'); return }
    if (items.some(i => !i.description.trim())) { setError('All line items need a description.'); return }

    setSaving(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: invoice, error: invError } = await supabase.from('invoices').insert({
      user_id: user.id,
      customer_id: form.customer_id,
      invoice_number: form.invoice_number,
      issue_date: form.issue_date,
      due_date: form.due_date,
      notes: form.notes,
      discount_type: form.discount_type,
      discount_value: form.discount_value,
      discount_amount: discountAmount,
      vat_rate: form.vat_rate,
      vat_amount: vatAmount,
      subtotal,
      total,
      amount_paid: 0,
      balance: total,
      status: 'outstanding',
    }).select().single()

    if (invError || !invoice) {
      setError('Failed to create invoice. Please try again.')
      setSaving(false)
      return
    }

    await supabase.from('invoice_items').insert(
      items.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount,
        vatable: item.vatable,
      }))
    )

    router.push(`/app/invoices/${invoice.id}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0">
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

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/app/invoices" className="text-sm text-slate-500 hover:text-teal-600 mb-1 inline-block">← Back to Invoices</Link>
            <h1 className="text-2xl font-bold text-slate-900">New Invoice</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/app/invoices" className="border border-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</Link>
            <button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              {saving ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">{error}</div>}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Invoice Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Invoice Number</label>
                  <input type="text" value={form.invoice_number} onChange={e => setForm(prev => ({ ...prev, invoice_number: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Customer *</label>
                  <select value={form.customer_id} onChange={e => setForm(prev => ({ ...prev, customer_id: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500">
                    <option value="">Select customer</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Issue Date</label>
                  <input type="date" value={form.issue_date} onChange={e => setForm(prev => ({ ...prev, issue_date: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Due Date *</label>
                  <input type="date" value={form.due_date} onChange={e => setForm(prev => ({ ...prev, due_date: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Line Items</h2>
                <span className="text-xs text-slate-400">Toggle VAT per line item</span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                  <div className="col-span-4">Description</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Unit Price</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1 text-center">VAT</div>
                  <div className="col-span-1"></div>
                </div>

                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => updateItem(index, 'description', e.target.value)}
                        placeholder="Description"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={e => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.unit_price}
                        onChange={e => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                        min="0"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="px-2 py-2 text-sm text-slate-700 font-medium">{fmt(item.amount)}</div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => updateItem(index, 'vatable', !item.vatable)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${item.vatable ? 'bg-teal-500' : 'bg-slate-200'}`}
                        title={item.vatable ? 'VAT applicable' : 'VAT not applicable'}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.vatable ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button onClick={() => removeItem(index)} className="text-slate-300 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                <button onClick={addItem} className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium mt-2 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Line Item
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Notes</h2>
              <textarea value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="Payment terms, thank you message, or any other notes..." rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 resize-none" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Discount</h2>
              <div className="space-y-3">
                <select value={form.discount_type} onChange={e => setForm(prev => ({ ...prev, discount_type: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₦)</option>
                </select>
                <input type="number" value={form.discount_value} onChange={e => setForm(prev => ({ ...prev, discount_value: parseFloat(e.target.value) || 0 }))} min="0" placeholder="0" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">{fmt(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Discount</span>
                    <span className="text-red-500 font-medium">-{fmt(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">VAT (7.5% on VATable items)</span>
                  <span className="font-medium text-slate-900">{fmt(vatAmount)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-base font-bold text-teal-600">{fmt(total)}</span>
                </div>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-colors">
              {saving ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
