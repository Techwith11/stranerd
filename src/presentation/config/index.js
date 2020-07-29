import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import VueChatScroll from 'vue-chat-scroll'
import SweetAlert from 'sweetalert2'
import '@/config/layouts'
import '@/config/registerServiceWorker'
import '@/assets/style/index.scss'
import 'jquery'
import 'popper.js'
import 'bootstrap'

export const setup = () => {
    Vue.use(VueCompositionAPI)
    Vue.use(VueMeta, { keyName: 'meta', refreshOnceOnNavigation: true })
    Vue.use(Vuelidate)
    Vue.use(VueChatScroll)

    window.Fire = new Vue()
    window.SweetAlert = SweetAlert
    window.Toast = SweetAlert.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    });
}

export const closeNavbar = () => {
    let collapse = document.getElementById('navbar')
    collapse ? collapse.classList.remove('show') : null
}

export const closeAccountDropdown = () => {
    let collapse = document.getElementById('accountDropdown')
    collapse ? collapse.classList.remove('show') : null
    let menu = document.getElementById('accountDropdownMenu')
    menu ? menu.classList.remove('show') : null
}

export const closeAdminDropdown = () => {
    let collapse = document.getElementById('adminDropdown')
    collapse ? collapse.classList.remove('show') : null
    let menu = document.getElementById('adminDropdownMenu')
    menu ? menu.classList.remove('show') : null
}
