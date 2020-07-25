import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: async to => {
		let y = store.getters.getScrollCache[to.fullPath] || 0
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ x: 0, y })
			}, 1)
		})
	}
})

router.beforeEach((to, from, next) => {
	store.dispatch('setScrollCache', { page: from.fullPath, position: document.documentElement.scrollTop })
	const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
	const requiresAdmin = to.matched.some(route => route.meta.requiresAdmin)
	const isLoggedIn = store.getters.isLoggedIn
	const isAdmin = store.getters.isAdmin
	if (requiresAuth && !isLoggedIn) {
		new window.Toast({ icon: 'error', 'title': 'Login to continue' })
		store.dispatch('setAuthModalLogin')
		store.dispatch('setIntendedRoute', to.fullPath)
		return next('/')
	}
	if(requiresAdmin && !isAdmin){
		return next('/')
	}
	return next()
})

router.afterEach(() => {
	document.getElementsByTagName('body')[0].scrollIntoView()
	window.closeNavbar()
	window.closeAccountDropdown()
	window.closeAdminDropdown()
})

export default router
