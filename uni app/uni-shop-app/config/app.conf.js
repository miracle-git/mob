export const CacheKeys = {
  history: 'uni-shop-history-list',
  cart: 'uni-shop-cart-list',
  address: 'uni-shop-delivery-address',
  user: 'uni-shop-login-user',
  token: 'uni-shop-login-token'
}
export const Messages = {
  auth: {
    ok: {
      address: 'chooseAddress:ok',
      profile: 'getUserProfile:ok',
      login: 'login:ok'
    },
    fail: {
      android: 'chooseAddress:fail auth deny',
      ios: 'chooseAddress:fail authorize no response'
    }
  }
}