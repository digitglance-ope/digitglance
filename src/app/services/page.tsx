import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">Professional Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 max-w-3xl leading-tight">
            Expert accounting services for Nigerian businesses
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            From tax compliance to custom software, we provide the services Nigerian businesses need to operate professionally and grow confidently.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-teal-900/30">
              Book Free Consultation
            </Link>
            <Link href="#services" className="border border-slate-600 hover:border-teal-400 text-slate-300 hover:text-teal-400 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all">
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-slate-50 border-b border-slate-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-500">
          {[
            'CAC Registered Business',
            'NRS & LIRS Compliance',
            'IFRS-Aligned Reporting',
            'Serving Lagos & Nationwide',
          ].map(item => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICE GROUPS ─── */}
      <div id="services">

        {/* Group 1: Accounting & Tax */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
              {/* Left label */}
              <div className="lg:sticky lg:top-24">
                <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Accounting and Tax Services</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Professional services delivered in partnership with Ade Fajemisin and Associates, Lagos.</p>
                <Link href="/contact" className="inline-block text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors">
                  Enquire about this service →
                </Link>
              </div>
              {/* Right cards */}
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                    title: 'Bookkeeping and Financial Reporting',
                    desc: 'Accurate records, monthly management accounts, and financial statements prepared to IFRS standards for Nigerian businesses.',
                  },
                  {
                    icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z',
                    title: 'Tax Advisory and Compliance',
                    desc: 'Corporate income tax, VAT, withholding tax, and personal income tax advisory. We prepare and file returns with NRS and state tax authorities.',
                  },
                  {
                    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
                    title: 'LIRS and NRS Compliance',
                    desc: 'Direct support on Lagos Internal Revenue Service and Nigeria Revenue Service matters — assessments, objections, and correspondence.',
                  },
                  {
                    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
                    title: 'Payroll Management',
                    desc: 'Monthly payroll computation, PAYE deductions, pension remittances, and payslip preparation for businesses of any size.',
                  },
                  {
                    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                    title: 'Audit Support',
                    desc: 'Preparation of schedules and supporting documents for statutory audits. We work with your auditors to make the process smooth and efficient.',
                  },
                  {
                    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                    title: 'Business Consulting',
                    desc: 'Financial analysis, business registration support, internal control reviews, and practical advice for growing Nigerian businesses.',
                  },
                ].map(s => (
                  <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-200 hover:shadow-sm transition-all group">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Group 2: Software Dev */}
        <section className="px-6 py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
              <div className="lg:sticky lg:top-24">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Software Development</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Custom web applications and tools built for accounting and business workflows in Nigeria.</p>
                <Link href="/contact" className="inline-block text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                  Discuss your project →
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                    title: 'Web Application Development',
                    desc: 'Custom web applications built for your specific business process — invoice management, client portals, and internal dashboards.',
                  },
                  {
                    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                    title: 'Accounting Software Development',
                    desc: 'Bespoke accounting systems built around your chart of accounts, reporting needs, and regulatory requirements.',
                  },
                  {
                    icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z',
                    title: 'Excel VBA Desktop Systems',
                    desc: 'Professional automation tools on Excel for reporting, payroll, inventory, and internal controls. No expensive software licenses required.',
                  },
                ].map(s => (
                  <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Group 3: Training */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
              <div className="lg:sticky lg:top-24">
                <div className="w-14 h-14 bg-teal-700 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Training and Implementation</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Hands-on support to get your team using new tools effectively from day one.</p>
                <Link href="/contact" className="inline-block text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors">
                  Book onboarding session →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
                {[
                  {
                    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
                    title: 'Software Onboarding and Training',
                    desc: 'We set up your accounting software, migrate your data, and train your team so they can use it confidently from day one.',
                  },
                  {
                    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
                    title: 'Accounting System Setup',
                    desc: 'Chart of accounts design, opening balances, and system configuration tailored to your business structure and reporting needs.',
                  },
                ].map(s => (
                  <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ─── PROCESS ─── */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Working with us is simple</h2>
            <p className="text-slate-500 max-w-xl mx-auto">No complicated onboarding. Just a conversation, a clear scope, and results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Book a Consultation', body: 'Tell us about your business and what you need. Free initial consultation, no commitment.' },
              { step: '02', title: 'We Assess and Propose', body: 'We review your needs and send a clear proposal with timeline and pricing.' },
              { step: '03', title: 'We Do the Work', body: 'You focus on running your business. We handle the accounting, compliance, or development.' },
              { step: '04', title: 'Ongoing Support', body: 'We remain available for questions, updates, and continuous improvement as your business grows.' },
            ].map((item, i) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-sm transition-shadow">
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
          <h2 className="text-3xl font-bold mb-4">Not sure which service fits your business?</h2>
          <p className="text-teal-100 text-lg mb-8">Book a free consultation and we will help you identify the right solution.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-teal-700 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors text-base shadow-lg">
              Book Free Consultation
            </Link>
            <Link href="/about" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-all text-base">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
