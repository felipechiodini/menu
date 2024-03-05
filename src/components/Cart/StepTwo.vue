<template>
  <div class="d-flex flex-column vh-100">
    <CartHeader @click="$emit('back')" />
    <div class="flex-grow-1 overflow-auto">
      <label :class="{ 'active': delivery.type === option.type }" :for="option.type" v-for="(option, key) in store.delivery_options" :key="key">
        <input :id="option.type" type="radio" name="option-select" :value="option.type" v-model="delivery.type" class="col-auto" />
        <span class="me-2" :class="option.icon"></span>
        <span>{{ option.name }}</span>
        <span class="ms-auto col-auto d-flex align-items-center">
          <i class="fa-regular fa-clock me-2"></i>
          <span>{{ option.minutes }}</span>
        </span>
      </label>
      <template v-if="hasSelectedOption">
        <div class="row border-bottom align-items-center w-100 p-1 rounded mt-4 m-0 pointer" v-if="isDelivery" @click="$emit('open-address')">
          <div class="col-auto">
            <span class="fa-solid fa-location-crosshairs"></span>
          </div>
          <div class="col d-flex flex-column">
            <template v-if="address.neighborhood_id !== null">
              <small class="text-muted mb-1" style="font-size: 13px;">Entregar em</small>
              <strong class="mb-1">{{ address.street }}, {{ address.number }}</strong>
              <small class="text-muted mb-1" style="font-size: 13px;">{{ neighborhood.name }}</small>
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
            <span class="fa-solid fa-store"></span>
          </div>
          <div class="col d-flex flex-column">
            <span>Retirar na loja</span>
            <strong class="mb-1">{{ store.address.street }}, {{ store.address.number }}</strong>
            <small class="text-muted mb-1" style="font-size: 13px;">
              {{ store.address.neighborhood }}, {{  store.address.city }}
            </small>
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
            <input placeholder="CPF (opcional)" v-maska data-maska="###.###.###-##" class="form-control" type="tel" id="cpf" v-model="customer.cpf" />
          </div>
        </div>
      </template>
    </div>
    <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0">
      <table class="resume-table">
        <tr>
          <td>Subtotal</td>
          <td align="right">{{ currency(cartTotalProducts) }}</td>
        </tr>
        <tr v-if="delivery.type === 1">
          <td>Taxa de Entrega</td>
          <td align="right">{{ deliveryFee ? currency(deliveryFee) : 'Aguardando endereço' }}</td>
        </tr>
        <tr class="border-top">
          <td>Total</td>
          <td class="total" align="right">{{ deliveryFee ? currency(cartTotal) : 'Aguardando endereço' }}</td>
        </tr>
      </table>
      <div>
        <button class="btn btn-primary w-100" @click="$emit('next')">
          <span class="text-white me-3">
            {{ button.label }}
          </span>
        </button>
      </div>
    </div>
  <Address :open="modalAddressOpened" @update-open="e => modalAddressOpened = e" />
  </div>
</template>

<script>
import { mapState } from 'pinia'
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
      modalAddressOpened: false
    }
  },
  computed: {
    ...mapState(useStore, ['store']),
    ...mapState(useCartStore, [
      'cartProducts',
      'numberProducts',
      'hasProducts',
      'cartTotal',
      'cartTotalProducts',
      'deliveryFee',
      'delivery',
      'address',
      'customer',
      'neighborhood'
    ]),
    isDelivery() {
      return this.delivery?.type === 1
    },
    hasSelectedOption() {
      return this.delivery?.type !== null
    },
    canGo() {
      const can = this.delivery.type === null || 
        this.customer.name === null
        this.customer.cellphone === null

      if (can) {
        return false
      }

      return true
    },
    button() {
      if (this.address.neighborhood_id === null && this.delivery.type === 'delivery') {
        return {
          disabled: true,
          label: 'Aguardando Endereço',
        }
      } else {
        return {
          disabled: false,
          label: 'Pagamento',
        }
      }
    }
  },
  methods: {
    next() {
      this.$emit('next-step')
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
