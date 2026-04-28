import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, role, fullName, invitedBy, accountOwnerId, businessName } = await req.json()

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required.' }, { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      // Redirect to the accept-invite page so the user can set their password first
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://digitglance.com'}/app/accept-invite`,
      data: {
        role,
        full_name: fullName || '',
        invited_by: invitedBy || '',
        account_owner_id: accountOwnerId || '',
        business_name: businessName || 'DigitGlance',
        is_team_member: true,
      },
    })

    if (error) {
      console.error('Invite error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId: data.user?.id })
  } catch (err) {
    console.error('Invite route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}