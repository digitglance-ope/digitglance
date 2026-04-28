'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Supplier = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  created_at: string
}

type Payment = {
  id: string
  supplier_id: string
  amount: number
  payment_date: string
  payment_method: string
  reference: string
  notes: string
}

type InventoryItem = {
  id: string
  name: string
  unit_price: number
  stock: number
  unit: string
}

type PurchaseLineItem = {
  description: string
  quantity: number
  unit_price: number
  amount: number
  vatable: boolean
  inventory_item_id: string | null
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // Supplier form
  const [showForm, setShowForm] = useState(false)
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Payment form
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'bank_transfer',
    reference: '',
    notes: '',
  })
  const [savingPayment, setSavingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  // Purchase invoice form
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [purchaseSupplier, setPurchaseSupplier] = useState<Supplier | null>(null)
  const [savingPurchase, setSavingPurchase] = useState(false)
  const [purchaseError, setPurchaseError] = useState('')
  const [purchaseForm, setPurchaseForm] = useState({
    invoice_number: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    notes: '',
  })
  const [purchaseItems, setPurchaseItems] = useState<PurchaseLineItem[]>([
    { description: '', quantity: 1, unit_price: 0, amount: 0, vatable: false, inventory_item_id: null }
  ])
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null)
  const [invSearch, setInvSearch] = useState('')
  const [showInvDropdown, setShowInvDropdown] = useState(false)
  const invRef = useRef<HTMLDivElement>(null)

  const supabase = createClient()
  const fmt = (n: number) => `₦${Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [suppRes, payRes, invRes] = await Promise.all([
      supabase.from('suppliers').select('*').eq('user_id', user.id).order('name'),
      supabase.from('supplier_payments').select('*').eq('user_id', user.id).order('payment_date', { ascending: false }),
      supabase.from('inventory').select('id, name, unit_price, stock, unit').eq('user_id', user.id).order('name'),
    ])

    setSuppliers(suppRes.data || [])
    setPayments(payRes.data || [])
    setInventory(invRes.data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (invRef.current && !invRef.current.contains(e.target as Node)) {
        setShowInvDropdown(false)
        setActiveLineIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Supplier CRUD
  function openNew() {
    setEditSupplier(null)
    setForm({ name: '', email: '', phone: '', address: '' })
    setError('')
    setShowForm(true)
  }

  function openEdit(s: Supplier) {
    setEditSupplier(s)
    setForm({ name: s.name, email: s.email || '', phone: s.phone || '', address: s.address || '' })
    setError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Supplier name is required.'); return }
    setSaving(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (editSupplier) {
      await supabase.from('suppliers').update({ ...form }).eq('id', editSupplier.id)
    } else {
      await supabase.from('suppliers').insert({ ...form, user_id: user.id })
    }
    setSaving(false)
    setShowForm(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this supplier? This cannot be undone.')) return
    await supabase.from('suppliers').delete().eq('id', id)
    load()
  }

  // Payment
  function openPayment(s: Supplier) {
    setSelectedSupplier(s)
    setPaymentForm({ amount: '', payment_date: new Date().toISOString().split('T')[0], payment_method: 'bank_transfer', reference: '', notes: '' })
    setPaymentError('')
    setShowPaymentForm(true)
  }

  function openHistory(s: Supplier) {
    setSelectedSupplier(s)
    setShowPaymentHistory(true)
  }

  async function handleSavePayment() {
    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) { setPaymentError('Please enter a valid amount.'); return }
    if (!paymentForm.payment_date) { setPaymentError('Please select a payment date.'); return }
    setSavingPayment(true)
    setPaymentError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('supplier_payments').insert({
      user_id: user.id,
      supplier_id: selectedSupplier!.id,
      amount: Number(paymentForm.amount),
      payment_date: paymentForm.payment_date,
      payment_method: paymentForm.payment_method,
      reference: paymentForm.reference,
      notes: paymentForm.notes,
    })
    setSavingPayment(false)
    setShowPaymentForm(false)
    load()
  }

  // Purchase invoice
  function openPurchase(s: Supplier) {
    setPurchaseSupplier(s)
    setPurchaseForm({ invoice_number: `PINV-${Date.now().toString().slice(-6)}`, invoice_date: new Date().toISOString().split('T')[0], due_date: '', notes: '' })
    setPurchaseItems([{ description: '', quantity: 1, unit_price: 0, amount: 0, vatable: false, inventory_item_id: null }])
    setPurchaseError('')
    setShowPurchaseForm(true)
  }

  function updatePurchaseItem(index: number, field: string, value: string | number | boolean | null) {
    const updated = [...purchaseItems]
    updated[index] = { ...updated[index], [field]: value }
    if (field === 'quantity' || field === 'unit_price') {
      updated[index].amount = Number(updated[index].quantity) * Number(updated[index].unit_price)
    }
    setPurchaseItems(updated)
  }

  function selectInventoryForPurchase(index: number, item: InventoryItem) {
    const updated = [...purchaseItems]
    updated[index] = {
      ...updated[index],
      description: item.name,
      unit_price: item.unit_price,
      amount: Number(updated[index].quantity) * item.unit_price,
      inventory_item_id: item.id,
    }
    setPurchaseItems(updated)
    setShowInvDropdown(false)
    setActiveLineIndex(null)
    setInvSearch('')
  }

  async function handleSavePurchase() {
    if (!purchaseForm.invoice_number.trim()) { setPurchaseError('Invoice number is required.'); return }
    if (purchaseItems.some(i => !i.description.trim())) { setPurchaseError('All line items need a description.'); return }
    if (purchaseItems.some(i => i.quantity <= 0)) { setPurchaseError('All quantities must be greater than zero.'); return }

    setSavingPurchase(true)
    setPurchaseError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const subtotal = purchaseItems.reduce((s, i) => s + i.amount, 0)
    const vatAmount = purchaseItems.filter(i => i.vatable).reduce((s, i) => s + (i.amount * 0.075), 0)
    const total = subtotal + vatAmount

    const { data: purchaseInv, error: pErr } = await supabase.from('supplier_invoices').insert({
      user_id: user.id,
      supplier_id: purchaseSupplier!.id,
      invoice_number: purchaseForm.invoice_number,
      invoice_date: purchaseForm.invoice_date,
      due_date: purchaseForm.due_date || null,
      subtotal,
      vat_amount: vatAmount,
      total,
      amount_paid: 0,
      balance: total,
      status: 'unpaid',
      notes: purchaseForm.notes,
    }).select().single()

    if (pErr || !purchaseInv) {
      setPurchaseError('Failed to save purchase invoice. Please try again.')
      setSavingPurchase(false)
      return
    }

    await supabase.from('supplier_invoice_items').insert(
      purchaseItems.map(item => ({
        supplier_invoice_id: purchaseInv.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount,
        vatable: item.vatable,
        inventory_item_id: item.inventory_item_id || null,
      }))
    )

    // Update inventory stock for linked items
    for (const item of purchaseItems) {
      if (item.inventory_item_id) {
        const current = inventory.find(i => i.id === item.inventory_item_id)
        if (current) {
          await supabase.from('inventory')
            .update({ stock: current.stock + Number(item.quantity) })
            .eq('id', item.inventory_item_id)
        }
      }
    }

    setSavingPurchase(false)
    setShowPurchaseForm(false)
    load()
    alert(`Purchase invoice ${purchaseForm.invoice_number} saved. Inventory updated.`)
  }

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.phone?.includes(search)
  )

  function getTotalPaid(supplierId: string) {
    return payments.filter(p => p.supplier_id === supplierId).reduce((sum, p) => sum + p.amount, 0)
  }

  function getSupplierPayments(supplierId: string) {
    return payments.filter(p => p.supplier_id === supplierId)
  }

  const METHOD_LABELS: Record<string, string> = {
    bank_transfer: 'Bank Transfer', cash: 'Cash', cheque: 'Cheque', pos: 'POS', mobile_money: 'Mobile Money',
  }

  const purchaseSubtotal = purchaseItems.reduce((s, i) => s + i.amount, 0)
  const purchaseVAT = purchaseItems.filter(i => i.vatable).reduce((s, i) => s + (i.amount * 0.075), 0)
  const purchaseTotal = purchaseSubtotal + purchaseVAT
  const filteredInv = inventory.filter(i => i.name.toLowerCase().includes(invSearch.toLowerCase()))

  const navItems = [
    { href: '/app/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/app/invoices', label: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { href: '/app/customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { href: '/app/suppliers', label: 'Suppliers', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', active: true },
    { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ]

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
            <h1 className="text-2xl font-bold text-slate-900">Suppliers</h1>
            <p className="text-slate-500 text-sm mt-1">{suppliers.length} total suppliers</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Supplier
          </button>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers by name, email or phone..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading suppliers...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <p className="text-slate-500 text-sm">{search ? 'No suppliers match your search.' : 'No suppliers yet. Add your first supplier.'}</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Supplier', 'Email', 'Phone', 'Total Paid', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">{s.name.charAt(0).toUpperCase()}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{s.name}</p>
                          {s.address && <p className="text-xs text-slate-400 truncate max-w-xs">{s.address}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{s.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{s.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{fmt(getTotalPaid(s.id))}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end flex-wrap">
                        <button onClick={() => openPurchase(s)} className="text-xs text-white bg-purple-600 hover:bg-purple-700 font-medium px-2.5 py-1.5 rounded-lg transition-colors">Purchase Invoice</button>
                        <button onClick={() => openHistory(s)} className="text-xs text-slate-500 hover:text-purple-600 font-medium transition-colors">History</button>
                        <button onClick={() => openPayment(s)} className="text-xs text-white bg-teal-600 hover:bg-teal-700 font-medium px-2.5 py-1.5 rounded-lg transition-colors">Record Payment</button>
                        <button onClick={() => openEdit(s)} className="text-xs text-slate-500 hover:text-teal-600 font-medium transition-colors">Edit</button>
                        <button onClick={() => handleDelete(s.id)} className="text-xs text-slate-500 hover:text-red-500 font-medium transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Add/Edit Supplier Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{editSupplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
            <div className="space-y-4">
              {[
                { label: 'Supplier Name *', key: 'name', type: 'text', placeholder: 'e.g. ABC Supplies Ltd' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'supplier@example.com' },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '08012345678' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <input type={field.type} value={form[field.key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))} placeholder={field.placeholder} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Address</label>
                <textarea value={form.address} onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))} placeholder="Supplier address" rows={2} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm">
                {saving ? 'Saving...' : editSupplier ? 'Save Changes' : 'Add Supplier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showPaymentForm && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Record Payment</h2>
                <p className="text-xs text-slate-500 mt-0.5">To: {selectedSupplier.name}</p>
              </div>
              <button onClick={() => setShowPaymentForm(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            {paymentError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{paymentError}</div>}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Amount *</label>
                <input type="number" value={paymentForm.amount} onChange={e => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))} placeholder="0.00" min="0" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Payment Date *</label>
                <input type="date" value={paymentForm.payment_date} onChange={e => setPaymentForm(prev => ({ ...prev, payment_date: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Payment Method</label>
                <select value={paymentForm.payment_method} onChange={e => setPaymentForm(prev => ({ ...prev, payment_method: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500">
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="pos">POS</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Reference</label>
                <input type="text" value={paymentForm.reference} onChange={e => setPaymentForm(prev => ({ ...prev, reference: e.target.value }))} placeholder="Transaction reference or cheque number" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Notes</label>
                <textarea value={paymentForm.notes} onChange={e => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="What was this payment for?" rows={2} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPaymentForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleSavePayment} disabled={savingPayment} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm">
                {savingPayment ? 'Saving...' : 'Record Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Modal */}
      {showPaymentHistory && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Payment History</h2>
                <p className="text-xs text-slate-500 mt-0.5">{selectedSupplier.name}</p>
              </div>
              <button onClick={() => setShowPaymentHistory(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-4">
              <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">Total Paid to {selectedSupplier.name}</p>
              <p className="text-2xl font-bold text-teal-700 mt-1">{fmt(getTotalPaid(selectedSupplier.id))}</p>
            </div>
            {getSupplierPayments(selectedSupplier.id).length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">No payments recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {getSupplierPayments(selectedSupplier.id).map(p => (
                  <div key={p.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900">{fmt(p.amount)}</span>
                      <span className="text-xs text-slate-400">{new Date(p.payment_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{METHOD_LABELS[p.payment_method] || p.payment_method}</span>
                      {p.reference && <span className="text-xs text-slate-500">Ref: {p.reference}</span>}
                    </div>
                    {p.notes && <p className="text-xs text-slate-500 mt-1">{p.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Purchase Invoice Modal */}
      {showPurchaseForm && purchaseSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">New Purchase Invoice</h2>
                <p className="text-xs text-slate-500 mt-0.5">From: {purchaseSupplier.name}</p>
              </div>
              <button onClick={() => setShowPurchaseForm(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>

            {purchaseError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{purchaseError}</div>}

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Invoice Number *</label>
                <input type="text" value={purchaseForm.invoice_number} onChange={e => setPurchaseForm(prev => ({ ...prev, invoice_number: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Invoice Date</label>
                <input type="date" value={purchaseForm.invoice_date} onChange={e => setPurchaseForm(prev => ({ ...prev, invoice_date: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Due Date</label>
                <input type="date" value={purchaseForm.due_date} onChange={e => setPurchaseForm(prev => ({ ...prev, due_date: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
              </div>
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100 mb-2">
                <div className="col-span-4">Item / Description</div>
                <div className="col-span-2">Qty</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-1 text-center">VAT</div>
                <div className="col-span-1"></div>
              </div>

              {purchaseItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
                  <div className="col-span-4 relative" ref={activeLineIndex === index ? invRef : null}>
                    <input
                      type="text"
                      value={item.description}
                      onChange={e => {
                        updatePurchaseItem(index, 'description', e.target.value)
                        setInvSearch(e.target.value)
                        setActiveLineIndex(index)
                        setShowInvDropdown(true)
                      }}
                      onFocus={() => {
                        setActiveLineIndex(index)
                        setInvSearch(item.description)
                        setShowInvDropdown(true)
                      }}
                      placeholder="Type or select from inventory"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                    />
                    {showInvDropdown && activeLineIndex === index && inventory.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-40 overflow-y-auto">
                        {filteredInv.length === 0 ? (
                          <div className="px-3 py-2 text-xs text-slate-400">No items match</div>
                        ) : filteredInv.map(inv => (
                          <button key={inv.id} type="button" onClick={() => selectInventoryForPurchase(index, inv)} className="w-full text-left px-3 py-2 hover:bg-purple-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-900 font-medium">{inv.name}</span>
                              <span className="text-xs text-purple-600 font-semibold">₦{inv.unit_price.toLocaleString('en-NG')}</span>
                            </div>
                            <span className="text-xs text-slate-400">{inv.stock} in stock</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <input type="number" value={item.quantity} onChange={e => updatePurchaseItem(index, 'quantity', parseFloat(e.target.value) || 0)} min="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" value={item.unit_price} onChange={e => updatePurchaseItem(index, 'unit_price', parseFloat(e.target.value) || 0)} min="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
                  </div>
                  <div className="col-span-2">
                    <div className="px-2 py-2 text-sm text-slate-700 font-medium">{fmt(item.amount)}</div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => updatePurchaseItem(index, 'vatable', !item.vatable)} className={`w-10 h-5 rounded-full transition-colors relative ${item.vatable ? 'bg-teal-500' : 'bg-slate-200'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.vatable ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => setPurchaseItems(purchaseItems.filter((_, i) => i !== index))} disabled={purchaseItems.length === 1} className="text-slate-300 hover:text-red-400 transition-colors disabled:opacity-30">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={() => setPurchaseItems([...purchaseItems, { description: '', quantity: 1, unit_price: 0, amount: 0, vatable: false, inventory_item_id: null }])} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium mt-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Add Line Item
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Subtotal</span><span className="font-medium">{fmt(purchaseSubtotal)}</span></div>
              {purchaseVAT > 0 && <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Input VAT (7.5%)</span><span className="font-medium text-teal-600">{fmt(purchaseVAT)}</span></div>}
              <div className="flex justify-between font-bold border-t border-slate-200 pt-2 mt-2"><span>Total</span><span className="text-purple-600">{fmt(purchaseTotal)}</span></div>
            </div>

            {inventory.length > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 mb-4">
                <p className="text-xs text-blue-700">Items linked to inventory will automatically update stock quantities when this invoice is saved.</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Notes</label>
              <textarea value={purchaseForm.notes} onChange={e => setPurchaseForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="Any additional notes..." rows={2} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none" />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPurchaseForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleSavePurchase} disabled={savingPurchase} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm">
                {savingPurchase ? 'Saving...' : 'Save Purchase Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
