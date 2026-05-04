import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PRODUCT_SLUGS = new Set(['invoice', 'pos', 'accounting', 'school'])

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  const isPublicAppRoute =
    path === '/app/login' ||
    path === '/app/register' ||
    path === '/app/forgot-password' ||
    path === '/app/reset-password' ||
    path === '/app/accept-invite'

  // Public auth routes — allow through, redirect already-logged-in users away
  if (isPublicAppRoute) {
    if (user && (path === '/app/login' || path === '/app/register')) {
      const url = request.nextUrl.clone()
      url.pathname = '/app/dashboard'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // All remaining /app/* routes require authentication
  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/app/login'
    return NextResponse.redirect(url)
  }

  // Fetch profile once for all downstream checks
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_complete, is_team_member, account_owner_id')
    .eq('id', user.id)
    .single()

  const isOnboarding = path.startsWith('/app/onboarding')

  // Team members skip onboarding entirely
  if (isOnboarding && profile?.is_team_member) {
    const url = request.nextUrl.clone()
    url.pathname = '/app/dashboard'
    return NextResponse.redirect(url)
  }

  // Account owners who haven't completed onboarding must finish it first
  if (!isOnboarding && !profile?.onboarding_complete && !profile?.is_team_member) {
    const url = request.nextUrl.clone()
    url.pathname = '/app/onboarding'
    return NextResponse.redirect(url)
  }

  // Product access guard — enforces subscription per product
  // URL pattern: /app/{productSlug}/...
  const productSlug = path.split('/')[2]
  if (productSlug && PRODUCT_SLUGS.has(productSlug)) {
    // Team members inherit their account owner's subscriptions
    const ownerId = (profile?.is_team_member && profile.account_owner_id)
      ? profile.account_owner_id
      : user.id

    const { data: sub } = await supabase
      .from('product_subscriptions')
      .select('id')
      .eq('account_owner_id', ownerId)
      .eq('product_slug', productSlug)
      .eq('status', 'active')
      .maybeSingle()

    if (!sub) {
      const url = request.nextUrl.clone()
      url.pathname = '/app/dashboard'
      url.searchParams.set('upgrade', productSlug)
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/app/:path*'],
}
