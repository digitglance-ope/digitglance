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

      {/* HERO */}
      <section className="bg-slate-900 text-white px-6 py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full border border-teal-400" />
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-teal-400" />
          <div className="absolute -bottom-10 left-20 w-80 h-80 rounded-full border border-teal-400" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <p className="text-teal-400 text-sm font-semibold mb-4 uppercase tracking-widest">DigitGlance Invoice</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
            The invoice and accounting tool Nigerian businesses actually need
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">
            Stop managing invoices in spreadsheets and WhatsApp chats. DigitGlance gives you a complete system to create invoices, track payments, manage suppliers, handle VAT, and understand your cash flow, all built for how Nigerian businesses work.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/app/register" className="bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors">
              Start Free Today
            </a>
            <a href="/app/login" className="border border-slate-600 text-white font-semibold px-8 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors">
              Sign In
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-4">No credit card required. Free plan available forever.</p>
        </div>
      </section>

      {/* DASHBOARD MOCKUP */}
      <section className="px-6 py-20 bg-gradient-to-b from-slate-900 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Browser chrome */}
            <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="flex-1 mx-4 bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400">app.digitglance.com/dashboard</div>
            </div>
            {/* App UI mockup */}
            <div className="flex" style={{minHeight: '420px'}}>
              {/* Sidebar */}
              <div className="w-48 bg-slate-900 p-4 flex-shrink-0">
                <div className="mb-6">
                  <p className="text-white font-bold text-sm">Digit<span className="text-teal-400">Glance</span></p>
                  <p className="text-slate-500 text-xs">Invoice System</p>
                </div>
                {[
                  { label: 'Dashboard', active: true },
                  { label: 'Invoices', active: false },
                  { label: 'Customers', active: false },
                  { label: 'Suppliers', active: false },
                  { label: 'Inventory', active: false },
                  { label: 'Reports', active: false },
                ].map(item => (
                  <div key={item.label} className={`flex items-center gap-2 px-2 py-2 rounded-lg mb-1 ${item.active ? 'bg-teal-600/20 text-teal-400' : 'text-slate-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-teal-400' : 'bg-slate-600'}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div className="flex-1 bg-slate-50 p-6">
                <div className="mb-4">
                  <p className="text-slate-900 font-bold text-sm mb-1">Dashboard</p>
                  <p className="text-slate-400 text-xs">Welcome back, Mustapha</p>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Total Invoiced', value: '₦842,500', color: 'text-slate-900' },
                    { label: 'Amount Collected', value: '₦610,000', color: 'text-green-600' },
                    { label: 'Outstanding', value: '₦232,500', color: 'text-red-500' },
                    { label: 'Total VAT', value: '₦63,187', color: 'text-teal-600' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                      <p className={`font-bold text-sm ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                {/* Recent invoices */}
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
                    <div key={inv.num} className="px-4 py-2.5 flex items-center justify-between border-b border-slate-50">
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
          <p className="text-center text-slate-400 text-sm mt-4">The DigitGlance Invoice dashboard. Real data, real time.</p>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">The Problem</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Most Nigerian SMEs run their finances in chaos</h2>
            <p className="text-slate-500 text-lg leading-relaxed">Between WhatsApp invoices, handwritten receipts, and Excel sheets that no one updates, money gets lost. Customers owe you money you cannot track. Tax time becomes a nightmare. You do not actually know if your business is profitable.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Unpaid invoices pile up',
                desc: 'Without a system, customers forget to pay and you forget to follow up. Outstanding balances grow quietly until cash flow becomes a crisis.',
              },
              {
                icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z',
                title: 'VAT filing is a scramble',
                desc: 'Calculating Output VAT, Input VAT, and what you actually owe NRS at the end of each period takes hours when records are scattered across different places.',
              },
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                title: 'No real financial picture',
                desc: 'You cannot make good business decisions when you do not know your real revenue, what you owe suppliers, or whether your inventory is profitable.',
              },
            ].map(item => (
              <div key={item.title} className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES DEEP DIVE */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">What You Get</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Every tool your business needs in one place</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">DigitGlance Invoice covers the full financial workflow from creating your first invoice to filing your VAT return.</p>
          </div>

          {/* Feature: Invoicing */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Professional invoices in seconds</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">Create clean, professional invoices with your business details, customer information, itemised line items, VAT calculations at 7.5%, and payment terms. Download as PDF, print, or send directly to customers.</p>
              <ul className="space-y-3">
                {[
                  'Auto-generated invoice numbers',
                  'Line items with inventory selector',
                  'VAT calculated per line item at 7.5%',
                  'PDF download and print ready',
                  'Email invoice directly to customer',
                  'Track partial payments and balances',
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
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
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

          {/* Feature: Reports */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              {/* Reports mockup */}
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
                <div className="flex gap-2 mb-4">
                  {['Invoice Summary', 'Output VAT', 'VAT Liability', 'Receivable', 'Payable', 'Inventory'].map((tab, i) => (
                    <span key={tab} className={`text-xs px-2 py-1 rounded-lg font-medium ${i === 2 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{tab}</span>
                  ))}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-50"><span className="text-teal-600 font-medium">INV-0041</span><span className="text-slate-500">Chukwuemeka Foods</span><span className="text-teal-600 font-semibold">₦6,375</span></div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50"><span className="text-teal-600 font-medium">INV-0042</span><span className="text-slate-500">Lagos Tech Hub</span><span className="text-teal-600 font-semibold">₦10,687</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-teal-600 font-medium">INV-0043</span><span className="text-slate-500">Bello Enterprises</span><span className="text-teal-600 font-semibold">₦2,850</span></div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">VAT and financial reports ready when you need them</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">Every report you need for NRS compliance and business decisions is built in. Set a date range and get your numbers instantly. Export to CSV for your accountant.</p>
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

          {/* Feature: Suppliers */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Full supplier and purchase management</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">Track what you buy, from whom, and what you paid. Record purchase invoices from suppliers, update inventory stock automatically, track payments made, and view a full supplier statement at any time.</p>
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
            {/* Suppliers mockup */}
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">{s.paid}</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-lg font-medium">Purchase Invoice</span>
                  </div>
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

      {/* FULL FEATURES LIST */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Complete Feature List</p>
            <h2 className="text-3xl font-bold text-slate-900">Everything included</h2>
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

      {/* PRICING */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Simple, honest pricing</h2>
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
                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
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

      {/* COMING SOON */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon</h2>
          <p className="text-slate-500 mb-10">Products currently in development. Join the waitlist to be notified when they launch.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'DigitGlance Accounts',
                desc: 'A complete accounting software for Nigerian SMEs. General ledger, trial balance, financial statements, and tax reporting built around Nigerian standards and NRS requirements.',
              },
              {
                name: 'DigitGlance POS',
                desc: 'A point of sale system for retail and service businesses in Nigeria. Sales tracking, inventory management, and daily financial summaries connected directly to your accounts.',
              },
            ].map(p => (
              <div key={p.name} className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-lg">{p.name}</h3>
                  <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">In Development</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{p.desc}</p>
                <a href="/contact" className="text-teal-600 text-sm font-semibold hover:text-teal-700">Join the Waitlist →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your business finances?</h2>
          <p className="text-slate-400 mb-10 text-lg">Start free today. No credit card needed. Upgrade when you are ready.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/app/register" className="bg-teal-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-teal-700 transition-colors">
              Create Free Account
            </a>
            <a href="/contact" className="border border-slate-600 text-white font-semibold px-10 py-4 rounded-xl hover:border-teal-400 hover:text-teal-400 transition-colors">
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-2">Digit<span className="text-teal-400">Glance</span></p>
            <p className="text-sm max-w-xs">Accounting intelligence and software solutions for Nigerian businesses and beyond.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-white font-medium mb-3">Services</p>
              <div className="space-y-2">
                <a href="/services" className="block hover:text-teal-400">Accounting</a>
                <a href="/services" className="block hover:text-teal-400">Tax Advisory</a>
                <a href="/solutions" className="block hover:text-teal-400">Excel VBA Tools</a>
              </div>
            </div>
            <div>
              <p className="text-white font-medium mb-3">Company</p>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-teal-400">About</a>
                <a href="/blog" className="block hover:text-teal-400">Blog</a>
                <a href="/contact" className="block hover:text-teal-400">Contact</a>
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
