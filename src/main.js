import Vue from 'vue'
import App from './App.vue'

import VueFirebasePlugin from './index'

import config from '@/firebase'
Vue.use(VueFirebasePlugin, {
  firestore: true,
  auth: true,
  config
})
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
