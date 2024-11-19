<script setup lang="ts">
import CustomerInfo from '@/components/company/CustomerInfo.vue'

defineOptions({
  name: 'CustomerInfoView',
})
</script>

<template>
  <div>
    <h1>Customer Info</h1>
    <CustomerInfo />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
