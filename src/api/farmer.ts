import api from '@/api/index'

export async function createFarmer(farmer) {
  const response = await api.post('/farmers', farmer)
  return response.data
}

export async function getFarmer(farmerNumber) {
  const response = await api.get(`/farmers/${farmerNumber}`)
  return response.data
}

export async function updateFarmer(farmerNumber, farmer) {
  const response = await api.put(`/farmers/${farmerNumber}`, farmer)
  return response.data
}

export async function deleteFarmer(farmerNumber) {
  const response = await api.delete(`/farmers/${farmerNumber}`)
  return response.data
}
