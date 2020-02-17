import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/validate.js' // 验证相关
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/css/global.less'

import 'amfe-flexible/index.min.js'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$sleep = time => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
