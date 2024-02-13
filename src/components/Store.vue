<template>
  <div>
    <carousel
      :per-page="1"
      paginationPosition="bottom-overlay"
      :mouse-drag="false"
      :autoplay="10"
      :autoplayTimeout="4000"
      :loop="true"
    >
      <slide v-for="(banner, key) in store.banners" :key="key">
        <img class="w-100" :src="banner.src">
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
    <div class="m-2">
      <div class="mb-4">
        <h3 class="title mb-3">{{ store.name }}</h3>
        <store-status :status="store.open"></store-status>
        <span v-if="distance">
          {{ distance.text }}
        </span>
        <h5 class="my-1" v-for="(option, key) in store.delivery_options" :key="key">
          {{ option.name }}: {{ option.time }}
        </h5>
        <h5 class="my-1">
          {{ 'Pedido minimo: ' + (store.configuration.minimum_order_value) }}
        </h5>
        <h5>{{ labelDistance }}</h5>
        <warning v-if="store.configuration.warning" :text="store.configuration.warning" />
      </div>
      <div class="faopwjfowpafhoiwafhiowa">
        <button
          v-for="(category, key) in store.categories"
          :key="key"
          @click="scrollToCategory(category)">
          {{ category.name }}
        </button>
      </div>

      <div>
        <product
          @click="showProduct(product)"
          v-for="(product, key) in store.products"
          :key="key"
          :product="product"
          :category="product.category_name"
        />
      </div>


    </div>
    <div class="row align-items-center border-top justify-content-center w-100 py-3 shadow-lg bg-white m-0" style="position: sticky; bottom: 0; right: 0; z-index: 2;">
      <button class="row justify-content-between border-none bg-primary btn-add" @click="goCart()">
        <span class="col text-white">{{ numberProducts }}</span>
        <span class="col text-white">Ver Carrinho</span>
        <span class="col text-white">{{ cartTotalPrice }}</span>
      </button>
    </div>





    <modal v-model="selectedProduct">
      <button @click="closeModal()" variant="primary" class="button-rounded">
        <span class="material-icons">{{ '<' }}</span>
      </button>
      <div v-if="loading === false && product">
        <!-- <carousel :per-page="1" paginationPosition="bottom-overlay" :mouse-drag="false">
          <slide v-for="(photo, key) in product.photos" :key="key">
            <img class="w-100" :src="photo.src">
          </slide>
        </carousel> -->
        <div class="p-2">
          <h4 class="product-title">{{ product.name }}</h4>
          <p class="product-description">{{ product.description }}</p>
          <h4 class="my-3">Adicionais <small class="text-muted">Máximo: {{ product.configuration.max_number_additionals }}</small></h4>
          <div class="row w-100 align-items-center p-2 my-2 mx-0 border rounded pointer" v-for="(additional, key) in product.additionals" :key="additional.id + additional.name + key" @click="inscreaseAdditional(additional)">
            <div class="col-auto p-0">
              <div class="mb-2">{{ additional.name }}</div>
              <div><span style="font-size: 14px;">+ {{ (additional.value) }}</span></div>
            </div>
            <div class="ml-auto">
              <button size="sm" variant="transparent" v-if="additionalAmount(additional)" @click.stop="decreaseAdditional(additional)">-</button>
              <strong class="mx-3" v-if="additionalAmount(additional)">{{ additionalAmount(additional) }}</strong>
              <button :disabled="reachTotalAdditionals()" size="sm" variant="transparent">+</button>
            </div>
          </div>
          <h4 class="my-3">Substituições <small class="text-muted">Máximo: {{ product.configuration.max_number_replacements }}</small></h4>
          <label
            class="d-flex w-100 align-items-center p-2 my-2 border rounded pointer"
            v-for="(replacement, key) in product.replacements"
            :key="replacement.id + replacement.name + key"
            :for="`replacement-${replacement.id}`"
          >
            <div class="col-auto p-0">
              <div class="mb-2">{{ replacement.name }}</div>
              <div>+ {{ (replacement.value) }}</div>
            </div>
            <input
              type="checkbox"
              class="ml-auto p-0"
              v-model="replacements"
              :key="replacement.id + replacement.name + key"
              :value="replacement.id"
              name="replacements-options"
              @input="onInput"
              :id="`replacement-${replacement.id}`"
            />
          </label>
          <h4 class="mt-4 mb-2">Alguma Observação?</h4>
          <textarea v-model="observation" placeholder="Ex: Tirar a cebola, maionese à parte, ponto da carne, etc." rows="2" class="textarea" />
        </div>
        <div class="row align-items-center border-top justify-content-around m-0 w-100 py-3 shadow bg-white" style="z-index: 1000; bottom: 0; position: sticky; left: 0;">
          <div class="col-auto">
            <button variant="transparent" size="sm" @click="decrement()">-</button>
            <strong class="mx-3">{{ counter }}</strong>
            <button variant="transparent" size="sm" @click="increment()">+</button>
          </div>
          <button class="border-none bg-primary btn-add" @click="addToCart()">
            <span class="text-white mr-4">Adicionar</span>
            <span class="text-white">{{ (total) }}</span>
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center h-100" v-else-if="loading === true">
        <loading style="width: 3rem; height: 3rem;"></loading>
      </div>
    </modal>




  </div>
