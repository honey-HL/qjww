import Vue from 'vue'
import App from './App'
import router from './router'
import util from './common/util'

Vue.prototype.util = util
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
