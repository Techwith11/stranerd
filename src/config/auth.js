import firebase, { auth, firestore } from '@/config/firebase'
import store from '@/store'

let afterAuthHook = async () => {
	await store.dispatch('closeAuthModal')
	let route = store.getters.getIntendedRoute
	route ? await this.$router.push(route) : null
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
