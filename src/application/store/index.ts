import Vue from 'vue'
import Vuex from 'vuex'

import chats from './modules/chats'
import contents from './modules/contents'
import meta from './modules/meta'
import modal from './modules/modal'
import payments from './modules/payments'
import sessions from './modules/sessions'
import shop from './modules/shop'
import subjects from './modules/subjects'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		chats,
		contents,
		meta,
		modal,
		payments,
		sessions,
		shop,
		subjects,
		users
	}
})
