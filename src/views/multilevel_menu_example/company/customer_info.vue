<script setup lang="ts">
import CustomerInfo from '@/components/company/CustomerInfo.vue'

defineOptions({
  name: 'CustomerInfoView',
})
</script>

<template>
  <div>
    <CustomerInfo />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
