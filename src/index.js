import { initializeApp } from 'firebase'

const VueFirebasePlugin = {
    install (Vue, options = {}) {
        initializeApp(options.config)
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
        const { firestore } = require('firebase')
        Vue.prototype.$firestore = firestore()
    },

    setupAuth (Vue, options = {}) {
        if (!options.config || !options.config.apiKey) {
            // eslint-disable-next-line
            return console.warn(`Firebase 'apiKey' should be provided`)
        }
        const { auth } = require('firebase')
        const Auth = new Vue({
            data: {
                user: null
            }
        })
        Object.defineProperties(Vue.prototype, {
            $logged: {
                get: _ => !!Auth.user
            }
        })
        
        auth().onAuthStateChanged(user => Auth.user = user)

        Vue.prototype.$auth = auth()
    }
}
export default VueFirebasePlugin