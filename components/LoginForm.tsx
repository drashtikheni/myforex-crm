'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-2">Welcome back.</h2>
      <p className="text-muted-foreground mb-6">
        Access your trading ecosystem securely.
      </p>

      {/* EMAIL */}
      <div className="mb-4">
        <Label>Email Address</Label>
        <Input
          type="email"
          placeholder="name@company.com"
          className="mt-2 h-12 rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <Label>Password</Label>
          <span className="text-sm text-primary cursor-pointer">
            Forgot password?
          </span>
        </div>

        <Input
          type="password"
          placeholder="••••••••"
          className="mt-2 h-12 rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <Button
        onClick={handleLogin}
        className="w-full h-12 text-base rounded-xl"
      >
        Sign In →
      </Button>

      {/* SIGNUP */}
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary font-medium">
          Create account
        </Link>
      </p>
    </div>
  )
}