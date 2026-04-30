export const metadata = {
  title: 'Income Tax vs Company Income Tax in Nigeria: What Every Business Owner Must Know | DigitGlance',
  description: 'Personal income tax and company income tax are two different obligations in Nigeria. Understanding which applies to your business can save you from penalties.',
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-slate-900">Digit<span className="text-teal-600">Glance</span></a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="/services" className="hover:text-teal-600">Services</a>
          <a href="/products" className="hover:text-teal-600">Products</a>
          <a href="/solutions" className="hover:text-teal-600">Solutions</a>
          <a href="/learn" className="hover:text-teal-600">Learn</a>
          <a href="/blog" className="text-teal-600">Blog</a>
          <a href="/app/login" className="hover:text-teal-600">Sign In</a>
        </div>
        <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">Book a Consultation</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">Digit<span className="text-teal-400">Glance</span></p>
          <p className="text-sm max-w-xs">Accounting intelligence and software solutions for Nigerian businesses and beyond.</p>
        </div>
        <div className="flex gap-12 text-sm">
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
  )
}

export default function Article4() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="bg-slate-900 text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="text-teal-400 text-sm font-medium hover:text-teal-300 mb-4 inline-block">← Back to Blog</a>
          <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full mb-4 inline-block">Tax Practice</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight">
            Income Tax vs Company Income Tax in Nigeria: What Every Business Owner Must Know
          </h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span>April 28, 2026</span>
            <span>•</span>
            <span>7 min read</span>
            <span>•</span>
            <span>DigitGlance Editorial</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              One of the most common points of confusion among Nigerian entrepreneurs is whether their business pays personal income tax or company income tax. The answer depends entirely on how your business is structured, and getting it wrong can lead to double taxation, penalties, or missed filing obligations. This article explains the difference clearly.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Personal Income Tax in Nigeria</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Personal income tax, governed by the Personal Income Tax Act (PITA), applies to individuals. This includes sole traders, freelancers, and self-employed persons who run their businesses in their own name without incorporating a separate legal entity.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you run a business as a sole proprietorship under your own name or a business name registered at CAC but not as a limited company, your business income is treated as your personal income. You pay tax on a graduated scale based on total income after allowable deductions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Personal income tax in Nigeria is administered by the State Internal Revenue Services (SIRS) in the state where you reside or where your business is located. You file an annual return and make monthly PAYE deductions if you have employees.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Annual Taxable Income</th>
                    <th className="text-right px-4 py-3 font-semibold">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3 text-slate-600">First ₦300,000</td><td className="px-4 py-3 text-right text-slate-600">7%</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600">Next ₦300,000</td><td className="px-4 py-3 text-right text-slate-600">11%</td></tr>
                  <tr><td className="px-4 py-3 text-slate-600">Next ₦500,000</td><td className="px-4 py-3 text-right text-slate-600">15%</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600">Next ₦500,000</td><td className="px-4 py-3 text-right text-slate-600">19%</td></tr>
                  <tr><td className="px-4 py-3 text-slate-600">Next ₦1,600,000</td><td className="px-4 py-3 text-right text-slate-600">21%</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600">Above ₦3,200,000</td><td className="px-4 py-3 text-right text-slate-600">24%</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-500 text-sm mt-2 mb-8">Note: A Consolidated Relief Allowance of ₦200,000 plus 20 percent of gross income is deducted before applying these rates.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Company Income Tax in Nigeria</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Company Income Tax, governed by the Companies Income Tax Act (CITA), applies to limited liability companies incorporated under the Companies and Allied Matters Act (CAMA). When you register a limited company at CAC, that company becomes a separate legal entity from you as an individual, and it pays tax on its own profits.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Company income tax in Nigeria is administered by the Federal Inland Revenue Service (FIRS), which is now rebranded as NRS. You file an annual CIT return within six months of your company's financial year end.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Company Size</th>
                    <th className="text-left px-4 py-3 font-semibold">Annual Turnover</th>
                    <th className="text-right px-4 py-3 font-semibold">CIT Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3 text-slate-600">Small company</td><td className="px-4 py-3 text-slate-600">Below ₦25 million</td><td className="px-4 py-3 text-right text-green-600 font-semibold">0%</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600">Medium company</td><td className="px-4 py-3 text-slate-600">₦25 million to ₦100 million</td><td className="px-4 py-3 text-right text-orange-600 font-semibold">20%</td></tr>
                  <tr><td className="px-4 py-3 text-slate-600">Large company</td><td className="px-4 py-3 text-slate-600">Above ₦100 million</td><td className="px-4 py-3 text-right text-red-600 font-semibold">30%</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-teal-800 mb-2">Good News for Small Companies</p>
              <p className="text-slate-700 text-sm">As of the Finance Act 2019, companies with annual turnover below ₦25 million pay zero company income tax. This was introduced to encourage small business formalisation. You still need to file returns even if your tax liability is zero.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Differences Side by Side</h2>

            <div className="overflow-x-auto my-6">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-600 font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-semibold">Personal Income Tax</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-semibold">Company Income Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3 font-medium text-slate-700">Who pays</td><td className="px-4 py-3 text-slate-600">Individuals and sole traders</td><td className="px-4 py-3 text-slate-600">Incorporated companies</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700">Governing law</td><td className="px-4 py-3 text-slate-600">PITA</td><td className="px-4 py-3 text-slate-600">CITA</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-slate-700">Administered by</td><td className="px-4 py-3 text-slate-600">State Internal Revenue Service</td><td className="px-4 py-3 text-slate-600">NRS (formerly FIRS)</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700">Tax base</td><td className="px-4 py-3 text-slate-600">Total personal income</td><td className="px-4 py-3 text-slate-600">Company taxable profit</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-slate-700">Filing deadline</td><td className="px-4 py-3 text-slate-600">March 31 annually</td><td className="px-4 py-3 text-slate-600">6 months after year end</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Which Applies to You?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you registered a business name at CAC but did not incorporate a limited company, you pay personal income tax to your state revenue service. If you incorporated a limited liability company, the company pays company income tax to NRS, and you personally pay income tax on any salary or dividends you take from the company.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Many Nigerian entrepreneurs are surprised to learn they have two separate tax obligations once they incorporate: their personal income tax on their salary, and the company's income tax on its profits. This is not double taxation in the legal sense. It is two separate taxpayers, the individual and the company, each paying tax on their respective income.
            </p>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-orange-800 mb-2">Common Mistake</p>
              <p className="text-slate-700 text-sm">Many directors of small Nigerian companies do not file their personal income tax returns because they assume the company's tax covers them. It does not. You are a separate taxpayer from your company and must file personal returns with your state revenue service every year.</p>
            </div>

            <div className="bg-teal-600 text-white rounded-2xl p-8 my-10 text-center">
              <h3 className="text-xl font-bold mb-3">Keep your financial records ready for tax season</h3>
              <p className="text-teal-100 mb-6 text-sm">DigitGlance tracks your income, expenses, and VAT throughout the year so you always have the numbers you need when it is time to file.</p>
              <a href="/app/register" className="bg-white text-teal-600 font-bold px-8 py-3 rounded-xl hover:bg-teal-50 inline-block">Start Free</a>
            </div>

          </div>

          <div className="border-t border-slate-100 mt-16 pt-10">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">More Articles</p>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="/blog/how-to-calculate-vat-in-nigeria" className="border border-slate-100 rounded-xl p-5 hover:border-teal-200 transition-colors">
                <span className="text-xs text-teal-600 font-medium">Tax Practice</span>
                <p className="font-semibold text-slate-900 mt-2 leading-snug">How to Calculate and File VAT in Nigeria for Small Businesses</p>
              </a>
              <a href="/blog/why-nigerian-smes-need-bookkeeping" className="border border-slate-100 rounded-xl p-5 hover:border-teal-200 transition-colors">
                <span className="text-xs text-teal-600 font-medium">Accounting for SMEs</span>
                <p className="font-semibold text-slate-900 mt-2 leading-snug">Why Nigerian SMEs Need Proper Bookkeeping and How to Start Today</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
