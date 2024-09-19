<template>
  <Modal v-model="openModal">
    <component class="w-100" @back="goBack()" @next="nextStep()" :is="currentStep" />
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import StepOne from '@/components/Cart/StepOne.vue'
import StepTwo from '@/components/Cart/StepTwo.vue'
import StepThree from '@/components/Cart/StepThree.vue'
import Finished from '@/components/Cart/Finished.vue'
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '@/stores/cart'
import Api from '@/js/Api'

export default {
  name: 'Cart',
  components: {
    Modal,
    StepOne,
    StepTwo,
    StepThree,
    Finished,
  },
  props: {
    open: {
      default: null
    }
  },
  data: () => {
    return {
      step: 1
    }
  },
  computed: {
    ...mapState(useCartStore, [
      'numberProducts',
      'hasProducts',
      'cartTotal',
      'products',
      'delivery',
      'payment',
      'customer',
      'address'
    ]),
    openModal() {
      return this.open === true
    },
    currentStep() {
      const steps = {
        1: 'step-one',
        2: 'step-two',
        3: 'step-three',
        4: 'finished'
      }

      return steps[this.step]
    }
  },
  methods: {
    ...mapActions(useCartStore, ['resetCart']),
    nextStep() {
      if (this.step === 3) {
        this.placeOrder()
      } else {
        this.step++
      }
    },
    goBack() {
      if (this.step === 1) {
        this.close()
      } else {
        this.step--
      }
    },
    close() {
      this.$emit('close')
    },
    resolvePayload() {
      return {
        customer: this.customer,
        address: this.address,
        products: this.products,
        delivery: this.delivery,
        payment: this.payment
      }
    },
    placeOrder() {
      Api.post(`${this.$route.params.slug}/order/place`, this.resolvePayload())
        .then(({ data }) => {
          this.resetCart()
          this.step = 4
        }).catch((error) => {
          console.log(error)
          alert('error')
        })
    }
  }
}
</script>
