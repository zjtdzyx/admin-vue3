<script setup lang="ts">
import MaterialInfo from '@/components/company/MaterialInfo.vue'

defineOptions({
  name: 'MaterialInfoView',
})
</script>

<template>
  <div>
    <h1>物资信息管理</h1>
    <MaterialInfo />
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
