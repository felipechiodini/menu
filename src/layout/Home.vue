<template>
  <div>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;" v-if="loading === true">
      <loading></loading>
    </div>
    <div class="d-flex justify-content-center align-items-center text-center" style="height: 100vh;" v-else-if="error === true">
      <div>
        <h5>Loja não encontrada</h5>
      </div>
    </div>
    <store v-else :store="store" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Api from '@/js/Api'
import Store from '@/components/Store.vue'

export default {
  components: {
    Loading,
    Store
  },
  data: () => {
    return {
      loading: true,
      error: false,
      store: null
    }
  },
  mounted() {
    this.loadStore()
  },
  methods: {
    loadStore() {
      this.loading = true
      Api.get(`${this.$route.params.slug}/store`).then(({ data }) => {
        this.store = data.store
      }).catch(() => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    }
  }
}

</script>