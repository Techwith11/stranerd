import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import chats from './modules/chats'
import contents from './modules/contents'
import modal from './modules/modal'
import payments from './modules/payments'
import posts from './modules/posts'
import sessions from './modules/sessions'
import tests from './modules/tests'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		chats,
		contents,
		modal,
		payments,
		posts,
		sessions,
		tests,
		users
	}
})
