export const metadata = {
  title: 'Why Nigerian SMEs Need Proper Bookkeeping and How to Start Today | DigitGlance',
  description: 'Most small businesses in Nigeria do not keep proper financial records until something goes wrong. Here is why bookkeeping matters and how to start without an accountant.',
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

export default function Article5() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="bg-slate-900 text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="text-teal-400 text-sm font-medium hover:text-teal-300 mb-4 inline-block">← Back to Blog</a>
          <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full mb-4 inline-block">Accounting for SMEs</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight">
            Why Nigerian SMEs Need Proper Bookkeeping and How to Start Today
          </h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span>April 28, 2026</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span>DigitGlance Editorial</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              The majority of small businesses in Nigeria operate without any structured financial records. Revenue goes into personal bank accounts mixed with personal spending. Expenses are untracked. No one knows the actual profit margin. This works until it does not, and when it stops working, it usually ends the business. Proper bookkeeping is not optional for a business that intends to survive and grow.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What Bookkeeping Actually Is</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Bookkeeping is the systematic recording of all financial transactions in your business. Every sale, every purchase, every expense, every payment received and every payment made needs to be recorded. That is it. It is not accounting. It is not tax filing. It is just recording what happened financially, so that you have an accurate picture of your business at any point.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Good bookkeeping answers three questions every business owner needs answered: How much money came in? How much money went out? What is left?
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Most Nigerian SMEs Do Not Keep Proper Records</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The most common reasons are not about laziness. Business owners are genuinely busy. They do not have an accounting background. They assume bookkeeping is complicated or requires expensive software. They mix personal and business finances. They believe they can track everything in their head or through bank statements alone.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Bank statements are not bookkeeping. A bank statement tells you what moved through your account. It does not tell you why, what it was for, or whether it was profitable. A business owner who relies on bank statements for financial decisions is flying blind.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What Happens Without Proper Bookkeeping</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-3 mb-6">
              <li>You cannot tell if your business is profitable or just busy. High revenue with poor margins can mask a loss-making operation.</li>
              <li>You cannot access bank loans or investor funding. Any serious lender or investor will ask for financial statements. Without records, you cannot produce them.</li>
              <li>Tax filing becomes a nightmare. NRS expects you to file based on actual income and expenses. Reconstructing records at year end from memory is painful and inaccurate.</li>
              <li>You cannot identify which products or services make the most money and which drain resources.</li>
              <li>Cash flow crises catch you off guard because you have no visibility into when money is coming in and going out.</li>
              <li>Business disputes with partners or customers have no documentary evidence to resolve them.</li>
            </ul>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-orange-800 mb-2">Real Cost of No Records</p>
              <p className="text-slate-700 text-sm">Many Nigerian businesses that appear profitable are actually running at a loss once all costs are properly accounted for. Owners only discover this when the business runs out of cash and there is nothing to explain where the money went.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Five Records Every Nigerian SME Must Keep</h2>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">1. Sales records</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Every sale must be recorded with the date, the customer, what was sold, the quantity, the amount, and whether it was paid or outstanding. This forms your revenue record and feeds directly into your VAT return.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">2. Purchase records</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Every purchase from a supplier must be recorded with the supplier name, invoice date, what was bought, and the amount. This is your cost of goods and also the basis for your Input VAT claim.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">3. Expense records</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              All business expenses including rent, utilities, salaries, transport, and marketing must be recorded with receipts where possible. These reduce your taxable profit and give you a true picture of your operating costs.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">4. Bank and cash records</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Maintain a record of all money received and paid out through your business bank account and petty cash. Reconcile your records against your bank statement at least monthly.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">5. Inventory records</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              If your business holds physical stock, track what you have, what you buy, and what you sell. Inventory that cannot be accounted for is a loss you are not seeing.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How to Start Today Without an Accountant</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You do not need an accountant to start keeping basic records. You need a system and the discipline to use it consistently. Here is what to do today:
            </p>
            <ol className="list-decimal pl-6 text-slate-600 space-y-3 mb-6">
              <li>Open a dedicated business bank account separate from your personal account. This one change alone eliminates 80 percent of the confusion in most small businesses.</li>
              <li>Start issuing numbered invoices for every sale. An invoice number creates a paper trail you can follow.</li>
              <li>Collect and file all supplier invoices and receipts. Do not throw away payment documents.</li>
              <li>Set aside one hour every week to record the week's transactions. Consistency beats perfection. Even basic records updated weekly are far better than trying to reconstruct three months at once.</li>
              <li>Use invoicing software that automatically tracks sales, payments, and expenses so the recording happens as part of running the business, not as an extra task on top of it.</li>
            </ol>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-teal-800 mb-2">The One Rule</p>
              <p className="text-slate-700 text-sm">Never mix personal and business money. Every ₦1 that enters your business account should be a business transaction. Every personal expense should come from your personal account. This single discipline makes bookkeeping straightforward and your financial records meaningful.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">When to Bring in a Professional Accountant</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Bookkeeping is something you can manage yourself, especially in the early stages. But as your business grows, there are points where professional help adds real value. Bring in an accountant when you need to file annual tax returns, when you are applying for a loan or seeking investment, when your turnover crosses ₦25 million and VAT registration becomes mandatory, or when you want financial statements prepared for decision making.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              A good accountant working with clean, well-maintained books costs far less and delivers far more value than one who has to reconstruct records from scratch every year end.
            </p>

            <div className="bg-teal-600 text-white rounded-2xl p-8 my-10 text-center">
              <h3 className="text-xl font-bold mb-3">Start your bookkeeping the right way</h3>
              <p className="text-teal-100 mb-6 text-sm">DigitGlance tracks your sales, expenses, and payments automatically as you run your business. No accounting knowledge needed. Start free today.</p>
              <a href="/app/register" className="bg-white text-teal-600 font-bold px-8 py-3 rounded-xl hover:bg-teal-50 inline-block">Start Free</a>
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
