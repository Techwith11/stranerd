import Vue from 'vue'
import Vuelidate from 'vuelidate'
import '@/config/registerServiceWorker'
import '@/style/index.scss'

import 'bootstrap'

Vue.use(Vuelidate)
window.Fire = new Vue({})