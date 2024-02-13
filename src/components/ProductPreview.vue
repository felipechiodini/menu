<template>
  
</template>

<script>


export default {
  name: 'ProductPreview',
  components: {
    FloatButton,
    Modal,
    Loading
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  model: {
    props: 'product'
  },
  data: () => {
    return {
      
    }
  },
  computed: {
    total() {
      return (this.product.price.current + this.additionalsTotal + this.replacementTotal) * this.counter
    },
    additionalsTotal() {
      return this.additionals.reduce((acumulator, additional) => acumulator += additional.price * additional.amount, 0)
    },
    replacementTotal() {
      return this.replacements.reduce((acumulator, id) => acumulator += this.product.replacements.find(replacement => replacement.id === id).value, 0)
    }
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    addToCart() {
      this.addProductToCart({
        id: this.product.id,
        count: this.counter,
        observation: this.observation,
        additionals: this.additionals,
        replacements: this.replacements.map(replacement => {
          const r = this.product.replacements.find(r => r.id === replacement)

          return {
            id: replacement,
            price: r.value,
            name: r.name
          }
        })
      })

      this.closeModal()
    },
    increment() {
      this.counter++
    },
    decrement() {
      if (this.counter === 1) return
      this.counter--
    },
    inscreaseAdditional(additional) {
      if (this.reachTotalAdditionals()) {
        return
      }

      const current = this.additionals.find(item => item.id === additional.id)

      if (current !== undefined) {
        current.amount++
      } else {
        this.additionals.push({ id: additional.id, price: additional.value, amount: 1, name: additional.name })
      }
    },
    decreaseAdditional(additional) {
      const current = this.additionals.find(item => item.id === additional.id)
      current.amount--
    },
    additionalAmount(additional) {
      return this.additionals.find(item => item.id === additional.id)?.amount ?? 0
    },
    addOrRemoveReplacement(replacement) {
      const current = this.replacements.find(item => item.id === replacement.id)

      if (current === undefined) {
        this.replacements.push({ id: replacement.id, price: replacement.value })
      } else {
        this.replacements = this.replacements.filter(i => i.id !== replacement.id)
      }
    },
    openModal(product) {
      this.opened = true
      this.loading = true
      Api.get(`/product/${product.id}`).then(({ data }) => {
        this.product = data.product
      }).finally(() => {
        this.loading = false
      })
    },
    closeModal() {
      this.opened = false
      this.product = null,
      this.counter = 1,
      this.loading = false,
      this.opened = false,
      this.observation = null,
      this.additionals = [],
      this.replacements = []
    },
    totalAdditionals() {
      return this.additionals.reduce((acumulator, additional) => acumulator += additional.amount, 1)
    },
    reachTotalAdditionals() {
      return this.totalAdditionals() > this.product.configuration.max_number_additionals
    },
    async onInput(newValue) {
      await this.$nextTick()
      if (newValue.length > this.product.configuration.max_number_replacements) {
        this.replacements.pop()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .textarea {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #575757;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3rem;
    letter-spacing: 0.7px;
  }

  .btn-add {
    width: 200px;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

  .product-title {
    color: #161616;
    font-size: 2.2rem;
    margin: 5px 0 15px 0;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .product-description {
    color: #575757;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3rem;
    letter-spacing: 0.7px;
  }

  .button-rounded {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    font-size: 1.6rem;
    top: 15px;
    left: 15px;
    border: none;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    overflow: hidden;
    z-index: 2;
    color: #fff;
  }

</style>
