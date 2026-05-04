'use client'

import { useState, useEffect, useCallback } from 'react'
import AppSidebar from '@/components/AppSidebar'
import { createClient } from '@/lib/supabase/client'

interface Category {
  id: string
  name: string
  color: string
  created_at: string
}

interface Product {
  id: string
  category_id: string | null
  name: string
  sku: string | null
  barcode: string | null
  unit: string
  selling_price: number
  cost_price: number
  vat_class: string
  is_active: boolean
  created_at: string
}

interface Branch {
  id: string
  name: string
  is_headquarters: boolean
}

interface Stock {
  id: string
  product_id: string
  branch_id: string
  quantity: number
  reorder_level: number
}

const VAT_CLASS_META: Record<string, { label: string; badge: string }> = {
  standard: { label: 'Standard 7.5%', badge: 'bg-blue-100 text-blue-700' },
  zero:     { label: 'Zero-rated',    badge: 'bg-green-100 text-green-700' },
  exempt:   { label: 'Exempt',        badge: 'bg-amber-100 text-amber-700' },
  nil:      { label: 'Nil',           badge: 'bg-slate-100 text-slate-500' },
}

const UNITS = ['piece', 'kg', 'litre', 'pack', 'box', 'carton', 'dozen', 'bag', 'bottle', 'roll']

const CATEGORY_COLORS = [
  '#64748b', '#0f766e', '#1d4ed8', '#7c3aed',
  '#be185d', '#dc2626', '#ea580c', '#ca8a04',
  '#16a34a', '#0891b2',
]

const EMPTY_PRODUCT = {
  name: '', category_id: '', sku: '', barcode: '',
  unit: 'piece', selling_price: '', cost_price: '',
  vat_class: 'standard', is_active: true,
}

type Tab = 'products' | 'categories' | 'stock'

