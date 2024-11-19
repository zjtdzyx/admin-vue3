import api from '@/api/index'

export async function fetchOrganizationInfo() {
  const response = await api.get('/organizations')
  return response.data
}

export async function createOrganization(organization) {
  const response = await api.post('/organizations', organization)
  return response.data
}

export async function updateOrganization(organization) {
  const response = await api.put(`/organizations/${organization.id}`, organization)
  return response.data
}

export async function deleteOrganization(organizationId) {
  const response = await api.delete(`/organizations/${organizationId}`)
  return response.data
}
