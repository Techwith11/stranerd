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
	const requiresSubscription = to.matched.some(route => route.meta.requiresSubscription)
	const requiresAdmin = to.matched.some(route => route.meta.requiresAdmin)
	const isLoggedIn = store.getters.isLoggedIn
	const isAdmin = store.getters.isAdmin
	const isSubscribed = store.getters.isSubscribed
	if (requiresAuth && !isLoggedIn) {
		new window.Toast({ icon: 'error', 'title': 'Login to continue' })
		store.dispatch('setAuthModalOverview')
		store.dispatch('setIntendedRoute', to.fullPath)
		return next('/')
	}
	if(requiresAdmin && !isAdmin){
		return next('/')
	}
	if(requiresSubscription && !isSubscribed){
		store.dispatch('setAccountModalMustSubscribeWarning')
		return next(from.fullPath)
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
