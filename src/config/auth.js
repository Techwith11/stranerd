import firebase, { auth, firestore } from '@/config/firebase'
import store from '@/store'
import router from '@/router'

let afterAuthHook = async () => {
	await store.dispatch('closeAuthModal')
	let route = store.getters.getIntendedRoute
	if(route) await this.$router.push(route)
	await store.dispatch('clearIntendedRoute')
}

export const registerWithEmail = async ({ name, email, password }) => {
	try{
		let record = await auth.createUserWithEmailAndPassword(email, password)
		await firestore.collection('users').doc(record.user.uid).set({ bio: { name }},{ merge: true })
		await afterAuthHook()
	}catch(error){
		new window.Toast({ icon: 'error', title: error.message })
	}
}

export const loginWithEmail = async ({ email, password }) => {
	try{
		await auth.signInWithEmailAndPassword(email, password)
		await afterAuthHook()
	}catch(error) {
		new window.Toast({ icon: 'error', title: error.message })
	}
}

export const loginWithGoogle = async () => {
	let googleProvider = new firebase.auth.GoogleAuthProvider()
	try{
		await auth.signInWithPopup(googleProvider)
		await afterAuthHook()
	}catch (error) {
		new window.Toast({ icon: 'error', title: error.message })
	}
}

export const loginAsDevUser = async (id) => {
	await store.dispatch('setId', id)
	await afterAuthHook()
}

export const logout = async () => {
	await store.dispatch('setId', null)
	if(store.getters.isTutor) await store.dispatch('closeTutorSessionsListener')
	await router.push('/').catch(error => error)
	await auth.signOut()
	window.closeNavbar()
	window.closeAccountDropdown()
	window.closeAdminDropdown()
}
