import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      products: [],
      delivery_fee: null,
      delivery: {
        type: 1
      },
      customer: {
        name: 'Felipe Bona',
        cellphone: '47999097073'
      },
      address: {
        street: 'Arthur Gonçalvez de Araújo',
        neighborhood: 'João Pessoa',
        city: 'Jaraguá do Sul',
        number: 500,
      },
      payment: {
        type: 3
      }
    }
  },
  getters: {
    cartTotalProductsPrice: (state) => {
      return state.products.reduce((acumulator, product) => acumulator += (product.price.to * product.count), 0)
    },
    cartTotalPrice: (state) => {
      return state.cartTotalProductsPrice + state.delivery_fee
    },
    cartProducts: (state) => {
      return state.products
    },
    deliveryFee: (state) => {
      return state.delivery_fee
    },
    numberProducts: (state) => {
      return state.products.reduce((acumulator, product) => acumulator += product.count, 0)
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
    setCustomer(payload) {
      this.customer = payload
    },
    resetCart() {
      this.products = [],
      this.delivery_fee = null,
      this.delivery = {
        type: 1
      },
      this.customer = {
        name: null,
        cellphone: null,
        document: null
      },
      this.address = {
        street: null,
        neighborhood: null,
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