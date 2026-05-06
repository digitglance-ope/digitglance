import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const REMINDER_LABELS: Record<string, string> = {
  first_reminder: 'a polite first payment reminder',
  follow_up: 'a firm follow-up reminder (a previous reminder was already sent and ignored)',
  final_notice: 'a final notice before escalating to formal debt recovery proceedings',
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, business_name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.plan === 'free') {
    return NextResponse.json({ error: 'Upgrade required' }, { status: 403 })
  }

  const { customerName, invoiceRef, amount, dueDate, daysOverdue, reminderType } = await req.json()

  const businessName = profile.business_name || 'our business'
  const amountFormatted = '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })
  const dueDateFormatted = new Date(dueDate).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const label = REMINDER_LABELS[reminderType] ?? REMINDER_LABELS.first_reminder

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 350,
    messages: [{
      role: 'user',
      content: `Write ${label} for a Nigerian business.

Details:
- Sender business: ${businessName}
- Customer name: ${customerName}
- Invoice reference: ${invoiceRef}
- Amount outstanding: ${amountFormatted}
- Original due date: ${dueDateFormatted}
- Days overdue: ${daysOverdue} days

Requirements:
- Write ONLY the email body paragraphs (the greeting "Dear ${customerName}," and the sign-off are added separately — do not include them)
- 3–4 sentences maximum
- Professional Nigerian business English
- Reference the specific invoice number and the amount outstanding
- End with a clear call to action: make payment immediately or contact us to discuss
- Tone must match: ${label}
- Do not use generic filler phrases like "I hope this email finds you well"`,
    }],
  })

  const draft = (response.content[0] as { text: string }).text.trim()
  return NextResponse.json({ draft })
}
