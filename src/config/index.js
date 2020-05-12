import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueChatScroll from "vue-chat-scroll"

import '@/config/registerServiceWorker'
import '@/style/index.scss'

import SweetAlert from 'sweetalert2'

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

window.toggleNavbar = () => {
    let collapse = document.getElementsByClassName('navbar-collapse')[0]
    collapse.classList.toggle('collapse')
    collapse.classList.toggle('in')
}

window.closeNavbar = () => {
    let collapse = document.getElementsByClassName('navbar-collapse')[0]
    collapse.classList.add('collapse')
    collapse.classList.add('in')
}

window.toggleDropDown = () => {
    let dropdown = document.getElementsByClassName('dropdown-menu')[0]
    dropdown.classList.toggle('show')
    let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
    dropdownToggle.classList.toggle('show')
}

window.closeDropdown = () => {
    let dropdown = document.getElementsByClassName('dropdown-menu')[0]
    dropdown ? dropdown.classList.remove('show') : null
    let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
    dropdownToggle ? dropdownToggle.classList.remove('show') : null
}