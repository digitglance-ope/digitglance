import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import CounterUp from '@/components/CounterUp'

function IconBarChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l3-3 3 3v13M3 19h18" />
    </svg>
  )
}
function IconCalculator({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function IconCoin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IconCode({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )
}
function IconTable({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}
function IconAI({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}
function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

const services = [
  {
    icon: IconCalculator,
    title: 'Accounting & Tax',
    desc: 'Bookkeeping, tax advisory, payroll, and NRS/LIRS compliance for Nigerian businesses.',
    href: '/services',
  },
  {
    icon: IconCode,
    title: 'Web Applications',
    desc: 'Custom web apps and subscription software built for accounting and business workflows.',
    href: '/products',
  },
  {
    icon: IconTable,
    title: 'Excel VBA Tools',
    desc: 'Professional desktop systems on Excel VBA for reporting, controls, and automation.',
    href: '/solutions',
  },
  {
    icon: IconAI,
    title: 'DigitGlance Assist',
    desc: 'Ask accounting and tax questions, get Nigeria-focused answers powered by AI.',
    href: '/learn',
  },
]

const invoiceFeatures = [
  'Create and send professional invoices',
  'Track paid, pending, and overdue payments',
  'Manage client records in one place',
  'Download PDF invoices instantly',
  'Dashboard with real-time financial summary',
]

const accountingFeatures = [
  'Bookkeeping and management accounts',
  'Federal and state tax filing (FIRS & LIRS)',
  'Payroll management and PAYE remittance',
  'ICAN-standard financial reporting',
]

const stats = [
  { end: 6,   suffix: '+', label: 'Industries Served',     sub: 'Construction, retail, entertainment & more' },
  { end: 4,   suffix: '',  label: 'Core Services',         sub: 'Accounting, software, VBA & AI tools' },
  { end: 100, suffix: '%', label: 'Nigeria-Focused',       sub: 'Built around NRS, LIRS & ICAN standards' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">

            {/* Left: copy */}
            <div className="flex-1 max-w-xl">
              <span className="badge-green mb-6 inline-flex animate-fade-in-up">
                <span className="green-marker" />
                Accounting Intelligence. Built for Business.
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] mb-6 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
                Accounting Expertise.{' '}
                <span style={{ color: '#27AE60' }}>Software That Works.</span>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-9 animate-fade-in-up anim-delay-200">
                DigitGlance builds web applications, AI tools, and automation systems for accountants and business owners in Nigeria and beyond.
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-in-up anim-delay-300">
                <Link href="/contact" className="btn-green text-sm py-3 px-6">
                  Book a Free Consultation
                  <IconArrow className="w-4 h-4" />
                </Link>
                <Link href="/products" className="btn-navy text-sm py-3 px-6">
                  See Our Products
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 animate-fade-in anim-delay-500">
                {[
                  { value: 'Nigeria', label: 'Focused platform' },
                  { value: 'ICAN',    label: 'Standard compliant' },
                  { value: '100%',    label: 'End-to-end service' },
                ].map(item => (
                  <div key={item.value}>
                    <p className="font-extrabold text-lg" style={{ color: '#27AE60' }}>{item.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: product mockup */}
            <div className="flex-1 w-full max-w-lg animate-fade-in anim-delay-200">
              <div className="mockup-window">
                <div className="mockup-header">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-white/70 text-xs font-medium ml-3">DigitGlance Invoice</span>
                  <span className="ml-auto text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full">app.digitglance.com</span>
                </div>
                {/* Mockup body */}
                <div className="bg-[#f7fafc] p-5 space-y-3">
                  {/* Summary cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Total Invoiced', value: '₦725,500', color: '#1B4F72' },
                      { label: 'Paid',           value: '₦450,000', color: '#27AE60' },
                      { label: 'Pending',        value: '₦275,500', color: '#d97706'  },
                    ].map(c => (
                      <div key={c.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                        <p className="text-[9px] text-slate-400 font-medium mb-1">{c.label}</p>
                        <p className="text-xs font-extrabold" style={{ color: c.color }}>{c.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Invoice rows */}
                  {[
                    { label: 'Johnson Supplies Ltd', amount: '₦450,000', status: 'Paid',    bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
                    { label: 'Lagos Retail Co.',     amount: '₦180,000', status: 'Pending',  bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
                    { label: 'Abuja Ventures',       amount: '₦95,500',  status: 'Overdue',  bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
                  ].map(row => (
                    <div key={row.label} className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#e8f4fd' }}>
                          <IconDocument className="w-4 h-4 text-[#1B4F72]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{row.label}</p>
                          <p className="text-[10px] text-slate-400">{row.amount}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${row.bg} ${row.text} ${row.border}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-navy mb-4 inline-flex">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: '#1B4F72' }}>
              Professional services, <span style={{ color: '#27AE60' }}>one team</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Built around accounting, technology, and practical results for Nigerian businesses.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 80}>
                <Link href={svc.href} className="card-feature flex flex-col h-full group">
                  <div className="icon-box mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svc.icon className="w-5 h-5 text-[#27AE60]" />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#27AE60' }}>
                    Learn more <IconArrow className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 1: Invoice App ────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Text */}
            <div className="flex-1 max-w-lg">
              <ScrollReveal>
                <span className="badge-green mb-5 inline-flex">
                  <span className="green-marker" />
                  Now Available
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5 mt-2" style={{ color: '#1B4F72' }}>
                  Invoice Management for{' '}
                  <span style={{ color: '#27AE60' }}>Nigerian SMEs</span>
                </h2>
                <p className="text-slate-500 mb-7 leading-relaxed text-sm">
                  Create professional invoices, track payments, manage clients, and get financial insights. Built specifically for how Nigerian businesses operate.
                </p>
                <ul className="space-y-3 mb-8">
                  {invoiceFeatures.map(feat => (
                    <li key={feat} className="check-item">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                        <IconCheck className="w-3 h-3 text-[#27AE60]" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/products" className="btn-green text-sm py-3 px-6 inline-flex">
                  See the App <IconArrow className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Visual */}
            <ScrollReveal delay={150} className="flex-1 w-full max-w-lg">
              <div className="mockup-window animate-float">
                <div className="mockup-header">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-white/70 text-xs font-medium ml-3">Invoice #INV-0042</span>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Billed to</p>
                      <p className="font-bold text-sm" style={{ color: '#1B4F72' }}>Johnson Supplies Ltd</p>
                      <p className="text-xs text-slate-400">12 Marina Road, Lagos</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">Paid</span>
                  </div>
                  <div className="space-y-2 mb-5">
                    {[
                      { item: 'Audit Services Q1',   qty: 1,  price: '₦300,000' },
                      { item: 'Tax Advisory',         qty: 1,  price: '₦100,000' },
                      { item: 'Payroll Processing',   qty: 2,  price: '₦50,000' },
                    ].map(row => (
                      <div key={row.item} className="flex justify-between text-xs py-2 border-b border-gray-50">
                        <span className="text-slate-600">{row.item}</span>
                        <span className="font-semibold" style={{ color: '#1B4F72' }}>{row.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs text-slate-400 font-medium">Total</span>
                    <span className="font-extrabold text-base" style={{ color: '#27AE60' }}>₦450,000</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FEATURE 2: Accounting & Tax ──────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-14">
            {/* Visual left */}
            <ScrollReveal delay={150} className="flex-1 w-full max-w-lg">
              <div className="card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-box-navy">
                    <IconShield className="w-5 h-5 text-[#1B4F72]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#1B4F72' }}>Compliance Status</p>
                    <p className="text-xs text-slate-400">FY 2025/2026</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { task: 'Company Income Tax (FIRS)',  done: true  },
                    { task: 'PAYE Remittance (LIRS)',     done: true  },
                    { task: 'VAT Filing — March',        done: true  },
                    { task: 'Audited Accounts',          done: false },
                    { task: 'Annual Returns (CAC)',      done: false },
                  ].map(row => (
                    <div key={row.task} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-slate-600">{row.task}</span>
                      {row.done
                        ? <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">Done</span>
                        : <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Due Soon</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Text right */}
            <div className="flex-1 max-w-lg">
              <ScrollReveal>
                <span className="badge-navy mb-5 inline-flex">Accounting &amp; Tax</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5 mt-2" style={{ color: '#1B4F72' }}>
                  Stay compliant,{' '}
                  <span style={{ color: '#27AE60' }}>stay ahead</span>
                </h2>
                <p className="text-slate-500 mb-7 leading-relaxed text-sm">
                  Our professional accounting team handles your books, taxes, and payroll so you can focus on running your business. ICAN-standard work, Nigeria-specific expertise.
                </p>
                <ul className="space-y-3 mb-8">
                  {accountingFeatures.map(feat => (
                    <li key={feat} className="check-item">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#e8f4fd', border: '1px solid #aed6f1' }}>
                        <IconCheck className="w-3 h-3 text-[#1B4F72]" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="btn-navy text-sm py-3 px-6 inline-flex">
                  View All Services <IconArrow className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-5">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="card rounded-2xl p-8 text-center">
                  <p className="text-4xl sm:text-5xl font-extrabold mb-2" style={{ color: '#27AE60' }}>
                    <CounterUp end={stat.end} suffix={stat.suffix} duration={1800} />
                  </p>
                  <p className="font-bold text-sm mb-1" style={{ color: '#1B4F72' }}>{stat.label}</p>
                  <p className="text-slate-400 text-xs">{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="card rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white" style={{ background: 'linear-gradient(135deg, #1B4F72, #27AE60)' }}>
                  MI
                </div>
              </div>
              <div className="flex-1">
                <span className="badge-green mb-4 inline-flex">
                  <span className="green-marker" />
                  The Team
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 mt-2" style={{ color: '#1B4F72' }}>
                  Built by an Accountant Who Codes
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl text-sm">
                  Mustapha Idris Opeyemi is a professional accountant and software developer based in Nigeria. DigitGlance was built to solve a specific problem: accounting software that does not fit how Nigerian businesses actually work. Every tool and service here comes from that same starting point.
                </p>
                <Link href="/about" className="btn-green-outline text-sm py-2.5 px-5 inline-flex">
                  Learn more about DigitGlance <IconArrow className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="section-navy px-5 sm:px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex justify-center gap-4 mb-8">
              {[IconBarChart, IconDocument, IconCoin].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white/70" />
                </div>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              Ready to work with{' '}
              <span style={{ color: '#27AE60' }}>DigitGlance?</span>
            </h2>
            <p className="text-slate-300 mb-10 text-base leading-relaxed">
              Whether you need accounting services, a custom software tool, or want to subscribe to our invoice app — start with a free consultation.
            </p>
            <Link href="/contact" className="btn-green text-base px-8 py-4 inline-flex">
              Book a Free Consultation <IconArrow className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
