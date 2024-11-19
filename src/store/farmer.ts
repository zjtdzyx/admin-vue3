import { createFarmer, deleteFarmer, getFarmer, updateFarmer } from '@/api/farmer'
import { defineStore } from 'pinia'

export const useFarmerStore = defineStore('farmer', {
  state: () => ({
    farmers: [],
  }),
  actions: {
    async addFarmer(farmer) {
      const newFarmer = await createFarmer(farmer)
      this.farmers.push(newFarmer)
    },
    async fetchFarmer(farmerNumber) {
      const farmer = await getFarmer(farmerNumber)
      return farmer
    },
    async editFarmer(farmerNumber, farmer) {
      const updatedFarmer = await updateFarmer(farmerNumber, farmer)
      const index = this.farmers.findIndex(f => f.farmerNumber === farmerNumber)
      if (index !== -1) {
        this.farmers[index] = updatedFarmer
      }
    },
    async removeFarmer(farmerNumber) {
      await deleteFarmer(farmerNumber)
      this.farmers = this.farmers.filter(f => f.farmerNumber !== farmerNumber)
    },
  },
})
