'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Failed to send your message. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">Contact Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 max-w-2xl leading-tight">
            Let us know how we can help
          </h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            Whether you need accounting services, a custom software tool, or want to learn more about our products — send a message and we will respond within one business day.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-14">

          {/* ─── FORM ─── */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-8">Send Us a Message</h2>

            {status === 'success' ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message sent successfully</h3>
                <p className="text-slate-500 text-sm mb-6">Thank you for reaching out. We will respond within one business day.</p>
                <button onClick={() => setStatus('idle')} className="text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors">
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="your@email.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">What do you need?</label>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="invoice">DigitGlance Invoice (SaaS)</option>
                      <option value="pos">Point of Sale (POS)</option>
                      <option value="accounting">Accounting &amp; Tax Services</option>
                      <option value="software">Custom Software Development</option>
                      <option value="excel">Excel VBA Tools</option>
                      <option value="training">Training &amp; Onboarding</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your business and what you need help with..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-4 rounded-xl transition-colors text-sm shadow-md disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                <p className="text-xs text-slate-400 text-center">We respond within 1 business day. Your data is private.</p>
              </form>
            )}
          </div>

          {/* ─── SIDEBAR INFO ─── */}
          <div className="space-y-6">

            {/* Response SLA card */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Fast Response</p>
                  <p className="text-xs text-teal-700 font-medium">Within 1 business day</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">We read and respond to every message personally. Urgent? Use WhatsApp below.</p>
            </div>

            {/* Contact details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-slate-900">Direct Contact</h3>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Email</p>
                  <a href="mailto:hello@digitglance.com" className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                    hello@digitglance.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.929a.5.5 0 00.614.614l6.073-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.032-1.383l-.36-.214-3.732.908.924-3.638-.235-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">WhatsApp</p>
                  <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-slate-700">Lagos, Nigeria</p>
                  <p className="text-xs text-slate-400">Serving businesses nationwide</p>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">What Happens Next</h3>
              <div className="space-y-4">
                {[
                  { step: '1', text: 'We receive your message and review it personally' },
                  { step: '2', text: 'We respond within 1 business day with a direct answer or next steps' },
                  { step: '3', text: 'If a consultation is needed, we schedule a free discovery call' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <p className="text-sm text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Looking for something specific?</h3>
              <div className="space-y-2.5">
                {[
                  { href: '/products', label: 'Invoice & POS pricing' },
                  { href: '/services', label: 'Accounting & Tax services' },
                  { href: '/solutions', label: 'Excel VBA tools' },
                  { href: '/ai-tools', label: 'AI automation tools' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="flex items-center justify-between text-sm text-slate-600 hover:text-teal-600 transition-colors group">
                    {link.label}
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.929a.5.5 0 00.614.614l6.073-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.032-1.383l-.36-.214-3.732.908.924-3.638-.235-.373A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12c0 5.43-4.388 9.818-9.818 9.818z" />
        </svg>
      </a>
    </main>
  )
}
