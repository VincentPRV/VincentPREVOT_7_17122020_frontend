import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PostId:'',
  },
  mutations: {
    addPostId (state, payload) {
      state.PostId += payload.value
    }
  },
  actions: {
  },
  modules: {
  }
})
