<script setup lang="ts">
import { useProductionPlanStore } from '@/store/productionPlan'
import { onMounted, ref } from 'vue'

const productionPlanStore = useProductionPlanStore()
const productionPlanInfo = ref([])

onMounted(async () => {
  try {
    await productionPlanStore.loadProductionPlans()
    productionPlanInfo.value = productionPlanStore.productionPlans
  }
  catch (error) {
    console.error('Failed to fetch production plan info:', error)
  }
})
</script>

<template>
  <div>
    <h1>生产计划查询</h1>
    <ul>
      <li v-for="plan in productionPlanInfo" :key="plan.id">
        {{ plan.name }}
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
