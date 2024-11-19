<script setup lang="ts">
import { useMaterialStore } from '@/store/material'
import { onMounted, ref } from 'vue'

const materialStore = useMaterialStore()
const materialInfo = ref([])

onMounted(async () => {
  try {
    await materialStore.loadMaterials()
    materialInfo.value = materialStore.materials
  }
  catch (error) {
    console.error('Failed to fetch material info:', error)
  }
})
</script>

<template>
  <div>
    <h1>物资信息查询</h1>
    <ul>
      <li v-for="material in materialInfo" :key="material.id">
        {{ material.name }}
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
