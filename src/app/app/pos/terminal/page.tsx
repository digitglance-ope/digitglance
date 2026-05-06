'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'
import { useRole } from '@/hooks/useRole'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Branch   { id: string; name: string; is_hq: boolean }
interface Terminal { id: string; name: string; branch_id: string; is_active: boolean }
interface Category { id: string; name: string }

interface Product {
  id: string; category_id: string | null; name: string
  sku: string | null; barcode: string | null; unit: string
  selling_price: number; cost_price: number
  vat_class: 'standard' | 'zero' | 'exempt' | 'nil'
  is_active: boolean
}

interface Shift {
  id: string; branch_id: string; terminal_id: string
  opening_float: number; cashier_name: string | null; opened_at: string
}

interface CartItem { product: Product; quantity: number; discount: number }

interface PaymentEntry { method: 'cash' | 'card' | 'transfer'; amount: number }

interface SaleReceipt {
  reference: string; created_at: string; branchName: string
  items: CartItem[]; subtotal: number; vatAmount: number
  discountAmount: number; total: number; payments: PaymentEntry[]; change: number
  vatRate: number
}

interface PosSettings { vat_rate: number; receipt_footer: string | null }

interface ShiftSummary {
  cashSales: number
  cardSales: number
  transferSales: number
  totalSales: number
  expectedCash: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const PAYMENT_METHODS: { key: PaymentEntry['method']; label: string }[] = [
  { key: 'cash',     label: 'Cash'     },
  { key: 'card',     label: 'Card'     },
  { key: 'transfer', label: 'Transfer' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function PosTerminalPage() {
  const supabase = createClient()

  const [ownerId,     setOwnerId]     = useState<string | null>(null)
  const [cashierName, setCashierName] = useState('')

  const [branches,   setBranches]   = useState<Branch[]>([])
  const [terminals,  setTerminals]  = useState<Terminal[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [products,   setProducts]   = useState<Product[]>([])
  const [stockMap,   setStockMap]   = useState<Record<string, number>>({})
  const [posSettings, setPosSettings] = useState<PosSettings>({ vat_rate: 7.5, receipt_footer: null })

  const [branchId,   setBranchId]   = useState<string | null>(null)
  const [terminalId, setTerminalId] = useState<string | null>(null)
  const [shift,      setShift]      = useState<Shift | null>(null)

  const [search,    setSearch]    = useState('')
  const [catFilter, setCatFilter] = useState<string | null>(null)
  const [cart,      setCart]      = useState<CartItem[]>([])

  const [shiftPanel,     setShiftPanel]     = useState(false)
  const [openingFloat,   setOpeningFloat]   = useState('')
  const [closingBalance, setClosingBalance] = useState('')
  const [shiftClosing,   setShiftClosing]   = useState(false)

  const [payModal,  setPayModal]  = useState(false)
  const [payments,  setPayments]  = useState<PaymentEntry[]>([])
  const [payMethod, setPayMethod] = useState<PaymentEntry['method']>('cash')
  const [payAmount, setPayAmount] = useState('')

  const [receipt, setReceipt] = useState<SaleReceipt | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)

  const [showCart,         setShowCart]        = useState(false)
  const [shiftSummary,     setShiftSummary]    = useState<ShiftSummary | null>(null)
  const [discountApproval, setDiscountApproval] = useState<{ pid: string; val: number } | null>(null)

  const searchRef = useRef<HTMLInputElement>(null)
  const { canCreate, role } = useRole()

  // ─── Load master data
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_team_member, account_owner_id, full_name')
        .eq('id', user.id)
        .single()

      const owner = (profile?.is_team_member && profile.account_owner_id)
        ? profile.account_owner_id : user.id
      setOwnerId(owner)
      setCashierName(profile?.full_name || user.email?.split('@')[0] || 'Cashier')

      const [{ data: b }, { data: t }, { data: cats }, { data: prods }, { data: s }] = await Promise.all([
        supabase.from('pos_branches').select('*').eq('account_owner_id', owner).order('created_at'),
        supabase.from('pos_terminals').select('*').eq('account_owner_id', owner).eq('is_active', true).order('created_at'),
        supabase.from('pos_categories').select('id, name').eq('account_owner_id', owner).order('name'),
        supabase.from('pos_products').select('*').eq('account_owner_id', owner).eq('is_active', true).order('name'),
        supabase.from('pos_settings').select('*').eq('account_owner_id', owner).maybeSingle(),
      ])

      setBranches(b ?? [])
      setTerminals(t ?? [])
      setCategories(cats ?? [])
      setProducts(prods ?? [])
      if (s) setPosSettings({ vat_rate: s.vat_rate ?? 7.5, receipt_footer: s.receipt_footer ?? null })

      if (b && b.length > 0) {
        const hq = (b as Branch[]).find(br => br.is_hq) ?? b[0]
        setBranchId(hq.id)

        // Load stock for HQ
        const { data: st } = await supabase
          .from('pos_stock').select('product_id, quantity')
          .eq('account_owner_id', owner).eq('branch_id', hq.id)
        const map: Record<string, number> = {}
        st?.forEach((row: { product_id: string; quantity: number }) => { map[row.product_id] = row.quantity })
        setStockMap(map)

        // Auto-select first terminal for this branch
        const bt = t ? (t as Terminal[]).find(tm => tm.branch_id === hq.id) : null
        if (bt) {
          setTerminalId(bt.id)
          const { data: openShift } = await supabase
            .from('pos_shifts').select('*')
            .eq('account_owner_id', owner).eq('terminal_id', bt.id).eq('status', 'open')
            .maybeSingle()
          if (openShift) setShift(openShift)
          else setShiftPanel(true)
        }
      }
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load() }, [load])

  async function loadStock(owner: string, bid: string) {
    const { data } = await supabase.from('pos_stock')
      .select('product_id, quantity')
      .eq('account_owner_id', owner).eq('branch_id', bid)
    const map: Record<string, number> = {}
    data?.forEach((row: { product_id: string; quantity: number }) => { map[row.product_id] = row.quantity })
    setStockMap(map)
  }

  // ─── Branch/terminal switch
  async function switchBranch(bid: string) {
    setBranchId(bid)
    setTerminalId(null)
    setShift(null)
    setCart([])
    if (ownerId) loadStock(ownerId, bid)
  }

  async function switchTerminal(tid: string) {
    setTerminalId(tid)
    setCart([])
    if (!ownerId) return
    const { data } = await supabase.from('pos_shifts').select('*')
      .eq('account_owner_id', ownerId).eq('terminal_id', tid).eq('status', 'open').maybeSingle()
    if (data) { setShift(data); setShiftPanel(false) }
    else { setShift(null); setShiftPanel(true) }
  }

  // ─── Shift operations
  async function openShift() {
    if (!ownerId || !branchId || !terminalId) return
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('pos_shifts').insert({
      account_owner_id: ownerId, branch_id: branchId, terminal_id: terminalId,
      opening_float: parseFloat(openingFloat) || 0,
      cashier_name: cashierName, status: 'open',
    }).select().single()
    if (data) {
      setShift(data); setShiftPanel(false); setOpeningFloat('')
      setTimeout(() => searchRef.current?.focus(), 100)

      await supabase.from('audit_logs').insert({
        user_id: user?.id,
        account_owner_id: ownerId,
        user_email: user?.email,
        action: 'POS Shift Opened',
        resource: 'POS Terminal',
        details: `Shift opened on terminal ${terminalName} — ${branchName}. Opening float: ₦${parseFloat(openingFloat) || 0}. Cashier: ${cashierName}.`,
      })
    }
  }

  async function openCloseShiftModal() {
    setShiftClosing(true)
    setShiftPanel(true)
    setShiftSummary(null)
    if (!shift || !ownerId) return
    const { data: shiftSales } = await supabase
      .from('pos_sales').select('id').eq('shift_id', shift.id).eq('status', 'completed')
    const saleIds = (shiftSales ?? []).map((s: { id: string }) => s.id)
    if (saleIds.length === 0) {
      setShiftSummary({ cashSales: 0, cardSales: 0, transferSales: 0, totalSales: 0, expectedCash: shift.opening_float ?? 0 })
      return
    }
    const { data: pData } = await supabase
      .from('pos_payments').select('method, amount').in('sale_id', saleIds)
    const cashSales     = (pData ?? []).filter(p => p.method === 'cash').reduce((s: number, p: { amount: number }) => s + p.amount, 0)
    const cardSales     = (pData ?? []).filter(p => p.method === 'card').reduce((s: number, p: { amount: number }) => s + p.amount, 0)
    const transferSales = (pData ?? []).filter(p => p.method === 'transfer').reduce((s: number, p: { amount: number }) => s + p.amount, 0)
    setShiftSummary({
      cashSales, cardSales, transferSales,
      totalSales: cashSales + cardSales + transferSales,
      expectedCash: (shift.opening_float ?? 0) + cashSales,
    })
  }

  async function closeShift() {
    if (!shift || !ownerId) return
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('pos_shifts').update({
      status: 'closed', closed_at: new Date().toISOString(),
      closing_balance: parseFloat(closingBalance) || null,
    }).eq('id', shift.id)

    await supabase.from('audit_logs').insert({
      user_id: user?.id,
      account_owner_id: ownerId,
      user_email: user?.email,
      action: 'POS Shift Closed',
      resource: 'POS Terminal',
      details: `Shift closed on terminal ${terminalName} — ${branchName}. Closing balance: ₦${parseFloat(closingBalance) || 0}. Cashier: ${cashierName}.`,
    })

    setShift(null); setShiftPanel(false); setShiftClosing(false)
    setCart([]); setClosingBalance('')
  }

  // ─── Cart
  function addToCart(p: Product) {
    const stock = stockMap[p.id] ?? 0
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === p.id)
      if (idx >= 0) {
        if (prev[idx].quantity >= stock) return prev
        return prev.map((i, j) => j === idx ? { ...i, quantity: i.quantity + 1 } : i)
      }
      if (stock <= 0) return prev
      return [...prev, { product: p, quantity: 1, discount: 0 }]
    })
  }

  function setQty(pid: string, qty: number) {
    if (qty <= 0) { setCart(prev => prev.filter(i => i.product.id !== pid)); return }
    const stock = stockMap[pid] ?? 0
    setCart(prev => prev.map(i => i.product.id === pid ? { ...i, quantity: Math.min(qty, stock) } : i))
  }

  const DISCOUNT_THRESHOLD = 0.20

  function applyDiscount(pid: string, val: number) {
    setCart(prev => prev.map(i => {
      if (i.product.id !== pid) return i
      const maxDiscount = i.product.selling_price * i.quantity
      return { ...i, discount: Math.min(Math.max(0, val), maxDiscount) }
    }))
  }

  function setDiscount(pid: string, val: number) {
    const item = cart.find(i => i.product.id === pid)
    if (!item) return
    const lineTotal = item.product.selling_price * item.quantity
    if (role === 'staff' && val / lineTotal > DISCOUNT_THRESHOLD) {
      setDiscountApproval({ pid, val })
      return
    }
    applyDiscount(pid, val)
  }

  // ─── Calculations
  const vatRate = posSettings.vat_rate / 100

  function itemVat(item: CartItem) {
    if (item.product.vat_class !== 'standard') return 0
    return (item.product.selling_price * item.quantity - item.discount) * vatRate
  }

  function itemTotal(item: CartItem) {
    return item.product.selling_price * item.quantity - item.discount + itemVat(item)
  }

  const subtotal   = cart.reduce((s, i) => s + i.product.selling_price * i.quantity, 0)
  const totalDisc  = cart.reduce((s, i) => s + i.discount, 0)
  const totalVat   = cart.reduce((s, i) => s + itemVat(i), 0)
  const orderTotal = cart.reduce((s, i) => s + itemTotal(i), 0)

  // ─── Payments
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0)
  const change    = Math.max(0, totalPaid - orderTotal)
  const remaining = Math.max(0, orderTotal - totalPaid)

  function addPayment() {
    const amt = parseFloat(payAmount)
    if (!amt || amt <= 0) return
    setPayments(prev => {
      const idx = prev.findIndex(p => p.method === payMethod)
      if (idx >= 0) return prev.map((p, j) => j === idx ? { ...p, amount: p.amount + amt } : p)
      return [...prev, { method: payMethod, amount: amt }]
    })
    setPayAmount('')
  }

  function openPayModal() {
    setPayments([{ method: 'cash', amount: Math.round(orderTotal * 100) / 100 }])
    setPayMethod('cash'); setPayAmount(''); setPayModal(true)
  }

  // ─── Complete sale
  async function completeSale() {
    if (!ownerId || !shift || !branchId || !terminalId) return
    if (cart.length === 0 || totalPaid < orderTotal) return
    setSaving(true)
    try {
      const reference = `POS-${Date.now()}`
      const { data: sale, error } = await supabase.from('pos_sales').insert({
        account_owner_id: ownerId, shift_id: shift.id,
        branch_id: branchId, terminal_id: terminalId,
        subtotal: subtotal - totalDisc, vat_amount: totalVat,
        discount_amount: totalDisc, total: orderTotal,
        payment_method: payments[0]?.method ?? 'cash',
        status: 'completed', reference,
      }).select().single()

      if (error || !sale) throw error ?? new Error('Sale insert failed')

      await supabase.from('pos_sale_items').insert(
        cart.map(item => ({
          account_owner_id: ownerId, sale_id: sale.id,
          product_id: item.product.id, quantity: item.quantity,
          unit_price: item.product.selling_price, cost_price: item.product.cost_price,
          vat_class: item.product.vat_class, vat_amount: itemVat(item),
          discount_amount: item.discount, line_total: itemTotal(item),
        }))
      )

      await supabase.from('pos_payments').insert(
        payments.map(p => ({ account_owner_id: ownerId, sale_id: sale.id, method: p.method, amount: p.amount }))
      )

      // Atomic stock deduction via DB function — prevents overselling under concurrent sales
      for (const item of cart) {
        await supabase.rpc('deduct_pos_stock', {
          p_owner_id: ownerId,
          p_product_id: item.product.id,
          p_branch_id: branchId,
          p_quantity: item.quantity,
          p_sale_id: sale.id,
        })
      }

      // Audit log for the completed sale
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('audit_logs').insert({
        user_id: user?.id,
        account_owner_id: ownerId,
        user_email: user?.email,
        action: 'POS Sale Completed',
        resource: 'POS Terminal',
        details: `Sale ${reference} completed. Total: ${fmt(orderTotal)}. Items: ${cart.length}. Payment: ${payments.map(p => `${p.method} ₦${p.amount}`).join(', ')}. Branch: ${branchName}.`,
      })

      setReceipt({
        reference, created_at: new Date().toISOString(),
        branchName: branches.find(b => b.id === branchId)?.name ?? '',
        items: [...cart], subtotal, vatAmount: totalVat,
        discountAmount: totalDisc, total: orderTotal,
        payments: [...payments], change, vatRate: posSettings.vat_rate,
      })

      setCart([]); setPayments([]); setPayModal(false)
      loadStock(ownerId, branchId)
    } catch (e) {
      console.error('completeSale error', e)
    } finally {
      setSaving(false)
    }
  }

  // ─── Filtered products
  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const mQ = !q || p.name.toLowerCase().includes(q) || (p.sku ?? '').toLowerCase().includes(q) || (p.barcode ?? '').includes(q)
    const mC = !catFilter || p.category_id === catFilter
    return mQ && mC
  })

  const branchTerminals = terminals.filter(t => t.branch_id === branchId)
  const branchName   = branches.find(b => b.id === branchId)?.name ?? '—'
  const terminalName = terminals.find(t => t.id === terminalId)?.name ?? '—'

  // ─── Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <AppSidebar product="pos" />
        <main className="md:ml-64 flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-sm">Loading terminal…</p>
        </main>
      </div>
    )
  }

  // ─── No branches
  if (branches.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <AppSidebar product="pos" />
        <main className="md:ml-64 flex-1 flex items-center justify-center p-8">
          <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-sm text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">No branches configured</h2>
            <p className="text-sm text-slate-500 mb-5">Add at least one branch and terminal in Settings before using the terminal.</p>
            <a href="/app/pos/settings" className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              Go to Settings
            </a>
          </div>
        </main>
      </div>
    )
  }

  // ─── Main render
  return (
    <div className="bg-slate-100 flex h-screen overflow-hidden">
      <AppSidebar product="pos" />

      <div className="md:ml-64 flex-1 flex flex-col overflow-hidden">

        {/* Top bar — branch/terminal selector + shift status */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shrink-0 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Branch chips */}
            <div className="flex items-center gap-1">
              {branches.map(b => (
                <button key={b.id} onClick={() => switchBranch(b.id)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${branchId === b.id ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                  {b.name}
                </button>
              ))}
            </div>
            <span className="text-slate-200">|</span>
            {/* Terminal chips */}
            <div className="flex items-center gap-1">
              {branchTerminals.length === 0
                ? <span className="text-xs text-slate-400">No terminals — add in Settings</span>
                : branchTerminals.map(t => (
                  <button key={t.id} onClick={() => switchTerminal(t.id)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${terminalId === t.id ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                    {t.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {shift ? (
              <>
                <span className="text-xs text-slate-500 hidden sm:block">
                  <span className="font-medium text-slate-700">{cashierName}</span>
                  {' · '}Shift {new Date(shift.opened_at).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button onClick={openCloseShiftModal}
                  className="text-xs font-medium text-red-500 hover:text-red-700 px-2.5 py-1 rounded-md hover:bg-red-50 transition-colors">
                  Close Shift
                </button>
              </>
            ) : (
              <button onClick={() => { setShiftClosing(false); setShiftPanel(true) }}
                disabled={!terminalId}
                className="text-xs font-semibold bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                Open Shift
              </button>
            )}
          </div>
        </div>

        {/* Guard: no terminal or no shift */}
        {(!terminalId || !shift) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">
                {!terminalId ? 'Select a terminal above to begin' : 'Open a shift to start selling'}
              </p>
              {terminalId && !shift && (
                <button onClick={() => { setShiftClosing(false); setShiftPanel(true) }}
                  className="mt-4 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                  Open Shift
                </button>
              )}
            </div>
          </div>
        )}

        {/* Two-pane terminal */}
        {terminalId && shift && (
          <div className="flex flex-1 overflow-hidden relative">

            {/* Left: catalogue */}
            <div className={`flex-1 flex flex-col overflow-hidden ${showCart ? 'hidden md:flex' : ''}`}>
              {/* Search + category filter */}
              <div className="bg-white border-b border-slate-200 p-3 shrink-0">
                <input ref={searchRef} type="text"
                  placeholder="Search product name, SKU, or barcode…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <button onClick={() => setCatFilter(null)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${!catFilter ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    All
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => setCatFilter(cat.id === catFilter ? null : cat.id)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${catFilter === cat.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product grid */}
              <div className="flex-1 overflow-y-auto p-3">
                {filtered.length === 0 ? (
                  <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
                    {search ? `No products matching "${search}"` : 'No active products'}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                    {filtered.map(p => {
                      const stock = stockMap[p.id] ?? 0
                      const inCart = cart.find(i => i.product.id === p.id)
                      const outOfStock = stock <= 0
                      return (
                        <button key={p.id} onClick={() => addToCart(p)} disabled={outOfStock}
                          className={`relative text-left bg-white border rounded-xl p-3 transition-all ${
                            outOfStock ? 'opacity-50 cursor-not-allowed border-slate-200'
                            : inCart ? 'border-blue-400 ring-2 ring-blue-100 hover:shadow-sm'
                            : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}>
                          {inCart && (
                            <span className="absolute top-2 right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                              {inCart.quantity}
                            </span>
                          )}
                          <p className="text-xs font-semibold text-slate-800 mb-1 pr-6 leading-tight line-clamp-2">{p.name}</p>
                          {p.sku && <p className="text-xs text-slate-400 mb-1 truncate">{p.sku}</p>}
                          <p className="text-sm font-bold text-blue-600">{fmt(p.selling_price)}</p>
                          <p className={`text-xs mt-0.5 ${outOfStock ? 'text-red-400' : stock <= 5 ? 'text-amber-500' : 'text-slate-400'}`}>
                            {outOfStock ? 'Out of stock' : `${stock} left`}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right: cart */}
            <div className={`${showCart ? 'absolute inset-0 z-10 flex md:relative md:inset-auto' : 'hidden md:flex'} w-full md:w-80 bg-white border-l border-slate-200 flex-col shrink-0`}>
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowCart(false)} className="md:hidden text-slate-400 hover:text-slate-600 -ml-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <h2 className="text-sm font-bold text-slate-900">Cart {cart.length > 0 && <span className="font-normal text-slate-400">({cart.length})</span>}</h2>
                </div>
                {cart.length > 0 && (
                  <button onClick={() => setCart([])} className="text-xs text-red-400 hover:text-red-600 transition-colors">Clear</button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-300">
                    <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-xs">Add products to cart</span>
                  </div>
                ) : (
                  <div className="p-2 space-y-1.5">
                    {cart.map(item => (
                      <div key={item.product.id} className="bg-slate-50 rounded-lg p-2.5">
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <p className="text-xs font-semibold text-slate-800 leading-tight flex-1">{item.product.name}</p>
                          <button onClick={() => setCart(prev => prev.filter(i => i.product.id !== item.product.id))}
                            className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-200 rounded-md bg-white">
                            <button onClick={() => setQty(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:bg-slate-100 rounded-l-md font-bold">−</button>
                            <span className="w-7 text-center text-xs font-semibold text-slate-900">{item.quantity}</span>
                            <button onClick={() => setQty(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:bg-slate-100 rounded-r-md font-bold">+</button>
                          </div>
                          <span className="text-xs text-slate-400 flex-1">{fmt(item.product.selling_price)}</span>
                          <span className="text-xs font-bold text-slate-900">{fmt(itemTotal(item))}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-slate-400">Disc ₦</span>
                          <input type="number" min="0"
                            value={item.discount || ''}
                            onChange={e => setDiscount(item.product.id, parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className="w-20 text-xs border border-slate-200 rounded px-1.5 py-0.5 text-right focus:outline-none focus:ring-1 focus:ring-blue-400" />
                          {item.product.vat_class === 'standard' && itemVat(item) > 0 && (
                            <span className="ml-auto text-xs text-slate-400">+{fmt(itemVat(item))} VAT</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary + charge */}
              <div className="border-t border-slate-200 p-3 shrink-0">
                <div className="space-y-1 mb-3 text-xs">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                  {totalDisc > 0 && <div className="flex justify-between text-red-500"><span>Discount</span><span>−{fmt(totalDisc)}</span></div>}
                  {totalVat > 0 && <div className="flex justify-between text-slate-500"><span>VAT ({posSettings.vat_rate}%)</span><span>{fmt(totalVat)}</span></div>}
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-100">
                    <span>Total</span><span>{fmt(orderTotal)}</span>
                  </div>
                </div>
                <button onClick={openPayModal} disabled={cart.length === 0 || !canCreate}
                  className="w-full bg-blue-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {!canCreate ? 'View only' : cart.length > 0 ? `Charge ${fmt(orderTotal)}` : 'Cart is empty'}
                </button>
              </div>
            </div>
            {/* Floating cart button — mobile only */}
            {!showCart && (
              <button onClick={() => setShowCart(true)}
                className="fixed bottom-6 right-4 md:hidden bg-blue-600 text-white rounded-full shadow-xl flex items-center gap-2 z-20 px-4 py-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-semibold">
                  {cart.length > 0 ? `${cart.length} · ${fmt(orderTotal)}` : 'Cart'}
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Shift modal */}
      {shiftPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {shiftClosing ? (
              <>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Close Shift</h2>
                <p className="text-sm text-slate-500 mb-4">{branchName} · {terminalName}</p>
                <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs text-slate-600 space-y-1.5">
                  <div className="flex justify-between"><span>Opened at</span><span>{shift ? new Date(shift.opened_at).toLocaleString('en-NG') : '—'}</span></div>
                  <div className="flex justify-between"><span>Opening float</span><span className="font-medium">{fmt(shift?.opening_float ?? 0)}</span></div>
                  {shiftSummary ? (
                    <>
                      <div className="border-t border-slate-200 my-1" />
                      <div className="flex justify-between"><span>Cash sales</span><span className="font-medium text-slate-800">{fmt(shiftSummary.cashSales)}</span></div>
                      {shiftSummary.cardSales > 0 && <div className="flex justify-between"><span>Card sales</span><span className="font-medium text-slate-800">{fmt(shiftSummary.cardSales)}</span></div>}
                      {shiftSummary.transferSales > 0 && <div className="flex justify-between"><span>Transfer sales</span><span className="font-medium text-slate-800">{fmt(shiftSummary.transferSales)}</span></div>}
                      <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-1"><span>Total sales</span><span>{fmt(shiftSummary.totalSales)}</span></div>
                      <div className="flex justify-between text-blue-700 font-semibold"><span>Expected cash in drawer</span><span>{fmt(shiftSummary.expectedCash)}</span></div>
                    </>
                  ) : (
                    <div className="text-slate-400 text-center py-1">Loading sales summary…</div>
                  )}
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Actual Cash in Drawer (₦)</label>
                  <input type="number" min="0" value={closingBalance} onChange={e => setClosingBalance(e.target.value)}
                    placeholder="0.00" autoFocus
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  {shiftSummary && closingBalance && (
                    <p className={`text-xs mt-1.5 font-medium ${
                      parseFloat(closingBalance) === shiftSummary.expectedCash ? 'text-green-600'
                      : parseFloat(closingBalance) > shiftSummary.expectedCash ? 'text-blue-600'
                      : 'text-red-500'
                    }`}>
                      Variance: {parseFloat(closingBalance) >= shiftSummary.expectedCash ? '+' : ''}{fmt(parseFloat(closingBalance) - shiftSummary.expectedCash)}
                      {parseFloat(closingBalance) === shiftSummary.expectedCash ? ' — Balanced' :
                       parseFloat(closingBalance) > shiftSummary.expectedCash ? ' — Over' : ' — Short'}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShiftPanel(false)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={closeShift} className="flex-1 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-red-700 transition-colors">Close Shift</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Open Shift</h2>
                <p className="text-sm text-slate-500 mb-5">{branchName} · {terminalName}</p>
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Opening Float (₦)</label>
                  <input type="number" min="0" value={openingFloat} onChange={e => setOpeningFloat(e.target.value)}
                    placeholder="0.00" autoFocus onKeyDown={e => e.key === 'Enter' && openShift()}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <p className="text-xs text-slate-400 mt-1">Cash in drawer at shift start.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShiftPanel(false)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={openShift} disabled={!terminalId}
                    className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Open Shift
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Payment modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Payment</h2>
              <p className="text-2xl font-bold text-blue-600 mt-0.5">{fmt(orderTotal)}</p>
            </div>
            <div className="p-5">
              <div className="flex gap-2 mb-3">
                {PAYMENT_METHODS.map(m => (
                  <button key={m.key} onClick={() => setPayMethod(m.key)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${payMethod === m.key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mb-4">
                <input type="number" min="0" value={payAmount} onChange={e => setPayAmount(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addPayment()}
                  placeholder="Amount (₦)" autoFocus
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={addPayment} className="bg-slate-800 text-white text-sm font-semibold px-4 rounded-lg hover:bg-slate-700 transition-colors">Add</button>
              </div>
              {payments.length > 0 && (
                <div className="space-y-1.5 mb-4">
                  {payments.map(p => (
                    <div key={p.method} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                      <span className="text-sm font-medium text-slate-700 capitalize">{p.method}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{fmt(p.amount)}</span>
                        <button onClick={() => setPayments(prev => prev.filter(x => x.method !== p.method))}
                          className="text-slate-300 hover:text-red-400 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Total</span><span className="font-semibold text-slate-900">{fmt(orderTotal)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Paid</span><span className="font-semibold text-slate-900">{fmt(totalPaid)}</span></div>
                {remaining > 0
                  ? <div className="flex justify-between font-semibold text-amber-600"><span>Remaining</span><span>{fmt(remaining)}</span></div>
                  : <div className="flex justify-between font-semibold text-green-600"><span>Change</span><span>{fmt(change)}</span></div>
                }
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setPayModal(false); setPayments([]) }}
                  className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={completeSale} disabled={saving || totalPaid < orderTotal}
                  className="flex-1 bg-green-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {saving ? 'Processing…' : 'Complete Sale'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Discount approval modal */}
      {discountApproval && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-900 text-center mb-1">Manager Approval Required</h2>
            <p className="text-sm text-slate-500 text-center mb-5">
              This discount exceeds {Math.round(DISCOUNT_THRESHOLD * 100)}% of the line total and requires manager approval.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDiscountApproval(null)}
                className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => { applyDiscount(discountApproval.pid, discountApproval.val); setDiscountApproval(null) }}
                className="flex-1 bg-amber-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-amber-600 transition-colors">
                Approve Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Receipt modal */}
      {receipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 text-center shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-base font-bold text-slate-900">Sale Complete</p>
              <p className="text-xs text-slate-400 mt-0.5">{receipt.reference}</p>
              <p className="text-xs text-slate-400">{receipt.branchName} · {new Date(receipt.created_at).toLocaleString('en-NG')}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1 mb-3">
                {receipt.items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-xs">
                    <span className="text-slate-600">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium text-slate-800">{fmt(itemTotal(item))}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-slate-200 pt-2 mb-3 space-y-1">
                {receipt.discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-slate-500"><span>Discount</span><span>−{fmt(receipt.discountAmount)}</span></div>
                )}
                {receipt.vatAmount > 0 && (
                  <div className="flex justify-between text-xs text-slate-500"><span>VAT ({receipt.vatRate}%)</span><span>{fmt(receipt.vatAmount)}</span></div>
                )}
                <div className="flex justify-between text-sm font-bold text-slate-900"><span>Total</span><span>{fmt(receipt.total)}</span></div>
              </div>
              <div className="border-t border-dashed border-slate-200 pt-2 space-y-1">
                {receipt.payments.map(p => (
                  <div key={p.method} className="flex justify-between text-xs text-slate-500">
                    <span className="capitalize">{p.method}</span><span>{fmt(p.amount)}</span>
                  </div>
                ))}
                {receipt.change > 0 && (
                  <div className="flex justify-between text-xs font-semibold text-green-600"><span>Change</span><span>{fmt(receipt.change)}</span></div>
                )}
              </div>
              {posSettings.receipt_footer && (
                <p className="text-xs text-center text-slate-400 mt-3 italic">{posSettings.receipt_footer}</p>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 shrink-0">
              <button onClick={() => setReceipt(null)}
                className="w-full bg-blue-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                New Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
