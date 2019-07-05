<template>
    <div id="app">
        <div><input placeholder="email" type="text" v-model="email"></div>
        <div><input placeholder="password" type="password" v-model="password"></div>
        <div><button @click="signin">Login with email</button></div>
        <p style="color: red">{{ error }}</p>
        <p>Am i logged: {{ $logged }}</p>
        <div><button @click="signOut">Sign out</button></div>
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
        async signin () {
            try {
                const response = await this.$auth.signInWithEmailAndPassword(this.email, this.password)
                this.error = ''
            } catch (error) {
                this.error = error.message
            }
        },

        async signOut () {
            try {
                const response = await this.$auth.signOut()
                this.error = ''
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>