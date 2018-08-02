import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import util from './common/util'
import api from './common/api'
import VueLazyload from 'vue-lazyload'
import Toast from 'vant/lib/toast'
import Dialog from 'vant/lib/dialog'
import Area from 'vant/lib/area'
import Popup from 'vant/lib/popup'
import Actionsheet from 'vant/lib/actionsheet'
import Uploader from 'vant/lib/uploader'
import 'vant/lib/vant-css/index.css'

Vue.use(Area);
Vue.use(Popup);
Vue.use(Actionsheet);
Vue.use(Uploader);


Vue.prototype.util = util
Vue.prototype.api = api

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '', //配置错误图片
  loading: '', //配置加载图片
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App, Toast, Dialog },
  template: '<App/>'
})
