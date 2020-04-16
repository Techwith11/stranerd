import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

//import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /*const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const isLoggedIn = store.getters.isLoggedIn
  if (requiresAuth && !isLoggedIn) {
    new window.toast({ icon: 'error', 'title': 'Login to continue' })
    store.dispatch('setModalLogin')
    return next(from.fullPath)
  }*/
  return next()
})

router.afterEach(() => {
  let togglers = document.getElementsByClassName('navbar-toggler')
  let navbarOpen = document.getElementsByClassName('navbar-collapse collapse show')
  if(togglers.length > 0 && navbarOpen.length > 0) togglers[0].click()
})

export default router
