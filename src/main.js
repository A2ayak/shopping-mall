import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import toast from 'components/common/toast'
import FastClick from 'fastclick'  //解决移动端300ms延迟
import VueLazyload from 'vue-lazyload' //图片懒加载插件

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast)
FastClick.attach(document.body) //解决移动端300ms延迟
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/nanyou.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
