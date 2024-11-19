import { createCustomer, deleteCustomer, getCustomer, updateCustomer } from '@/api/customer'
import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
  }),
  actions: {
    async addCustomer(customer) {
      const newCustomer = await createCustomer(customer)
      this.customers.push(newCustomer)
    },
    async fetchCustomer(customerNumber) {
      const customer = await getCustomer(customerNumber)
      return customer
    },
    async editCustomer(customerNumber, customer) {
      const updatedCustomer = await updateCustomer(customerNumber, customer)
      const index = this.customers.findIndex(c => c.customerNumber === customerNumber)
      if (index !== -1) {
        this.customers[index] = updatedCustomer
      }
    },
    async removeCustomer(customerNumber) {
      await deleteCustomer(customerNumber)
      this.customers = this.customers.filter(c => c.customerNumber !== customerNumber)
    },
  },
})
