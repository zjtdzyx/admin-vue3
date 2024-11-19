import api from '@/api/index'

export async function createOrganization(organization) {
  const response = await api.post('/organizations', organization)
  return response.data
}

export async function getOrganization(organizationName) {
  const response = await api.get(`/organizations/${organizationName}`)
  return response.data
}

export async function updateOrganization(organizationName, organization) {
  const response = await api.put(`/organizations/${organizationName}`, organization)
  return response.data
}

export async function deleteOrganization(organizationName) {
  const response = await api.delete(`/organizations/${organizationName}`)
  return response.data
}
