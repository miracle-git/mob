<template>
  <view class="app-checkout">
    <label class="check-all" @click="updateAllGoodsState(!checkedAll)">
      <radio color="#C00000" :checked="checkedAll"/> 全选
    </label>
    <view class="total-amount" v-if="checkedAmount">
      合计：<text class="price">{{checkedAmount | toFixed }}</text>
    </view>
    <view class="checkout-btn" :class="{'disabled':!checkedCount}">
      结算<text v-if="checkedCount">({{checkedCount}})</text>
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { price } from '@/mixins'
  
  export default {
    name: 'app-checkout',
    mixins: [price],
    computed: {
      ...mapGetters('cart', ['total', 'checkedAmount', 'checkedCount']),
      checkedAll() {
        return this.total > 0 && this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('cart', ['updateAllGoodsState'])
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>