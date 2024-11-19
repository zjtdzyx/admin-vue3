<script setup lang="ts">
import ProductInventory from '@/components/purchasing_point/ProductInventory.vue'

defineOptions({
  name: 'PurchasingPointProductInventoryView',
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
