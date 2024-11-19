<script setup lang="ts">
import ProductInventory from '@/components/wholesale_center/ProductInventory.vue'

defineOptions({
  name: 'ProductInventoryView',
})
</script>

<template>
  <div>
    <ProductInventory />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
