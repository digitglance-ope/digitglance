import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Auth guard — must be authenticated to invite users
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, role, fullName, invitedBy, accountOwnerId, businessName } = await req.json()

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required.' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const VALID_ROLES = ['admin', 'manager', 'staff', 'viewer']
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 })
    }

    // Verify the calling user owns or manages the target account
    if (accountOwnerId && accountOwnerId !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_team_member, account_owner_id')
        .eq('id', user.id)
        .single()
      if (!profile?.is_team_member || profile.account_owner_id !== accountOwnerId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
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