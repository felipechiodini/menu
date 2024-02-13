<template>
  <div>
    <cart-header @go-back="$emit('go-back')" icon="arrow_back_ios" name="" />
    <div>
      <div>
        <div v-wave class="row align-items-center border-bottom w-100 p-4 pointer m-0" v-for="(option, key) in store.delivery_options" :key="key" @click="selectOption(option)">
          <b-form-radio size="lg" name="option-select" :value="option.id" v-model="delivery.type" class="col-auto" />
          <span class="material-icons mr-2">{{ option.icon }}</span>
          <span>{{ option.name }}</span>
          <span class="ml-auto col-auto d-flex align-items-center">
            <span class="material-icons mr-1">access_time</span>
            <span>{{ option.time }}</span>
          </span>
        </div>
        <template v-if="hasSelectedOption">
          <div class="row border-bottom align-items-center w-100 p-3 rounded m-0 pointer" v-if="isDelivery" @click="$emit('open-address')">
            <div class="col-auto">
              <span class="material-icons">gps_fixed</span>
            </div>
            <div class="col d-flex flex-column">
              <template v-if="address.id !== null">
                <small class="text-muted mb-1" style="font-size: 13px;">Entregar em</small>
                <strong class="mb-1">{{ address.street }}, {{ address.number }}</strong>
                <small class="text-muted mb-1" style="font-size: 13px;">{{ address.street }}</small>
              </template>
              <template v-else>
                Selecione um endereço
              </template>
            </div>
            <div class="col-auto">
              <span class="material-icons">arrow_forward_ios</span>
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
          <div class="py-3">
            <div class="col-12 mb-3">
              <b-input placeholder="Nome" class="px-3" id="name" v-model="customer.name" />
            </div>
            <div class="col-12 mb-3">
              <b-input placeholder="Celular" v-mask="'(##) # ####-####'" class="px-3" v-model="customer.cellphone" />
            </div>
            <div class="col-12 mb-3">
              <b-input placeholder="CPF" v-mask="'###.###.###-##'" class="px-3" type="tel" id="cpf" v-model="customer.cpf" />
            </div>
            <div class="col-12 mb-3">
              <b-input placeholder="E-mail" class="px-3" type="email" id="email" v-model="customer.email" />
            </div>
          </div>
        </template>
      </div>
      <div class="row align-items-center border-top justify-content-around w-100 py-3 shadow-lg bg-white m-0" style="position: fixed; bottom: 0; left: 0; z-index: 2;">
        <table class="resume-table">
          <tr>
            <td>Subtotal</td>
            <td align="right">{{ (cartTotalProductsPrice) }}</td>
          </tr>
          <tr v-if="delivery.type === 'delivery'">
            <td>Entrega</td>
            <td align="right">{{ (cartShippingPrice) || 'Aguardando endereço' }}</td>
          </tr>
          <tr class="border-top">
            <td>Total</td>
            <td class="total" align="right">{{ (cartTotalPrice) }}</td>
          </tr>
        </table>
        <b-button class="border-none bg-primary btn-add d-flex align-items-center justify-content-center" @click="next()">
          <span class="text-white mr-3">Pagamento</span>
          <span class="material-icons text-white">arrow_forward_ios</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import CartHeader from './Header.vue'

export default {
  components: {
    CartHeader
  },
  data: () => {
    return {
      customer: {
        name: 'Felipe Chiodini Bona',
        cellphone: '47999097070',
        cpf: '11048424910',
        email: 'felipechiodinibona@hotmail.com'
      }
    }
  },
  computed: {
    ...mapGetters('store', ['store']),
    ...mapGetters('cart', ['cartProducts', 'numberProducts', 'hasProducts', 'cartTotalPrice', 'cartTotalProductsPrice', 'cartShippingPrice', 'delivery', 'address']),
    isDelivery() {
      return this.delivery?.type === 'delivery'
    },
    hasSelectedOption() {
      return !!this.delivery?.type
    }
  },
  methods: {
    ...mapActions('cart', ['setDelivery', 'setCustomer']),
    next() {
      this.setCustomer(this.customer)
      this.$emit('next-step')
    },
    validateCPF(cpf) {
      cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

      if (cpf.length !== 11) {
        return false; // O CPF deve ter 11 dígitos
      }

      // Verifica se todos os dígitos são iguais (CPF inválido)
      if (/^(\d)\1+$/.test(cpf)) {
        return false;
      }

      // Calcula o primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = 11 - (sum % 11);
      let firstDigit = (remainder === 10 || remainder === 11) ? 0 : remainder;

      // Calcula o segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = 11 - (sum % 11);
      let secondDigit = (remainder === 10 || remainder === 11) ? 0 : remainder;

      // Verifica se os dígitos verificadores calculados correspondem aos dígitos reais
      if (parseInt(cpf.charAt(9)) === firstDigit && parseInt(cpf.charAt(10)) === secondDigit) {
        return true; // CPF válido
      } else {
        return false; // CPF inválido
      }
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

  .wraper {
    margin-top: 80px;
    margin-bottom: 100px;

    & label {
      margin: 15px 0 0 0;
    }
  }

</style>
