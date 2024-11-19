<script setup lang="ts">
import ProductInventory from '@/components/production_base/ProductInventory.vue'

defineOptions({
  name: 'ProductionBaseProductInventoryView',
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
