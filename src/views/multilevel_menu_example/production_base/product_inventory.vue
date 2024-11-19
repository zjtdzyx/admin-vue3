<script setup lang="ts">
import ProductInventory from '@/components/production_base/ProductInventory.vue'

defineOptions({
  name: 'ProductionBaseProductInventoryView',
})
</script>

<template>
  <div>
    <h1>产品盘点</h1>
    <ProductInventory />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
