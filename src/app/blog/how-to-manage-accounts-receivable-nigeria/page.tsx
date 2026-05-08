import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'How to Manage Accounts Receivable and Reduce Late Payments in Nigeria | DigitGlance',
  description: 'Late payments are one of the biggest cash flow problems for Nigerian SMEs. This guide shows you how to track what customers owe and collect it faster.',
}

export default function Article3() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      <section className="bg-slate-900 text-white px-6 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <a href="/blog" className="text-teal-400 text-sm font-medium hover:text-teal-300 mb-4 inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Blog
              </a>
              <div className="mt-3 mb-4">
                <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full">Accounting for SMEs</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                How to Manage Accounts Receivable and Reduce Late Payments in Nigeria
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-slate-400 text-sm">
                <span>April 28, 2026</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>7 min read</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>DigitGlance Editorial</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Receivables Aging</p>
                  <span className="text-xs text-slate-400">Total: ₦2,100,000</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Current (0–30 days)', amount: '₦1,200,000', pct: 57, color: 'bg-teal-500' },
                    { label: '31–60 days overdue', amount: '₦580,000', pct: 28, color: 'bg-amber-500' },
                    { label: '61–90 days overdue', amount: '₦240,000', pct: 11, color: 'bg-orange-500' },
                    { label: '90+ days overdue', amount: '₦80,000', pct: 4, color: 'bg-red-500' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">{row.label}</span>
                        <span className="text-white font-medium">{row.amount}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-3">
                  <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg px-3 py-2 text-center">
                    <p className="text-teal-400 font-bold">60 days</p>
                    <p className="text-xs text-slate-400 mt-0.5">Avg collection lag</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 text-center">
                    <p className="text-orange-400 font-bold">₦320,000</p>
                    <p className="text-xs text-slate-400 mt-0.5">Overdue 30+ days</p>
                  </div>
                </div>
              </div>
            </div>
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

      <SiteFooter />
    </main>
  )
}
