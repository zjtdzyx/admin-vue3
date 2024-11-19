import { fetchSystemSettings, updateSystemSettings } from '@/api/system'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => ({
    settings: [],
  }),
  actions: {
    async loadSystemSettings() {
      this.settings = await fetchSystemSettings()
    },
    async saveSystemSettings(settings) {
      const updatedSettings = await updateSystemSettings(settings)
      this.settings = updatedSettings
    },
  },
})
