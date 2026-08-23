import { auth } from './firebase'

const API_BASE_URL = 'http://127.0.0.1:8000'

async function apiRequest(path, options = {}) {
  const user = auth.currentUser
  const token = user ? await user.getIdToken() : null

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Something went wrong')
  }

  return response.json()
}

export function syncUser() {
  return apiRequest('/users/me')
}

export function addDevice(deviceData) {
  return apiRequest('/devices/', {
    method: 'POST',
    body: JSON.stringify(deviceData),
  })
}

export function getDevices() {
  return apiRequest('/devices/')
}