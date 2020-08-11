import store from '@/store'
import router from '@/router'
import { notify } from '@/config/notifications'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'
import { AuthUser } from '@root/modules/users/domain/entities/auth'
import { LoginWithEmail, LoginWithGoogle, Logout, RegisterWithEmail } from '@root/modules/users'

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

const loginWithEmail = async (user: AuthUser) => {
	try{
		await LoginWithEmail.call(user)
		await afterAuthHook()
	}catch(error) {
		await notify({ icon: 'error', title: error.message })
	}
}

const loginWithGoogle = async () => {
	try{
		let userId = await LoginWithGoogle.call()
		await store.dispatch('setId', userId)
		await afterAuthHook()
	}catch (error) {
		await notify({ icon: 'error', title: error.message })
	}
}

const loginAsDevUser = async (id: string) => {
	await store.dispatch('setId', id)
	await afterAuthHook()
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
		logout, loginWithGoogle, loginAsDevUser
	}
}
