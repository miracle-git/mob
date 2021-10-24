<template>
  <view class="app-checkout">
    <label class="check-all" @click="updateAllGoodsState(!checkedAll)">
      <radio color="#C00000" :checked="checkedAll"/> 全选
    </label>
    <view class="total-amount" v-if="checkedAmount">
      合计：<text class="price">{{checkedAmount | toFixed }}</text>
    </view>
    <view class="checkout-btn" :class="{'disabled':!checkedCount}" @click="handleCheckout">
      结算<text v-if="checkedCount">({{checkedCount}})</text>
    </view>
  </view>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import { price } from '@/mixins'
  
  export default {
    name: 'app-checkout',
    mixins: [price],
    computed: {
      ...mapGetters('cart', ['total', 'checkedAmount', 'checkedCount']),
      ...mapState('addr', ['address']),
      ...mapState('auth', ['token']),
      checkedAll() {
        return this.total > 0 && this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('cart', ['updateAllGoodsState']),
      handleCheckout() {
        if (!this.address) return uni.$showMsg('请选择收货地址')
        if (!this.token) return uni.$showMsg('请先登录')
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>