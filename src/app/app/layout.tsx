import type { Metadata } from 'next'

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
      {children}
    </div>
  )
}
