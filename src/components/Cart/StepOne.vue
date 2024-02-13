<template>
  <div>
    <cart-header @go-back="$emit('go-back')" icon="arrow_forward_ios" name="" :down="true" />
    <div style="height: 95%; overflow: auto;">
      <div  class="row m-0 p-4 border-bottom" v-for="(product, key) in cartProducts" :key="key" >
        <img class="image rounded" :src="product.photo.src">
        <div class="col px-2">
          <h5 class="mb-3 title">{{ product.name }}</h5>
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
          <span class="title">{{ (product.price.current) }}</span>
        </div>
        <div class="col-auto p-0 align-self-end d-flex align-items-center justify-content-center p-1 border rounded">
          <b-button variant="transparent" class="d-flex p-0" @click="decrementProduct(product.id)">
            <span v-if="product.count > 1" class="material-icons text-primary">remove</span>
            <span v-else class="material-icons text-primary">delete</span>
          </b-button>
          <strong class="mx-4">{{ product.count }}</strong>
          <b-button variant="transparent" class="d-flex p-0" @click="incrementProduct(product.id)">
            <span class="material-icons text-primary">add</span>
          </b-button>
        </div>
      </div>
      <div class="w-100 p-3 shadow d-flex flex-column justify-content-cent bg-white" style="position: sticky; bottom: 0; left: 0; z-index: 2;" >
        <table class="mb-3 mt-1 w-100">
          <tr>
            <td class="p-1">Total</td>
            <td class="p-1" align="right">{{ (cartTotalPrice) }}</td>
          </tr>
        </table>
        <b-button variant="primary" @click="$emit('next-step')">
          Continuar
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import FloatButton from '@/components/FloatButton.vue'
import CartHeader from './Header.vue'
import { mapActions } from 'pinia'

export default {
  components: {
    FloatButton,
    CartHeader
  },
  computed: {
    // ...mapGetters('cart', ['cartProducts', 'numberProducts', 'hasProducts', 'cartTotalPrice'])
  },
  methods: {
    // ...mapActions('cart', ['decrementProduct', 'incrementProduct'])
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
