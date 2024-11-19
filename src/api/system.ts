import api from '@/api/index'

export async function fetchSystemSettings() {
  const response = await api.get('/system-settings')
  return response.data
}

export async function updateSystemSettings(settings) {
  const response = await api.put('/system-settings', settings)
  return response.data
}
