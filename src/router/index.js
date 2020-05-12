import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
	const isLoggedIn = store.getters.isLoggedIn
	if (requiresAuth && !isLoggedIn) {
		new window.Toast({ icon: 'error', 'title': 'Login to continue' })
		store.dispatch('setModalOverview')
		return next('/')
	}
	return next()
})

router.afterEach(() => {
	document.getElementsByTagName('body')[0].scrollIntoView()
	window.closeNavbar()
	window.closeDropdown()
})

export default router
