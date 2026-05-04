import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AppSidebar from '@/components/AppSidebar'

export default async function PosDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/app/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name, plan')
    .eq('id', user.id)
    .single()

  // Fetch today's stats — gracefully returns 0 if tables not yet created
  const today = new Date()
  const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
  const dayEnd   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString()

  const [
    { data: todaySales },
    { count: branchCount },
    { count: productCount },
  ] = await Promise.all([
    supabase
      .from('pos_sales')
      .select('grand_total')
      .eq('account_owner_id', user.id)
      .eq('status', 'completed')
      .gte('posted_at', dayStart)
      .lte('posted_at', dayEnd),
    supabase
      .from('pos_branches')
      .select('*', { count: 'exact', head: true })
      .eq('account_owner_id', user.id),
    supabase
      .from('pos_products')
      .select('*', { count: 'exact', head: true })
      .eq('account_owner_id', user.id)
      .eq('is_active', true),
  ])

  const todayRevenue = todaySales?.reduce((s, r) => s + (r.grand_total || 0), 0) ?? 0
  const todayTxn     = todaySales?.length ?? 0
  const avgTicket    = todayTxn > 0 ? todayRevenue / todayTxn : 0

  const fmt = (n: number) => `₦${n.toLocaleString('en-NG', { minimumFractionDigits: 0 })}`

  const setupSteps = [
    {
      done: (branchCount ?? 0) > 0,
      label: 'Add your first branch',
      desc: 'Set up at least one branch before you can open a terminal.',
      href: '/app/pos/settings',
      cta: 'Go to Settings',
    },
    {
      done: (productCount ?? 0) > 0,
      label: 'Add products to your catalogue',
      desc: 'Stock your shelves — add products with barcodes, prices, and VAT classes.',
      href: '/app/pos/inventory',
      cta: 'Go to Inventory',
    },
    {
      done: todayTxn > 0,
      label: 'Open the POS Terminal',
      desc: 'Open a shift and make your first sale.',
      href: '/app/pos/terminal',
      cta: 'Open Terminal',
    },
  ]

  const setupDone = setupSteps.every(s => s.done)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {profile?.full_name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {profile?.business_name} &mdash; POS Dashboard
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: "Today's Revenue",    value: fmt(todayRevenue), icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 8v1m0-9a9 9 0 110 18A9 9 0 0112 3z', color: 'text-teal-600 bg-teal-50' },
            { label: 'Transactions',       value: String(todayTxn),  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'text-blue-600 bg-blue-50' },
            { label: 'Avg Ticket',         value: fmt(avgTicket),    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'text-purple-600 bg-purple-50' },
            { label: 'Active Products',    value: String(productCount ?? 0), icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'text-orange-600 bg-orange-50' },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
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

        {/* Setup guide or quick actions */}
        {!setupDone ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Setup Checklist</h2>
                <p className="text-sm text-slate-500">Complete these steps to start selling</p>
              </div>
            </div>

            <div className="space-y-3">
              {setupSteps.map((step, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${step.done ? 'border-green-100 bg-green-50' : 'border-slate-100 bg-slate-50'}`}>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${step.done ? 'bg-green-500' : 'bg-white border-2 border-slate-300'}`}>
                    {step.done && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${step.done ? 'text-green-700 line-through' : 'text-slate-900'}`}>{step.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                  {!step.done && (
                    <Link href={step.href} className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-lg">
                      {step.cta}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: 'Open Terminal',   href: '/app/pos/terminal',  desc: 'Start a shift and begin selling', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'View Reports',    href: '/app/pos/reports',   desc: 'Sales, VAT, and inventory reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-teal-600 hover:bg-teal-700' },
              { label: 'Manage Inventory', href: '/app/pos/inventory', desc: 'Products, stock levels, and GRN', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'bg-slate-700 hover:bg-slate-800' },
            ].map(action => (
              <Link key={action.href} href={action.href} className={`${action.color} text-white rounded-xl p-5 flex items-start gap-4 transition-colors`}>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-white/70 mt-0.5">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
