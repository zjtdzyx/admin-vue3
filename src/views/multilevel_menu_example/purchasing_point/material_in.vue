<script setup lang="ts">
import MaterialIn from '@/components/purchasing_point/MaterialIn.vue'

defineOptions({
  name: 'PurchasingPointMaterialInView',
})
</script>

<template>
  <div>
    <h1>物资入库</h1>
    <MaterialIn />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
