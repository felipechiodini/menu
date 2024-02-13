<template>
  <div class="d-flex mx-auto my-1 overflow-auto">
    <category v-for="(category, key) in data" :key="key" :name="category.name" />
  </div>
</template>

<script>
import Category from './Category.vue';

export default {
  name: 'Categories',
  components: {
    Category
  },
  data: () => {
    return {
      data: [
        { name: 'Entradas' },
        { name: 'Smashs' },
        { name: 'Na Brasa' },
        { name: 'Na Brasa' },
        { name: 'Na Brasa' },
        { name: 'Kids' },
      ]
    }
  },
}
</script>

<style>

</style>