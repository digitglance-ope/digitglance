import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL, FROM_NAME } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, to, data } = body

    if (!type || !to) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let subject = ''
    let html = ''

    if (type === 'invoice') {
      const { invoice_number, business_name, customer_name, total, due_date, invoice_url } = data
      subject = `Invoice ${invoice_number} from ${business_name}`
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">
                Digit<span style="color:#2dd4bf;">Glance</span>
              </h1>
              <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Professional Invoicing</p>
            </div>
            <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
              <p style="color:#475569;font-size:15px;margin:0 0 8px;">Hello ${customer_name},</p>
              <p style="color:#475569;font-size:15px;margin:0 0 24px;">
                You have received an invoice from <strong>${business_name}</strong>.
              </p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:13px;">Invoice Number</td>
                    <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:bold;text-align:right;">${invoice_number}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:13px;">Amount Due</td>
                    <td style="padding:6px 0;color:#0f172a;font-size:18px;font-weight:bold;text-align:right;">₦${Number(total).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:13px;">Due Date</td>
                    <td style="padding:6px 0;color:#dc2626;font-size:13px;font-weight:bold;text-align:right;">${due_date}</td>
                  </tr>
                </table>
              </div>
              ${invoice_url ? `
              <div style="text-align:center;margin-bottom:24px;">
                <a href="${invoice_url}" style="background:#0d9488;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:bold;display:inline-block;">
                  View Invoice
                </a>
              </div>
              ` : ''}
              <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">
                This email was sent by ${business_name} using DigitGlance Invoice. 
                For billing questions, contact ${business_name} directly.
              </p>
            </div>
            <div style="padding:16px 32px;text-align:center;">
              <p style="color:#94a3b8;font-size:11px;margin:0;">
                Powered by DigitGlance &bull; digitglance.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    } else if (type === 'invitation') {
      const { business_name, inviter_name, role, signup_url } = data
      subject = `You have been invited to join ${business_name} on DigitGlance`
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">
                Digit<span style="color:#2dd4bf;">Glance</span>
              </h1>
              <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Professional Invoicing</p>
            </div>
            <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
              <h2 style="color:#0f172a;font-size:18px;margin:0 0 16px;">You have been invited</h2>
              <p style="color:#475569;font-size:15px;margin:0 0 24px;">
                <strong>${inviter_name}</strong> has invited you to join <strong>${business_name}</strong> 
                on DigitGlance as a <strong>${role}</strong>.
              </p>
              <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:16px;margin-bottom:24px;">
                <p style="color:#0f766e;font-size:13px;margin:0;">
                  DigitGlance is a professional invoicing and business management platform for Nigerian businesses.
                </p>
              </div>
              <div style="text-align:center;margin-bottom:24px;">
                <a href="${signup_url}" style="background:#0d9488;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:bold;display:inline-block;">
                  Accept Invitation
                </a>
              </div>
              <p style="color:#94a3b8;font-size:12px;margin:0;">
                If you did not expect this invitation, you can ignore this email.
              </p>
            </div>
            <div style="padding:16px 32px;text-align:center;">
              <p style="color:#94a3b8;font-size:11px;margin:0;">
                Powered by DigitGlance &bull; digitglance.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    } else if (type === 'payment_confirmation') {
      const { business_name, customer_name, invoice_number, amount_paid, balance } = data
      subject = `Payment received - Invoice ${invoice_number}`
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;">
                Digit<span style="color:#2dd4bf;">Glance</span>
              </h1>
              <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Professional Invoicing</p>
            </div>
            <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
              <div style="text-align:center;margin-bottom:24px;">
                <div style="width:56px;height:56px;background:#f0fdfa;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                  <span style="font-size:24px;">✓</span>
                </div>
                <h2 style="color:#0f172a;font-size:18px;margin:0;">Payment Received</h2>
              </div>
              <p style="color:#475569;font-size:15px;margin:0 0 24px;text-align:center;">
                Hello ${customer_name}, we have received your payment for Invoice ${invoice_number} from ${business_name}.
              </p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:13px;">Amount Paid</td>
                    <td style="padding:6px 0;color:#16a34a;font-size:16px;font-weight:bold;text-align:right;">₦${Number(amount_paid).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:13px;">Remaining Balance</td>
                    <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:bold;text-align:right;">₦${Number(balance).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</td>
                  </tr>
                </table>
              </div>
              <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">
                This payment confirmation was sent by ${business_name} using DigitGlance Invoice.
              </p>
            </div>
            <div style="padding:16px 32px;text-align:center;">
              <p style="color:#94a3b8;font-size:11px;margin:0;">
                Powered by DigitGlance &bull; digitglance.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    } else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    const { data: result, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: result?.id })
  } catch (err) {
    console.error('Email route error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}