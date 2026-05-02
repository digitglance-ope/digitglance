import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'DigitGlance Invoice | Products',
  description: 'DigitGlance Invoice — the invoice and accounting tool Nigerian businesses actually need. Create invoices, track VAT, manage suppliers, and understand your cash flow.',
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.856L.057 23.215a.75.75 0 00.916.916l5.355-1.479A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 01-4.964-1.361l-.355-.213-3.681 1.016 1.017-3.681-.213-.355A9.725 9.725 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  )
}

const invoicingFeatures = [
  'Auto-generated invoice numbers',
  'Line items with inventory selector',
  'VAT calculated per line item at 7.5%',
  'PDF download and print ready',
  'Email invoice directly to customer',
  'Track partial payments and balances',
]
const vatReportFeatures = [
  'Output VAT report by invoice',
  'Input VAT from supplier purchases',
  'Net VAT liability or credit for NRS',
  'Accounts receivable by customer',
  'Accounts payable by supplier',
  'Inventory valuation with cost prices',
]
const supplierFeatures = [
  'Add and manage all your suppliers',
  'Create purchase invoices with line items',
  'Auto-update inventory stock on purchase',
  'Record supplier payments',
  'Full supplier statement view',
  'Input VAT tracked automatically',
]

const featureGroups = [
  {
    category: 'Invoicing',
    accent: '#27AE60',
    bg: '#eafaf1',
    features: [
      'Professional invoice creation', 'Auto invoice numbering', 'Multiple line items',
      'VAT per line item at 7.5%', 'PDF download and print', 'Email invoice to customer',
      'Payment status tracking', 'Partial payment recording', 'Quick add customer on the fly',
    ],
  },
  {
    category: 'Customers & Suppliers',
    accent: '#1B4F72',
    bg: '#e8f4fd',
    features: [
      'Customer database', 'Customer statements', 'Supplier database',
      'Supplier statements', 'Purchase invoice creation', 'Supplier payment recording',
      'Payment history per supplier', 'Accounts receivable report', 'Accounts payable report',
    ],
  },
  {
    category: 'Inventory & Reports',
    accent: '#d97706',
    bg: '#fffbeb',
    features: [
      'Inventory item management', 'Cost price and selling price', 'Auto stock update on purchase',
      'Auto stock update on sale', 'Inventory valuation report', 'VAT liability report',
      'Output and input VAT tracking', 'NRS VAT return summary', 'CSV export for all reports',
    ],
  },
]

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    desc: 'Get started with no cost',
    featured: false,
    dark: false,
    features:  ['20 invoices per month', 'Customer management', 'PDF downloads', 'Basic reports'],
    excluded:  ['Inventory management', 'VAT reports', 'Supplier management', 'User control'],
    btnHref: '/app/register',
    btnLabel: 'Start for Free',
    btnClass: 'btn-green-outline',
  },
  {
    name: 'Starter',
    price: '₦5,000',
    period: '/month',
    original: '₦7,500',
    desc: 'For growing businesses',
    badge: 'Most Popular',
    featured: true,
    dark: false,
    features:  ['100 invoices per month', 'Inventory (up to 1,000 items)', 'Full reports and VAT report', 'User control (1 user included)', 'Additional users at ₦2,000 each'],
    excluded:  ['Supplier management', 'Accounts payable'],
    btnHref: '/app/register',
    btnLabel: 'Get Started',
    btnClass: 'btn-green',
  },
  {
    name: 'Pro',
    price: '₦12,000',
    period: '/month',
    original: '₦18,000',
    desc: 'Full access for established businesses',
    badge: 'Best Value',
    featured: false,
    dark: true,
    features:  ['Unlimited invoices', 'Unlimited inventory', 'Full reports and VAT report', 'Supplier management', 'Accounts payable and receivable', 'User control (2 users included)', 'Additional users at ₦2,000 each', 'Priority support'],
    excluded:  [],
    btnHref: '/app/register',
    btnLabel: 'Get Started',
    btnClass: 'btn-navy',
  },
]

