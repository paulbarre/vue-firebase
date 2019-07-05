import Vue from 'vue'
import App from './App.vue'

import VueFirebasePlugin from './index'

const projectId = ''
const apiKey = ''

Vue.use(VueFirebasePlugin, {
  firestore: true,
  auth: true,
  config: {
    projectId,
    apiKey
  }
})
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
