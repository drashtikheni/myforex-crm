import { NextRequest, NextResponse } from 'next/server'
import { PROTECTED_ROUTES } from '@/config/auth'
import { createServerClient } from '@supabase/ssr'

export async function proxy(req: NextRequest) {
  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => {
            req.cookies.set(name, value)
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname


  if (!session && PROTECTED_ROUTES.includes(path)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (session && (path === '/' || path === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}