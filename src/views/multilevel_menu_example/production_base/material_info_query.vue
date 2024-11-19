<script setup lang="ts">
import MaterialInfoQuery from '@/components/production_base/MaterialInfoQuery.vue'

defineOptions({
  name: 'MaterialInfoQueryView',
})
</script>

<template>
  <div>
    <h1>物资信息查询</h1>
    <MaterialInfoQuery />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
