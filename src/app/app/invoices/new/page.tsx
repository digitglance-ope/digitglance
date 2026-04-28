'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Customer = { id: string; name: string; email: string }
type InventoryItem = { id: string; name: string; unit_price: number; stock: number; unit: string }
type LineItem = {
  description: string
  quantity: number
  unit_price: number
  amount: number
  vatable: boolean
}

const PLAN_LIMITS: Record<string, number> = {
  free: 20,
  starter: 100,
  pro: Infinity,
}

export default function NewInvoicePage() {
  const router = useRouter()
  const supabase = createClient()

  const [customers, setCustomers] = useState<Customer[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [limitReached, setLimitReached] = useState(false)
  const [planInfo, setPlanInfo] = useState({ plan: 'free', used: 0, limit: 20 })

  // Quick Add Customer modal
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [customerForm, setCustomerForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [savingCustomer, setSavingCustomer] = useState(false)
  const [customerError, setCustomerError] = useState('')

  // Inventory search
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)
  const [inventorySearch, setInventorySearch] = useState('')
  const [showInventoryDropdown, setShowInventoryDropdown] = useState(false)
  const inventoryRef = useRef<HTMLDivElement>(null)

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

    const { data: custData } = await supabase
      .from('customers')
      .select('id, name, email')
      .eq('user_id', user.id)
      .order('name')
    setCustomers(custData || [])

    const { data: invData } = await supabase
      .from('inventory')
      .select('id, name, unit_price, stock, unit')
      .eq('user_id', user.id)
      .order('name')
    setInventory(invData || [])

    const { data: lastInv } = await supabase
      .from('invoices')
      .select('invoice_number')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
    const last = lastInv?.[0]?.invoice_number
    let nextNum = 'INV-001'
    if (last) {
      const num = parseInt(last.replace('INV-', '')) + 1
      nextNum = `INV-${String(num).padStart(3, '0')}`
    }
    setForm(prev => ({ ...prev, invoice_number: nextNum }))

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const plan = profile?.plan || 'free'
    const limit = PLAN_LIMITS[plan] ?? 20

    if (limit !== Infinity) {
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()
      const { count } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', monthStart)
        .lte('created_at', monthEnd)
      const used = count || 0
      setPlanInfo({ plan, used, limit })
      if (used >= limit) setLimitReached(true)
    } else {
      setPlanInfo({ plan, used: 0, limit: Infinity })
    }
  }

  async function handleAddCustomer() {
    if (!customerForm.name.trim()) { setCustomerError('Customer name is required.'); return }
    setSavingCustomer(true)
    setCustomerError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: newCustomer, error: custErr } = await supabase
      .from('customers')
      .insert({ ...customerForm, user_id: user.id })
      .select('id, name, email')
      .single()
    if (custErr || !newCustomer) {
      setCustomerError('Failed to add customer. Please try again.')
      setSavingCustomer(false)
      return
    }
    setCustomers(prev => [...prev, newCustomer].sort((a, b) => a.name.localeCompare(b.name)))
    setForm(prev => ({ ...prev, customer_id: newCustomer.id }))
    setCustomerForm({ name: '', email: '', phone: '', address: '' })
    setSavingCustomer(false)
    setShowAddCustomer(false)
  }

  function selectInventoryItem(index: number, item: InventoryItem) {
    const updated = [...items]
    updated[index] = {
      ...updated[index],
      description: item.name,
      unit_price: item.unit_price,
      amount: Number(updated[index].quantity) * item.unit_price,
    }
    setItems(updated)
    setShowInventoryDropdown(false)
    setActiveItemIndex(null)
    setInventorySearch('')
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

  const filteredInventory = inventory.filter(i =>
    i.name.toLowerCase().includes(inventorySearch.toLowerCase())
  )

  async function handleSave() {
    if (limitReached) return
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

  const navItems = [
    { href: '/app/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/app/invoices', label: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active: true },
    { href: '/app/customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ]

  if (limitReached) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0">
          <div className="p-6 border-b border-slate-800">
            <Link href="/app/dashboard"><span className="text-xl font-bold text-white">Digit<span className="text-teal-400">Glance</span></span></Link>
            <p className="text-xs text-slate-500 mt-1">Invoice System</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${(item as any).active ? 'bg-teal-600/10 text-teal-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="ml-64 flex-1 p-8 flex items-center justify-center">
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Monthly Limit Reached</h2>
            <p className="text-slate-500 text-sm mb-2">You have used <span className="font-semibold text-slate-700">{planInfo.used} of {planInfo.limit}</span> invoices on the <span className="font-semibold capitalize">{planInfo.plan}</span> plan this month.</p>
            <p className="text-slate-500 text-sm mb-8">Upgrade your plan to create more invoices.</p>
            <div className="flex flex-col gap-3">
              <Link href="/app/subscription" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">Upgrade Plan</Link>
              <Link href="/app/invoices" className="border border-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-lg text-sm hover:bg-slate-50 transition-colors">Back to Invoices</Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0">
        <div className="p-6 border-b border-slate-800">
          <Link href="/app/dashboard"><span className="text-xl font-bold text-white">Digit<span className="text-teal-400">Glance</span></span></Link>
          <p className="text-xs text-slate-500 mt-1">Invoice System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
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
            <Link href="/app/invoices" className="text-sm text-slate-500 hover:text-teal-600 mb-1 inline-block">← Back to Invoices</Link>
            <h1 className="text-2xl font-bold text-slate-900">New Invoice</h1>
          </div>
          <div className="flex items-center gap-4">
            {planInfo.limit !== Infinity && (
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-600">{planInfo.used}</span> of {planInfo.limit} invoices used this month
              </p>
            )}
            <div className="flex gap-3">
              <Link href="/app/invoices" className="border border-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</Link>
              <button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                {saving ? 'Saving...' : 'Save Invoice'}
              </button>
            </div>
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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer *</label>
                    <button
                      type="button"
                      onClick={() => { setShowAddCustomer(true); setCustomerError(''); setCustomerForm({ name: '', email: '', phone: '', address: '' }) }}
                      className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      New Customer
                    </button>
                  </div>
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
                    <div className="col-span-4 relative" ref={activeItemIndex === index ? inventoryRef : null}>
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => {
                          updateItem(index, 'description', e.target.value)
                          setInventorySearch(e.target.value)
                          setActiveItemIndex(index)
                          setShowInventoryDropdown(true)
                        }}
                        onFocus={() => {
                          setActiveItemIndex(index)
                          setInventorySearch(item.description)
                          setShowInventoryDropdown(true)
                        }}
                        placeholder="Type or select from inventory"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                      />
                      {showInventoryDropdown && activeItemIndex === index && inventory.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                          {filteredInventory.length === 0 ? (
                            <div className="px-3 py-2 text-xs text-slate-400">No inventory items match</div>
                          ) : (
                            filteredInventory.map(inv => (
                              <button
                                key={inv.id}
                                type="button"
                                onClick={() => selectInventoryItem(index, inv)}
                                className="w-full text-left px-3 py-2 hover:bg-teal-50 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-900 font-medium">{inv.name}</span>
                                  <span className="text-xs text-teal-600 font-semibold">₦{inv.unit_price.toLocaleString('en-NG')}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-slate-400">{inv.unit}</span>
                                  <span className={`text-xs font-medium ${inv.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {inv.stock > 0 ? `${inv.stock} in stock` : 'Out of stock'}
                                  </span>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    <div className="col-span-2">
                      <input type="number" value={item.quantity} onChange={e => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} min="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
                    </div>
                    <div className="col-span-2">
                      <input type="number" value={item.unit_price} onChange={e => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)} min="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
                    </div>
                    <div className="col-span-2">
                      <div className="px-2 py-2 text-sm text-slate-700 font-medium">{fmt(item.amount)}</div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button onClick={() => updateItem(index, 'vatable', !item.vatable)} className={`w-10 h-5 rounded-full transition-colors relative ${item.vatable ? 'bg-teal-500' : 'bg-slate-200'}`} title={item.vatable ? 'VAT applicable' : 'VAT not applicable'}>
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

      {/* Quick Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">Add New Customer</h2>
              <button onClick={() => setShowAddCustomer(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {customerError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{customerError}</div>}

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
                    value={customerForm[field.key as keyof typeof customerForm]}
                    onChange={e => setCustomerForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
                <textarea
                  value={customerForm.address}
                  onChange={e => setCustomerForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Customer address"
                  rows={2}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddCustomer(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleAddCustomer} disabled={savingCustomer} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                {savingCustomer ? 'Adding...' : 'Add Customer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
