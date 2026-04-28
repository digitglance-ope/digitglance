'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/app/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-white">
              Digit<span className="text-teal-400">Glance</span>
            </span>
          </Link>
          <p className="text-slate-400 mt-2 text-sm">Invoice Management System</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-teal-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white mb-2">Check your email</h1>
              <p className="text-slate-400 text-sm mb-6">
                We sent a password reset link to <span className="text-white font-medium">{email}</span>. Click the link in the email to set a new password.
              </p>
              <p className="text-slate-500 text-xs mb-6">
                Did not receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-teal-400 hover:text-teal-300 text-sm font-medium"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-white mb-1">Reset your password</h1>
              <p className="text-slate-400 text-sm mb-6">Enter your email address and we will send you a reset link.</p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-slate-500 text-sm mt-6">
            <Link href="/app/login" className="text-teal-400 hover:text-teal-300 font-medium">
              Back to Sign In
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          2026 DigitGlance. A trading name of Digitglance Reliance.
        </p>
      </div>
    </div>
  )
}
