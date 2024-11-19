<script setup lang="ts">
import ProductInventory from '@/components/purchasing_point/ProductInventory.vue'

defineOptions({
  name: 'PurchasingPointProductInventoryView',
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
