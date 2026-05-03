export default function AITools() {
  const tools = [
    {
      name: "InvoiceAI NG",
      category: "Revenue Management",
      tagline: "Stop chasing payments manually",
      description: "Automatically send invoice reminders, flag overdue accounts, and escalate aged debts. Cuts average debtor days for Nigerian SMEs.",
      status: "live" as const,
      href: "/ai-tools/invoice-ai",
      features: ["Smart payment reminders", "Overdue escalation", "Debtor aging analysis"],
    },
    {
      name: "FinReport AI",
      category: "Financial Reporting",
      tagline: "Plain-English insights from your numbers",
      description: "Transforms your income, expenses, and cash flow data into a clear narrative report with AI commentary — ready for business owners and investors.",
      status: "coming_soon" as const,
      features: ["AI narrative reports", "Trend analysis", "Board-ready summaries"],
    },
    {
      name: "VATmate NG",
      category: "VAT Compliance",
      tagline: "VAT returns handled in minutes",
      description: "Automatically reconciles output VAT, input VAT, and calculates your FIRS payable. Generates compliant VAT schedules at month-end.",
      status: "coming_soon" as const,
      features: ["Output vs input reconciliation", "FIRS schedule generation", "VAT liability forecast"],
    },
    {
      name: "TaxDesk NG",
      category: "Tax Compliance",
      tagline: "Never miss a tax deadline again",
      description: "Tracks all your Nigerian tax obligations — CIT, PAYE, VAT, withholding tax — with automated reminders and penalty calculations.",
      status: "coming_soon" as const,
      features: ["Deadline tracking", "Penalty calculator", "Multi-tax dashboard"],
    },
    {
      name: "PayrollPro NG",
      category: "Payroll",
      tagline: "PAYE-compliant payroll in one click",
      description: "Compute net pay, PAYE deductions, pension contributions, and NHF for Nigerian employees. Generates payslips and remittance schedules.",
      status: "coming_soon" as const,
      features: ["PAYE computation", "Pension and NHF", "Payslip generation"],
    },
    {
      name: "SmartLedger NG",
      category: "Bookkeeping",
      tagline: "AI-categorised transactions automatically",
      description: "Reads your bank statements and auto-categorises every transaction to the right expense head using Nigerian accounting chart of accounts.",
      status: "coming_soon" as const,
      features: ["Bank import", "Auto-categorisation", "Chart of accounts mapping"],
    },
    {
      name: "CashFlow Radar NG",
      category: "Cash Management",
      tagline: "See your cash crunch before it hits",
      description: "Forecasts your cash position 30, 60, and 90 days ahead based on outstanding invoices, recurring expenses, and payment patterns.",
      status: "coming_soon" as const,
      features: ["30/60/90 day forecast", "Cash gap alerts", "Scenario modelling"],
    },
    {
      name: "AuditReady NG",
      category: "Audit Preparation",
      tagline: "Be audit-ready every month, not once a year",
      description: "Prepares your trial balance, supporting schedules, and document checklist in the format expected by Nigerian auditors and FIRS examiners.",
      status: "coming_soon" as const,
      features: ["Trial balance export", "Document checklist", "FIRS-ready schedules"],
    },
    {
      name: "FraudWatch NG",
      category: "Fraud Detection",
      tagline: "Catch anomalies before they become losses",
      description: "Monitors transactions for unusual patterns, duplicate payments, and policy violations. Built on Nigerian SME fraud patterns.",
      status: "coming_soon" as const,
      features: ["Anomaly detection", "Duplicate payment alerts", "Expense policy checks"],
    },
    {
      name: "TaxHealth Score",
      category: "Tax Advisory",
      tagline: "Know your tax risk before the taxman does",
      description: "Runs a diagnostic on your financials and returns a TaxHealth Score with specific recommendations to reduce your tax exposure legally.",
      status: "coming_soon" as const,
      features: ["Risk scoring", "Legal optimisation tips", "Compliance gap report"],
    },
  ]

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
            <a href="/solutions" className="hover:text-teal-600">Solutions</a>
            <a href="/ai-tools" className="text-teal-600">AI Tools</a>
            <a href="/blog" className="hover:text-teal-600">Blog</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">DigitGlance AI Tools</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight">
            AI-Powered Automation for Nigerian Businesses
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8">
            10 intelligent automation systems built on Nigerian tax law, FIRS standards, and real SME workflows. Each tool eliminates hours of manual accounting work every month.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-teal-600 bg-opacity-20 border border-teal-500 border-opacity-30 rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-teal-300 text-sm font-medium">1 tool live now</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-slate-300 text-sm font-medium">9 tools in development</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">All AI Tools</h2>
          <p className="text-slate-500 mb-12">Each tool is built specifically for Nigerian accounting standards, FIRS regulations, and how SMEs actually operate.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className={`border rounded-xl p-6 flex flex-col transition-all ${
                  tool.status === "live"
                    ? "border-teal-200 bg-teal-50 hover:shadow-md hover:border-teal-300"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{tool.category}</span>
                  {tool.status === "live" ? (
                    <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full">Live</span>
                  ) : (
                    <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2 py-1 rounded-full">Coming Soon</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{tool.name}</h3>
                <p className="text-teal-600 text-sm font-medium mb-3">{tool.tagline}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{tool.description}</p>

                <ul className="space-y-1.5 mb-5">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {tool.status === "live" && tool.href ? (
                  <a
                    href={tool.href}
                    className="bg-teal-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-teal-700 text-center transition-colors"
                  >
                    Open Tool →
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-slate-100 text-slate-400 text-sm font-medium px-4 py-2.5 rounded-lg cursor-not-allowed text-center"
                  >
                    In Development
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">Built for Nigerian Business Reality</h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Every tool is trained on FIRS regulations, Nigerian tax law, ICAN standards, and real SME workflows — not generic accounting software adapted from overseas.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Nigerian Tax Law",
                body: "FIRS regulations, PAYE bands, withholding tax rates, VAT at 7.5%, CIT thresholds — all built-in and kept current.",
              },
              {
                title: "Works with DigitGlance Invoice",
                body: "AI tools connect directly to your invoice, customer, and supplier data. No CSV imports or manual data entry.",
              },
              {
                title: "Powered by Claude AI",
                body: "Each automation uses Anthropic's Claude model for accurate natural-language analysis of your financial data.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-6">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get notified when new tools launch</h2>
          <p className="text-slate-500 mb-8">We are building and releasing each AI tool one at a time. Subscribe to DigitGlance Invoice to get early access to every tool as it goes live.</p>
          <a href="/products" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block text-lg">
            Get Early Access
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
                <a href="/ai-tools" className="block hover:text-teal-400">AI Tools</a>
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
