import './assets/reset.scss'
import './assets/custom.scss'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import Currency from './js/Currency.js'
import App from './App.vue'
import router from './router'
import Ripple from 'primevue/ripple'
import { vMaska } from 'maska'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.mixin(Currency)
app.use(PrimeVue, { ripple: true })
app.use(pinia)
app.use(router)
app.directive('ripple', Ripple)
app.directive('maska', vMaska )

app.mount('#app')
