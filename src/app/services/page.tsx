export default function Services() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/services" className="text-teal-600">Services</a>
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

      {/* PAGE HEADER */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">Our Services</p>
          <h1 className="text-4xl font-bold mb-4">Professional Services for Businesses and Accountants</h1>
          <p className="text-slate-300 text-lg max-w-2xl">From tax compliance to custom software, we provide the services Nigerian businesses need to operate professionally and grow confidently.</p>
        </div>
      </section>

      {/* SERVICE GROUP 1 */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Accounting and Tax Services</h2>
              <p className="text-slate-500 text-sm">Professional services delivered in partnership with Ade Fajemisin and Associates, Lagos</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Bookkeeping and Financial Reporting",
                description: "Accurate records, monthly management accounts, and financial statements prepared to IFRS standards for Nigerian businesses."
              },
              {
                title: "Tax Advisory and Compliance",
                description: "Corporate income tax, VAT, withholding tax, and personal income tax advisory. We prepare and file returns with NRS and state tax authorities."
              },
              {
                title: "LIRS and NRS Compliance",
                description: "Direct support on Lagos Internal Revenue Service and Nigeria Revenue Service matters including assessments, objections, and correspondence."
              },
              {
                title: "Payroll Management",
                description: "Monthly payroll computation, PAYE deductions, pension remittances, and payslip preparation for businesses of any size."
              },
              {
                title: "Audit Support",
                description: "Preparation of schedules and supporting documents for statutory audits. We work with your auditors to make the process smooth and efficient."
              },
              {
                title: "Business Consulting",
                description: "Financial analysis, business registration support, internal control reviews, and practical advice for growing Nigerian businesses."
              }
            ].map((service) => (
              <div key={service.title} className="border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE GROUP 2 */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Software Development Services</h2>
              <p className="text-slate-500 text-sm">Custom tools and web applications built for accounting and business workflows</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Web Application Development",
                description: "Custom web applications built for your specific business process. From invoice management to client portals and internal dashboards."
              },
              {
                title: "Accounting Software Development",
                description: "Bespoke accounting systems built around your chart of accounts, reporting needs, and regulatory requirements."
              },
              {
                title: "Excel VBA Desktop Systems",
                description: "Professional automation tools built on Excel for reporting, payroll, inventory, and internal controls. No expensive software licenses required."
              }
            ].map((service) => (
              <div key={service.title} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE GROUP 3 */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Training and Installation</h2>
              <p className="text-slate-500 text-sm">Hands-on support to get your team using new tools effectively</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Software Onboarding and Training",
                description: "We set up your accounting software, migrate your data, and train your team so they can use it confidently from day one."
              },
              {
                title: "Accounting System Setup",
                description: "Chart of accounts design, opening balances, and system configuration tailored to your business structure and reporting needs."
              }
            ].map((service) => (
              <div key={service.title} className="border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Not sure which service fits your needs?</h2>
          <p className="text-slate-300 mb-8">Book a free consultation and we will help you identify the right solution for your business.</p>
          <a href="/contact" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block">
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