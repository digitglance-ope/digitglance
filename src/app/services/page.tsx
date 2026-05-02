import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Services | DigitGlance',
  description: 'Professional accounting, tax advisory, payroll, software development, and Excel VBA services for Nigerian businesses. ICAN-standard, NRS and LIRS compliant.',
}

/* ── Icons ─────────────────────────────────────────────────── */

function IconCalculator({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
function IconBook({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}
function IconCog({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

/* ── Data ───────────────────────────────────────────────────── */

const accountingServices = [
  {
    icon: IconDocument,
    title: 'Bookkeeping & Financial Reporting',
    desc: 'Accurate records, monthly management accounts, and financial statements prepared to IFRS standards for Nigerian businesses.',
  },
  {
    icon: IconCoin,
    title: 'Tax Advisory & Compliance',
    desc: 'Corporate income tax, VAT, withholding tax, and personal income tax advisory. We prepare and file returns with NRS and state tax authorities.',
  },
  {
    icon: IconShield,
    title: 'LIRS & NRS Compliance',
    desc: 'Direct support on Lagos Internal Revenue Service and Nigeria Revenue Service matters including assessments, objections, and correspondence.',
  },
  {
    icon: IconUsers,
    title: 'Payroll Management',
    desc: 'Monthly payroll computation, PAYE deductions, pension remittances, and payslip preparation for businesses of any size.',
  },
  {
    icon: IconCalculator,
    title: 'Audit Support',
    desc: 'Preparation of schedules and supporting documents for statutory audits. We work with your auditors to make the process smooth and efficient.',
  },
  {
    icon: IconBuilding,
    title: 'Business Consulting',
    desc: 'Financial analysis, business registration support, internal control reviews, and practical advice for growing Nigerian businesses.',
  },
]

const softwareServices = [
  {
    icon: IconCode,
    title: 'Web Application Development',
    desc: 'Custom web applications built for your specific business process — from invoice management to client portals and internal dashboards.',
  },
  {
    icon: IconCalculator,
    title: 'Accounting Software Development',
    desc: 'Bespoke accounting systems built around your chart of accounts, reporting needs, and Nigerian regulatory requirements.',
  },
  {
    icon: IconTable,
    title: 'Excel VBA Desktop Systems',
    desc: 'Professional automation tools built on Excel for reporting, payroll, inventory, and internal controls. No expensive software licenses required.',
  },
]

const trainingServices = [
  {
    icon: IconBook,
    title: 'Software Onboarding & Training',
    desc: 'We set up your accounting software, migrate your data, and train your team so they can use it confidently from day one.',
  },
  {
    icon: IconCog,
    title: 'Accounting System Setup',
    desc: 'Chart of accounts design, opening balances, and system configuration tailored to your business structure and reporting needs.',
  },
]

const process = [
  { step: '01', title: 'Free Consultation', desc: 'We start with a 30-minute call to understand your business, your current setup, and what you actually need.' },
  { step: '02', title: 'Tailored Proposal', desc: 'We send a clear proposal with scope, timeline, and pricing — no jargon, no surprises.' },
  { step: '03', title: 'Onboarding', desc: 'We set up systems, gather documents, and get to work. We keep you updated throughout.' },
  { step: '04', title: 'Ongoing Support', desc: 'Monthly reporting, compliance deadlines, and support on-demand. You will always have someone to call.' },
]

const whyChoose = [
  'Built by a professional accountant who understands Nigerian regulations',
  'ICAN-standard work across all accounting and tax services',
  'Direct access to Ade Fajemisin and Associates for regulated advisory',
  'One team covering accounting, software, and automation',
  'Practical, business-first approach — no unnecessary complexity',
  'Fast turnaround on tax filings and management accounts',
]

/* ── Page ───────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <span className="badge-green mb-6 inline-flex animate-fade-in-up">
            <span className="green-marker" />
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-tight mb-5 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            Professional Services for<br />
            <span style={{ color: '#27AE60' }}>Nigerian Businesses</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
            From tax compliance to custom software, we provide the services Nigerian businesses need to operate professionally, stay compliant, and grow confidently.
          </p>
          <div className="flex flex-wrap gap-3 mt-8 animate-fade-in-up anim-delay-300">
            <Link href="/contact" className="btn-green text-sm py-3 px-6">
              Book a Free Consultation <IconArrow className="w-4 h-4" />
            </Link>
            <a href="#accounting" className="btn-navy text-sm py-3 px-6">
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* ── ACCOUNTING & TAX ─────────────────────────────────── */}
      <section id="accounting" className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="icon-box">
                <IconCalculator className="w-5 h-5 text-[#27AE60]" />
              </div>
              <span className="badge-green">Accounting &amp; Tax</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: '#1B4F72' }}>
              Accounting and Tax Services
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              Professional services delivered in partnership with Ade Fajemisin and Associates, Lagos — covering everything your business needs to stay compliant and financially healthy.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accountingServices.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 70}>
                <div className="card-feature h-full group">
                  <div className="icon-box mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svc.icon className="w-5 h-5 text-[#27AE60]" />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFTWARE DEVELOPMENT ─────────────────────────────── */}
      <section id="software" className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="icon-box-navy">
                <IconCode className="w-5 h-5 text-[#1B4F72]" />
              </div>
              <span className="badge-navy">Software Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: '#1B4F72' }}>
              Software Development Services
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              Custom tools and web applications built for accounting and business workflows. We build what you need — not what a shelf product forces on you.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {softwareServices.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 80}>
                <div className="card-feature h-full group">
                  <div className="icon-box-navy mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svc.icon className="w-5 h-5 text-[#1B4F72]" />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING & SETUP ─────────────────────────────────── */}
      <section id="training" className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="icon-box">
                <IconBook className="w-5 h-5 text-[#27AE60]" />
              </div>
              <span className="badge-green">Training &amp; Setup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: '#1B4F72' }}>
              Training and System Setup
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              Hands-on support to get your team using new tools effectively. We do not disappear after delivery.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
            {trainingServices.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 80}>
                <div className="card-feature h-full group">
                  <div className="icon-box mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svc.icon className="w-5 h-5 text-[#27AE60]" />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-navy mb-4 inline-flex">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3" style={{ color: '#1B4F72' }}>
              Simple, Transparent Process
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              No lengthy onboarding. No hidden fees. Just a clear path from first call to delivered results.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 80}>
                <div className="card rounded-2xl p-6 h-full relative">
                  <span className="text-4xl font-extrabold mb-4 block" style={{ color: '#eafaf1', WebkitTextStroke: '1px #a9dfbf' }}>
                    {step.step}
                  </span>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <IconArrow className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Text */}
            <div className="flex-1 max-w-lg">
              <ScrollReveal>
                <span className="badge-green mb-5 inline-flex">
                  <span className="green-marker" />
                  Why DigitGlance
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-6" style={{ color: '#1B4F72' }}>
                  Accounting expertise and<br />
                  <span style={{ color: '#27AE60' }}>software in one team</span>
                </h2>
                <ul className="space-y-3">
                  {whyChoose.map(item => (
                    <li key={item} className="check-item">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                        <IconCheck className="w-3 h-3 text-[#27AE60]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* Partnership card */}
            <ScrollReveal delay={150} className="flex-1 w-full max-w-md">
              <div className="card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="icon-box-navy">
                    <IconBuilding className="w-5 h-5 text-[#1B4F72]" />
                  </div>
                  <span className="badge-navy">Our Partnership</span>
                </div>
                <h3 className="font-extrabold mb-3 text-base" style={{ color: '#1B4F72' }}>
                  Ade Fajemisin and Associates
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  DigitGlance delivers accounting and tax services in partnership with Ade Fajemisin and Associates, a reputable Lagos-based accounting firm. Our founder Mustapha Idris serves as Associate Manager, giving clients access to a full professional practice backed by years of Nigerian regulatory experience.
                </p>
                <div className="space-y-2 text-sm text-slate-500">
                  {[
                    'CAC-registered accounting practice',
                    'ICAN-affiliated professionals',
                    'LIRS and NRS authorised agents',
                    'Lagos State based, nationwide coverage',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#27AE60' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="section-navy px-5 sm:px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              Not sure which service fits your needs?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Book a free 30-minute consultation and we will help you identify the right solution — no commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-green text-base px-8 py-4 inline-flex">
                Book a Free Consultation <IconArrow className="w-5 h-5" />
              </Link>
              <a href="mailto:hello@digitglance.com" className="btn-navy text-base px-8 py-4 inline-flex" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                Email Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
