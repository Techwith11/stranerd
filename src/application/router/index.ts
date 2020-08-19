import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import { Notify } from '@/config/notifications'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'

import { addToCachedScrolls, getCachedScroll, saveIntendedRoute } from '@/usecases/core/router'
import { useStore } from '@/usecases/store'

Vue.use(VueRouter)

const router: VueRouter = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: async (to) => new Promise((resolve) => {
		setTimeout(() => resolve({ x: 0, y: getCachedScroll(to.fullPath) }), 1)
	})
})

router.beforeEach(async (to, from, next) => {
	addToCachedScrolls(from.fullPath, document.documentElement.scrollTop)
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)
	const requiresAdmin = to.matched.some((route) => route.meta.requiresAdmin)
	const isLoggedIn = useStore().auth.isLoggedIn.value
	const isAdmin = useStore().auth.isAdmin.value
	if (requiresAuth && !isLoggedIn) {
		await useStore().modals.setAuthModalLogin()
		saveIntendedRoute(to.fullPath)
		await Notify({ icon: 'error', 'title': 'Login to continue' })
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
