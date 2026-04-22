export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/services" className="hover:text-teal-600">Services</a>
            <a href="/products" className="hover:text-teal-600">Products</a>
            <a href="/solutions" className="hover:text-teal-600">Solutions</a>
            <a href="/learn" className="hover:text-teal-600">Learn</a>
            <a href="/blog" className="hover:text-teal-600">Blog</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Accounting Intelligence. Built for Business.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            Accounting Expertise. Software That Works.
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl">
            DigitGlance builds web applications, AI tools, and automation systems for accountants and business owners in Nigeria and beyond.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/services" className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700">
              Explore Our Services
            </a>
            <a href="/products" className="border border-slate-500 text-white font-medium px-6 py-3 rounded-lg hover:border-teal-400 hover:text-teal-400">
              See Our Products
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">What We Do</h2>
          <p className="text-slate-500 mb-12">Professional services built around accounting, technology, and practical results.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <a href="/services" className="border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Accounting and Tax Services</h3>
              <p className="text-slate-500 text-sm">Bookkeeping, tax advisory, payroll, and NRS and LIRS compliance for businesses in Nigeria.</p>
            </a>

            <a href="/products" className="border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Web Applications and SaaS</h3>
              <p className="text-slate-500 text-sm">Custom web applications and subscription software tools built for accounting and business workflows.</p>
            </a>

            <a href="/solutions" className="border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Excel VBA Desktop Tools</h3>
              <p className="text-slate-500 text-sm">Professional desktop systems built on Excel VBA for reporting, internal controls, and business automation.</p>
            </a>

            <a href="/learn" className="border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">DigitGlance Assist</h3>
              <p className="text-slate-500 text-sm">Ask accounting and tax questions and get practical Nigeria-focused answers powered by AI.</p>
            </a>

          </div>
        </div>
      </section>

      {/* PRODUCT CALLOUT */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Now Available</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-4">Invoice Management for Nigerian SMEs</h2>
            <p className="text-slate-500 mb-6">Create professional invoices, track payments, manage clients, and get financial insights. Built specifically for how Nigerian businesses operate.</p>
            <ul className="space-y-2 mb-8">
              {["Create and send professional invoices", "Track paid, pending, and overdue payments", "Manage client records in one place", "Download PDF invoices instantly", "Dashboard with financial summary"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="/products" className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 inline-block">
              See the App
            </a>
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-slate-400 text-sm">Invoice Management System</p>
            <p className="text-slate-900 font-semibold mt-2">DigitGlance Invoice</p>
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-teal-600 mb-2">Nigeria-Focused</p>
            <p className="text-slate-500 text-sm">Built around NRS, LIRS, ICAN standards, and Nigerian business practice</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-teal-600 mb-2">Dual Expertise</p>
            <p className="text-slate-500 text-sm">Professional accountant and software builder in one team</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-teal-600 mb-2">End to End</p>
            <p className="text-slate-500 text-sm">From tax filing to custom software, we handle the full picture</p>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
            MI
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Built by an Accountant Who Codes</h2>
            <p className="text-slate-300 mb-6">Mustapha Idris Opeyemi is a professional accountant and software developer based in Nigeria. DigitGlance was built to solve a specific problem: accounting software that does not fit how Nigerian businesses actually work. Every tool and service here comes from that same starting point.</p>
            <a href="/about" className="text-teal-400 font-medium hover:text-teal-300">Learn more about DigitGlance</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to work with us?</h2>
          <p className="text-slate-500 mb-8">Whether you need accounting services, a custom software tool, or want to subscribe to our invoice app, start with a free consultation.</p>
          <a href="/contact" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block text-lg">
            Book a Free Consultation
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
  );
}