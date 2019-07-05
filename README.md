# Firebase plugin for Vue.js

## Introduction

Currently these are the supported features:

- [x] Connection to Firestore
- [x] Authentication feature

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
`auth`|Boolean|**false**|Sets up authentication into your application

The `config` option is used to initialize the Firebase application.

Name|Type|Description
:-|:-|:-
`projectId`|String|The ID you set to your firebase project. It is visible into the URL when you are on the Firebase console of your project, or it is visible into the project settings page.
`apiKey`|String|API Key of your project. Access the project settings page on Firebase console to retrieve it.

See the [official documentation](https://firebase.google.com/docs/reference/node/firebase.html#initialize-app) for further details.

Real world example, into a Vue app created with Vue CLI:

```js
import Vue from 'vue'
import App from './App.vue'

import VueFirebasePlugin from '@paulbarre/vue-firebase'

const projectId = '<put your project id here>'
const apiKey = '<put your api key here>'

Vue.use(VueFirebasePlugin, {
  firestore: true,
  config: {
    projectId,
    apiKey
  }
})
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
```

**project id**

It is what you can see on the URL when you access your project with the Firebase console: `https://console.firebase.google.com/u/0/project/<project-id>/overview`.

**API key**

This is a string mixing characters and numbers looking like: `AIza62bf....`.

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

## Authentication

In order to setup Authentication into your application, it is imperative that you give the plugin `config` parameters:

* `apiKey`

VueFirebasePlugin provides `$auth` attribute to your Vue components to be able to use Firebase authentication methods. Basically it is mapping `firebase.auth()`.

In addition, it provides a global computed property `$logged` to check if the app is logged or not to Firebase.

**Important**

The plugin will automatically set the Firebase callback `onAuthStateChanged` that will check the user current login. So it is not needed to make any call to the API when the app is refreshed, just looking at `$logged` will tell if the app is logged in or not.

Real world example for signing in and signing out:

```html
<template>
  <div id="app">
    <div><input placeholder="email" type="text" v-model="email"></div>
    <div><input placeholder="password" type="password" v-model="password"></div>
    <div><button @click="handleError(signIn)">Login with email</button></div>
    <p class="error">{{ error }}</p>
    <p>Am i logged: {{ $logged }}</p>
    <div><button @click="handleError(signOut)">Sign out</button></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleError (fn) {
      try {
        await fn()
        this.error = ''
      } catch (error) {
        this.error = error.message
      }
    },

    async signIn () {
      await this.$auth.signInWithEmailAndPassword(this.email, this.password)
    },

    async signOut () {
      await this.$auth.signOut()
    }
  }
}
</script>
```

For more information on how to use `$auth`, check at the [official documentation](https://firebase.google.com/docs/reference/js/firebase.auth).

**Tested so far**

* Sign in with email and password