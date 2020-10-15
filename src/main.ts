import Vue from 'vue'
import '@/config/composition'
import App from '@/App.vue'
import router from '@/router/index'
import { Store as store } from '@/store/index'
import { setup } from '@/config'
import { RegisterAuthChangedCB } from '@modules/users'
import { useStore } from '@/usecases/store'

Vue.config.productionTip = true

setup()

if(process.env.NODE_ENV === 'production') RegisterAuthChangedCB.call((user) => useStore().auth.setId(user?.uid ?? null))

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
