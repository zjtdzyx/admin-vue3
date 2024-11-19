import { createOrganization, deleteOrganization, fetchOrganizationInfo, updateOrganization } from '@/api/organization'
import { defineStore } from 'pinia'

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizations: [],
  }),
  actions: {
    async loadOrganizations() {
      this.organizations = await fetchOrganizationInfo()
    },
    async addOrganization(organization) {
      const newOrganization = await createOrganization(organization)
      this.organizations.push(newOrganization)
    },
    async editOrganization(organization) {
      const updatedOrganization = await updateOrganization(organization)
      const index = this.organizations.findIndex(o => o.id === organization.id)
      if (index !== -1) {
        this.organizations[index] = updatedOrganization
      }
    },
    async removeOrganization(organizationId) {
      await deleteOrganization(organizationId)
      this.organizations = this.organizations.filter(o => o.id !== organizationId)
    },
  },
})
