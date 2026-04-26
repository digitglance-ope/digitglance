import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarding_complete) {
    redirect('/app/onboarding')
  }

  // Get current month date range
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  // Total invoices count
  const { count: totalInvoices } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Outstanding balance (all unpaid and partial invoices)
  const { data: outstandingData } = await supabase
    .from('invoices')
    .select('balance')
    .eq('user_id', user.id)
    .in('status', ['outstanding', 'partial'])

  const totalOutstanding = outstandingData?.reduce((sum, inv) => sum + (inv.balance || 0), 0) || 0

  // Paid this month (sum of amount_paid on invoices updated this month with paid status)
  const { data: paidData } = await supabase
    .from('invoices')
    .select('amount_paid')
    .eq('user_id', user.id)
    .eq('status', 'paid')
    .gte('updated_at', monthStart)
    .lte('updated_at', monthEnd)

  const totalPaidThisMonth = paidData?.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0) || 0

  // Invoices created this month
  const { count: invoicesThisMonth } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', monthStart)
    .lte('created_at', monthEnd)

  // Recent invoices for the table
  const { data: recentInvoices } = await supabase
    .from('invoices')
    .select('id, invoice_number, customer_name, total, status, due_date, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`

  const statusStyles: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    partial: 'bg-yellow-100 text-yellow-700',
    outstanding: 'bg-red-100 text-red-700',
  }

  async function handleSignOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/app/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed top-0 left-0">
        <div className="p-6 border-b border-slate-800">
          <span className="text-xl font-bold text-white">
            Digit<span className="text-teal-400">Glance</span>
          </span>
          <p className="text-xs text-slate-500 mt-1">Invoice System</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-3">Main Menu</p>

          <Link href="/app/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-teal-600/10 text-teal-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>

          {[
            { href: '/app/invoices', label: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { href: '/app/customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
            { href: '/app/inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: '/app/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}

          <div className="pt-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-3">Account</p>
            {[
              { href: '/app/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
              { href: '/app/subscription', label: 'Subscription', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile?.business_name || 'Your Business'}</p>
              <p className="text-xs text-slate-500 capitalize">{profile?.plan || 'free'} plan</p>
            </div>
          </div>
          <form action={handleSignOut}>
            <button type="submit" className="w-full text-left text-xs text-slate-500 hover:text-red-400 transition-colors px-1">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-slate-500 mt-1 text-sm">{profile?.business_name}</p>
          </div>
          <Link
            href="/app/invoices/new"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              label: 'Total Invoices',
              value: String(totalInvoices || 0),
              icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
              color: 'text-blue-600 bg-blue-50',
            },
            {
              label: 'Outstanding',
              value: fmt(totalOutstanding),
              icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              color: 'text-orange-600 bg-orange-50',
            },
            {
              label: 'Paid This Month',
              value: fmt(totalPaidThisMonth),
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              color: 'text-teal-600 bg-teal-50',
            },
            {
              label: 'Invoices This Month',
              value: String(invoicesThisMonth || 0),
              icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
              color: 'text-purple-600 bg-purple-50',
            },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Invoices */}
        {recentInvoices && recentInvoices.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Recent Invoices</h2>
              <Link href="/app/invoices" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                View all
              </Link>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Invoice', 'Customer', 'Amount', 'Status', 'Due Date'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/app/invoices/${inv.id}`} className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                        {inv.invoice_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{inv.customer_name}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{fmt(inv.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[inv.status] || 'bg-slate-100 text-slate-600'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Create your first invoice</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              Start invoicing your clients professionally. Track payments, send reminders, and generate reports.
            </p>
            <Link
              href="/app/invoices/new"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Invoice
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
