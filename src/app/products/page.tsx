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
            <a href="/learn" className="hover:text-teal-600">Learn</a>
            <a href="/blog" className="hover:text-teal-600">Blog</a>
            <a href="/app/login" className="hover:text-teal-600">Sign In</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">Our Products</p>
          <h1 className="text-4xl font-bold mb-4">Software Built for Accountants and Business Owners</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Every product at DigitGlance is built to solve a real problem in how Nigerian businesses manage money, invoices, and financial records.</p>
        </div>
      </section>

      {/* MAIN PRODUCT */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="border border-teal-200 rounded-2xl overflow-hidden">
            <div className="bg-teal-600 px-8 py-4 flex items-center justify-between">
              <span className="text-white font-semibold">Now Available</span>
              <span className="bg-white text-teal-600 text-xs font-bold px-3 py-1 rounded-full">Live Product</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">DigitGlance Invoice</h2>
                  <p className="text-teal-600 text-sm font-medium mb-6">Invoice Management System for Nigerian SMEs</p>
                  <p className="text-slate-500 mb-8 leading-relaxed">Create professional invoices, track payments, manage your clients, and get financial insights from one dashboard. Built specifically for how Nigerian businesses operate, with naira support, VAT handling, and NRS compliance built in.</p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      "Professional invoice creation",
                      "PDF download and print",
                      "Payment status tracking",
                      "Customer management",
                      "Inventory management",
                      "VAT reports for NRS filing",
                      "Accounts receivable report",
                      "WhatsApp invoice sharing",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-4 h-4 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href="/app/register" className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700">
                      Get Started Free
                    </a>
                    <a href="/app/login" className="border border-gray-200 text-slate-700 font-medium px-6 py-3 rounded-lg hover:border-teal-300">
                      Sign In
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-8">
                  <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wide">Pricing</p>
                  <div className="space-y-4">

                    <div className="bg-white border border-gray-100 rounded-xl p-5">
                      <p className="font-bold text-slate-900 text-base mb-1">Free Plan</p>
                      <p className="text-2xl font-bold text-teal-600 mb-3">₦0 <span className="text-sm text-slate-400 font-normal">/ month</span></p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {['20 invoices per month', 'Customer management', 'Basic reports', 'PDF downloads'].map(f => (
                          <li key={f} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-600 rounded-full flex-shrink-0"></div>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href="/app/register" className="mt-4 block text-center border border-teal-200 text-teal-600 text-sm font-medium py-2 rounded-lg hover:bg-teal-50">
                        Start for Free
                      </a>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-slate-900 text-base">Starter Plan</p>
                        <span className="text-xs bg-teal-50 text-teal-600 font-bold px-2 py-0.5 rounded-full">Popular</span>
                      </div>
                      <p className="text-2xl font-bold text-teal-600 mb-1">₦5,000 <span className="text-sm text-slate-400 font-normal">/ month</span></p>
                      <p className="text-xs text-slate-400 line-through mb-3">₦7,500/month</p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {['100 invoices per month', 'Inventory up to 1,000 items', 'Full reports and VAT report', 'User control (1 user included)'].map(f => (
                          <li key={f} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-600 rounded-full flex-shrink-0"></div>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href="/app/register" className="mt-4 block text-center bg-teal-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-teal-700">
                        Get Started
                      </a>
                    </div>

                    <div className="bg-slate-900 text-white rounded-xl p-5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-base">Pro Plan</p>
                        <span className="text-xs bg-white/10 text-white font-bold px-2 py-0.5 rounded-full">Best Value</span>
                      </div>
                      <p className="text-2xl font-bold mb-1">₦12,000 <span className="text-sm text-slate-400 font-normal">/ month</span></p>
                      <p className="text-xs text-slate-400 line-through mb-3">₦18,000/month</p>
                      <ul className="space-y-1.5 text-sm text-slate-300">
                        {['Unlimited invoices', 'Unlimited inventory', 'Supplier management', 'Accounts payable and receivable', 'User control (2 users included)', 'Priority support'].map(f => (
                          <li key={f} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></div>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href="/app/register" className="mt-4 block text-center bg-teal-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-teal-700">
                        Get Started
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Coming Soon</h2>
          <p className="text-slate-500 mb-12">Products currently in development. Join the waitlist to be notified when they launch.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg">DigitGlance Accounts</h3>
                <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">In Development</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">A complete accounting software for Nigerian SMEs. General ledger, trial balance, financial statements, and tax reporting built around Nigerian standards and NRS requirements.</p>
              <a href="/contact" className="text-teal-600 text-sm font-medium hover:text-teal-700">Join the Waitlist</a>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg">DigitGlance POS</h3>
                <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">In Development</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">A point of sale system for retail and service businesses in Nigeria. Sales tracking, inventory management, and daily financial summaries connected to your accounts.</p>
              <a href="/contact" className="text-teal-600 text-sm font-medium hover:text-teal-700">Join the Waitlist</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Need a custom software solution?</h2>
          <p className="text-slate-500 mb-8">If none of our current products fit your specific needs, we build custom web applications and desktop tools for businesses of any size.</p>
          <a href="/contact" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block">
            Discuss a Custom Build
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-12">
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
