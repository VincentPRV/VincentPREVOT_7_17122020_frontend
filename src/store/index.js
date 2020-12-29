import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    email: '',
    online: '',
  },
  mutations: {
    CREATE_USER(state) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      state.user = userInfo.username;
      state.email = userInfo.email;
      state.id = userInfo.id
    },

    CLEAR_USER(state) {
      state.user = '';
      state.email = '';
      state.id = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
