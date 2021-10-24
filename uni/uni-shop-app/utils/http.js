import { $http } from '@escook/request-miniprogram'

$http.baseUrl = 'http://www.uinav.com'

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '正在加载中...'
  })
}
$http.afterRequest = function(res) {
  uni.hideLoading()
  const { status } = res.data.meta
  if (status !== 200) return uni.$showMsg()
}

uni.$http = $http