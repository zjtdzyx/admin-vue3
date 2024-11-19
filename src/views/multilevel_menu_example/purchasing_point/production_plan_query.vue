<script setup lang="ts">
import ProductionPlanQuery from '@/components/purchasing_point/ProductionPlanQuery.vue'

defineOptions({
  name: 'PurchasingPointProductionPlanQueryView',
})
</script>

<template>
  <div>
    <h1>生产计划查询</h1>
    <ProductionPlanQuery />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
