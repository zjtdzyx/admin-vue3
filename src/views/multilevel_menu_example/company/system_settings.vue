<script setup lang="ts">
import SystemSettings from '@/components/company/SystemSettings.vue'

defineOptions({
  name: 'SystemSettingsView',
})
</script>

<template>
  <div>
    <SystemSettings />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
