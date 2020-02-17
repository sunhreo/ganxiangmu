import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const USER_KEY = 'hm-toutiao-m-user'
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    undateUser (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY,JSON.stringify(data))
    },
    clearUser (state) {
      // 1.vuex做清除,使得有响应式
      state.user = {}
      // 2.localstorage做持久清除
      localStorage.removeItem(USER_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
