import storage from '@/utils/storage'
import { CacheKeys } from '@/config/app.conf'

export default {
  namespaced: true,
  state: {
    address: storage.getSync(CacheKeys.address)
  },
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('addr/saveAddress')
    },
    saveAddress(state) {
      storage.setSync(CacheKeys.address, state.address)
    }
  },
  getters: {
    detailAddress(state) {
      if (!state.address) return ''
      const { provinceName, cityName, countyName, detailInfo } = state.address
      return `${provinceName}${cityName}${countyName}${detailInfo}`
    }
  }
}