'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

type AuditLog = {
  id: string
  user_email: string
  action: string
  resource: string
  details: string
  created_at: string
}

const ACTION_COLORS: Record<string, string> = {
  'User Invited':       'bg-blue-100 text-blue-700',
  'User Removed':       'bg-red-100 text-red-700',
  'User Suspended':     'bg-orange-100 text-orange-700',
  'User Activated':     'bg-green-100 text-green-700',
  'Role Changed':       'bg-teal-100 text-teal-700',
  'Sale Completed':     'bg-teal-100 text-teal-700',
  'Payment Recorded':   'bg-green-100 text-green-700',
  'Plan Upgraded':      'bg-blue-100 text-blue-700',
  'Plan Downgraded':    'bg-orange-100 text-orange-700',
}

export default function PosAuditPage() {
  const supabase = createClient()
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('account_owner_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200)
    setLogs(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = logs.filter(l =>
    l.action?.toLowerCase().includes(search.toLowerCase()) ||
    l.user_email?.toLowerCase().includes(search.toLowerCase()) ||
    l.details?.toLowerCase().includes(search.toLowerCase())
  )

  function fmt(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />

      <main className="md:ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
          <p className="text-slate-500 text-sm mt-1">A record of all actions taken within your account</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            <span className="text-xs text-slate-400">{filtered.length} entries</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading audit log...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              {search ? 'No matching entries.' : 'No activity recorded yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Action</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">User</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Details</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${ACTION_COLORS[log.action] || 'bg-slate-100 text-slate-600'}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-600">{log.user_email}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 max-w-xs truncate">{log.details}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-400 whitespace-nowrap">{fmt(log.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
