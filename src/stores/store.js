import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      store: null,
    }
  },
  getters: {
  },
  actions: {
    setStore(store) {
      this.store = store
    }
  },
})