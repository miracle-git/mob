<template>
  <view class="cart-page">
    <view class="cart-box" v-if="cart&&cart.length">
      <!-- 收货地址 -->
      <app-delivery-address/>
      <!-- 购物车标题 -->
      <view class="cart-title">
        <uni-icons type="shop" size="18"/>
        <text class="cart-text">购物车</text>
      </view>
      <!-- 购物车商品 -->
      <view class="cart-goods-box">
        <uni-swipe-action>
          <block v-for="(item, index) in cart" :key="index">
            <uni-swipe-action-item :right-options="config.actions" @click="handleRemoveGoods(item)">
              <app-goods-item :item="item" radio number @radio-change="handleGoodsState" @number-change="handleGoodsCount"/>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </view>
      <!-- 购物车结算 -->
      <app-checkout/>
    </view>
    <view class="empty-cart" v-else>
      <image src="/static/cart-icons/cart_empty@2x.png"/>
      <app-block-text text="空空如也" />
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { badge } from '@/mixins'
  
  export default {
    mixins: [badge],
    data() {
      return {
        config: {
          actions: [
            { text: '删除', style: { backgroundColor: '#ff0000' } }
          ]
        }
      }
    },
    computed: {
      ...mapState('cart', ['cart'])
    },
    methods: {
      ...mapMutations('cart', ['removeFromCart', 'updateGoodsState', 'updateGoodsCount']),
      handleGoodsState(e) {
        this.updateGoodsState({ 
          goods_id: e.id, 
          goods_state: !e.checked,
        })
      },
      handleGoodsCount(e) {
        this.updateGoodsCount({
          goods_id: e.id, 
          goods_count: e.num,
        })
      },
      handleRemoveGoods(e) {
        this.removeFromCart(e.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>