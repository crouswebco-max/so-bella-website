'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { isAdminEmail } from '../../lib/admin'
import SoBellaLogo from '../components/SoBellaLogo'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [linkLoading, setLinkLoading] = useState(false)
  const router = useRouter()

  // No password needed: emails a one-time sign-in link.
  const handleMagicLink = async () => {
    setMessage('')
    setIsError(false)

    if (!supabase) {
      setIsError(true)
      setMessage('Login is not configured yet. Please contact your developer.')
      return
    }

    if (!email) {
      setIsError(true)
      setMessage('Type your email above first, then press the link button.')
      return
    }

    if (!isAdminEmail(email)) {
      setIsError(true)
      setMessage('This email is not authorised for admin access.')
      return
    }

    setLinkLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/admin/dashboard`,
        },
      })

      if (error) {
        setIsError(true)
        setMessage("Couldn't send the link. Please try again in a minute.")
      } else {
        setMessage('Check your email! Click the link inside and you’ll be signed straight in.')
      }
    } catch {
      setIsError(true)
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLinkLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setIsError(false)

    if (!supabase) {
      setIsError(true)
      setMessage('Login is not configured yet. Please contact your developer.')
      setLoading(false)
      return
    }

    if (!email || !password) {
      setIsError(true)
      setMessage('Please enter both your email and password.')
      setLoading(false)
      return
    }

    // Only approved accounts may sign in.
    if (!isAdminEmail(email)) {
      setIsError(true)
      setMessage('This email is not authorised for admin access.')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setIsError(true)
        setMessage('Incorrect email or password. Please try again.')
        setLoading(false)
        return
      }

      setMessage('Welcome back! Taking you to your dashboard…')
      setTimeout(() => router.push('/admin/dashboard'), 800)
    } catch (err: any) {
      setIsError(true)
      setMessage(err?.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blush via-cream to-beauty-white px-4">
      <div className="bg-beauty-white rounded-3xl shadow-luxury-lg p-8 md:p-10 w-full max-w-md border border-gold/10">
        <div className="text-center mb-8">
          <div className="mb-5 flex justify-center">
            <SoBellaLogo size="md" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-beauty-black">Admin Sign In</h1>
          <p className="text-beauty-black/60 text-sm mt-2">
            Sign in to manage your website content.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-beauty-black mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full px-4 py-3 border border-gold/20 rounded-xl focus:outline-none focus:border-gold bg-blush/10"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-beauty-black mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 border border-gold/20 rounded-xl focus:outline-none focus:border-gold bg-blush/10"
            />
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-xl ${
                isError
                  ? 'text-red-700 bg-red-50 border border-red-200'
                  : 'text-green-700 bg-green-50 border border-green-200'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-luxury text-beauty-black font-semibold rounded-xl shadow-luxury hover:shadow-luxury-lg transition-luxury disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <span className="h-px flex-1 bg-gold/20" />
          <span className="text-xs text-beauty-black/40">or</span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>

        <button
          type="button"
          onClick={handleMagicLink}
          disabled={linkLoading}
          className="w-full py-3 border border-gold/30 text-beauty-black font-semibold rounded-xl hover:bg-blush/20 transition-luxury disabled:opacity-60"
        >
          {linkLoading ? 'Sending…' : '✉️ Forgot password? Email me a sign-in link'}
        </button>

        <p className="text-xs text-beauty-black/40 text-center mt-6">
          Type your email, press the button above, and click the link in your inbox — no password needed.
        </p>
      </div>
    </div>
  )
}
