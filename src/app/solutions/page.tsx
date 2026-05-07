import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">Desktop Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 max-w-3xl leading-tight">
            Professional Excel tools and custom software for Nigerian businesses
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Purpose-built desktop applications and custom development — no expensive software licenses, no complicated setup, built exactly for how Nigerian businesses operate.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#products" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
              See Our Tools
            </a>
            <Link href="/contact" className="border border-slate-600 hover:border-teal-400 text-slate-300 hover:text-teal-400 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all">
              Commission Custom Tool
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT: RELIANCECOOP ─── */}
      <section id="products" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">Available Now</span>
            <span className="text-slate-400 text-sm">Desktop Applications</span>
          </div>

          {/* RelianceCoop Manager */}
          <div className="border-2 border-teal-200 rounded-3xl overflow-hidden mb-16">
            <div className="bg-teal-600 px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-lg">RelianceCoop Manager</p>
                <p className="text-teal-100 text-sm mt-0.5">Cooperative Society Management System</p>
              </div>
              <span className="bg-white text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full">Available Now</span>
            </div>
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: description */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    Cooperative management. Built right.
                  </h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    RelianceCoop Manager is a purpose-built desktop management system for cooperative societies. It replaces disconnected paper ledgers, manual calculations, and scattered files with one integrated platform that manages every member, every naira, and every transaction.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { stat: '14', label: 'Report Types' },
                      { stat: '1,000+', label: 'Members' },
                      { stat: '100%', label: 'Configurable' },
                    ].map(item => (
                      <div key={item.label} className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-teal-700">{item.stat}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://apkbhpywfyoyfqebnnvj.supabase.co/storage/v1/object/public/downloads/Coop-Reliance-Manager-T1.xlsb"
                      className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Demo
                    </a>
                    <a
                      href="https://apkbhpywfyoyfqebnnvj.supabase.co/storage/v1/object/public/downloads/RelianceCoop-User-Manual-v2.pdf"
                      className="flex items-center gap-2 border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      User Manual
                    </a>
                    <a
                      href="mailto:hello@digitglance.com?subject=Full Version Request - RelianceCoop Manager&body=Name:%0AOrganisation:%0APhone:%0A%0AI would like to purchase the full version of RelianceCoop Manager."
                      className="flex items-center gap-2 border-2 border-teal-600 text-teal-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm"
                    >
                      Get Full Version
                    </a>
                  </div>
                </div>

                {/* Right: feature list */}
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <img
                      src="/images/reliancecoop-dashboard1.png"
                      alt="RelianceCoop Manager Dashboard"
                      className="rounded-xl border border-slate-200 shadow-sm w-full object-cover"
                    />
                    <img
                      src="/images/reliancecoop-dashboard2.png"
                      alt="RelianceCoop Manager Reports"
                      className="rounded-xl border border-slate-200 shadow-sm w-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-4">Key features</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Member Management', desc: 'Register and manage every member with photographs, ID cards, and financial profiles.' },
                      { title: 'Contribution Tracking', desc: 'Record weekly savings, shares, and building fund payments with automatic percentage-based splitting.' },
                      { title: 'Loan Administration', desc: 'Structured repayment tracking, overdue interest calculation, and a visual payment calendar.' },
                      { title: '14 Report Types', desc: 'Cash flow, trial balance, member statements, income and expenditure — all exportable to PDF.' },
                      { title: 'WhatsApp Communication', desc: 'Send personalised contribution statements to every member directly from the software.' },
                      { title: 'Role-Based Access Control', desc: 'Admin and Audit roles with defined permissions. Every transaction is timestamped.' },
                    ].map(f => (
                      <div key={f.title} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-900">{f.title} — </span>
                          <span className="text-sm text-slate-500">{f.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School Fee Track Pro */}
          <div className="border-2 border-blue-200 rounded-3xl overflow-hidden">
            <div className="bg-blue-600 px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-lg">School Fee Track Pro</p>
                <p className="text-blue-100 text-sm mt-0.5">School Fee Management System</p>
              </div>
              <span className="bg-white text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">Available Now</span>
            </div>
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    School fee management that actually works
                  </h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    School Fee Track Pro is a complete Excel-based fee management system for private schools, nurseries, and educational institutions in Nigeria. Track every student, every term, and every payment with zero confusion.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:hello@digitglance.com?subject=Demo Request - School Fee Track Pro&body=School Name:%0AContact Name:%0APhone:%0A%0AI would like to request a demo of School Fee Track Pro."
                      className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm"
                    >
                      Request Demo
                    </a>
                    <a
                      href="mailto:hello@digitglance.com?subject=Purchase - School Fee Track Pro&body=School Name:%0AContact Name:%0APhone:%0A%0AI would like to purchase School Fee Track Pro."
                      className="flex items-center gap-2 border-2 border-blue-600 text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
                    >
                      Get Full Version
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Key features</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Student Records', desc: 'Enrol and manage every student with class, term, and payment status in one view.' },
                      { title: 'Fee Tracking per Term', desc: 'Set fee schedules per class and track what each student has paid or owes this term.' },
                      { title: 'Automatic Receipts', desc: 'Generate printable payment receipts instantly on recording a payment.' },
                      { title: 'Outstanding Balance Reports', desc: 'See at a glance which students have outstanding fees and by how much.' },
                      { title: 'Multi-Term History', desc: 'Full history across all terms. See any student\'s payment record for any term.' },
                    ].map(f => (
                      <div key={f.title} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-900">{f.title} — </span>
                          <span className="text-sm text-slate-500">{f.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CUSTOM SOLUTIONS ─── */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Custom Development</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Need something built specifically for your business?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              We design and build custom Excel VBA systems and web tools tailored exactly to your workflow and reporting needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'Payroll and PAYE Systems', desc: 'Automated monthly payroll computation, PAYE calculations, pension deductions, and payslip generation.' },
              { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Financial Reporting Systems', desc: 'Monthly management accounts, board reports, and variance analysis dashboards built on your data.' },
              { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Inventory and Stock Control', desc: 'Stock movement tracking, reorder alerts, cost of goods sold, and inventory valuation reports.' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Audit and Compliance Tools', desc: 'Internal control checklists, reconciliation templates, and audit preparation schedules.' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Member and Customer Management', desc: 'Custom member databases, subscription tracking, and automated statement generation.' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Process Automation', desc: 'Eliminate repetitive manual tasks. Batch processing, auto-calculations, and automated report distribution.' },
            ].map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">How We Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">From brief to delivered in weeks, not months</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery Call', body: 'Tell us about your current process, what you need to automate, and what success looks like.' },
              { step: '02', title: 'Scoping and Proposal', body: 'We map out the exact system to build and send a fixed-price proposal with a clear timeline.' },
              { step: '03', title: 'Build and Test', body: 'We build it, test it thoroughly, and send you a working version for review before delivery.' },
              { step: '04', title: 'Handover and Training', body: 'Full handover with training for your team so everyone can use it confidently from day one.' },
            ].map((item, i) => (
              <div key={item.step} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow relative">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mb-4 ${i === 0 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-20 bg-teal-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to automate your business processes?</h2>
          <p className="text-teal-100 text-lg mb-8">Whether you want a ready-made tool or a custom build, get in touch and we will help you find the right fit.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-teal-700 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
              Commission a Custom Tool
            </Link>
            <a href="#products" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all">
              Browse Ready Tools
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* WhatsApp button */}
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
    </main>
  )
}
