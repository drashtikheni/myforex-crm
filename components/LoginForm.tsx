'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/app/ui/Button'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/dashboard')
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Welcome back</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        primary
        onClick={handleLogin}
        className="w-full bg-primary"
      >
        Sign In
      </Button>

      <p className="mt-6 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup" className="text-green-500 font-medium hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}