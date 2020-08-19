import Vue from 'vue'
import Vuex from 'vuex'

import chats from './modules/chats'
import meta from './modules/meta'
import modal from './modules/modal'
import sessions from './modules/sessions'
import shop from './modules/shop'
import users from './modules/users'

Vue.use(Vuex)

export const Store = new Vuex.Store({
	modules: {
		chats,
		meta,
		modal,
		sessions,
		shop,
		users
	}
})
