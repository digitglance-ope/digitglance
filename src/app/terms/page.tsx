import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | DigitGlance',
  description: 'Terms of Service for DigitGlance and DigitGlance Invoice. Read our terms before using our services.',
}

export default function TermsPage() {
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
            <a href="/ai-tools" className="hover:text-teal-600">AI Tools</a>
            <a href="/blog" className="hover:text-teal-600">Blog</a>
          </div>
          <a href="/contact" className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700">
            Book a Consultation
          </a>
        </div>
      </nav>

      {/* HEADER */}
      <section className="bg-slate-900 text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-teal-400 text-sm font-medium mb-3 uppercase tracking-wide">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-slate-300">Last updated: April 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">

          <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 mb-10">
            <p className="text-teal-800 text-sm">
              These Terms of Service govern your use of all services provided by DigitGlance, a trading name of Digitglance Reliance. By accessing or using our services, you agree to be bound by these terms. If you do not agree, do not use our services.
            </p>
          </div>

          {[
            {
              title: '1. About DigitGlance',
              content: `DigitGlance is a trading name of Digitglance Reliance, a CAC-registered business based at 28 Micheal Adekoya Street, Ilupeju, Lagos State, Nigeria. We provide accounting services, web applications, and business software including the DigitGlance Invoice application. References to "we", "us", or "DigitGlance" in these terms refer to Digitglance Reliance.`
            },
            {
              title: '2. Eligibility',
              content: `You must be at least 18 years old to use our services. By registering an account, you confirm that you are 18 or older and have the legal authority to enter into this agreement. If you are registering on behalf of a business, you confirm you have the authority to bind that business to these terms.`
            },
            {
              title: '3. Account Registration',
              content: `To use DigitGlance Invoice, you must create an account with a valid email address and password. You are responsible for maintaining the security of your account credentials. You must not share your login details with anyone outside your authorised team. You are responsible for all activity that occurs under your account. You must notify us immediately at hello@digitglance.com if you suspect unauthorised access to your account.`
            },
            {
              title: '4. Subscription Plans and Payments',
              content: `DigitGlance Invoice is available on three plans: Free, Starter at NGN 5,000 per month, and Pro at NGN 12,000 per month. Plan features and invoice limits are as described on the pricing page and are subject to change with notice. Payments are processed monthly through Paystack. By subscribing, you authorise recurring charges to your payment method. Subscriptions renew automatically each month unless cancelled. We do not offer refunds for partial months. Prices may be updated with 30 days notice to active subscribers.`
            },
            {
              title: '5. Acceptable Use',
              content: `You agree to use DigitGlance Invoice only for lawful business purposes. You must not use our platform to create fraudulent invoices or misrepresent transactions. You must not attempt to access other users' data or reverse engineer our software. You must not use our services in any way that violates Nigerian law or any applicable regulations. We reserve the right to suspend or terminate accounts that violate these terms without notice.`
            },
            {
              title: '6. Your Data',
              content: `You own the data you enter into DigitGlance Invoice, including your invoices, customer records, and financial information. We do not claim ownership of your data. You grant us a limited licence to store and process your data solely for the purpose of providing our services. We will not access your data except where necessary to provide support or resolve technical issues, and only with your consent unless required by law.`
            },
            {
              title: '7. Service Availability',
              content: `We aim to provide reliable, uninterrupted access to DigitGlance Invoice. However, we do not guarantee 100% uptime. We may perform maintenance that temporarily affects availability, and we will provide advance notice where possible. We are not liable for losses arising from service interruptions beyond our control, including hosting provider outages, network failures, or force majeure events.`
            },
            {
              title: '8. Intellectual Property',
              content: `All software, designs, content, and brand elements of DigitGlance are the intellectual property of Digitglance Reliance. You may not copy, reproduce, distribute, or create derivative works from our platform without written permission. The DigitGlance name, logo, and brand identity are proprietary and may not be used without authorisation.`
            },
            {
              title: '9. Third Party Services',
              content: `Our platform integrates with third-party services including Paystack for payments, Supabase for data storage, Vercel for hosting, and Resend for email delivery. Your use of these integrations is also subject to their respective terms of service. We are not responsible for the actions, data handling, or availability of third-party services.`
            },
            {
              title: '10. Limitation of Liability',
              content: `To the fullest extent permitted by Nigerian law, DigitGlance and Digitglance Reliance are not liable for any indirect, incidental, or consequential damages arising from your use of our services, including loss of data, loss of profits, or business interruption. Our total liability for any claim arising from use of our services is limited to the amount you paid us in the three months preceding the claim.`
            },
            {
              title: '11. Accounting Disclaimer',
              content: `DigitGlance Invoice is a software tool for managing invoices and financial records. It does not constitute accounting advice, tax advice, or professional financial services. The VAT calculations and reports generated by the app are for informational purposes. You remain responsible for ensuring your tax filings and compliance obligations are met. For professional accounting advice, engage a qualified accountant or contact us about our accounting services.`
            },
            {
              title: '12. Termination',
              content: `You may cancel your subscription at any time by contacting us at hello@digitglance.com. Your access will continue until the end of your current billing period. We may terminate or suspend your account immediately if you breach these terms, engage in fraudulent activity, or fail to pay outstanding amounts. On termination, you may request an export of your data within 30 days before it is deleted.`
            },
            {
              title: '13. Governing Law',
              content: `These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or your use of our services shall be subject to the jurisdiction of the courts of Lagos State, Nigeria. We encourage you to contact us first to resolve any disputes informally before pursuing legal action.`
            },
            {
              title: '14. Changes to These Terms',
              content: `We may update these Terms of Service from time to time. When we do, we will update the date at the top of this page and notify active subscribers by email with at least 14 days notice before changes take effect. Continued use of our services after the effective date constitutes your acceptance of the updated terms.`
            },
            {
              title: '15. Contact Us',
              content: `For questions about these terms, contact us at hello@digitglance.com or write to us at 28 Micheal Adekoya Street, Ilupeju, Lagos State, Nigeria. Phone: 08162357628.`
            },
          ].map(section => (
            <div key={section.title} className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}

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
  )
}
