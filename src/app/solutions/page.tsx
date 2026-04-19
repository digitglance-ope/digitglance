export default function Solutions() {
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
            <a href="/products" className="hover:text-teal-600">Products</a>
            <a href="/solutions" className="text-teal-600">Solutions</a>
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
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">Desktop Solutions</p>
          <h1 className="text-4xl font-bold mb-4">Professional Desktop Tools Built on Excel</h1>
          <p className="text-slate-300 text-lg max-w-2xl">We build custom Excel VBA systems that automate your business processes, improve reporting accuracy, and eliminate repetitive manual work. No expensive software licenses. No complicated setup.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Excel VBA Solutions Work for Nigerian Businesses</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Many Nigerian businesses already use Excel but rely on manual processes that take too much time and produce errors. Excel VBA allows us to build professional automation tools directly inside Excel without requiring staff to learn new software.</p>
              <p>The result is a customized desktop system that fits exactly how your business works, runs on any Windows computer, requires no internet connection, and costs a fraction of commercial software.</p>
              <p>We have built these systems for businesses in manufacturing, trading, professional services, and hospitality. Each one is built from scratch around the client's specific workflow.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "No Internet Required", description: "Works fully offline on any Windows computer" },
              { title: "Custom Built", description: "Designed around your specific workflow and reports" },
              { title: "Staff Friendly", description: "Your team already knows Excel so adoption is fast" },
              { title: "Cost Effective", description: "No monthly fees or software licenses to maintain" }
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-xl p-5">
                <p className="font-semibold text-slate-900 text-sm mb-2">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE SOLUTIONS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Example Systems We Have Built</h2>
          <p className="text-slate-500 mb-12">Each system below was built for a real client and customized to their exact requirements.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Payroll Management System",
                client: "Professional Services Firm",
                description: "Automated monthly payroll computation with PAYE deductions, pension calculations, and payslip generation for 50 staff members. Reduced payroll processing time from two days to two hours.",
                features: ["PAYE tax computation", "Pension remittance schedule", "Payslip generation", "Monthly payroll summary"]
              },
              {
                title: "Inventory and Stock Control",
                client: "Trading Company",
                description: "Real time stock tracking system with purchase order management, goods received notes, and automatic reorder alerts. Eliminated stock discrepancies that were previously costing the business monthly.",
                features: ["Stock movement tracking", "Reorder level alerts", "Supplier management", "Monthly stock valuation"]
              },
              {
                title: "Sales and Revenue Tracker",
                client: "Retail Business",
                description: "Daily sales recording system with automatic revenue summaries, customer ledgers, and monthly performance dashboards. Connected to a simple invoice template for client billing.",
                features: ["Daily sales recording", "Customer ledger", "Revenue dashboard", "Invoice generation"]
              },
              {
                title: "Budget and Expense Monitor",
                client: "NGO",
                description: "Project budget tracking system with departmental expense recording, variance analysis, and donor reporting templates. Produced monthly reports that previously required a full day of manual work.",
                features: ["Budget vs actual tracking", "Department expense codes", "Variance reports", "Donor report templates"]
              },
              {
                title: "Fixed Asset Register",
                client: "Manufacturing Company",
                description: "Complete fixed asset management system with depreciation computation using straight line and reducing balance methods, disposal tracking, and year end asset schedules.",
                features: ["Asset registration", "Depreciation computation", "Disposal tracking", "Year end schedules"]
              },
              {
                title: "Accounts Receivable Tracker",
                client: "Services Business",
                description: "Client invoice tracking and aging analysis system. Shows outstanding balances, days overdue, and generates collection letters automatically for overdue accounts.",
                features: ["Invoice aging analysis", "Overdue tracking", "Collection letter generation", "Monthly debtor summary"]
              }
            ].map((solution) => (
              <div key={solution.title} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">{solution.client}</span>
                <h3 className="font-bold text-slate-900 mt-3 mb-3">{solution.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{solution.description}</p>
                <ul className="space-y-1">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">How We Build Your Custom Solution</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "We start by understanding your current process, pain points, and reporting needs in detail." },
              { step: "02", title: "Design", description: "We design the system structure, data flow, and output reports before writing a single line of code." },
              { step: "03", title: "Build and Test", description: "We build the system and test it thoroughly with sample data to ensure accuracy and reliability." },
              { step: "04", title: "Training and Handover", description: "We train your team on the system and provide documentation so they can use it confidently." }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to automate your business processes?</h2>
          <p className="text-slate-300 mb-8">Tell us about your current workflow and we will design a custom Excel VBA solution that fits your exact needs and budget.</p>
          <a href="/contact" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block">
            Commission a Custom Tool
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