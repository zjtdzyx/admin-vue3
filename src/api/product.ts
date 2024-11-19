import api from '@/api/index'

export async function createProduct(product) {
  const response = await api.post('/products', product)
  return response.data
}

export async function getProduct(productNumber) {
  const response = await api.get(`/products/${productNumber}`)
  return response.data
}

export async function updateProduct(productNumber, product) {
  const response = await api.put(`/products/${productNumber}`, product)
  return response.data
}

export async function deleteProduct(productNumber) {
  const response = await api.delete(`/products/${productNumber}`)
  return response.data
}
