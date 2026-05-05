'use client'

import { useState, useEffect, useCallback } from 'react'
import AppSidebar from '@/components/AppSidebar'
import { createClient } from '@/lib/supabase/client'

interface Branch {
  id: string
  name: string
  is_headquarters: boolean
  address: string | null
  phone: string | null
  created_at: string
}

interface Terminal {
  id: string
  branch_id: string
  name: string
  is_active: boolean
  created_at: string
}

interface PosConfig {
  vat_rate: number
  costing_method: string
  receipt_footer: string
}

const COSTING_OPTIONS = [
  { value: 'weighted_average', label: 'Weighted Average Cost' },
  { value: 'fifo',             label: 'FIFO (First In, First Out)' },
  { value: 'standard_cost',   label: 'Standard Cost' },
]

export default function PosSettingsPage() {
  const supabase = createClient()

  const [ownerId,   setOwnerId]   = useState<string | null>(null)
  const [branches,  setBranches]  = useState<Branch[]>([])
  const [terminals, setTerminals] = useState<Terminal[]>([])
  const [config,    setConfig]    = useState<PosConfig>({ vat_rate: 7.5, costing_method: 'weighted_average', receipt_footer: '' })
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  // Branch modal state
  const [branchModal,  setBranchModal]  = useState<{ open: boolean; editing: Branch | null }>({ open: false, editing: null })
  const [branchForm,   setBranchForm]   = useState({ name: '', address: '', phone: '' })
  const [branchSaving, setBranchSaving] = useState(false)

  // Terminal modal state
  const [terminalModal,  setTerminalModal]  = useState<{ open: boolean; editing: Terminal | null }>({ open: false, editing: null })
  const [terminalForm,   setTerminalForm]   = useState({ name: '', branch_id: '' })
  const [terminalSaving, setTerminalSaving] = useState(false)

  // Inline delete confirms
  const [deletingBranch,   setDeletingBranch]   = useState<string | null>(null)
  const [deletingTerminal, setDeletingTerminal] = useState<string | null>(null)

  // Config save feedback
  const [configSaving, setConfigSaving] = useState(false)
  const [configSaved,  setConfigSaved]  = useState(false)

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

    const [{ data: b }, { data: t }, { data: s }] = await Promise.all([
      supabase.from('pos_branches').select('*').eq('account_owner_id', owner).order('created_at'),
      supabase.from('pos_terminals').select('*').eq('account_owner_id', owner).order('created_at'),
      supabase.from('pos_settings').select('*').eq('account_owner_id', owner).maybeSingle(),
    ])

    setBranches(b ?? [])
    setTerminals(t ?? [])
    if (s) setConfig({ vat_rate: s.vat_rate, costing_method: s.costing_method, receipt_footer: s.receipt_footer ?? '' })
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  // ── Branch actions ───────────────────────────────────────────

  function openAddBranch() {
    setBranchForm({ name: '', address: '', phone: '' })
    setBranchModal({ open: true, editing: null })
    setError(null)
  }

  function openEditBranch(b: Branch) {
    setBranchForm({ name: b.name, address: b.address ?? '', phone: b.phone ?? '' })
    setBranchModal({ open: true, editing: b })
    setError(null)
  }

  async function saveBranch() {
    if (!branchForm.name.trim() || !ownerId) return
    setBranchSaving(true)
    setError(null)

    if (branchModal.editing) {
      const { error: err } = await supabase
        .from('pos_branches')
        .update({
          name:    branchForm.name.trim(),
          address: branchForm.address.trim() || null,
          phone:   branchForm.phone.trim()   || null,
        })
        .eq('id', branchModal.editing.id)
      if (err) { setError(err.message); setBranchSaving(false); return }
    } else {
      const isFirst = branches.length === 0
      const { error: err } = await supabase
        .from('pos_branches')
        .insert({
          account_owner_id: ownerId,
          name:             branchForm.name.trim(),
          address:          branchForm.address.trim() || null,
          phone:            branchForm.phone.trim()   || null,
          is_headquarters:  isFirst,
        })
      if (err) { setError(err.message); setBranchSaving(false); return }
    }

    setBranchModal({ open: false, editing: null })
    setBranchSaving(false)
    load()
  }

  async function setHeadquarters(branchId: string) {
    if (!ownerId) return
    await supabase.from('pos_branches').update({ is_headquarters: false }).eq('account_owner_id', ownerId)
    await supabase.from('pos_branches').update({ is_headquarters: true }).eq('id', branchId)
    load()
  }

  async function deleteBranch(branchId: string) {
    const { error: err } = await supabase.from('pos_branches').delete().eq('id', branchId)
    if (err) { setError(err.message); return }
    setDeletingBranch(null)
    load()
  }

  // ── Terminal actions ─────────────────────────────────────────

  function openAddTerminal(branchId?: string) {
    setTerminalForm({ name: '', branch_id: branchId ?? (branches[0]?.id ?? '') })
    setTerminalModal({ open: true, editing: null })
    setError(null)
  }

  function openEditTerminal(t: Terminal) {
    setTerminalForm({ name: t.name, branch_id: t.branch_id })
    setTerminalModal({ open: true, editing: t })
    setError(null)
  }

  async function saveTerminal() {
    if (!terminalForm.name.trim() || !terminalForm.branch_id || !ownerId) return
    setTerminalSaving(true)
    setError(null)

    if (terminalModal.editing) {
      const { error: err } = await supabase
        .from('pos_terminals')
        .update({ name: terminalForm.name.trim(), branch_id: terminalForm.branch_id })
        .eq('id', terminalModal.editing.id)
      if (err) { setError(err.message); setTerminalSaving(false); return }
    } else {
      const { error: err } = await supabase
        .from('pos_terminals')
        .insert({ account_owner_id: ownerId, branch_id: terminalForm.branch_id, name: terminalForm.name.trim() })
      if (err) { setError(err.message); setTerminalSaving(false); return }
    }

    setTerminalModal({ open: false, editing: null })
    setTerminalSaving(false)
    load()
  }

  async function toggleTerminal(t: Terminal) {
    await supabase.from('pos_terminals').update({ is_active: !t.is_active }).eq('id', t.id)
    load()
  }

  async function deleteTerminal(terminalId: string) {
    const { error: err } = await supabase.from('pos_terminals').delete().eq('id', terminalId)
    if (err) { setError(err.message); return }
    setDeletingTerminal(null)
    load()
  }

  // ── Config save ──────────────────────────────────────────────

  async function saveConfig() {
    if (!ownerId) return
    setConfigSaving(true)
    const { error: err } = await supabase
      .from('pos_settings')
      .upsert(
        {
          account_owner_id: ownerId,
          vat_rate:         config.vat_rate,
          costing_method:   config.costing_method,
          receipt_footer:   config.receipt_footer || null,
          updated_at:       new Date().toISOString(),
        },
        { onConflict: 'account_owner_id' }
      )
    if (err) setError(err.message)
    else { setConfigSaved(true); setTimeout(() => setConfigSaved(false), 3000) }
    setConfigSaving(false)
  }

  const terminalsByBranch = (branchId: string) => terminals.filter(t => t.branch_id === branchId)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />

      <main className="md:ml-64 flex-1 p-8 max-w-5xl">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">POS Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Branches, terminals, VAT defaults, and costing method</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 ml-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-slate-400 text-sm py-8">Loading settings…</div>
        ) : (
          <div className="space-y-8">

            {/* ── BRANCHES ─────────────────────────────── */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Branches</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Each branch has its own stock levels and sales reports</p>
                </div>
                <button
                  onClick={openAddBranch}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Branch
                </button>
              </div>

              {branches.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">No branches yet</p>
                  <p className="text-xs text-slate-500 mb-4">Add your first branch. The first one is automatically set as HQ.</p>
                  <button onClick={openAddBranch} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Add your first branch →
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3 uppercase tracking-wider">Branch Name</th>
                        <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Address</th>
                        <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Phone</th>
                        <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Terminals</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {branches.map(b => (
                        <tr key={b.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900">{b.name}</span>
                              {b.is_headquarters && (
                                <span className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">HQ</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600">{b.address || <span className="text-slate-400">—</span>}</td>
                          <td className="px-4 py-4 text-sm text-slate-600">{b.phone || <span className="text-slate-400">—</span>}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm text-slate-700 font-medium">{terminalsByBranch(b.id).length}</span>
                              <button
                                onClick={() => openAddTerminal(b.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                              >
                                + Add
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3 justify-end whitespace-nowrap">
                              {!b.is_headquarters && (
                                <button
                                  onClick={() => setHeadquarters(b.id)}
                                  className="text-xs text-slate-500 hover:text-teal-600 font-medium"
                                >
                                  Set HQ
                                </button>
                              )}
                              <button
                                onClick={() => openEditBranch(b)}
                                className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                              >
                                Edit
                              </button>
                              {deletingBranch === b.id ? (
                                <span className="flex items-center gap-1.5 text-xs">
                                  <span className="text-red-600 font-medium">Delete?</span>
                                  <button onClick={() => deleteBranch(b.id)} className="font-bold text-red-600 hover:text-red-700">Yes</button>
                                  <button onClick={() => setDeletingBranch(null)} className="text-slate-500">No</button>
                                </span>
                              ) : (
                                <button
                                  onClick={() => setDeletingBranch(b.id)}
                                  className="text-xs text-slate-400 hover:text-red-500 font-medium"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* ── TERMINALS ────────────────────────────── */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Terminals</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Each terminal is a cashier point assigned to a branch</p>
                </div>
                {branches.length > 0 && (
                  <button
                    onClick={() => openAddTerminal()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Terminal
                  </button>
                )}
              </div>

              {branches.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-slate-400">
                  Add a branch first before adding terminals.
                </div>
              ) : terminals.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">No terminals yet</p>
                  <p className="text-xs text-slate-500 mb-4">Add at least one terminal to open the POS cashier screen.</p>
                  <button onClick={() => openAddTerminal()} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Add your first terminal →
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3 uppercase tracking-wider">Terminal Name</th>
                        <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Branch</th>
                        <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {terminals.map(t => {
                        const branch = branches.find(b => b.id === t.branch_id)
                        return (
                          <tr key={t.id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">{t.name}</td>
                            <td className="px-4 py-4 text-sm text-slate-600">
                              {branch ? (
                                <span className="flex items-center gap-1.5">
                                  {branch.name}
                                  {branch.is_headquarters && <span className="text-xs text-teal-600 font-semibold">(HQ)</span>}
                                </span>
                              ) : '—'}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                t.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {t.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3 justify-end whitespace-nowrap">
                                <button
                                  onClick={() => openEditTerminal(t)}
                                  className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => toggleTerminal(t)}
                                  className={`text-xs font-medium ${
                                    t.is_active
                                      ? 'text-slate-400 hover:text-amber-600'
                                      : 'text-slate-400 hover:text-green-600'
                                  }`}
                                >
                                  {t.is_active ? 'Deactivate' : 'Activate'}
                                </button>
                                {deletingTerminal === t.id ? (
                                  <span className="flex items-center gap-1.5 text-xs">
                                    <span className="text-red-600 font-medium">Delete?</span>
                                    <button onClick={() => deleteTerminal(t.id)} className="font-bold text-red-600 hover:text-red-700">Yes</button>
                                    <button onClick={() => setDeletingTerminal(null)} className="text-slate-500">No</button>
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => setDeletingTerminal(t.id)}
                                    className="text-xs text-slate-400 hover:text-red-500 font-medium"
                                  >
                                    Delete
                                  </button>
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
            </section>

            {/* ── POS CONFIGURATION ────────────────────── */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-slate-900 mb-1">POS Configuration</h2>
              <p className="text-xs text-slate-500 mb-6">Default VAT rate, inventory costing method, and receipt footer</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Default VAT Rate (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={config.vat_rate}
                    onChange={e => setConfig(c => ({ ...c, vat_rate: parseFloat(e.target.value) || 0 }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Nigeria standard VAT is 7.5%</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Inventory Costing Method</label>
                  <select
                    value={config.costing_method}
                    onChange={e => setConfig(c => ({ ...c, costing_method: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {COSTING_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 mt-1">Used to calculate cost of goods sold</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Receipt Footer <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={config.receipt_footer}
                  onChange={e => setConfig(c => ({ ...c, receipt_footer: e.target.value }))}
                  placeholder="e.g. Thank you for shopping with us! All sales are final."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={saveConfig}
                  disabled={configSaving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  {configSaving ? 'Saving…' : 'Save Configuration'}
                </button>
                {configSaved && (
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </span>
                )}
              </div>
            </section>

          </div>
        )}
      </main>

      {/* ── BRANCH MODAL ─────────────────────────────── */}
      {branchModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5">
              {branchModal.editing ? 'Edit Branch' : 'Add Branch'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Branch Name *</label>
                <input
                  type="text"
                  value={branchForm.name}
                  onChange={e => setBranchForm(f => ({ ...f, name: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && saveBranch()}
                  placeholder="e.g. Main Store, Lagos VI Branch"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Address <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={branchForm.address}
                  onChange={e => setBranchForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="e.g. 12 Marina Street, Lagos Island"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={branchForm.phone}
                  onChange={e => setBranchForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="e.g. 0801 234 5678"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveBranch}
                disabled={branchSaving || !branchForm.name.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                {branchSaving ? 'Saving…' : branchModal.editing ? 'Save Changes' : 'Add Branch'}
              </button>
              <button
                onClick={() => setBranchModal({ open: false, editing: null })}
                className="flex-1 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TERMINAL MODAL ───────────────────────────── */}
      {terminalModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5">
              {terminalModal.editing ? 'Edit Terminal' : 'Add Terminal'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Terminal Name *</label>
                <input
                  type="text"
                  value={terminalForm.name}
                  onChange={e => setTerminalForm(f => ({ ...f, name: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && saveTerminal()}
                  placeholder="e.g. Cashier 1, Main Till, Counter 2"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Branch *</label>
                <select
                  value={terminalForm.branch_id}
                  onChange={e => setTerminalForm(f => ({ ...f, branch_id: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name}{b.is_headquarters ? ' (HQ)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={saveTerminal}
                disabled={terminalSaving || !terminalForm.name.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                {terminalSaving ? 'Saving…' : terminalModal.editing ? 'Save Changes' : 'Add Terminal'}
              </button>
              <button
                onClick={() => setTerminalModal({ open: false, editing: null })}
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
