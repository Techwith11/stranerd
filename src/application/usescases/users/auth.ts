import firebase, { auth, firestore } from '@root/services/firebase'
import store from '@/store'
import router from '@/router'
import { notify } from '@/config/notifications'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'

type AuthUser = {
	name?: string
	email: string
	password: string
}

let afterAuthHook = async () => {
	let route = store.getters.getIntendedRoute
	if(route) await router.push(route)
	closeNavbar()
	await store.dispatch('clearIntendedRoute')
	await store.dispatch('closeAuthModal')
}

export const registerWithEmail = async ({ name, email, password }: AuthUser) => {
	try{
		let record = await auth.createUserWithEmailAndPassword(email, password)
		await firestore.collection('users').doc(record.user?.uid).set({ bio: { name }},{ merge: true })
		await store.dispatch('setId', record.user?.uid)
		await afterAuthHook()
	}catch(error){
		await notify({ icon: 'error', title: error.message })
	}
}

export const loginWithEmail = async ({ email, password }: AuthUser) => {
	try{
		await auth.signInWithEmailAndPassword(email, password)
		await afterAuthHook()
	}catch(error) {
		await notify({ icon: 'error', title: error.message })
	}
}

export const loginWithGoogle = async () => {
	let googleProvider = new firebase.auth.GoogleAuthProvider()
	try{
		let record = await auth.signInWithPopup(googleProvider)
		await firestore.collection('users').doc(record.user?.uid).set({ bio: { name }},{ merge: true })
		await store.dispatch('setId', record.user?.uid)
		await afterAuthHook()
	}catch (error) {
		await notify({ icon: 'error', title: error.message })
	}
}

export const loginAsDevUser = async (id: string) => {
	await store.dispatch('setId', id)
	await afterAuthHook()
}

export const logout = async () => {
	await store.dispatch('setId', null)
	if(store.getters.isTutor) await store.dispatch('closeTutorSessionsListener')
	await router.push('/').catch(error => error)
	await auth.signOut()
	closeNavbar()
	closeAccountDropdown()
	closeAdminDropdown()
}
