export default function Learn() {
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
            <a href="/solutions" className="hover:text-teal-600">Solutions</a>
            <a href="/learn" className="text-teal-600">Learn</a>
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
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">DigitGlance Assist</p>
          <h1 className="text-4xl font-bold mb-4">Ask Any Accounting or Tax Question</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Get practical, Nigeria-focused answers to accounting and tax questions. Powered by AI and trained on Nigerian standards, FIRS regulations, ICAN guidelines, and LIRS practice.</p>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">Who DigitGlance Assist Is For</h2>
          <p className="text-slate-500 text-center mb-12">Whether you are studying for your ICAN exams or running a business, Assist gives you accurate answers fast.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "ICAN Students", description: "Get clear explanations of accounting standards, tax principles, and exam-focused answers." },
              { title: "University Students", description: "Understand financial accounting, management accounting, and taxation concepts with worked examples." },
              { title: "Business Owners", description: "Ask practical questions about VAT, PAYE, business expenses, and your tax obligations." },
              { title: "Finance Teams", description: "Get quick answers on IFRS treatment, tax computations, and Nigerian regulatory requirements." }
            ].map((item) => (
              <div key={item.title} className="border border-gray-100 rounded-xl p-6 text-center hover:border-teal-200 transition-all">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE QUESTIONS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">What You Can Ask</h2>
          <p className="text-slate-500 mb-10">Here are examples of questions DigitGlance Assist can answer.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "How do I calculate VAT on a mixed supply in Nigeria?",
              "What are the current PAYE tax bands for Lagos State?",
              "How should I account for prepaid expenses under IFRS?",
              "What is the difference between tax avoidance and tax evasion?",
              "How do I compute capital allowances for a manufacturing company?",
              "What documents does FIRS require for a VAT audit?",
              "How do I treat foreign exchange gains in financial statements?",
              "What is the thin capitalization rule under Nigerian tax law?",
              "How do I prepare a bank reconciliation statement?",
              "What are the penalties for late filing of company income tax?"
            ].map((question) => (
              <div key={question} className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-start gap-3 hover:border-teal-200 transition-all">
                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON CHAT */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <p className="text-white text-sm font-medium">DigitGlance Assist</p>
              <span className="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">Coming Soon</span>
            </div>
            <div className="bg-slate-50 p-8 min-h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">DigitGlance Assist is being built</h3>
                <p className="text-slate-500 text-sm max-w-sm">The AI assistant is currently in development. It will be available soon with full support for Nigerian accounting and tax questions.</p>
              </div>
            </div>
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
              <input disabled placeholder="Ask an accounting or tax question..." className="flex-1 bg-slate-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-slate-400 cursor-not-allowed" />
              <button disabled className="bg-slate-200 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">Send</button>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-100 rounded-xl p-5">
          <p className="text-amber-800 text-sm leading-relaxed">DigitGlance Assist provides general accounting and tax guidance for educational purposes. It does not replace professional advice. For specific tax matters, regulatory filings, or legal questions, always consult a qualified accountant or tax adviser.</p>
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