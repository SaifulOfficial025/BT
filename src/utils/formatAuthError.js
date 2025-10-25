export default function formatAuthError(result) {
  if (!result) return 'Login failed. Please try again.'

  const payload = result.payload
  const err = result.error

  // If backend returned a structured payload (rejectWithValue)
  if (payload) {
    // simple string
    if (typeof payload === 'string') return payload

    // common DRF shape: { detail: '...' }
    if (payload.detail) return String(payload.detail)

    // custom error
    if (payload.error) return String(payload.error)

    // validation errors object e.g. { email: ['...'], password: ['...'] }
    if (typeof payload === 'object') {
      const messages = []
      for (const key of Object.keys(payload)) {
        const v = payload[key]
        if (Array.isArray(v)) messages.push(`${key}: ${v.join(' ')}`)
        else if (typeof v === 'string') messages.push(`${key}: ${v}`)
        else messages.push(`${key}: ${JSON.stringify(v)}`)
      }
      if (messages.length) return messages.join(' | ')
    }

    // fallback to JSON
    try {
      return JSON.stringify(payload)
    } catch {
      // ignore
    }
  }

  // If createAsyncThunk produced an error object
  if (err) {
    if (err.message) return String(err.message)
    try {
      return JSON.stringify(err)
    } catch {
      // ignore
    }
  }

  return 'Login failed. Please try again.'
}
