import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import addr from './addr'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    addr,
    auth
  }
})