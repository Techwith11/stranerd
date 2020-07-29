import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import { setup } from '@/config'

Vue.config.productionTip = true

setup()

store.dispatch('setId', window.localStorage.getItem('user_id'))
store.dispatch('fetchAllSubjects')
store.dispatch('fetchAllPlans')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')