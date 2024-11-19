<script setup lang="ts">
import ProductIn from '@/components/purchasing_point/ProductIn.vue'

defineOptions({
  name: 'PurchasingPointProductInView',
})
</script>

<template>
  <div>
    <h1>产品入库</h1>
    <ProductIn />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
