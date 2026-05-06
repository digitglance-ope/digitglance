'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type OverdueInvoice = {
  id: string
  invoice_number: string
  due_date: string
  total: number
  amount_paid: number
  balance: number
  daysOverdue: number
  customer_id: string
  customer_name: string
  customer_email: string
  lastReminder: string | null
  reminderCount: number
}

type ReminderType = 'first_reminder' | 'follow_up' | 'final_notice'

type DraftModal = {
  invoice: OverdueInvoice
  reminderType: ReminderType
  draft: string
  drafting: boolean
  sending: boolean
  sent: boolean
  error: string
}

const REMINDER_LABELS: Record<ReminderType, string> = {
  first_reminder: 'First Reminder',
  follow_up: 'Follow-up',
  final_notice: 'Final Notice',
}

function ageBucket(days: number) {
  if (days <= 30) return { label: '0–30 days', text: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-400', row: 'hover:bg-amber-50' }
  if (days <= 60) return { label: '31–60 days', text: 'text-orange-700', bg: 'bg-orange-100', dot: 'bg-orange-400', row: 'hover:bg-orange-50' }
  if (days <= 90) return { label: '61–90 days', text: 'text-red-600', bg: 'bg-red-100', dot: 'bg-red-500', row: 'hover:bg-red-50' }
  return { label: '90+ days', text: 'text-red-900', bg: 'bg-red-200', dot: 'bg-red-700', row: 'hover:bg-red-50' }
}

function fmt(n: number) {
  return '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })
}

function autoReminderType(inv: OverdueInvoice): ReminderType {
  if (inv.reminderCount === 0) return 'first_reminder'
  if (inv.daysOverdue > 45 || inv.reminderCount >= 2) return 'final_notice'
  return 'follow_up'
}

export default function InvoiceAIPage() {
  const supabase = createClient()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<string>('free')
  const [businessName, setBusinessName] = useState('')
  const [ownerIdRef, setOwnerIdRef] = useState<string>('')
  const [invoices, setInvoices] = useState<OverdueInvoice[]>([])
  const [modal, setModal] = useState<DraftModal | null>(null)

  const loadInvoices = useCallback(async (owner: string) => {
    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
      .from('invoices')
      .select('id, invoice_number, due_date, total, amount_paid, customers(name, email)')
      .eq('user_id', owner)
      .in('status', ['outstanding', 'partial'])
      .lt('due_date', today)
      .order('due_date', { ascending: true })

    if (!data || data.length === 0) { setInvoices([]); return }

    const invoiceIds = (data as unknown as { id: string }[]).map(i => i.id)

    let reminders: { invoice_id: string; sent_at: string }[] = []
    try {
      const { data: reminderData } = await supabase
        .from('invoice_reminders')
        .select('invoice_id, sent_at')
        .in('invoice_id', invoiceIds)
        .order('sent_at', { ascending: false })
      reminders = (reminderData || []) as { invoice_id: string; sent_at: string }[]
    } catch {
      // invoice_reminders table may not exist yet — proceed without history
    }

    const now = new Date()
    const mapped: OverdueInvoice[] = (data as unknown as {
      id: string; invoice_number: string; due_date: string; total: number; amount_paid: number;
      customers: { name: string; email: string } | null
    }[]).map(inv => {
      const dueDate = new Date(inv.due_date)
      const daysOverdue = Math.max(0, Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)))
      const invReminders = reminders.filter(r => r.invoice_id === inv.id)
      return {
        id: inv.id,
        invoice_number: inv.invoice_number,
        due_date: inv.due_date,
        total: inv.total,
        amount_paid: inv.amount_paid || 0,
        balance: inv.total - (inv.amount_paid || 0),
        daysOverdue,
        customer_id: '',
        customer_name: inv.customers?.name || 'Unknown',
        customer_email: inv.customers?.email || '',
        lastReminder: invReminders.length > 0 ? invReminders[0].sent_at : null,
        reminderCount: invReminders.length,
      }
    })

    setInvoices(mapped)
  }, [supabase])

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/app/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('plan, business_name, is_team_member, account_owner_id')
        .eq('id', user.id)
        .single()

      const owner = (profile?.is_team_member && profile.account_owner_id)
        ? profile.account_owner_id : user.id

      setPlan(profile?.plan || 'free')
      setBusinessName(profile?.business_name || '')
      setOwnerIdRef(owner)

      if (profile?.plan !== 'free') {
        await loadInvoices(owner)
      }
      setLoading(false)
    }
    init()
  }, [supabase, router, loadInvoices])

  async function openDraft(invoice: OverdueInvoice) {
    const reminderType = autoReminderType(invoice)
    setModal({ invoice, reminderType, draft: '', drafting: true, sending: false, sent: false, error: '' })

    try {
      const res = await fetch('/api/ai/invoice-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: invoice.customer_name,
          invoiceRef: invoice.invoice_number,
          amount: invoice.balance,
          dueDate: invoice.due_date,
          daysOverdue: invoice.daysOverdue,
          reminderType,
        }),
      })
      const json = await res.json()
      setModal(prev => prev ? { ...prev, draft: json.draft || '', drafting: false } : null)
    } catch {
      setModal(prev => prev ? { ...prev, drafting: false, error: 'Failed to draft reminder. Please try again.' } : null)
    }
  }

  async function regenerateDraft() {
    if (!modal) return
    setModal(prev => prev ? { ...prev, drafting: true, error: '' } : null)

    try {
      const res = await fetch('/api/ai/invoice-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: modal.invoice.customer_name,
          invoiceRef: modal.invoice.invoice_number,
          amount: modal.invoice.balance,
          dueDate: modal.invoice.due_date,
          daysOverdue: modal.invoice.daysOverdue,
          reminderType: modal.reminderType,
        }),
      })
      const json = await res.json()
      setModal(prev => prev ? { ...prev, draft: json.draft || '', drafting: false } : null)
    } catch {
      setModal(prev => prev ? { ...prev, drafting: false, error: 'Failed to regenerate. Please try again.' } : null)
    }
  }

  async function sendReminder() {
    if (!modal || !modal.draft) return
    setModal(prev => prev ? { ...prev, sending: true, error: '' } : null)

    try {
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'invoice_reminder',
          to: modal.invoice.customer_email,
          data: {
            business_name: businessName,
            customer_name: modal.invoice.customer_name,
            invoice_number: modal.invoice.invoice_number,
            amount_due: modal.invoice.balance,
            due_date: modal.invoice.due_date,
            days_overdue: modal.invoice.daysOverdue,
            message_body: modal.draft,
          },
        }),
      })

      if (!emailRes.ok) {
        const err = await emailRes.json()
        throw new Error(err.error || 'Email send failed')
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('invoice_reminders').insert({
          invoice_id: modal.invoice.id,
          user_id: user.id,
          reminder_type: modal.reminderType,
          message_preview: modal.draft.slice(0, 200),
        })
      }

      setModal(prev => prev ? { ...prev, sending: false, sent: true } : null)
      if (ownerIdRef) loadInvoices(ownerIdRef)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send reminder. Please try again.'
      setModal(prev => prev ? { ...prev, sending: false, error: message } : null)
    }
  }

  // Summary stats
  const totalOverdue = invoices.reduce((s, i) => s + i.balance, 0)
  const b0_30  = invoices.filter(i => i.daysOverdue <= 30)
  const b31_60 = invoices.filter(i => i.daysOverdue > 30 && i.daysOverdue <= 60)
  const b61_90 = invoices.filter(i => i.daysOverdue > 60 && i.daysOverdue <= 90)
  const b90p   = invoices.filter(i => i.daysOverdue > 90)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading InvoiceAI NG...</p>
      </div>
    )
  }

  if (plan === 'free') {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-slate-900">Digit<span className="text-teal-600">Glance</span></a>
            <div className="flex items-center gap-4">
              <a href="/ai-tools" className="text-sm text-slate-500 hover:text-teal-600">← AI Tools</a>
              <a href="/app/invoice/dashboard" className="text-sm text-slate-500 hover:text-teal-600">Invoice App</a>
            </div>
          </div>
        </nav>
        <div className="max-w-lg mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">InvoiceAI NG requires a paid plan</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            InvoiceAI NG is available on the Starter and Pro plans. Upgrade to start sending AI-drafted
            payment reminders and reduce your debtor days.
          </p>
          <a href="/app/invoice/subscription"
            className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-700 inline-block transition-colors">
            Upgrade Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-slate-900">Digit<span className="text-teal-600">Glance</span></a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/ai-tools" className="text-slate-500 hover:text-teal-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              AI Tools
            </a>
            <a href="/app/invoice/dashboard" className="text-slate-500 hover:text-teal-600">Invoice App</a>
            <a href="/app/invoice/invoices" className="text-slate-500 hover:text-teal-600">My Invoices</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Live</span>
            <span className="text-slate-400 text-xs">Revenue Management</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">InvoiceAI NG</h1>
          <p className="text-slate-500 mt-1">AI-drafted payment reminders for your overdue invoices. Stop chasing payments manually.</p>
        </div>

        {invoices.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">No overdue invoices</h2>
            <p className="text-slate-500 text-sm">All your invoices are current. Come back when a payment is overdue.</p>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="md:col-span-2 bg-slate-900 text-white rounded-xl p-5">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Total Overdue</p>
                <p className="text-2xl font-bold">{fmt(totalOverdue)}</p>
                <p className="text-slate-400 text-xs mt-1">{invoices.length} invoice{invoices.length !== 1 ? 's' : ''}</p>
              </div>
              {[
                { label: '0–30 days', items: b0_30, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                { label: '31–60 days', items: b31_60, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
                { label: '61–90 days', items: b61_90, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
                { label: '90+ days', items: b90p, color: 'text-red-900', bg: 'bg-red-100', border: 'border-red-200' },
              ].map(bucket => (
                <div key={bucket.label} className={`${bucket.bg} border ${bucket.border} rounded-xl p-4`}>
                  <p className={`text-xs font-semibold ${bucket.color} mb-1`}>{bucket.label}</p>
                  <p className={`text-xl font-bold ${bucket.color}`}>{bucket.items.length}</p>
                  <p className={`text-xs ${bucket.color} opacity-70 mt-0.5`}>{fmt(bucket.items.reduce((s, i) => s + i.balance, 0))}</p>
                </div>
              ))}
            </div>

            {/* SQL reminder */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-700 text-sm">
                <strong>Setup required:</strong> Run the <code className="bg-blue-100 px-1 rounded text-xs">invoice_reminders</code> SQL table
                in your Supabase dashboard before sending reminders. Reminder history will not save until that table exists.
              </p>
            </div>

            {/* Invoices table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900 text-sm">Overdue Invoices ({invoices.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {['Customer', 'Invoice', 'Due Date', 'Age', 'Balance Due', 'Last Reminder', 'Action'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map(inv => {
                      const bucket = ageBucket(inv.daysOverdue)
                      return (
                        <tr key={inv.id} className={`transition-colors ${bucket.row}`}>
                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{inv.customer_name}</p>
                            <p className="text-xs text-slate-400">{inv.customer_email || 'No email'}</p>
                          </td>
                          <td className="px-5 py-4 text-sm font-semibold text-teal-600">{inv.invoice_number}</td>
                          <td className="px-5 py-4 text-sm text-slate-600">
                            {new Date(inv.due_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bucket.bg} ${bucket.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${bucket.dot}`}></span>
                              {inv.daysOverdue}d — {bucket.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm font-bold text-slate-900">{fmt(inv.balance)}</td>
                          <td className="px-5 py-4 text-xs text-slate-500">
                            {inv.lastReminder
                              ? <span>{new Date(inv.lastReminder).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })} <span className="text-slate-400">({inv.reminderCount}x)</span></span>
                              : <span className="text-slate-300">Never sent</span>
                            }
                          </td>
                          <td className="px-5 py-4">
                            {inv.customer_email ? (
                              <button
                                onClick={() => openDraft(inv)}
                                className="bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                              >
                                Draft Reminder
                              </button>
                            ) : (
                              <span className="text-xs text-slate-300">No email</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Draft / Send Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget && !modal.sending) setModal(null) }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">

            {/* Modal header */}
            <div className="px-6 py-5 border-b border-slate-100 shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-900">{modal.invoice.customer_name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{modal.invoice.invoice_number} · {fmt(modal.invoice.balance)} outstanding · {modal.invoice.daysOverdue} days overdue</p>
                </div>
                {!modal.sending && !modal.sent && (
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-600 p-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Reminder type selector */}
              {!modal.sent && (
                <div className="flex gap-2 mt-4">
                  {(['first_reminder', 'follow_up', 'final_notice'] as ReminderType[]).map(rt => (
                    <button
                      key={rt}
                      disabled={modal.drafting || modal.sending}
                      onClick={() => setModal(prev => prev ? { ...prev, reminderType: rt } : null)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        modal.reminderType === rt
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {REMINDER_LABELS[rt]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-y-auto p-6">
              {modal.sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Reminder sent</h3>
                  <p className="text-slate-500 text-sm">Email delivered to {modal.invoice.customer_email}</p>
                </div>
              ) : modal.drafting ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Claude is drafting your reminder...
                  </div>
                </div>
              ) : (
                <>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    AI Draft — edit before sending
                  </label>
                  <textarea
                    value={modal.draft}
                    onChange={e => setModal(prev => prev ? { ...prev, draft: e.target.value } : null)}
                    rows={6}
                    className="w-full border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed focus:outline-none focus:border-teal-500 resize-none"
                  />
                  <div className="mt-2 text-xs text-slate-400">
                    Sending to: <span className="text-slate-600 font-medium">{modal.invoice.customer_email}</span>
                  </div>
                  {modal.error && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                      {modal.error}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex gap-3 shrink-0">
              {modal.sent ? (
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 bg-slate-900 text-white text-sm font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setModal(null)}
                    disabled={modal.sending}
                    className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  {!modal.drafting && (
                    <button
                      onClick={regenerateDraft}
                      disabled={modal.sending}
                      className="border border-slate-200 text-slate-600 text-sm font-medium px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      Regenerate
                    </button>
                  )}
                  <button
                    onClick={sendReminder}
                    disabled={modal.drafting || modal.sending || !modal.draft}
                    className="flex-1 bg-teal-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {modal.sending ? 'Sending...' : 'Send Reminder'}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
