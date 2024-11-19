<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { onMounted, ref } from 'vue'

const systemStore = useSystemStore()
const systemSettings = ref([])

onMounted(async () => {
  try {
    await systemStore.loadSystemSettings()
    systemSettings.value = systemStore.settings
  }
  catch (error) {
    console.error('Failed to fetch system settings:', error)
  }
})
</script>

<template>
  <div>
    <h1>系统设置</h1>
    <ul>
      <li v-for="setting in systemSettings" :key="setting.id">
        {{ setting.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
</style>
