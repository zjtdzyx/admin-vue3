import api from '@/api/index'

export async function createMaterial(material) {
  const response = await api.post('/materials', material)
  return response.data
}

// 获取所有物资信息
export async function getMaterials() {
  const response = await api.get('/materials')
  return response.data
}

export async function getMaterial(materialNumber) {
  const response = await api.get(`/materials/${materialNumber}`)
  return response.data
}

export async function updateMaterial(materialNumber, material) {
  const response = await api.put(`/materials/${materialNumber}`, material)
  return response.data
}

export async function deleteMaterial(materialNumber) {
  const response = await api.delete(`/materials/${materialNumber}`)
  return response.data
}
