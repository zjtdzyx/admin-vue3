import { createMaterial, deleteMaterial, fetchMaterialInfo, updateMaterial } from '@/api/material'
import { defineStore } from 'pinia'

export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: [],
  }),
  actions: {
    async loadMaterials() {
      this.materials = await fetchMaterialInfo()
    },
    async addMaterial(material) {
      const newMaterial = await createMaterial(material)
      this.materials.push(newMaterial)
    },
    async editMaterial(material) {
      const updatedMaterial = await updateMaterial(material)
      const index = this.materials.findIndex(m => m.id === material.id)
      if (index !== -1) {
        this.materials[index] = updatedMaterial
      }
    },
    async removeMaterial(materialId) {
      await deleteMaterial(materialId)
      this.materials = this.materials.filter(m => m.id !== materialId)
    },
  },
})
