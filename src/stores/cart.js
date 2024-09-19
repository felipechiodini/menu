import { defineStore } from 'pinia'
import { useStore } from './store'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      products: [],
      delivery: {
        type: null
      },
      customer: {
        name: null,
        cellphone: null
      },
      address: {
        neighborhood_id: null,
        street: null,
        city: null,
        number: null,
      },
      payment: {
        type: null
      }
    }
  },
  getters: {
    cartProductsValueAggregated: (state) => {
      return state.products.reduce((acumulator, product) => {
        const { store } = useStore()
        const rootProduct = store.products.find(storeProduct => storeProduct.id === product.id)

        acumulator += (rootProduct.price * product.count)
        return acumulator
      }, 0)
    },
    deliveryFee: (state) => {
      return state.neighborhood?.price || null
    },
    neighborhood(state) {
      if (state.address.neighborhood_id) {
        const store = useStore()
        return store.store.neighborhood_options.find(neighborhood => neighborhood.id === state.address.neighborhood_id)
      }

      return null
    },
    cartProducts: (state) => {
      return state.products.map(product => {
        const { store } = useStore()
        const rootProduct = store.products.find(storeProduct => storeProduct.id === product.id)

        return {
          id: product.id,
          name: rootProduct.name,
          image: rootProduct.image,
          count: product.count,
          price: rootProduct.price
        }
      })
    },
    numberProducts: (state) => {
      return state.products.length
    },
    hasProducts: (state) => {
      return state.numberProducts > 0
    },
  },
  actions: {
    addProductToCart(payload) {
      const product = this.products.find(product => product.id === payload.id)

      if (product) {
        this.incrementProduct(payload.id, payload.count)
      } else {
        this.products.push(payload)
      }
    },
    incrementProduct(id, count = 1) {
      this.products.find(product => product.id === id).count += count
    },
    decrementProduct(id, count = 1) {
      const product = this.products.find(product => product.id === id)

      if (product.count === 1) {
        this.removeFromCart(id)
      } else {
        product.count -= count
      }
    },
    removeFromCart(id) {
      this.products = this.products.filter(product => product.id !== id)
    },
    setDelivery(id) {
      this.delivery.id = id
    },
    resetCart() {
      this.products = [],
      this.delivery = {
        type: null
      },
      this.customer = {
        name: null,
        cellphone: null
      },
      this.address = {
        neighborhood_id: null,
        street: null,
        city: null,
        number: null,
      },
      this.payment = {
        type: null
      }
    }
  },
  // persist: true  
})