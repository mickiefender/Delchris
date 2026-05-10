import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only protect dashboard routes
  if (!request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  // Clean up any duplicate cookies that could cause token duplication in headers
  // This fixes the "Authorization header has invalid value" error
  const cookies = request.cookies.getAll()
  const accessTokenCookies = cookies.filter(c => c.name === 'sb-access-token')
  
  let response: NextResponse
  
  // If multiple access tokens exist (causing the "duplicate token" error), clean them up
  if (accessTokenCookies.length > 1) {
    // Get only the newest token (last one set)
    const latestToken = accessTokenCookies[accessTokenCookies.length - 1]
    response = NextResponse.next({ request: { headers: request.headers } })
    
    // Clear all access tokens and set only the latest
    for (const cookie of accessTokenCookies) {
      response.cookies.delete(cookie.name)
    }
    response.cookies.set(latestToken.name, latestToken.value, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
    })
  } else {
    // Create response normally
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }

  // Create supabase client to check session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options as any)
          })
        },
      },
    }
  )

  // Get the current session
  const { data: { session } } = await supabase.auth.getSession()

  // If no session, redirect to login
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check if user is an admin
  const { data: adminData, error } = await supabase
    .from('admins')
    .select('id, is_active')
    .eq('id', session.user.id)
    .eq('is_active', true)
    .single()

  // If not admin, redirect to login with error
  if (error || !adminData) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}
