<script setup lang="ts">
import InventoryQuery from '@/components/wholesale_center/InventoryQuery.vue'

defineOptions({
  name: 'InventoryQueryView',
})
</script>

<template>
  <div>
    <h1>产品库存查询</h1>
    <InventoryQuery />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
