import api from '@/api/index'

export async function createCustomer(customer) {
  const response = await api.post('/customers', customer)
  return response.data
}

export async function getCustomers() {
  const response = await api.get('/customers')
  return response.data
}

export async function getCustomer(customerNumber) {
  const response = await api.get(`/customers/${customerNumber}`)
  return response.data
}

export async function updateCustomer(customerNumber, customer) {
  const response = await api.put(`/customers/${customerNumber}`, customer)
  return response.data
}

export async function deleteCustomer(customerNumber) {
  const response = await api.delete(`/customers/${customerNumber}`)
  return response.data
}
