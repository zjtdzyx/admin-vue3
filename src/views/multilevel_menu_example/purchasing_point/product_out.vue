<script setup lang="ts">
import ProductOut from '@/components/purchasing_point/ProductOut.vue'

defineOptions({
  name: 'PurchasingPointProductOutView',
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
