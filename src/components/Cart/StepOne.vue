<template>
  <div class="d-flex flex-column content-size">
    <CartHeader @click="$emit('back')" />
    <div class="flex-grow-1 overflow-auto">
      <div class="d-flex m-0 p-3 border-bottom" @click="$emit('open-preview', product.id)" v-for="(product, key) in products" :key="key">
        <img class="image rounded" :src="product.photo.src">
        <div class="col px-2">
          <h6 class="mb-3 title">{{ product.name }}</h6>
          <template v-if="product.additionals">
            <div v-for="additional in product.additionals" :key="additional.name">
              <span>{{ additional.amount }}x {{ additional.name }}</span>
            </div>
          </template>
          <template v-if="product.replacements">
            <div v-for="(replacement, key) in product.replacements" :key="key">
              <span>{{ replacement.name }}</span>
            </div>
          </template>
          <span class="title">{{ currency(calculateTotal(product)) }}</span>
        </div>
        <div class="col-auto ms-auto p-0 align-self-end d-flex align-items-center justify-content-center p-1 border rounded">
          <button class="btn" @click="localDecrement(product.id)">
            <span v-if="product.count === 1" class="pi pi-trash"></span>
            <span v-else>-</span>
          </button>
          <strong class="mx-4">{{ product.count }}</strong>
          <button class="btn" @click="incrementProduct(product.id)">
            +
          </button>
        </div>
      </div>
    </div>
    <div class="w-100 p-3 shadow-lg d-flex flex-column justify-content-cent bg-white border-top">
      <table class="mb-3 mt-1 w-100">
        <tr>
          <td class="p-1">Total</td>
          <td class="p-1" align="right">{{ currency(cartTotal) }}</td>
        </tr>
      </table>
      <div class="d-flex justify-content-between gap-2">
        <button class="btn btn-primary text-white w-100" @click="$emit('back')">
          Pedir Mais
        </button>
        <button class="btn btn-primary text-white w-100" @click="$emit('next')">
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CartHeader from './Header.vue'
import { mapActions, mapState } from 'pinia'
import { useCartStore } from '@/stores/cart';

export default {
  name: 'step-one',
  components: {
    CartHeader
  },
  computed: {
    ...mapState(useCartStore, ['products', 'numberProducts', 'hasProducts', 'cartTotal'])
  },
  methods: {
    ...mapActions(useCartStore, ['decrementProduct', 'incrementProduct']),
    localDecrement(id) {
      this.decrementProduct(id)

      if (this.numberProducts === 0) {
        this.$emit('back') // close modal
      }
    },
    calculateTotal(product) {
      return product.price.to * product.count
    }
  }
}
</script>

<style lang="scss" scoped>

  .resume-table {
    width: 90%;
    font-size: 13px;
    margin-bottom: 7px;

    & td {
      padding: 6px 0;
    }

    & .total {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .image {
    height: 85px;
    width: 85px;
    object-fit: cover;
  }

  .item {
    border-radius: 5px;
  }

  .title {
    font-size: 1.1rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

</style>
