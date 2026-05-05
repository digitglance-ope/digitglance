'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppSidebar from '@/components/AppSidebar'

type AccountUser = {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  created_at: string
}

type OwnerProfile = {
  business_name: string
}

const ROLES = [
  { value: 'admin', label: 'Admin', desc: 'Full access except billing' },
  { value: 'manager', label: 'Manager', desc: 'Create and manage invoices and customers' },
  { value: 'staff', label: 'Staff', desc: 'Create invoices only' },
  { value: 'viewer', label: 'Viewer', desc: 'View only, no edits' },
]

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  manager: 'bg-blue-100 text-blue-700',
  staff: 'bg-teal-100 text-teal-700',
  viewer: 'bg-slate-100 text-slate-600',
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  suspended: 'bg-red-100 text-red-700',
}

export default function UsersPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<AccountUser[]>([])
  const [ownerProfile, setOwnerProfile] = useState<OwnerProfile | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteForm, setInviteForm] = useState({ email: '', full_name: '', role: 'staff' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setCurrentUserId(user.id)
    setCurrentUserEmail(user.email || '')

    const { data: profileData } = await supabase
      .from('profiles')
      .select('business_name')
      .eq('id', user.id)
      .single()
    setOwnerProfile(profileData)

    const { data } = await supabase
      .from('account_users')
      .select('*')
      .eq('account_owner_id', user.id)
      .order('created_at', { ascending: false })
    setUsers(data || [])

    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleInvite() {
    if (!inviteForm.email.trim()) { setError('Email is required.'); return }
    setSaving(true)
    setError('')

    const res = await fetch('/api/invite-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: inviteForm.email,
        role: inviteForm.role,
        fullName: inviteForm.full_name,
        invitedBy: currentUserEmail,
        accountOwnerId: currentUserId,
        businessName: ownerProfile?.business_name || 'DigitGlance',
      }),
    })

    const result = await res.json()

    if (!res.ok || result.error) {
      setError(result.error || 'Failed to send invitation. Please try again.')
      setSaving(false)
      return
    }

    const { error: insertError } = await supabase.from('account_users').insert({
      account_owner_id: currentUserId,
      email: inviteForm.email,
      full_name: inviteForm.full_name,
      role: inviteForm.role,
      status: 'pending',
    })

    if (insertError && insertError.code !== '23505') {
      console.error('account_users insert error:', insertError)
    }

    await supabase.from('audit_logs').insert({
      account_owner_id: currentUserId,
      user_id: currentUserId,
      user_email: currentUserEmail,
      action: 'User Invited',
      resource: 'Users',
      details: `Invited ${inviteForm.email} as ${inviteForm.role} to ${ownerProfile?.business_name || 'account'}`,
    })

    setSaving(false)
    setShowInviteForm(false)
    setInviteForm({ email: '', full_name: '', role: 'staff' })
    setSuccess(`Invitation sent to ${inviteForm.email}. They will receive an email to set up their account.`)
    setTimeout(() => setSuccess(''), 6000)
    load()
  }

  async function handleRoleChange(userId: string, newRole: string) {
    await supabase.from('account_users').update({ role: newRole }).eq('id', userId)
    await supabase.from('audit_logs').insert({
      account_owner_id: currentUserId,
      user_id: currentUserId,
      user_email: currentUserEmail,
      action: 'Role Changed',
      resource: 'Users',
      details: `Changed role to ${newRole} for user ${userId}`,
    })
    load()
  }

  async function handleStatusChange(userId: string, newStatus: string) {
    await supabase.from('account_users').update({ status: newStatus }).eq('id', userId)
    await supabase.from('audit_logs').insert({
      account_owner_id: currentUserId,
      user_id: currentUserId,
      user_email: currentUserEmail,
      action: newStatus === 'suspended' ? 'User Suspended' : 'User Activated',
      resource: 'Users',
      details: `User ${userId} status changed to ${newStatus}`,
    })
    load()
  }

  async function handleRemove(userId: string, email: string) {
    if (!confirm(`Remove ${email} from your account?`)) return
    await supabase.from('account_users').delete().eq('id', userId)
    await supabase.from('audit_logs').insert({
      account_owner_id: currentUserId,
      user_id: currentUserId,
      user_email: currentUserEmail,
      action: 'User Removed',
      resource: 'Users',
      details: `Removed ${email} from account`,
    })
    load()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="invoice" />

      <main className="md:ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">User Control</h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage team members for{' '}
              <span className="font-semibold text-teal-600">{ownerProfile?.business_name || 'your account'}</span>
            </p>
          </div>
          <button onClick={() => { setShowInviteForm(true); setError('') }} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Invite User
          </button>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {success}
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mb-8">
          {ROLES.map(role => (
            <div key={role.value} className="bg-white border border-slate-200 rounded-xl p-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${ROLE_COLORS[role.value]}`}>{role.label}</span>
              <p className="text-xs text-slate-500">{role.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <p className="text-slate-500 text-sm">No team members yet. Invite someone to get started.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Name', 'Email', 'Role', 'Status', 'Invited', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {(u.full_name || u.email).charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{u.full_name || 'Pending'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{u.email}</td>
                    <td className="px-5 py-4">
                      <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-teal-500">
                        {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[u.status] || 'bg-slate-100 text-slate-600'}`}>{u.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{new Date(u.created_at).toLocaleDateString('en-NG')}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        {u.status === 'active' ? (
                          <button onClick={() => handleStatusChange(u.id, 'suspended')} className="text-xs text-orange-500 hover:text-orange-700 font-medium">Suspend</button>
                        ) : u.status === 'suspended' ? (
                          <button onClick={() => handleStatusChange(u.id, 'active')} className="text-xs text-green-600 hover:text-green-800 font-medium">Activate</button>
                        ) : null}
                        <button onClick={() => handleRemove(u.id, u.email)} className="text-xs text-red-400 hover:text-red-600 font-medium">Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {showInviteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Invite Team Member</h2>
                {ownerProfile?.business_name && (
                  <p className="text-xs text-slate-400 mt-0.5">Inviting to: {ownerProfile.business_name}</p>
                )}
              </div>
              <button onClick={() => setShowInviteForm(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input type="email" value={inviteForm.email} onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))} placeholder="colleague@example.com" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input type="text" value={inviteForm.full_name} onChange={e => setInviteForm(p => ({ ...p, full_name: e.target.value }))} placeholder="e.g. John Adeyemi" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Role</label>
                <select value={inviteForm.role} onChange={e => setInviteForm(p => ({ ...p, role: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500">
                  {ROLES.map(r => <option key={r.value} value={r.value}>{r.label} - {r.desc}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mt-4">
              <p className="text-xs text-blue-700">
                The invited person will receive an email from <strong>hello@digitglance.com</strong> with a link to set their password and access <strong>{ownerProfile?.business_name || 'your account'}</strong> directly. They will not go through business setup.
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowInviteForm(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleInvite} disabled={saving} className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm">
                {saving ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
