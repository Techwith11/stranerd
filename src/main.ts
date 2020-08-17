import Vue from 'vue'
import '@/config/composition'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import { setup } from '@/config'
import { RegisterAuthChangedCB } from '@root/modules/users'

Vue.config.productionTip = true

setup()

if(process.env.NODE_ENV === 'production') RegisterAuthChangedCB.call((user) => store.dispatch('setId', user?.uid ?? null))
store.dispatch('fetchAllSubjects')
store.dispatch('fetchAllPlans')

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
