import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Inputmask from 'inputmask'
import autosize from 'autosize'

import './assets/css/tailwind.css'

Object.defineProperty(Vue.prototype, '$autosize', { value: autosize })

Vue.use(Inputmask)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
