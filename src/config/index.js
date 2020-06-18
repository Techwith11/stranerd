import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import VueChatScroll from 'vue-chat-scroll'
import { VueEditor } from 'vue2-editor'
import '@/config/registerServiceWorker'
import '@/style/index.scss'
import 'jquery'
import 'popper.js'
import 'bootstrap'

import SweetAlert from 'sweetalert2'

Vue.use(VueMeta, { keyName: 'meta', refreshOnceOnNavigation: true })
Vue.use(Vuelidate)
Vue.use(VueChatScroll)
Vue.component('vue-editor', VueEditor)
window.Fire = new Vue()

window.SweetAlert = SweetAlert
window.Toast = SweetAlert.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});

window.closeNavbar = () => {
    let collapse = document.getElementById('navbar')
    collapse ? collapse.classList.remove('show') : null
}

window.closeAccountDropdown = () => {
    let collapse = document.getElementById('accountDropdown')
    collapse ? collapse.classList.remove('show') : null
    let menu = document.getElementById('accountDropdownMenu')
    menu ? menu.classList.remove('show') : null
}

window.closeAdminDropdown = () => {
    let collapse = document.getElementById('adminDropdown')
    collapse ? collapse.classList.remove('show') : null
    let menu = document.getElementById('adminDropdownMenu')
    menu ? menu.classList.remove('show') : null
}