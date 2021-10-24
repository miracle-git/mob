export default {
  getSync(key, def = null) {
    return JSON.parse(uni.getStorageSync(key) || def)
  },
  setSync(key, val) {
    uni.setStorageSync(key, JSON.stringify(val))
  }
}