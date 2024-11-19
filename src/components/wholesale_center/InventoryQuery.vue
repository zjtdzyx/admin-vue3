<script setup lang="ts">
import { useInventoryStore } from '@/store/inventory'
import { onMounted, ref } from 'vue'

const inventoryStore = useInventoryStore()
const inventoryInfo = ref([])

onMounted(async () => {
  try {
    await inventoryStore.loadInventory()
    inventoryInfo.value = inventoryStore.inventory
  }
  catch (error) {
    console.error('Failed to fetch inventory info:', error)
  }
})
</script>

<template>
  <div>
    <h1>产品库存查询</h1>
    <ul>
      <li v-for="item in inventoryInfo" :key="item.id">
        {{ item.name }}
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
