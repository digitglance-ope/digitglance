import { NextRequest, NextResponse } from 'next/server'
import { getResend, FROM_EMAIL, FROM_NAME } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const resend = getResend()

    const serviceLabel: Record<string, string> = {
      accounting: 'Accounting and Bookkeeping',
      tax: 'Tax Advisory and Compliance',
      payroll: 'Payroll Management',
      'web-app': 'Web Application Development',
      'excel-vba': 'Excel VBA Desktop Tools',
      'invoice-app': 'Invoice Management App',
      'pos-app': 'Point of Sale System',
      training: 'Training and Installation',
      other: 'Other',
    }

    const serviceText = service ? (serviceLabel[service] || service) : 'General Inquiry'
    const subject = `New Contact: ${serviceText} — from ${name}`

    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: 'hello@digitglance.com',
      replyTo: email,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;">
                Digit<span style="color:#2dd4bf;">Glance</span>
              </h1>
              <p style="margin:4px 0 0;color:#64748b;font-size:12px;">New Contact Form Submission</p>
            </div>
            <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
              <h2 style="color:#0f172a;font-size:16px;margin:0 0 20px;">You have a new message from the website</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:10px 0;color:#64748b;font-size:13px;width:120px;vertical-align:top;">Name</td>
                  <td style="padding:10px 0;color:#0f172a;font-size:13px;font-weight:bold;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Email</td>
                  <td style="padding:10px 0;font-size:13px;">
                    <a href="mailto:${email}" style="color:#0d9488;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Phone</td>
                  <td style="padding:10px 0;color:#0f172a;font-size:13px;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Service</td>
                  <td style="padding:10px 0;color:#0f172a;font-size:13px;">${serviceText}</td>
                </tr>
              </table>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
                <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
                <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <div style="margin-top:20px;padding:12px 16px;background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;">
                <p style="margin:0;color:#0f766e;font-size:12px;">
                  Reply directly to this email to respond to ${name} at ${email}.
                </p>
              </div>
            </div>
            <div style="padding:16px 32px;text-align:center;">
              <p style="color:#94a3b8;font-size:11px;margin:0;">DigitGlance &bull; digitglance.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend contact error:', error)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
