import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueChatScroll from 'vue-chat-scroll'
import { VueEditor } from 'vue2-editor'
//import '@/config/registerServiceWorker'
import '@/style/index.scss'
import 'jquery'
import 'popper.js'
import 'bootstrap'

import SweetAlert from 'sweetalert2'

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

window.toggleNavbar = () => {
    let collapse = document.getElementsByClassName('navbar-collapse')[0]
    collapse.classList.toggle('collapse')
    collapse.classList.toggle('in')
}

window.closeNavbar = () => {
    let collapse = document.getElementsByClassName('navbar-collapse')[0]
    collapse ? collapse.classList.add('collapse') : null
    collapse ? collapse.classList.add('in') : null
}

window.toggleAccountDropDown = () => {
    window.closeAdminDropdown()
    let dropdown = document.getElementsByClassName('dropdown-menu')[0]
    dropdown ? dropdown.classList.toggle('show') : null
    let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
    dropdownToggle ? dropdownToggle.classList.toggle('show') : null
}

window.closeAccountDropdown = () => {
    let dropdown = document.getElementsByClassName('dropdown-menu')[0]
    dropdown ? dropdown.classList.remove('show') : null
    let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
    dropdownToggle ? dropdownToggle.classList.remove('show') : null
}

window.toggleAdminDropDown = () => {
    window.closeAccountDropdown()
    let dropdown = document.getElementsByClassName('dropdown-menu')[1]
    dropdown ? dropdown.classList.toggle('show') : null
    let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[1]
    dropdownToggle ? dropdownToggle.classList.toggle('show') : null
}

window.closeAdminDropdown = () => {
    let dropdown = document.getElementsByClassName('dropdown-menu')[1]
    dropdown ? dropdown.classList.remove('show') : null
    let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[1]
    dropdownToggle ? dropdownToggle.classList.remove('show') : null
}