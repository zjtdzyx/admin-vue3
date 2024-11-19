<script setup lang="ts">
import SalesManagement from '@/components/wholesale_center/SalesManagement.vue'

defineOptions({
  name: 'SalesManagementView',
})
</script>

<template>
  <div>
    <h1>销售单管理</h1>
    <SalesManagement />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
