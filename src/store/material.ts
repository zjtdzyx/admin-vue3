import { createMaterial, deleteMaterial, getMaterial, updateMaterial } from '@/api/material'
import { defineStore } from 'pinia'

export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: [],
  }),
  actions: {
    async addMaterial(material) {
      const newMaterial = await createMaterial(material)
      this.materials.push(newMaterial)
    },
    async fetchMaterial(materialNumber) {
      const material = await getMaterial(materialNumber)
      return material
    },
    async editMaterial(materialNumber, material) {
      const updatedMaterial = await updateMaterial(materialNumber, material)
      const index = this.materials.findIndex(m => m.materialNumber === materialNumber)
      if (index !== -1) {
        this.materials[index] = updatedMaterial
      }
    },
    async removeMaterial(materialNumber) {
      await deleteMaterial(materialNumber)
      this.materials = this.materials.filter(m => m.materialNumber !== materialNumber)
    },
  },
})
