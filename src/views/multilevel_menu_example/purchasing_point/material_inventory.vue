<script setup lang="ts">
import MaterialInventory from '@/components/purchasing_point/MaterialInventory.vue'

defineOptions({
  name: 'PurchasingPointMaterialInventoryView',
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
