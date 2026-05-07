import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">About DigitGlance</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
              Built by an accountant who codes
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              DigitGlance exists because accounting software rarely fits how Nigerian businesses actually work. We built the solution ourselves — from the ground up.
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2+', label: 'Years building for Nigeria' },
              { value: '10+', label: 'Industries served' },
              { value: '6', label: 'Industry sectors' },
              { value: 'CAC', label: 'Registered business' },
            ].map(s => (
              <div key={s.label} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                <p className="text-3xl font-bold text-teal-400 mb-1">{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER BIO ─── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12 items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-40 h-40 bg-teal-600 rounded-3xl flex items-center justify-center text-5xl font-bold text-white mb-4">
              MI
            </div>
            <p className="font-bold text-slate-900 text-center lg:text-left">Mustapha Idris Opeyemi</p>
            <p className="text-sm text-slate-500 text-center lg:text-left mt-1">Founder, DigitGlance</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
              {['Professional Accountant', 'Software Developer', 'Lagos, Nigeria'].map(tag => (
                <span key={tag} className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <div className="space-y-5 text-slate-600 leading-relaxed">
            <p>
              Mustapha Idris Opeyemi is a professional accountant based in Nigeria with experience spanning accounting, audit, tax services, and financial reporting. He has worked across numerous industries including construction, furniture and home accessories retail, and entertainment. He currently serves as an accountant in an international company, giving him direct exposure to the financial reporting standards and regulatory requirements that apply to larger organisations operating in Nigeria.
            </p>
            <p>
              In addition to his corporate role, Mustapha serves as Associate Manager at Ade Fajemisin and Associates, a reputable accounting and tax firm in Lagos, where he supports clients with accounting, tax advisory, and regulatory compliance including matters relating to LIRS and the Nigeria Revenue Service.
            </p>
            <p>
              Over time, he noticed that most accounting software available to Nigerian businesses was either too expensive, too generic, or simply not built for how businesses here operate. Tax codes were wrong. Workflows did not match local practice. Support was nonexistent.
            </p>
            <p>
              That gap led him to start building his own tools. First Excel VBA systems for clients who needed automation without expensive software. Then web applications. Then DigitGlance — a platform built to bring professional accounting technology to Nigerian businesses at a price and scale that makes sense.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm">
                Work with Mustapha
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERTISE ─── */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Our Expertise</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Dual expertise — accounting and technology</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Accounting Expertise</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Financial reporting and bookkeeping',
                  'Tax advisory and NRS compliance',
                  'LIRS and state tax practice',
                  'Payroll management',
                  'Audit support and internal controls',
                  'Business consulting',
                  'IFRS application and standards',
                  'Corporate and personal income tax',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0 mt-1.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Technical Skills</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Web application development',
                  'SaaS product design and deployment',
                  'Excel VBA automation and systems',
                  'Database design with Supabase',
                  'AI integration and prompt engineering',
                  'Next.js and modern web technologies',
                  'Invoice and billing system development',
                  'Accounting software architecture',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERSHIP ─── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 text-white rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <div className="w-12 h-12 bg-teal-600/20 border border-teal-500/30 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Accounting and Tax Partnership</h2>
              <p className="text-slate-300 leading-relaxed max-w-3xl text-lg">
                DigitGlance partners with Ade Fajemisin and Associates, a reputable accounting and tax firm in Lagos. Mustapha Idris serves as Associate Manager within the firm, providing direct support on accounting, tax advisory, and regulatory matters. Our clients benefit from both the technical tools we build and the professional advisory support the firm provides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Experience</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Industries we have worked in</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Our experience spans multiple sectors, giving us a practical understanding of how different businesses operate.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Construction', desc: 'Project accounting, contract management, and financial reporting for construction companies operating in Nigeria.' },
              { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Retail and Home Accessories', desc: 'Inventory management, sales tracking, and retail accounting for home accessories businesses.' },
              { icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', title: 'Entertainment', desc: 'Financial management, tax compliance, and business advisory for entertainment industry clients.' },
              { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'International Business', desc: 'Financial reporting standards and regulatory compliance for international companies operating in Nigeria.' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Cooperative Societies', desc: 'Member management, contribution tracking, and financial reporting for cooperative organisations.' },
              { icon: 'M12 14l9-5-9-5-9 5 9 5z', title: 'Education', desc: 'Fee management, payroll, and financial administration systems for private schools and educational institutions.' },
            ].map(ind => (
              <div key={ind.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={ind.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">{ind.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION + CTA ─── */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-3">Our Mission</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
            Build accounting technology that actually fits Nigerian business practice
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            Every tool, service, and product at DigitGlance is designed by someone who understands both the numbers and the regulations behind them. This is not software adapted from overseas — it is built from scratch for Nigeria.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-teal-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-700 transition-colors text-sm">
              Work With Us
            </Link>
            <Link href="/products" className="border border-slate-300 hover:border-teal-400 text-slate-700 hover:text-teal-600 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all">
              See Our Products
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
