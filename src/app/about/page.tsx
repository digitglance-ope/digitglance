import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About | DigitGlance',
  description: 'Learn about DigitGlance, built by a professional accountant and software developer based in Nigeria.',
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
function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

const accountingSkills = [
  'Financial reporting and bookkeeping',
  'Tax advisory and NRS compliance',
  'LIRS and state tax practice',
  'Payroll management',
  'Audit support and internal controls',
  'Business consulting',
  'ICAN standards and IFRS application',
]

const techSkills = [
  'Web application development',
  'SaaS product design and deployment',
  'Excel VBA automation and systems',
  'Database design with Supabase',
  'AI integration and prompt engineering',
  'Next.js and modern web technologies',
  'Invoice and billing system development',
]

const industries = [
  { title: 'Construction',                desc: 'Project accounting, contract management, and financial reporting for construction companies operating in Nigeria.' },
  { title: 'Furniture & Home Accessories',desc: 'Inventory management, sales tracking, and retail accounting for home accessories businesses.' },
  { title: 'Entertainment',               desc: 'Financial management, tax compliance, and business advisory for entertainment industry clients.' },
  { title: 'International Business',      desc: 'Financial reporting standards and regulatory compliance for international companies operating in Nigeria.' },
  { title: 'Cooperative Societies',       desc: 'Member management, contribution tracking, and financial reporting for cooperative organisations.' },
  { title: 'Education',                   desc: 'Fee management, payroll, and financial administration systems for private schools and educational institutions.' },
]

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <span className="badge-green mb-6 inline-flex animate-fade-in-up">
            <span className="green-marker" />
            About DigitGlance
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            Built by an Accountant<br />
            <span style={{ color: '#27AE60' }}>Who Codes</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
            DigitGlance exists because accounting software rarely fits how Nigerian businesses actually work. We built the solution ourselves.
          </p>
        </div>
      </section>

      {/* ── BIO ─────────────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="card rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row gap-12">
            <ScrollReveal className="flex-shrink-0">
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white" style={{ background: 'linear-gradient(135deg, #1B4F72, #27AE60)' }}>
                  MI
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm" style={{ color: '#1B4F72' }}>Mustapha Idris</p>
                  <p className="text-sm" style={{ color: '#27AE60' }}>Founder &amp; Lead Developer</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: '#1B4F72' }}>Mustapha Idris Opeyemi</h2>
              <div className="space-y-4 text-slate-500 leading-relaxed text-sm">
                <p>
                  Mustapha Idris Opeyemi is a professional accountant based in Nigeria with experience spanning accounting, audit, tax services, and financial reporting. He has worked across numerous industries including construction, furniture and home accessories retail, and entertainment. He currently serves as an accountant in an international company, giving him direct exposure to the financial reporting standards and regulatory requirements that apply to larger organisations operating in Nigeria.
                </p>
                <p>
                  In addition to his corporate role, Mustapha serves as Associate Manager at Ade Fajemisin and Associates, a reputable accounting and tax firm in Lagos, where he supports clients with accounting, tax advisory, and regulatory compliance including matters relating to LIRS and the Nigeria Revenue Service.
                </p>
                <p>
                  Over time, he noticed that most accounting software available to Nigerian businesses was either too expensive, too generic, or simply not built for how businesses here operate. That gap led him to start building his own tools — first Excel VBA systems, then web applications, then DigitGlance.
                </p>
                <p>
                  Today, DigitGlance offers accounting and tax services, custom software development, Excel VBA desktop tools, and an AI-powered accounting assistant focused specifically on Nigerian practice, ICAN standards, NRS regulations, and LIRS compliance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-navy mb-4 inline-flex">Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2" style={{ color: '#1B4F72' }}>
              What We Bring to the Table
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={0}>
              <div className="card rounded-2xl p-8 h-full">
                <h3 className="font-extrabold mb-6 text-base flex items-center gap-2" style={{ color: '#27AE60' }}>
                  <span className="w-1.5 h-5 rounded-full inline-block" style={{ background: '#27AE60' }} />
                  Accounting Expertise
                </h3>
                <ul className="space-y-3">
                  {accountingSkills.map(item => (
                    <li key={item} className="flex items-start gap-3 text-slate-500 text-sm">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                        <IconCheck className="w-3 h-3 text-[#27AE60]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="card rounded-2xl p-8 h-full">
                <h3 className="font-extrabold mb-6 text-base flex items-center gap-2" style={{ color: '#1B4F72' }}>
                  <span className="w-1.5 h-5 rounded-full inline-block" style={{ background: '#1B4F72' }} />
                  Technical Skills
                </h3>
                <ul className="space-y-3">
                  {techSkills.map(item => (
                    <li key={item} className="flex items-start gap-3 text-slate-500 text-sm">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#e8f4fd', border: '1px solid #aed6f1' }}>
                        <IconCheck className="w-3 h-3 text-[#1B4F72]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP ─────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="card rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start gap-8">
              <div className="icon-box-navy flex-shrink-0">
                <IconBuilding className="w-6 h-6 text-[#1B4F72]" />
              </div>
              <div>
                <span className="badge-navy mb-4 inline-flex">Partnership</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4" style={{ color: '#1B4F72' }}>
                  Our Accounting &amp; Tax Partnership
                </h2>
                <p className="text-slate-500 leading-relaxed max-w-3xl text-sm">
                  DigitGlance partners with Ade Fajemisin and Associates, a reputable accounting and tax firm in Lagos. Mustapha Idris serves as Associate Manager within the firm, providing direct support on accounting, tax advisory, and regulatory matters. This includes matters relating to LIRS and the Nigeria Revenue Service. Our clients benefit from both the technical tools we build and the professional advisory support the firm provides.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-green mb-4 inline-flex">
              <span className="green-marker" />
              Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3" style={{ color: '#1B4F72' }}>
              Industries We Have Worked In
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Our experience spans multiple sectors giving us a practical understanding of how different businesses operate.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.title} delay={i * 70}>
                <div className="card-feature h-full">
                  <div className="w-8 h-1 rounded-full mb-4" style={{ background: '#27AE60' }} />
                  <h3 className="font-bold mb-2 text-sm" style={{ color: '#1B4F72' }}>{ind.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION + CTA ───────────────────────────────────── */}
      <section className="section-navy px-5 sm:px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="badge-green mb-6 inline-flex">
              <span className="green-marker" />
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6">Our Mission</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10">
              To build accounting technology that actually fits Nigerian business practice. Every tool, service, and product at DigitGlance is designed by someone who understands both the numbers and the regulations behind them.
            </p>
            <Link href="/contact" className="btn-green text-base px-8 py-4 inline-flex">
              Work With Us <IconArrow className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
