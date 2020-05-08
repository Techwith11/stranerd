import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import chats from './modules/chats'
import modal from './modules/modal'
import payments from './modules/payments'
import sessions from './modules/sessions'
import tests from './modules/tests'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		chats,
		modal,
		payments,
		sessions,
		tests,
		users
	}
})
