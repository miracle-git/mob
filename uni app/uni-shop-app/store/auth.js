import storage from '@/utils/storage'
import { CacheKeys } from '@/config/app.conf'

export default {
  namespaced: true,
  state: {
    token: storage.getSync(CacheKeys.token),
    user: storage.getSync(CacheKeys.user)
  },
  mutations: {
    updateUserInfo(state, user) {
      state.user = user
      this.commit('auth/saveUserInfo')
    },
    updateToken(state, token) {
      state.token = token
      this.commit('auth/saveToken')
    },
    saveUserInfo(state) {
      storage.setSync(CacheKeys.user, state.user)
    },
    saveToken(state) {
      storage.setSync(CacheKeys.token, state.token)
    }
  }
}