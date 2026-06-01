export default function LeadTable({ leads }) {
  return (
    <section className="panel">
      <h2>Live leads</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Source</th>
            <th>Status</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.title}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
              <td>{lead.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
