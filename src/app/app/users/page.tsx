'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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

    // Store current user details for use in invite
    setCurrentUserId(user.id)
    setCurrentUserEmail(user.email || '')

    // Load the account owner's business profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('business_name')
      .eq('id', user.id)
      .single()
    setOwnerProfile(profileData)

    // Load all invited users for this account
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

    // Call the server-side API route which uses the service role key
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

    // Record in account_users table for role tracking
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

    // Audit log
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
      <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0">
        <div className="p-6 border-b border-slate-800">
          <Link href="/app/dashboard"><span className="text-xl font-bold text-white">Digit<span className="text-teal-400">Glance</span></span></Link>
          <p className="text-xs text-slate-500 mt-1">Invoice System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/app/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { href: '/app/invoices', label: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { href: '/app/customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
            { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800 mt-2 space-y-1">
            <Link href="/app/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </Link>
            <Link href="/app/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-teal-600/10 text-teal-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Users
            </Link>
            <Link href="/app/audit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Audit Log
            </Link>
          </div>
        </nav>
      </aside>

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
