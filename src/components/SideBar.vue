<template>
  <b-sidebar id="sidebar" shadow>
    <div class="container">
      <button :variant="variant('/produtos')" class="text-left w-100 pointer p-2" to="/produtos">Produtos</button>
      <button :variant="variant('/garcons')" class="text-left w-100 pointer p-2" to="/garcons">Garçons</button>
      <button :variant="variant('/combos')" class="text-left w-100 pointer p-2" to="/combos">Combos</button>
      <button :variant="variant('/comandas')" class="text-left w-100 pointer p-2" to="/comandas">Comandas</button>
      <button :variant="variant('/configuracoes')" class="text-left w-100 pointer p-2" to="/configuracoes">Configurações</button>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  methods: {
    variant(route) {
      if (route == this.$route.path) return 'info'
      return 'transparent' 
    } 
  }
}
</script>