import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contact Us | DigitGlance',
  description: 'Get in touch with DigitGlance for accounting services, custom software development, or a free consultation.',
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.856L.057 23.215a.75.75 0 00.916.916l5.355-1.479A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 01-4.964-1.361l-.355-.213-3.681 1.016 1.017-3.681-.213-.355A9.725 9.725 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  )
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <section className="section-white px-5 sm:px-6 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <span className="badge-green mb-6 inline-flex animate-fade-in-up">
            <span className="green-marker" />
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5 animate-fade-in-up anim-delay-100" style={{ color: '#1B4F72' }}>
            Let Us Know How<br />
            <span style={{ color: '#27AE60' }}>We Can Help</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed animate-fade-in-up anim-delay-200">
            Whether you need accounting services, a custom software tool, or want to learn more about our products — send us a message and we will respond within one business day.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT ─────────────────────────────────── */}
      <section className="section-gray px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">

          {/* Contact form */}
          <ScrollReveal>
            <div className="card rounded-3xl p-8">
              <h2 className="text-xl font-extrabold mb-8" style={{ color: '#1B4F72' }}>Send Us a Message</h2>
              <form action="https://formspree.io/f/xbdqyelq" method="POST" className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text" name="name" required
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow"
                    style={{ ['--tw-ring-color' as string]: '#27AE60' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email" name="email" required
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel" name="phone"
                    placeholder="Your phone number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Service of Interest</label>
                  <select
                    name="service"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition-shadow bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="accounting">Accounting and Bookkeeping</option>
                    <option value="tax">Tax Advisory and Compliance</option>
                    <option value="payroll">Payroll Management</option>
                    <option value="web-app">Web Application Development</option>
                    <option value="excel-vba">Excel VBA Desktop Tools</option>
                    <option value="invoice-app">Invoice Management App</option>
                    <option value="training">Training and Installation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                  <textarea
                    name="message" required rows={5}
                    placeholder="Tell us about your business and what you need help with"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-green w-full justify-center text-sm py-3"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <h2 className="text-xl font-extrabold mb-6" style={{ color: '#1B4F72' }}>Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: IconMail,  label: 'Email',         value: 'hello@digitglance.com',                          href: 'mailto:hello@digitglance.com' },
                  { icon: IconPin,   label: 'Location',      value: '28 Micheal Adekoya Street, Ilupeju, Lagos State', href: undefined },
                  { icon: IconClock, label: 'Response Time', value: 'Within one business day',                         href: undefined },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="icon-box flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#27AE60]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1B4F72' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-slate-500 text-sm mt-0.5 hover:text-[#27AE60] transition-colors">{item.value}</a>
                        : <p className="text-slate-500 text-sm mt-0.5">{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* What happens next */}
            <ScrollReveal delay={100}>
              <div className="card rounded-2xl p-6">
                <h3 className="font-extrabold mb-5 text-sm" style={{ color: '#1B4F72' }}>
                  What happens after you contact us
                </h3>
                <div className="space-y-4">
                  {[
                    'We review your message and identify the right service for your needs',
                    'We send you a response within one business day with next steps',
                    'We schedule a free consultation call to discuss your requirements',
                    'We provide a clear proposal with pricing and timeline',
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-extrabold" style={{ background: '#27AE60' }}>
                        {i + 1}
                      </span>
                      <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* WhatsApp CTA */}
            <ScrollReveal delay={150}>
              <div className="card rounded-2xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0">
                  <IconWhatsApp className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-0.5" style={{ color: '#1B4F72' }}>Prefer WhatsApp?</p>
                  <p className="text-slate-400 text-xs mb-3">Chat with us directly for a faster response.</p>
                  <a
                    href="https://wa.me/2348162357628?text=Hello%20DigitGlance%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    <IconWhatsApp className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/2348162357628?text=Hello%20DigitGlance%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 transition-colors text-sm font-semibold"
      >
        <IconWhatsApp className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </main>
  )
}
