<script setup lang="ts">
import ProductInventory from '@/components/wholesale_center/ProductInventory.vue'

defineOptions({
  name: 'ProductInventoryView',
})
</script>

<template>
  <div>
    <h1>产品盘存</h1>
    <ProductInventory />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
