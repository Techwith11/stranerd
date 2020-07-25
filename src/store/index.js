import Vue from 'vue'
import Vuex from 'vuex'

import chats from './modules/chats'
import contents from './modules/contents'
import modal from './modules/modal'
import payments from './modules/payments'
import sessions from './modules/sessions'
import settings from './modules/settings'
import shop from './modules/shop'
import subjects from './modules/subjects'
import tests from './modules/tests'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		chats,
		contents,
		modal,
		payments,
		sessions,
		settings,
		shop,
		subjects,
		tests,
		users
	}
})
