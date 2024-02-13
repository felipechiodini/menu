<template>
  <div>
    <label for="">Rua</label>
    <b-input v-model="address.street"></b-input>
    <label for="">Número</label>
    <b-input v-model="address.numbers"></b-input>
    <label for="">Bairro</label>
    <b-input v-model="address.district"></b-input>
    <label for="">Cidade</label>
    <b-input v-model="address.city"></b-input>
    <label for="">Estado</label>
    <b-input v-model="address.state"></b-input>
  </div>
</template>

<script>
import Api from '@/js/Api'

export default {
  name: 'StoreAddress',
  data: () => {
    return {
      address: null
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const { data } = await Api.get('/address')
      this.address = data
    },
    async save() {
      const { data } = await Api.post('/address', this.address)
      this.address = data
    }
  }
}
</script>

<style>

</style>