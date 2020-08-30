import Vue from 'vue'
import VueMeta from 'vue-meta'
// @ts-ignore
import VueInstantSearch from 'vue-instantsearch'
// @ts-ignore
import VueChatScroll from 'vue-chat-scroll'
import SweetAlert from 'sweetalert2'
import '@/config/components'
import '@/config/registerServiceWorker'
import '@/style/index.scss'
import 'bootstrap'

export const setup = () => {
	Vue.use(VueMeta, { keyName: 'meta', refreshOnceOnNavigation: true })
	Vue.use(VueChatScroll)
	Vue.use(VueInstantSearch)

	// @ts-ignore
	window.SweetAlert = SweetAlert
	// @ts-ignore
	window.Toast = SweetAlert.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	})
}

export const closeNavbar = () => {
	const collapse = document.getElementById('navbar')
	collapse ? collapse.classList.remove('show') : null
}

export const closeAccountDropdown = () => {
	const collapse = document.getElementById('accountDropdown')
	collapse ? collapse.classList.remove('show') : null
	const menu = document.getElementById('accountDropdownMenu')
	menu ? menu.classList.remove('show') : null
}

export const closeAdminDropdown = () => {
	const collapse = document.getElementById('adminDropdown')
	collapse ? collapse.classList.remove('show') : null
	const menu = document.getElementById('adminDropdownMenu')
	menu ? menu.classList.remove('show') : null
}
