import { createCustomer, deleteCustomer, fetchCustomerInfo, updateCustomer } from '@/api/customer'
import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
  }),
  actions: {
    async loadCustomers() {
      this.customers = await fetchCustomerInfo()
    },
    async addCustomer(customer) {
      const newCustomer = await createCustomer(customer)
      this.customers.push(newCustomer)
    },
    async editCustomer(customer) {
      const updatedCustomer = await updateCustomer(customer)
      const index = this.customers.findIndex(c => c.id === customer.id)
      if (index !== -1) {
        this.customers[index] = updatedCustomer
      }
    },
    async removeCustomer(customerId) {
      await deleteCustomer(customerId)
      this.customers = this.customers.filter(c => c.id !== customerId)
    },
  },
})
