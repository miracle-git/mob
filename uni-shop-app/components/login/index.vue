<template>
  <view class="app-login">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"/>
    <button type="primary" class="btn-login" @click="handleLogin">一键登录</button>
    <text class="login-tip">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { Messages } from '@/config/app.conf'
  import { userLogin } from '@/services/auth.service'
  
  export default {
    name: 'app-login',
    data() {
      return {
        
      }
    },
    methods: {
      ...mapMutations('auth', ['updateUserInfo', 'updateToken']),
      async getLoginToken(user) {
        const { data: res } = await userLogin(user)
        console.log(res)
      },
      async getLoginCode() {
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== Messages.auth.ok.login) return uni.$showMsg('登录失败')
        return res.code
      },
      handleLogin() {
        uni.getUserProfile({
          desc: 'weixin',
          lang: 'zh_CN',
          success: async res => {
            const { errMsg, userInfo, ...params } = res
            if (errMsg !== Messages.auth.ok.profile) return uni.$showMsg('登录失败')
            const code = await this.getLoginCode()
            if (code) {
              this.updateUserInfo(res)
              this.getLoginToken({ ...params, code })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
