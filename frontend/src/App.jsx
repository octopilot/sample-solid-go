import { createSignal } from 'solid-js'

export default function App() {
  const [name, setName] = createSignal('')
  const [birthYear, setBirthYear] = createSignal('')
  const [apiBase, setApiBase] = createSignal('http://localhost:8081')
  const [result, setResult] = createSignal(null)
  const [error, setError] = createSignal(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult('Loading…')
    try {
      const base = (apiBase() || '').replace(/\/$/, '')
      const url = `${base}/greet?name=${encodeURIComponent(name())}&birth_year=${encodeURIComponent(birthYear())}`
      const res = await fetch(url)
      const data = await res.json()
      setResult(res.ok ? JSON.stringify(data, null, 2) : `Error: ${data.error || res.status}`)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  return (
    <div style={{ 'max-width': '400px', margin: '2rem auto', padding: '16px', 'font-family': 'system-ui' }}>
      <h1>Greet (Solid + Go)</h1>
      <p>SolidJS frontend + Go API — one repo.</p>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', 'margin-bottom': '8px' }}>Name</label>
        <input value={name()} onInput={e => setName(e.currentTarget.value)} required placeholder="Alice" style={{ width: '100%', padding: '8px', 'margin-bottom': '12px', 'box-sizing': 'border-box' }} />
        <label style={{ display: 'block', 'margin-bottom': '8px' }}>Birth year</label>
        <input type="number" value={birthYear()} onInput={e => setBirthYear(e.currentTarget.value)} required placeholder="1990" style={{ width: '100%', padding: '8px', 'margin-bottom': '12px', 'box-sizing': 'border-box' }} />
        <label style={{ display: 'block', 'margin-bottom': '8px' }}>API URL</label>
        <input value={apiBase()} onInput={e => setApiBase(e.currentTarget.value)} placeholder="http://localhost:8081" style={{ width: '100%', padding: '8px', 'margin-bottom': '12px', 'box-sizing': 'border-box' }} />
        <button type="submit" style={{ padding: '8px 16px' }}>Greet</button>
      </form>
      {error() && <p style={{ color: '#c00' }}>Error: {error()}</p>}
      {result() != null && <pre style={{ background: '#f0f0f0', padding: '16px', 'border-radius': '4px', 'white-space': 'pre-wrap' }}>{result()}</pre>}
    </div>
  )
}
