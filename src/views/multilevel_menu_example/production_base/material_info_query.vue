<script setup lang="ts">
import ProductInventory from '@/components/production_base/MaterialInfoQuery.vue'

defineOptions({
  name: 'ProductionBaseMaterialInfoQueryView',
})
</script>

<template>
  <div>
    <MaterialInfoQuery />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
