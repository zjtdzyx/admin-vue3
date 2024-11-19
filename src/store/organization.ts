import { createOrganization, deleteOrganization, getOrganization, updateOrganization } from '@/api/organization'
import { defineStore } from 'pinia'

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizations: [],
  }),
  actions: {
    async addOrganization(organization) {
      const newOrganization = await createOrganization(organization)
      this.organizations.push(newOrganization)
    },
    async fetchOrganization(organizationName) {
      const organization = await getOrganization(organizationName)
      return organization
    },
    async editOrganization(organizationName, organization) {
      const updatedOrganization = await updateOrganization(organizationName, organization)
      const index = this.organizations.findIndex(o => o.organizationName === organizationName)
      if (index !== -1) {
        this.organizations[index] = updatedOrganization
      }
    },
    async removeOrganization(organizationName) {
      await deleteOrganization(organizationName)
      this.organizations = this.organizations.filter(o => o.organizationName !== organizationName)
    },
  },
})
