<template>
  <div>
    <cart-header @go-back="$emit('go-back')" icon="arrow_back_ios" name="Endereço" />
    <div class="d-flex flex-column p-3 box">
      <label for="bairro">Bairro</label>
      <b-form-select id="bairro" :options="store.shipping_options" v-model="address.id" text-field="name" value-field="id" />
      <b-input placeholder="Endereço" type="text" v-model="address.street" />
      <b-input v-mask="'#########'" placeholder="Número" v-model="address.number" />
      <b-input placeholder="Complemento" v-model="address.complement" />
      <b-button class="border-none bg-primary w-100" @click="confirm()">
        <span class="text-white">Confirmar</span>
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
  computed: {
    ...mapGetters('store', ['store']),
    ...mapGetters('cart', ['address']),
  },
  methods: {
    ...mapActions('cart', ['setAddress']),
    confirm() {
      this.setAddress(this.address)
      this.$emit('go-back')
    }
  }
}
</script>

<style scoped>

  .box input, select {
    border-radius: 0;
    margin-bottom: 20px;
  }

</style>
