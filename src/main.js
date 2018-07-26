import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import util from './common/util'
import api from './common/api'
import VueLazyload from 'vue-lazyload'

Vue.prototype.util = util
Vue.prototype.api = api

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
