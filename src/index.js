import firebase from 'firebase/app'

const VueFirebasePlugin = {
    install (Vue, options = {}) {
        firebase.initializeApp(options.config)
        if (options.firestore) {
            this.setupFirestore(Vue, options)
        }
        if (options.auth && Boolean(options.auth)) {
            this.setupAuth(Vue, options)
        }
    },

    enablePersistence () {
        firebase.firestore().enablePersistence()

        firebase.firestore().getFromCache = async function (ref, { source = 'cache'} = {}) {
            try {
                return await ref.get({ source })
            } catch (error) {
                if (source === 'cache') {
                    return await this.getFromCache(ref, {
                        source: 'default'
                    })
                } else {
                    throw error
                }
            }

        }
    },

    setupFirestore (Vue, { config = {}, firestore = {} }) {
        if (!config || !config.projectId) {
            // eslint-disable-next-line
            return console.warn(`Firebase 'projectId' should be provided`)
        }
        require('firebase/firestore')
        if (firestore.enablePersistence) {
            this.enablePersistence()
        }
        Vue.prototype.$firestore = firebase.firestore()
    },

    setupAuth (Vue, options = {}) {
        if (!options.config || !options.config.apiKey) {
            // eslint-disable-next-line
            return console.warn(`Firebase 'apiKey' should be provided`)
        }
        require('firebase/auth')
        const auth = new Vue({
            data: () => ({
                currentUser: undefined
            })
        })
        Object.defineProperties(Vue.prototype, {
            $logged: {
                get: () => {
                    // eslint-disable-next-line
                    console.warn(`[vue-firebase] '$logged' is deprecated. Use '$auth.logged' instead.`)
                    return !!auth.currentUser
                }
            }
        })      
        firebase.auth().onAuthStateChanged(user => auth.currentUser = user)

        Vue.prototype.$auth = new Vue({
            computed: {
                loading: {
                    get: () => auth.currentUser === undefined
                },
                currentUser: {
                    get: () => auth.currentUser
                },
                logged: {
                    get: () => !!auth.currentUser
                }
            }
        })
    }
}
export default VueFirebasePlugin