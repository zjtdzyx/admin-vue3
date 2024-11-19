<script setup lang="ts">
import MaterialOut from '@/components/purchasing_point/MaterialOut.vue'

defineOptions({
  name: 'PurchasingPointMaterialOutView',
})
</script>

<template>
  <div>
    <h1>物资出库</h1>
    <MaterialOut />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
