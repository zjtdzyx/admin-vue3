import api from '@/api/index'

export async function fetchCustomerInfo() {
  const response = await api.get('/customers')
  return response.data
}

export async function createCustomer(customer) {
  const response = await api.post('/customers', customer)
  return response.data
}

export async function updateCustomer(customer) {
  const response = await api.put(`/customers/${customer.id}`, customer)
  return response.data
}

export async function deleteCustomer(customerId) {
  const response = await api.delete(`/customers/${customerId}`)
  return response.data
}
