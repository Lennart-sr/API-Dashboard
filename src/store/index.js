import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    api: {},
  },
  mutations: {
    UPDATE_USER (state, payload) {
      if(payload.plan.max == 0)
        payload.plan.max = "ILIMITADO"
        
      state.user = payload
    },
    UPDATE_API (state, payload) {
      state.api = payload
    }
  },
  actions: {
  }
})
