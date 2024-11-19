import { createProduct, deleteProduct, getProduct, updateProduct } from '@/api/product'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async addProduct(product) {
      const newProduct = await createProduct(product)
      this.products.push(newProduct)
    },
    async fetchProduct(productNumber) {
      const product = await getProduct(productNumber)
      return product
    },
    async editProduct(productNumber, product) {
      const updatedProduct = await updateProduct(productNumber, product)
      const index = this.products.findIndex(p => p.productNumber === productNumber)
      if (index !== -1) {
        this.products[index] = updatedProduct
      }
    },
    async removeProduct(productNumber) {
      await deleteProduct(productNumber)
      this.products = this.products.filter(p => p.productNumber !== productNumber)
    },
  },
})
