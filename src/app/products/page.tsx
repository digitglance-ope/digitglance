import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

function Check({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Dash() {
  return (
    <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  )
}

const INVOICE_PLANS = [
  {
    name: 'Free',
    price: '₦0',
    period: 'forever',
    desc: 'For freelancers getting started',
    color: 'border-slate-200',
    btnStyle: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
    btnText: 'Get Started Free',
    href: '/app/login',
    features: [
      { text: 'Up to 20 invoices / month', included: true },
      { text: '1 user', included: true },
      { text: 'PDF invoice download', included: true },
      { text: 'Customer management', included: true },
      { text: 'Email to customer', included: true },
      { text: 'Inventory management', included: false },
      { text: 'Supplier management', included: false },
      { text: 'VAT reports', included: false },
      { text: 'AI tools', included: false },
      { text: 'Team access', included: false },
    ],
  },
  {
    name: 'Starter',
    price: '₦5,000',
    period: '/month',
    desc: 'For growing small businesses',
    color: 'border-teal-400 ring-1 ring-teal-400',
    btnStyle: 'bg-teal-600 hover:bg-teal-700 text-white',
    btnText: 'Start Starter Plan',
    href: '/app/subscription',
    badge: 'Most Popular',
    features: [
      { text: 'Up to 100 invoices / month', included: true },
      { text: '1 user included (+₦2,000 each)', included: true },
      { text: 'PDF invoice download', included: true },
      { text: 'Customer management', included: true },
      { text: 'Email to customer', included: true },
      { text: 'Inventory management', included: true },
      { text: 'Supplier management', included: false },
      { text: 'Output VAT report', included: true },
      { text: 'AI invoice reminder', included: true },
      { text: 'Team access', included: true },
    ],
  },
  {
    name: 'Pro',
    price: '₦12,000',
    period: '/month',
    desc: 'For established businesses',
    color: 'border-slate-200',
    btnStyle: 'bg-slate-900 hover:bg-slate-800 text-white',
    btnText: 'Start Pro Plan',
    href: '/app/subscription',
    features: [
      { text: 'Unlimited invoices', included: true },
      { text: '2 users included (+₦2,000 each)', included: true },
      { text: 'PDF invoice download', included: true },
      { text: 'Customer management', included: true },
      { text: 'Email to customer', included: true },
      { text: 'Inventory management', included: true },
      { text: 'Supplier management', included: true },
      { text: 'Full VAT & liability reports', included: true },
      { text: 'All 10 AI tools', included: true },
      { text: 'Team access + audit log', included: true },
    ],
  },
]

const POS_PLANS = [
  {
    name: 'POS Starter',
    price: '₦8,000',
    period: '/month',
    desc: 'For single-location retail',
    color: 'border-slate-200',
    btnStyle: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
    btnText: 'Start Free Trial',
    href: '/app/pos/activate',
    features: [
      { text: '1 branch, 1 terminal', included: true },
      { text: 'Up to 500 products', included: true },
      { text: 'Fast checkout terminal', included: true },
      { text: 'NRS VAT compliance', included: true },
      { text: 'Sales reports + CSV export', included: true },
      { text: '3 branches / terminals', included: false },
      { text: 'Vendor management', included: false },
      { text: 'Customer accounts & A/R', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'POS Pro',
    price: '₦18,000',
    period: '/month',
    desc: 'For multi-branch operations',
    color: 'border-blue-400 ring-1 ring-blue-400',
    btnStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
    btnText: 'Start Free Trial',
    href: '/app/pos/activate',
    badge: 'Most Popular',
    features: [
      { text: '3 branches, 3 terminals', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Fast checkout terminal', included: true },
      { text: 'NRS VAT compliance', included: true },
      { text: 'Full reports + CSV export', included: true },
      { text: 'Vendor management', included: true },
      { text: 'Customer accounts & A/R', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-teal-400 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full border border-teal-400 translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">DigitGlance Platform</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 max-w-3xl leading-tight">
            One platform. Every tool your Nigerian business needs.
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">
            Invoicing, Point of Sale, AI automation, and more — all built with Naira, 7.5% VAT, and NRS compliance from day one.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { label: 'Invoice', color: 'bg-teal-600/20 text-teal-300 border border-teal-700', badge: 'Live' },
              { label: 'Point of Sale', color: 'bg-blue-600/20 text-blue-300 border border-blue-700', badge: 'Live' },
              { label: 'Accounting', color: 'bg-purple-600/20 text-purple-300 border border-purple-700', badge: 'Soon' },
              { label: 'School Manager', color: 'bg-orange-600/20 text-orange-300 border border-orange-700', badge: 'Soon' },
            ].map(p => (
              <span key={p.label} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${p.color}`}>
                {p.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${p.badge === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}>
                  {p.badge}
                </span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/app/login" className="bg-teal-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-500 transition-colors text-sm shadow-lg shadow-teal-900/30">
              Start Free with Invoice
            </Link>
            <Link href="#pos" className="border border-slate-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:border-blue-400 hover:text-blue-400 transition-all text-sm">
              Explore POS
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-4">No credit card required. Free Invoice plan available forever.</p>
        </div>
      </section>

      {/* ─── PRODUCT OVERVIEW CARDS ─── */}
      <section className="px-6 py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-8">Everything in one platform</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Invoice Manager', desc: 'Invoicing, VAT reports, supplier management, and inventory.', href: '#invoice', status: 'Live', iconBg: 'bg-teal-100 text-teal-600', badge: 'bg-teal-100 text-teal-700', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { name: 'Point of Sale', desc: 'Fast checkout, multi-branch inventory, NRS VAT compliance.', href: '#pos', status: 'Live', iconBg: 'bg-blue-100 text-blue-600', badge: 'bg-blue-100 text-blue-700', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
              { name: 'Accounting Suite', desc: 'Double-entry bookkeeping, P&L, balance sheet, and tax prep.', href: '#coming-soon', status: 'Coming Soon', iconBg: 'bg-purple-100 text-purple-500', badge: 'bg-slate-100 text-slate-500', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
              { name: 'School Manager', desc: 'Student enrollment, fee collection, class scheduling, results.', href: '#coming-soon', status: 'Coming Soon', iconBg: 'bg-orange-100 text-orange-500', badge: 'bg-slate-100 text-slate-500', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
            ].map(p => (
              <a key={p.name} href={p.href} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${p.iconBg}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.badge}`}>{p.status}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          INVOICE SECTION
      ═══════════════════════════════════════════════════ */}
      <section id="invoice" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                Invoice Manager — Live
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                Stop sending invoices on WhatsApp. Look professional from day one.
              </h2>
              <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                Create professional invoices in seconds, track every payment, manage your customers and suppliers, and generate NRS-ready VAT reports — all from one dashboard.
              </p>
              <div className="flex gap-4">
                <Link href="/app/login" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                  Start Free
                </Link>
                <Link href="#invoice-pricing" className="border border-slate-300 hover:border-teal-400 text-slate-700 hover:text-teal-600 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                  See Pricing
                </Link>
              </div>
            </div>
            {/* Invoice mockup */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Invoice from</p>
                    <p className="font-bold text-slate-900">Your Business Name</p>
                    <p className="text-xs text-slate-500 mt-0.5">Lagos, Nigeria · TIN: 1234567890</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">PAID</span>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-5">
                  <p className="text-xs text-slate-500 mb-1">Billed to</p>
                  <p className="font-semibold text-slate-900 text-sm">Adeyemi General Stores</p>
                  <p className="text-xs text-slate-400">Invoice #INV-0041 · Due 15 May 2026</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-slate-600">Web Design Service</span><span className="font-medium">₦75,000</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Domain & Hosting (1yr)</span><span className="font-medium">₦12,000</span></div>
                  <div className="border-t border-slate-100 pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₦87,000</span></div>
                    <div className="flex justify-between text-teal-600 font-medium"><span>VAT 7.5%</span><span>₦6,525</span></div>
                    <div className="flex justify-between font-bold text-slate-900 text-base pt-1"><span>Total</span><span>₦93,525</span></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-teal-600 text-white text-xs font-semibold py-2 rounded-lg text-center">Download PDF</div>
                  <div className="flex-1 border border-slate-300 text-slate-600 text-xs font-semibold py-2 rounded-lg text-center">Send Email</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="mb-20">
            <h3 className="text-xl font-bold text-slate-900 text-center mb-10">Everything you need to manage your business finances</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Professional invoices', body: 'Auto-numbering, customer details, payment terms, and your business branding. Download as PDF instantly.' },
                { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'NRS VAT reporting', body: 'Output VAT report, input VAT from purchases, and net VAT liability — all ready for NRS submission.' },
                { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Customer management', body: 'Full customer profiles, invoice history, payment records, and customer statements with outstanding balance.' },
                { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Inventory tracking', body: 'Stock in, stock out, and cost vs. selling price. Inventory valuation report with closing stock values.' },
                { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', title: 'Supplier management', body: 'Purchase invoices, supplier payments, accounts payable, and supplier statements.' },
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'AI tools built-in', body: 'AI invoice reminders, financial report commentary, VAT automation, and more — on Starter and Pro.' },
              ].map(feat => (
                <div key={feat.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{feat.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice Pricing */}
          <div id="invoice-pricing">
            <div className="text-center mb-10">
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Invoice Pricing</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Start free. Upgrade when you need to.</h3>
              <p className="text-slate-500">All plans include a 14-day free trial. Cancel anytime.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {INVOICE_PLANS.map(plan => (
                <div key={plan.name} className={`bg-white border-2 rounded-2xl p-7 relative ${plan.color}`}>
                  {'badge' in plan && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-slate-500 mb-1">{plan.name}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-xs text-slate-400">{plan.desc}</p>
                  </div>
                  <Link href={plan.href} className={`w-full block text-center text-sm font-semibold py-3 rounded-xl mb-6 transition-colors ${plan.btnStyle}`}>
                    {plan.btnText}
                  </Link>
                  <div className="space-y-3">
                    {plan.features.map(f => (
                      <div key={f.text} className="flex items-start gap-2.5">
                        {f.included ? <Check className="text-teal-600 mt-0.5" /> : <Dash />}
                        <span className={`text-sm ${f.included ? 'text-slate-700' : 'text-slate-400'}`}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-6">Paystack secure checkout · Cancel anytime · Prices in Nigerian Naira (NGN)</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          POS SECTION
      ═══════════════════════════════════════════════════ */}
      <section id="pos" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                Point of Sale — Live
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                A Point of Sale system built for Nigerian retail
              </h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Fast checkout, multi-branch inventory, NRS VAT compliance, and real-time sales reporting — purpose-built for supermarkets, boutiques, pharmacies, and multi-branch businesses in Nigeria.
              </p>
              <div className="flex gap-4">
                <Link href="/app/pos/activate" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                  Start Free Trial
                </Link>
                <Link href="#pos-pricing" className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                  See Pricing
                </Link>
              </div>
            </div>
            {/* POS terminal mockup */}
            <div className="bg-slate-800 rounded-3xl p-7 border border-slate-700">
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-white">Quick Checkout</p>
                  <span className="text-xs text-blue-400 bg-blue-900/50 px-2.5 py-1 rounded-full">Branch: Lagos Main</span>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { name: 'Indomie Noodles ×3', price: '₦1,350' },
                    { name: 'Milo 400g ×1', price: '₦3,200' },
                    { name: 'Mineral Water ×6', price: '₦1,800' },
                  ].map(item => (
                    <div key={item.name} className="flex justify-between bg-slate-800 rounded-lg px-3 py-2 text-sm">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-white font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-700 pt-3 space-y-1.5 text-sm mb-4">
                  <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₦6,350</span></div>
                  <div className="flex justify-between text-slate-400"><span>VAT (7.5%)</span><span>₦476</span></div>
                  <div className="flex justify-between text-white font-bold text-lg pt-1"><span>Total</span><span>₦6,826</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl text-center">Card</div>
                  <div className="bg-teal-600 text-white text-sm font-semibold py-2.5 rounded-xl text-center">Cash</div>
                </div>
              </div>
            </div>
          </div>

          {/* POS Feature grid */}
          <div className="mb-20">
            <h3 className="text-xl font-bold text-white text-center mb-10">Built for Nigerian retail, inside and out</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Sub-second checkout', body: 'Item search or barcode scan. Handle dozens of transactions per hour without slowing down.' },
                { title: 'Multi-branch inventory', body: 'Each branch tracks its own stock. Central dashboard shows total stock position across all locations.' },
                { title: 'NRS VAT compliance', body: 'Vatable (7.5%), Zero-rated, Exempt, and Non-vatable classifications. Monthly NRS schedule auto-generated.' },
                { title: 'Shift reconciliation', body: 'Open and close each shift with cash counts. Track sales by cashier and flag discrepancies.' },
                { title: 'Customer accounts', body: 'Credit sales, customer ledger, and accounts receivable management built into the terminal.' },
                { title: 'Real-time reports', body: 'Sales summary, inventory movement, VAT output, and shift performance — all updated in real time.' },
              ].map(feat => (
                <div key={feat.title} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mb-3" />
                  <h4 className="text-sm font-bold text-white mb-2">{feat.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* POS Pricing */}
          <div id="pos-pricing">
            <div className="text-center mb-10">
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">POS Pricing</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">14-day free trial. No setup fees.</h3>
              <p className="text-slate-400">Both plans include full NRS VAT compliance and inventory management.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {POS_PLANS.map(plan => (
                <div key={plan.name} className={`bg-slate-800 border-2 rounded-2xl p-7 relative ${plan.color}`}>
                  {'badge' in plan && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <p className="text-sm font-semibold text-slate-400 mb-1">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">{plan.desc}</p>
                  <Link href={plan.href} className={`w-full block text-center text-sm font-semibold py-3 rounded-xl mb-6 transition-colors ${plan.btnStyle}`}>
                    {plan.btnText}
                  </Link>
                  <div className="space-y-3">
                    {plan.features.map(f => (
                      <div key={f.text} className="flex items-start gap-2.5">
                        {f.included
                          ? <Check className="text-blue-400 mt-0.5" />
                          : <svg className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                        }
                        <span className={`text-sm ${f.included ? 'text-slate-300' : 'text-slate-600'}`}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMING SOON ─── */}
      <section id="coming-soon" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">Coming Soon</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">More products in development</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Two more modules are in active development and will be added to the platform.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: 'DigitGlance Accounting',
                tag: 'In Development',
                icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                iconBg: 'bg-purple-100 text-purple-600',
                features: ['Full double-entry bookkeeping', 'Profit & Loss statement', 'Balance sheet', 'NRS tax preparation', 'Chart of accounts'],
              },
              {
                name: 'School Manager',
                tag: 'In Development',
                icon: 'M12 14l9-5-9-5-9 5 9 5z',
                iconBg: 'bg-orange-100 text-orange-600',
                features: ['Student enrollment & records', 'Fee collection & receipts', 'Class & term scheduling', 'Results management', 'Parent portal'],
              },
            ].map(p => (
              <div key={p.name} className="bg-white border border-slate-200 rounded-2xl p-7 opacity-80">
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.iconBg}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                    </svg>
                  </div>
                  <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1 rounded-full">{p.tag}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-4">{p.name}</h3>
                <div className="space-y-2.5">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <Link href="/contact" className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors">
                    Join the waitlist →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 bg-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to get started?</h2>
          <p className="text-teal-100 text-lg mb-10">Start with Invoice free. Add POS when you are ready. No contracts, no setup fees.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/app/login" className="bg-white text-teal-700 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors text-base shadow-lg">
              Start Free Today
            </Link>
            <Link href="/contact" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all text-base">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
