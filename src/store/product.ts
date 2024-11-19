import { createProduct, deleteProduct, fetchProductInfo, updateProduct } from '@/api/product'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadProducts() {
      this.products = await fetchProductInfo()
    },
    async addProduct(product) {
      const newProduct = await createProduct(product)
      this.products.push(newProduct)
    },
    async editProduct(product) {
      const updatedProduct = await updateProduct(product)
      const index = this.products.findIndex(p => p.id === product.id)
      if (index !== -1) {
        this.products[index] = updatedProduct
      }
    },
    async removeProduct(productId) {
      await deleteProduct(productId)
      this.products = this.products.filter(p => p.id !== productId)
    },
  },
})
