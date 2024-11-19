<script setup lang="ts">
import ProductionPlanQuery from '@/components/production_base/ProductionPlanQuery.vue'

defineOptions({
  name: 'ProductionPlanQueryView',
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
