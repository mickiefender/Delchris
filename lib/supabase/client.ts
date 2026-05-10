import { createBrowserClient } from '@supabase/ssr'

/**
 * Client-side Supabase client with duplicate token prevention.
 * This ensures the browser localStorage doesn't accumulate duplicate tokens.
 */
export function createClient() {
  // Clean up any duplicate tokens in localStorage before creating client
  if (typeof window !== 'undefined') {
    try {
      const supabaseStorageKey = `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/[^a-zA-Z0-9]/g, '')}-auth-token`
      const storedData = localStorage.getItem(supabaseStorageKey)
      
      if (storedData) {
        const parsed = JSON.parse(storedData)
        
        // If we have an access_token that's duplicated (same token in different format),
        // normalize it to prevent header duplication
        if (parsed?.access_token && parsed?.refresh_token) {
          // Ensure the token is stored correctly as a single entry
          localStorage.setItem(supabaseStorageKey, JSON.stringify({
            access_token: parsed.access_token,
            refresh_token: parsed.refresh_token,
            expires_at: parsed.expires_at,
            expires_in: parsed.expires_in,
            token_type: parsed.token_type || 'bearer',
            user: parsed.user,
          }))
        }
      }
    } catch {
      // Ignore cleanup errors - localStorage might be unavailable
    }
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
