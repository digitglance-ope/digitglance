'use client'

import AppSidebar from '@/components/AppSidebar'

export default function PosReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AppSidebar product="pos" />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Sales, inventory, and finance reports with CSV export</p>
        </div>
        <PosComingSoon
          step="Step 6"
          features={[
            'Sales by product, category, customer, branch, and staff',
            'Inventory valuation, movements, aging, and reorder forecast',
            'VAT report — output, input, net liability (FIRS-ready)',
            'Customer and vendor balance reports',
            'Cash flow and gross margin reports',
            'Branch-to-branch performance comparison',
            'Staff sales leaderboard with GP%',
            'CSV export on all reports',
          ]}
        />
      </main>
    </div>
  )
}

function PosComingSoon({ step, features }: { step: string; features: string[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">{step}</span>
        <span className="text-xs text-slate-400">Building next</span>
      </div>
      <h2 className="text-lg font-bold text-slate-900 mb-2">This module is under active development</h2>
      <p className="text-sm text-slate-500 mb-6">
        This screen is scaffolded and ready. The full implementation will be built in the next development phase.
      </p>
      <ul className="space-y-2">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
