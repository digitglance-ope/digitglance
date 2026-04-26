import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'DigitGlance Invoice',
  description: 'Professional invoicing for Nigerian businesses',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      {children}
    </div>
  )
}
