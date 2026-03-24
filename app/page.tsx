import { createServerSupabase } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerSupabase()

  const {
    data: { session },
  } = await (await supabase).auth.getSession()

  // ✅ If logged in → go to dashboard
  if (session) {
    redirect('/dashboard')
  }

  // ❌ If NOT logged in → go to login page
  redirect('/login')
}