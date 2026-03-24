import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(req: any) {
    let res = NextResponse.next()
    const protectedRoutes = ['/dashboard', '/clients', '/accounts']

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => req.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value }) =>
                        req.cookies.set(name, value)
                    )
                    res = NextResponse.next()
                },
            },
        }
    )

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session && protectedRoutes.some(route =>
        req.nextUrl.pathname.startsWith(route)
    )) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}