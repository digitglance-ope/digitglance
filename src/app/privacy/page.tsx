import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy | DigitGlance',
  description: 'Privacy Policy for DigitGlance and DigitGlance Invoice. Learn how we collect, use, and protect your data.',
}

const sections = [
  {
    title: '1. Who We Are',
    content: `DigitGlance is a trading name of Digitglance Reliance, a CAC-registered business based in Lagos, Nigeria. We provide accounting services, web applications, and business software tools. Our registered address is 28 Micheal Adekoya Street, Ilupeju, Lagos State, Nigeria. You can contact us at hello@digitglance.com or 08162357628.`,
  },
  {
    title: '2. Information We Collect',
    content: `When you register for DigitGlance Invoice, we collect your name, email address, business name, business address, phone number, and Tax Identification Number where provided. We collect payment-related information such as your subscription plan and transaction references through Paystack. We do not store your card details. When you use the app, we collect invoice data, customer records, payment records, and activity logs you create. We may collect technical information such as your device type and browser when you access our services.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use your information to provide and operate the DigitGlance Invoice application and related services. We use your email address to send transactional emails including invoice copies, payment confirmations, and account notifications. We use your business information to populate your invoices and reports. We use activity logs for security, audit, and troubleshooting purposes. We do not sell your personal data to third parties. We do not use your data for advertising purposes.`,
  },
  {
    title: '4. Data Storage and Security',
    content: `Your data is stored securely using Supabase, a PostgreSQL-based database platform with row-level security enabled. This means each user can only access their own data. We use industry-standard encryption for data in transit. Your files and business logo are stored in Supabase Storage with access controls. While we take reasonable steps to protect your information, no internet-based system is completely secure and we cannot guarantee absolute security.`,
  },
  {
    title: '5. Payment Processing',
    content: `Payments for subscriptions are processed by Paystack, a PCI-DSS compliant payment processor. DigitGlance does not store your card number, expiry date, or CVV. When you make a payment, you are interacting directly with Paystack's secure payment interface. We retain only the transaction reference and your chosen plan for our records.`,
  },
  {
    title: '6. Email Communications',
    content: `We send transactional emails through Resend using our verified domain digitglance.com. These include invoice emails sent to your customers on your behalf, payment confirmation emails, account verification emails, and team invitation emails. You can opt out of non-transactional communications at any time by contacting us at hello@digitglance.com. Transactional emails related to your account and invoices cannot be opted out of while you remain an active user.`,
  },
  {
    title: '7. Third Party Services',
    content: `We use the following third-party services to operate our platform: Supabase for database and file storage, Vercel for hosting and deployment, Paystack for payment processing, and Resend for email delivery. Each of these services has their own privacy policies and data handling practices. We recommend reviewing their policies for full details.`,
  },
  {
    title: '8. Your Rights',
    content: `You have the right to access the personal data we hold about you. You have the right to request correction of inaccurate data. You have the right to request deletion of your account and associated data. You have the right to export your invoice and customer data. To exercise any of these rights, contact us at hello@digitglance.com and we will respond within 7 business days.`,
  },
  {
    title: '9. Data Retention',
    content: `We retain your data for as long as your account is active. If you close your account, we will delete your personal data within 30 days unless we are required to retain it by law. Invoice and financial records may be retained for up to 7 years for legal and tax compliance purposes, after which they are permanently deleted.`,
  },
  {
    title: '10. Children',
    content: `Our services are not directed at children under the age of 18. We do not knowingly collect personal information from anyone under 18. If you believe a child has provided us with personal information, contact us and we will delete it promptly.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. When we do, we will update the date at the top of this page and notify active users by email. Continued use of our services after any changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have questions about this Privacy Policy or how we handle your data, contact us at hello@digitglance.com or write to us at 28 Micheal Adekoya Street, Ilupeju, Lagos State, Nigeria.`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HEADER ──────────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-navy mb-6 inline-flex animate-fade-in-up">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            Privacy Policy
          </h1>
          <p className="text-slate-400 animate-fade-in-up anim-delay-200">Last updated: April 2026</p>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Intro notice */}
          <ScrollReveal className="mb-10">
            <div className="card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: '#27AE60' }}>
              <p className="text-slate-600 text-sm leading-relaxed">
                This Privacy Policy applies to DigitGlance, a trading name of Digitglance Reliance, and covers all services including the DigitGlance Invoice application available at digitglance.com. By using our services, you agree to the collection and use of information as described in this policy.
              </p>
            </div>
          </ScrollReveal>

          {/* Sections */}
          <div className="space-y-5">
            {sections.map((sec, i) => (
              <ScrollReveal key={sec.title} delay={i * 40}>
                <div className="card rounded-2xl p-6 sm:p-8">
                  <h2 className="font-extrabold text-sm mb-3 flex items-center gap-2" style={{ color: '#1B4F72' }}>
                    <span className="w-1 h-4 rounded-full inline-block flex-shrink-0" style={{ background: '#27AE60' }} />
                    {sec.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">{sec.content}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact CTA */}
          <ScrollReveal className="mt-12">
            <div className="text-center card rounded-2xl p-8">
              <p className="text-slate-500 text-sm mb-4">Questions about your privacy?</p>
              <Link
                href="/contact"
                className="btn-green inline-flex text-sm py-2.5 px-6"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
