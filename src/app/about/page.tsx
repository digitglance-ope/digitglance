export default function About() {
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
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">About DigitGlance</p>
          <h1 className="text-4xl font-bold mb-4">Built by an Accountant Who Codes</h1>
          <p className="text-slate-300 text-lg max-w-2xl">DigitGlance exists because accounting software rarely fits how Nigerian businesses actually work. We built the solution ourselves.</p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">

          {/* PHOTO PLACEHOLDER */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-teal-600 rounded-2xl flex items-center justify-center text-5xl font-bold text-white">
              MI
            </div>
          </div>

          {/* BIO */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Mustapha Idris Opeyemi</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Mustapha is a professional accountant based in Nigeria with experience in accounting, audit, tax services, and financial reporting. He works with businesses to manage their books, meet regulatory requirements, and understand their numbers.</p>
              <p>Over time, he noticed that most accounting software available to Nigerian businesses was either too expensive, too generic, or simply not built for how businesses here operate. Tax codes were wrong. Workflows did not match local practice. Support was nonexistent.</p>
              <p>That gap led him to start building his own tools. First Excel VBA systems for clients who needed automation without expensive software. Then web applications. Then DigitGlance, a platform built to bring professional accounting technology to Nigerian businesses at a price and scale that makes sense.</p>
              <p>Today, DigitGlance offers accounting and tax services, custom software development, Excel VBA desktop tools, and an AI-powered accounting assistant focused specifically on Nigerian practice, ICAN standards, FIRS regulations, and LIRS compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">What We Bring to the Table</h2>
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white border border-gray-100 rounded-xl p-8">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Accounting Expertise</h3>
              <ul className="space-y-3">
                {[
                  "Financial reporting and bookkeeping",
                  "Tax advisory and FIRS compliance",
                  "LIRS and state tax practice",
                  "Payroll management",
                  "Audit support and internal controls",
                  "Business consulting",
                  "ICAN standards and IFRS application"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 text-sm">
                    <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-8">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Technical Skills</h3>
              <ul className="space-y-3">
                {[
                  "Web application development",
                  "SaaS product design and deployment",
                  "Excel VBA automation and systems",
                  "Database design with Supabase",
                  "AI integration and prompt engineering",
                  "Next.js and modern web technologies",
                  "Invoice and billing system development"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 text-sm">
                    <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 text-white rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-4">Our Accounting and Tax Partnership</h2>
            <p className="text-slate-300 leading-relaxed max-w-3xl">DigitGlance partners with a reputable accounting and tax firm in Lagos that provides direct support on accounting, tax advisory, and regulatory matters. This includes matters relating to LIRS and FIRS. Our clients benefit from both the technical tools we build and the professional advisory support our partner firm provides.</p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-500 text-lg leading-relaxed">To build accounting technology that actually fits Nigerian business practice. Every tool, service, and product at DigitGlance is designed by someone who understands both the numbers and the regulations behind them.</p>
          <div className="mt-10">
            <a href="/contact" className="bg-teal-600 text-white font-medium px-8 py-4 rounded-lg hover:bg-teal-700 inline-block">
              Work With Us
            </a>
          </div>
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