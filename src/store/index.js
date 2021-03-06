import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isLogin:false
  },
  mutations: {
    loginIn(state){
      state.isLogin = true
    },
    loginOut(state){
      state.isLogin = false
    }
  },
  actions: {

  },
  modules: {
  }
  
})
