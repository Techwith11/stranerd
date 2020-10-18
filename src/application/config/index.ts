import Vue from 'vue'
import VueMeta from 'vue-meta'
// @ts-ignore
import VueInstantSearch from 'vue-instantsearch'
// @ts-ignore
import VueChatScroll from 'vue-chat-scroll'
import SweetAlert from 'sweetalert2'
import '@application/config/components'
import '@application/config/registerServiceWorker'
import '@application/style/index.scss'
import 'bootstrap'
import { acceptUpdate, addWaitingListener } from '@application/config/registerServiceWorker'
import { RegisterAuthChangedCB } from '@modules/users'
import { useStore } from '@/usecases/store'

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
	addWaitingListener(() => {
		//alert('New content has been detected.')
		acceptUpdate(() => true)//confirm('Press OK to load the content or CANCEL to ignore.'))
	})

	if(process.env.NODE_ENV === 'production') RegisterAuthChangedCB.call((user) => useStore().auth.setId(user ? user.uid : null))
}
