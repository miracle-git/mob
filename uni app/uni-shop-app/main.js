
// #ifndef VUE3
import Vue from 'vue'
import App from './app'
import store from './store'
import './utils/uni'
import './utils/http'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './app'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif