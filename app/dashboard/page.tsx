'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Button from '../ui/Button'

export default function Dashboard() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/login')
      } else {
        setEmail(data.session.user.email || '')
      }
    }

    checkUser()
  }, [router])

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login') // redirect after logout
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button primary
          onClick={handleLogout}
          scary
        >
          Logout
        </Button>
      </div>

      <p>Welcome {email}</p>
    </div>
  )
}