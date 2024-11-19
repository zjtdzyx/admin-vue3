<script setup lang="ts">
import MaterialOut from '@/components/production_base/MaterialOut.vue'

defineOptions({
  name: 'MaterialOutView',
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
