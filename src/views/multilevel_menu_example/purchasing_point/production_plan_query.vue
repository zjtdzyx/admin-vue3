<script setup lang="ts">
import ProductionPlanQuery from '@/components/purchasing_point/ProductionPlanQuery.vue'

defineOptions({
  name: 'PurchasingPointProductionPlanQueryView',
})
</script>

<template>
  <div>
    <ProductionPlanQuery />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
