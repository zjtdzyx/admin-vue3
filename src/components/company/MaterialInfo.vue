<script setup lang="ts">
import { useProductStore } from '@/store/product'
import { onMounted, ref } from 'vue'

const productStore = useProductStore()
const productInfo = ref([])

onMounted(async () => {
  try {
    await productStore.loadProducts()
    productInfo.value = productStore.products
  }
  catch (error) {
    console.error('Failed to fetch product info:', error)
  }
})
</script>

<template>
  <div>
    <h1>产品信息管理</h1>
    <ul>
      <li v-for="product in productInfo" :key="product.id">
        {{ product.name }}
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
