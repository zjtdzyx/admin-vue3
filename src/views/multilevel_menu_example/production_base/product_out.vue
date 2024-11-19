<script setup lang="ts">
import ProductOut from '@/components/production_base/ProductOut.vue'

defineOptions({
  name: 'ProductionBaseProductOutView',
})
</script>

<template>
  <div>
    <h1>产品出库</h1>
    <ProductOut />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
