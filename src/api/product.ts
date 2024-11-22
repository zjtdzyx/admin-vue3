import api from '@/api/index';

// 创建产品
export async function createProduct(product) {
  const response = await api.post('/products', product);
  return response.data;
}

// 获取所有产品信息
export async function getProducts() {
  const response = await api.get('/products')
  return response.data
}

// 获取产品信息
export async function getProduct(productNumber) {
  const response = await api.get('/products');
  return response.data;
}
// 更新产品信息
export async function updateProduct(productNumber, product) {
  const response = await api.put(`/products/${productNumber}`, product);
  return response.data;
}

// 删除产品信息
export async function deleteProduct(productNumber) {
  const response = await api.delete(`/products/${productNumber}`);
  return response.data;
}
