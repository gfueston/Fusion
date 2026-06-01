import { useState } from 'react'
import AuthPanel from './components/AuthPanel'
import Dashboard from './pages/Dashboard'
import './styles.css'

export default function App() {
  const [token, setToken] = useState('')
  return token ? <Dashboard /> : <AuthPanel onLogin={setToken} />
}
