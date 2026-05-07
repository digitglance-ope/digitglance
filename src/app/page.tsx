import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

/* ─── Inline product-mockup dashboard ─── */
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Browser chrome */}
      <div className="bg-slate-800 rounded-t-2xl px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
        </div>
        <div className="flex-1 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400 mx-2">
          app.digitglance.com/invoice/dashboard
        </div>
      </div>
      {/* Screen */}
      <div className="bg-slate-50 border-x border-b border-slate-700 rounded-b-2xl overflow-hidden shadow-2xl">
        {/* Mini sidebar */}
        <div className="flex">
          <div className="w-14 bg-slate-900 min-h-48 flex flex-col items-center py-4 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-7 h-7 rounded-lg ${i === 0 ? 'bg-teal-500' : 'bg-slate-700'}`} />
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 p-4">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Total Invoiced', value: '₦2.4M', color: 'text-teal-600' },
                { label: 'Collected',      value: '₦1.9M', color: 'text-green-600' },
                { label: 'Outstanding',    value: '₦500K', color: 'text-amber-600' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white rounded-lg p-2.5 border border-slate-200">
                  <p className="text-xs text-slate-400 mb-1">{kpi.label}</p>
                  <p className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            {/* Invoice list preview */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
                Recent Invoices
              </div>
              {[
                { ref: 'INV-0041', customer: 'Adeyemi Stores', amount: '₦85,000', status: 'Paid', dot: 'bg-green-500' },
                { ref: 'INV-0040', customer: 'Buhari & Sons Ltd', amount: '₦142,000', status: 'Pending', dot: 'bg-amber-400' },
                { ref: 'INV-0039', customer: 'Chukwu Enterprises', amount: '₦67,500', status: 'Overdue', dot: 'bg-red-400' },
              ].map(row => (
                <div key={row.ref} className="flex items-center justify-between px-3 py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-xs font-medium text-slate-800">{row.ref}</p>
                    <p className="text-xs text-slate-400">{row.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-800">{row.amount}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <div className={`w-1.5 h-1.5 rounded-full ${row.dot}`} />
                      <p className="text-xs text-slate-500">{row.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── WhatsApp floating button ─── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.929a.5.5 0 00.614.614l6.073-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.032-1.383l-.36-.214-3.732.908.924-3.638-.235-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z" />
      </svg>
    </a>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNav />
      <WhatsAppButton />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                Built for Nigerian Businesses
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                Accounting software that{' '}
                <span className="text-teal-400">actually works</span>{' '}
                for Nigeria
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                Invoice management, Point of Sale, VAT compliance, and AI automation — built around how Nigerian SMEs actually operate.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/app/login" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-teal-900/30 text-sm">
                  Start Free Today
                </Link>
                <Link href="/products" className="border border-slate-600 hover:border-teal-500 hover:text-teal-400 text-slate-300 font-semibold px-7 py-3.5 rounded-xl transition-all text-sm">
                  See All Products
                </Link>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-700/50">
                {[
                  { stat: '₦0', sub: 'to get started' },
                  { stat: '7.5%', sub: 'VAT auto-calculated' },
                  { stat: '10+', sub: 'AI tools built-in' },
                  { stat: 'NRS', sub: 'compliant by default' },
                ].map(item => (
                  <div key={item.stat}>
                    <p className="text-2xl font-bold text-white">{item.stat}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-sm font-medium">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'CAC Registered' },
              { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', label: 'NRS & VAT Compliant' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'NDPR Data Privacy' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Multi-User Teams' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'AI-Powered Tools' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS GRID ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Products</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">One platform. Every tool your business needs.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              From invoicing to point of sale to AI automation — everything is built to work together and built for Nigeria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Invoice Manager',
                tag: 'Live',
                tagColor: 'bg-teal-100 text-teal-700',
                desc: 'Create invoices, track payments, manage customers, and generate VAT reports. Free to start.',
                href: '/products',
                btnStyle: 'bg-teal-600 hover:bg-teal-700 text-white',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                iconBg: 'bg-teal-100 text-teal-600',
              },
              {
                name: 'Point of Sale',
                tag: 'Live',
                tagColor: 'bg-blue-100 text-blue-700',
                desc: 'Fast checkout terminal, inventory tracking, NRS VAT compliance, and multi-branch management.',
                href: '/products',
                btnStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
                icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
                iconBg: 'bg-blue-100 text-blue-600',
              },
              {
                name: 'Accounting Suite',
                tag: 'Coming Soon',
                tagColor: 'bg-slate-100 text-slate-500',
                desc: 'Full double-entry bookkeeping, P&L statements, balance sheet, and tax preparation.',
                href: '/contact',
                btnStyle: 'border border-slate-300 text-slate-600 hover:bg-slate-50',
                icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                iconBg: 'bg-slate-100 text-slate-400',
              },
              {
                name: 'AI Tools',
                tag: 'Live',
                tagColor: 'bg-purple-100 text-purple-700',
                desc: '10 AI-powered tools for VAT, payroll, invoice reminders, financial reports, and NRS compliance.',
                href: '/ai-tools',
                btnStyle: 'bg-purple-600 hover:bg-purple-700 text-white',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                iconBg: 'bg-purple-100 text-purple-600',
              },
            ].map(product => (
              <div key={product.name} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${product.iconBg}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={product.icon} />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.tagColor}`}>{product.tag}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{product.desc}</p>
                <Link href={product.href} className={`w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${product.btnStyle}`}>
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Getting Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Up and running in minutes</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">No complex setup. No accountant required to start. Just sign up and go.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-teal-200 z-0" />

            {[
              { step: '01', title: 'Create your account', body: 'Sign up free. Enter your business name, and you are ready. No credit card needed to start.' },
              { step: '02', title: 'Add your business details', body: 'Set your branding, tax number, bank details, and pricing. Your first invoice takes under 2 minutes.' },
              { step: '03', title: 'Start managing your business', body: 'Create invoices, record sales, track inventory, generate VAT reports — all from one dashboard.' },
            ].map((item, i) => (
              <div key={item.step} className="relative z-10 bg-white rounded-2xl p-8 border border-slate-200 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 ${i === 1 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/app/login" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm shadow-md">
              Create Free Account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INVOICE FEATURE HIGHLIGHT ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Invoice Manager</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
              Professional invoicing built for how Nigerian business works
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              No more WhatsApp invoicing or Excel spreadsheets. Send professional PDF invoices, track every payment, manage customers, and stay VAT-compliant — all in one place.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { title: 'Naira-native invoicing', body: 'Amounts, formatting, and bank details built for Nigeria.' },
                { title: 'VAT at 7.5% auto-calculated', body: 'Per-item VAT toggle. Output VAT report ready for NRS filing.' },
                { title: 'PDF, email, and payment tracking', body: 'Send instantly, record part payments, see outstanding balances.' },
                { title: 'Team access controls', body: 'Invite staff with role-based permissions. Admin, manager, and viewer roles.' },
              ].map(feat => (
                <div key={feat.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{feat.title}</p>
                    <p className="text-sm text-slate-500">{feat.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href="/products" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                See Pricing
              </Link>
              <Link href="/app/login" className="border border-slate-300 hover:border-teal-400 text-slate-700 hover:text-teal-600 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                Try Free
              </Link>
            </div>
          </div>
          {/* Right: styled invoice preview */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-lg font-bold text-slate-900">INVOICE</p>
                  <p className="text-xs text-slate-400">#INV-0041</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">PAID</span>
              </div>
              <div className="space-y-1 mb-6 text-sm">
                <p className="font-semibold text-slate-900">Adeyemi General Stores</p>
                <p className="text-slate-500">Lagos Island, Lagos State</p>
              </div>
              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm mb-5">
                {[
                  { item: 'Web Design Service', qty: 1, price: '₦75,000' },
                  { item: 'Domain & Hosting (1yr)', qty: 1, price: '₦12,000' },
                ].map(line => (
                  <div key={line.item} className="flex justify-between">
                    <span className="text-slate-700">{line.item}</span>
                    <span className="font-medium text-slate-900">{line.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₦87,000</span></div>
                <div className="flex justify-between text-slate-500"><span>VAT (7.5%)</span><span>₦6,525</span></div>
                <div className="flex justify-between font-bold text-slate-900 text-base pt-1"><span>Total</span><span>₦93,525</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POS FEATURE HIGHLIGHT ─── */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: POS terminal mockup */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 order-2 lg:order-1">
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-white">New Sale</p>
                <span className="text-xs text-teal-400 bg-teal-900/50 px-2.5 py-1 rounded-full">Terminal 1</span>
              </div>
              <div className="space-y-2 mb-5">
                {[
                  { item: 'Indomie Noodles ×3', price: '₦1,350' },
                  { item: 'Milo 400g ×1',        price: '₦3,200' },
                  { item: 'Mineral Water ×6',    price: '₦1,800' },
                ].map(line => (
                  <div key={line.item} className="flex justify-between text-sm bg-slate-800 rounded-lg px-3 py-2">
                    <span className="text-slate-300">{line.item}</span>
                    <span className="font-medium text-white">{line.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-4 space-y-1.5 text-sm mb-5">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₦6,350</span></div>
                <div className="flex justify-between text-slate-400"><span>VAT 7.5%</span><span>₦476</span></div>
                <div className="flex justify-between font-bold text-white text-lg pt-1"><span>Total</span><span>₦6,826</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white text-sm font-semibold py-3 rounded-xl">Card</button>
                <button className="bg-teal-600 text-white text-sm font-semibold py-3 rounded-xl">Cash</button>
              </div>
            </div>
          </div>
          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">Point of Sale</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Fast checkout. Smart inventory. NRS-ready.
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Purpose-built for Nigerian retail — supermarkets, pharmacies, boutiques, and multi-branch businesses. Built for speed, built for compliance.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { title: 'Sub-second checkout', body: 'Barcode or quick-search item entry. Handles high-volume sales.' },
                { title: 'Multi-branch ready', body: 'Each branch has its own terminal and inventory. Central dashboard.' },
                { title: 'NRS VAT compliance', body: 'Automatic VAT classification — Vatable, Zero-rated, Exempt, Non-vatable.' },
                { title: 'Free 14-day trial', body: 'Start without a contract. No setup fees.' },
              ].map(feat => (
                <div key={feat.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{feat.title}</p>
                    <p className="text-sm text-slate-400">{feat.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href="/app/pos/activate" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                Start Free Trial
              </Link>
              <Link href="/products" className="border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                See Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI TOOLS HIGHLIGHT ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-wider mb-3">AI Automation</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">10 AI tools. Built for Nigerian accounting.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Every tool is trained on NRS regulations, Nigerian tax law, and real SME workflows. Not generic software adapted from overseas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { icon: '🤖', title: 'Invoice AI Reminders',    desc: 'AI-written payment reminders that sound professional. Sent by email in one click.' },
              { icon: '📊', title: 'FinReport AI',            desc: 'Plain-English commentary on your P&L, revenue trends, and cash position.' },
              { icon: '🧾', title: 'VAT Automation',          desc: 'Auto-reconciles output and input VAT. Generates NRS-format monthly schedules.' },
              { icon: '💰', title: 'Payroll AI',              desc: 'PAYE tax calculation, net pay, and payslip generation for Nigerian payroll.' },
              { icon: '📋', title: 'Tax Compliance Checker',  desc: 'Reviews your transactions against NRS thresholds and flags compliance risks.' },
              { icon: '📈', title: 'Cashflow Forecast',       desc: 'AI projection of your next 30/60/90-day cash position based on invoice history.' },
            ].map(tool => (
              <div key={tool.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-purple-200 hover:shadow-md transition-all group">
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/ai-tools" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-md">
              Explore All 10 AI Tools
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY DIGITGLANCE ─── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Our Difference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
              Built by an accountant who codes — for businesses like yours
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Most accounting software is designed for the UK or US market and adapted for Nigeria as an afterthought. DigitGlance was built from scratch for Nigerian businesses — Naira, VAT at 7.5%, NRS compliance, and how SMEs actually work.
            </p>
            <div className="space-y-5">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Dual expertise', body: 'Professional accountant and software developer in one team. The system is correct by design.' },
                { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'End-to-end support', body: 'From tax filing to custom software, we handle the full picture. You have one partner, not five.' },
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Always improving', body: 'New AI tools, reports, and features ship every month. Your subscription gets better over time.' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                MI
              </div>
              <div>
                <p className="font-bold text-slate-900">Mustapha Idris Opeyemi</p>
                <p className="text-sm text-slate-500">Founder — DigitGlance</p>
              </div>
            </div>
            <blockquote className="text-slate-700 text-base leading-relaxed mb-5 italic">
              &quot;I built DigitGlance because the software I found was designed for the UK and adapted for Nigeria. Every tool here is designed from the ground up for how Nigerian businesses actually operate.&quot;
            </blockquote>
            <div className="flex flex-wrap gap-2">
              {['Professional Accountant', 'Software Developer', 'Nigeria-Based', 'CAC Registered'].map(tag => (
                <span key={tag} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <Link href="/about" className="text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors flex items-center gap-1.5">
                Learn about DigitGlance
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">What our customers say</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Nigerian businesses using DigitGlance to manage their finances and grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { initial: 'AO', name: 'Ade Okonkwo', biz: 'Okonkwo General Supplies, Lagos', quote: 'Before DigitGlance I was sending invoices on WhatsApp. Now my clients get professional PDFs and I can see who has paid and who has not at a glance.' },
              { initial: 'FB', name: 'Fatima Bello', biz: 'FBQ Boutique, Abuja', quote: 'The POS system is fast and the VAT report saves me hours every month. My accountant loves that everything is already in the right format.' },
              { initial: 'CU', name: 'Chidi Ugwu', biz: 'Ugwu & Associates, Enugu', quote: 'We use both the invoice module and the AI tools. The payment reminder feature alone has improved our collection rate significantly.' },
            ].map(t => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-md transition-shadow">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-slate-700 text-sm leading-relaxed mb-5">&quot;{t.quote}&quot;</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.biz}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 px-6 bg-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Ready to take control of your business finances?
          </h2>
          <p className="text-teal-100 text-lg mb-10">
            Start free. No credit card required. Get your first invoice out in under 5 minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/app/login" className="bg-white text-teal-700 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors text-base shadow-lg">
              Start Free Today
            </Link>
            <Link href="/contact" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all text-base">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
