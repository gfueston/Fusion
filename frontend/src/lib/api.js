const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function registerUser(payload) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Registration failed')
  return response.json()
}

export async function loginUser(payload) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Login failed')
  return response.json()
}

export async function ingestSource(payload) {
  const response = await fetch(`${API_BASE}/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Ingest failed')
  return response.json()
}

export async function fetchLeads(search = '') {
  const url = new URL(`${API_BASE}/leads`)
  if (search) url.searchParams.set('search', search)
  const response = await fetch(url)
  if (!response.ok) throw new Error('Lead fetch failed')
  return response.json()
}
