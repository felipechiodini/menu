<template>
  <div class="d-flex flex-column vh-100">
    <CartHeader @click="$emit('back')" />
    <div class="flex-grow-1 overflow-auto">
      <label :class="{ 'active': delivery.type === option.id }" :for="option.id" v-for="(option, key) in store.delivery_options || []" :key="key">
        <input :id="option.id" type="radio" name="option-select" :value="option.id" v-model="delivery.type" class="col-auto" />
        <span class="me-2" :class="option.icon"></span>
        <span>{{ option.name }}</span>
        <span class="ms-auto col-auto d-flex align-items-center">
          <i class="fa-regular fa-clock me-2"></i>
          <span>{{ option.time }}</span>
        </span>
      </label>
      <template v-if="hasSelectedOption">
        <div class="row border-bottom align-items-center w-100 p-1 rounded m-0 pointer" v-if="isDelivery" @click="$emit('open-address')">
          <div class="col-auto">
            <span class="fa-solid fa-location-crosshairs"></span>
          </div>
          <div class="col d-flex flex-column">
            <template v-if="address.id !== null">
              <small class="text-muted mb-1" style="font-size: 13px;">Entregar em</small>
              <strong class="mb-1">{{ address.street }}, {{ address.number }}</strong>
              <small class="text-muted mb-1" style="font-size: 13px;">{{ address.street }}</small>
            </template>
            <button class="btn" v-else @click="modalAddressOpened = true">
              Selecionar Endereço
            </button>
          </div>
          <div class="col-auto">
            <span class="fas fa-arrow-right"></span>
          </div>
        </div>
        <div class="row border-bottom align-items-center w-100 p-3 rounded m-0 pointer" v-else>
          <div class="col-auto">
            <span class="material-icons">storefront</span>
          </div>
          <div class="col d-flex flex-column">
            <h3 class="mb-1 text-bolder" style="font-size: 20px;">Retirar na loja</h3>
            <strong class="mb-1">{{ store.address.street }}, {{ store.address.number }}</strong>
            <small class="text-muted mb-1" style="font-size: 13px;">{{ store.address.district }} - {{  store.address.city }}, {{  store.address.state }}</small>
          </div>
        </div>
        <div class="p-3">
          <div class="col-12 mb-3">
            <input placeholder="Nome" class="form-control" id="name" v-model="customer.name" />
          </div>
          <div class="col-12 mb-3">
            <input placeholder="Celular" v-maska data-maska="(##) # ####-####" class="form-control" v-model="customer.cellphone" />
          </div>
          <div class="col-12 mb-3">
            <input placeholder="CPF" v-maska data-maska="###.###.###-##" class="form-control" type="tel" id="cpf" v-model="customer.cpf" />
          </div>
        </div>
      </template>
    </div>
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(cartTotalProductsPrice) }}</td>
        </tr>
        <tr v-if="delivery.type === 'delivery'">
          <td>Entrega</td>
          <td align="right">{{ currency(cartShippingPrice) || 'Aguardando endereço' }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ currency(cartTotalPrice) }}</td>
        </tr>
      </table>
      <button class="border-none bg-primary btn-add d-flex align-items-center justify-content-center" @click="$emit('next')">
        <span class="text-white me-3">Pagamento</span>
      </button>
    </div>
  <Address :open="modalAddressOpened" @update-open="e => modalAddressOpened = e" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'
import CartHeader from '@/components/Cart/Header.vue'
import Address from '@/components/Cart/Address.vue'

export default {
  name: 'step-two',
  components: {
    CartHeader,
    Address,
  },
  data: () => {
    return {
      modalAddressOpened: false,
      customer: {
        name: 'Felipe Chiodini Bona',
        cellphone: '47999097070',
        cpf: '11048424910',
      }
    }
  },
  computed: {
    ...mapState(useStore, ['store']),
    ...mapState(useCartStore, ['cartProducts', 'numberProducts', 'hasProducts', 'cartTotalPrice', 'cartTotalProductsPrice', 'cartShippingPrice', 'delivery', 'address']),
    isDelivery() {
      return this.delivery?.type === 'delivery'
    },
    hasSelectedOption() {
      return !!this.delivery?.type
    }
  },
  methods: {
    ...mapActions(useCartStore, ['setDelivery', 'setCustomer']),
    next() {
      this.setCustomer(this.customer)
      this.$emit('next-step')
    },
    selectOption(option) {
      this.setDelivery(option.id)
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

  label {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  label input[type="radio"] {
    appearance: none;
  }

  label.active {
    background-color: var(--primary);
  }

</style>
