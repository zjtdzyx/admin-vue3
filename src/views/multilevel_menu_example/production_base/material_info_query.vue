<script setup lang="ts">
import MaterialInfoQuery from '@/components/production_base/MaterialInfoQuery.vue'

defineOptions({
  name: 'MaterialInfoQueryView',
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
