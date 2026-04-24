export default function Solutions() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-slate-900">
            Digit<span className="text-teal-600">Glance</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/services" className="hover:text-teal-600">Services</a>
            <a href="/products" className="hover:text-teal-600">Products</a>
            <a href="/solutions" className="text-teal-600">Solutions</a>
            <a href="/learn" className="hover:text-teal-600">Learn</a>
            <a href="/blog" className="hover:text-teal-600">Blog</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">Desktop Solutions</p>
          <h1 className="text-4xl font-bold mb-4">Professional Desktop Tools Built on Excel</h1>
          <p className="text-slate-300 text-lg max-w-2xl">We build custom Excel VBA systems that automate your business processes, improve reporting accuracy, and eliminate repetitive manual work. No expensive software licenses. No complicated setup.</p>
        </div>
      </section>

      {/* PRODUCT PORTFOLIO */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Desktop Applications</h2>
          <p className="text-slate-500 mb-12">Download and use our ready-made Excel VBA applications, or commission a custom tool built around your specific workflow.</p>

          {/* RELIANCECOOP MANAGER */}
          <div className="border border-teal-200 rounded-2xl overflow-hidden mb-12">
            <div className="bg-teal-600 px-8 py-4 flex items-center justify-between">
              <span className="text-white font-semibold">RelianceCoop Manager</span>
              <span className="bg-white text-teal-600 text-xs font-bold px-3 py-1 rounded-full">Available Now</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-teal-600 text-sm font-medium mb-3 uppercase tracking-wide">Cooperative Management System</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Cooperative Management. Built Right.</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">RelianceCoop Manager is a purpose-built desktop management system for cooperative societies that need accuracy, structure, and full control of their financial records. It replaces disconnected paper ledgers, manual calculations, and scattered files with one integrated platform that manages every member, every naira, and every transaction in one place.</p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { stat: "14", label: "Report Types" },
                      { stat: "1,000+", label: "Members Supported" },
                      { stat: "100%", label: "Configurable" }
                    ].map((item) => (
                      <div key={item.label} className="bg-teal-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-teal-600">{item.stat}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>

                 <div className="flex flex-wrap gap-3">
  <a href="https://zdmtnddlsmbrprxxchcp.supabase.co/storage/v1/object/public/downloads/Coop-Reliance-Manager-T1.xlsb" className="bg-teal-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
    Download Demo
  </a>
  <a href="https://zdmtnddlsmbrprxxchcp.supabase.co/storage/v1/object/public/downloads/RelianceCoop-User-Manual-v2.pdf" className="border border-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
    Download User Manual
  </a>
  <a href="mailto:hello@digitglance.com?subject=Full Version Request - RelianceCoop Manager&amp;body=Name:%0AOrganisation:%0APhone:%0A%0AI would like to purchase the full version of RelianceCoop Manager." className="border border-teal-600 text-teal-600 font-medium px-5 py-2.5 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-2">
    Get Full Version
  </a>
</div>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-6">
  <img
    src="/images/reliancecoop-dashboard1.png"
    alt="RelianceCoop Manager Dashboard"
    className="rounded-lg border border-slate-200 shadow-sm w-full object-cover"
  />
  <img
    src="/images/reliancecoop-dashboard2.png"
    alt="RelianceCoop Manager Reports"
    className="rounded-lg border border-slate-200 shadow-sm w-full object-cover"
  />
</div>
                  <h4 className="font-bold text-slate-900 mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {[
                      { title: "Member Management", desc: "Register and manage every member with photographs, ID cards, contact details, and financial profiles in one controlled environment." },
                      { title: "Contribution Tracking", desc: "Record weekly savings, shares, and building fund payments with automatic percentage-based splitting and full history access." },
                      { title: "Loan Administration", desc: "Create and manage loans with structured repayment tracking, overdue interest calculation, and a visual payment calendar." },
                      { title: "Development Levy Automation", desc: "One action calculates and posts the weekly development levy for every active member simultaneously." },
                      { title: "14 Financial Report Types", desc: "Generate cash flow, trial balance, member statements, income and expenditure, and loan movement reports exportable to PDF." },
                      { title: "WhatsApp Communication", desc: "Send personalised contribution statements to every member through WhatsApp directly from the software." },
                      { title: "Role-Based Access Control", desc: "Assign Admin or Audit roles with defined permissions. Every transaction is timestamped and linked to a user account." }
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{feature.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-10 pt-8">
                <p className="text-sm font-medium text-slate-700 mb-3">Who it is built for</p>
                <div className="flex flex-wrap gap-2">
                  {["Cooperative Societies", "Staff Cooperatives", "Market Cooperatives", "Community Savings Groups", "Thrift and Credit Unions"].map((tag) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SCHOOL FEE TRACK PRO */}
          <div className="border border-teal-200 rounded-2xl overflow-hidden mb-12">
            <div className="bg-slate-800 px-8 py-4 flex items-center justify-between">
              <span className="text-white font-semibold">School Fee Track Pro</span>
              <span className="bg-teal-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">Available Now</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-teal-600 text-sm font-medium mb-3 uppercase tracking-wide">School Fees and Admissions System</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Stop Chasing Payments. Stop Losing Records.</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">School Fee Track Pro is a complete fees and admissions management system built specifically for Nigerian private schools. It puts every student, invoice, payment, and parent message in one place and keeps your school running with confidence. It runs inside Microsoft Excel, requires no subscription, and works fully offline.</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { stat: "One-Day", label: "Setup and Training" },
                      { stat: "No Fee", label: "Monthly Subscription" },
                      { stat: "100%", label: "Offline Capable" },
                      { stat: "90 Days", label: "Post-Purchase Support" }
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-lg font-bold text-slate-800">{item.stat}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>

                 <div className="flex flex-wrap gap-3">
                <a href="https://zdmtnddlsmbrprxxchcp.supabase.co/storage/v1/object/public/downloads/SCHOOL-FEE-TRACK-PRO-T1.xlsm" className="bg-teal-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
                Download Demo
               </a>
              <a href="https://zdmtnddlsmbrprxxchcp.supabase.co/storage/v1/object/public/downloads/School-Fee-Track-Pro-User-Manual.pdf" className="border border-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
               Download User Manual
            </a>
            <a href="mailto:hello@digitglance.com?subject=Full Version Request - School Fee Track Pro&amp;body=Name:%0ASchool Name:%0APhone:%0ANumber of Students:%0A%0AI would like to purchase the full version of School Fee Track Pro." className="border border-teal-600 text-teal-600 font-medium px-5 py-2.5 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-2">
              Get Full Version
             </a>
             </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-6">
  <img
    src="/images/SchoolFeeTrackPro-Dashboard1.png"
    alt="School Fee Track Pro Dashboard"
    className="rounded-lg border border-slate-200 shadow-sm w-full object-cover"
  />
  <img
    src="/images/SchoolFeeTrackPro-Dashboard2.png"
    alt="School Fee Track Pro Reports"
    className="rounded-lg border border-slate-200 shadow-sm w-full object-cover"
  />
</div>
                  <h4 className="font-bold text-slate-900 mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {[
                      { title: "Full Student Database", desc: "Every student's admission details, parent contacts, class, and status in one searchable record. Find any student in under 3 seconds." },
                      { title: "Instant ID Card Generation", desc: "Print a professional student ID card with photo, school branding, and student details in seconds. No external printing service needed." },
                      { title: "Professional Fee Invoices", desc: "Create itemised invoices for school fees, books, transport, feeding, and more. Set due dates and the system tracks payment automatically." },
                      { title: "Payment Tracking and Receipts", desc: "Record every payment, generate a receipt, and watch the invoice balance update in real time. Part payments are tracked correctly." },
                      { title: "Direct WhatsApp Messaging", desc: "Send invoices, receipts, and statements directly to parents via WhatsApp with one click. No typing, no copying, no delay." },
                      { title: "Automated Payment Reminders", desc: "Set a day and time. The system automatically sends payment reminders to every parent with an outstanding balance." },
                      { title: "Management Reports", desc: "See total invoiced, collected, and outstanding by class and by date range. Clear financial picture for management in seconds." }
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{feature.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-10 pt-8">
                <p className="text-sm font-medium text-slate-700 mb-3">Who it is built for</p>
                <div className="flex flex-wrap gap-2">
                  {["Private Nursery Schools", "Private Primary Schools", "Private Secondary Schools", "New Schools Setting Up Systems", "Schools Upgrading from Paper Records"].map((tag) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DOWNLOAD GUIDE */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
            <h3 className="font-bold text-slate-900 text-lg mb-2">How to Open Your Downloaded Application</h3>
            <p className="text-slate-500 text-sm mb-6">Excel VBA applications require macros to be enabled. Follow these steps after downloading.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { step: "1", title: "Unblock the file first", desc: "Right click the downloaded file, select Properties, tick the Unblock checkbox at the bottom, and click OK. Do this before opening." },
                  { step: "2", title: "Open the file in Excel", desc: "Double click the file to open it. You need Microsoft Excel on Windows. The file will not work on Mac or Google Sheets." },
                  { step: "3", title: "Click Enable Editing", desc: "If a yellow bar appears saying Protected View, click Enable Editing to allow the file to run normally." }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-7 h-7 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">{item.step}</div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { step: "4", title: "Click Enable Content", desc: "A yellow bar will say Macros have been disabled. Click Enable Content. The application will now load fully." },
                  { step: "5", title: "If macros are still blocked", desc: "Open Excel, go to File, then Options, then Trust Center, then Trust Center Settings, then Macro Settings, and select Enable all macros." },
                  { step: "6", title: "Read the user manual", desc: "Download and read the user manual before your first use. It covers every feature step by step and takes about 20 minutes to read." }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-7 h-7 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">{item.step}</div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM SOLUTIONS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Need a Custom Solution?</h2>
          <p className="text-slate-500 mb-12">If our current applications do not fit your specific workflow, we build custom Excel VBA systems from scratch for any business type.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Payroll Management System", description: "Automated payroll computation with PAYE deductions, pension calculations, and payslip generation." },
              { title: "Inventory and Stock Control", description: "Real time stock tracking with purchase orders, goods received notes, and automatic reorder alerts." },
              { title: "Fixed Asset Register", description: "Complete asset management with depreciation computation, disposal tracking, and year end schedules." },
              { title: "Budget and Expense Monitor", description: "Project budget tracking with departmental expense recording, variance analysis, and donor reporting." },
              { title: "Accounts Receivable Tracker", description: "Invoice aging analysis, overdue tracking, and automatic collection letter generation." },
              { title: "Sales and Revenue Tracker", description: "Daily sales recording with customer ledgers, revenue dashboards, and invoice generation." }
            ].map((solution) => (
              <div key={solution.title} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-slate-900 mb-3">{solution.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">How We Build Your Custom Solution</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "We start by understanding your current process, pain points, and reporting needs in detail." },
              { step: "02", title: "Design", description: "We design the system structure, data flow, and output reports before writing a single line of code." },
              { step: "03", title: "Build and Test", description: "We build the system and test it thoroughly with sample data to ensure accuracy and reliability." },
              { step: "04", title: "Training and Handover", description: "We train your team on the system and provide documentation so they can use it confidently." }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">{item.step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to automate your business processes?</h2>
          <p className="text-slate-300 mb-8">Download one of our ready-made applications or commission a custom tool built around your exact workflow and budget.</p>
          <a href="/contact" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block">
            Commission a Custom Tool
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-2">Digit<span className="text-teal-400">Glance</span></p>
            <p className="text-sm max-w-xs">Accounting intelligence and software solutions for Nigerian businesses and beyond.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-white font-medium mb-3">Services</p>
              <div className="space-y-2">
                <a href="/services" className="block hover:text-teal-400">Accounting</a>
                <a href="/services" className="block hover:text-teal-400">Tax Advisory</a>
                <a href="/solutions" className="block hover:text-teal-400">Excel VBA Tools</a>
              </div>
            </div>
            <div>
              <p className="text-white font-medium mb-3">Company</p>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-teal-400">About</a>
                <a href="/blog" className="block hover:text-teal-400">Blog</a>
                <a href="/contact" className="block hover:text-teal-400">Contact</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-8 text-xs flex justify-between">
          <p>© 2026 DigitGlance. A trading name of Digitglance Reliance.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-teal-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-teal-400">Terms of Service</a>
          </div>
        </div>
      </footer>

    </main>
  );
}