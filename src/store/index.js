import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.js'
import modal from './modules/modal.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    modal
  }
})
