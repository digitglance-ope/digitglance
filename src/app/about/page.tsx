import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

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
  { title: 'Construction', desc: 'Project accounting, contract management, and financial reporting for construction companies operating in Nigeria.' },
  { title: 'Furniture & Home Accessories', desc: 'Inventory management, sales tracking, and retail accounting for home accessories businesses.' },
  { title: 'Entertainment', desc: 'Financial management, tax compliance, and business advisory for entertainment industry clients.' },
  { title: 'International Business', desc: 'Financial reporting standards and regulatory compliance for international companies operating in Nigeria.' },
  { title: 'Cooperative Societies', desc: 'Member management, contribution tracking, and financial reporting for cooperative organisations.' },
  { title: 'Education', desc: 'Fee management, payroll, and financial administration systems for private schools and educational institutions.' },
]

export default function About() {
  return (
    <main className="min-h-screen bg-[#050d1a]">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050d1a] px-5 sm:px-6 py-24">
        <div className="absolute inset-0 hero-grid" />
        <div className="orb w-[500px] h-[500px] bg-teal-500/10 top-[-20%] right-[-5%]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="teal-line mb-5 animate-fade-in-up">About DigitGlance</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 animate-fade-in-up anim-delay-100">
            Built by an Accountant<br />
            <span className="gradient-text">Who Codes</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
            DigitGlance exists because accounting software rarely fits how Nigerian businesses actually work. We built the solution ourselves.
          </p>
        </div>
      </section>

      {/* ── BIO ─────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row gap-12">
            {/* Avatar */}
            <ScrollReveal className="flex-shrink-0">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-4xl font-bold text-white teal-glow">
                  MI
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">Mustapha Idris</p>
                  <p className="text-teal-400 text-xs">Founder & Lead Developer</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bio text */}
            <ScrollReveal delay={100} className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Mustapha Idris Opeyemi</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed text-[0.95rem]">
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
      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <p className="teal-line mb-3 justify-center">Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What We Bring to the Table</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Accounting Expertise', items: accountingSkills },
              { title: 'Technical Skills',     items: techSkills },
            ].map((col, i) => (
              <ScrollReveal key={col.title} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 h-full">
                  <h3 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-teal-400 inline-block teal-glow-sm" />
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-slate-400 text-sm">
                        <span className="w-5 h-5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <IconCheck className="w-3 h-3 text-teal-400" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP ─────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="relative glass-card rounded-3xl p-8 sm:p-12 overflow-hidden">
              {/* Decorative orb */}
              <div className="orb w-80 h-80 bg-teal-500/8 right-[-10%] top-[-30%]" />
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0">
                  <IconBuilding className="w-7 h-7 text-teal-400" />
                </div>
                <div>
                  <p className="teal-line mb-3">Partnership</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 mt-1">Our Accounting & Tax Partnership</h2>
                  <p className="text-slate-400 leading-relaxed max-w-3xl">
                    DigitGlance partners with Ade Fajemisin and Associates, a reputable accounting and tax firm in Lagos. Mustapha Idris serves as Associate Manager within the firm, providing direct support on accounting, tax advisory, and regulatory matters. This includes matters relating to LIRS and the Nigeria Revenue Service. Our clients benefit from both the technical tools we build and the professional advisory support the firm provides.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <p className="teal-line mb-3 justify-center">Track Record</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Industries We Have Worked In</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Our experience spans multiple sectors giving us a practical understanding of how different businesses operate.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.title} delay={i * 70}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="w-8 h-1 rounded-full bg-teal-400 mb-4 teal-glow-sm" />
                  <h3 className="font-semibold text-white mb-2">{ind.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{ind.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION + CTA ───────────────────────────────────── */}
      <section className="px-5 sm:px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="teal-line mb-4 justify-center">Our Purpose</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 mt-1">Our Mission</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              To build accounting technology that actually fits Nigerian business practice. Every tool, service, and product at DigitGlance is designed by someone who understands both the numbers and the regulations behind them.
            </p>
            <a href="/contact" className="btn-primary text-base px-8 py-4 inline-flex">
              Work With Us <IconArrow className="w-5 h-5" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
