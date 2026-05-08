export default function formatFeedback(raw) {
    let data = raw
    try {
      while (typeof data === 'string') data = JSON.parse(data)
    } catch {
      return <p style={{ fontSize: 14 }}>{raw}</p>
    }
    if (!data || typeof data !== 'object') return <p>No feedback available</p>
  
    // Normalize keys: "what to fix" → "what_to_fix", "why it matters" → "why_it_matters"
    const normalize = (obj) => {
      if (Array.isArray(obj)) return obj.map(normalize)
      if (typeof obj !== 'object' || !obj) return obj
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k.trim().replace(/\s+/g, '_'), normalize(v)])
      )
    }
    data = normalize(data)
  
    const get = (key) => data[key] ?? data[key.replace(/_/g, ' ')] ?? null
  
    const Section = ({ color, label, children }) => (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                      textTransform: 'uppercase', color, marginBottom: 6 }}>
          {label}
        </div>
        {children}
      </div>
    )
  
    const Card = ({ bg, border, children }) => (
      <div style={{ background: bg, border: `0.5px solid ${border}`,
                    borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
        {children}
      </div>
    )
  
    const fixes = get('what_to_fix') ?? []
    const checks = get('self_check_questions') ?? []
    const NUMS = ['①', '②', '③', '④', '⑤']
  
    const KNOWN_KEYS = new Set([
      'what_you_got_right', 'what_to_fix', 'self_check_questions', 'next_step'
    ])
  
    const unknownEntries = Object.entries(data).filter(([k]) => !KNOWN_KEYS.has(k))
  
    const renderValue = (value) => {
      if (Array.isArray(value)) return (
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          {value.map((item, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              {typeof item === 'object' && item !== null
                ? Object.entries(item).map(([k, v]) => (
                    <div key={k}>
                      <strong>{cleanKey(k)}: </strong>
                      {typeof v === 'object' ? JSON.stringify(v) : String(v ?? '')}
                    </div>
                  ))
                : String(item ?? '')}
            </li>
          ))}
        </ul>
      )
      if (typeof value === 'object' && value !== null) return (
        <div style={{ paddingLeft: 8 }}>
          {Object.entries(value).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 4 }}>
              <strong>{cleanKey(k)}: </strong>
              {typeof v === 'object' ? JSON.stringify(v) : String(v ?? '')}
            </div>
          ))}
        </div>
      )
      return <span>{String(value ?? '')}</span>
    }
  
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 13,
                    lineHeight: 1.6, maxWidth: 680 }}>

        {
            unknownEntries.length > 0 && (
                <Card bg="#fef3c7" border="#fde68a">
                  
                    {unknownEntries.map(([k, v]) => (
                      <div key={k} style={{ marginBottom: 10 }}>
                        <strong>{cleanKey(k)}: </strong>
                        {renderValue(v)}
                      </div>
                    ))}
               
                </Card>
            )
        }
  
        {/* What you got right */}
        {get('what_you_got_right') && (
          <Card bg="#f0fdf4" border="#bbf7d0">
            <Section color="#15803d" label="What you got right">
              <p style={{ margin: 0, color: '#166534' }}>{get('what_you_got_right')}</p>
            </Section>
          </Card>
        )}
  
        {/* What to fix */}
        {fixes.length > 0 && (
          <Card bg="#fff" border="#e5e7eb">
            <Section color="#b45309" label="What to fix">
              {fixes.map((item, i) => (
                <div key={i} style={{ borderLeft: '3px solid #f59e0b',
                                      paddingLeft: 12, marginBottom: 14 }}>
                  <div style={{ fontWeight: 500, marginBottom: 3 }}>
                    {NUMS[i] ?? `${i + 1}.`} {item.issue}
                  </div>
                  {item.why_it_matters && (
                    <div style={{ color: '#6b7280', marginBottom: 4 }}>
                      <strong>Why it matters: </strong>{item.why_it_matters}
                    </div>
                  )}
                  {item.fix && (
                    <div style={{ background: '#fffbeb', borderRadius: 6,
                                  padding: '5px 10px' }}>
                      <strong>Fix: </strong>{item.fix}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          </Card>
        )}
  
        {/* Self-check + Next step side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {checks.length > 0 && (
            <Card bg="#eff6ff" border="#bfdbfe">
              <Section color="#1d4ed8" label="Self-check">
                <ul style={{ margin: 0, paddingLeft: 16, color: '#1e40af' }}>
                  {checks.map((q, i) => <li key={i} style={{ marginBottom: 5 }}>{q}</li>)}
                </ul>
              </Section>
            </Card>
          )}
          {get('next_step') && (
            <Card bg="#faf5ff" border="#e9d5ff">
              <Section color="#7e22ce" label="Next step">
                <p style={{ margin: 0, color: '#581c87' }}>{get('next_step')}</p>
              </Section>
            </Card>
          )}
        </div>
  
      </div>
    )
  }
  function cleanKey(key) {
    return key
       .replace(/_/g, ' ')
       .replace(/([A-Z])/g, ' $1')
       .replace(/^./, (s) => s.toUpperCase())
 }
 