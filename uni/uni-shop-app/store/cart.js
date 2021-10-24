import storage from '@/utils/storage'
import { CacheKeys } from '@/config/app.conf'

export default {
  namespaced: true,
  state: {
    cart: storage.getSync(CacheKeys.cart, '[]')
  },
  mutations: {
    addToCart(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      if (res) {
        res.goods_count++
      } else {
        state.cart.push(goods)
      }
      this.commit('cart/saveCart')
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(item => item.goods_id !== id)
      this.commit('cart/saveCart')
    },
    updateGoodsState(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      if (res) {
        res.goods_state = goods.goods_state
        this.commit('cart/saveCart')
      }  
    },
    updateGoodsCount(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      if (res) {
        res.goods_count = goods.goods_count
        this.commit('cart/saveCart')
      }
    },
    updateAllGoodsState(state, checked) {
      state.cart.map(item => item.goods_state = checked)
      this.commit('cart/saveCart')
    },
    saveCart(state) {
      storage.setSync(CacheKeys.cart, state.cart)
    }
  },
  getters: {
    total(state) {
      return state.cart.reduce((r, s) => r += s.goods_count, 0)
    },
    checkedGoods(state) {
      return state.cart.filter(item => item.goods_state)
    },
    checkedCount(state, getters) {
      return getters.checkedGoods.reduce((r, s) => r += s.goods_count, 0)
    },
    checkedAmount(state, getters) {
      return getters.checkedGoods.reduce((r, s) => r += s.goods_price * s.goods_count, 0)
    }
  }
}