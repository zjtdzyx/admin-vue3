<script setup lang="ts">
import { useOrganizationStore } from '@/store/organization'
import { onMounted, ref } from 'vue'

const organizationStore = useOrganizationStore()
const organizationInfo = ref([])

onMounted(async () => {
  try {
    await organizationStore.loadOrganizations()
    organizationInfo.value = organizationStore.organizations
  }
  catch (error) {
    console.error('Failed to fetch organization info:', error)
  }
})
</script>

<template>
  <div>
    <h1>公司机构设置</h1>
    <ul>
      <li v-for="organization in organizationInfo" :key="organization.id">
        {{ organization.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
</style>
