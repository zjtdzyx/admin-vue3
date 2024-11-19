import api from '@/api/index'

export async function fetchMaterialInfo() {
  const response = await api.get('/materials')
  return response.data
}

export async function createMaterial(material) {
  const response = await api.post('/materials', material)
  return response.data
}

export async function updateMaterial(material) {
  const response = await api.put(`/materials/${material.id}`, material)
  return response.data
}

export async function deleteMaterial(materialId) {
  const response = await api.delete(`/materials/${materialId}`)
  return response.data
}
