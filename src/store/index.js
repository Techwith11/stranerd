import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import modal from './modules/modal'
import sessions from './modules/sessions'
import tests from './modules/tests'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		modal,
		sessions,
		tests
	}
})
