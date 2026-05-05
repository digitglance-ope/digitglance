import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan, mode, reference } = await req.json()

    if (!plan || !['starter', 'pro'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan. Choose starter or pro.' }, { status: 400 })
    }

    if (!mode || !['trial', 'subscribe'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid mode.' }, { status: 400 })
    }

    // Resolve owner — team members share account owner's subscriptions
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_team_member, account_owner_id')
      .eq('id', user.id)
      .single()

    const ownerId = (profile?.is_team_member && profile.account_owner_id)
      ? profile.account_owner_id
      : user.id

    // Check for existing subscription
    const { data: existing } = await supabase
      .from('product_subscriptions')
      .select('id, status, plan_slug')
      .eq('account_owner_id', ownerId)
      .eq('product_slug', 'pos')
      .maybeSingle()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({ error: 'You already have an active POS subscription.' }, { status: 409 })
      }

      // Trial user upgrading to paid — update in place
      if (existing.status === 'trial' && mode === 'subscribe') {
        const { error: updateError } = await supabase
          .from('product_subscriptions')
          .update({ status: 'active', plan_slug: plan })
          .eq('id', existing.id)

        if (updateError) {
          console.error('Subscription update error:', updateError)
          return NextResponse.json({ error: 'Failed to upgrade subscription.' }, { status: 500 })
        }

        await supabase.from('audit_logs').insert({
          account_owner_id: ownerId,
          user_id: user.id,
          user_email: user.email,
          action: 'POS Subscription Activated',
          resource: 'Product Subscriptions',
          details: `POS ${plan} plan activated from trial. Paystack ref: ${reference || 'N/A'}`,
        })

        return NextResponse.json({ success: true })
      }

      // Already in trial, requesting trial again
      if (existing.status === 'trial') {
        return NextResponse.json({ error: 'You already have an active trial.' }, { status: 409 })
      }
    }

    // Create new subscription
    const { error: insertError } = await supabase
      .from('product_subscriptions')
      .insert({
        account_owner_id: ownerId,
        product_slug: 'pos',
        plan_slug: plan,
        status: mode === 'trial' ? 'trial' : 'active',
      })

    if (insertError) {
      console.error('Subscription insert error:', insertError)
      return NextResponse.json({ error: 'Failed to activate subscription.' }, { status: 500 })
    }

    await supabase.from('audit_logs').insert({
      account_owner_id: ownerId,
      user_id: user.id,
      user_email: user.email,
      action: mode === 'trial' ? 'POS Trial Started' : 'POS Subscription Activated',
      resource: 'Product Subscriptions',
      details: `POS ${plan} plan ${mode === 'trial' ? 'trial started' : 'activated'}${reference ? `. Paystack ref: ${reference}` : ''}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('POS activate route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
