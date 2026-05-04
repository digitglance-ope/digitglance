export default function Products() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/services" className="hover:text-teal-600">Services</a>
            <a href="/products" className="text-teal-600">Products</a>
            <a href="/solutions" className="hover:text-teal-600">Solutions</a>
            <a href="/ai-tools" className="hover:text-teal-600">AI Tools</a>
            <a href="/blog" className="hover:text-teal-600">Blog</a>
            <a href="/app/login" className="hover:text-teal-600">Sign In</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-slate-900 text-white px-6 py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full border border-teal-400" />
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-teal-400" />
          <div className="absolute -bottom-10 left-20 w-80 h-80 rounded-full border border-teal-400" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <p className="text-teal-400 text-sm font-semibold mb-4 uppercase tracking-widest">DigitGlance Platform</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
            One platform, every tool your Nigerian business needs
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">
            DigitGlance brings together invoicing, point of sale, accounting, and school management in a single platform built for how Nigerian businesses actually operate — with naira, VAT at 7.5%, and NRS compliance built in from day one.
          </p>
          {/* Product pills */}
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
            <a href="/app/register" className="bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors">
              Start Free with Invoice
            </a>
            <a href="#pos" className="border border-slate-600 text-white font-semibold px-8 py-4 rounded-xl hover:border-blue-400 hover:text-blue-400 transition-colors">
              Explore POS
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-4">No credit card required. Free Invoice plan available forever.</p>
        </div>
      </section>

      {/* ── PRODUCT OVERVIEW CARDS ── */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-8">Our Products</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'DigitGlance Invoice',
                desc: 'Invoicing, VAT reports, supplier management, and inventory tracking.',
                href: '#invoice',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                status: 'Live',
                color: 'border-teal-200 hover:border-teal-400',
                iconBg: 'bg-teal-100 text-teal-600',
                badge: 'bg-teal-100 text-teal-700',
              },
              {
                name: 'DigitGlance POS',
                desc: 'Fast checkout, multi-branch inventory, FIRS VAT compliance.',
                href: '#pos',
                icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
                status: 'Live',
                color: 'border-blue-200 hover:border-blue-400',
                iconBg: 'bg-blue-100 text-blue-600',
                badge: 'bg-blue-100 text-blue-700',
              },
              {
                name: 'DigitGlance Accounting',
                desc: 'Double-entry bookkeeping, P&L, balance sheet, and tax prep.',
                href: '#coming-soon',
                icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                status: 'Coming Soon',
                color: 'border-slate-200 hover:border-purple-300 opacity-70',
                iconBg: 'bg-purple-100 text-purple-500',
                badge: 'bg-slate-100 text-slate-500',
              },
              {
                name: 'DigitGlance School',
                desc: 'Student enrollment, fee collection, results management.',
                href: '#coming-soon',
                icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
                status: 'Coming Soon',
                color: 'border-slate-200 hover:border-orange-300 opacity-70',
                iconBg: 'bg-orange-100 text-orange-500',
                badge: 'bg-slate-100 text-slate-500',
              },
            ].map(p => (
              <a key={p.name} href={p.href} className={`bg-white border rounded-2xl p-5 flex flex-col transition-all ${p.color}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${p.iconBg}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                  </svg>
                </div>
                <p className="font-bold text-slate-900 text-sm mb-1">{p.name}</p>
                <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-3">{p.desc}</p>
                <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full ${p.badge}`}>{p.status}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ INVOICE ════════════════════════════════ */}
      <div id="invoice" className="scroll-mt-20">

        {/* Invoice Section Header */}
        <section className="px-6 py-16 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Live Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">DigitGlance Invoice</h2>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Stop managing invoices in spreadsheets and WhatsApp chats. A complete system to create invoices, track payments, manage suppliers, handle VAT, and understand your cash flow — built for Nigerian businesses.
            </p>
            <p className="text-sm text-slate-400 mt-3">Best for: Freelancers, consultants, service businesses, trading companies, wholesalers</p>
          </div>
        </section>

        {/* Invoice Dashboard Mockup */}
        <section className="px-6 py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400">digitglance.com/app/invoice/dashboard</div>
              </div>
              <div className="flex" style={{minHeight: '400px'}}>
                <div className="w-44 bg-slate-900 p-4 flex-shrink-0">
                  <div className="mb-5">
                    <p className="text-white font-bold text-xs">Digit<span className="text-teal-400">Glance</span></p>
                    <p className="text-slate-500 text-xs">Invoice</p>
                  </div>
                  {['Dashboard', 'Invoices', 'Customers', 'Suppliers', 'Inventory', 'Reports'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 ${i === 0 ? 'bg-teal-600/20 text-teal-400' : 'text-slate-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-teal-400' : 'bg-slate-600'}`} />
                      <span className="text-xs font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 bg-slate-50 p-5">
                  <div className="mb-4">
                    <p className="text-slate-900 font-bold text-sm">Dashboard</p>
                    <p className="text-slate-400 text-xs">Welcome back, Mustapha</p>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Total Invoiced', value: '₦842,500', color: 'text-slate-900' },
                      { label: 'Collected', value: '₦610,000', color: 'text-green-600' },
                      { label: 'Outstanding', value: '₦232,500', color: 'text-red-500' },
                      { label: 'VAT Payable', value: '₦44,737', color: 'text-teal-600' },
                    ].map(s => (
                      <div key={s.label} className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-slate-400 text-xs mb-1">{s.label}</p>
                        <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600">Recent Invoices</p>
                      <p className="text-xs text-teal-600">View all</p>
                    </div>
                    {[
                      { num: 'INV-0041', customer: 'Chukwuemeka Foods Ltd', amount: '₦85,000', status: 'paid', color: 'bg-green-100 text-green-700' },
                      { num: 'INV-0042', customer: 'Lagos Tech Hub', amount: '₦142,500', status: 'outstanding', color: 'bg-red-100 text-red-700' },
                      { num: 'INV-0043', customer: 'Bello Enterprises', amount: '₦38,000', status: 'partial', color: 'bg-yellow-100 text-yellow-700' },
                    ].map(inv => (
                      <div key={inv.num} className="px-4 py-2.5 flex items-center justify-between border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                            <span className="text-teal-700 text-xs font-bold">{inv.customer.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-teal-600">{inv.num}</p>
                            <p className="text-xs text-slate-500">{inv.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-xs font-bold text-slate-900">{inv.amount}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${inv.color}`}>{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">Invoice dashboard — real data, real time.</p>
          </div>
        </section>

        {/* Invoice Features */}
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">What You Get</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Every invoice tool your business needs</h3>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">From your first invoice to your monthly VAT return — one workflow, one platform.</p>
            </div>

            {/* Feature 1: Invoicing */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Professional invoices in seconds</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">Create clean, professional invoices with itemised line items, VAT at 7.5%, and payment terms. Download as PDF or send directly to the customer by email.</p>
                <ul className="space-y-3">
                  {[
                    'Auto-generated invoice numbers',
                    'Line items with inventory selector',
                    'VAT calculated per line item at 7.5%',
                    'PDF download and print ready',
                    'Email invoice directly to customer',
                    'Track partial payments and outstanding balances',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Invoice mockup */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Mustapha Bakers Ltd</p>
                    <p className="text-slate-400 text-xs">123 Marina Street, Lagos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-teal-600 font-bold text-lg">INVOICE</p>
                    <p className="text-slate-400 text-xs">INV-0044</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-4">
                  <div><p className="font-semibold text-slate-700 mb-1">Bill To</p><p>Chukwuemeka Foods Ltd</p><p>Victoria Island, Lagos</p></div>
                  <div className="text-right"><p className="font-semibold text-slate-700 mb-1">Invoice Date</p><p>28 Apr 2026</p><p className="mt-1 font-semibold text-slate-700">Due Date</p><p>28 May 2026</p></div>
                </div>
                <table className="w-full text-xs mb-4">
                  <thead><tr className="bg-slate-50"><th className="text-left p-2 text-slate-500 font-semibold">Item</th><th className="text-right p-2 text-slate-500 font-semibold">Qty</th><th className="text-right p-2 text-slate-500 font-semibold">Price</th><th className="text-right p-2 text-slate-500 font-semibold">Amount</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-slate-50"><td className="p-2 text-slate-700">Bread Loaf (Large)</td><td className="p-2 text-right text-slate-600">50</td><td className="p-2 text-right text-slate-600">₦800</td><td className="p-2 text-right font-medium text-slate-900">₦40,000</td></tr>
                    <tr className="border-b border-slate-50"><td className="p-2 text-slate-700">Cake Layer</td><td className="p-2 text-right text-slate-600">10</td><td className="p-2 text-right text-slate-600">₦5,000</td><td className="p-2 text-right font-medium text-slate-900">₦50,000</td></tr>
                  </tbody>
                </table>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₦90,000</span></div>
                  <div className="flex justify-between text-teal-600 font-medium"><span>VAT (7.5%)</span><span>₦6,750</span></div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 mt-2 text-sm"><span>Total</span><span>₦96,750</span></div>
                </div>
                <div className="mt-4 bg-green-50 border border-green-100 rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-xs text-green-700 font-semibold">Status</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Paid</span>
                </div>
              </div>
            </div>

            {/* Feature 2: Reports */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <p className="text-sm font-bold text-slate-900 mb-4">VAT Liability Report</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Output VAT', value: '₦63,187', color: 'text-teal-600', bg: 'bg-teal-50 border-teal-100' },
                      { label: 'Input VAT', value: '₦18,450', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
                      { label: 'Net Payable', value: '₦44,737', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
                    ].map(c => (
                      <div key={c.label} className={`border rounded-xl p-3 ${c.bg}`}>
                        <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                        <p className={`font-bold text-sm ${c.color}`}>{c.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {['Invoice Summary', 'Output VAT', 'VAT Liability', 'Receivable', 'Payable', 'Inventory'].map((tab, i) => (
                      <span key={tab} className={`text-xs px-2 py-1 rounded-lg font-medium ${i === 2 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{tab}</span>
                    ))}
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      ['INV-0041', 'Chukwuemeka Foods', '₦6,375'],
                      ['INV-0042', 'Lagos Tech Hub', '₦10,687'],
                      ['INV-0043', 'Bello Enterprises', '₦2,850'],
                    ].map(([num, name, vat]) => (
                      <div key={num} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
                        <span className="text-teal-600 font-medium">{num}</span>
                        <span className="text-slate-500">{name}</span>
                        <span className="text-teal-600 font-semibold">{vat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">VAT and financial reports, ready when you need them</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">Every report you need for NRS compliance and business decisions is built in. Set a date range, get your numbers instantly. Export to CSV for your accountant.</p>
                <ul className="space-y-3">
                  {[
                    'Output VAT report by invoice',
                    'Input VAT from supplier purchases',
                    'Net VAT liability or credit for NRS',
                    'Accounts receivable by customer',
                    'Accounts payable by supplier',
                    'Inventory valuation with cost prices',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3: Suppliers */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Full supplier and purchase management</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">Track what you buy, from whom, and what you paid. Purchase invoices automatically update inventory stock so your numbers are always current.</p>
                <ul className="space-y-3">
                  {[
                    'Add and manage all your suppliers',
                    'Create purchase invoices with line items',
                    'Auto-update inventory stock on purchase',
                    'Record supplier payments',
                    'Full supplier statement view',
                    'Input VAT tracked automatically',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-600">Suppliers</p>
                </div>
                {[
                  { name: 'ABC Flour Mills Ltd', phone: '0801 234 5678', paid: '₦185,000' },
                  { name: 'Lagos Packaging Co', phone: '0802 345 6789', paid: '₦67,500' },
                  { name: 'Zenith Sugar Supplies', phone: '0803 456 7890', paid: '₦243,000' },
                ].map(s => (
                  <div key={s.name} className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">{s.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.phone}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-900">{s.paid}</span>
                  </div>
                ))}
                <div className="px-4 py-3">
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                    <p className="text-xs font-bold text-purple-800 mb-2">New Purchase Invoice</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600"><span>Flour (50kg bags)</span><span>₦125,000</span></div>
                      <div className="flex justify-between text-xs text-slate-600"><span>Input VAT (7.5%)</span><span className="text-blue-600">₦9,375</span></div>
                      <div className="flex justify-between text-xs font-bold text-slate-900 border-t border-purple-100 pt-1 mt-1"><span>Total</span><span>₦134,375</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Invoice Full Feature List */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Invoice — Complete Feature List</p>
              <h3 className="text-3xl font-bold text-slate-900">Everything included</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: 'Invoicing',
                  color: 'text-teal-600',
                  bg: 'bg-teal-50',
                  features: [
                    'Professional invoice creation',
                    'Auto invoice numbering',
                    'Multiple line items',
                    'VAT per line item at 7.5%',
                    'PDF download and print',
                    'Email invoice to customer',
                    'Payment status tracking',
                    'Partial payment recording',
                    'Quick add customer on the fly',
                  ],
                },
                {
                  category: 'Customers and Suppliers',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50',
                  features: [
                    'Customer database',
                    'Customer statements',
                    'Supplier database',
                    'Supplier statements',
                    'Purchase invoice creation',
                    'Supplier payment recording',
                    'Payment history per supplier',
                    'Accounts receivable report',
                    'Accounts payable report',
                  ],
                },
                {
                  category: 'Inventory and Reports',
                  color: 'text-orange-600',
                  bg: 'bg-orange-50',
                  features: [
                    'Inventory item management',
                    'Cost price and selling price',
                    'Auto stock update on purchase',
                    'Auto stock update on sale',
                    'Inventory valuation report',
                    'VAT liability report',
                    'Output and input VAT tracking',
                    'NRS VAT return summary',
                    'CSV export for all reports',
                  ],
                },
              ].map(group => (
                <div key={group.category}>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${group.bg} ${group.color}`}>
                    {group.category}
                  </div>
                  <ul className="space-y-2">
                    {group.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <svg className={`w-4 h-4 flex-shrink-0 ${group.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Invoice Pricing */}
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Invoice Pricing</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Simple, honest pricing</h3>
              <p className="text-slate-500">No hidden fees. Cancel any time. Additional users at ₦2,000 per user per month.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Free',
                  price: '₦0',
                  period: 'forever',
                  desc: 'Get started with no cost',
                  color: 'border-slate-200',
                  btn: 'border border-teal-300 text-teal-600 hover:bg-teal-50',
                  btnText: 'Start for Free',
                  features: ['20 invoices per month', 'Customer management', 'PDF downloads', 'Basic reports'],
                  excluded: ['Inventory management', 'VAT reports', 'Supplier management', 'User control'],
                },
                {
                  name: 'Starter',
                  price: '₦5,000',
                  period: '/month',
                  original: '₦7,500',
                  desc: 'For growing businesses',
                  color: 'border-teal-500',
                  badge: 'Most Popular',
                  btn: 'bg-teal-600 text-white hover:bg-teal-700',
                  btnText: 'Get Started',
                  features: ['100 invoices per month', 'Inventory (up to 1,000 items)', 'Full reports and VAT report', 'User control (1 user included)', 'Additional users at ₦2,000 each'],
                  excluded: ['Supplier management', 'Accounts payable'],
                },
                {
                  name: 'Pro',
                  price: '₦12,000',
                  period: '/month',
                  original: '₦18,000',
                  desc: 'Full access for established businesses',
                  color: 'border-slate-800',
                  badge: 'Best Value',
                  btn: 'bg-slate-900 text-white hover:bg-slate-800',
                  btnText: 'Get Started',
                  features: ['Unlimited invoices', 'Unlimited inventory', 'Full reports and VAT report', 'Supplier management', 'Accounts payable and receivable', 'User control (2 users included)', 'Additional users at ₦2,000 each', 'Priority support'],
                  excluded: [],
                },
              ].map(plan => (
                <div key={plan.name} className={`bg-white border-2 rounded-2xl p-8 relative ${plan.color}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${plan.name === 'Starter' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-white'}`}>{plan.badge}</span>
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-400 text-sm">{plan.period}</span>
                    </div>
                    {plan.original && <p className="text-xs text-slate-400 line-through mt-0.5">{plan.original}/month</p>}
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </div>
                    ))}
                    {plan.excluded.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-400">
                        <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <a href="/app/register" className={`block text-center font-semibold py-3 rounded-xl text-sm transition-colors ${plan.btn}`}>
                    {plan.btnText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      {/* ── END INVOICE ── */}

      {/* ════════════════════════════════ POS ════════════════════════════════ */}
      <div id="pos" className="scroll-mt-20">

        {/* POS Section Header */}
        <section className="px-6 py-16 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-700">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="bg-blue-600/20 text-blue-300 border border-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Live Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">DigitGlance POS</h2>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
              A point of sale system built for Nigerian retail. Fast checkout, multi-branch inventory, FIRS VAT compliance, and real-time sales reporting — all in one system.
            </p>
            <p className="text-slate-500 text-sm mt-3">Best for: Supermarkets, pharmacies, retail shops, restaurants, beauty salons, hardware stores</p>
            <a href="/contact" className="inline-block mt-8 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors">
              Add POS to Your Account
            </a>
          </div>
        </section>

        {/* POS Dashboard Mockup */}
        <section className="px-6 py-16 bg-gradient-to-b from-slate-900 to-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400">digitglance.com/app/pos/dashboard</div>
              </div>
              <div className="flex" style={{minHeight: '400px'}}>
                {/* Sidebar */}
                <div className="w-44 bg-slate-900 p-4 flex-shrink-0">
                  <div className="mb-5">
                    <p className="text-white font-bold text-xs">Digit<span className="text-blue-400">Glance</span></p>
                    <p className="text-slate-500 text-xs">Point of Sale</p>
                  </div>
                  {['Dashboard', 'New Sale', 'Sales History', 'Inventory', 'Customers', 'Reports'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 ${i === 0 ? 'bg-blue-600/20 text-blue-400' : 'text-slate-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-400' : 'bg-slate-600'}`} />
                      <span className="text-xs font-medium">{item}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-slate-600 text-xs px-2 mb-2 font-semibold uppercase tracking-wider">Branches</p>
                    {['HQ — Marina', 'Branch 2 — VI'].map((b, i) => (
                      <div key={b} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 ${i === 0 ? 'text-blue-400' : 'text-slate-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-400' : 'bg-slate-700'}`} />
                        <span className="text-xs">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main content */}
                <div className="flex-1 bg-slate-50 p-5">
                  <div className="mb-4">
                    <p className="text-slate-900 font-bold text-sm">POS Dashboard — HQ Marina</p>
                    <p className="text-slate-400 text-xs">Today: Monday, 4 May 2026</p>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Today's Sales", value: '₦184,500', color: 'text-blue-600' },
                      { label: 'Transactions', value: '47', color: 'text-slate-900' },
                      { label: 'VAT Collected', value: '₦12,937', color: 'text-teal-600' },
                      { label: 'Low Stock Items', value: '3', color: 'text-red-500' },
                    ].map(s => (
                      <div key={s.label} className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-slate-400 text-xs mb-1">{s.label}</p>
                        <p className={`font-bold text-sm ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600">Recent Sales</p>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Live</span>
                    </div>
                    {[
                      { ref: 'POS-1204', items: '5 items', amount: '₦12,750', method: 'Card', time: '2:43 PM' },
                      { ref: 'POS-1203', items: '2 items', amount: '₦4,200', method: 'Cash', time: '2:31 PM' },
                      { ref: 'POS-1202', items: '8 items', amount: '₦28,500', method: 'Transfer', time: '2:18 PM' },
                    ].map(sale => (
                      <div key={sale.ref} className="px-4 py-2.5 flex items-center justify-between border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-xs font-semibold text-blue-600">{sale.ref}</p>
                          <p className="text-xs text-slate-400">{sale.items} · {sale.time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-xs font-bold text-slate-900">{sale.amount}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            sale.method === 'Card' ? 'bg-blue-100 text-blue-700'
                            : sale.method === 'Cash' ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                          }`}>{sale.method}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">POS dashboard — sales, inventory, and VAT in one view.</p>
          </div>
        </section>

        {/* POS Features */}
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">What You Get</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Built for the Nigerian shop floor</h3>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">From the checkout counter to the back-office stock room — DigitGlance POS covers every part of your retail operation.</p>
            </div>

            {/* Feature 1: Fast Checkout */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Fast checkout, any payment method</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">Process sales in seconds. Search products by name, scan barcodes, add multiple items, apply discounts, and accept cash, card, or bank transfer in one smooth flow.</p>
                <ul className="space-y-3">
                  {[
                    'Product search by name or barcode',
                    'Cash, card, and bank transfer support',
                    'Split payment across methods',
                    'Discount and promotion application',
                    'Automatic receipt generation',
                    'Offline mode — works without internet',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Checkout mockup */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
                  <p className="text-white font-bold text-sm">New Sale — HQ Marina</p>
                  <span className="text-xs bg-blue-500 text-blue-100 px-2 py-0.5 rounded-full">Terminal 1</span>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-400">Search product or scan barcode…</div>
                    <button className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg font-semibold">Add</button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {[
                      { name: 'Milo Tin 500g', qty: 2, price: '₦4,800', total: '₦9,600' },
                      { name: 'Indomie Carton (40)', qty: 1, price: '₦8,500', total: '₦8,500' },
                      { name: 'Peak Milk 400g × 12', qty: 3, price: '₦6,200', total: '₦18,600' },
                    ].map(item => (
                      <div key={item.name} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.qty} × {item.price}</p>
                        </div>
                        <p className="text-xs font-bold text-slate-900">{item.total}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-3 space-y-1 text-xs mb-4">
                    <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>₦36,700</span></div>
                    <div className="flex justify-between text-teal-600 font-medium"><span>VAT (7.5%)</span><span>₦2,752</span></div>
                    <div className="flex justify-between font-bold text-slate-900 text-sm pt-1"><span>Total</span><span>₦39,452</span></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['Cash', 'Card', 'Transfer'].map((m, i) => (
                      <button key={m} className={`py-2 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Multi-branch Inventory */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                {/* Inventory mockup */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-600">Inventory — All Branches</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">HQ Marina</span>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Branch VI</span>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <table className="w-full text-xs">
                      <thead><tr className="bg-slate-50 border-b border-slate-100"><th className="text-left px-4 py-2 text-slate-500 font-semibold">Product</th><th className="text-right px-3 py-2 text-slate-500 font-semibold">HQ</th><th className="text-right px-3 py-2 text-slate-500 font-semibold">VI</th><th className="text-right px-3 py-2 text-slate-500 font-semibold">Value</th></tr></thead>
                      <tbody>
                        {[
                          { name: 'Milo Tin 500g', hq: 142, vi: 88, value: '₦110,400', alert: false },
                          { name: 'Peak Milk 400g', hq: 67, vi: 34, value: '₦62,000', alert: false },
                          { name: 'Indomie Carton', hq: 8, vi: 3, value: '₦93,500', alert: true },
                          { name: 'Golden Morn 500g', hq: 210, vi: 95, value: '₦152,250', alert: false },
                        ].map(item => (
                          <tr key={item.name} className="border-b border-slate-50 last:border-0">
                            <td className="px-4 py-2.5 font-medium text-slate-900 flex items-center gap-2">
                              {item.alert && <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />}
                              {!item.alert && <span className="w-1.5 h-1.5 bg-transparent rounded-full flex-shrink-0" />}
                              {item.name}
                            </td>
                            <td className={`px-3 py-2.5 text-right font-semibold ${item.alert ? 'text-red-500' : 'text-slate-700'}`}>{item.hq}</td>
                            <td className="px-3 py-2.5 text-right text-slate-600">{item.vi}</td>
                            <td className="px-3 py-2.5 text-right font-semibold text-slate-900">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 bg-red-50 border-t border-red-100 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-red-700 font-medium">Indomie Carton is below reorder level at HQ Marina</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Multi-branch inventory with real-time stock alerts</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">Track stock across all your branches in one view. Sales automatically reduce stock, purchases increase it, and reorder alerts fire before you run out.</p>
                <ul className="space-y-3">
                  {[
                    'Stock tracked per branch in real time',
                    'Auto stock decrease on every sale',
                    'Auto stock increase on purchase',
                    'Reorder level alerts per product',
                    'Inter-branch stock transfer',
                    'Full inventory valuation report',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3: VAT and Reporting */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">FIRS-ready VAT compliance and reporting</h4>
                <p className="text-slate-500 mb-6 leading-relaxed">Every sale records its VAT automatically. At the end of each period, your POS VAT output report is ready to submit — no manual calculation, no scramble at month end.</p>
                <ul className="space-y-3">
                  {[
                    'VAT at 7.5% on every applicable sale',
                    'Zero-rated and exempt category support',
                    'Output VAT report by date range',
                    'Sales by product, category, and staff',
                    'Daily and monthly sales summaries',
                    'Branch-to-branch performance comparison',
                    'CSV export for your accountant',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* VAT report mockup */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                <p className="text-sm font-bold text-slate-900 mb-4">POS VAT Report — April 2026</p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Total Sales', value: '₦2,840,500', color: 'text-slate-900', bg: 'bg-slate-50 border-slate-100' },
                    { label: 'Output VAT', value: '₦198,035', color: 'text-teal-600', bg: 'bg-teal-50 border-teal-100' },
                    { label: 'Transactions', value: '1,247', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
                  ].map(c => (
                    <div key={c.label} className={`border rounded-xl p-3 ${c.bg}`}>
                      <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                      <p className={`font-bold text-sm ${c.color}`}>{c.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-3">Sales by Branch</p>
                <div className="space-y-2">
                  {[
                    { branch: 'HQ Marina', sales: '₦1,640,500', pct: 58 },
                    { branch: 'Branch VI', sales: '₦1,200,000', pct: 42 },
                  ].map(b => (
                    <div key={b.branch}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{b.branch}</span>
                        <span className="text-slate-500">{b.sales}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-2 bg-blue-400 rounded-full" style={{width: `${b.pct}%`}} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs text-blue-700 font-semibold">VAT Return Ready</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Export CSV</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POS Feature List */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">POS — Complete Feature List</p>
              <h3 className="text-3xl font-bold text-slate-900">Everything in DigitGlance POS</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: 'Sales and Checkout',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                  features: [
                    'Fast checkout terminal',
                    'Product search by name',
                    'Cash, card, bank transfer',
                    'Split payment support',
                    'Discount and promotions',
                    'Receipt generation and print',
                    'Customer-linked sales',
                    'Offline mode',
                    'Sales history and void',
                  ],
                },
                {
                  category: 'Inventory and Branches',
                  color: 'text-indigo-600',
                  bg: 'bg-indigo-50',
                  features: [
                    'Multi-branch inventory',
                    'Real-time stock tracking',
                    'Auto stock update on sale',
                    'Auto stock update on purchase',
                    'Reorder level alerts',
                    'Inter-branch stock transfer',
                    'Inventory valuation report',
                    'Cost price and selling price',
                    'Product categories',
                  ],
                },
                {
                  category: 'Reporting and Compliance',
                  color: 'text-teal-600',
                  bg: 'bg-teal-50',
                  features: [
                    'Output VAT report (FIRS-ready)',
                    'Daily and monthly sales summary',
                    'Sales by product and category',
                    'Sales by staff member',
                    'Branch performance comparison',
                    'Gross profit by product',
                    'Customer purchase history',
                    'CSV export on all reports',
                    'Audit log for all actions',
                  ],
                },
              ].map(group => (
                <div key={group.category}>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${group.bg} ${group.color}`}>
                    {group.category}
                  </div>
                  <ul className="space-y-2">
                    {group.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <svg className={`w-4 h-4 flex-shrink-0 ${group.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POS Pricing / CTA */}
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">POS Subscription</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Add POS to your account</h3>
              <p className="text-slate-500 max-w-xl mx-auto">DigitGlance POS is available as a standalone subscription or bundled with Invoice for a combined rate. Contact us to set up your account — we configure your branches, terminals, and products as part of onboarding.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-blue-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">POS Only</h4>
                    <p className="text-xs text-slate-500">Standalone POS subscription</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {['Full POS terminal access', 'Multi-branch inventory', 'FIRS VAT compliance', 'Sales and inventory reports', 'Team access control', 'Onboarding and setup included'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="block text-center font-semibold py-3 rounded-xl text-sm transition-colors bg-blue-600 text-white hover:bg-blue-700">
                  Contact Us for POS Pricing
                </a>
              </div>
              <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500 text-white">Best Value</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-teal-600/20 border border-teal-700 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Invoice + POS Bundle</h4>
                    <p className="text-xs text-slate-400">Both products, one account</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {['Everything in Invoice Pro', 'Everything in POS', 'Shared inventory across both modules', 'Single customer and supplier database', 'Combined VAT reporting', 'Priority support'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="block text-center font-semibold py-3 rounded-xl text-sm transition-colors bg-teal-600 text-white hover:bg-teal-700">
                  Get Bundle Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
      {/* ── END POS ── */}

      {/* ════════════════════════════════ COMING SOON ════════════════════════════════ */}
      <div id="coming-soon" className="scroll-mt-20">
        <section className="px-6 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-3">On the Roadmap</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">More products in development</h2>
              <p className="text-slate-500 max-w-xl mx-auto">We are building two more products for the DigitGlance platform. Join the waitlist to be among the first to know when they go live.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">DigitGlance Accounting</h3>
                    <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Full double-entry bookkeeping for Nigerian businesses. General ledger, trial balance, profit and loss, balance sheet, and tax preparation — all built around NRS requirements and Nigerian accounting standards.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Double-entry general ledger',
                    'Trial balance and financial statements',
                    'Company income tax preparation',
                    'Integration with Invoice and POS modules',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="inline-block text-purple-600 text-sm font-semibold hover:text-purple-700 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  Join the Waitlist →
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">DigitGlance School</h3>
                    <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  School management software for Nigerian private schools. Student enrollment, fee collection, class scheduling, results management, and parent communication — all in one system.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Student enrollment and records',
                    'Fee collection and payment tracking',
                    'Class scheduling and timetable',
                    'Results management and report cards',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="inline-block text-orange-600 text-sm font-semibold hover:text-orange-700 border border-orange-200 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                  Join the Waitlist →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="bg-slate-900 px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to run your business on DigitGlance?</h2>
          <p className="text-slate-400 mb-10 text-lg">Start free with Invoice today. Add POS when you are ready. One platform, growing with your business.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/app/register" className="bg-teal-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-teal-700 transition-colors">
              Start Free with Invoice
            </a>
            <a href="/contact" className="border border-slate-600 text-white font-semibold px-10 py-4 rounded-xl hover:border-blue-400 hover:text-blue-400 transition-colors">
              Talk to Us About POS
            </a>
          </div>
          <p className="text-slate-600 text-sm mt-6">No credit card required for Invoice. POS setup by our team.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-2">Digit<span className="text-teal-400">Glance</span></p>
            <p className="text-sm max-w-xs">Accounting intelligence and software solutions for Nigerian businesses and beyond.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-white font-medium mb-3">Products</p>
              <div className="space-y-2">
                <a href="#invoice" className="block hover:text-teal-400">Invoice</a>
                <a href="#pos" className="block hover:text-teal-400">Point of Sale</a>
                <a href="#coming-soon" className="block hover:text-teal-400">Accounting</a>
                <a href="#coming-soon" className="block hover:text-teal-400">School Manager</a>
              </div>
            </div>
            <div>
              <p className="text-white font-medium mb-3">Company</p>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-teal-400">About</a>
                <a href="/blog" className="block hover:text-teal-400">Blog</a>
                <a href="/contact" className="block hover:text-teal-400">Contact</a>
                <a href="/services" className="block hover:text-teal-400">Services</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-8 text-xs flex justify-between">
          <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-teal-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-teal-400">Terms of Service</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
