import { createFarmer, deleteFarmer, fetchFarmerInfo, updateFarmer } from '@/api/farmer'
import { defineStore } from 'pinia'

export const useFarmerStore = defineStore('farmer', {
  state: () => ({
    farmers: [],
  }),
  actions: {
    async loadFarmers() {
      this.farmers = await fetchFarmerInfo()
    },
    async addFarmer(farmer) {
      const newFarmer = await createFarmer(farmer)
      this.farmers.push(newFarmer)
    },
    async editFarmer(farmer) {
      const updatedFarmer = await updateFarmer(farmer)
      const index = this.farmers.findIndex(f => f.id === farmer.id)
      if (index !== -1) {
        this.farmers[index] = updatedFarmer
      }
    },
    async removeFarmer(farmerId) {
      await deleteFarmer(farmerId)
      this.farmers = this.farmers.filter(f => f.id !== farmerId)
    },
  },
})