export default function PosInventoryPage() {
  const supabase = createClient()

  const [ownerId,    setOwnerId]    = useState<string | null>(null)
  const [tab,        setTab]        = useState<Tab>('products')
  const [products,   setProducts]   = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [branches,   setBranches]   = useState<Branch[]>([])
  const [stock,      setStock]      = useState<Stock[]>([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState<string | null>(null)

  const [search,    setSearch]    = useState('')
  const [filterCat, setFilterCat] = useState('')

  // Product modal
  const [productModal,    setProductModal]    = useState<{ open: boolean; editing: Product | null }>({ open: false, editing: null })
  const [productForm,     setProductForm]     = useState<typeof EMPTY_PRODUCT & { is_active: boolean }>({ ...EMPTY_PRODUCT })
  const [productSaving,   setProductSaving]   = useState(false)
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null)

  // Category modal
  const [catModal,    setCatModal]    = useState<{ open: boolean; editing: Category | null }>({ open: false, editing: null })
  const [catForm,     setCatForm]     = useState({ name: '', color: '#64748b' })
  const [catSaving,   setCatSaving]   = useState(false)
  const [deletingCat, setDeletingCat] = useState<string | null>(null)

  // Stock modal
  const [stockModal,  setStockModal]  = useState<{ open: boolean; product: Product | null; branch: Branch | null }>({ open: false, product: null, branch: null })
  const [stockForm,   setStockForm]   = useState({ type: 'set', quantity: '', reorder_level: '' })
  const [stockSaving, setStockSaving] = useState(false)

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_team_member, account_owner_id')
      .eq('id', user.id)
      .single()

    const owner = (profile?.is_team_member && profile.account_owner_id)
      ? profile.account_owner_id
      : user.id

    setOwnerId(owner)

    const [{ data: p }, { data: c }, { data: b }, { data: s }] = await Promise.all([
      supabase.from('pos_products').select('*').eq('account_owner_id', owner).order('name'),
      supabase.from('pos_categories').select('*').eq('account_owner_id', owner).order('name'),
      supabase.from('pos_branches').select('id, name, is_headquarters').eq('account_owner_id', owner).order('created_at'),
      supabase.from('pos_stock').select('*').eq('account_owner_id', owner),
    ])

    setProducts(p ?? [])
    setCategories(c ?? [])
    setBranches(b ?? [])
    setStock(s ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG', { minimumFractionDigits: 0 })}`

  function getStock(productId: string, branchId: string) {
    return stock.find(s => s.product_id === productId && s.branch_id === branchId)
  }

  function totalStock(productId: string) {
    return stock.filter(s => s.product_id === productId).reduce((sum, s) => sum + s.quantity, 0)
  }

  function isLowStock(productId: string) {
    return stock.some(s => s.product_id === productId && s.reorder_level > 0 && s.quantity <= s.reorder_level)
  }

  // ── Product CRUD ─────────────────────────────────────────────

  function openAddProduct() {
    setProductForm({ ...EMPTY_PRODUCT })
    setProductModal({ open: true, editing: null })
    setError(null)
  }

  function openEditProduct(p: Product) {
    setProductForm({
      name:          p.name,
      category_id:   p.category_id ?? '',
      sku:           p.sku ?? '',
      barcode:       p.barcode ?? '',
      unit:          p.unit,
      selling_price: String(p.selling_price),
      cost_price:    String(p.cost_price),
      vat_class:     p.vat_class,
      is_active:     p.is_active,
    })
    setProductModal({ open: true, editing: p })
    setError(null)
  }

  async function saveProduct() {
    if (!productForm.name.trim() || !ownerId) return
    setProductSaving(true)
    setError(null)

    const payload = {
      name:          productForm.name.trim(),
      category_id:   productForm.category_id || null,
      sku:           productForm.sku.trim()      || null,
      barcode:       productForm.barcode.trim()  || null,
      unit:          productForm.unit,
      selling_price: parseFloat(productForm.selling_price as string) || 0,
      cost_price:    parseFloat(productForm.cost_price as string)    || 0,
      vat_class:     productForm.vat_class,
      is_active:     productForm.is_active,
      updated_at:    new Date().toISOString(),
    }

    if (productModal.editing) {
      const { error: err } = await supabase.from('pos_products').update(payload).eq('id', productModal.editing.id)
      if (err) { setError(err.message); setProductSaving(false); return }
    } else {
      const { error: err } = await supabase.from('pos_products').insert({ ...payload, account_owner_id: ownerId })
      if (err) { setError(err.message); setProductSaving(false); return }
    }

    setProductModal({ open: false, editing: null })
    setProductSaving(false)
    load()
  }

  async function toggleProduct(p: Product) {
    await supabase.from('pos_products').update({ is_active: !p.is_active }).eq('id', p.id)
    load()
  }

  async function deleteProduct(id: string) {
    const { error: err } = await supabase.from('pos_products').delete().eq('id', id)
    if (err) { setError(err.message); return }
    setDeletingProduct(null)
    load()
  }

  // ── Category CRUD ────────────────────────────────────────────

  function openAddCategory() {
    setCatForm({ name: '', color: '#64748b' })
    setCatModal({ open: true, editing: null })
    setError(null)
  }

  function openEditCategory(c: Category) {
    setCatForm({ name: c.name, color: c.color })
    setCatModal({ open: true, editing: c })
    setError(null)
  }

  async function saveCategory() {
    if (!catForm.name.trim() || !ownerId) return
    setCatSaving(true)
    setError(null)

    if (catModal.editing) {
      const { error: err } = await supabase
        .from('pos_categories')
        .update({ name: catForm.name.trim(), color: catForm.color })
        .eq('id', catModal.editing.id)
      if (err) { setError(err.message); setCatSaving(false); return }
    } else {
      const { error: err } = await supabase
        .from('pos_categories')
        .insert({ account_owner_id: ownerId, name: catForm.name.trim(), color: catForm.color })
      if (err) { setError(err.message); setCatSaving(false); return }
    }

    setCatModal({ open: false, editing: null })
    setCatSaving(false)
    load()
  }

  async function deleteCategory(id: string) {
    const { error: err } = await supabase.from('pos_categories').delete().eq('id', id)
    if (err) { setError(err.message); return }
    setDeletingCat(null)
    load()
  }

  // ── Stock adjustment ─────────────────────────────────────────

  function openStockAdjust(product: Product, branch: Branch) {
    const existing = getStock(product.id, branch.id)
    setStockForm({
      type:          'set',
      quantity:      existing ? String(existing.quantity) : '0',
      reorder_level: existing ? String(existing.reorder_level) : '0',
    })
    setStockModal({ open: true, product, branch })
    setError(null)
  }

  async function saveStockAdjust() {
    const { product, branch } = stockModal
    if (!product || !branch || !ownerId) return
    setStockSaving(true)
    setError(null)

    const qty     = parseFloat(stockForm.quantity)      || 0
    const reorder = parseFloat(stockForm.reorder_level) || 0
    const existing = getStock(product.id, branch.id)

    let newQty = qty
    if (stockForm.type === 'add')    newQty = (existing?.quantity ?? 0) + qty
    if (stockForm.type === 'remove') newQty = Math.max(0, (existing?.quantity ?? 0) - qty)

    if (existing) {
      const { error: err } = await supabase
        .from('pos_stock')
        .update({ quantity: newQty, reorder_level: reorder, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (err) { setError(err.message); setStockSaving(false); return }
    } else {
      const { error: err } = await supabase
        .from('pos_stock')
        .insert({ account_owner_id: ownerId, product_id: product.id, branch_id: branch.id, quantity: newQty, reorder_level: reorder })
      if (err) { setError(err.message); setStockSaving(false); return }
    }

    await supabase.from('pos_stock_movements').insert({
      account_owner_id: ownerId,
      branch_id:        branch.id,
      product_id:       product.id,
      type:             'adjustment',
      quantity_in:      stockForm.type !== 'remove' ? newQty : 0,
      quantity_out:     stockForm.type === 'remove'  ? qty   : 0,
      running_balance:  newQty,
      created_by:       ownerId,
    })

    setStockModal({ open: false, product: null, branch: null })
    setStockSaving(false)
    load()
  }

  const filteredProducts = products.filter(p => {
    const s = search.toLowerCase()
    const matchSearch = !s ||
      p.name.toLowerCase().includes(s) ||
      (p.sku     ?? '').toLowerCase().includes(s) ||
      (p.barcode ?? '').includes(s)
    const matchCat = !filterCat || p.category_id === filterCat
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
            <p className="text-slate-500 text-sm mt-1">Products, categories, and stock levels per branch</p>
          </div>
          {tab === 'products' && (
            <button
              onClick={openAddProduct}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          )}
          {tab === 'categories' && (
            <button
              onClick={openAddCategory}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          {(['products', 'categories', 'stock'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t === 'stock' ? 'Stock Levels' : t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'products' && products.length > 0 && (
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${tab === 'products' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {products.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 ml-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-slate-400 text-sm py-8">Loading inventory…</div>
        ) : (
          <>

            {/* ── PRODUCTS TAB ────────────────────── */}
            {tab === 'products' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <div className="relative flex-1 max-w-sm">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by name, SKU, or barcode…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterCat}
                    onChange={e => setFilterCat(e.target.value)}
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">
                      {products.length === 0 ? 'No products yet' : 'No products match your search'}
                    </p>
                    <p className="text-xs text-slate-500 mb-4">
                      {products.length === 0
                        ? 'Add your first product to start selling at the POS terminal.'
                        : 'Try a different search term or category filter.'}
                    </p>
                    {products.length === 0 && (
                      <button onClick={openAddProduct} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                        Add your first product →
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3 uppercase tracking-wider">Product</th>
                          <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Category</th>
                          <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Selling Price</th>
                          <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Cost Price</th>
                          <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">VAT</th>
                          <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Stock</th>
                          <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredProducts.map(p => {
                          const cat     = categories.find(c => c.id === p.category_id)
                          const vatMeta = VAT_CLASS_META[p.vat_class] ?? VAT_CLASS_META.standard
                          const totalQty = totalStock(p.id)
                          const low      = isLowStock(p.id)
                          return (
                            <tr key={p.id} className="hover:bg-slate-50/50">
                              <td className="px-5 py-3.5">
                                <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {[p.sku && `SKU: ${p.sku}`, p.barcode && `Barcode: ${p.barcode}`, p.unit].filter(Boolean).join(' · ')}
                                </p>
                              </td>
                              <td className="px-4 py-3.5">
                                {cat ? (
                                  <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                                    {cat.name}
                                  </span>
                                ) : <span className="text-xs text-slate-400">—</span>}
                              </td>
                              <td className="px-4 py-3.5 text-sm font-semibold text-slate-900">{fmt(p.selling_price)}</td>
                              <td className="px-4 py-3.5 text-sm text-slate-600">
                                {p.cost_price > 0 ? fmt(p.cost_price) : <span className="text-slate-400">—</span>}
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${vatMeta.badge}`}>
                                  {vatMeta.label}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-1.5">
                                  {low && (
                                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  )}
                                  <span className={`text-sm font-medium ${low ? 'text-red-600' : 'text-slate-700'}`}>
                                    {totalQty}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {p.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-3 justify-end whitespace-nowrap">
                                  <button onClick={() => openEditProduct(p)} className="text-xs text-slate-500 hover:text-slate-900 font-medium">Edit</button>
                                  <button
                                    onClick={() => toggleProduct(p)}
                                    className={`text-xs font-medium ${p.is_active ? 'text-slate-400 hover:text-amber-600' : 'text-slate-400 hover:text-green-600'}`}
                                  >
                                    {p.is_active ? 'Deactivate' : 'Activate'}
                                  </button>
                                  {deletingProduct === p.id ? (
                                    <span className="flex items-center gap-1.5 text-xs">
                                      <span className="text-red-600 font-medium">Delete?</span>
                                      <button onClick={() => deleteProduct(p.id)} className="font-bold text-red-600 hover:text-red-700">Yes</button>
                                      <button onClick={() => setDeletingProduct(null)} className="text-slate-500">No</button>
                                    </span>
                                  ) : (
                                    <button onClick={() => setDeletingProduct(p.id)} className="text-xs text-slate-400 hover:text-red-500 font-medium">Delete</button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── CATEGORIES TAB ──────────────────── */}
            {tab === 'categories' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                {categories.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">No categories yet</p>
                    <p className="text-xs text-slate-500 mb-4">Categories help organise your products at the terminal.</p>
                    <button onClick={openAddCategory} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      Add your first category →
                    </button>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3 uppercase tracking-wider">Category</th>
                        <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Products</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {categories.map(c => {
                        const count = products.filter(p => p.category_id === c.id).length
                        return (
                          <tr key={c.id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                                <span className="text-sm font-semibold text-slate-900">{c.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">{count} product{count !== 1 ? 's' : ''}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3 justify-end whitespace-nowrap">
                                <button onClick={() => openEditCategory(c)} className="text-xs text-slate-500 hover:text-slate-900 font-medium">Edit</button>
                                {deletingCat === c.id ? (
                                  <span className="flex items-center gap-1.5 text-xs">
                                    <span className="text-red-600 font-medium">Delete?</span>
                                    <button onClick={() => deleteCategory(c.id)} className="font-bold text-red-600 hover:text-red-700">Yes</button>
                                    <button onClick={() => setDeletingCat(null)} className="text-slate-500">No</button>
                                  </span>
                                ) : (
                                  <button onClick={() => setDeletingCat(c.id)} className="text-xs text-slate-400 hover:text-red-500 font-medium">Delete</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ── STOCK TAB ───────────────────────── */}
            {tab === 'stock' && (
              <div>
                {branches.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl px-6 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-900 mb-1">No branches configured</p>
                    <p className="text-xs text-slate-500">Add branches in POS Settings before managing stock.</p>
                  </div>
                ) : products.filter(p => p.is_active).length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl px-6 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-900 mb-1">No active products</p>
                    <p className="text-xs text-slate-500">Add products first, then set stock levels here.</p>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Click any stock number to adjust quantity and reorder level per branch.</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3 uppercase tracking-wider">Product</th>
                            {branches.map(b => (
                              <th key={b.id} className="text-center text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider whitespace-nowrap">
                                {b.name}{b.is_headquarters && <span className="ml-1 text-teal-600">(HQ)</span>}
                              </th>
                            ))}
                            <th className="text-center text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {products.filter(p => p.is_active).map(p => {
                            const total = totalStock(p.id)
                            const low   = isLowStock(p.id)
                            return (
                              <tr key={p.id} className="hover:bg-slate-50/50">
                                <td className="px-5 py-3.5">
                                  <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                                  {p.sku && <p className="text-xs text-slate-400">{p.sku}</p>}
                                </td>
                                {branches.map(b => {
                                  const s   = getStock(p.id, b.id)
                                  const qty = s?.quantity ?? 0
                                  const branchLow = s ? qty <= s.reorder_level && s.reorder_level > 0 : false
                                  return (
                                    <td key={b.id} className="px-4 py-3.5 text-center">
                                      <button
                                        onClick={() => openStockAdjust(p, b)}
                                        className={`inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                                          branchLow
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'
                                            : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-slate-200'
                                        }`}
                                      >
                                        {qty}
                                      </button>
                                    </td>
                                  )
                                })}
                                <td className="px-4 py-3.5 text-center">
                                  <span className={`text-sm font-bold ${low ? 'text-red-600' : 'text-slate-900'}`}>
                                    {total}
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── PRODUCT MODAL ───────────────────────────── */}
      {productModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-5">
              {productModal.editing ? 'Edit Product' : 'Add Product'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Coca-Cola 35cl, Indomie Noodles"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={e => setProductForm(f => ({ ...f, category_id: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">No category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unit</label>
                  <select
                    value={productForm.unit}
                    onChange={e => setProductForm(f => ({ ...f, unit: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">SKU <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={e => setProductForm(f => ({ ...f, sku: e.target.value }))}
                    placeholder="e.g. COKE-35CL"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Barcode <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={productForm.barcode}
                    onChange={e => setProductForm(f => ({ ...f, barcode: e.target.value }))}
                    placeholder="Scan or type barcode"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Selling Price (₦) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.selling_price}
                    onChange={e => setProductForm(f => ({ ...f, selling_price: e.target.value }))}
                    placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cost Price (₦) <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.cost_price}
                    onChange={e => setProductForm(f => ({ ...f, cost_price: e.target.value }))}
                    placeholder="0.00"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">VAT Class</label>
                <select
                  value={productForm.vat_class}
                  onChange={e => setProductForm(f => ({ ...f, vat_class: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="standard">Standard — 7.5% VAT applied</option>
                  <option value="zero">Zero-rated — 0% VAT, VAT-able supply</option>
                  <option value="exempt">Exempt — not a VAT supply</option>
                  <option value="nil">Nil — out of scope</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setProductForm(f => ({ ...f, is_active: !f.is_active }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${productForm.is_active ? 'bg-green-500' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${productForm.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-sm text-slate-700 font-medium">
                  {productForm.is_active ? 'Active — visible at terminal' : 'Inactive — hidden at terminal'}
                </span>
              </div>
            </div>

            {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveProduct}
                disabled={productSaving || !productForm.name.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                {productSaving ? 'Saving…' : productModal.editing ? 'Save Changes' : 'Add Product'}
              </button>
              <button
                onClick={() => setProductModal({ open: false, editing: null })}
                className="flex-1 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CATEGORY MODAL ──────────────────────────── */}
      {catModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5">
              {catModal.editing ? 'Edit Category' : 'Add Category'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category Name *</label>
                <input
                  type="text"
                  value={catForm.name}
                  onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && saveCategory()}
                  placeholder="e.g. Beverages, Snacks, Electronics"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Colour</label>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORY_COLORS.map(col => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setCatForm(f => ({ ...f, color: col }))}
                      className={`w-7 h-7 rounded-full transition-transform ${catForm.color === col ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'}`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveCategory}
                disabled={catSaving || !catForm.name.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                {catSaving ? 'Saving…' : catModal.editing ? 'Save Changes' : 'Add Category'}
              </button>
              <button
                onClick={() => setCatModal({ open: false, editing: null })}
                className="flex-1 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STOCK ADJUSTMENT MODAL ──────────────────── */}
      {stockModal.open && stockModal.product && stockModal.branch && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-1">Adjust Stock</h3>
            <p className="text-xs text-slate-500 mb-5">
              {stockModal.product.name} · {stockModal.branch.name}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Adjustment Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'set',    label: 'Set to' },
                    { value: 'add',    label: 'Add' },
                    { value: 'remove', label: 'Remove' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStockForm(f => ({ ...f, type: opt.value }))}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-colors ${
                        stockForm.type === opt.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {stockForm.type === 'set' ? 'New Quantity' : stockForm.type === 'add' ? 'Quantity to Add' : 'Quantity to Remove'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={stockForm.quantity}
                  onChange={e => setStockForm(f => ({ ...f, quantity: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Reorder Level <span className="text-slate-400 font-normal">(alert when stock falls below this)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={stockForm.reorder_level}
                  onChange={e => setStockForm(f => ({ ...f, reorder_level: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveStockAdjust}
                disabled={stockSaving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                {stockSaving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={() => setStockModal({ open: false, product: null, branch: null })}
                className="flex-1 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