export default function Products() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <span className="badge-green mb-6 inline-flex animate-fade-in-up">
            <span className="green-marker" />
            DigitGlance Invoice
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-tight mb-6 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            The invoice tool Nigerian<br />
            <span style={{ color: '#27AE60' }}>businesses actually need</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mb-9 leading-relaxed animate-fade-in-up anim-delay-200">
            Stop managing invoices in spreadsheets and WhatsApp chats. DigitGlance Invoice gives you a complete system to create invoices, track payments, manage suppliers, handle VAT, and understand your cash flow — all built for how Nigerian businesses work.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in-up anim-delay-300">
            <a href="/app/register" className="btn-green text-sm py-3 px-6">
              Start Free Today <IconArrow className="w-4 h-4" />
            </a>
            <a href="/app/login" className="btn-navy text-sm py-3 px-6">
              Sign In
            </a>
          </div>
          <p className="text-slate-400 text-xs mt-4 animate-fade-in anim-delay-500">No credit card required. Free plan available forever.</p>
        </div>
      </section>

      {/* ── DASHBOARD MOCKUP ─────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 mx-4 bg-white/10 rounded-md px-3 py-1 text-xs text-white/60">
                  app.digitglance.com/dashboard
                </div>
              </div>
              {/* App UI mockup */}
              <div className="flex" style={{ minHeight: '380px' }}>
                {/* Sidebar */}
                <div className="w-44 flex-shrink-0 p-4" style={{ background: '#0f2e45' }}>
                  <div className="mb-6">
                    <p className="text-white font-extrabold text-sm">
                      Digit<span style={{ color: '#27AE60' }}>Glance</span>
                    </p>
                    <p className="text-white/40 text-xs">Invoice System</p>
                  </div>
                  {[
                    { label: 'Dashboard', active: true },
                    { label: 'Invoices',   active: false },
                    { label: 'Customers',  active: false },
                    { label: 'Suppliers',  active: false },
                    { label: 'Inventory',  active: false },
                    { label: 'Reports',    active: false },
                  ].map(item => (
                    <div key={item.label} className={`flex items-center gap-2 px-2 py-2 rounded-lg mb-1 ${item.active ? 'bg-white/10 text-white' : 'text-white/40'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-green-400' : 'bg-white/20'}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
                {/* Main content */}
                <div className="flex-1 bg-[#f7fafc] p-5">
                  <div className="mb-4">
                    <p className="font-bold text-sm" style={{ color: '#1B4F72' }}>Dashboard</p>
                    <p className="text-slate-400 text-xs">Welcome back, Mustapha</p>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Total Invoiced',    value: '₦842,500', color: '#1B4F72' },
                      { label: 'Amount Collected',  value: '₦610,000', color: '#27AE60' },
                      { label: 'Outstanding',       value: '₦232,500', color: '#dc2626' },
                      { label: 'Total VAT',         value: '₦63,187',  color: '#d97706' },
                    ].map(stat => (
                      <div key={stat.label} className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                        <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                        <p className="font-extrabold text-sm" style={{ color: stat.color }}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Recent invoices */}
                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
                      <p className="text-xs font-semibold" style={{ color: '#1B4F72' }}>Recent Invoices</p>
                      <p className="text-xs" style={{ color: '#27AE60' }}>View all</p>
                    </div>
                    {[
                      { num: 'INV-0041', customer: 'Chukwuemeka Foods Ltd', amount: '₦85,000',  status: 'Paid',        bg: 'bg-green-50', text: 'text-green-700' },
                      { num: 'INV-0042', customer: 'Lagos Tech Hub',         amount: '₦142,500', status: 'Outstanding', bg: 'bg-red-50',   text: 'text-red-700' },
                      { num: 'INV-0043', customer: 'Bello Enterprises',      amount: '₦38,000',  status: 'Partial',     bg: 'bg-amber-50', text: 'text-amber-700' },
                    ].map(inv => (
                      <div key={inv.num} className="px-4 py-2.5 flex items-center justify-between border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white" style={{ background: '#1B4F72' }}>
                            {inv.customer.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold" style={{ color: '#1B4F72' }}>{inv.num}</p>
                            <p className="text-xs text-slate-400">{inv.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-xs font-bold text-slate-700">{inv.amount}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${inv.bg} ${inv.text}`}>{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">The DigitGlance Invoice dashboard. Real data, real time.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12">
            <span className="badge-navy mb-4 inline-flex">The Problem</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4" style={{ color: '#1B4F72' }}>
              Most Nigerian SMEs run their finances in chaos
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
              Between WhatsApp invoices, handwritten receipts, and Excel sheets that no one updates, money gets lost. Customers owe you money you cannot track. Tax time becomes a nightmare.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: 'Unpaid invoices pile up',    desc: 'Without a system, customers forget to pay and you forget to follow up. Outstanding balances grow quietly until cash flow becomes a crisis.' },
              { title: 'VAT filing is a scramble',   desc: 'Calculating Output VAT, Input VAT, and what you actually owe NRS at the end of each period takes hours when records are scattered.' },
              { title: 'No real financial picture',  desc: 'You cannot make good business decisions when you do not know your real revenue, what you owe suppliers, or whether your inventory is profitable.' },
            ].map(item => (
              <ScrollReveal key={item.title}>
                <div className="rounded-2xl p-6 h-full border border-red-100 bg-red-50">
                  <div className="w-8 h-1 rounded-full mb-4 bg-red-300" />
                  <h3 className="font-bold text-sm mb-2 text-red-800">{item.title}</h3>
                  <p className="text-red-700/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 1: INVOICING ─────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <div className="flex-1 max-w-lg">
              <ScrollReveal>
                <span className="badge-green mb-5 inline-flex">
                  <span className="green-marker" />
                  Invoicing
                </span>
                <h2 className="text-3xl font-extrabold mt-2 mb-5" style={{ color: '#1B4F72' }}>
                  Professional invoices in seconds
                </h2>
                <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                  Create clean, professional invoices with your business details, customer information, itemised line items, VAT at 7.5%, and payment terms. Download as PDF, print, or send directly to customers.
                </p>
                <ul className="space-y-3">
                  {invoicingFeatures.map(f => (
                    <li key={f} className="check-item">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                        <IconCheck className="w-3 h-3 text-[#27AE60]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* Invoice mockup */}
            <ScrollReveal delay={150} className="flex-1 w-full max-w-md">
              <div className="card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-extrabold text-sm" style={{ color: '#1B4F72' }}>Mustapha Bakers Ltd</p>
                    <p className="text-slate-400 text-xs">123 Marina Street, Lagos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-sm" style={{ color: '#27AE60' }}>INVOICE</p>
                    <p className="text-slate-400 text-xs">INV-0044</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-4">
                  <div><p className="font-semibold text-slate-700 mb-1">Bill To</p><p>Chukwuemeka Foods Ltd</p><p>Victoria Island, Lagos</p></div>
                  <div className="text-right"><p className="font-semibold text-slate-700 mb-1">Invoice Date</p><p>28 Apr 2026</p><p className="mt-1 font-semibold text-slate-700">Due Date</p><p>28 May 2026</p></div>
                </div>
                <table className="w-full text-xs mb-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-2 text-slate-500 font-semibold">Item</th>
                      <th className="text-right p-2 text-slate-500 font-semibold">Qty</th>
                      <th className="text-right p-2 text-slate-500 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50"><td className="p-2 text-slate-700">Bread Loaf (Large)</td><td className="p-2 text-right text-slate-500">50</td><td className="p-2 text-right font-semibold text-slate-800">₦40,000</td></tr>
                    <tr className="border-b border-gray-50"><td className="p-2 text-slate-700">Cake Layer</td><td className="p-2 text-right text-slate-500">10</td><td className="p-2 text-right font-semibold text-slate-800">₦50,000</td></tr>
                  </tbody>
                </table>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₦90,000</span></div>
                  <div className="flex justify-between font-semibold" style={{ color: '#27AE60' }}><span>VAT (7.5%)</span><span>₦6,750</span></div>
                  <div className="flex justify-between font-extrabold border-t border-gray-100 pt-2 mt-1 text-sm" style={{ color: '#1B4F72' }}><span>Total</span><span>₦96,750</span></div>
                </div>
                <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="text-xs text-green-700 font-semibold">Status</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-bold">Paid</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FEATURE 2: VAT REPORTS ───────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-14">
            {/* VAT Report mockup */}
            <ScrollReveal delay={150} className="flex-1 w-full max-w-md">
              <div className="card rounded-2xl p-6">
                <p className="font-extrabold text-sm mb-4" style={{ color: '#1B4F72' }}>VAT Liability Report</p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Output VAT', value: '₦63,187', bg: 'bg-green-50 border-green-100',  text: '#27AE60' },
                    { label: 'Input VAT',  value: '₦18,450', bg: 'bg-blue-50 border-blue-100',    text: '#1B4F72' },
                    { label: 'Net Payable',value: '₦44,737', bg: 'bg-amber-50 border-amber-100',  text: '#d97706' },
                  ].map(c => (
                    <div key={c.label} className={`border rounded-xl p-3 ${c.bg}`}>
                      <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                      <p className="font-extrabold text-sm" style={{ color: c.text }}>{c.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['Invoice Summary', 'Output VAT', 'VAT Liability', 'Receivable', 'Payable', 'Inventory'].map((tab, i) => (
                    <span key={tab} className={`text-xs px-2 py-1 rounded-lg font-medium ${i === 2 ? 'text-white' : 'bg-gray-100 text-slate-500'}`} style={i === 2 ? { background: '#27AE60' } : {}}>{tab}</span>
                  ))}
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { num: 'INV-0041', name: 'Chukwuemeka Foods', vat: '₦6,375' },
                    { num: 'INV-0042', name: 'Lagos Tech Hub',    vat: '₦10,687' },
                    { num: 'INV-0043', name: 'Bello Enterprises', vat: '₦2,850' },
                  ].map(row => (
                    <div key={row.num} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="font-semibold" style={{ color: '#1B4F72' }}>{row.num}</span>
                      <span className="text-slate-400">{row.name}</span>
                      <span className="font-semibold" style={{ color: '#27AE60' }}>{row.vat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="flex-1 max-w-lg">
              <ScrollReveal>
                <span className="badge-navy mb-5 inline-flex">VAT &amp; Reports</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-5" style={{ color: '#1B4F72' }}>
                  VAT and financial reports ready when you need them
                </h2>
                <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                  Every report you need for NRS compliance and business decisions is built in. Set a date range and get your numbers instantly. Export to CSV for your accountant.
                </p>
                <ul className="space-y-3">
                  {vatReportFeatures.map(f => (
                    <li key={f} className="check-item">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#e8f4fd', border: '1px solid #aed6f1' }}>
                        <IconCheck className="w-3 h-3 text-[#1B4F72]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 3: SUPPLIERS ─────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <div className="flex-1 max-w-lg">
              <ScrollReveal>
                <span className="badge-green mb-5 inline-flex">
                  <span className="green-marker" />
                  Supplier Management
                </span>
                <h2 className="text-3xl font-extrabold mt-2 mb-5" style={{ color: '#1B4F72' }}>
                  Full supplier and purchase management
                </h2>
                <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                  Track what you buy, from whom, and what you paid. Record purchase invoices from suppliers, update inventory stock automatically, track payments made, and view a full supplier statement at any time.
                </p>
                <ul className="space-y-3">
                  {supplierFeatures.map(f => (
                    <li key={f} className="check-item">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                        <IconCheck className="w-3 h-3 text-[#27AE60]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* Suppliers mockup */}
            <ScrollReveal delay={150} className="flex-1 w-full max-w-md">
              <div className="card rounded-2xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-semibold" style={{ color: '#1B4F72' }}>Suppliers</p>
                </div>
                {[
                  { name: 'ABC Flour Mills Ltd',    paid: '₦185,000' },
                  { name: 'Lagos Packaging Co',     paid: '₦67,500' },
                  { name: 'Zenith Sugar Supplies',  paid: '₦243,000' },
                ].map(s => (
                  <div key={s.name} className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white" style={{ background: '#1B4F72' }}>
                        {s.name.charAt(0)}
                      </div>
                      <p className="text-sm font-semibold" style={{ color: '#1B4F72' }}>{s.name}</p>
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#27AE60' }}>{s.paid}</span>
                  </div>
                ))}
                <div className="p-4">
                  <div className="rounded-xl p-3" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                    <p className="text-xs font-extrabold mb-2" style={{ color: '#1e8449' }}>New Purchase Invoice</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-600"><span>Flour (50kg bags)</span><span>₦125,000</span></div>
                      <div className="flex justify-between font-semibold" style={{ color: '#1B4F72' }}><span>Input VAT (7.5%)</span><span>₦9,375</span></div>
                      <div className="flex justify-between font-extrabold border-t border-green-200 pt-1 mt-1" style={{ color: '#1B4F72' }}><span>Total</span><span>₦134,375</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FULL FEATURES LIST ───────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-navy mb-4 inline-flex">Complete Feature List</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2" style={{ color: '#1B4F72' }}>Everything included</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {featureGroups.map((group, gi) => (
              <ScrollReveal key={group.category} delay={gi * 80}>
                <div className="card rounded-2xl p-6 h-full">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold mb-5" style={{ background: group.bg, color: group.accent }}>
                    {group.category}
                  </span>
                  <ul className="space-y-2">
                    {group.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: group.accent }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-green mb-4 inline-flex">
              <span className="green-marker" />
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3" style={{ color: '#1B4F72' }}>
              Simple, honest pricing
            </h2>
            <p className="text-slate-500 text-sm">No hidden fees. Cancel any time. Additional users at ₦2,000 per user per month.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 80}>
                <div className={`rounded-2xl p-8 relative border-2 h-full flex flex-col ${plan.dark ? 'bg-[#0f2e45] border-[#0f2e45]' : plan.featured ? 'bg-white border-[#27AE60]' : 'bg-white border-gray-200'}`}>
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${plan.featured ? 'text-white' : 'bg-[#0f2e45] text-white'}`} style={plan.featured ? { background: '#27AE60' } : {}}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <h3 className={`text-lg font-extrabold mb-1 ${plan.dark ? 'text-white' : ''}`} style={!plan.dark ? { color: '#1B4F72' } : {}}>{plan.name}</h3>
                  <p className={`text-xs mb-4 ${plan.dark ? 'text-white/50' : 'text-slate-400'}`}>{plan.desc}</p>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-extrabold ${plan.dark ? 'text-white' : ''}`} style={!plan.dark ? { color: '#1B4F72' } : {}}>{plan.price}</span>
                      <span className={`text-sm ${plan.dark ? 'text-white/40' : 'text-slate-400'}`}>{plan.period}</span>
                    </div>
                    {plan.original && <p className={`text-xs line-through mt-0.5 ${plan.dark ? 'text-white/30' : 'text-slate-300'}`}>{plan.original}/month</p>}
                  </div>
                  <div className="space-y-2 mb-6 flex-1">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm">
                        <IconCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.dark ? 'text-green-400' : 'text-[#27AE60]'}`} />
                        <span className={plan.dark ? 'text-white/80' : 'text-slate-600'}>{f}</span>
                      </div>
                    ))}
                    {plan.excluded.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm">
                        <IconX className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.dark ? 'text-white/20' : 'text-gray-300'}`} />
                        <span className={plan.dark ? 'text-white/30' : 'text-slate-300'}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={plan.btnHref}
                    className={`${plan.btnClass} text-sm py-3 justify-center`}
                  >
                    {plan.btnLabel}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON ──────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-10">
            <span className="badge-navy mb-4 inline-flex">Coming Soon</span>
            <h2 className="text-3xl font-extrabold mt-2 mb-2" style={{ color: '#1B4F72' }}>Products in Development</h2>
            <p className="text-slate-500 text-sm">Join the waitlist to be notified when they launch.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: 'DigitGlance Accounts',
                desc: 'A complete accounting software for Nigerian SMEs. General ledger, trial balance, financial statements, and tax reporting built around Nigerian standards and NRS requirements.',
              },
              {
                name: 'DigitGlance POS',
                desc: 'A point of sale system for retail and service businesses in Nigeria. Sales tracking, inventory management, and daily financial summaries connected directly to your accounts.',
              },
            ].map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <div className="card-feature h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-base" style={{ color: '#1B4F72' }}>{p.name}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">In Development</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{p.desc}</p>
                  <Link href="/contact" className="text-sm font-semibold hover:underline" style={{ color: '#27AE60' }}>
                    Join the Waitlist →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-navy px-5 sm:px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              Ready to take control of your business finances?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Start free today. No credit card needed. Upgrade when you are ready.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/app/register" className="btn-green text-base px-8 py-4 inline-flex">
                Create Free Account <IconArrow className="w-5 h-5" />
              </a>
              <Link href="/contact" className="btn-navy text-base px-8 py-4 inline-flex" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                Talk to Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/2348162357628?text=Hello%20DigitGlance%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 transition-colors text-sm font-semibold"
      >
        <IconWhatsApp className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </main>
  )
}
