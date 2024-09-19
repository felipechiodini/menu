import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      orders: []
    }
  },
  getters: {
    hasOrders: (state) => {
      return state.orders.length > 0
    }
  },
  actions: {
    addOrder(order) {  
      this.orders.push(order)
    }
  }
  // persist: true  
})