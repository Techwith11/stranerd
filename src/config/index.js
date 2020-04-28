import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueChatScroll from "vue-chat-scroll"

import '@/config/registerServiceWorker'
import '@/style/index.scss'

import SweetAlert from 'sweetalert2'

Vue.use(Vuelidate)
Vue.use(VueChatScroll)
window.Fire = new Vue({})

window.SweetAlert = SweetAlert
window.Toast = SweetAlert.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});
