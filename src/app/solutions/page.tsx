import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Desktop Solutions | DigitGlance',
  description: 'Professional Excel VBA desktop applications for Nigerian businesses. RelianceCoop Manager and School Fee Track Pro — download the demo or get the full version.',
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.856L.057 23.215a.75.75 0 00.916.916l5.355-1.479A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 01-4.964-1.361l-.355-.213-3.681 1.016 1.017-3.681-.213-.355A9.725 9.725 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  )
}

const customSolutions = [
  { title: 'Payroll Management System',    desc: 'Automated payroll computation with PAYE deductions, pension calculations, and payslip generation.' },
  { title: 'Inventory and Stock Control',  desc: 'Real-time stock tracking with purchase orders, goods received notes, and automatic reorder alerts.' },
  { title: 'Fixed Asset Register',         desc: 'Complete asset management with depreciation computation, disposal tracking, and year-end schedules.' },
  { title: 'Budget and Expense Monitor',   desc: 'Project budget tracking with departmental expense recording, variance analysis, and donor reporting.' },
  { title: 'Accounts Receivable Tracker',  desc: 'Invoice aging analysis, overdue tracking, and automatic collection letter generation.' },
  { title: 'Sales and Revenue Tracker',    desc: 'Daily sales recording with customer ledgers, revenue dashboards, and invoice generation.' },
]

const buildProcess = [
  { step: '01', title: 'Discovery',          desc: 'We start by understanding your current process, pain points, and reporting needs in detail.' },
  { step: '02', title: 'Design',             desc: 'We design the system structure, data flow, and output reports before writing a single line of code.' },
  { step: '03', title: 'Build and Test',     desc: 'We build the system and test it thoroughly with sample data to ensure accuracy and reliability.' },
  { step: '04', title: 'Training & Handover',desc: 'We train your team and provide documentation so they can use it confidently from day one.' },
]

const openSteps = [
  { step: '1', title: 'Unblock the file first',    desc: 'Right-click the downloaded file, select Properties, tick the Unblock checkbox at the bottom, and click OK before opening.' },
  { step: '2', title: 'Open the file in Excel',    desc: 'Double-click the file to open it. You need Microsoft Excel on Windows. The file will not work on Mac or Google Sheets.' },
  { step: '3', title: 'Click Enable Editing',      desc: 'If a yellow bar appears saying Protected View, click Enable Editing to allow the file to run normally.' },
  { step: '4', title: 'Click Enable Content',      desc: 'A yellow bar will say Macros have been disabled. Click Enable Content. The application will now load fully.' },
  { step: '5', title: 'If macros are still blocked', desc: 'Open Excel → File → Options → Trust Center → Trust Center Settings → Macro Settings → Enable all macros.' },
  { step: '6', title: 'Read the user manual',      desc: 'Download and read the user manual before first use. It covers every feature step by step and takes about 20 minutes.' },
]

