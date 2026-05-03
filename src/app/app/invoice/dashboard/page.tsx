import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AppSidebar from '@/components/AppSidebar'

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

  return (
    <div className="min-h-screen bg-slate-50 flex">

      <AppSidebar product="invoice" />

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
            href="/app/invoice/invoices/new"
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
              <Link href="/app/invoice/invoices" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
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
                      <Link href={`/app/invoice/invoices/${inv.id}`} className="text-sm font-semibold text-teal-600 hover:text-teal-700">
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
              href="/app/invoice/invoices/new"
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
