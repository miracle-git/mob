
// #ifndef VUE3
import Vue from 'vue'
import App from './app'
import Global from './global.js'
// import SearchBox from './components/search-box/index.vue'
import './utils/uni'
import './utils/http'

Vue.config.productionTip = false
Vue.use(Global)
// Vue.component('search-box', SearchBox)

App.mpType = 'app'

const app = new Vue({
  ...App
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