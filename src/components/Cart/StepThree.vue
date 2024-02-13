<template>
  <div>
    <cart-header @go-back="$emit('go-back')" icon="arrow_back_ios" name="" />
    <label v-wave :for="`${payment.id}`" class="d-flex align-items-center pointer w-100 p-4 border-bottom" v-for="(payment, key) in store.payment_options" :key="key" @click="fawjfwioafkwioa(payment)">
      <b-form-radio :id="`${payment.id}`" size="lg" name="selected-payment" :value="payment.id" v-model="selectedPayment.id" class="col-auto" />
      <span>{{ payment.name }}</span>
    </label>
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0" style="position: fixed; bottom: 0; z-index: 2;">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ (cartTotalPrice) }}</td>
        </tr>
        <tr>
          <td>Entrega</td>
          <td align="right">{{ (5) }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ (85) }}</td>
        </tr>
      </table>
      <b-button class="border-none bg-primary btn-add" @click="finish()">
        <span class="text-white">Confirmar Pedido</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'pinia'
import CartHeader from './Header.vue'

export default {
  components: {
    CartHeader
  },
  data: () => {
    return {
      id: null
    }
  },
  computed: {
    ...mapGetters('store', ['store']),
    ...mapGetters('cart', ['cartTotalPrice', 'selectedPayment'])
  },
  methods: {
    ...mapActions('cart', ['setPayment', 'finishCart', 'clearCart']),
    fawjfwioafkwioa(payment) {
      this.setPayment(payment.id)
    },
    finish() {
      this.finishCart().then(() => {
        this.clearCart()
        this.$emit('finished')
      }).catch(() => {
        alert('error')
      })
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
    border-radius: 5px;
    height: 100px;
    width: 100px;
    object-fit: cover;
  }

  .item {
    border-radius: 5px;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

</style>