import firebase from 'firebase/app'

const VueFirebasePlugin = {
    install (Vue, options = {}) {
        firebase.initializeApp(options.config)
        if (options.firestore && Boolean(options.firestore)) {
            this.setupFirestore(Vue, options)
        }
        if (options.auth && Boolean(options.auth)) {
            this.setupAuth(Vue, options)
        }
    },

    setupFirestore (Vue, options = {}) {
        if (!options.config || !options.config.projectId) {
            // eslint-disable-next-line
            return console.warn(`Firebase 'projectId' should be provided`)
        }
        require('firebase/firestore')
        Vue.prototype.$firestore = firebase.firestore()
    },

    setupAuth (Vue, options = {}) {
        if (!options.config || !options.config.apiKey) {
            // eslint-disable-next-line
            return console.warn(`Firebase 'apiKey' should be provided`)
        }
        require('firebase/auth')
        const auth = new Vue({
            data: {
                user: null
            }
        })
        Object.defineProperties(Vue.prototype, {
            $logged: {
                get: _ => !!auth.user
            }
        })
        
        firebase.auth().onAuthStateChanged(user => auth.user = user)

        Vue.prototype.$auth = firebase.auth()
    }
}
export default VueFirebasePlugin