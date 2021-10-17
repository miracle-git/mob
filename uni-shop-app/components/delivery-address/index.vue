<template>
  <view class="app-delivery-address">
    <view class="address-info-box" @click="handleSelectAddress" v-if="address">
      <view class="conact-user">
        <text class="username">收货人：{{address.userName}}</text>
        <view class="phone">
          <text>电话：{{address.telNumber}}</text>
          <uni-icons type="arrowright" size="16"/>
        </view>
      </view>
      <text class="detail-address">
        收货地址：{{detailAddress}}
      </text>
    </view>
    <view class="add-address-box" v-else>
      <button type="primary" size="mini" @click="handleSelectAddress">选择收货地址</button>
    </view>
    <image src="/static/cart-icons/cart_border@2x.png" class="address-border"/>
  </view>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import { Messages } from '@/config/app.conf'
  
  export default {
    name: 'app-delivery-address',
    computed: {
      ...mapState('addr', ['address']),
      ...mapGetters('addr', ['detailAddress'])
    },
    methods: {
      ...mapMutations('addr', ['updateAddress']),
      async handleSelectAddress() {
        const [err, res] = await uni.chooseAddress().catch(err => err)
        if (err) {
          if (err.errMsg === Messages.auth.fail.android || err.errMsg === Messages.auth.fail.ios) {
            this.handleReAuth()
          }
        } else {
          if (res && res.errMsg === Messages.auth.ok) {
            this.updateAddress(res)
          }
        }
      },
      async handleReAuth() {
        const [err, res] = await uni.showModal({
          content: '检测到您没有打开地址权限，是否打开设置？',
          confirmText: '确认',
          cancelText: '取消'
        })
        if (err || res.cancel) return
        if (res.confirm) {
          return uni.openSetting({
            success(res) {
              if (!res.authSetting['scope.address']) return
              return uni.$showMsg('授权成功！请选择收货地址。')
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
