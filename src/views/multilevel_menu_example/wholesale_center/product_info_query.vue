<script setup lang="ts">
import ProductionInfoQuery from '@/components/wholesale_center/ProductionInfoQuery.vue'

defineOptions({
  name: 'ProductionInfoQueryView',
})
</script>

<template>
  <div>
    <ProductionInfoQuery />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
