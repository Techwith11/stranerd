import store from '@/store'
import router from '@/router'
import { notify } from '@/config/notifications'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'
import { AuthUser } from '@root/modules/users/domain/entities/auth'
import { GetLoginFactory, LoginWithEmail, LoginWithGoogle, Logout, RegisterWithEmail } from '@root/modules/users'
import { computed, reactive } from '@vue/composition-api'

const afterAuthHook = async () => {
	const route = store.getters.getIntendedRoute
	if(route) await router.push(route)
	closeNavbar()
	await store.dispatch('clearIntendedRoute')
	await store.dispatch('closeAuthModal')
}

const registerWithEmail = async (user: AuthUser) => {
	try{
		const userId = await RegisterWithEmail.call(user)
		await store.dispatch('setId', userId)
		await afterAuthHook()
	}catch(error){
		await notify({ icon: 'error', title: error.message })
	}
}

const logout = async () => {
	await store.dispatch('setId', null)
	if(store.getters.isTutor) await store.dispatch('closeTutorSessionsListener')
	await router.push('/')
	await Logout.call()
	closeNavbar()
	closeAccountDropdown()
	closeAdminDropdown()
}

export const useAuth = () => {
	return {
		logout,
	}
}

export const useLoginForm = () => {
	const state = reactive({
		loading: false,
		factory: GetLoginFactory.call(),
	})
	const login = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await LoginWithEmail.call(state.factory)
				state.factory.reset()
				await afterAuthHook()
			}catch(error){ await notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else{
			state.factory.validateAll()
		}
	}
	return {
		loading: computed(() => state.loading),
		factory: state.factory,
		login
	}
}

export const useGoogleLogin = () => {
	const state = reactive({
		loading: false
	})
	const login = async () => {
		state.loading = true
		try{
			await LoginWithGoogle.call()
			await afterAuthHook()
		}catch(error){ await notify({ icon: 'error', title: error.message }) }
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		login
	}
}

export const useDevLogin = () => {
	const state = reactive({
		loading: false
	})
	const login = async (id: string) => {
		state.loading = true
		await store.dispatch('setId', id)
		await afterAuthHook()
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		login
	}
}
