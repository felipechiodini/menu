<template>
  <div>
    <CartHeader @click="$emit('back')" />
    <label :for="`${option.type}`" class="d-flex align-items-center pointer w-100 p-4 border-bottom" v-for="(option, key) in store.payment_options" :key="key">
      <input type="radio" :id="`${option.type}`" name="selected-payment" :value="option.type" v-model="payment.type" class="col-auto" />
      <span>{{ option.name }}</span>
    </label>
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0" style="position: fixed; bottom: 0; z-index: 2;">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(cartTotalProducts) }}</td>
        </tr>
        <tr>
          <td>Entrega</td>
          <td align="right">{{ currency(deliveryFee) }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ currency(cartTotal) }}</td>
        </tr>
      </table>
      <button :disabled="button.disabled" class="btn border-none bg-primary btn-add" @click="$emit('next')">
        <span class="text-white">
          {{ button.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import CartHeader from '@/components/Cart/Header.vue'
import { mapState } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useStore } from '@/stores/store'

export default {
  name: 'step-three',
  components: {
    CartHeader
  },
  computed: {
    ...mapState(useStore, ['store']),
    ...mapState(useCartStore, ['cartTotalProducts', 'deliveryFee', 'cartTotal', 'payment']),
    button() {
      if (this.payment.type === null) {
        return {
          disabled: true,
          label: 'Aguardando Método de Pagamento',
        }
      } else {
        return {
          disabled: false,
          label: 'Enviar Pedido',
        }
      }
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