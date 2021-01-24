import router from '@application/router'
import { Notify } from '@application/config/notifications'
import {
	GetLoginFactory, GetRegisterFactory, GetResetPasswordFactory, GetUpdatePasswordFactory, GetUpdateProfileFactory,
	LoginWithEmail, LoginWithGoogle, Logout, RegisterWithEmail, ResetPassword, UpdatePassword, UpdateProfile
} from '@modules/users'
import { computed, reactive } from '@vue/composition-api'
import { getIntendedRoute } from '@application/usecases/core/router'
import { useStore } from '@application/usecases/store'

const afterAuthHook = async () => {
	const route = getIntendedRoute()
	if(route) await router.push(route)
	else await router.push('/')
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
				await useStore().auth.setId(userId)
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
		if(useStore().auth.isTutor.value) await useStore().sessions.closeTutorSessionsListener()
		await useStore().auth.setId(null)
		await Logout.call()
		state.loading = false
		window.location.assign('/auth/signin')
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
				await useStore().auth.setId(userId)
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
			await useStore().auth.setId(userId)
			await afterAuthHook()
		}catch(error){ await Notify({ icon: 'error', title: error.message }) }
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		login
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
	state.factory.email = useStore().auth.getUser.value.bio.email
	const updatePassword = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await UpdatePassword.call(state.factory)
				state.factory.reset()
				await useStore().modals.closeAccountModal()
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

export const useUpdateProfileForm = () => {
	const state = reactive({
		loading: false,
		factory: GetUpdateProfileFactory.call(),
	})

	state.factory.loadEntity(useStore().auth.getUser.value)

	const updateProfile = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await UpdateProfile.call(useStore().auth.getId.value, state.factory)
				state.factory.reset()
				await useStore().modals.closeAccountModal()
				await Notify({ icon: 'success', title: 'Profile updated successfully' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else{
			state.factory.validateAll()
		}
	}
	return {
		loading: computed(() => state.loading),
		factory: state.factory,
		updateProfile
	}
}
