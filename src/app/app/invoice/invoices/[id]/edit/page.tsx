'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'
import { formatCurrency } from '@/lib/formatters'

type Customer  = { id: string; name: string; email: string }
type InventoryItem = { id: string; name: string; unit_price: number; stock: number; unit: string }
type LineItem  = { id?: string; description: string; quantity: number; unit_price: number; amount: number; vatable: boolean }

export default function EditInvoicePage() {
  const params  = useParams()
  const router  = useRouter()
  const supabase = createClient()
  const invoiceId = params.id as string

  const [customers,  setCustomers]  = useState<Customer[]>([])
  const [inventory,  setInventory]  = useState<InventoryItem[]>([])
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState('')
  const [ownerId,    setOwnerId]    = useState<string | null>(null)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [isPaid,     setIsPaid]     = useState(false)

  const [inventorySearch,      setInventorySearch]      = useState('')
  const [showInventoryDropdown, setShowInventoryDropdown] = useState(false)
  const [activeItemIndex,       setActiveItemIndex]      = useState<number | null>(null)
  const inventoryRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    customer_id:    '',
    issue_date:     '',
    due_date:       '',
    notes:          '',
    discount_type:  'percentage',
    discount_value: 0,
    vat_rate:       7.5,
  })

  const [items, setItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unit_price: 0, amount: 0, vatable: true }
  ])

  useEffect(() => { loadData() }, [invoiceId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (inventoryRef.current && !inventoryRef.current.contains(e.target as Node)) {
        setShowInventoryDropdown(false)
        setActiveItemIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_team_member, account_owner_id')
      .eq('id', user.id)
      .single()

    const resolved = (profile?.is_team_member && profile.account_owner_id)
      ? profile.account_owner_id : user.id
    setOwnerId(resolved)

    const [custRes, invRes, itemsRes, inventoryRes] = await Promise.all([
      supabase.from('customers').select('id, name, email').eq('user_id', user.id).order('name'),
      supabase.from('invoices').select('*').eq('id', invoiceId).single(),
      supabase.from('invoice_items').select('*').eq('invoice_id', invoiceId),
      supabase.from('inventory').select('id, name, unit_price, stock, unit').eq('user_id', user.id).order('name'),
    ])

    setCustomers(custRes.data || [])
    setInventory(inventoryRes.data || [])

    if (invRes.data) {
      const inv = invRes.data
      setInvoiceNumber(inv.invoice_number)
      setIsPaid(inv.status === 'paid')
      setForm({
        customer_id:    inv.customer_id,
        issue_date:     inv.issue_date,
        due_date:       inv.due_date,
        notes:          inv.notes || '',
        discount_type:  inv.discount_type,
        discount_value: inv.discount_value,
        vat_rate:       inv.vat_rate,
      })
    }

    if (itemsRes.data && itemsRes.data.length > 0) {
      setItems(itemsRes.data.map((i: LineItem) => ({
        id:          i.id,
        description: i.description,
        quantity:    i.quantity,
        unit_price:  i.unit_price,
        amount:      i.amount,
        vatable:     i.vatable,
      })))
    }

    setLoading(false)
  }

  function updateItem(index: number, field: string, value: string | number | boolean) {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    if (field === 'quantity' || field === 'unit_price') {
      updated[index].amount = Number(updated[index].quantity) * Number(updated[index].unit_price)
    }
    setItems(updated)
  }

  function selectInventoryItem(index: number, item: InventoryItem) {
    const updated = [...items]
    updated[index] = {
      ...updated[index],
      description: item.name,
      unit_price:  item.unit_price,
      amount:      Number(updated[index].quantity) * item.unit_price,
    }
    setItems(updated)
    setShowInventoryDropdown(false)
    setActiveItemIndex(null)
    setInventorySearch('')
  }

  const subtotal = items.reduce((s, i) => s + i.amount, 0)
  const discountAmount = form.discount_type === 'percentage'
    ? (subtotal * form.discount_value) / 100
    : Number(form.discount_value)
  const vatableSubtotal = items.filter(i => i.vatable).reduce((s, i) => s + i.amount, 0)
  const vatableAfterDiscount = form.discount_type === 'percentage'
    ? vatableSubtotal * (1 - form.discount_value / 100)
    : Math.max(0, vatableSubtotal - Number(form.discount_value))
  const vatAmount    = (vatableAfterDiscount * form.vat_rate) / 100
  const afterDiscount = subtotal - discountAmount
  const total        = afterDiscount + vatAmount

  const filteredInventory = inventory.filter(i =>
    i.name.toLowerCase().includes(inventorySearch.toLowerCase())
  )

  async function handleSave() {
    if (isPaid) return
    if (!form.customer_id)  { setError('Please select a customer.'); return }
    if (!form.due_date)     { setError('Please set a due date.'); return }
    if (form.due_date < form.issue_date) { setError('Due date cannot be before the issue date.'); return }
    if (items.some(i => !i.description.trim()))    { setError('All line items need a description.'); return }
    if (items.some(i => Number(i.quantity) <= 0))  { setError('All quantities must be greater than zero.'); return }
    if (items.some(i => Number(i.unit_price) < 0)) { setError('Unit prices cannot be negative.'); return }
    if (form.discount_value < 0) { setError('Discount cannot be negative.'); return }
    if (form.discount_type === 'percentage' && form.discount_value > 100) {
      setError('Percentage discount cannot exceed 100%.')
      return
    }

    setSaving(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Re-read amount_paid to keep balance accurate after edit
    const { data: existing } = await supabase
      .from('invoices')
      .select('amount_paid, status')
      .eq('id', invoiceId)
      .single()

    const amountPaid = existing?.amount_paid ?? 0
    const newBalance = total - amountPaid
    const newStatus  = newBalance <= 0 ? 'paid' : amountPaid > 0 ? 'partial' : 'outstanding'

    const { error: updateErr } = await supabase.from('invoices').update({
      customer_id:     form.customer_id,
      issue_date:      form.issue_date,
      due_date:        form.due_date,
      notes:           form.notes,
      discount_type:   form.discount_type,
      discount_value:  form.discount_value,
      discount_amount: discountAmount,
      vat_rate:        form.vat_rate,
      vat_amount:      vatAmount,
      subtotal,
      total,
      balance:         newBalance,
      status:          newStatus,
    }).eq('id', invoiceId)

    if (updateErr) {
      setError('Failed to update invoice. Please try again.')
      setSaving(false)
      return
    }

    // Replace all line items (delete old, insert new)
    await supabase.from('invoice_items').delete().eq('invoice_id', invoiceId)
    await supabase.from('invoice_items').insert(
      items.map(item => ({
        invoice_id:  invoiceId,
        description: item.description,
        quantity:    item.quantity,
        unit_price:  item.unit_price,
        amount:      item.amount,
        vatable:     item.vatable,
      }))
    )

    await supabase.from('audit_logs').insert({
      user_id:          user.id,
      account_owner_id: ownerId || user.id,
      user_email:       user.email,
      action:           'Invoice Updated',
      resource:         'Invoices',
      details:          `Invoice ${invoiceNumber} updated. New total: ${formatCurrency(total)}.`,
    })

    router.push(`/app/invoice/invoices/${invoiceId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <AppSidebar product="invoice" />
        <main className="md:ml-64 flex-1 p-8 flex items-center justify-center">
          <p className="text-slate-400">Loading invoice…</p>
        </main>
      </div>
    )
  }

  if (isPaid) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <AppSidebar product="invoice" />
        <main className="md:ml-64 flex-1 p-8 flex items-center justify-center">
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Invoice is fully paid</h2>
            <p className="text-slate-500 text-sm mb-6">Paid invoices cannot be edited to protect your financial records.</p>
            <Link href={`/app/invoice/invoices/${invoiceId}`} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors inline-block">
              Back to Invoice
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="md:ml-64 flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <Link href={`/app/invoice/invoices/${invoiceId}`} className="text-sm text-slate-500 hover:text-teal-600 mb-1 inline-block">
              ← Back to Invoice
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Edit {invoiceNumber}</h1>
          </div>
          <div className="flex gap-3">
            <Link href={`/app/invoice/invoices/${invoiceId}`} className="border border-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              {saving ? 'Saving…' : 'Update Invoice'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Invoice details */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Invoice Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    disabled
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Customer *</label>
                  <select
                    value={form.customer_id}
                    onChange={e => setForm(p => ({ ...p, customer_id: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="">Select customer</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Issue Date</label>
                  <input
                    type="date"
                    value={form.issue_date}
                    onChange={e => setForm(p => ({ ...p, issue_date: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Due Date *</label>
                  <input
                    type="date"
                    value={form.due_date}
                    onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Line items */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Line Items</h2>
              <div ref={inventoryRef} className="relative">
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-12 sm:col-span-5 relative">
                        <input
                          type="text"
                          value={item.description}
                          onChange={e => {
                            updateItem(idx, 'description', e.target.value)
                            setInventorySearch(e.target.value)
                            setActiveItemIndex(idx)
                            setShowInventoryDropdown(true)
                          }}
                          onFocus={() => { setActiveItemIndex(idx); setShowInventoryDropdown(true) }}
                          placeholder="Description"
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                        />
                        {showInventoryDropdown && activeItemIndex === idx && filteredInventory.length > 0 && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-40 overflow-y-auto mt-1">
                            {filteredInventory.map(inv => (
                              <button
                                key={inv.id}
                                type="button"
                                onClick={() => selectInventoryItem(idx, inv)}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex justify-between"
                              >
                                <span>{inv.name}</span>
                                <span className="text-slate-400">{formatCurrency(inv.unit_price)}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e => updateItem(idx, 'quantity', e.target.value)}
                          min="0.01"
                          step="0.01"
                          placeholder="Qty"
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <input
                          type="number"
                          value={item.unit_price}
                          onChange={e => updateItem(idx, 'unit_price', e.target.value)}
                          min="0"
                          step="0.01"
                          placeholder="Price"
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2 flex items-center gap-1.5 pt-2">
                        <input
                          type="checkbox"
                          id={`vat-${idx}`}
                          checked={item.vatable}
                          onChange={e => updateItem(idx, 'vatable', e.target.checked)}
                          className="accent-teal-600"
                        />
                        <label htmlFor={`vat-${idx}`} className="text-xs text-slate-500 select-none">VAT</label>
                      </div>
                      <div className="col-span-2 sm:col-span-1 flex justify-end pt-1.5">
                        <button
                          onClick={() => items.length > 1 && setItems(items.filter((_, i) => i !== idx))}
                          className="text-slate-300 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setItems([...items, { description: '', quantity: 1, unit_price: 0, amount: 0, vatable: true }])}
                className="mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Item
              </button>
            </div>

            {/* Notes */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Notes</h2>
              <textarea
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={3}
                placeholder="Payment terms, thank you note, or other details…"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Summary</h2>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Discount</label>
                  <div className="flex gap-2">
                    <select
                      value={form.discount_type}
                      onChange={e => setForm(p => ({ ...p, discount_type: e.target.value }))}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">₦</option>
                    </select>
                    <input
                      type="number"
                      value={form.discount_value}
                      onChange={e => setForm(p => ({ ...p, discount_value: Number(e.target.value) }))}
                      min="0"
                      step="0.01"
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>VAT ({form.vat_rate}%)</span>
                  <span>{formatCurrency(vatAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-200 pt-2">
                  <span>Total</span>
                  <span className="text-teal-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
