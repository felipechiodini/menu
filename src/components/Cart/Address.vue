<template>
  <Modal v-model="show">
    <div class="d-flex flex-column w-100">
      <CartHeader @click="close()" name="Endereço" />
      <div class="d-flex flex-column p-3 box">
        <label for="bairro">Bairro</label>
        <select class="form-select" id="bairro" v-model="address.id">
          <option :value="option.id" v-for="(option, key) in store.shipping_options">
            {{ option.name }}
          </option>
        </select>
        <input class="form-control" placeholder="Endereço" type="text" v-model="address.street" />
        <input class="form-control" placeholder="Número" v-maska data-maska="#########"  v-model="address.number" />
        <input class="form-control" placeholder="Complemento" v-model="address.complement" />
        <button class="btn w-100 btn-primary text-white" @click="confirm()">
          Confirmar
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'pinia'
import CartHeader from './Header.vue'
import Modal from '../Modal.vue'
import { useStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'

export default {
  components: {
    CartHeader,
    Modal
  },
  props: {
    open: {
      default: false
    }
  },
  computed: {
    ...mapState(useStore, ['store']),
    ...mapState(useCartStore, ['address']),
    show() {
      return this.open === true
    }
  },
  methods: {
    confirm() {
      this.close()
    },
    close() {
      this.$emit('update-open', false)
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
