// Shared formatting utilities — single source of truth for currency, dates, phone numbers

export function formatCurrency(n: number): string {
  return '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatDate(d: string | Date): string {
  return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDateShort(d: string | Date): string {
  return new Date(d).toLocaleDateString('en-NG')
}

// Normalize a Nigerian phone number to WhatsApp-compatible international format (2348XXXXXXXXX)
export function normalizeNigerianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('234') && digits.length >= 13) return digits
  if (digits.startsWith('0') && digits.length === 11) return '234' + digits.slice(1)
  if (digits.length === 10) return '234' + digits
  return digits
}

export const DEFAULT_VAT_RATE = 7.5
