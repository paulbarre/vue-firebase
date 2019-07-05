# Firebase plugin for Vue.js

## Introduction

Currently these are the supported features:

- [x] Connection to Firestore

Plugin under development, a lot more to come in a close future (?).

## Installation

Install the package into your Vue application:

```
npm i @paulbarre/vue-firebase firebase
```

Install the plugin into your application:

```js
import Vue from 'vue'
import VueFirebasePlugin from '@paulbarre/vue-firebase'

const options = {
    ...
}

Vue.use(VueFirebasePlugin, options)
```

Currently the plugin recognizes the following options:

Name|Type|Default|Description
:-|:-|:-|:-
`config`|Object|__See below__|Firebase configuration
`firestore`|Boolean|**false**|Sets up firestore into your application

The `config` option is used to initialize the Firebase application.

Name|Type|Description
:-|:-|:-
`projectId`|String|The ID you set to your firebase project. It is visible into the URL when you are on the Firebase console of your project, or it is visible into the project settings page.

See the [official documentation](https://firebase.google.com/docs/reference/node/firebase.html#initialize-app) for further details.

Real world example, into a Vue app created with Vue CLI:

```js
import Vue from 'vue'
import App from './App.vue'

import VueFirebasePlugin from '@paulbarre/vue-firebase'

const projectId = '<put your project id here>'

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
```

## Firestore

In order to setup Firestore into your application, it is imperative that you give the plugin `config` parameters:

* `projectId`

VueFirebasePlugin provides `$firestore` attribute to your Vue components:

`App.vue`

```html
<script>
export default {
  name: 'app',
  async mounted () {
    const ref = this.$firestore.collection('<the collection you want to use>')
      const snapshot = await ref.get()
      snapshot.forEach(doc => {
          console.log(doc.data())
      })
  }
}
</script>
```

For more information on how to use `$firestore`, check at the [official documentation](https://firebase.google.com/docs/reference/node/firebase.firestore).
