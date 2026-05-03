import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
  const isAppRoute = path.startsWith('/app')

  // These routes are always accessible without authentication
  const isPublicAppRoute =
    path === '/app/login' ||
    path === '/app/register' ||
    path === '/app/forgot-password' ||
    path === '/app/reset-password' ||
    path === '/app/accept-invite'

  const isOnboardingRoute = path === '/app/onboarding' || path.startsWith('/app/onboarding')

  // Allow public routes through always
  if (isPublicAppRoute) {
    // Redirect already-logged-in users away from login/register
    if (user && (path === '/app/login' || path === '/app/register')) {
      const url = request.nextUrl.clone()
      url.pathname = '/app/dashboard'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // Redirect unauthenticated users to login
  if (isAppRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/app/login'
    return NextResponse.redirect(url)
  }

  // For authenticated users check onboarding
  if (isAppRoute && user && !isOnboardingRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_complete, is_team_member')
      .eq('id', user.id)
      .single()

    // Team members skip onboarding entirely
    if (profile && !profile.onboarding_complete && !profile.is_team_member) {
      const url = request.nextUrl.clone()
      url.pathname = '/app/onboarding'
      return NextResponse.redirect(url)
    }
  }

  // Redirect team members away from onboarding if they land there
  if (isOnboardingRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_team_member')
      .eq('id', user.id)
      .single()

    if (profile?.is_team_member) {
      const url = request.nextUrl.clone()
      url.pathname = '/app/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/app/:path*'],
}