export const BASE_URL = 'https://carenestpro.duckdns.org'

export const getAuthHeaders = () => {
  const token = localStorage.getItem('access') || ''
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}
