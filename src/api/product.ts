import api from '@/api/index'

export async function fetchProductInfo() {
  const response = await api.get('/products')
  return response.data
}

export async function createProduct(product) {
  const response = await api.post('/products', product)
  return response.data
}

export async function updateProduct(product) {
  const response = await api.put(`/products/${product.id}`, product)
  return response.data
}

export async function deleteProduct(productId) {
  const response = await api.delete(`/products/${productId}`)
  return response.data
}
