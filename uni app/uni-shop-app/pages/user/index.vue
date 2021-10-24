<template>
  <view class="user-page">
    <app-userinfo v-if="token"/>
    <app-login v-else/>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import { badge } from '@/mixins'
  
  export default {
    mixins: [badge],
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState('auth', ['token'])
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>