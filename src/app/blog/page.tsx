export default function Blog() {
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
            <a href="/blog" className="text-teal-600">Blog</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">Blog and Articles</p>
          <h1 className="text-4xl font-bold mb-4">Practical Accounting and Tax Knowledge</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Practical articles on accounting, tax compliance, Excel automation, and financial management for Nigerian businesses, accountants, and students.</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
          {["All Articles", "Tax Practice", "Accounting for SMEs", "Excel and Automation", "Student Resources", "Software and Tech"].map((cat) => (
            <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === "All Articles" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* COMING SOON */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                category: "Tax Practice",
                title: "How to Calculate PAYE Tax in Nigeria: Step by Step for 2024",
                description: "A practical guide to computing PAYE deductions for employees using the current PIRS consolidated relief allowance and tax bands.",
                date: "Coming Soon"
              },
              {
                category: "Tax Practice",
                title: "VAT on Mixed Supplies in Nigeria: What Every Accountant Should Know",
                description: "Understanding how to apply VAT correctly when a transaction includes both taxable and exempt supplies under Nigerian law.",
                date: "Coming Soon"
              },
              {
                category: "Excel and Automation",
                title: "How to Build a Petty Cash System in Excel Without Macros",
                description: "A beginner-friendly guide to creating a functional petty cash tracker using Excel formulas and structured tables.",
                date: "Coming Soon"
              },
              {
                category: "Tax Practice",
                title: "What NRS Expects in Your Annual Tax Return: A Practical Checklist",
                description: "Everything a Nigerian business needs to prepare before filing their company income tax return with NRS.",
                date: "Coming Soon"
              },
              {
                category: "Accounting for SMEs",
                title: "The Difference Between Bookkeeping and Accounting for Nigerian SMEs",
                description: "A clear explanation of what bookkeepers do versus what accountants do, and why Nigerian small businesses need both.",
                date: "Coming Soon"
              },
              {
                category: "Student Resources",
                title: "ICAN Exam Preparation: How to Approach Financial Reporting Questions",
                description: "Practical tips for ICAN students on how to structure answers for financial reporting and analysis questions in professional exams.",
                date: "Coming Soon"
              }
            ].map((article) => (
              <div key={article.title} className="border border-gray-100 rounded-xl overflow-hidden hover:border-teal-200 hover:shadow-sm transition-all">
                <div className="bg-slate-50 px-6 py-4">
                  <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">{article.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3 leading-snug">{article.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{article.description}</p>
                  <span className="text-xs text-slate-400 font-medium">{article.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Articles are coming soon</h2>
            <p className="text-slate-500 mb-6 max-w-lg mx-auto">We are currently writing practical accounting and tax articles focused on Nigerian practice. Check back soon or contact us if you have a specific topic you want us to cover.</p>
            <a href="/contact" className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 inline-block">
              Request a Topic
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