import store from '@/store'
import router from '@/router'
import { Notify } from '@/config/notifications'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'
import {
	GetLoginFactory, GetRegisterFactory, GetResetPasswordFactory, GetUpdatePasswordFactory,
	LoginWithEmail, LoginWithGoogle, Logout, RegisterWithEmail, ResetPassword, UpdatePassword
} from '@root/modules/users'
import { computed, reactive } from '@vue/composition-api'

const afterAuthHook = async () => {
	const route = store.getters.getIntendedRoute
	if(route) await router.push(route)
	closeNavbar()
	await store.dispatch('clearIntendedRoute')
	await store.dispatch('closeAuthModal')
}

export const useRegisterForm = () => {
	const state = reactive({
		loading: false,
		factory: GetRegisterFactory.call(),
	})
	const register = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				const userId = await RegisterWithEmail.call(state.factory)
				await store.dispatch('setId', userId)
				state.factory.reset()
				await afterAuthHook()
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else{
			state.factory.validateAll()
		}
	}
	return {
		loading: computed(() => state.loading),
		factory: state.factory,
		register
	}
}

export const useLogout = () => {
	const state = reactive({
		loading: false
	})
	const logout = async () => {
		state.loading = true
		await store.dispatch('setId', null)
		if(store.getters.isTutor) await store.dispatch('closeTutorSessionsListener')
		if(router.currentRoute.meta.requiresAuth) await router.push('/')
		await Logout.call()
		closeNavbar()
		closeAccountDropdown()
		closeAdminDropdown()
		state.loading = false
	}

	return {
		loading: computed(() => state.loading),
		logout
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
				const userId = await LoginWithEmail.call(state.factory)
				await store.dispatch('setId', userId)
				state.factory.reset()
				await afterAuthHook()
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
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
			const userId = await LoginWithGoogle.call()
			await store.dispatch('setId', userId)
			await afterAuthHook()
		}catch(error){ await Notify({ icon: 'error', title: error.message }) }
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		login
	}
}

export const useDevLogin = () => {
	const devs = ['kevin11','frank','joe','max']
	const state = reactive({
		loading: false,
		id: ''
	})
	const login = async () => {
		state.loading = true
		if(state.id){
			await store.dispatch('setId', state.id)
			await afterAuthHook()
		}else await Notify({ title: 'Select a dev id first', icon: 'error' })
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		isDev: computed(() => process.env.NODE_ENV === 'development'),
		id: computed({ get: () => state.id, set: (value: string) => state.id = value }),
		devs, login
	}
}

export const useResetPasswordForm = () => {
	const state = reactive({
		loading: false,
		factory: GetResetPasswordFactory.call(),
	})
	const resetPassword = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await ResetPassword.call(state.factory)
				state.factory.reset()
				await Notify({ icon: 'success', title: 'Proceed to your registered email to continue' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else{
			state.factory.validateAll()
		}
	}
	return {
		loading: computed(() => state.loading),
		factory: state.factory,
		resetPassword
	}
}

export const useUpdatePasswordForm = () => {
	const state = reactive({
		loading: false,
		factory: GetUpdatePasswordFactory.call(),
	})
	const updatePassword = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await UpdatePassword.call(state.factory)
				state.factory.reset()
				store.dispatch('closeAccountModal')
				await Notify({ icon: 'success', title: 'Password updated successfully' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else{
			state.factory.validateAll()
		}
	}
	return {
		loading: computed(() => state.loading),
		factory: state.factory,
		updatePassword
	}
}
