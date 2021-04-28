import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@application/router/routes'
import { addToCachedScrolls, getCachedScroll, saveIntendedRoute } from '@application/usecases/core/router'
import { useStore } from '@application/usecases/store'

Vue.use(VueRouter)

const router: VueRouter = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: (to) => new Promise((resolve) => {
		setTimeout(() => resolve({ x: 0, y: getCachedScroll(to.fullPath) }), 1)
	})
})

router.beforeEach(async (to, from, next) => {
	addToCachedScrolls(from.fullPath, document.documentElement.scrollTop)
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)
	const requiresNoAuth = to.matched.some((route) => route.meta.requiresNoAuth)
	const requiresAdmin = to.matched.some((route) => route.meta.requiresAdmin)
	const isLoggedIn = useStore().auth.isLoggedIn.value
	const isAdmin = useStore().auth.isAdmin.value

	if (requiresAuth && !isLoggedIn) {
		saveIntendedRoute(to.fullPath)
		return next('/auth/signin')
	}
	if(requiresNoAuth && isLoggedIn) return next('/')
	if(requiresAdmin && !isAdmin) return next('/')

	return next()
})

router.afterEach(() => {
	document.getElementsByTagName('body')[0].scrollIntoView()
})

export default router
