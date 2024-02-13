import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      price: 0,
      delivery_fee: null,
      products: 'Eduardo',
      count: 5
    }
  },
  getters: {
    cartTotalPrice: () => {
      return 10
    },
    numberProducts: () => {
      return 1
    }
  },
  actions: {
    addProduct() {
      this.count++
    },
  },
})