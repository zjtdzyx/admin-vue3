<script setup lang="ts">
import FarmerInfo from '@/components/company/FarmerInfo.vue'

defineOptions({
  name: 'FarmerInfoView',
})
</script>

<template>
  <div>
    <FarmerInfo />
  </div>
</template>

<style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
</style>
