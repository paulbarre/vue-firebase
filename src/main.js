import Vue from 'vue'
import App from './App.vue'

import VueFirebasePlugin from './index'

const projectId = ''

Vue.use(VueFirebasePlugin, {
  firestore: true,
  config: {
    projectId
  }
})
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
