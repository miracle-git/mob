import SearchBox from './components/search-box/index.vue'

const components = [
  SearchBox
]

const install = function(Vue) {
  components.map(item => Vue.component(item.name, item))
}

export default {
  install
}