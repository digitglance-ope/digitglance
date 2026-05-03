'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

type Item = {
  id: string
  name: string
  description: string
  unit_price: number
  cost_price: number
  unit: string
  stock_quantity: number
  created_at: string
}

const UNITS = ['unit', 'piece', 'kg', 'litre', 'metre', 'bag', 'carton', 'pack', 'set', 'hour', 'day', 'month']

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [form, setForm] = useState({ name: '', description: '', unit_price: 0, cost_price: 0, unit: 'unit', stock_quantity: 0 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('inventory').select('*').eq('user_id', user.id).order('name')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setEditItem(null)
    setForm({ name: '', description: '', unit_price: 0, cost_price: 0, unit: 'unit', stock_quantity: 0 })
    setError('')
    setShowForm(true)
  }

  function openEdit(item: Item) {
    setEditItem(item)
    setForm({ name: item.name, description: item.description || '', unit_price: item.unit_price, cost_price: item.cost_price || 0, unit: item.unit, stock_quantity: item.stock_quantity })
    setError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Item name is required.'); return }
    setSaving(true)
    setError('')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (editItem) {
      await supabase.from('inventory').update({ ...form }).eq('id', editItem.id)
    } else {
      await supabase.from('inventory').insert({ ...form, user_id: user.id })
    }
    setSaving(false)
    setShowForm(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this item?')) return
    await supabase.from('inventory').delete().eq('id', id)
    load()
  }

  const fmt = (n: number) => `₦${Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
  const totalStockValue = items.reduce((sum, i) => sum + (i.cost_price || 0) * i.stock_quantity, 0)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
            <p className="text-slate-500 text-sm mt-1">{items.length} items</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Total Stock Value</p>
              <p className="text-sm font-bold text-teal-600">{fmt(totalStockValue)}</p>
            </div>
            <button onClick={openNew} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Item
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 bg-white" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading inventory...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500 text-sm">{search ? 'No items match your search.' : 'No inventory items yet.'}</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Item Name', 'Description', 'Unit', 'Cost Price', 'Selling Price', 'Stock', 'Stock Value', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{item.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 max-w-xs truncate">{item.description || '-'}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.unit}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.cost_price ? fmt(item.cost_price) : '-'}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">{fmt(item.unit_price)}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-semibold ${item.stock_quantity <= 0 ? 'text-red-500' : item.stock_quantity <= 10 ? 'text-yellow-500' : 'text-green-600'}`}>
                        {item.stock_quantity}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{item.cost_price ? fmt(item.cost_price * item.stock_quantity) : '-'}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(item)} className="text-xs text-slate-500 hover:text-teal-600 font-medium">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-xs text-slate-500 hover:text-red-500 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">{editItem ? 'Edit Item' : 'Add Item'}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Item Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Cake Layer" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Cost Price (₦)</label>
                  <input type="number" value={form.cost_price} onChange={e => setForm(p => ({ ...p, cost_price: parseFloat(e.target.value) || 0 }))} min="0" placeholder="What you paid" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Selling Price (₦)</label>
                  <input type="number" value={form.unit_price} onChange={e => setForm(p => ({ ...p, unit_price: parseFloat(e.target.value) || 0 }))} min="0" placeholder="What you charge" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Unit</label>
                  <select value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500">
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Stock Quantity</label>
                  <input type="number" value={form.stock_quantity} onChange={e => setForm(p => ({ ...p, stock_quantity: parseFloat(e.target.value) || 0 }))} min="0" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm">
                {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
