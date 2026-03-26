'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function SignupForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      alert('Check your email')
      router.push('/login')
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-1">
              Begin your journey into precision trading.
            </p>
          </div>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="mb-4">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="name@company.com"
                className="mt-2 h-12 rounded-xl"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                className='mt-2 h-12 rounded-xl'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-tight"
              >
                I agree to the{' '}
                <span className="text-primary font-medium cursor-pointer">
                  Terms
                </span>{' '}
                and{' '}
                <span className="text-primary font-medium cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link href="/login" className="text-primary font-medium ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}