</template>

<script>
import StoreStatus from '@/components/StoreStatus.vue'
import Warning from '@/components/Warning.vue'
import Product from '@/components/Product.vue'
// import ProductPreview from '@/components/ProductPreview.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import Modal from './Modal.vue'
import FloatButton from '@/components/FloatButton.vue'
import Api from '@/js/Api'
import { mapActions, mapState } from 'pinia'
import { useCartStore } from '@/stores/cart'
import Loading from './Loading.vue'


// import Cart from '@/components/Cart.vue'

export default {
  name: 'Home',
  props: {
    store: {
      type: Object
    }
  },
  components: {
    StoreStatus,
    Warning,
    Product,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    // Cart
    Loading,

    Modal,
  },
  data: () => {
    return {
      distance: null,
      products: null,
      selectedProduct: null,
      openPreview: false,
      product: null,
      counter: 1,
      loading: false,
      opened: false,
      observation: null,
      additionals: [],
      replacements: []
    }
  },
  computed: {
    ...mapState(useCartStore, ['doubleCount', 'numberProducts', 'cartTotalPrice']),

    // ...mapGetters('store', ['store']),
    // ...mapGetters('cart', ['numberProducts', 'hasProducts', 'cartTotalPrice']),
    // ...mapGetters('products', ['allProducts']),
    labelDistance() {
      return this.store?.distance
    },
    // categories() {
    //   const uniqueCategories = new Set()

    //   this.allProducts.forEach(product => {
    //     uniqueCategories.add(product.category_name)
    //   })

    //   return Array.from(uniqueCategories).map(category => {
    //     return {
    //       name: category
    //     }
    //   })
    // }
  },
  mounted() {
    this.getDistance()
  },
  methods: {
    getDistance() {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords
        Api.get(`${this.$route.params.slug}/distance`, { params: { latitude, longitude } })
          .then(({ data }) => {
            this.distance = data.distance
          })
      })
    },
    goCart() {
      this.$refs['cart'].openModal()
    },
    showProduct(product) {
      this.selectedProduct = product
    },
    scrollToCategory(category) {
      const element = document.querySelector('[category="' + category.name + '"]');
      const headerOffset = 45;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="scss" scoped>

  .title {
    font-size: 1.7rem;
  }

  .btn-add {
    width: 90%;
    padding: 10px 0;
    font-size: 14px;
    letter-spacing: 0.4px;
    border: none;
  }

  .faopwjfowpafhoiwafhiowa {
    display: flex;
    overflow-x: auto;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;

    &::-webkit-scrollbar {
      display: none;
    }

    & button {
      border: none;
      padding: 10px 0;
      margin: 0 5px;
      background: transparent;
    }

    & button.active {
      border-bottom: 0.8px solid red;
    }
  }

</style>