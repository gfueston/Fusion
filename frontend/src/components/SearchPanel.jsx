import { useState } from 'react'
import { ingestSource } from '../lib/api'

export default function SearchPanel({ onRefresh }) {
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  async function submitInternet(e) {
    e.preventDefault()
    const result = await ingestSource({ source_type: 'internet', query })
    setMessage(result.message)
    onRefresh(query)
  }

  async function submitWebsite(e) {
    e.preventDefault()
    const result = await ingestSource({ source_type: 'website', url })
    setMessage(result.message)
    onRefresh('')
  }

  return (
    <section className="panel">
      <h2>Ingest live data</h2>
      <form onSubmit={submitInternet} className="stack">
        <input placeholder="Search term or phrase" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Queue internet search</button>
      </form>
      <form onSubmit={submitWebsite} className="stack top-gap">
        <input placeholder="Website URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Queue website ingest</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  )
}
