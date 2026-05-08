import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'The Difference Between an Invoice and a Receipt in Nigerian Business | DigitGlance',
  description: 'Many Nigerian business owners use invoices and receipts interchangeably. Here is what each document means and why the difference matters legally and for tax purposes.',
}

export default function Article2() {
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
                The Difference Between an Invoice and a Receipt in Nigerian Business
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-slate-400 text-sm">
                <span>April 28, 2026</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>6 min read</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>DigitGlance Editorial</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-slate-600 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice</span>
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-semibold">Unpaid</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">INV-0047</span>
                      <span className="text-slate-400">May 1, 2026</span>
                    </div>
                    <div className="border-t border-slate-700 pt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Consulting (5 hrs)</span>
                        <span className="text-slate-300">₦75,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">VAT 7.5%</span>
                        <span className="text-slate-300">₦5,625</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-3 flex justify-between">
                    <span className="text-xs text-slate-400">Due May 15</span>
                    <span className="text-white font-bold text-sm">₦80,625</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-slate-600 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receipt</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">Paid</span>
                  </div>
                  <div className="flex items-center justify-center py-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-center mb-4">
                    <p className="text-slate-300">Payment received</p>
                    <p className="text-slate-400">Ref: INV-0047</p>
                    <p className="text-slate-400">Bank transfer</p>
                  </div>
                  <div className="border-t border-slate-700 pt-3 flex justify-between">
                    <span className="text-xs text-slate-400">May 13, 2026</span>
                    <span className="text-green-400 font-bold text-sm">₦80,625</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">Invoice comes first — receipt confirms payment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Walk into almost any market or small business in Nigeria and ask for an invoice. Chances are you will be handed a receipt, or vice versa. Many business owners treat these two documents as the same thing. They are not, and confusing them can create accounting errors, tax problems, and disputes with customers that are difficult to resolve.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Invoice</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">Request</p>
                <p className="text-sm text-slate-600 leading-relaxed">Issued before or at point of sale. Payment is still owed. Used to track accounts receivable.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Receipt</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">Confirmation</p>
                <p className="text-sm text-slate-600 leading-relaxed">Issued after payment is received. Confirms the transaction is complete. Proof of purchase.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What is an Invoice?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              An invoice is a document you send to a customer before or at the point of payment. It is a request for money. It tells the customer what goods or services were provided, the quantities, the prices, and the total amount they owe you. An invoice does not confirm that payment has been made. It confirms that the sale has occurred and that money is owed.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              An invoice typically includes the seller's name and address, the buyer's name and address, an invoice number, the date of issue, a due date for payment, a description of goods or services, unit prices and quantities, VAT amounts if applicable, and the total payable.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What is a Receipt?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A receipt is a document issued after payment has been made. It is a confirmation of payment, not a request for it. When a customer pays you, you give them a receipt to acknowledge that you have received their money. A receipt is proof of transaction completion.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              A receipt typically includes the seller's name, the date of payment, the amount received, the invoice number it relates to, the payment method used, and a statement confirming payment was received.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold">Invoice</th>
                    <th className="text-left px-4 py-3 font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3 text-slate-600 font-medium">Purpose</td><td className="px-4 py-3 text-slate-600">Request for payment</td><td className="px-4 py-3 text-slate-600">Confirmation of payment</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600 font-medium">When issued</td><td className="px-4 py-3 text-slate-600">Before or at point of sale</td><td className="px-4 py-3 text-slate-600">After payment is received</td></tr>
                  <tr><td className="px-4 py-3 text-slate-600 font-medium">Payment status</td><td className="px-4 py-3 text-slate-600">Payment not yet confirmed</td><td className="px-4 py-3 text-slate-600">Payment confirmed</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600 font-medium">Used for</td><td className="px-4 py-3 text-slate-600">Accounts receivable tracking</td><td className="px-4 py-3 text-slate-600">Proof of purchase</td></tr>
                  <tr><td className="px-4 py-3 text-slate-600 font-medium">VAT claim</td><td className="px-4 py-3 text-slate-600">Valid VAT invoice needed for Input VAT</td><td className="px-4 py-3 text-slate-600">Not valid for VAT recovery</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why the Difference Matters for Tax</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Under Nigerian VAT law, a valid tax invoice is required to claim Input VAT on purchases. A receipt alone is not sufficient. NRS requires that the document used to support an Input VAT claim contains the seller's TIN, the VAT registration number if applicable, a description of goods or services, and the VAT amount separately stated.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you pay a supplier ₦53,750 including ₦3,750 VAT but they give you only a receipt with no invoice, you cannot recover that ₦3,750 as Input VAT. That is money lost to your business every month.
            </p>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 my-8">
              <p className="text-sm font-semibold text-orange-800 mb-2">NRS Requirement</p>
              <p className="text-slate-700 text-sm">Always request a proper tax invoice from suppliers, not just a receipt, if you want to recover Input VAT on your purchases. A receipt without the required invoice details does not qualify.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What a Valid Nigerian Tax Invoice Must Contain</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              For an invoice to be valid for VAT purposes in Nigeria, it must include:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>The word "Invoice" clearly stated at the top</li>
              <li>The seller's full name, address, and TIN</li>
              <li>The buyer's name and address</li>
              <li>A unique invoice number</li>
              <li>The date of issue</li>
              <li>A description of goods or services supplied</li>
              <li>The quantity and unit price of each item</li>
              <li>The subtotal before VAT</li>
              <li>The VAT amount at 7.5 percent stated separately</li>
              <li>The total amount payable including VAT</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Correct Order of Documents in a Sale</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A properly run business follows this document flow for every sale:
            </p>
            <ol className="list-decimal pl-6 text-slate-600 space-y-3 mb-6">
              <li>Customer places an order. You may issue a pro-forma invoice or quotation.</li>
              <li>Goods or services are delivered. You issue a tax invoice at this point.</li>
              <li>Customer pays. You issue a receipt or payment confirmation.</li>
              <li>If a customer disputes a charge, the invoice is your legal document. The receipt confirms what was paid.</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Cost of Getting This Wrong</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Businesses that do not issue proper invoices struggle to track who owes them money, cannot claim Input VAT on purchases, have no legal documentation if customers dispute payments, and find it almost impossible to prepare accurate financial statements or pass an NRS audit.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The fix is straightforward. Use proper invoicing software that generates compliant tax invoices automatically, records payments against each invoice, and issues receipts when payment is received.
            </p>

            <div className="bg-teal-600 text-white rounded-2xl p-8 my-10 text-center">
              <h3 className="text-xl font-bold mb-3">Create professional invoices in seconds</h3>
              <p className="text-teal-100 mb-6 text-sm">DigitGlance generates compliant tax invoices with VAT calculated automatically. Track payments and issue receipts from the same dashboard.</p>
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
              <a href="/blog/how-to-manage-accounts-receivable-nigeria" className="border border-slate-100 rounded-xl p-5 hover:border-teal-200 transition-colors">
                <span className="text-xs text-teal-600 font-medium">Accounting for SMEs</span>
                <p className="font-semibold text-slate-900 mt-2 leading-snug">How to Manage Accounts Receivable and Reduce Late Payments in Nigeria</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
