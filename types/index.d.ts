import { PluginFunction } from 'vue'
import 'firebase'

declare const VueFirebase: VueFirebase
export default VueFirebase

export interface VueFirebase {
  install: PluginFunction<VueFirebaseUseOptions>
}

export interface VueFirebaseUseOptions {
  auth?: boolean
  firestore?: boolean | FirestoreOptions
  config: FirebaseConfig
}

export interface FirestoreOptions {
  enablePersistence?: boolean
}

export interface FirebaseConfig {
  projectId: string
  apiKey: string
}

declare module 'vue/types/vue' {
  export interface Vue {
    $auth: firebase.auth.Auth
  }
}
