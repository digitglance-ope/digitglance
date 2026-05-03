export const metadata = {
  title: 'How to Manage Accounts Receivable and Reduce Late Payments in Nigeria | DigitGlance',
  description: 'Late payments are one of the biggest cash flow problems for Nigerian SMEs. This guide shows you how to track what customers owe and collect it faster.',
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

export default function Article3() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="bg-slate-900 text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="text-teal-400 text-sm font-medium hover:text-teal-300 mb-4 inline-block">← Back to Blog</a>
          <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full mb-4 inline-block">Accounting for SMEs</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight">
            How to Manage Accounts Receivable and Reduce Late Payments in Nigeria
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
              A Nigerian business can be profitable on paper and still collapse from cash flow problems. One of the leading causes is poor accounts receivable management. Money owed by customers that sits uncollected for weeks or months is money your business cannot use to pay suppliers, staff, or operational costs. This guide gives you practical steps to take control of what customers owe you.
            </p>

            <div className="grid grid-cols-3 gap-3 my-8">
              {[
                { value: '60 days', label: 'Average collection lag with poor AR management' },
                { value: '30–50%', label: 'Recommended deposit for new or large orders' },
                { value: '2–3 days', label: 'Before due date — send your reminder' },
              ].map(s => (
                <div key={s.label} className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-teal-700 mb-1">{s.value}</p>
                  <p className="text-xs text-slate-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What is Accounts Receivable?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Accounts receivable is the total amount of money owed to your business by customers for goods or services you have already delivered. When you sell on credit, you record the amount as accounts receivable until the customer pays. It sits on your balance sheet as a current asset.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              For most Nigerian SMEs, accounts receivable represents a significant portion of their assets. Managing it well is the difference between a business that grows and one that is always short of cash despite strong sales.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Nigerian Businesses Struggle with Late Payments</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Late payments in Nigeria are common for several reasons. Many businesses do not issue proper invoices with clear due dates. Customers assume payment is flexible when no deadline is stated. Follow-up is done informally through WhatsApp or phone calls that are easy to ignore. There is no system to flag when an invoice becomes overdue. Relationships and culture make business owners reluctant to press for payment firmly.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The result is that money owed to you just sits there while your suppliers and landlord want their payments on time.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How to Set Up a Proper Accounts Receivable System</h2>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">1. Always issue a formal invoice with a due date</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Every sale on credit must have a written invoice with a specific due date. Do not say "pay when you can." State clearly: payment due within 14 days, or payment due by April 30th. A due date creates an obligation. Without it, there is no basis for a late payment conversation.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">2. Track every invoice in one place</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              You need to know at any point in time which invoices are paid, which are outstanding, and which are overdue. Tracking this in your head or across multiple WhatsApp chats is not a system. Use software or at minimum a structured spreadsheet that shows every customer, every invoice, the amount, the due date, and the payment status.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">3. Follow up before the due date</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Send a polite reminder two to three days before an invoice is due. Many late payments happen simply because the customer forgot, not because they do not intend to pay. A timely reminder removes that excuse and keeps your invoice top of mind.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">4. Have a structured follow-up process for overdue invoices</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Once an invoice passes its due date, escalate systematically:
            </p>
            <div className="space-y-3 my-6">
              {[
                { day: 'Day 1', label: 'First Notice', desc: 'Send an email or message noting the invoice is now overdue and requesting payment.', bg: 'bg-amber-50', border: 'border-amber-100', dayColor: 'text-amber-600' },
                { day: 'Day 7', label: 'Direct Call', desc: 'Call the customer directly and confirm a specific date when payment will be made.', bg: 'bg-orange-50', border: 'border-orange-100', dayColor: 'text-orange-600' },
                { day: 'Day 14', label: 'Formal Notice', desc: 'Send a formal written notice and consider pausing further supplies or services.', bg: 'bg-red-50', border: 'border-red-100', dayColor: 'text-red-600' },
                { day: 'Day 30', label: 'Escalate', desc: 'Issue a formal demand letter and consider involving a debt recovery process.', bg: 'bg-red-50', border: 'border-red-200', dayColor: 'text-red-700' },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${step.bg} ${step.border}`}>
                  <div className="flex-shrink-0 text-center w-16">
                    <p className={`text-sm font-bold ${step.dayColor}`}>{step.day}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">{step.label}</p>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-teal-800 mb-2">Key Principle</p>
              <p className="text-slate-700 text-sm">Following up on overdue payments is not rude. It is running a business. A customer who delays payment beyond agreed terms has broken a commercial agreement. You are within your rights to pursue the money firmly and professionally.</p>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">5. Offer multiple payment options</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Some customers delay payment because their preferred payment method is inconvenient. Accept bank transfers to all major Nigerian banks, and consider POS payments for customers who prefer it. The easier you make it to pay, the faster you get paid.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">6. Require deposits for large or new customers</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              For new customers or large orders, request a deposit of 30 to 50 percent before starting work or delivering goods. This reduces your exposure if the customer defaults and signals that the business relationship has real financial commitment on both sides.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How to Read Your Accounts Receivable Report</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A proper accounts receivable report shows you all customers with outstanding balances, the total amount owed by each, and whether any invoices are overdue. It lets you prioritise who to chase first based on the amount owed and how long it has been outstanding.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Focus first on the largest overdue amounts. A customer who owes you ₦500,000 and is 30 days overdue needs more attention than one who owes ₦20,000 and is 5 days overdue.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Cost of Not Managing Accounts Receivable</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A business with ₦2 million in outstanding receivables that takes an average of 60 days to collect has effectively given its customers a free 60-day loan. In a high-inflation environment like Nigeria, money collected 60 days late is worth less in real terms than money collected on time. And if customers start defaulting, that receivable becomes a bad debt that reduces your profit.
            </p>

            <div className="bg-teal-600 text-white rounded-2xl p-8 my-10 text-center">
              <h3 className="text-xl font-bold mb-3">See exactly who owes you money</h3>
              <p className="text-teal-100 mb-6 text-sm">DigitGlance shows your full accounts receivable position with overdue flagging and customer statements. Know who to chase before cash flow becomes a problem.</p>
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