export default function Solutions() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <span className="badge-navy mb-6 inline-flex animate-fade-in-up">Desktop Solutions</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            Professional Desktop Tools<br />
            <span style={{ color: '#27AE60' }}>Built on Excel</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
            We build custom Excel VBA systems that automate your business processes, improve reporting accuracy, and eliminate repetitive manual work. No expensive software licenses. No complicated setup.
          </p>
        </div>
      </section>

      {/* ── RELIANCECOOP MANAGER ─────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="card rounded-3xl overflow-hidden">
              {/* Product header bar */}
              <div className="flex items-center justify-between px-8 py-4" style={{ background: '#1B4F72' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <IconTable className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-extrabold">RelianceCoop Manager</span>
                </div>
                <span className="badge-green text-xs">Available Now</span>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left: description */}
                  <div>
                    <span className="badge-green mb-4 inline-flex">
                      <span className="green-marker" />
                      Cooperative Management System
                    </span>
                    <h2 className="text-2xl font-extrabold mt-2 mb-4" style={{ color: '#1B4F72' }}>
                      Cooperative Management. Built Right.
                    </h2>
                    <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                      RelianceCoop Manager is a purpose-built desktop management system for cooperative societies that need accuracy, structure, and full control of their financial records. It replaces disconnected paper ledgers, manual calculations, and scattered files with one integrated platform that manages every member, every naira, and every transaction.
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { stat: '14',    label: 'Report Types' },
                        { stat: '1,000+', label: 'Members Supported' },
                        { stat: '100%',  label: 'Configurable' },
                      ].map(item => (
                        <div key={item.label} className="section-gray rounded-xl p-4 text-center border border-gray-100">
                          <p className="text-xl font-extrabold mb-1" style={{ color: '#27AE60' }}>{item.stat}</p>
                          <p className="text-xs text-slate-500">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://apkbhpywfyoyfqebnnvj.supabase.co/storage/v1/object/public/downloads/Coop-Reliance-Manager-T1.xlsb"
                        className="btn-green text-sm py-2.5 px-5 inline-flex"
                      >
                        <IconDownload className="w-4 h-4" /> Download Demo
                      </a>
                      <a
                        href="https://apkbhpywfyoyfqebnnvj.supabase.co/storage/v1/object/public/downloads/RelianceCoop-User-Manual-v2.pdf"
                        className="btn-navy text-sm py-2.5 px-5 inline-flex"
                      >
                        <IconDownload className="w-4 h-4" /> User Manual
                      </a>
                      <a
                        href="mailto:hello@digitglance.com?subject=Full Version Request - RelianceCoop Manager&body=Name:%0AOrganisation:%0APhone:%0A%0AI would like to purchase the full version of RelianceCoop Manager."
                        className="btn-green-outline text-sm py-2.5 px-5 inline-flex"
                      >
                        Get Full Version
                      </a>
                    </div>
                  </div>

                  {/* Right: screenshots + features */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Image src="/images/reliancecoop-dashboard1.png" alt="RelianceCoop Manager Dashboard" width={300} height={200} className="rounded-xl border border-gray-100 shadow-sm w-full object-cover" />
                      <Image src="/images/reliancecoop-dashboard2.png" alt="RelianceCoop Manager Reports"   width={300} height={200} className="rounded-xl border border-gray-100 shadow-sm w-full object-cover" />
                    </div>
                    <h4 className="font-extrabold text-sm mb-4" style={{ color: '#1B4F72' }}>Key Features</h4>
                    <div className="space-y-3">
                      {[
                        { title: 'Member Management',           desc: 'Register and manage every member with photographs, ID cards, contact details, and financial profiles.' },
                        { title: 'Contribution Tracking',       desc: 'Record weekly savings, shares, and building fund payments with automatic percentage-based splitting.' },
                        { title: 'Loan Administration',         desc: 'Create and manage loans with structured repayment tracking, overdue interest calculation, and a visual payment calendar.' },
                        { title: 'Development Levy Automation', desc: 'One action calculates and posts the weekly development levy for every active member simultaneously.' },
                        { title: '14 Financial Report Types',   desc: 'Generate cash flow, trial balance, member statements, income and expenditure, and loan movement reports.' },
                        { title: 'WhatsApp Communication',      desc: 'Send personalised contribution statements to every member through WhatsApp directly from the software.' },
                        { title: 'Role-Based Access Control',   desc: 'Assign Admin or Audit roles with defined permissions. Every transaction is timestamped and linked to a user.' },
                      ].map(feat => (
                        <div key={feat.title} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#eafaf1', border: '1px solid #a9dfbf' }}>
                            <IconCheck className="w-3 h-3 text-[#27AE60]" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: '#1B4F72' }}>{feat.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-10 pt-8">
                  <p className="text-sm font-semibold text-slate-600 mb-3">Who it is built for</p>
                  <div className="flex flex-wrap gap-2">
                    {['Cooperative Societies', 'Staff Cooperatives', 'Market Cooperatives', 'Community Savings Groups', 'Thrift and Credit Unions'].map(tag => (
                      <span key={tag} className="badge-navy text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SCHOOL FEE TRACK PRO ─────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="card rounded-3xl overflow-hidden">
              {/* Product header bar */}
              <div className="flex items-center justify-between px-8 py-4" style={{ background: '#0f2e45' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <IconTable className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-extrabold">School Fee Track Pro</span>
                </div>
                <span className="badge-green text-xs">Available Now</span>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left: description */}
                  <div>
                    <span className="badge-green mb-4 inline-flex">
                      <span className="green-marker" />
                      School Fees &amp; Admissions System
                    </span>
                    <h2 className="text-2xl font-extrabold mt-2 mb-4" style={{ color: '#1B4F72' }}>
                      Stop Chasing Payments.<br />Stop Losing Records.
                    </h2>
                    <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                      School Fee Track Pro is a complete fees and admissions management system built specifically for Nigerian private schools. It puts every student, invoice, payment, and parent message in one place. Runs inside Microsoft Excel, requires no subscription, and works fully offline.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { stat: 'One-Day', label: 'Setup and Training' },
                        { stat: 'No Fee',  label: 'Monthly Subscription' },
                        { stat: '100%',    label: 'Offline Capable' },
                        { stat: '90 Days', label: 'Post-Purchase Support' },
                      ].map(item => (
                        <div key={item.label} className="section-gray rounded-xl p-4 text-center border border-gray-100">
                          <p className="text-base font-extrabold mb-1" style={{ color: '#1B4F72' }}>{item.stat}</p>
                          <p className="text-xs text-slate-500">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://apkbhpywfyoyfqebnnvj.supabase.co/storage/v1/object/public/downloads/SCHOOL-FEE-TRACK-PRO-T1.xlsm"
                        className="btn-green text-sm py-2.5 px-5 inline-flex"
                      >
                        <IconDownload className="w-4 h-4" /> Download Demo
                      </a>
                      <a
                        href="https://apkbhpywfyoyfqebnnvj.supabase.co/storage/v1/object/public/downloads/School-Fee-Track-Pro-User-Manual.pdf"
                        className="btn-navy text-sm py-2.5 px-5 inline-flex"
                      >
                        <IconDownload className="w-4 h-4" /> User Manual
                      </a>
                      <a
                        href="mailto:hello@digitglance.com?subject=Full Version Request - School Fee Track Pro&body=Name:%0ASchool Name:%0APhone:%0ANumber of Students:%0A%0AI would like to purchase the full version of School Fee Track Pro."
                        className="btn-green-outline text-sm py-2.5 px-5 inline-flex"
                      >
                        Get Full Version
                      </a>
                    </div>
                  </div>

                  {/* Right: screenshots + features */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Image src="/images/SchoolFeeTrackPro-Dashboard1.png" alt="School Fee Track Pro Dashboard" width={300} height={200} className="rounded-xl border border-gray-100 shadow-sm w-full object-cover" />
                      <Image src="/images/SchoolFeeTrackPro-Dashboard2.png" alt="School Fee Track Pro Reports"   width={300} height={200} className="rounded-xl border border-gray-100 shadow-sm w-full object-cover" />
                    </div>
                    <h4 className="font-extrabold text-sm mb-4" style={{ color: '#1B4F72' }}>Key Features</h4>
                    <div className="space-y-3">
                      {[
                        { title: 'Full Student Database',        desc: 'Every student\'s admission details, parent contacts, class, and status in one searchable record.' },
                        { title: 'Instant ID Card Generation',   desc: 'Print a professional student ID card with photo, school branding, and student details in seconds.' },
                        { title: 'Professional Fee Invoices',    desc: 'Create itemised invoices for school fees, books, transport, feeding, and more. Set due dates and track payment automatically.' },
                        { title: 'Payment Tracking & Receipts',  desc: 'Record every payment, generate a receipt, and watch the invoice balance update in real time.' },
                        { title: 'Direct WhatsApp Messaging',    desc: 'Send invoices, receipts, and statements directly to parents via WhatsApp with one click.' },
                        { title: 'Automated Payment Reminders',  desc: 'Set a day and time. The system automatically sends payment reminders to every parent with an outstanding balance.' },
                        { title: 'Management Reports',           desc: 'See total invoiced, collected, and outstanding by class and by date range. Clear financial picture for management.' },
                      ].map(feat => (
                        <div key={feat.title} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#e8f4fd', border: '1px solid #aed6f1' }}>
                            <IconCheck className="w-3 h-3 text-[#1B4F72]" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: '#1B4F72' }}>{feat.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-10 pt-8">
                  <p className="text-sm font-semibold text-slate-600 mb-3">Who it is built for</p>
                  <div className="flex flex-wrap gap-2">
                    {['Private Nursery Schools', 'Private Primary Schools', 'Private Secondary Schools', 'New Schools Setting Up Systems', 'Schools Upgrading from Paper Records'].map(tag => (
                      <span key={tag} className="badge-navy text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OPENING GUIDE ────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="card rounded-3xl p-8 sm:p-10 border-l-4" style={{ borderLeftColor: '#d97706' }}>
              <h3 className="font-extrabold text-lg mb-2" style={{ color: '#1B4F72' }}>How to Open Your Downloaded Application</h3>
              <p className="text-slate-500 text-sm mb-8">Excel VBA applications require macros to be enabled. Follow these steps after downloading.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {openSteps.map(item => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-extrabold" style={{ background: '#27AE60' }}>
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1B4F72' }}>{item.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CUSTOM SOLUTIONS ─────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12">
            <span className="badge-navy mb-4 inline-flex">Custom Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3" style={{ color: '#1B4F72' }}>
              Need a Custom Solution?
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              If our current applications do not fit your specific workflow, we build custom Excel VBA systems from scratch for any business type.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {customSolutions.map((sol, i) => (
              <ScrollReveal key={sol.title} delay={i * 70}>
                <div className="card-feature h-full">
                  <div className="w-8 h-1 rounded-full mb-4" style={{ background: '#27AE60' }} />
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{sol.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{sol.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD PROCESS ────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-12 text-center">
            <span className="badge-green mb-4 inline-flex">
              <span className="green-marker" />
              How We Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2" style={{ color: '#1B4F72' }}>
              How We Build Your Custom Solution
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildProcess.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 80}>
                <div className="card rounded-2xl p-6 text-center h-full">
                  <span className="text-4xl font-extrabold mb-4 block" style={{ color: '#eafaf1', WebkitTextStroke: '1px #a9dfbf' }}>
                    {step.step}
                  </span>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#1B4F72' }}>{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-navy px-5 sm:px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              Ready to automate your business processes?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Download one of our ready-made applications or commission a custom tool built around your exact workflow and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-green text-base px-8 py-4 inline-flex">
                Commission a Custom Tool <IconArrow className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/2348162357628?text=Hello%20DigitGlance%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 transition-colors text-sm font-semibold"
      >
        <IconWhatsApp className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </main>
  )
}
