<script setup lang="ts">
import ProductInfo from '@/components/company/ProductInfo.vue'

defineOptions({
  name: 'ProductInfoView',
})
</script>

<template>
  <div>
    <ProductInfo />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
