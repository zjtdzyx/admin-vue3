<script setup lang="ts">
import { useSalesStore } from '@/store/sales'
import { onMounted, ref } from 'vue'

const salesStore = useSalesStore()
const salesInfo = ref([])

onMounted(async () => {
  try {
    await salesStore.loadSales()
    salesInfo.value = salesStore.sales
  }
  catch (error) {
    console.error('Failed to fetch sales info:', error)
  }
})
</script>

<template>
  <div>
    <h1>销售单管理</h1>
    <ul>
      <li v-for="sale in salesInfo" :key="sale.id">
        {{ sale.name }}
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
