<script setup lang="ts">
import { useCustomerStore } from '@/store/customer'
import { onMounted, ref } from 'vue'

const customerStore = useCustomerStore()
const customerInfo = ref([])

onMounted(async () => {
  try {
    await customerStore.loadCustomers()
    customerInfo.value = customerStore.customers
  }
  catch (error) {
    console.error('Failed to fetch customer info:', error)
  }
})
</script>

<template>
  <div>
    <h1>顾客信息管理</h1>
    <ul>
      <li v-for="customer in customerInfo" :key="customer.customerNumber">
        {{ customer.name }}
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
