import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import CounterUp from '@/components/CounterUp'

/* ── Finance SVG icons ───────────────────────────────────── */

function IconBarChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l3-3 3 3v13M3 19h18" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 19V9l3-3" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 19V9l-3-3" />
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
function IconPieChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
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

/* ── Service cards data ──────────────────────────────────── */

const services = [
  {
    icon: IconCalculator,
    title: 'Accounting & Tax Services',
    desc: 'Bookkeeping, tax advisory, payroll, and NRS/LIRS compliance for Nigerian businesses.',
    href: '/services',
  },
  {
    icon: IconCode,
    title: 'Web Applications & SaaS',
    desc: 'Custom web apps and subscription software built for accounting and business workflows.',
    href: '/products',
  },
  {
    icon: IconTable,
    title: 'Excel VBA Desktop Tools',
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
  'Dashboard with financial summary',
]

const stats = [
  { end: 6,   suffix: '+', label: 'Industries Served',     sub: 'Construction, retail, entertainment & more' },
  { end: 4,   suffix: '',  label: 'Core Services',         sub: 'Accounting, software, VBA & AI tools' },
  { end: 100, suffix: '%', label: 'Nigeria-Focused',       sub: 'Built around NRS, LIRS & ICAN standards' },
]

/* ── Page ────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050d1a]">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#050d1a]">
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid" />

        {/* Gradient orbs */}
        <div className="orb w-[700px] h-[700px] bg-teal-500/10 top-[-10%] left-[-5%]" />
        <div className="orb w-[500px] h-[500px] bg-cyan-500/8 bottom-[-10%] right-[10%]" />
        <div className="orb w-[300px] h-[300px] bg-teal-400/6 top-[20%] right-[30%]" />

        {/* Floating finance icons — desktop only */}
        <div className="absolute right-[4%] top-[12%] hidden lg:block animate-float opacity-[0.18]">
          <IconBarChart className="w-36 h-36 text-teal-400" />
        </div>
        <div className="absolute right-[22%] top-[8%] hidden lg:block animate-float-2 opacity-[0.13]">
          <IconCalculator className="w-20 h-20 text-cyan-300" />
        </div>
        <div className="absolute right-[6%] bottom-[20%] hidden lg:block animate-float-3 opacity-[0.14]">
          <IconDocument className="w-24 h-24 text-teal-300" />
        </div>
        <div className="absolute right-[38%] bottom-[25%] hidden lg:block animate-float-4 opacity-[0.10]">
          <IconCoin className="w-16 h-16 text-teal-400" />
        </div>
        <div className="absolute right-[18%] bottom-[10%] hidden xl:block animate-float-5 opacity-[0.12]">
          <IconPieChart className="w-14 h-14 text-cyan-400" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="teal-line mb-6 animate-fade-in-up">
              Accounting Intelligence. Built for Business.
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] mb-7 text-white animate-fade-in-up anim-delay-100">
              Accounting Expertise.{' '}
              <span className="gradient-text">Software That Works.</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl mb-11 max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
              DigitGlance builds web applications, AI tools, and automation systems for accountants and business owners in Nigeria and beyond.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up anim-delay-300">
              <a href="/services" className="btn-primary">
                Explore Our Services
                <IconArrow className="w-4 h-4" />
              </a>
              <a href="/products" className="btn-outline">
                See Our Products
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-6 max-w-md animate-fade-in anim-delay-500">
              {[
                { label: 'Nigeria', sub: 'Focused platform' },
                { label: 'Dual', sub: 'Expert team' },
                { label: 'End‑to‑End', sub: 'Full solutions' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-teal-400 font-bold text-lg teal-glow-text">{item.label}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-14">
            <p className="teal-line mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Professional services, <span className="gradient-text">one team</span>
            </h2>
            <p className="text-slate-500 max-w-xl">
              Built around accounting, technology, and practical results for Nigerian businesses.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 80}>
                <a
                  href={svc.href}
                  className="glass-card rounded-2xl p-6 flex flex-col h-full group"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors duration-300">
                    <svc.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-[0.95rem]">{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-teal-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <IconArrow className="w-3 h-3" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CALLOUT ─────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1">
              <ScrollReveal>
                <span className="teal-line mb-4 inline-flex">Now Available</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
                  Invoice Management for{' '}
                  <span className="gradient-text">Nigerian SMEs</span>
                </h2>
                <p className="text-slate-400 mb-7 leading-relaxed">
                  Create professional invoices, track payments, manage clients, and get financial insights. Built specifically for how Nigerian businesses operate.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <ul className="space-y-3 mb-8">
                  {invoiceFeatures.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                        <IconCheck className="w-3 h-3 text-teal-400" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <a href="/products" className="btn-primary inline-flex">
                  See the App <IconArrow className="w-4 h-4" />
                </a>
              </ScrollReveal>
            </div>

            {/* Visual */}
            <ScrollReveal delay={200} className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#030810]">
                {/* Mock app header */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/3">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-glow" />
                  <span className="text-white text-xs font-medium">DigitGlance Invoice</span>
                  <span className="ml-auto text-[10px] bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20">Live</span>
                </div>
                {/* Mock app body */}
                <div className="p-6 space-y-3">
                  {[
                    { label: 'Johnson Supplies Ltd', amount: '₦450,000', status: 'Paid', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
                    { label: 'Lagos Retail Co.', amount: '₦180,000', status: 'Pending', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
                    { label: 'Abuja Ventures', amount: '₦95,500', status: 'Overdue', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between glass rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/20 flex items-center justify-center">
                          <IconDocument className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                          <p className="text-white text-xs font-medium">{row.label}</p>
                          <p className="text-slate-500 text-[10px]">{row.amount}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${row.color}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 glass rounded-xl px-4 py-3 flex items-center justify-between">
                    <p className="text-slate-400 text-xs">Total Invoiced</p>
                    <p className="text-teal-400 font-bold text-sm">₦725,500</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS / CREDIBILITY ─────────────────────────────── */}
      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-5">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-teal-400 mb-2 teal-glow-text">
                    <CounterUp end={stat.end} suffix={stat.suffix} duration={1800} />
                  </p>
                  <p className="text-white font-semibold mb-1">{stat.label}</p>
                  <p className="text-slate-500 text-sm">{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ───────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white teal-glow">
                  MI
                </div>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="teal-line mb-3">The Team</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 mt-1">
                  Built by an Accountant Who Codes
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
                  Mustapha Idris Opeyemi is a professional accountant and software developer based in Nigeria. DigitGlance was built to solve a specific problem: accounting software that does not fit how Nigerian businesses actually work. Every tool and service here comes from that same starting point.
                </p>
                <a href="/about" className="btn-outline inline-flex text-sm py-2.5 px-5">
                  Learn more about DigitGlance <IconArrow className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            {/* Decorative icons */}
            <div className="flex justify-center gap-6 mb-10">
              {[IconBarChart, IconDocument, IconCoin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Ready to work with{' '}
              <span className="gradient-text">DigitGlance?</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Whether you need accounting services, a custom software tool, or want to subscribe to our invoice app — start with a free consultation.
            </p>
            <a href="/contact" className="btn-primary text-base px-8 py-4 inline-flex">
              Book a Free Consultation <IconArrow className="w-5 h-5" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
