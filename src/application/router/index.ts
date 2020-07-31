import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import routes from '@/router/routes'
import { notify } from '@/config/notifications'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'

import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: async (to, from, position: { x: number, y: number } | void) => {
		let y: number = store.getters.getScrollCache[to.fullPath] || 0
		new Promise((resolve) => {
			setTimeout(() => {
				resolve({ x: 0, y })
			}, 1)
		})
	}
})

router.beforeEach(async (to: Route, from: Route, next: (to?: string) => void) => {
	store.dispatch('setScrollCache', { page: from.fullPath, position: document.documentElement.scrollTop })
	const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
	const requiresAdmin = to.matched.some(route => route.meta.requiresAdmin)
	const isLoggedIn = store.getters.isLoggedIn
	const isAdmin = store.getters.isAdmin
	if (requiresAuth && !isLoggedIn) {
		await notify({ icon: 'error', 'title': 'Login to continue' })
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
	closeNavbar()
	closeAccountDropdown()
	closeAdminDropdown()
})

export default router
