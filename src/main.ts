import Vue from 'vue'
import '@/config/composition'
import App from '@/App.vue'
import router from '@/router/index'
import { Store as store } from '@/store/index'
import { setup } from '@/config'

Vue.config.productionTip = true

setup()

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
