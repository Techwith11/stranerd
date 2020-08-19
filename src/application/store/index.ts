import Vue from 'vue'
import Vuex from 'vuex'

import chats from './modules/chats'
import meta from './modules/meta'
import modal from './modules/modal'
import payments from './modules/payments'
import sessions from './modules/sessions'
import shop from './modules/shop'
import subjects from './modules/subjects'
import users from './modules/users'

Vue.use(Vuex)

export const Store = new Vuex.Store({
	modules: {
		chats,
		meta,
		modal,
		payments,
		sessions,
		shop,
		subjects,
		users
	}
})
