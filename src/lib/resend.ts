import { Resend } from 'resend'

export function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export const FROM_EMAIL = 'hello@digitglance.com'
export const FROM_NAME = 'DigitGlance'