import { PluginFunction } from 'vue'

declare const VueFirebase: VueFirebase
export default VueFirebase

export interface VueFirebase {
  install: PluginFunction<VueFirebaseUseOptions>
}

export interface VueFirebaseUseOptions {
  
}