import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DigitGlance POS',
  description: 'Point of sale for Nigerian retail businesses',
}

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50">{children}</div>
}
