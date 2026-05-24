export default function parseData(raw) {
  let data = raw
  try {
    while (typeof data === 'string') data = JSON.parse(data)
  } catch {
    return null
  }
  if (!data || typeof data !== 'object') return null

  const normalize = (obj) => {
    if (Array.isArray(obj)) return obj.map(normalize)
    if (typeof obj !== 'object' || !obj) return obj
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.trim().replace(/\s+/g, '_'), normalize(v)])
    )
  }
  return normalize(data)
}

