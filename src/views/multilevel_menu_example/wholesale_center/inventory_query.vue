<script setup lang="ts">
import InventoryQuery from '@/components/wholesale_center/InventoryQuery.vue'

defineOptions({
  name: 'InventoryQueryView',
})
</script>

<template>
  <div>
    <InventoryQuery />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
