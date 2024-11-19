<script setup lang="ts">
import { useFarmerStore } from '@/store/farmer'
import { onMounted, ref } from 'vue'

const farmerStore = useFarmerStore()
const farmerInfo = ref([])

onMounted(async () => {
  try {
    await farmerStore.loadFarmers()
    farmerInfo.value = farmerStore.farmers
  }
  catch (error) {
    console.error('Failed to fetch farmer info:', error)
  }
})
</script>

<template>
  <div>
    <h1>农户信息管理</h1>
    <ul>
      <li v-for="farmer in farmerInfo" :key="farmer.farmerNumber">
        {{ farmer.name }}
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
