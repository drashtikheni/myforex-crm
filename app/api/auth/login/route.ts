import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const supabase = await createServerSupabase()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const res = NextResponse.json({ user: data.user })

  return res
}