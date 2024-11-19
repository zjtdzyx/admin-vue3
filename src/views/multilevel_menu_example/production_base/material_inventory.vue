<script setup lang="ts">
import MaterialInventory from '@/components/production_base/MaterialInventory.vue'

defineOptions({
  name: 'MaterialInventoryView',
})
</script>

<template>
  <div>
    <h1>物资盘点</h1>
    <MaterialInventory />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
