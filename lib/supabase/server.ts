import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cookie names used by Supabase for storing authentication data.
 * We use these to clean up any duplicate or stale tokens.
 */
const SUPABASE_COOKIE_NAMES = [
  'sb-access-token',
  'sb-refresh-token',
  'sb-provider-token',
  'sb-provider-refresh-token',
]

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies()

  // Clean up any duplicate or stale cookies that could cause token duplication
  // This prevents the "Authorization header has invalid value" error
  try {
    const existingCookies = cookieStore.getAll()
    const accessTokenCookies = existingCookies.filter(
      (c) => c.name === 'sb-access-token'
    )
    
    // If multiple access tokens exist, keep only the most recent one
    if (accessTokenCookies.length > 1) {
      const latestToken = accessTokenCookies[accessTokenCookies.length - 1]
      // Clear all and re-set the latest
      for (const cookie of accessTokenCookies) {
        cookieStore.delete(cookie.name)
      }
      cookieStore.set(latestToken.name, latestToken.value, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 hour
      })
    }
  } catch {
    // Ignore cleanup errors - will be handled on next request
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            // First, clear any existing auth cookies to prevent duplication
            const existingCookies = cookieStore.getAll()
            for (const cookie of existingCookies) {
              if (SUPABASE_COOKIE_NAMES.includes(cookie.name)) {
                cookieStore.delete(cookie.name)
              }
            }
            
            // Now set all new cookies
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}
