import Vue from 'vue'
import App from './App'
import '@/config/'
import router from './router/'
import store from './store/'

Vue.config.productionTip = true
store.dispatch('setId', window.localStorage.getItem('user_id'))
store.dispatch('fetchAllSubject')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
