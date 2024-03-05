import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
        orders: []
    }
  },
  getters: {
    
  },
  actions: {

  }
  // persist: true  
})