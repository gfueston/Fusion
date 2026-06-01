import { useEffect, useState } from 'react'
import LeadTable from '../components/LeadTable'
import SearchPanel from '../components/SearchPanel'
import { fetchLeads } from '../lib/api'

export default function Dashboard() {
  const [leads, setLeads] = useState([])
  const [search, setSearch] = useState('')

  async function load(term = '') {
    const data = await fetchLeads(term)
    setLeads(data)
    setSearch(term)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <main className="layout">
      <header className="hero">
        <div>
          <h1>Mission Fusion</h1>
          <p>Operational data fusion with live ingest and persistent records.</p>
        </div>
        <div className="pill">Filter: {search || 'All'}</div>
      </header>
      <SearchPanel onRefresh={load} />
      <LeadTable leads={leads} />
    </main>
  )
}
