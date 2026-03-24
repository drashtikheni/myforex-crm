'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/app/ui/Button'

export default function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      alert("Check your email")
      router.push('/login')
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* STEP INDICATOR */}
        {/* <div className="flex items-center justify-center mb-6">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            1
          </div>
          <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div> */}

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-2 text-primary">
          Create your account
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Start trading in minutes
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Create password"
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <Button
          primary
          onClick={handleSignup}
          className="w-full rounded-lg"
        >
          Create Account
        </Button>

        {/* LOGIN LINK */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}