<script setup lang="ts">
import FarmerInfo from '@/components/purchasing_point/FarmerInfo.vue'

defineOptions({
  name: 'PurchasingPointFarmerInfoView',
})
</script>

<template>
  <div>
    <FarmerInfo />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
