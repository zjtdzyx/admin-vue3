<script setup lang="ts">
import ProductIn from '@/components/production_base/ProductIn.vue'

defineOptions({
  name: 'ProductionBaseProductInView',
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
