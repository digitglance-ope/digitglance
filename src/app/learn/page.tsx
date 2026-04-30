import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'DigitGlance Assist | AI Accounting & Tax Help',
  description: 'Get practical, Nigeria-focused answers to accounting and tax questions powered by AI.',
}

function IconAI({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}
function IconQuestion({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IconGrad({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  )
}
function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

const audiences = [
  { icon: IconGrad,      title: 'ICAN Students',    desc: 'Clear explanations of accounting standards, tax principles, and exam-focused answers.' },
  { icon: IconGrad,      title: 'University Students', desc: 'Financial accounting, management accounting, and taxation concepts with worked examples.' },
  { icon: IconBriefcase, title: 'Business Owners',  desc: 'Practical questions about VAT, PAYE, business expenses, and your tax obligations.' },
  { icon: IconUsers,     title: 'Finance Teams',    desc: 'Quick answers on IFRS treatment, tax computations, and Nigerian regulatory requirements.' },
]

const sampleQuestions = [
  'How do I calculate VAT on a mixed supply in Nigeria?',
  'What are the current PAYE tax bands for Lagos State?',
  'How should I account for prepaid expenses under IFRS?',
  'What is the difference between tax avoidance and tax evasion?',
  'How do I compute capital allowances for a manufacturing company?',
  'What documents does NRS require for a VAT audit?',
  'How do I treat foreign exchange gains in financial statements?',
  'What is the thin capitalization rule under Nigerian tax law?',
  'How do I prepare a bank reconciliation statement?',
  'What are the penalties for late filing of company income tax?',
]

export default function Learn() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <span className="badge-green mb-6 inline-flex animate-fade-in-up">
            <span className="green-marker" />
            DigitGlance Assist
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            Ask Any Accounting<br />
            <span style={{ color: '#27AE60' }}>or Tax Question</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
            Get practical, Nigeria-focused answers powered by AI and trained on Nigerian standards, NRS regulations, ICAN guidelines, and LIRS practice.
          </p>
        </div>
      </section>

      {/* ── WHO IT IS FOR ───────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-navy mb-4 inline-flex">Who It Helps</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3" style={{ color: '#1B4F72' }}>
              Who DigitGlance Assist Is For
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Whether you are studying for your ICAN exams or running a business, Assist gives you accurate answers fast.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="card-feature text-center h-full">
                  <div className="icon-box mx-auto mb-5">
                    <item.icon className="w-5 h-5 text-[#27AE60]" />
                  </div>
                  <h3 className="font-bold mb-2 text-sm" style={{ color: '#1B4F72' }}>{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE QUESTIONS ────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-10">
            <span className="badge-green mb-4 inline-flex">
              <span className="green-marker" />
              What You Can Ask
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3" style={{ color: '#1B4F72' }}>
              Example Questions
            </h2>
            <p className="text-slate-500 text-sm">Here are examples of questions DigitGlance Assist can answer.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {sampleQuestions.map((q, i) => (
              <ScrollReveal key={q} delay={i * 50}>
                <div className="card rounded-xl px-5 py-4 flex items-start gap-3">
                  <div className="icon-box flex-shrink-0 mt-0.5" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem' }}>
                    <IconQuestion className="w-3.5 h-3.5 text-[#27AE60]" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{q}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON CHAT ─────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="card rounded-2xl overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100" style={{ background: '#1B4F72' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <p className="text-white text-sm font-semibold">DigitGlance Assist</p>
                <span className="ml-auto bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                  Coming Soon
                </span>
              </div>

              {/* Chat body */}
              <div className="bg-[#f7fafc] p-10 min-h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="icon-box mx-auto mb-5" style={{ width: '4rem', height: '4rem', borderRadius: '1rem' }}>
                    <IconAI className="w-7 h-7 text-[#27AE60]" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#1B4F72' }}>DigitGlance Assist is being built</h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    The AI assistant is currently in development. It will be available soon with full support for Nigerian accounting and tax questions.
                  </p>
                </div>
              </div>

              {/* Chat input */}
              <div className="border-t border-gray-100 px-4 py-3 flex gap-3 bg-white">
                <input
                  disabled
                  placeholder="Ask an accounting or tax question..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed placeholder:text-slate-400 outline-none"
                />
                <button
                  disabled
                  className="bg-gray-100 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium cursor-not-allowed border border-gray-200"
                >
                  Send
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="rounded-2xl bg-amber-50 border border-amber-200 px-6 py-5">
              <p className="text-amber-800 text-sm leading-relaxed">
                <span className="font-semibold">Disclaimer:</span> DigitGlance Assist provides general accounting and tax guidance for educational purposes. It does not replace professional advice. For specific tax matters, regulatory filings, or legal questions, always consult a qualified accountant or tax adviser.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
