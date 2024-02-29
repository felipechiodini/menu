<template>
  <modal v-model="show">
    <button @click="closeModal()" class="button-rounded">
      <i class="pi pi-chevron-left"></i>
    </button>
    <div class="d-flex flex-column" v-if="modelValue !== null">
      <div class="flex-grow-1 overflow-auto">
        <img width="100%" src="https://storage.googleapis.com/intrepid-snow-169619.appspot.com/files/backend/66011019248D4F91AEDB6C5CD60F82A0-0E9B5825CD664072870992304367C312.jpeg">
        <div class="p-2">
          <h6 class="product-title">{{ modelValue.name }}</h6>
          <p class="product-description">{{ modelValue.description }}</p>
          <h6 class="my-3">Adicionais <small class="text-muted">Máximo: {{ 1 }}</small></h6>
          <div class="row w-100 align-items-center p-2 my-2 mx-0 border rounded pointer" v-for="(additional, key) in modelValue.additionals" :key="additional.id + additional.name + key" @click="inscreaseAdditional(additional)">
            <div class="col-auto p-0">
              <div class="mb-2">{{ additional.name }}</div>
              <div><span style="font-size: 14px;">+ {{ (additional.value) }}</span></div>
            </div>
            <div class="ms-auto">
              <button variant="transparent" v-if="additionalAmount(additional)" @click.stop="decreaseAdditional(additional)">-</button>
              <strong class="mx-3" v-if="additionalAmount(additional)">{{ additionalAmount(additional) }}</strong>
              <button :disabled="reachTotalAdditionals()" variant="transparent">+</button>
            </div>
          </div>
          <h6 class="my-3">Substituições <small class="text-muted">Máximo: {{ 1 }}</small></h6>
          <label
            class="d-flex w-100 align-items-center p-2 my-2 border rounded pointer"
            v-for="(replacement, key) in modelValue.replacements"
            :key="replacement.id + replacement.name + key"
            :for="`replacement-${replacement.id}`"
          >
            <div class="col-auto p-0">
              <div class="mb-2">{{ replacement.name }}</div>
              <div>+ {{ (replacement.value) }}</div>
            </div>
            <input
              type="checkbox"
              class="ms-auto p-0"
              v-model="replacements"
              :key="replacement.id + replacement.name + key"
              :value="replacement.id"
              name="replacements-options"
              @input="onInput"
              :id="`replacement-${replacement.id}`"
            />
          </label>
          <h6 class="mt-4 mb-2">Alguma Observação?</h6>
          <textarea v-model="observation" placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne, etc." rows="2" class="textarea" />
        </div>
      </div>
      
      <div class="row align-items-center border-top justify-content-around m-0 w-100 py-3 shadow bg-white" style="z-index: 1000; bottom: 0; position: sticky; left: 0;">
        <div class="col-auto">
          <button class="button" @click="decrement()">-</button>
          <span class="mx-3">{{ counter }}</span>
          <button class="button" @click="increment()">+</button>
        </div>
        <button class="border-none bg-primary btn-add rounded" @click="addToCart()">
          <span class="text-white me-4">Adicionar</span>
          <span class="text-white">{{ currency(total) }}</span>
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center h-100" v-else-if="loading === true">
      <Loading />
    </div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import { mapActions } from 'pinia'
import Loading from './Loading.vue'
import Api from '@/js/Api.js'
import Carousel from 'primevue/carousel'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'ProductPreview',
  components: {
    Modal,
    Loading,
    Carousel
  },
  props: {
    modelValue: {
      default: null
    }
  },
  data: () => {
    return {
      product: null,
      counter: 1,
      loading: false,
      opened: false,
      observation: null,
      additionals: [],
      replacements: [],
    }
  },
  computed: {
    show() {
      return this.modelValue !== null
    },
    total() {
      return (this.modelValue.price.to + this.additionalsTotal + this.replacementTotal) * this.counter
    },
    additionalsTotal() {
      return this.additionals.reduce((acumulator, additional) => acumulator += additional.price * additional.amount, 0)
    },
    replacementTotal() {
      return this.replacements.reduce((acumulator, id) => acumulator += this.modelValue.replacements.find(replacement => replacement.id === id).value, 0)
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addProductToCart']),
    addToCart() {
      this.addProductToCart({
        id: this.modelValue.id,
        name: this.modelValue.name,
        count: this.counter,
        observation: this.observation,
        price: this.modelValue.price,
        photo: this.modelValue.photo
        // additionals: this.additionals,
        // replacements: this.replacements.map(replacement => {
        //   const r = this.modelValue.replacements.find(r => r.id === replacement)

        //   return {
        //     id: replacement,
        //     price: r.value,
        //     name: r.name
        //   }
        // })
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
      Api.get(`/product/${modelValue.id}`).then(({ data }) => {
        this.product = data.product
      }).finally(() => {
        this.loading = false
      })
    },
    closeModal() {
      this.$emit('update:modelValue', null)
    },
    totalAdditionals() {
      return this.additionals.reduce((acumulator, additional) => acumulator += additional.amount, 1)
    },
    reachTotalAdditionals() {
      return false
      // return this.totalAdditionals() > this.modelValue.configuration.max_number_additionals
    },
    async onInput(newValue) {
      await this.$nextTick()
      if (newValue.length > this.modelValue.configuration.max_number_replacements) {
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
    font-size: 1.5rem;
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
    position: absolute;
    font-size: 1rem;
    top: 15px;
    left: 15px;
    border: none;
    border-radius: 50px;
    height: 40px;
    width: 40px;
    overflow: hidden;
    z-index: 5;
    color: #fff;
    background-color: var(--primary);
  }

</style>