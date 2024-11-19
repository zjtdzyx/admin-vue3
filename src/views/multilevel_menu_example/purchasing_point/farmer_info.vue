<script setup lang="ts">
import FarmerInfo from '@/components/purchasing_point/FarmerInfo.vue'

defineOptions({
  name: 'PurchasingPointFarmerInfoView',
})
</script>

<template>
  <div>
    <h1>农户信息管理</h1>
    <FarmerInfo />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
