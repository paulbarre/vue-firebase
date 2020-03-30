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
import { collection } from '@/firebase'
export default {
  name: 'app',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  async mounted () {
    const ref = this.$firestore.collection(collection)
    const snapshot = await ref.get()
    snapshot.forEach(doc => {
      console.log(doc.data())
    })
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