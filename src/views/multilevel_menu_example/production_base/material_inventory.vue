<script setup lang="ts">
import MaterialInventory from '@/components/production_base/MaterialInventory.vue'

defineOptions({
  name: 'MaterialInventoryView',
})
</script>

<template>
  <div>
    <MaterialInventory />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
