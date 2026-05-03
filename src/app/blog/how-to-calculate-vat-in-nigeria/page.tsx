export const metadata = {
  title: 'How to Calculate and File VAT in Nigeria for Small Businesses | DigitGlance',
  description: 'A practical step-by-step guide to computing Output VAT, Input VAT, and your net VAT payable to NRS every month.',
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

export default function Article1() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="bg-slate-900 text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="text-teal-400 text-sm font-medium hover:text-teal-300 mb-4 inline-block">← Back to Blog</a>
          <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full mb-4 inline-block">Tax Practice</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight">
            How to Calculate and File VAT in Nigeria for Small Businesses
          </h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span>April 28, 2026</span>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span>DigitGlance Editorial</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Value Added Tax is one of the most misunderstood obligations for Nigerian small businesses. Many business owners either charge it incorrectly, fail to remit it, or do not know they are required to register for it at all. This guide walks you through everything you need to know to calculate VAT correctly and stay on the right side of the Nigeria Revenue Service.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
              {[
                { value: '7.5%', label: 'Current VAT Rate' },
                { value: '₦25M', label: 'Registration Threshold' },
                { value: '21st', label: 'Monthly Filing Deadline' },
                { value: '₦50,000', label: 'First-Month Late Penalty' },
              ].map(s => (
                <div key={s.label} className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-teal-700 mb-1">{s.value}</p>
                  <p className="text-xs text-slate-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What is VAT in Nigeria?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              VAT is a consumption tax charged on the supply of goods and services in Nigeria. The current rate is 7.5 percent, introduced by the Finance Act 2019 which raised it from the previous rate of 5 percent. It is collected by businesses on behalf of the government and remitted to NRS every month.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              VAT is not a cost to your business. You collect it from your customers when you sell to them (Output VAT), and you recover it from your suppliers when you buy from them (Input VAT). The difference between the two is what you pay to NRS.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Who Must Register for VAT?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Any business with annual taxable turnover above ₦25 million must register for VAT. However, even businesses below this threshold can register voluntarily, which allows them to recover Input VAT on their purchases.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you supply VATable goods or services and your turnover is below ₦25 million, you are treated as a small company and are exempt from charging VAT. But once you cross that threshold, you must register within 6 months.
            </p>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-teal-800 mb-2">Key Threshold</p>
              <p className="text-slate-700 text-sm">Annual taxable turnover above ₦25 million requires mandatory VAT registration with NRS. Register through the TaxPro Max portal at taxpromax.gov.ng.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Output VAT vs Input VAT</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Before calculating what you owe, you need to understand these two terms.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Output VAT is the VAT you charge your customers on your sales. If you sell goods worth ₦100,000, you charge 7.5 percent on top of that, so the customer pays ₦107,500. The ₦7,500 is your Output VAT.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Input VAT is the VAT you pay your suppliers when you buy goods or services for your business. If a supplier charges you ₦50,000 plus VAT, you pay ₦53,750. The ₦3,750 is your Input VAT which you can recover.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How to Calculate Your VAT Payable</h2>
            <p className="text-slate-600 leading-relaxed mb-4">The formula is straightforward:</p>

            <div className="bg-slate-900 text-white rounded-xl p-6 my-6 font-mono text-sm">
              <p className="text-teal-400 mb-2">VAT Payable Formula</p>
              <p>VAT Payable = Output VAT − Input VAT</p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4">Here is a practical example:</p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-600 font-semibold">Description</th>
                    <th className="text-right px-4 py-3 text-slate-600 font-semibold">Amount (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3 text-slate-700">Total sales for the month</td><td className="px-4 py-3 text-right text-slate-700">800,000</td></tr>
                  <tr><td className="px-4 py-3 text-slate-700">Output VAT collected (7.5%)</td><td className="px-4 py-3 text-right text-teal-600 font-medium">60,000</td></tr>
                  <tr><td className="px-4 py-3 text-slate-700">Total purchases for the month</td><td className="px-4 py-3 text-right text-slate-700">400,000</td></tr>
                  <tr><td className="px-4 py-3 text-slate-700">Input VAT paid (7.5%)</td><td className="px-4 py-3 text-right text-blue-600 font-medium">30,000</td></tr>
                  <tr className="bg-slate-50 font-bold"><td className="px-4 py-3 text-slate-900">Net VAT Payable to NRS</td><td className="px-4 py-3 text-right text-orange-600">30,000</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What Goods and Services Are VATable?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Most goods and services are subject to VAT at 7.5 percent. However, the following are exempt from VAT under Nigerian law:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>Basic food items including cereals, fish, flour, fruits, meat, milk, vegetables, and water</li>
              <li>Medical and pharmaceutical products</li>
              <li>Books, newspapers, and educational materials</li>
              <li>Baby products</li>
              <li>Agricultural equipment and products</li>
              <li>Financial services</li>
              <li>Exported goods and services (zero-rated)</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-4">
              If your business sells a mix of exempt and taxable goods, you need to apportion your Input VAT claim accordingly.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How to File VAT Returns with NRS</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              VAT returns are filed monthly. The deadline is the 21st of the following month. So for January sales, you must file and pay by February 21st.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">Here is the step by step process:</p>
            <ol className="list-decimal pl-6 text-slate-600 space-y-3 mb-6">
              <li>Log in to TaxPro Max at taxpromax.gov.ng using your Tax Identification Number and password.</li>
              <li>Click on Returns, then select VAT Return (Form 002).</li>
              <li>Enter your total taxable sales for the period in the Output VAT section.</li>
              <li>Enter your total taxable purchases in the Input VAT section.</li>
              <li>The system calculates the net VAT payable automatically.</li>
              <li>Generate a payment reference number and make payment through any NRS-approved bank or online platform.</li>
              <li>Upload your payment receipt and submit your return.</li>
            </ol>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-orange-800 mb-2">Late Filing Penalty</p>
              <p className="text-slate-700 text-sm">Failure to file VAT returns attracts a penalty of ₦50,000 for the first month of default and ₦25,000 for every subsequent month. Always file even if you have no transactions for the month.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Common VAT Mistakes Nigerian Businesses Make</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-3 mb-6">
              <li>Charging VAT on exempt items such as basic foodstuffs and medications.</li>
              <li>Not keeping valid VAT invoices from suppliers, which means Input VAT cannot be claimed.</li>
              <li>Mixing VAT collected with business revenue and spending it before remitting to NRS.</li>
              <li>Filing returns late and accumulating penalties that add up over months.</li>
              <li>Not registering for VAT after crossing the ₦25 million threshold.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How DigitGlance Makes VAT Tracking Easier</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              DigitGlance Invoice automatically tracks Output VAT from every invoice you create and Input VAT from every purchase invoice you record from suppliers. The VAT Liability report shows you exactly what you owe NRS for any period, with a breakdown of all transactions. You can export the report to CSV and use the figures directly when filing on TaxPro Max.
            </p>

            <div className="bg-teal-600 text-white rounded-2xl p-8 my-10 text-center">
              <h3 className="text-xl font-bold mb-3">Track your VAT automatically</h3>
              <p className="text-teal-100 mb-6 text-sm">DigitGlance Invoice calculates Output VAT, Input VAT, and your net NRS liability automatically. Start free today.</p>
              <a href="/app/register" className="bg-white text-teal-600 font-bold px-8 py-3 rounded-xl hover:bg-teal-50 inline-block">
                Start Free
              </a>
            </div>

          </div>

          <div className="border-t border-slate-100 mt-16 pt-10">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">More Articles</p>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="/blog/invoice-vs-receipt-nigeria" className="border border-slate-100 rounded-xl p-5 hover:border-teal-200 transition-colors">
                <span className="text-xs text-teal-600 font-medium">Accounting for SMEs</span>
                <p className="font-semibold text-slate-900 mt-2 leading-snug">The Difference Between an Invoice and a Receipt in Nigerian Business</p>
              </a>
              <a href="/blog/how-to-manage-accounts-receivable-nigeria" className="border border-slate-100 rounded-xl p-5 hover:border-teal-200 transition-colors">
                <span className="text-xs text-teal-600 font-medium">Accounting for SMEs</span>
                <p className="font-semibold text-slate-900 mt-2 leading-snug">How to Manage Accounts Receivable and Reduce Late Payments in Nigeria</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
