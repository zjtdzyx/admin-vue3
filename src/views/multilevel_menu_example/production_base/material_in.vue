<script setup lang="ts">
import MaterialIn from '@/components/production_base/MaterialIn.vue'

defineOptions({
  name: 'MaterialInView',
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
