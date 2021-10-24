import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      if (this.total) {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''
        })
      } else {
        uni.removeTabBarBadge({
          index: 2
        })
      }
    }
  }
}