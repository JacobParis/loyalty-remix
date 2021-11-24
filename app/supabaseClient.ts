import { createClient } from "@supabase/supabase-js"
import invariant from "tiny-invariant"

export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  invariant(supabaseUrl, "process.env.NEXT_PUBLIC_SUPABASE_URL is not set")

  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  invariant(
    supabaseAnonKey,
    "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
  )

  return createClient(supabaseUrl, supabaseAnonKey, {
    autoRefreshToken: true,
  })
}
