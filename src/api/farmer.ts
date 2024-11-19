import api from '@/api/index'

export async function fetchFarmerInfo() {
  const response = await api.get('/farmers')
  return response.data
}

export async function createFarmer(farmer) {
  const response = await api.post('/farmers', farmer)
  return response.data
}

export async function updateFarmer(farmer) {
  const response = await api.put(`/farmers/${farmer.id}`, farmer)
  return response.data
}

export async function deleteFarmer(farmerId) {
  const response = await api.delete(`/farmers/${farmerId}`)
  return response.data
}
