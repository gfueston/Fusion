import { useState } from 'react'
import { loginUser, registerUser } from '../lib/api'

export default function AuthPanel({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', full_name: '', password: '' })
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'register') {
        await registerUser(form)
      }
      const token = await loginUser({ email: form.email, password: form.password })
      onLogin(token.access_token)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="panel">
      <h2>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
      <form onSubmit={submit} className="stack">
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {mode === 'register' && <input placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />}
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button className="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Need an account?' : 'Already registered?'}
      </button>
    </section>
  )
}
